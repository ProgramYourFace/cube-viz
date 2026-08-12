import type {
  ChartOptions,
  ChartSpec,
  CubeQuery,
  Granularity,
  SeriesMapping,
  SeriesMeta,
  TimeDimension,
} from "@/spec";

import { buildSeries, categoryOf, DEFAULT_GRANULARITY, seriesMetaOf, timeDimensionOf } from "../helpers";

/**
 * Chart Builder v4 — the CHANNEL model (docs/05 §2).
 *
 * A well is not a family-specific slot; it is a binding of a *visual channel*
 * (x / y / color / size …) to a *place in the spec* (the mapping envelope or a
 * `familyOptions` key). Declaring that binding on the descriptor lets ONE
 * interpreter answer every question the editor used to answer per family:
 *
 *  - "what is in this well?"          → {@link readChannelWells}
 *  - "may this field go here?"        → {@link wellAccepts}
 *  - "put it here"                    → {@link placeInChannelWell}
 *  - "take it out"                    → {@link removeFromChannelWell}
 *  - "keep my fields when I switch"   → {@link unifyChannels}
 *
 * The per-family `placeField`/`removeField`/`readWells` switches this replaces
 * re-answered those questions in five dialects. Host families (map/ai) still
 * bring their own hooks — a well with no {@link WellTarget} is host-managed.
 */

/* ─────────────────────────────── field kinds ─────────────────────────────── */

/**
 * A field's primitive role: a measure / a non-time dimension / a time dimension /
 * a NUMERIC dimension / a synthetic geographic point. `numberDimension` exists
 * because Cube models coordinates and other per-row numbers (latitude, longitude,
 * headings) as `type: number` DIMENSIONS — the `number` kind only surfaces
 * measures, so a well that wants raw per-row numbers opts in with
 * `kinds: ["number", "numberDimension"]`. Placement routes the kinds differently
 * (`number` → `query.measures`, `numberDimension` → `query.dimensions`).
 * `geoPoint` bundles a model-authored latitude/longitude pair; the editor fans it
 * out to a host family's internal wells.
 */
export type FieldKind = "number" | "category" | "time" | "numberDimension" | "geoPoint";

/** True when a field of this kind is aggregated by Cube (vs. selected per row). */
export function isMeasureKind(kind: FieldKind): boolean {
  return kind === "number";
}

/* ──────────────────────────────── channels ───────────────────────────────── */

/**
 * The visual role a well feeds. Two families that expose the same channel mean
 * the same thing by it, which is what makes type-switching lossless
 * ({@link unifyChannels}), fit-ranking possible, and the editor uniform: the
 * "category" well behaves identically in bar, line, area and heatmap because it
 * IS the same channel.
 *
 * `row` is a second categorical POSITION channel (the heatmap's rows) as opposed
 * to `color`, which is a categorical PAINT channel (a bar/line split). Both are
 * stored the same way (a pivot dimension); they differ in how the mark reads them.
 */
export type Channel = "x" | "y" | "color" | "size" | "row" | "detail";

/**
 * Where a well's field(s) live in the spec.
 *
 *  - `category` → `mapping.category.member` (+ the query dimension/timeDimension)
 *  - `measures` → the mapped measure list (`series.members`, or `series.values`
 *    in pivot mode) + `query.measures`
 *  - `pivot`    → `mapping.series.pivot`, the dimension that splits the measures
 *  - `option`   → `familyOptions[key] = member` (scatter's x/y/size, kpi's measure)
 *  - `optionList` → `familyOptions[key] = [{ member }, …]` (table columns)
 */
export type WellTarget =
  | { kind: "category" }
  | { kind: "measures" }
  | { kind: "pivot" }
  | { kind: "option"; key: string }
  | { kind: "optionList"; key: string };

/** A typed slot in the builder. `kinds` gates which fields may be dropped in. */
export interface WellDef {
  id: string;
  label: string;
  hint?: string;
  cardinality: "one" | "many";
  kinds: FieldKind[];
  /** Optional wells render a muted "(optional)" affordance. */
  optional?: boolean;
  /**
   * Where this well's field(s) live in the spec. ABSENT ⇒ host-managed: the
   * descriptor's own `readWells`/`placeField`/`removeField` own it.
   */
  target?: WellTarget;
  /** The visual channel this well feeds. Absent ⇒ excluded from unification. */
  channel?: Channel;
}

/** Every well the generic interpreter can service (i.e. carries a target). */
export function isChannelWell(well: WellDef): well is WellDef & { target: WellTarget } {
  return well.target !== undefined;
}

/** May a field of `kind` be dropped into `well`? */
export function wellAccepts(well: WellDef, kind: FieldKind): boolean {
  return well.kinds.includes(kind);
}

/**
 * Why a field cannot go in a well — a SHORT, user-facing reason for the editor's
 * disabled affordance. Non-technical users get "Pie takes one measure", not a
 * silent no-op drop.
 */
export function placementBlockReason(
  well: WellDef,
  kind: FieldKind,
  current: string[],
): string | undefined {
  if (!wellAccepts(well, kind)) {
    const wants = well.kinds.includes("number")
      ? "a measure"
      : well.kinds.includes("time")
        ? "a date or category"
        : "a category";
    return `${well.label} takes ${wants}`;
  }
  if (well.cardinality === "one" && current.length >= 1) {
    // Not a block — one-cardinality wells REPLACE. Kept for callers that want to
    // warn ("replaces Distance") rather than disable.
    return undefined;
  }
  return undefined;
}

/* ──────────────────────────── spec-shape readers ─────────────────────────── */

function familyOptionsOf(spec: ChartSpec): Record<string, unknown> {
  return (spec.chart.familyOptions ?? {}) as Record<string, unknown>;
}

/** The pivot (split) dimension, when the mapping is in pivot mode. */
export function pivotOf(chart: ChartOptions): string | undefined {
  const series = chart.mapping?.series;
  return series && series.mode === "pivot" ? series.pivot : undefined;
}

/** The mapped measures in EITHER mode, in order (pivot: `values` ?? `[value]`). */
export function mappedMeasures(chart: ChartOptions): string[] {
  const series = chart.mapping?.series;
  if (!series) return [];
  if (series.mode === "measures") return series.members;
  return series.values && series.values.length > 0 ? series.values : [series.value];
}

/** Per-measure meta in either mode (carried across mode flips so colors survive). */
function metaOf(chart: ChartOptions): Record<string, SeriesMeta> {
  const series = chart.mapping?.series;
  if (!series) return {};
  return (series.mode === "measures" ? series.meta : series.meta) ?? {};
}

/**
 * A pivot dimension that is PLACED but not yet mappable — the user dropped a
 * split before the measures/category it needs. It lives on the query until the
 * mapping can be formed. (The old per-family writers silently DROPPED such
 * placements on bar/line/area; holding them is what makes exploration safe.)
 */
function pendingPivot(
  spec: ChartSpec,
  wells: readonly WellDef[],
  claimedExtra?: readonly string[],
): string | undefined {
  const chart = spec.chart;
  if (pivotOf(chart)) return undefined;
  const category = categoryOf(chart);
  const claimed = new Set<string>(claimedExtra ?? []);
  if (category) claimed.add(category);
  // Dimensions parked in option wells belong to those wells, not to the pivot.
  for (const w of wells) {
    if (w.target?.kind === "option") {
      const v = familyOptionsOf(spec)[w.target.key];
      if (typeof v === "string") claimed.add(v);
    }
  }
  return (spec.query?.dimensions ?? []).find((d) => !claimed.has(d));
}

/**
 * Derive each channel well's current member(s) from the spec — the inverse of
 * {@link placeInChannelWell}. Host-managed wells (no target) are omitted; the
 * caller merges the descriptor's own `readWells` output over this.
 */
export function readChannelWells(
  spec: ChartSpec,
  wells: readonly WellDef[],
  /**
   * Members that are being written RIGHT NOW and are therefore already spoken
   * for. A writer binds its member to the query one step before the mapping
   * records the role, so without this the in-flight member looks like an
   * unclaimed dimension and {@link pendingPivot} would adopt it as a split —
   * a category placed after a measure would pivot on itself.
   */
  claimed?: readonly string[],
): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  const chart = spec.chart;
  const fo = familyOptionsOf(spec);
  const clamp = (well: WellDef, members: string[]): string[] =>
    well.cardinality === "one" ? members.slice(0, 1) : members;

  for (const well of wells) {
    if (!isChannelWell(well)) continue;
    const t = well.target;
    switch (t.kind) {
      case "category": {
        const c = categoryOf(chart);
        out[well.id] = c ? [c] : [];
        break;
      }
      case "measures": {
        const mapped = mappedMeasures(chart);
        // Before a category exists there is no mapping to read — the measures are
        // still on the query, and the well must show them (a half-built chart).
        const members = mapped.length ? mapped : (spec.query?.measures ?? []);
        out[well.id] = clamp(well, members);
        break;
      }
      case "pivot": {
        const p = pivotOf(chart) ?? pendingPivot(spec, wells, claimed);
        out[well.id] = p ? [p] : [];
        break;
      }
      case "option": {
        const v = fo[t.key];
        out[well.id] = typeof v === "string" && v ? [v] : [];
        break;
      }
      case "optionList": {
        const list = Array.isArray(fo[t.key]) ? (fo[t.key] as unknown[]) : [];
        out[well.id] = list
          .map((e) => (e && typeof e === "object" ? (e as { member?: string }).member : undefined))
          .filter((m): m is string => typeof m === "string");
        break;
      }
    }
  }
  return out;
}

/* ─────────────────────────── query maintenance ───────────────────────────── */

function withMember(list: string[] | undefined, member: string): string[] {
  const base = list ?? [];
  return base.includes(member) ? base : [...base, member];
}

function withoutMember(list: string[] | undefined, member: string): string[] {
  return (list ?? []).filter((m) => m !== member);
}

function ensureDimension(query: CubeQuery, member: string): CubeQuery {
  return { ...query, dimensions: withMember(query.dimensions, member) };
}

function dropDimension(query: CubeQuery, member: string): CubeQuery {
  const dims = withoutMember(query.dimensions, member);
  return { ...query, dimensions: dims.length ? dims : undefined };
}

function setTimeDimension(query: CubeQuery, td: TimeDimension | undefined): CubeQuery {
  return { ...query, timeDimensions: td ? [td] : undefined };
}

/**
 * Adaptive default granularity for a freshly-placed date X: pick from the bound
 * dateRange span when present (≤2 days→hour, ≤90→day, ≤730→month, else year),
 * else fall back to `day` (docs/05 §3.3).
 */
export function adaptiveGranularity(dateRange: TimeDimension["dateRange"]): Granularity {
  const days = spanDays(dateRange);
  if (days === undefined) return DEFAULT_GRANULARITY;
  if (days <= 2) return "hour";
  if (days <= 90) return "day";
  if (days <= 730) return "month";
  return "year";
}

function spanDays(dateRange: TimeDimension["dateRange"]): number | undefined {
  if (!Array.isArray(dateRange) || dateRange.length !== 2) return undefined;
  const from = Date.parse(dateRange[0]);
  const to = Date.parse(dateRange[1]);
  if (Number.isNaN(from) || Number.isNaN(to)) return undefined;
  return Math.abs(to - from) / 86_400_000;
}

/**
 * Bind a member to the query in the way its kind requires. `carry` is the time
 * entry a swap is replacing: unbinding the previous X clears `timeDimensions`
 * wholesale, so without carrying it forward an axis swap would silently discard
 * the user's date range and granularity.
 */
function bindToQuery(
  query: CubeQuery,
  member: string,
  kind: FieldKind,
  carry?: TimeDimension,
): CubeQuery {
  if (isMeasureKind(kind)) return { ...query, measures: withMember(query.measures, member) };
  if (kind === "time") {
    const prev = timeDimensionOf(query) ?? carry;
    return setTimeDimension(query, {
      dimension: member,
      granularity: prev?.granularity ?? adaptiveGranularity(prev?.dateRange),
      dateRange: prev?.dateRange,
    });
  }
  return ensureDimension(query, member);
}

/**
 * Unbind a member unless another well still holds it. The old per-family removers
 * each hand-rolled this and disagreed at the edges (a member in two wells could be
 * yanked out from under one of them).
 */
function unbindFromQuery(
  spec: ChartSpec,
  wells: readonly WellDef[],
  member: string,
  exceptWellId: string,
): CubeQuery {
  const query = spec.query ?? {};
  const still = readChannelWells(spec, wells);
  for (const [wellId, members] of Object.entries(still)) {
    if (wellId === exceptWellId) continue;
    if (members.includes(member)) return query; // another well owns it too
  }
  const time = timeDimensionOf(query);
  if (time?.dimension === member) return setTimeDimension(query, undefined);
  if ((query.measures ?? []).includes(member)) {
    const measures = withoutMember(query.measures, member);
    return { ...query, measures: measures.length ? measures : undefined };
  }
  return dropDimension(query, member);
}

/* ──────────────────────── mapping envelope assembly ──────────────────────── */

/**
 * Rebuild the mapping envelope from the three mapped roles. This single function
 * replaces the measures-mode ⇄ pivot-mode transitions that each cartesian writer
 * used to open-code:
 *
 *  - category + ≥1 measure + pivot ⇒ PIVOT mode (series = measure × pivot value)
 *  - category (any measures)       ⇒ MEASURES mode
 *  - no category                   ⇒ no mapping (fields wait on the query)
 *
 * Per-measure meta (label/color/curve) is carried across mode flips for every
 * measure that is still selected, so adding a split never wipes series colors.
 */
function assembleMapping(
  category: string | undefined,
  measures: string[],
  pivot: string | undefined,
  prevMeta: Record<string, SeriesMeta>,
): SeriesMapping | undefined {
  if (!category) return undefined;
  const meta: Record<string, SeriesMeta> = {};
  for (const m of measures) {
    const entry = prevMeta[m];
    if (entry && Object.keys(entry).length > 0) meta[m] = entry;
  }
  const hasMeta = Object.keys(meta).length > 0;

  if (pivot && measures.length > 0) {
    const series: SeriesMapping["series"] =
      measures.length > 1
        ? { mode: "pivot", value: measures[0], values: measures, pivot, ...(hasMeta ? { meta } : {}) }
        : { mode: "pivot", value: measures[0], pivot, ...(hasMeta ? { meta } : {}) };
    return { category: { member: category }, series };
  }
  return { category: { member: category }, series: buildSeries(measures, prevMeta) };
}

/** The mapped roles as the interpreter sees them right now. */
interface Roles {
  category?: string;
  measures: string[];
  pivot?: string;
}

function readRoles(spec: ChartSpec, wells: readonly WellDef[], claimed?: readonly string[]): Roles {
  const current = readChannelWells(spec, wells, claimed);
  const find = (kind: WellTarget["kind"]): WellDef | undefined =>
    wells.find((w) => w.target?.kind === kind);
  const categoryWell = find("category");
  const measuresWell = find("measures");
  const pivotWell = find("pivot");
  return {
    category: categoryWell ? current[categoryWell.id]?.[0] : categoryOf(spec.chart),
    measures: measuresWell ? (current[measuresWell.id] ?? []) : mappedMeasures(spec.chart),
    pivot: pivotWell ? current[pivotWell.id]?.[0] : pivotOf(spec.chart),
  };
}

function withMapping(spec: ChartSpec, query: CubeQuery, roles: Roles): ChartSpec {
  const prevMeta = { ...seriesMetaOf(spec.chart), ...metaOf(spec.chart) };
  return {
    ...spec,
    query,
    chart: {
      ...spec.chart,
      mapping: assembleMapping(roles.category, roles.measures, roles.pivot, prevMeta),
    },
  };
}

function withFamilyOptions(spec: ChartSpec, query: CubeQuery, patch: Record<string, unknown>): ChartSpec {
  const next = { ...familyOptionsOf(spec), ...patch };
  for (const [k, v] of Object.entries(patch)) if (v === undefined) delete next[k];
  return { ...spec, query, chart: { ...spec.chart, familyOptions: next } };
}

/* ───────────────────────────────── writers ───────────────────────────────── */

/**
 * Place `member` (of `kind`) into `wellId`, returning a FULL next spec.
 * One-cardinality wells replace; many-cardinality wells append.
 */
export function placeInChannelWell(
  spec: ChartSpec,
  wells: readonly WellDef[],
  wellId: string,
  member: string,
  kind: FieldKind,
): ChartSpec {
  const well = wells.find((w) => w.id === wellId);
  if (!well || !isChannelWell(well)) return spec;

  const t = well.target;
  const current = readChannelWells(spec, wells)[wellId] ?? [];
  let query = spec.query ?? {};

  switch (t.kind) {
    case "category": {
      // Replace any existing category: unbind the previous member first so a
      // swapped X does not leave its dimension on the query. The outgoing time
      // entry carries the date window onto the incoming one.
      const prev = current[0];
      const carry = timeDimensionOf(query);
      if (prev && prev !== member) query = unbindFromQuery(spec, wells, prev, wellId);
      query = bindToQuery(query, member, kind, carry);
      const roles = readRoles({ ...spec, query }, wells, [member]);
      return withMapping(spec, query, { ...roles, category: member });
    }
    case "measures": {
      const next = well.cardinality === "one" ? [member] : withMember(current, member);
      // A replaced single measure must be unbound from the query.
      if (well.cardinality === "one" && current[0] && current[0] !== member) {
        query = unbindFromQuery(spec, wells, current[0], wellId);
      }
      query = bindToQuery(query, member, kind);
      const roles = readRoles({ ...spec, query }, wells, [member]);
      return withMapping(spec, query, { ...roles, measures: next });
    }
    case "pivot": {
      const prev = current[0];
      if (prev && prev !== member) query = unbindFromQuery(spec, wells, prev, wellId);
      query = bindToQuery(query, member, kind);
      const roles = readRoles({ ...spec, query }, wells, [member]);
      return withMapping(spec, query, { ...roles, pivot: member });
    }
    case "option": {
      const prev = current[0];
      if (prev && prev !== member) query = unbindFromQuery(spec, wells, prev, wellId);
      query = bindToQuery(query, member, kind);
      return withFamilyOptions(spec, query, { [t.key]: member });
    }
    case "optionList": {
      const list = Array.isArray(familyOptionsOf(spec)[t.key])
        ? ([...(familyOptionsOf(spec)[t.key] as unknown[])] as { member: string }[])
        : [];
      if (!list.some((e) => e?.member === member)) list.push({ member });
      query = bindToQuery(query, member, kind);
      return withFamilyOptions(spec, query, { [t.key]: list });
    }
  }
}

/** Remove `member` from `wellId`, unbinding it from the query. Returns a full spec. */
export function removeFromChannelWell(
  spec: ChartSpec,
  wells: readonly WellDef[],
  wellId: string,
  member: string,
): ChartSpec {
  const well = wells.find((w) => w.id === wellId);
  if (!well || !isChannelWell(well)) return spec;

  const t = well.target;
  const query = unbindFromQuery(spec, wells, member, wellId);

  switch (t.kind) {
    case "category": {
      // Losing the category collapses the mapping; the measures stay on the query
      // so re-dropping an X restores the chart.
      return { ...spec, query, chart: { ...spec.chart, mapping: undefined } };
    }
    case "measures": {
      const roles = readRoles(spec, wells);
      const measures = withoutMember(roles.measures, member);
      // With no measures left there is nothing to split — drop the pivot too.
      const pivot = measures.length ? roles.pivot : undefined;
      const q = measures.length || !roles.pivot ? query : dropDimension(query, roles.pivot);
      return withMapping(spec, q, { ...roles, measures, pivot });
    }
    case "pivot": {
      const roles = readRoles(spec, wells);
      return withMapping(spec, query, { ...roles, pivot: undefined });
    }
    case "option": {
      return withFamilyOptions(spec, query, { [t.key]: undefined });
    }
    case "optionList": {
      const list = Array.isArray(familyOptionsOf(spec)[t.key])
        ? (familyOptionsOf(spec)[t.key] as { member?: string }[])
        : [];
      return withFamilyOptions(spec, query, {
        [t.key]: list.filter((e) => e?.member !== member),
      });
    }
  }
}

/* ──────────────────────────── type switching ─────────────────────────────── */

/** Infer a placed member's kind from where it sits on the query. */
function inferKind(spec: ChartSpec, member: string): FieldKind {
  const query = spec.query ?? {};
  if ((query.measures ?? []).includes(member)) return "number";
  if (timeDimensionOf(query)?.dimension === member) return "time";
  return "category";
}

/** Pick a kind the destination well will accept, preserving query routing. */
function coerceKind(kind: FieldKind, well: WellDef): FieldKind | undefined {
  if (wellAccepts(well, kind)) return kind;
  // A plain dimension and a numeric dimension both live in `query.dimensions`,
  // so a well that wants one can take the other without changing the query.
  if (kind === "category" && wellAccepts(well, "numberDimension")) return "numberDimension";
  if (kind === "numberDimension" && wellAccepts(well, "category")) return "category";
  if (kind === "time" && wellAccepts(well, "category")) return "category";
  return undefined;
}

/**
 * Switch families WITHOUT losing field bindings, by matching wells that feed the
 * SAME channel: x→x, y→y, color→color. This is what makes flipping through chart
 * types to find the right one safe — the single most common way a non-technical
 * user arrives at their chart.
 *
 * Fields whose channel has no home in the destination (e.g. a color split moving
 * to a pie) are dropped from the wells but left on the query, so flipping back
 * restores them.
 */
export function unifyChannels(
  spec: ChartSpec,
  fromWells: readonly WellDef[],
  toWells: readonly WellDef[],
): ChartSpec {
  const source = readChannelWells(spec, fromWells);

  // channel → members, in well order.
  const byChannel = new Map<Channel, string[]>();
  for (const well of fromWells) {
    if (!well.channel) continue;
    const members = source[well.id] ?? [];
    if (!members.length) continue;
    byChannel.set(well.channel, [...(byChannel.get(well.channel) ?? []), ...members]);
  }

  // Start from a cleared chart but an INTACT query: the date range, granularity,
  // filters and limit are the user's context, not the chart's.
  let next: ChartSpec = {
    ...spec,
    chart: { ...spec.chart, mapping: undefined, familyOptions: undefined },
  };

  for (const well of toWells) {
    if (!isChannelWell(well) || !well.channel) continue;
    const available = byChannel.get(well.channel);
    if (!available?.length) continue;
    const take = well.cardinality === "one" ? available.slice(0, 1) : available;
    for (const member of take) {
      const kind = coerceKind(inferKind(spec, member), well);
      if (!kind) continue;
      next = placeInChannelWell(next, toWells, well.id, member, kind);
    }
  }
  return next;
}

/* ─────────────────────────────── fit ranking ─────────────────────────────── */

/**
 * How well a family's wells fit the fields the user already has — the basis for
 * "suggested" chart types. Scores REQUIRED wells that are satisfiable, minus a
 * small penalty for required wells that cannot be filled, so a family that needs
 * a second dimension the user does not have ranks below one that does not.
 */
export function channelFitScore(wells: readonly WellDef[], fields: readonly FieldKind[]): number {
  const pool = [...fields];
  let score = 0;
  for (const well of wells) {
    if (!isChannelWell(well)) continue;
    const i = pool.findIndex((k) => wellAccepts(well, k));
    if (i >= 0) {
      pool.splice(i, 1);
      score += well.optional ? 1 : 3;
    } else if (!well.optional) {
      score -= 2;
    }
  }
  // Leftover fields the family cannot show at all are a mild negative.
  return score - pool.length * 0.5;
}
