import { useMemo, useRef, useSyncExternalStore } from "react";

import type { ChartOptions, CubeQuery } from "@/spec";
import { normalize } from "@/adapter";
import type { NormalizedChartData } from "@/adapter/types";
import { useCubeVizContext, useFamilyRegistry } from "@/provider";
import { mergeUnitConversions } from "@/units";
import { createQueryResolver } from "@/variables";

import { useCubeQuery } from "./useCubeQuery";
import { useOptionalDashboard } from "./useDashboard";

/**
 * Fetch + normalize in one step (docs/03-override-theme-preview.md §A2.5). Returns
 * the SAME {@link NormalizedChartData} the renderer consumes, applying — when the
 * hook is inside a `DashboardProvider` — variable resolution + the noFilter rule
 * automatically. A standalone chart (no dashboard) uses the query verbatim.
 *
 * This is the seam the registry chart components are built on, so a host gets
 * identical behaviour whether it renders `<CubeChart>` or wires the hook by hand.
 */

export interface UseNormalizedSeriesResult {
  data?: NormalizedChartData;
  isLoading: boolean;
  error?: Error;
  /** Force a re-fetch (Refresh action). */
  refetch?: () => void;
  /** The literal (variables-substituted, noFilter-applied) query that was fetched. Useful
   *  for deriving a SECOND query off the resolved values (e.g. previous-period compare). */
  resolvedQuery: CubeQuery;
}

export interface UseNormalizedSeriesOptions {
  /** When true, no request is issued. */
  skip?: boolean;
  /** When true, the query is used VERBATIM (no dashboard variable resolution). Use for a
   *  query already built from a resolved one — e.g. the previous-period companion. */
  skipResolve?: boolean;
}

/** A no-op `useSyncExternalStore` subscribe for the no-dashboard / skipResolve path. */
const noopSubscribe = (): (() => void) => () => {};

export function useNormalizedSeries(
  query: CubeQuery,
  options: ChartOptions,
  opts?: UseNormalizedSeriesOptions,
): UseNormalizedSeriesResult {
  // Optional dashboard: substitute {var} tokens + apply noFilter when present.
  // We read the STABLE api (no per-setVar context churn) and subscribe to the store
  // ONLY through a resolved-query selector (below): a `setVar` that doesn't change THIS
  // chart's resolved query produces no new reference and no re-render / re-normalize.
  const dashboard = useOptionalDashboard();
  const { locale } = useCubeVizContext();
  // The family registry (builtins + host families) drives the measure-only branch in
  // normalize. Stable identity per provider (content-keyed memo), so adding it to the
  // data useMemo deps below never churns the normalized data.
  const families = useFamilyRegistry();

  // Per-instance memoizing resolver: returns the SAME object reference when the
  // resolved output is byte-identical, so an unrelated `setVar` doesn't churn it.
  const resolverRef = useRef<ReturnType<typeof createQueryResolver> | null>(null);
  if (resolverRef.current === null) resolverRef.current = createQueryResolver();
  const resolveOnce = resolverRef.current;

  const skipResolve = opts?.skipResolve ?? false;
  const active = dashboard !== null && !skipResolve;

  // Subscribe to the store, but the SNAPSHOT we select is the resolved query itself
  // (memoized for referential stability). React re-renders only when that reference
  // changes — i.e. only when a variable THIS query actually depends on changes — so a
  // `setVar` elsewhere neither re-renders this chart nor re-runs normalize(). A real
  // change to a bound variable yields a new reference and correctly updates the widget.
  const getResolved = (): CubeQuery => {
    if (!active || !dashboard) return query;
    return resolveOnce(query, dashboard.store.getAll(), dashboard.decls);
  };
  const resolvedQuery = useSyncExternalStore(
    active && dashboard ? dashboard.store.subscribe : noopSubscribe,
    getResolved,
    getResolved,
  );

  const { resultSet, isLoading, error, refetch } = useCubeQuery(resolvedQuery, { skip: opts?.skip });

  // Unit conversion is applied at the ADAPTER boundary (so axes scale in display units):
  // the target system comes from a per-chart override or the provider, the table from the
  // provider's host-registered conversions merged over the defaults.
  const unitSystem = options.format?.unitSystem ?? locale?.unitSystem;
  const conversions = useMemo(() => mergeUnitConversions(locale?.units), [locale?.units]);

  // Normalize against the RESOLVED query (stored verbatim on raw.query). Re-runs
  // only when the result, options, resolved query, or unit system change.
  const data = useMemo<NormalizedChartData | undefined>(() => {
    if (!resultSet) return undefined;
    return normalize(resultSet, options, resolvedQuery, { unitSystem, conversions }, families);
  }, [resultSet, options, resolvedQuery, unitSystem, conversions, families]);

  return { data, isLoading, error, refetch, resolvedQuery };
}
