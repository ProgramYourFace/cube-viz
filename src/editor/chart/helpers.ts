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
import type { FamilyRegistry } from "@/charts";

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

/** Default granularity offered when a time dimension is first selected. */
export const DEFAULT_GRANULARITY: Granularity = "day";

/**
 * Switch a chart to `next` family WITHOUT losing the field bindings. Each family stores
 * its fields differently (cartesian/pie in `mapping`; kpi/scatter/table/combo in
 * `familyOptions`), so a naive `familyOptions: undefined` reset drops the user's work and
 * leaves the new family empty. This re-derives the new family's structure from the query
 * (measures + the first category/dimension/time member), so type-switching is lossless.
 */
export function migrateToFamily(
  spec: ChartSpec,
  next: ChartFamily,
  registry: FamilyRegistry,
): ChartSpec {
  const { query, chart } = spec;
  const measures = measuresOf(chart).length ? measuresOf(chart) : (query.measures ?? []);
  const category =
    categoryOf(chart) ?? query.dimensions?.[0] ?? query.timeDimensions?.[0]?.dimension;
  const cartesianMapping: SeriesMapping | undefined = category
    ? { category: { member: category }, series: { mode: "measures", members: measures } }
    : undefined;
  const base: ChartSpec = {
    ...spec,
    chart: { ...chart, family: next, mapping: undefined, familyOptions: undefined },
  };
  const withChart = (patch: Partial<ChartOptions>): ChartSpec => ({
    ...base,
    chart: { ...base.chart, ...patch },
  });

  switch (next) {
    case "bar":
    case "line":
    case "area":
    case "pie":
      return withChart({ mapping: cartesianMapping });
    case "combo":
      return withChart({
        mapping: cartesianMapping,
        familyOptions: {
          series: measures.map((m, i) => ({ member: m, render: i % 2 === 1 ? "bar" : "line" })),
        },
      });
    case "kpi":
      return withChart({
        familyOptions: { display: "number", ...(measures[0] ? { measure: measures[0] } : {}) },
      });
    case "scatter":
      return withChart({
        familyOptions: {
          ...(measures[0] ? { x: measures[0] } : {}),
          ...(measures[1] ? { y: measures[1] } : {}),
        },
      });
    case "table": {
      const cols = [
        ...(query.dimensions ?? []),
        ...(query.timeDimensions?.map((t) => t.dimension) ?? []),
        ...measures,
      ].map((m) => ({ member: m }));
      return withChart({ familyOptions: cols.length ? { columns: cols } : undefined });
    }
    default:
      // A host-registered family has no builtin migration recipe — switch the family
      // and clear the builtin-shaped familyOptions. If the host family consumes the
      // generic `mapping` envelope (supportsMapping), carry the current category +
      // measures across so switching TO it is lossless (it reads `mapping.category` /
      // series directly); otherwise clear mapping too and let its wells/placement
      // re-derive structure as the user (re)binds fields.
      return registry.require(next).supportsMapping ? withChart({ mapping: cartesianMapping }) : base;
  }
}
