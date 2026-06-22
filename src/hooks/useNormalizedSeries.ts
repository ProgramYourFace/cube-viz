import { useMemo } from "react";

import type { ChartOptions, CubeQuery } from "@/spec";
import { normalize } from "@/adapter";
import type { NormalizedChartData } from "@/adapter/types";
import { useCubeVizContext } from "@/provider";
import { mergeUnitConversions } from "@/units";

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

export function useNormalizedSeries(
  query: CubeQuery,
  options: ChartOptions,
  opts?: UseNormalizedSeriesOptions,
): UseNormalizedSeriesResult {
  // Optional dashboard: substitute {var} tokens + apply noFilter when present.
  const dashboard = useOptionalDashboard();
  const { locale } = useCubeVizContext();

  const resolvedQuery = useMemo<CubeQuery>(
    () => (dashboard && !opts?.skipResolve ? dashboard.resolveQuery(query) : query),
    [dashboard, query, opts?.skipResolve],
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
    return normalize(resultSet, options, resolvedQuery, { unitSystem, conversions });
  }, [resultSet, options, resolvedQuery, unitSystem, conversions]);

  return { data, isLoading, error, refetch, resolvedQuery };
}
