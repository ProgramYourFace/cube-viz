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
  const split = pivotValueMember(options);
  const left = data.series.find((s) => (s.meta?.axis ?? "left") !== "right");
  const right = data.series.find((s) => s.meta?.axis === "right");
  return {
    x: options.axes?.x?.label ?? lbl(options.mapping?.category?.member),
    left: options.axes?.y?.label ?? (split ? lbl(split) : left?.label),
    right: options.axes?.y2?.label ?? right?.label,
  };
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
): (value: unknown, item: { dataKey?: unknown; name?: unknown }) => string {
  return (value, item) => {
    const dk = item?.dataKey;
    const member =
      memberOverride ??
      (typeof dk === "string" || typeof dk === "number" ? String(dk) : undefined);
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
