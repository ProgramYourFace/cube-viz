/**
 * The adapter layer: the Cube transport + the resultSet → NormalizedChartData
 * normalizer, plus the normalized output types. This is THE abstraction seam
 * between Cube and the renderer (docs/01-spec-schema.md §6).
 */

// Normalized output contract.
export type {
  SeriesValueMeta,
  NormalizedSeries,
  NormalizedChartData,
  AnnotatedMember,
  ResultAnnotation,
  QueryState,
} from "./types";

// Cube client.
export { createCubeClient, fetchMeta } from "./cube-client";
export type { CubeClient, CubeConnection, CubeMeta } from "./cube-client";

// Normalizer.
export {
  normalize,
  assignColors,
  resolveSeriesColors,
  toResultAnnotation,
  DEFAULT_COLOR_RAMP,
} from "./normalize";
