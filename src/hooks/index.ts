/**
 * The headless hooks layer (docs/03-override-theme-preview.md §A2.5): cube-viz's
 * data pipeline exposed framework-correctly, so a host can render anything from
 * `useNormalizedSeries` while fetch / castNumerics / Continue-wait polling /
 * variable substitution / noFilter / annotation-driven formatting all happen below
 * the `NormalizedChartData` seam.
 */

export { useCubeQuery } from "./useCubeQuery";
export type {
  UseCubeQueryResult,
  UseCubeQueryOptions,
} from "./useCubeQuery";

export { useNormalizedSeries } from "./useNormalizedSeries";
export type {
  UseNormalizedSeriesResult,
  UseNormalizedSeriesOptions,
} from "./useNormalizedSeries";

export {
  DashboardProvider,
  useDashboard,
  useOptionalDashboard,
} from "./useDashboard";
export type {
  DashboardProviderProps,
  DashboardContextValue,
} from "./useDashboard";

export { useCubeMeta } from "./useCubeMeta";
export type { UseCubeMetaResult } from "./useCubeMeta";

export { useFormatter } from "./useFormatter";
