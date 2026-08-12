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
import type { ChartFamilyDescriptor, FamilyRegistry } from "@/charts";

import { placeInChannelWell, unifyChannels, wellAccepts, type FieldKind } from "./builder/channels";

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
  // A query-less family (e.g. host `ai`) may carry no query at all; treat as empty so we
  // never dereference `undefined.measures` (the crash that tore down the widget editor).
  const q = spec.query ?? {};
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
 * Whether EVERY one of a family's wells is serviced by the generic channel interpreter.
 * A family with even one host-managed well (no `target`) keeps fields the interpreter
 * cannot see, so unifying its channels would silently drop them — such a family
 * migrates through the query-derivation fallback instead.
 */
function isChannelManaged(descriptor: ChartFamilyDescriptor): boolean {
  return (
    descriptor.wells.length > 0 &&
    descriptor.wells.every((w) => w.target !== undefined && w.channel !== undefined)
  );
}

/**
 * Switch a chart to `next` family WITHOUT losing the field bindings.
 *
 * This used to be a per-family `switch` that re-derived each destination's structure
 * from the raw query. It is now CHANNEL UNIFICATION: wells that feed the same visual
 * channel mean the same thing across families, so the migration is "read the source's
 * channels, re-place them into the destination's wells that want those channels"
 * (x→x, y→y, color→color…). Flipping through chart types to find the right one is
 * therefore lossless and symmetric — the single most common way a non-technical user
 * arrives at their chart.
 *
 * NON-well concerns preserved from the old switch: `mapping` + `familyOptions` are
 * cleared (the destination re-derives them; family DEFAULTS supply the rest, e.g. the
 * kpi's `display: "number"`), while the rest of the display envelope
 * (orientation/stackMode/axes/legend/format) is carried across UNCHANGED — as before,
 * so bar→pie→bar restores the user's stacking and orientation rather than silently
 * resetting them. The query (date range, granularity, filters, limit) is the user's
 * context, not the chart's, and is never touched.
 *
 * A HOST family owns some or all of its wells through its own placement hooks; when
 * either side is not fully interpreter-managed the migration falls back to re-deriving
 * the destination from the query, the way the old switch did.
 */
export function migrateToFamily(
  spec: ChartSpec,
  next: ChartFamily,
  registry: FamilyRegistry,
): ChartSpec {
  const from = registry.require(spec.chart.family);
  const to = registry.require(next);
  const swapped =
    isChannelManaged(from) && isChannelManaged(to)
      ? unifyChannels(spec, from.wells, to.wells)
      : migrateFromQuery(spec, to);
  return { ...swapped, chart: { ...swapped.chart, family: next } };
}

/**
 * The host-family fallback: re-derive the destination from the QUERY (the old switch's
 * behaviour, generalized). Measures and dimensions are handed to the destination's
 * channel wells greedily, in well order, by what each well accepts — which reproduces
 * the old per-family recipes (cartesian: all measures + first dimension; pie: one
 * measure + one slice dimension; scatter: the first three measures + a group-by; kpi:
 * the first measure; table: every member as a column).
 */
function migrateFromQuery(spec: ChartSpec, to: ChartFamilyDescriptor): ChartSpec {
  const { chart } = spec;
  const query = spec.query ?? {}; // query-less families carry no query — treat as empty
  const measures = measuresOf(chart).length ? measuresOf(chart) : (query.measures ?? []);
  const times = (query.timeDimensions ?? []).map((t) => t.dimension);
  const category = categoryOf(chart) ?? query.dimensions?.[0] ?? times[0];
  const dimensions = [category, ...(query.dimensions ?? []), ...times].filter(
    (m, i, all): m is string => !!m && all.indexOf(m) === i,
  );
  const cleared: ChartSpec = {
    ...spec,
    chart: { ...chart, mapping: undefined, familyOptions: undefined },
  };

  if (!isChannelManaged(to)) {
    // A host destination owns its own structure. If it consumes the generic mapping
    // envelope, carry the category + measures across so switching TO it is lossless;
    // otherwise let its wells/placement hooks re-derive as the user (re)binds fields.
    const mapping: SeriesMapping | undefined = category
      ? { category: { member: category }, series: { mode: "measures", members: measures } }
      : undefined;
    return to.supportsMapping ? { ...cleared, chart: { ...cleared.chart, mapping } } : cleared;
  }

  const measurePool = [...measures];
  const dimensionPool = [...dimensions];
  const kindOfDimension = (m: string): FieldKind => (times.includes(m) ? "time" : "category");
  let out = cleared;

  for (const well of to.wells) {
    if (!well.target || !well.channel) continue;
    // A well that takes BOTH (the table's columns) reads best dimensions-first, which
    // is the column order the old recipe produced.
    const pools: [string[], (m: string) => FieldKind][] = wellAccepts(well, "category")
      ? [
          [dimensionPool, kindOfDimension],
          [measurePool, () => "number"],
        ]
      : [
          [measurePool, () => "number"],
          [dimensionPool, kindOfDimension],
        ];
    let taken = 0;
    for (const [pool, kindOf] of pools) {
      for (let i = 0; i < pool.length; ) {
        if ((well.cardinality === "one" && taken > 0) || !wellAccepts(well, kindOf(pool[i]))) {
          i += 1;
          continue;
        }
        out = placeInChannelWell(out, to.wells, well.id, pool[i], kindOf(pool[i]));
        pool.splice(i, 1);
        taken += 1;
      }
    }
  }
  return out;
}
