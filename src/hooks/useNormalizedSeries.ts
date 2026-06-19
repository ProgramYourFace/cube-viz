import { useMemo } from "react";

import type { ChartOptions, CubeQuery } from "@/spec";
import { normalize } from "@/adapter";
import type { NormalizedChartData } from "@/adapter/types";

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
}

export interface UseNormalizedSeriesOptions {
  /** When true, no request is issued. */
  skip?: boolean;
}

export function useNormalizedSeries(
  query: CubeQuery,
  options: ChartOptions,
  opts?: UseNormalizedSeriesOptions,
): UseNormalizedSeriesResult {
  // Optional dashboard: substitute {var} tokens + apply noFilter when present.
  const dashboard = useOptionalDashboard();

  const resolvedQuery = useMemo<CubeQuery>(
    () => (dashboard ? dashboard.resolveQuery(query) : query),
    [dashboard, query],
  );

  const { resultSet, isLoading, error, refetch } = useCubeQuery(resolvedQuery, { skip: opts?.skip });

  // Normalize against the RESOLVED query (stored verbatim on raw.query). Re-runs
  // only when the result, options, or resolved query change.
  const data = useMemo<NormalizedChartData | undefined>(() => {
    if (!resultSet) return undefined;
    return normalize(resultSet, options, resolvedQuery);
  }, [resultSet, options, resolvedQuery]);

  return { data, isLoading, error, refetch };
}
