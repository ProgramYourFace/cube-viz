import type {
  ChartFamily,
  ChartOptions,
  ChartSpec,
  CubeQuery,
  Granularity,
  SeriesMapping,
  SeriesMeta,
  TimeDimension,
} from "@/spec";

/**
 * Pure, side-effect-free helpers for the ChartEditor (docs/03 §A3.1). They derive
 * UI-facing state from a {@link ChartSpec} and assemble the next spec from edits.
 * Member identifiers flow through verbatim — these helpers never compose or guess a
 * member name, only move ones the pickers already read from `/v1/meta`.
 */

/** The cube/view a member belongs to: the part before its first dot (verbatim). */
export function cubeOfMember(member: string | undefined): string | undefined {
  if (!member) return undefined;
  const dot = member.indexOf(".");
  return dot > 0 ? member.slice(0, dot) : member;
}

/**
 * Infer the editor's active data source from the spec: the first measure's cube,
 * else the first dimension's, else the first time dimension's. (`/v1/meta` is the
 * authority for what a cube contains; this only recovers the *current* selection.)
 */
export function inferCube(spec: ChartSpec): string | undefined {
  const q = spec.query;
  const fromMeasure = q.measures?.find(Boolean);
  if (fromMeasure) return cubeOfMember(fromMeasure);
  const fromDim = q.dimensions?.find(Boolean);
  if (fromDim) return cubeOfMember(fromDim);
  const fromTime = q.timeDimensions?.[0]?.dimension;
  if (fromTime) return cubeOfMember(fromTime);
  const fromMapping = spec.chart.mapping?.category.member;
  return cubeOfMember(fromMapping);
}

/** The measures currently driving `mapping.series` (mode "measures"), in order. */
export function measuresOf(chart: ChartOptions): string[] {
  const series = chart.mapping?.series;
  if (series && series.mode === "measures") return series.members;
  return [];
}

/** The per-measure meta map (label/colorToken/format) from `mapping.series.meta`. */
export function seriesMetaOf(chart: ChartOptions): Record<string, SeriesMeta> {
  const series = chart.mapping?.series;
  if (series && series.mode === "measures") return series.meta ?? {};
  return {};
}

/** The category (dimension/time) member currently mapped, if any. */
export function categoryOf(chart: ChartOptions): string | undefined {
  return chart.mapping?.category.member;
}

/** The first time dimension on the query (the editor edits a single one). */
export function timeDimensionOf(query: CubeQuery): TimeDimension | undefined {
  return query.timeDimensions?.[0];
}

/**
 * Build a `mapping.series` (mode "measures") from an ordered measure list, carrying
 * forward only meta whose key is still selected (drops meta for removed measures).
 */
export function buildSeries(
  members: string[],
  prevMeta: Record<string, SeriesMeta>,
): SeriesMapping["series"] {
  const meta: Record<string, SeriesMeta> = {};
  for (const m of members) {
    const entry = prevMeta[m];
    if (entry && Object.keys(entry).length > 0) meta[m] = entry;
  }
  const out: SeriesMapping["series"] = { mode: "measures", members };
  if (Object.keys(meta).length > 0) out.meta = meta;
  return out;
}

/**
 * Assemble a complete `mapping` from a category member + a measures series. Returns
 * `undefined` when there is nothing to map (no category) so the envelope omits it.
 */
export function buildMapping(
  category: string | undefined,
  series: SeriesMapping["series"],
): SeriesMapping | undefined {
  if (!category) return undefined;
  return { category: { member: category }, series };
}

/** Whether a family consumes the generic `mapping` envelope (vs. its own familyOptions). */
export function familyUsesMapping(family: ChartFamily): boolean {
  return (
    family === "bar" ||
    family === "line" ||
    family === "area" ||
    family === "pie" ||
    family === "combo"
  );
}

/** Whether a family exposes the cross-family display envelope (orientation/stack/axes). */
export function familyHasCartesianAxes(family: ChartFamily): boolean {
  return family === "bar" || family === "line" || family === "area" || family === "combo";
}

/** Human labels for the chart families (the family SegmentedControl). */
export const FAMILY_LABELS: Record<ChartFamily, string> = {
  bar: "Bar",
  line: "Line",
  area: "Area",
  pie: "Pie",
  scatter: "Scatter",
  kpi: "KPI",
  table: "Table",
  combo: "Combo",
};

/** Default granularity offered when a time dimension is first selected. */
export const DEFAULT_GRANULARITY: Granularity = "day";
