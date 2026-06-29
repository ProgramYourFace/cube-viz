import type { ChartOptions, AxisOptions, LegendOptions } from "@/spec";
import type { NormalizedChartData, NormalizedSeries } from "@/adapter/types";
import type { ChartConfig } from "@/components/ui/chart";
import type { ChartFormat } from "@/format";
import { colorVarName } from "@/components/ui/utils";

/**
 * Internal helpers shared by the chart families (NOT a family; not exported from
 * the public barrel). Keeps the per-family files focused on their Recharts
 * mapping. See docs/02-chart-options.md §3 (the mapping seam).
 */

/** A Recharts-shaped row: `{ __cat, <seriesKey>: value, … }` built from normalized data. */
export type ChartRow = Record<string, string | number | null>;

/**
 * Build the recharts data array from `categories` + each series' aligned `data`.
 * This row shape exists ONLY here — never in a spec.
 */
export function buildRows(data: NormalizedChartData): ChartRow[] {
  return data.categories.map((cat, i) => {
    const row: ChartRow = { __cat: typeof cat === "number" ? cat : String(cat) };
    for (const s of data.series) row[s.key] = s.data[i] ?? null;
    return row;
  });
}

/** Recharts legend `verticalAlign` from the envelope legend position. */
export function legendVerticalAlign(position?: LegendOptions["position"]): "top" | "bottom" {
  return position === "top" ? "top" : "bottom";
}

/**
 * Recharts legend `layout`. NOTE: shadcn's ChartLegendContent is a horizontal
 * flex row; passing Recharts `layout="vertical"` makes it measure full-width and
 * RESERVE nearly all horizontal space, collapsing polar charts (pie radius → 0).
 * Until a dedicated vertical-legend component exists, legends are horizontal and
 * left/right positions degrade to a bottom legend. (Tracked for the theming pass.)
 */
export function legendLayout(_position?: LegendOptions["position"]): "horizontal" | "vertical" {
  return "horizontal";
}

export function legendAlign(_position?: LegendOptions["position"]): "left" | "center" | "right" {
  return "center";
}

/**
 * Whether to render the legend. The legend shows unless `legend.show:false` — in BOTH
 * view and edit mode (a hidden legend is hidden, not greyed: the dedicated LegendChrome
 * toggle in the editor is the re-enable affordance, so there's no need to keep a ghost
 * legend on the chart). `greyed` is retained (always false) for call-site stability.
 */
export function legendDisplay(
  options: ChartOptions,
  _editing?: boolean,
): { show: boolean; greyed: boolean } {
  return { show: options.legend?.show !== false, greyed: false };
}

/** Recharts numeric-axis `domain` from an AxisOptions (defaults to auto/auto). */
export function axisDomain(
  axis?: AxisOptions,
): [number | "auto", number | "auto"] | undefined {
  return axis?.domain;
}

/** Recharts `scale` from an AxisOptions ("linear" | "log"), default "auto". */
export function axisScale(axis?: AxisOptions): "auto" | "linear" | "log" {
  return axis?.scale ?? "auto";
}

/** The bar/area corner-radius tuple, flipped for horizontal layout. */
export function cornerRadius(
  radius: number | undefined,
  horizontal: boolean,
): [number, number, number, number] {
  const r = radius ?? 0;
  // vertical: round top corners; horizontal (layout=vertical): round right corners.
  return horizontal ? [0, r, r, 0] : [r, r, 0, 0];
}

/** Series fill via the shadcn `--color-<key>` custom property (set by ChartConfig).
 *  Uses {@link colorVarName} so dotted/spaced member keys produce a VALID var. */
export function seriesColorVar(series: NormalizedSeries): string {
  return `var(${colorVarName(series.key)})`;
}

/** Build the shadcn ChartConfig from normalized series (key → {label, color}). */
export function configFromSeries(data: NormalizedChartData): ChartConfig {
  const cfg: ChartConfig = {};
  for (const s of data.series) {
    cfg[s.key] = { label: s.label, color: `var(--${s.colorToken ?? "chart-1"})` };
  }
  return cfg;
}

/** True when the chart should hide all chrome (sparkline mode). */
export function isStacked(stackMode: ChartOptions["stackMode"]): boolean {
  return stackMode === "stacked" || stackMode === "percent";
}

/** A representative series member for a value axis (single-unit axes share one). */
export function primaryMember(data: NormalizedChartData): string | undefined {
  return data.series[0]?.key;
}

/**
 * The text for each axis label: the spec override (`axes.{x,y,y2}.label`) when set,
 * else AUTO-derived from the mapped members — the category member for x, the left/right
 * value series for y/y2 (the pivot value measure in color-split mode). The editor lets a
 * user type an override directly on the chart; otherwise these sensible labels just show.
 */
export function resolvedAxisLabels(
  data: NormalizedChartData,
  options: ChartOptions,
): { x?: string; left?: string; right?: string } {
  const a = data.raw.annotation;
  const lbl = (m?: string): string | undefined => {
    if (!m) return undefined;
    return (
      a?.measures[m]?.shortTitle ??
      a?.dimensions[m]?.shortTitle ??
      a?.timeDimensions[m]?.shortTitle ??
      a?.measures[m]?.title ??
      a?.dimensions[m]?.title ??
      a?.timeDimensions[m]?.title ??
      m
    );
  };
  const left = data.series.find((s) => (s.meta?.axis ?? "left") !== "right");
  const right = data.series.find((s) => s.meta?.axis === "right");
  // Prefer the series' SOURCE measure for the axis title (a pivot series' own key is a
  // pivot value — a device name — with no unit; its `meta.measure` is the real measure).
  const axisLbl = (s?: NormalizedSeries): string | undefined =>
    s ? (s.meta?.measure ? lbl(s.meta.measure) : s.label) : undefined;
  return {
    x: options.axes?.x?.labelHide ? undefined : (options.axes?.x?.label ?? lbl(options.mapping?.category?.member)),
    left: options.axes?.y?.labelHide ? undefined : (options.axes?.y?.label ?? axisLbl(left)),
    right: options.axes?.y2?.labelHide ? undefined : (options.axes?.y2?.label ?? axisLbl(right)),
  };
}

/** The Cube measure that drives a series' value-axis unit (`meta.measure` ?? its key). */
export function seriesMember(series: NormalizedSeries | undefined): string | undefined {
  return series?.meta?.measure ?? series?.key;
}

/** A `seriesKey → source measure` map so the tooltip resolves each row's unit correctly. */
export function memberByKey(data: NormalizedChartData): Map<string, string> {
  return new Map(data.series.map((s) => [s.key, s.meta?.measure ?? s.key]));
}

/**
 * The measure whose unit the value axis / tooltip / labels should use. In PIVOT
 * (color-split) mode every series IS the same measure (split into one series per
 * category value), so units come from the pivot VALUE measure — NOT each series'
 * key, which is a pivot value (e.g. a device name) and carries no unit meta.
 * Returns undefined in measures mode (callers fall back to the per-series key).
 */
export function pivotValueMember(options: ChartOptions): string | undefined {
  const s = options.mapping?.series;
  return s && s.mode === "pivot" ? s.value : undefined;
}

/**
 * Adapt the injected {@link ChartFormat} for shadcn `ChartTooltipContent`'s
 * `valueFormatter` prop: formats ONLY the value text (keeping the swatch + label)
 * and threads the payload item's `dataKey` (the Cube member) so units/conversion
 * are applied per series. Pass `memberOverride` when the tooltip member is not the
 * item's dataKey (e.g. pie, whose single measure is `data.series[0].key`).
 */
export function tooltipValueFormatter(
  format: ChartFormat,
  memberOverride?: string,
  keyToMember?: Map<string, string>,
): (value: unknown, item: { dataKey?: unknown; name?: unknown }) => string {
  return (value, item) => {
    const dk = item?.dataKey;
    const key = typeof dk === "string" || typeof dk === "number" ? String(dk) : undefined;
    // Per-series source measure wins (pivot rows key on a pivot value with no unit),
    // then an explicit override, then the raw dataKey.
    const member = (key ? keyToMember?.get(key) : undefined) ?? memberOverride ?? key;
    return format.value(value as number | string | null | undefined, member, "tooltip");
  };
}

/**
 * A percent tick for the `percent` stackMode (bar/area). The injected
 * {@link ChartFormat} carries the spec's value-unit FormatOptions, which is the
 * wrong scale for an expanded 0..1 stack — so the percent axis is a pure
 * chart-geometry concern formatted locally via Intl (not a host unit rule).
 */
export function percentTick(value: number | string | null | undefined, locale?: string): string {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "";
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(n);
}

/**
 * percent-stack tooltip: show each series' SHARE of its row total, not the raw value.
 * The tooltip payload carries the ORIGINAL datum (Recharts expands only the geometry),
 * so derive the share from `item.payload` (the `{__cat, <key>: value}` row). Mirrors
 * percentTick's no-data convention (empty string) when the row total is 0 / non-finite.
 */
export function percentShareFormatter(
  locale?: string,
): (value: unknown, item: { payload?: Record<string, unknown> }) => string {
  return (value, item) => {
    const n = typeof value === "number" ? value : Number(value);
    const row = item?.payload;
    let total = 0;
    if (row) {
      for (const [k, v] of Object.entries(row)) {
        if (k === "__cat") continue;
        const num = typeof v === "number" ? v : Number(v);
        if (Number.isFinite(num)) total += num;
      }
    }
    if (!Number.isFinite(n) || !Number.isFinite(total) || total === 0) return "";
    return percentTick(n / total, locale);
  };
}
