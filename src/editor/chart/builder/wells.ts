import type {
  ChartFamily,
  ChartOptions,
  ChartSpec,
  CubeQuery,
  Granularity,
  SeriesMeta,
  SeriesMapping,
  TimeDimension,
} from "@/spec";

import type { FamilyRegistry } from "@/charts";

import {
  buildSeries,
  categoryOf,
  DEFAULT_GRANULARITY,
  measuresOf,
  seriesMetaOf,
  timeDimensionOf,
} from "../helpers";

/**
 * Chart Builder v2 — the PURE seam (no React). It is the single place that knows
 * the typed-well ↔ {@link ChartSpec} mapping (docs/05 §2). Every writer returns a
 * FULL `ChartSpec`, so the panel funnels each edit through the unchanged
 * `update → validate → debounce-emit` engine. Unit-testable in isolation.
 */

/** A field's primitive role: a measure / a non-time dimension / a time dimension. */
export type FieldKind = "number" | "category" | "time";

/** A typed slot in the builder. `kinds` gates which fields may be dropped/clicked in. */
export interface WellDef {
  id: string;
  label: string;
  hint?: string;
  cardinality: "one" | "many";
  kinds: FieldKind[];
  /** Optional wells render a muted "(optional)" affordance. */
  optional?: boolean;
}

/* ─────────────────────────── per-family well sets ─────────────────────────── */

/**
 * The typed wells for a family, top→bottom (docs/05 §2). Plain, axis-oriented
 * names. Reads NOTHING from the spec — pure shape. The well DATA now lives on the
 * {@link ChartFamilyDescriptor} (single source of truth); this is the accessor.
 */
export function getWells(family: ChartFamily, registry: FamilyRegistry): WellDef[] {
  return registry.require(family).wells;
}

/* ─────────────────────────────── read model ──────────────────────────────── */

/** A combo series option (`familyOptions.series[i]`). */
interface ComboSeriesEntry {
  member: string;
  render: "bar" | "line" | "area";
  label?: string;
  colorToken?: string;
}

/** A table column option (`familyOptions.columns[i]`). */
interface TableColumnEntry {
  member: string;
  label?: string;
}

function familyOptions(spec: ChartSpec): Record<string, unknown> {
  return (spec.chart.familyOptions ?? {}) as Record<string, unknown>;
}

function comboSeries(spec: ChartSpec): ComboSeriesEntry[] {
  const series = familyOptions(spec).series;
  return Array.isArray(series) ? (series as ComboSeriesEntry[]) : [];
}

function tableColumns(spec: ChartSpec): TableColumnEntry[] {
  const cols = familyOptions(spec).columns;
  return Array.isArray(cols) ? (cols as TableColumnEntry[]) : [];
}

/** The pivot color member, if the mapping is in pivot mode. */
export function pivotColorOf(spec: ChartSpec): string | undefined {
  const series = spec.chart.mapping?.series;
  return series && series.mode === "pivot" ? series.pivot : undefined;
}

/**
 * Derive each well's current member name(s) from the spec (docs/05 §6). The
 * inverse of {@link placeField}/{@link removeField}.
 */
export function readWells(spec: ChartSpec, registry: FamilyRegistry): Record<string, string[]> {
  const { chart } = spec;
  const family = chart.family;
  const one = (m: string | undefined): string[] => (m ? [m] : []);

  // Host families read their own wells off the descriptor.
  const hostRead = registry.require(family).readWells;
  if (hostRead) return hostRead(spec);

  switch (family) {
    case "bar":
    case "line":
    case "area": {
      const color = pivotColorOf(spec);
      // In pivot mode the measures live in `series.values` (or the single `series.value`);
      // in measures mode they're `members`.
      const series = chart.mapping?.series;
      const y =
        series && series.mode === "pivot"
          ? series.values && series.values.length > 0
            ? series.values
            : one(series.value)
          : measuresOf(chart);
      return { y, x: one(categoryOf(chart)), color: one(color) };
    }
    case "combo": {
      return {
        x: one(categoryOf(chart)),
        y: comboSeries(spec).map((s) => s.member),
      };
    }
    case "pie": {
      // `size` is a one-cardinality well — clamp to a single measure for an imported spec.
      return { slices: one(categoryOf(chart)), size: one(measuresOf(chart)[0]) };
    }
    case "scatter": {
      const fo = familyOptions(spec);
      return {
        sx: one(fo.x as string | undefined),
        sy: one(fo.y as string | undefined),
        size: one(fo.size as string | undefined),
        color: one(fo.groupBy as string | undefined),
      };
    }
    case "kpi": {
      return { value: one(familyOptions(spec).measure as string | undefined) };
    }
    case "table": {
      return { columns: tableColumns(spec).map((c) => c.member) };
    }
    default:
      return {};
  }
}

/* ──────────────────────────── granularity helper ─────────────────────────── */

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

/** Approximate day-span of an absolute `[from,to]` range; `undefined` for relative/var. */
function spanDays(dateRange: TimeDimension["dateRange"]): number | undefined {
  if (!Array.isArray(dateRange) || dateRange.length !== 2) return undefined;
  const from = Date.parse(dateRange[0]);
  const to = Date.parse(dateRange[1]);
  if (Number.isNaN(from) || Number.isNaN(to)) return undefined;
  return Math.abs(to - from) / 86_400_000;
}

/* ───────────────────────────── query mutators ────────────────────────────── */

function withMember(list: string[] | undefined, member: string): string[] {
  const base = list ?? [];
  return base.includes(member) ? base : [...base, member];
}

function withoutMember(list: string[] | undefined, member: string): string[] {
  return (list ?? []).filter((m) => m !== member);
}

/** Ensure a category dimension is present on the query (used for X/Color labels). */
function ensureDimension(query: CubeQuery, member: string): CubeQuery {
  return { ...query, dimensions: withMember(query.dimensions, member) };
}

/** Drop a dimension from the query (and clean an empty list to undefined). */
function dropDimension(query: CubeQuery, member: string): CubeQuery {
  const dims = withoutMember(query.dimensions, member);
  return { ...query, dimensions: dims.length ? dims : undefined };
}

/** Set the single edited time dimension, preserving granularity/dateRange. */
function setTimeDimension(query: CubeQuery, td: TimeDimension | undefined): CubeQuery {
  return { ...query, timeDimensions: td ? [td] : undefined };
}

/* ─────────────────────────── mapping (cartesian) ─────────────────────────── */

/** Compose a measures-mode mapping from a category + measures + carried meta. */
function measuresMapping(
  category: string | undefined,
  members: string[],
  meta: Record<string, SeriesMeta>,
): SeriesMapping | undefined {
  if (!category) return undefined;
  return { category: { member: category }, series: buildSeries(members, meta) };
}

/** The existing per-measure pivot meta (axis/etc.) on a chart, if it's in pivot mode. */
function pivotMetaOf(chart: ChartOptions): Record<string, SeriesMeta> | undefined {
  const s = chart.mapping?.series;
  return s && s.mode === "pivot" ? s.meta : undefined;
}

/**
 * Compose a pivot-mode mapping: one or more measures split by a color dimension.
 * `value` stays the primary (first) measure for the axis unit; `values` is added
 * only when more than one measure is split (series = measure × pivot value).
 * `prevMeta` carries forward each still-present measure's meta (e.g. its value axis),
 * so adding/removing a measure never wipes the others' axis assignments.
 */
function pivotMapping(
  category: string | undefined,
  measures: string[],
  pivot: string,
  prevMeta?: Record<string, SeriesMeta>,
): SeriesMapping | undefined {
  if (!category || measures.length === 0) return undefined;
  const meta: Record<string, SeriesMeta> = {};
  for (const m of measures) {
    const entry = prevMeta?.[m];
    if (entry && Object.keys(entry).length > 0) meta[m] = entry;
  }
  const hasMeta = Object.keys(meta).length > 0;
  const series: SeriesMapping["series"] =
    measures.length > 1
      ? { mode: "pivot", value: measures[0], values: measures, pivot, ...(hasMeta ? { meta } : {}) }
      : { mode: "pivot", value: measures[0], pivot, ...(hasMeta ? { meta } : {}) };
  return { category: { member: category }, series };
}

/* ─────────────────────────────── writers ─────────────────────────────────── */

/**
 * Place `member` (of `kind`) into well `wellId` for `family`, returning a full
 * spec. One-cardinality wells replace; many-cardinality wells append. Implements
 * the §2 mapping precisely.
 */
export function placeField(
  spec: ChartSpec,
  family: ChartFamily,
  wellId: string,
  member: string,
  kind: FieldKind,
  registry: FamilyRegistry,
): ChartSpec {
  // Host families supply their own placement writer on the descriptor.
  const hostPlace = registry.require(family).placeField;
  if (hostPlace) return hostPlace(spec, wellId, member, kind);

  switch (family) {
    case "bar":
    case "line":
    case "area":
      return placeCartesian(spec, wellId, member, kind, registry);
    case "combo":
      return placeCombo(spec, wellId, member, kind);
    case "pie":
      return placePie(spec, wellId, member, kind);
    case "scatter":
      return placeScatter(spec, wellId, member);
    case "kpi":
      return placeKpi(spec, member);
    case "table":
      return placeTable(spec, member, kind);
    default:
      return spec;
  }
}

/**
 * Remove `member` from well `wellId`, unbinding it from the query and any
 * family-specific structure. Returns a full spec.
 */
export function removeField(
  spec: ChartSpec,
  family: ChartFamily,
  wellId: string,
  member: string,
  registry: FamilyRegistry,
): ChartSpec {
  // Host families supply their own removal writer on the descriptor.
  const hostRemove = registry.require(family).removeField;
  if (hostRemove) return hostRemove(spec, wellId, member);

  switch (family) {
    case "bar":
    case "line":
    case "area":
      return removeCartesian(spec, wellId, member, registry);
    case "combo":
      return removeCombo(spec, wellId, member);
    case "pie":
      return removePie(spec, wellId, member);
    case "scatter":
      return removeScatter(spec, wellId, member);
    case "kpi":
      return removeKpi(spec, member);
    case "table":
      return removeTable(spec, member);
    default:
      return spec;
  }
}

/* ── bar / line / area ─────────────────────────────────────────────────────── */

function placeCartesian(
  spec: ChartSpec,
  wellId: string,
  member: string,
  kind: FieldKind,
  registry: FamilyRegistry,
): ChartSpec {
  const { query, chart } = spec;
  const wells = readWells(spec, registry);
  const color = wells.color[0];
  const category = categoryOf(chart);
  const meta = seriesMetaOf(chart);

  if (wellId === "y") {
    const measures = wells.y;
    const next = withMember(measures, member);
    if (color) {
      // Multi-measure × color: every measure is split by the colour dimension
      // (series = measure × value). The colour split is NO LONGER cleared when a
      // 2nd measure is added — both coexist (the well shows a series-count note).
      // Carry forward existing per-measure axis assignments.
      return {
        ...spec,
        query: { ...query, measures: next },
        chart: { ...chart, mapping: pivotMapping(category, next, color, pivotMetaOf(chart)) },
      };
    }
    return {
      ...spec,
      query: { ...query, measures: next },
      chart: { ...chart, mapping: measuresMapping(category, next, meta) },
    };
  }

  if (wellId === "x") {
    return placeCartesianX(spec, member, kind, color, registry);
  }

  if (wellId === "color") {
    // A color split = pivot. Every selected measure is split into a series per
    // category value (series = measure × value). All measures stay on the query.
    const measures = wells.y;
    if (measures.length === 0) return spec; // nothing to pivot yet
    const q = ensureDimension({ ...query, measures }, member);
    return {
      ...spec,
      query: q,
      chart: { ...chart, mapping: pivotMapping(category, measures, member, pivotMetaOf(chart)) },
    };
  }

  return spec;
}

function placeCartesianX(
  spec: ChartSpec,
  member: string,
  kind: FieldKind,
  color: string | undefined,
  registry: FamilyRegistry,
): ChartSpec {
  const { query, chart } = spec;
  const prevCategory = categoryOf(chart);
  const measures = readWells(spec, registry).y;
  const meta = seriesMetaOf(chart);

  // Replace any existing X: drop the previous category dim from the query.
  let q = query;
  const prevTime = timeDimensionOf(query);
  if (prevTime && prevCategory === prevTime.dimension) {
    q = setTimeDimension(q, undefined);
  } else if (prevCategory) {
    q = dropDimension(q, prevCategory);
  }

  if (kind === "time") {
    const granularity = prevTime?.granularity ?? adaptiveGranularity(prevTime?.dateRange);
    q = setTimeDimension(q, {
      dimension: member,
      granularity,
      dateRange: prevTime?.dateRange,
    });
  } else {
    q = ensureDimension(q, member);
  }

  const mapping = color
    ? pivotMapping(member, measures, color, pivotMetaOf(chart))
    : measuresMapping(member, measures, meta);
  return { ...spec, query: q, chart: { ...chart, mapping } };
}

function removeCartesian(
  spec: ChartSpec,
  wellId: string,
  member: string,
  registry: FamilyRegistry,
): ChartSpec {
  const { query, chart } = spec;
  const wells = readWells(spec, registry);
  const category = categoryOf(chart);
  const color = wells.color[0];
  const meta = seriesMetaOf(chart);

  if (wellId === "y") {
    const measures = withoutMember(wells.y, member);
    if (color && measures.length >= 1) {
      // Still ≥1 measure to split — stay in pivot mode with the remaining measures
      // (and their carried-forward axis assignments).
      return {
        ...spec,
        query: { ...query, measures },
        chart: { ...chart, mapping: pivotMapping(category, measures, color, pivotMetaOf(chart)) },
      };
    }
    // No measures left (or no color): drop the pivot dim if present, fall back to measures mode.
    const q: CubeQuery = color ? dropDimension({ ...query, measures }, color) : { ...query, measures };
    return { ...spec, query: q, chart: { ...chart, mapping: measuresMapping(category, measures, meta) } };
  }

  if (wellId === "x") {
    let q = query;
    const prevTime = timeDimensionOf(query);
    if (prevTime && prevTime.dimension === member) q = setTimeDimension(q, undefined);
    else q = dropDimension(q, member);
    // No category → mapping collapses to undefined.
    return { ...spec, query: q, chart: { ...chart, mapping: undefined } };
  }

  if (wellId === "color") {
    const q = dropDimension(query, member);
    return {
      ...spec,
      query: q,
      chart: { ...chart, mapping: measuresMapping(category, wells.y, meta) },
    };
  }

  return spec;
}

/* ── combo ─────────────────────────────────────────────────────────────────── */

const COMBO_RENDER_CYCLE: ComboSeriesEntry["render"][] = ["line", "bar"];

function placeCombo(
  spec: ChartSpec,
  wellId: string,
  member: string,
  kind: FieldKind,
): ChartSpec {
  const { query, chart } = spec;
  const fo = familyOptions(spec);

  if (wellId === "x") {
    let q = query;
    const prevCategory = categoryOf(chart);
    const prevTime = timeDimensionOf(query);
    if (prevTime && prevCategory === prevTime.dimension) q = setTimeDimension(q, undefined);
    else if (prevCategory) q = dropDimension(q, prevCategory);

    if (kind === "time") {
      const granularity = prevTime?.granularity ?? adaptiveGranularity(prevTime?.dateRange);
      q = setTimeDimension(q, { dimension: member, granularity, dateRange: prevTime?.dateRange });
    } else {
      q = ensureDimension(q, member);
    }
    return { ...spec, query: q, chart: { ...chart, mapping: { category: { member }, series: comboSeriesAsMapping(spec) } } };
  }

  if (wellId === "y") {
    const series = comboSeries(spec);
    if (series.some((s) => s.member === member)) return spec;
    const render = COMBO_RENDER_CYCLE[series.length % COMBO_RENDER_CYCLE.length];
    const nextSeries = [...series, { member, render }];
    return {
      ...spec,
      query: { ...query, measures: withMember(query.measures, member) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...chart, familyOptions: { ...fo, series: nextSeries }, mapping: comboMapping(chart, nextSeries) },
    };
  }

  return spec;
}

/** The envelope mapping for combo, kept in sync with its `familyOptions.series`. */
function comboMapping(chart: ChartOptions, series: { member: string }[]): SeriesMapping | undefined {
  const category = categoryOf(chart);
  if (!category) return chart.mapping;
  return { category: { member: category }, series: { mode: "measures", members: series.map((s) => s.member) } };
}

function comboSeriesAsMapping(spec: ChartSpec): SeriesMapping["series"] {
  return { mode: "measures", members: comboSeries(spec).map((s) => s.member) };
}

function removeCombo(spec: ChartSpec, wellId: string, member: string): ChartSpec {
  const { query, chart } = spec;
  const fo = familyOptions(spec);

  if (wellId === "x") {
    let q = query;
    const prevTime = timeDimensionOf(query);
    if (prevTime && prevTime.dimension === member) q = setTimeDimension(q, undefined);
    else q = dropDimension(q, member);
    return { ...spec, query: q, chart: { ...chart, mapping: undefined } };
  }

  if (wellId === "y") {
    const nextSeries = comboSeries(spec).filter((s) => s.member !== member);
    const measures = withoutMember(query.measures, member);
    return {
      ...spec,
      query: { ...query, measures },
      chart: { ...chart, familyOptions: { ...fo, series: nextSeries }, mapping: comboMapping(chart, nextSeries) },
    };
  }

  return spec;
}

/* ── pie ───────────────────────────────────────────────────────────────────── */

function placePie(spec: ChartSpec, wellId: string, member: string, kind: FieldKind): ChartSpec {
  const { query, chart } = spec;
  const meta = seriesMetaOf(chart);

  if (wellId === "slices") {
    let q = query;
    const prevCategory = categoryOf(chart);
    const prevTime = timeDimensionOf(query);
    if (prevTime && prevCategory === prevTime.dimension) q = setTimeDimension(q, undefined);
    else if (prevCategory) q = dropDimension(q, prevCategory);

    if (kind === "time") {
      const granularity = prevTime?.granularity ?? adaptiveGranularity(prevTime?.dateRange);
      q = setTimeDimension(q, { dimension: member, granularity, dateRange: prevTime?.dateRange });
    } else {
      q = ensureDimension(q, member);
    }
    return {
      ...spec,
      query: q,
      chart: { ...chart, mapping: measuresMapping(member, measuresOf(chart), meta) },
    };
  }

  if (wellId === "size") {
    const members = [member];
    return {
      ...spec,
      query: { ...query, measures: members },
      chart: { ...chart, mapping: measuresMapping(categoryOf(chart), members, meta) },
    };
  }

  return spec;
}

function removePie(spec: ChartSpec, wellId: string, member: string): ChartSpec {
  const { query, chart } = spec;
  const meta = seriesMetaOf(chart);

  if (wellId === "slices") {
    let q = query;
    const prevTime = timeDimensionOf(query);
    if (prevTime && prevTime.dimension === member) q = setTimeDimension(q, undefined);
    else q = dropDimension(q, member);
    return { ...spec, query: q, chart: { ...chart, mapping: undefined } };
  }

  if (wellId === "size") {
    return {
      ...spec,
      query: { ...query, measures: [] },
      chart: { ...chart, mapping: measuresMapping(categoryOf(chart), [], meta) },
    };
  }

  return spec;
}

/* ── scatter ───────────────────────────────────────────────────────────────── */

const SCATTER_WELL_TO_KEY: Record<string, "x" | "y" | "size" | "groupBy"> = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy",
};

function placeScatter(spec: ChartSpec, wellId: string, member: string): ChartSpec {
  const key = SCATTER_WELL_TO_KEY[wellId];
  if (!key) return spec;
  const { query, chart } = spec;
  const fo = { ...familyOptions(spec) };
  const prev = fo[key] as string | undefined;
  fo[key] = member;

  let q = query;
  // x/y/size are measures; color (groupBy) is a dimension.
  if (key === "groupBy") {
    if (prev && prev !== member) q = dropDimension(q, prev);
    q = ensureDimension(q, member);
  } else {
    const measures = prev ? withoutMember(query.measures, prev) : query.measures;
    q = { ...query, measures: withMember(measures, member) };
  }
  return { ...spec, query: q, chart: { ...chart, familyOptions: fo } };
}

function removeScatter(spec: ChartSpec, wellId: string, member: string): ChartSpec {
  const key = SCATTER_WELL_TO_KEY[wellId];
  if (!key) return spec;
  const { query, chart } = spec;
  const fo = { ...familyOptions(spec) };
  delete fo[key];

  let q = query;
  if (key === "groupBy") q = dropDimension(q, member);
  else {
    const measures = withoutMember(query.measures, member);
    q = { ...query, measures: measures.length ? measures : [] };
  }
  return { ...spec, query: q, chart: { ...chart, familyOptions: fo } };
}

/* ── kpi ───────────────────────────────────────────────────────────────────── */

function placeKpi(spec: ChartSpec, member: string): ChartSpec {
  const { query, chart } = spec;
  const fo = { ...familyOptions(spec), measure: member };
  return { ...spec, query: { ...query, measures: [member] }, chart: { ...chart, familyOptions: fo } };
}

function removeKpi(spec: ChartSpec, member: string): ChartSpec {
  const { query, chart } = spec;
  const fo = { ...familyOptions(spec) };
  if (fo.measure === member) delete fo.measure;
  return { ...spec, query: { ...query, measures: [] }, chart: { ...chart, familyOptions: fo } };
}

/* ── table ─────────────────────────────────────────────────────────────────── */

function placeTable(spec: ChartSpec, member: string, kind: FieldKind): ChartSpec {
  const { query, chart } = spec;
  const cols = tableColumns(spec);
  if (cols.some((c) => c.member === member)) return spec;

  let q = query;
  if (kind === "number") q = { ...query, measures: withMember(query.measures, member) };
  else if (kind === "time") {
    const prevTime = timeDimensionOf(query);
    const granularity = prevTime?.granularity ?? adaptiveGranularity(prevTime?.dateRange);
    // Tables can carry multiple time dims; append rather than replace.
    const existing = query.timeDimensions ?? [];
    if (!existing.some((t) => t.dimension === member)) {
      q = { ...query, timeDimensions: [...existing, { dimension: member, granularity }] };
    }
  } else q = ensureDimension(query, member);

  const fo = { ...familyOptions(spec), columns: [...cols, { member }] };
  return { ...spec, query: q, chart: { ...chart, familyOptions: fo } };
}

function removeTable(spec: ChartSpec, member: string): ChartSpec {
  const { query, chart } = spec;
  const cols = tableColumns(spec).filter((c) => c.member !== member);

  let q = query;
  const measures = withoutMember(query.measures, member);
  if (measures.length !== (query.measures?.length ?? 0)) {
    q = { ...q, measures: measures.length ? measures : undefined };
  }
  const dims = withoutMember(query.dimensions, member);
  if (dims.length !== (query.dimensions?.length ?? 0)) {
    q = { ...q, dimensions: dims.length ? dims : undefined };
  }
  const tds = (query.timeDimensions ?? []).filter((t) => t.dimension !== member);
  if (tds.length !== (query.timeDimensions?.length ?? 0)) {
    q = { ...q, timeDimensions: tds.length ? tds : undefined };
  }

  const fo = { ...familyOptions(spec), columns: cols };
  return { ...spec, query: q, chart: { ...chart, familyOptions: fo } };
}
