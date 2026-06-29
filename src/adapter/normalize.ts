import type { ResultSet } from "@cubejs-client/core";
import type {
  ChartColorToken,
  ChartOptions,
  CubeQuery,
  FormatOptions,
  SeriesMapping,
  SeriesMeta,
} from "@/spec";
import type {
  AnnotatedMember,
  NormalizedChartData,
  NormalizedSeries,
  ResultAnnotation,
  SeriesValueMeta,
} from "@/adapter/types";
import type { UnitDef } from "@/units";
import { builtinFamilyRegistry, type FamilyRegistry } from "@/charts";

/**
 * The resultSet → NormalizedChartData adapter — the single abstraction boundary
 * between Cube and the renderer (docs/01-spec-schema.md §6). Chart components
 * consume `NormalizedChartData`; they never touch a Cube `ResultSet`.
 *
 * The Cube types are kept loose and cast at the boundary (the SDK's shapes are
 * `any`-heavy), but OUR output is strictly typed.
 */

/** The default 5-token shadcn ramp, used when `ColorAssignment.ramp` is absent. */
export const DEFAULT_COLOR_RAMP: ChartColorToken[] = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
];

/** Max distinct series a pivot renders before the tail is rolled into an "Other" series,
 *  so a high-cardinality split stays legible (mirrors the pie family's slice rollup). */
const MAX_PIVOT_SERIES = 8;

/** A ResultSet with the handful of methods we use, loosely typed. */
type AnyResultSet = ResultSet<Record<string, unknown>>;

/**
 * True when there is nothing PLOTTABLE: no series, or every datum across every series
 * is null (coerceNumber maps null/''/non-finite measures to null). The aggregate
 * `empty` flag keys on row count alone, so a query returning rows whose measure is
 * null in every bucket would render a fully-mounted but blank cartesian chart. Folding
 * this into `empty` lets ChartRenderer's shared muted "No data" fire once for the
 * series-reading families (line/bar/area/combo) — the polar/raw families (pie/scatter/
 * kpi/table) keep their own guards and never reach this (they return `series: []`).
 */
function allSeriesNull(series: NormalizedSeries[]): boolean {
  return series.every((s) => s.data.every((v) => v === null));
}

/** The two `mapping.series` variants, extracted from the discriminated union. */
type SeriesSpec = SeriesMapping["series"];
type MeasuresSeries = Extract<SeriesSpec, { mode: "measures" }>;
type PivotSeries = Extract<SeriesSpec, { mode: "pivot" }>;

/* ──────────────────────────── color assignment ──────────────────────────── */

/**
 * Resolve the `colorToken` for each series position — the SINGLE source of truth
 * for series color, shared by the renderer ({@link assignColors}) and the editor
 * (the on-chart FieldPill swatch) so they NEVER disagree. Explicit colors
 * (per-series `colorToken` or `colors.byKey[key]`) win; unset series take the next
 * ramp colour (`colors.ramp` ?? {@link DEFAULT_COLOR_RAMP}) that isn't already
 * CLAIMED — by an explicit colour anywhere or an earlier auto-assignment — so
 * auto-coloured series stay distinct (e.g. an explicit `chart-1` won't make the
 * next unset series also `chart-1`). Returns one token per input, index-aligned; pure.
 */
export function resolveSeriesColors(
  series: ReadonlyArray<{ key: string; colorToken?: ChartColorToken }>,
  colors?: ChartOptions["colors"],
): ChartColorToken[] {
  const ramp = colors?.ramp?.length ? colors.ramp : DEFAULT_COLOR_RAMP;
  const byKey = colors?.byKey ?? {};
  const explicitOf = (key: string, token?: ChartColorToken): ChartColorToken | undefined =>
    byKey[key] ?? token;

  // Pre-claim every explicit colour so the ramp can route around all of them.
  const used = new Set<ChartColorToken>();
  for (const s of series) {
    const explicit = explicitOf(s.key, s.colorToken);
    if (explicit) used.add(explicit);
  }

  let rampIndex = 0;
  const nextRampColor = (): ChartColorToken => {
    // Advance to the next unclaimed ramp colour; if all are claimed, plain-cycle.
    for (let i = 0; i < ramp.length; i++) {
      const token = ramp[rampIndex++ % ramp.length];
      if (!used.has(token)) {
        used.add(token);
        return token;
      }
    }
    return ramp[rampIndex++ % ramp.length];
  };

  return series.map((s) => explicitOf(s.key, s.colorToken) ?? nextRampColor());
}

/**
 * Assign a `colorToken` to each series via {@link resolveSeriesColors}. Mutates and
 * returns the same array for ergonomic chaining.
 */
export function assignColors(
  series: NormalizedSeries[],
  colors?: ChartOptions["colors"],
): NormalizedSeries[] {
  const resolved = resolveSeriesColors(series, colors);
  series.forEach((s, i) => {
    s.colorToken = resolved[i];
  });
  return series;
}

/* ─────────────────────────── annotation mapping ─────────────────────────── */

function toAnnotatedMember(a: {
  title?: string;
  shortTitle?: string;
  type?: string;
  format?: string;
  meta?: unknown;
}): AnnotatedMember {
  const meta = (a.meta ?? undefined) as AnnotatedMember["meta"];
  return {
    title: a.title,
    shortTitle: a.shortTitle,
    type: a.type,
    ...(a.format ? { format: a.format } : {}),
    ...(meta ? { meta } : {}),
  };
}

function mapRecord(
  src: Record<string, { title?: string; shortTitle?: string; type?: string; meta?: unknown }>,
): Record<string, AnnotatedMember> {
  const out: Record<string, AnnotatedMember> = {};
  for (const key of Object.keys(src)) out[key] = toAnnotatedMember(src[key]);
  return out;
}

/** Convert Cube's `QueryAnnotations` into our `ResultAnnotation` shape. */
export function toResultAnnotation(raw: {
  measures?: Record<string, { title?: string; shortTitle?: string; type?: string; meta?: unknown }>;
  dimensions?: Record<string, { title?: string; shortTitle?: string; type?: string; meta?: unknown }>;
  segments?: Record<string, { title?: string; shortTitle?: string; type?: string; meta?: unknown }>;
  timeDimensions?: Record<
    string,
    { title?: string; shortTitle?: string; type?: string; meta?: unknown }
  >;
}): ResultAnnotation {
  return {
    measures: mapRecord(raw.measures ?? {}),
    dimensions: mapRecord(raw.dimensions ?? {}),
    segments: mapRecord(raw.segments ?? {}),
    timeDimensions: mapRecord(raw.timeDimensions ?? {}),
  };
}

/* ───────────────────────────── meta resolution ──────────────────────────── */

/** Look a member up across measures/dimensions/timeDimensions of the annotation. */
function findMember(ann: ResultAnnotation, member: string): AnnotatedMember | undefined {
  return ann.measures[member] ?? ann.dimensions[member] ?? ann.timeDimensions[member];
}

/**
 * Build the per-series value meta: formatting hints from the member's Cube
 * `meta.{unit,quantity,convert}`, then spec overrides (axis/stackId/format).
 */
function resolveSeriesMeta(
  memberMeta: AnnotatedMember | undefined,
  specMeta: SeriesMeta | undefined,
  chartFormat: FormatOptions | undefined,
): SeriesValueMeta {
  const m = memberMeta?.meta;
  const out: SeriesValueMeta = {};

  if (m?.unit !== undefined) out.unit = m.unit;
  if (m?.quantity !== undefined) out.quantity = m.quantity;
  if (m?.convert !== undefined) out.convert = m.convert;

  // Cube's `format` annotation refines AUTO formatting by default (explicit spec
  // formats below still win). Match by PREFIX so named/precision variants count too —
  // "percent" / "percent_2" → "%" suffix (0–100 values); "currency" / "currency_1" /
  // "accounting" → currency kind.
  const fmtName = typeof memberMeta?.format === "string" ? memberMeta.format : undefined;
  if (fmtName?.startsWith("percent") && out.unit === undefined) out.unit = "%";

  // Format: per-series override, then chart-level default.
  let format = specMeta?.format ?? chartFormat;
  if (
    (fmtName?.startsWith("currency") || fmtName?.startsWith("accounting")) &&
    (!format || format.kind === undefined || format.kind === "auto")
  ) {
    format = { ...format, kind: "currency" };
  }
  if (format) out.format = format;

  if (specMeta?.axis) out.axis = specMeta.axis;
  if (specMeta?.stackId) out.stackId = specMeta.stackId;
  if (specMeta?.curve) out.curve = specMeta.curve;
  if (specMeta?.dots !== undefined) out.dots = specMeta.dots;

  return out;
}

/** Resolve a series label: spec override → annotation shortTitle → fallback key. */
function resolveLabel(
  memberMeta: AnnotatedMember | undefined,
  specMeta: SeriesMeta | undefined,
  fallback: string,
): string {
  return specMeta?.label ?? memberMeta?.shortTitle ?? memberMeta?.title ?? fallback;
}

/* ───────────────────────────── unit conversion ──────────────────────────── */

/** The viewer's unit system + the conversion table, threaded in from the provider. */
export interface ConvertCtx {
  unitSystem?: "metric" | "imperial";
  conversions?: Record<string, UnitDef>;
}

/** A resolved per-measure conversion: how to convert a value + the display unit. */
interface MemberConversion {
  to: (v: number) => number;
  unit: string;
}

/**
 * Build the `measure → conversion` map for the active unit system. Conversion happens
 * HERE at the adapter boundary (not at format time) so Recharts scales axes on the
 * DISPLAY unit and picks round-number gridlines (e.g. 0/25/50 mi, not 0/31/62). Empty
 * for metric viewers / unconvertible members, so the metric path is a pure no-op.
 *
 * Mutates `annotation` in place: a converted measure's `meta.unit` becomes the display
 * unit, so the (display-only) formatter shows the right suffix and never re-converts.
 */
function buildConversions(annotation: ResultAnnotation, ctx?: ConvertCtx): Map<string, MemberConversion> {
  const map = new Map<string, MemberConversion>();
  if (ctx?.unitSystem !== "imperial" || !ctx.conversions) return map;
  for (const [member, m] of Object.entries(annotation.measures)) {
    const unit = m.meta?.unit;
    if (!unit || m.meta?.convert === false) continue;
    const def = ctx.conversions[unit];
    if (!def) continue;
    map.set(member, { to: def.toImperial, unit: def.imperialUnit });
    // Reflect the display unit so the formatter suffixes "mi" (and doesn't re-convert).
    annotation.measures[member] = { ...m, meta: { ...m.meta, unit: def.imperialUnit } };
  }
  return map;
}

/** Convert raw `tablePivot` rows for every convertible measure column (clone, not mutate). */
function convertRows(
  rows: Record<string, unknown>[],
  conv: Map<string, MemberConversion>,
): Record<string, unknown>[] {
  if (conv.size === 0) return rows;
  return rows.map((row) => {
    const out = { ...row };
    for (const [member, c] of conv) {
      const v = coerceNumber(out[member]);
      if (v !== null) out[member] = c.to(v);
    }
    return out;
  });
}

/** Convert a built series' data in place, by its source measure (`meta.measure`). */
function convertSeries(series: NormalizedSeries[], conv: Map<string, MemberConversion>): void {
  if (conv.size === 0) return;
  for (const s of series) {
    const c = s.meta?.measure ? conv.get(s.meta.measure) : undefined;
    if (!c) continue;
    s.data = s.data.map((v) => (v === null ? null : c.to(v)));
  }
}

/* ──────────────────────────────── normalize ─────────────────────────────── */

/**
 * Normalize a Cube `ResultSet` into `NormalizedChartData` using the chart's
 * `SeriesMapping`. `resolvedQuery` is the literal (variables-substituted) query
 * that produced the result — stored verbatim on `raw.query`.
 *
 * - `mode: "measures"` → one series per listed measure; categories from the
 *   category member's buckets; data aligned via `chartPivot()`.
 * - `mode: "pivot"` → one series per distinct pivot value, via
 *   `pivotConfig.y = [pivot, "measures"]`; ramp colors round-robin.
 */
export function normalize(
  resultSet: AnyResultSet,
  options: ChartOptions,
  resolvedQuery: CubeQuery,
  convertCtx?: ConvertCtx,
  families: FamilyRegistry = builtinFamilyRegistry,
): NormalizedChartData {
  const annotation = toResultAnnotation(resultSet.annotation() as Parameters<typeof toResultAnnotation>[0]);
  // Resolve unit conversion ONCE, at the boundary: rewrites convertible measures'
  // annotation unit to the display unit and yields the value-conversion map applied to
  // raw rows + series below (no-op for metric viewers).
  const conv = buildConversions(annotation, convertCtx);
  const rows = convertRows(resultSet.tablePivot() as Record<string, unknown>[], conv);

  const mapping = options.mapping;

  if (!mapping) {
    const measures = resolvedQuery.measures ?? [];
    // Measure-only chart (measures but NO category → no mapping): rather than render
    // blank, plot one mark per measure from the single aggregate row (categories = the
    // measure labels). scatter/kpi/table intentionally read raw, so they keep the empty
    // series list.
    if (families.require(options.family).measureOnly && measures.length > 0) {
      const row = rows[0] ?? {};
      // rows are already converted, but each datum here is a DIFFERENT measure (one mark
      // per measure), so the per-row conversion above already applied — read directly.
      const series: NormalizedSeries[] = [
        {
          key: "value",
          label: "Value",
          data: measures.map((m) => coerceNumber(row[m])),
          meta: { ...resolveSeriesMeta(findMember(annotation, measures[0]), undefined, options.format), measure: measures[0] },
        },
      ];
      assignColors(series, options.colors);
      const categories = measures.map(
        (m) => findMember(annotation, m)?.shortTitle ?? findMember(annotation, m)?.title ?? m,
      );
      return {
        categories,
        series,
        raw: { rows, annotation, query: resolvedQuery },
        empty: rows.length === 0 || allSeriesNull(series),
      };
    }
    // Scatter / kpi / table carry their own mapping in familyOptions: hand back the raw
    // rows with an empty series list so those families read raw.
    return {
      categories: [],
      series: [],
      raw: { rows, annotation, query: resolvedQuery },
      empty: rows.length === 0,
    };
  }

  const series =
    mapping.series.mode === "measures"
      ? normalizeMeasures(resultSet, mapping.series, options, annotation)
      : normalizePivot(resultSet, mapping.category.member, mapping.series, options, annotation);

  const categories = readCategories(resultSet, mapping);

  // Series are built from the ORIGINAL resultSet (storage units); convert their data to
  // the display unit so the chart axis scales — and ticks round — in display units.
  convertSeries(series, conv);
  assignColors(series, options.colors);

  return {
    categories,
    series,
    raw: { rows, annotation, query: resolvedQuery },
    empty: rows.length === 0 || allSeriesNull(series),
  };
}

/** x-axis labels: the `x` of every chart-pivot row (time bucket or dimension value). */
function readCategories(resultSet: AnyResultSet, mapping: SeriesMapping): (string | number)[] {
  const pivotConfig =
    mapping.series.mode === "pivot"
      ? { x: [mapping.category.member], y: [mapping.series.pivot, "measures"] }
      : undefined;
  const pivot = resultSet.chartPivot(pivotConfig) as Array<{ x: string }>;
  return pivot.map((r) => r.x);
}

/* mode (a): one NormalizedSeries per listed measure. */
function normalizeMeasures(
  resultSet: AnyResultSet,
  series: MeasuresSeries,
  options: ChartOptions,
  annotation: ResultAnnotation,
): NormalizedSeries[] {
  const { members, meta: seriesMetaMap } = series;
  const pivot = resultSet.chartPivot() as Array<Record<string, unknown>>;

  return members.map((member): NormalizedSeries => {
    const memberMeta = findMember(annotation, member);
    const specMeta = seriesMetaMap?.[member];
    const data = pivot.map((row) => coerceNumber(row[member]));
    return {
      key: member,
      label: resolveLabel(memberMeta, specMeta, member),
      data,
      ...(specMeta?.colorToken ? { colorToken: specMeta.colorToken } : {}),
      meta: { ...resolveSeriesMeta(memberMeta, specMeta, options.format), measure: member },
    };
  });
}

/* mode (b): one NormalizedSeries per distinct pivot value. */
function normalizePivot(
  resultSet: AnyResultSet,
  categoryMember: string,
  series: PivotSeries,
  options: ChartOptions,
  annotation: ResultAnnotation,
): NormalizedSeries[] {
  const { value, values, pivot: pivotMember } = series;
  // One or many split measures. `values` (when present) is the full ordered list;
  // `value` is its first entry (the back-compat single-measure path).
  const measures = values && values.length > 0 ? values : [value];
  const measureSet = new Set(measures);
  const multiMeasure = measures.length > 1;
  const pivotConfig = { x: [categoryMember], y: [pivotMember, "measures"] };

  const allSeriesNames = resultSet.seriesNames(pivotConfig) as Array<{
    key: string;
    shortTitle?: string;
    title?: string;
    yValues?: string[];
  }>;
  // Keep only series whose measure is one we're splitting. Single-measure pivot →
  // one series per pivot value; multi-measure → one series per (measure × value).
  const seriesNames = allSeriesNames.filter((sn) => {
    const measure = sn.yValues && sn.yValues.length >= 2 ? sn.yValues[sn.yValues.length - 1] : undefined;
    return measure === undefined || measureSet.has(measure);
  });
  const chartRows = resultSet.chartPivot(pivotConfig) as Array<Record<string, unknown>>;

  // The primary measure's meta drives the value-axis unit (single-measure case).
  const valueMeta = findMember(annotation, value);

  const all = seriesNames.map((sn): NormalizedSeries => {
    // yValues = [pivotValue, measure]. The pivot value is the natural label; in
    // multi-measure mode we prefix the measure so series stay distinguishable.
    const pivotValue = sn.yValues?.[0];
    const measure = sn.yValues && sn.yValues.length >= 2 ? sn.yValues[sn.yValues.length - 1] : value;
    const measureMeta = findMember(annotation, measure);
    const measureLabel = measureMeta?.shortTitle ?? measureMeta?.title ?? measure;
    const base = pivotValue ?? sn.shortTitle ?? sn.title ?? sn.key;
    const label = multiMeasure ? `${measureLabel} · ${base}` : base;
    const data = chartRows.map((row) => coerceNumber(row[sn.key]));
    // Per-MEASURE spec meta carries the value-axis (left/right) for dual-axis splits.
    const measureSpecMeta = series.meta?.[measure];
    return {
      key: sn.key,
      label,
      data,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...resolveSeriesMeta(measureMeta ?? valueMeta, measureSpecMeta, options.format),
        measure,
      },
    };
  });

  return rollupPivotSeries(all, valueMeta, options.format);
}

/**
 * Cap a pivot to the top {@link MAX_PIVOT_SERIES} series (ranked by total) and fold the
 * rest into a single element-wise-summed "Other" series, so a high-cardinality split
 * stays legible instead of emitting dozens of indistinguishable, color-cycling series.
 */
function rollupPivotSeries(
  series: NormalizedSeries[],
  valueMeta: AnnotatedMember | undefined,
  format: ChartOptions["format"],
): NormalizedSeries[] {
  if (series.length <= MAX_PIVOT_SERIES) return series;

  const sum = (s: NormalizedSeries): number => s.data.reduce<number>((a, v) => a + (v ?? 0), 0);
  const ranked = [...series].sort((a, b) => sum(b) - sum(a));
  const top = ranked.slice(0, MAX_PIVOT_SERIES - 1);
  const rest = ranked.slice(MAX_PIVOT_SERIES - 1);

  const len = series[0]?.data.length ?? 0;
  const otherData: (number | null)[] = Array.from({ length: len }, (_, i) => {
    let sumAtI = 0;
    let any = false;
    for (const s of rest) {
      const v = s.data[i];
      if (v !== null) {
        sumAtI += v;
        any = true;
      }
    }
    return any ? sumAtI : null;
  });

  const other: NormalizedSeries = {
    key: "__other",
    label: `Other (${rest.length})`,
    data: otherData,
    meta: { ...resolveSeriesMeta(valueMeta, undefined, format), ...(top[0]?.meta?.measure ? { measure: top[0].meta.measure } : {}) },
  };
  return [...top, other];
}

/** Coerce a chart-pivot cell to `number | null`. `castNumerics` usually did this already. */
function coerceNumber(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
