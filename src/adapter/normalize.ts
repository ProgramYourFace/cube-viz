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

/** A ResultSet with the handful of methods we use, loosely typed. */
type AnyResultSet = ResultSet<Record<string, unknown>>;

/** The two `mapping.series` variants, extracted from the discriminated union. */
type SeriesSpec = SeriesMapping["series"];
type MeasuresSeries = Extract<SeriesSpec, { mode: "measures" }>;
type PivotSeries = Extract<SeriesSpec, { mode: "pivot" }>;

/* ──────────────────────────── color assignment ──────────────────────────── */

/**
 * Assign a `colorToken` to each series. Explicit `colors.byKey[series.key]` wins;
 * everything else cycles the ramp (`colors.ramp` ?? {@link DEFAULT_COLOR_RAMP})
 * round-robin. Series that already carry a `colorToken` (e.g. from `SeriesMeta`)
 * keep it. Mutates and returns the same array for ergonomic chaining.
 */
export function assignColors(
  series: NormalizedSeries[],
  colors?: ChartOptions["colors"],
): NormalizedSeries[] {
  const ramp = colors?.ramp?.length ? colors.ramp : DEFAULT_COLOR_RAMP;
  const byKey = colors?.byKey ?? {};
  let rampIndex = 0;
  for (const s of series) {
    const explicit = byKey[s.key] ?? s.colorToken;
    if (explicit) {
      s.colorToken = explicit;
    } else {
      s.colorToken = ramp[rampIndex % ramp.length];
      rampIndex += 1;
    }
  }
  return series;
}

/* ─────────────────────────── annotation mapping ─────────────────────────── */

function toAnnotatedMember(a: {
  title?: string;
  shortTitle?: string;
  type?: string;
  meta?: unknown;
}): AnnotatedMember {
  const meta = (a.meta ?? undefined) as AnnotatedMember["meta"];
  return {
    title: a.title,
    shortTitle: a.shortTitle,
    type: a.type,
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

  // Format: chart-level default, then per-series override.
  const format = specMeta?.format ?? chartFormat;
  if (format) out.format = format;

  if (specMeta?.axis) out.axis = specMeta.axis;
  if (specMeta?.stackId) out.stackId = specMeta.stackId;

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
): NormalizedChartData {
  const annotation = toResultAnnotation(resultSet.annotation() as Parameters<typeof toResultAnnotation>[0]);
  const rows = resultSet.tablePivot() as Record<string, unknown>[];

  const mapping = options.mapping;

  // No mapping (scatter/kpi/table carry their own mapping in familyOptions): hand
  // back the raw rows with an empty series list so those families can read raw.
  if (!mapping) {
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

  assignColors(series, options.colors);

  return {
    categories,
    series,
    raw: { rows, annotation, query: resolvedQuery },
    empty: rows.length === 0,
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
      meta: resolveSeriesMeta(memberMeta, specMeta, options.format),
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
  const { value, pivot: pivotMember } = series;
  const pivotConfig = { x: [categoryMember], y: [pivotMember, "measures"] };

  const seriesNames = resultSet.seriesNames(pivotConfig) as Array<{
    key: string;
    shortTitle?: string;
    title?: string;
    yValues?: string[];
  }>;
  const chartRows = resultSet.chartPivot(pivotConfig) as Array<Record<string, unknown>>;

  // The plotted measure's meta drives formatting for every pivot series.
  const valueMeta = findMember(annotation, value);

  return seriesNames.map((sn): NormalizedSeries => {
    // For pivot, the leading yValue is the distinct pivot value — the natural label.
    const pivotValue = sn.yValues?.[0];
    const label = pivotValue ?? sn.shortTitle ?? sn.title ?? sn.key;
    const data = chartRows.map((row) => coerceNumber(row[sn.key]));
    return {
      key: sn.key,
      label,
      data,
      meta: resolveSeriesMeta(valueMeta, undefined, options.format),
    };
  });
}

/** Coerce a chart-pivot cell to `number | null`. `castNumerics` usually did this already. */
function coerceNumber(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
