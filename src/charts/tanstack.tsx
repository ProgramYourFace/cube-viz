import * as React from "react";
import type {
  ChartColorOptions,
  ChartMark,
  ChartPoint,
  ChartTooltipContent,
  ChartValue,
  DomChartDefinition,
} from "@tanstack/charts";
import { colorLegend, ruleX, ruleY, text } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { Chart } from "@tanstack/charts/react/core";
import { motion } from "@tanstack/charts/motion";
import { tooltip } from "@tanstack/charts/tooltip";
import { d3Curve } from "@tanstack/charts/d3/shape";
import { scaleLog } from "d3-scale";
import { curveMonotoneX, curveNatural, curveStepAfter } from "d3-shape";

import type { ChartOptions, AxisOptions, LegendOptions } from "@/spec";
import type { NormalizedChartData, NormalizedSeries } from "@/adapter/types";
import type { ChartFormat } from "@/format";

/**
 * Shared TanStack Charts seam for the built-in families (NOT a family; not
 * exported from the public barrel). This file is the only place that knows how
 * cube-viz's NormalizedChartData maps onto the TanStack grammar — the same
 * role _shared.ts played for Recharts (docs/02-chart-options.md §3).
 *
 * Data shape: families feed marks with LONG rows ({@link SeriesRow}), one row
 * per (category, series) pair, `z`/`color` keyed by the series LABEL so the
 * built-in legend and grouped tooltip read naturally. The row still carries the
 * series KEY + source measure so tooltip/label formatting stays unit-aware.
 */

/** One (category, series) observation in mark-ready long form. */
export interface SeriesRow {
  /** Category value (x for vertical, y for horizontal charts). */
  cat: string | number;
  /** The measured value (null gaps are preserved by the marks). */
  value: number | null;
  /** Series key (Cube member or pivot value) — identity, not display. */
  key: string;
  /** Series display label — the z/color channel value. */
  label: string;
  /** Source measure that drives unit formatting for this row. */
  member?: string;
  /** True for a previous-period companion series (dashed/lighter styling). */
  companion?: boolean;
  /** Category index (stable positional identity for motion). */
  i: number;
}

/** Build long rows from `categories` + each series' aligned `data`. */
export function buildSeriesRows(
  data: NormalizedChartData,
  opts?: { series?: readonly NormalizedSeries[]; skipNull?: boolean },
): SeriesRow[] {
  const series = opts?.series ?? data.series;
  const rows: SeriesRow[] = [];
  data.categories.forEach((cat, i) => {
    for (const s of series) {
      const value = s.data[i] ?? null;
      if (value === null && opts?.skipNull) continue;
      rows.push({
        cat: typeof cat === "number" ? cat : String(cat),
        value,
        key: s.key,
        label: s.label,
        member: s.meta?.measure ?? s.key,
        companion: s.meta?.companion ?? false,
        i,
      });
    }
  });
  return rows;
}

/** Series display label (legend/tooltip identity). Falls back to the key. */
export function seriesLabel(s: NormalizedSeries): string {
  return s.label || s.key;
}

/** CSS var reference for a series' palette token. */
export function seriesColorVar(s: NormalizedSeries): string {
  return `var(--${s.colorToken ?? "chart-1"})`;
}

/**
 * The shared categorical color mapping: label → token var, in series order.
 * Passing domain+range (instead of a scale) keeps the app's token assignment
 * fixed — a filtered series never repaints the survivors.
 */
export function seriesColor(
  data: NormalizedChartData,
  opts?: {
    legend?: boolean;
    legendPlacement?: LegendOptions["position"];
  },
): ChartColorOptions {
  const domain = data.series.map(seriesLabel);
  const range = data.series.map(seriesColorVar);
  const color: ChartColorOptions = { domain, range };
  if (opts?.legend) {
    color.legend = colorLegend({ placement: legendPlacement(opts.legendPlacement) });
  }
  return color;
}

/** TanStack legends are top/bottom; left/right degrade to bottom (as before). */
export function legendPlacement(position?: LegendOptions["position"]): "top" | "bottom" {
  return position === "top" ? "top" : "bottom";
}

/** Whether to render the legend (`legend.show !== false`, view AND edit mode). */
export function legendDisplay(options: ChartOptions): boolean {
  return options.legend?.show !== false;
}

/* ------------------------------------------------------------------ scales */

/**
 * Category scale for band-positioned marks (bars, cells). `padding` mirrors the
 * old Recharts barCategoryGap default.
 */
export function bandScale(padding = 0.2) {
  return scaleBand().padding(padding);
}

/** Category scale for point-positioned marks (lines, areas). */
export function pointScale() {
  return scalePoint().padding(0.02);
}

/**
 * Value scale honoring the spec's `scale` ("linear" | "log") and `domain`
 * ([min|"auto", max|"auto"]). A fully explicit domain returns a configured
 * instance; any "auto" side falls back to inference (+`nice`).
 */
export function valueScale(axis?: AxisOptions): {
  scale: (() => ReturnType<typeof scaleLinear>) | ReturnType<typeof scaleLinear>;
  nice: boolean;
} {
  const log = axis?.scale === "log";
  const domain = axis?.domain;
  const explicit =
    domain && typeof domain[0] === "number" && typeof domain[1] === "number"
      ? ([domain[0], domain[1]] as [number, number])
      : undefined;
  if (log) {
    // d3 scaleLog satisfies the inferable-scale contract like scaleLinear.
    const make = (): ReturnType<typeof scaleLinear> =>
      (explicit
        ? scaleLog().domain(explicit)
        : scaleLog()) as unknown as ReturnType<typeof scaleLinear>;
    return { scale: explicit ? make() : make, nice: !explicit };
  }
  return explicit
    ? { scale: scaleLinear().domain(explicit), nice: false }
    : { scale: scaleLinear, nice: true };
}

/* ------------------------------------------------------------------ curves */

export type CurveName = "linear" | "monotone" | "step" | "natural";

/** cube-viz curve name → TanStack curve contract (undefined = straight segments). */
export function chartCurve(curve?: CurveName): ReturnType<typeof d3Curve> | undefined {
  switch (curve) {
    case "monotone":
      return d3Curve(curveMonotoneX);
    case "step":
      return d3Curve(curveStepAfter);
    case "natural":
      return d3Curve(curveNatural);
    default:
      return undefined;
  }
}

/* ------------------------------------------------------------ axis helpers */

/**
 * Auto axis labels from the spec/annotation — unchanged contract from the
 * Recharts seam: override wins, else the mapped member's shortTitle. Dual-axis
 * (y2/right) support was removed with the combo family; a series' `meta.axis`
 * is ignored.
 */
export function resolvedAxisLabels(
  data: NormalizedChartData,
  options: ChartOptions,
): { x?: string; y?: string } {
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
  const first = data.series[0];
  const axisLbl = (s?: NormalizedSeries): string | undefined =>
    s ? (s.meta?.measure ? lbl(s.meta.measure) : s.label) : undefined;
  return {
    x: options.axes?.x?.labelHide
      ? undefined
      : (options.axes?.x?.label ?? lbl(options.mapping?.category?.member)),
    y: options.axes?.y?.labelHide ? undefined : (options.axes?.y?.label ?? axisLbl(first)),
  };
}

/** The Cube measure that drives a series' value-axis unit. */
export function seriesMember(series: NormalizedSeries | undefined): string | undefined {
  return series?.meta?.measure ?? series?.key;
}

/**
 * The measure whose unit the value axis/tooltip should use in PIVOT
 * (color-split) mode — every series is the same measure there, and a series'
 * own key is a pivot value with no unit meta.
 */
export function pivotValueMember(options: ChartOptions): string | undefined {
  const s = options.mapping?.series;
  return s && s.mode === "pivot" ? s.value : undefined;
}

/** Locale-free percent tick for the `percent` stackMode. */
export function percentTick(value: number | string | null | undefined, locale?: string): string {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "";
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(n);
}

/* ---------------------------------------------------------------- tooltip */

export interface CubeTooltipOpts {
  format: ChartFormat;
  /** Format the heading/category value (defaults to `format.category`). */
  category?: (v: ChartValue) => string;
  /**
   * Format one row's value; defaults to member-aware `format.value(v, member,
   * "tooltip")` using the row's own `member`.
   */
  value?: (point: ChartPoint<SeriesRow, ChartValue, ChartValue>) => string;
  /** percent stackMode: show each series' share of its category total. */
  percentShare?: boolean;
  locale?: string;
}

/**
 * The built-in tooltip wired for cube data: structured content (title = the
 * formatted category, one swatched row per focused series) with member-aware
 * value formatting. Works for single-point and grouped focus alike.
 */
export function cubeTooltip(opts: CubeTooltipOpts) {
  const catFmt = opts.category ?? ((v: ChartValue) => opts.format.category(v as string | number));
  const valueOf = (p: ChartPoint<SeriesRow, ChartValue, ChartValue>): string => {
    if (opts.value) return opts.value(p);
    return opts.format.value(p.datum.value, p.datum.member, "tooltip");
  };
  return {
    use: tooltip,
    className: "cv-chart-tooltip",
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (
      untypedPoints: readonly ChartPoint<unknown, ChartValue, ChartValue>[],
    ): ChartTooltipContent => {
      const points = untypedPoints as readonly ChartPoint<SeriesRow, ChartValue, ChartValue>[];
      const first = points[0];
      const title = first ? catFmt(first.xValue ?? first.datum.cat) : undefined;
      let total = 0;
      if (opts.percentShare) {
        for (const p of points) {
          const n = p.datum.value;
          if (typeof n === "number" && Number.isFinite(n)) total += n;
        }
      }
      return {
        title,
        rows: points.map((p) => ({
          label: p.datum.label,
          value:
            opts.percentShare && total > 0 && typeof p.datum.value === "number"
              ? percentTick(p.datum.value / total, opts.locale)
              : valueOf(p),
          color: p.color,
        })),
      };
    },
  };
}

/* -------------------------------------------------------- reference lines */

export interface ReferenceLineOpt {
  axis: "x" | "y";
  value: number;
  label?: string;
  colorToken?: string;
}

/**
 * Reference-line marks: `ruleY` for value-axis lines, `ruleX` reprojected to
 * the rendered category at that INDEX for the (band/point) category axis —
 * same convention as before. `swap` transposes for horizontal charts.
 * Labels render for value-axis rules (anchored at the category edge, like the
 * Recharts default position); category-rule labels are dropped — the rule
 * itself still shows.
 */
export function referenceLineMarks(
  refs: readonly ReferenceLineOpt[] | undefined,
  categories: readonly (string | number)[],
  opts?: { swap?: boolean },
): ChartMark[] {
  if (!refs?.length) return [];
  const marks: ChartMark[] = [];
  refs.forEach((r, k) => {
    const stroke = `var(--${r.colorToken ?? "muted-foreground"})`;
    const style = { stroke, strokeWidth: 1.25, strokeDasharray: "4 4" } as const;
    const onCategory = r.axis === "x";
    const catValue = onCategory ? categories[r.value] : undefined;
    if (onCategory && (catValue === undefined || catValue === null)) return;
    // The rule is vertical (a fixed x) when the reference is on the category
    // axis in vertical layout, or on the value axis in horizontal layout.
    const verticalRule = opts?.swap ? !onCategory : onCategory;
    if (verticalRule) {
      const v = (opts?.swap ? r.value : catValue) as ChartValue;
      marks.push(ruleX([v], { id: `cv-ref-${k}`, ...style }));
      if (r.label && !onCategory) {
        marks.push(
          text([{ v, label: r.label }], {
            id: `cv-ref-label-${k}`,
            x: "v",
            text: "label",
            fill: stroke,
            fontSize: 10,
            dy: 8,
            anchor: "start",
          }),
        );
      }
    } else {
      const v = (opts?.swap ? catValue : r.value) as ChartValue;
      marks.push(ruleY([v], { id: `cv-ref-${k}`, ...style }));
      if (r.label && !onCategory) {
        marks.push(
          text([{ v, label: r.label }], {
            id: `cv-ref-label-${k}`,
            y: "v",
            text: "label",
            fill: stroke,
            fontSize: 10,
            dy: -6,
            anchor: "start",
          }),
        );
      }
    }
  });
  return marks;
}

/* ------------------------------------------------------------ value labels */

/**
 * Direct value labels above each point/bar (`showValueLabels`). Skips nulls and
 * companion series; formatting is member-aware via the row itself.
 */
export function valueLabelMarks(
  rows: readonly SeriesRow[],
  format: ChartFormat,
  opts?: { swap?: boolean },
): ChartMark[] {
  const labeled = rows.filter((r) => r.value !== null && !r.companion);
  if (!labeled.length) return [];
  return [
    text(labeled, {
      id: "cv-value-labels",
      x: opts?.swap ? "value" : "cat",
      y: opts?.swap ? "cat" : "value",
      text: (r: SeriesRow) => format.value(r.value, r.member, "label"),
      fill: "currentColor",
      fontSize: 10,
      dy: opts?.swap ? 0 : -8,
      dx: opts?.swap ? 12 : 0,
    }),
  ];
}

/* -------------------------------------------------------------- container */

/** Motion renderers (module-level: shared spring config across charts). */
const motionRenderer = motion({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 },
});
const staticMotionRenderer = motion({ initial: false });

export interface CvChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- families build
  // heterogeneous mark sets; the host component does not care about datum types.
  definition: DomChartDefinition<any, any, any>;
  ariaLabel: string;
  className?: string;
  /** Sparkline/compact mode: fixed aspect, no min height. */
  sparkline?: boolean;
  /** Disable entrance animation (live tiles, editor churn). */
  animateInitial?: boolean;
  minHeight?: number;
  onSelect?: (point: ChartPoint<unknown, ChartValue, ChartValue> | null) => void;
}

/**
 * The family-facing chart shell: fills its container (the widget body sizes
 * charts via CSS), measures its box, and mounts the TanStack React renderer
 * component with the shared spring-motion renderer. Definitions must be
 * memoized by the caller — definition identity is the update boundary.
 */
export function CvChart({
  definition,
  ariaLabel,
  className,
  sparkline,
  animateInitial = true,
  minHeight = 200,
  onSelect,
}: CvChartProps): React.ReactElement {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState<{ w: number; h: number }>({ w: 0, h: 0 });
  // Per-instance resource scope: gradient/clip IDs must be unique when several
  // charts share one document (a dashboard grid).
  const idPrefix = React.useId().replace(/:/g, "");

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (box) setSize({ w: Math.floor(box.width), h: Math.floor(box.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const height = sparkline
    ? Math.max(24, size.h || Math.round((size.w || 160) / 5))
    : Math.max(minHeight, size.h);

  return (
    <div
      ref={ref}
      className={["cv-chart", sparkline ? "cv-chart--sparkline" : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      {size.w > 0 && (
        <Chart
          definition={definition}
          renderer={animateInitial ? motionRenderer : staticMotionRenderer}
          width={size.w}
          height={height}
          ariaLabel={ariaLabel}
          idPrefix={idPrefix}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
