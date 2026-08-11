import * as React from "react";
import type {
  ChartColorOptions,
  ChartControl,
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
import { brushX, type BrushRange, type BrushXChange } from "@tanstack/charts/interaction/brush";
import { controlledSignal } from "@tanstack/charts/interaction/signal";
import { scaleLog, scaleUtc } from "d3-scale";
import { curveMonotoneX, curveNatural, curveStepAfter } from "d3-shape";

import type { ChartOptions, AxisOptions, Granularity, LegendOptions } from "@/spec";
import { GranularitySchema } from "@/spec";
import type { NormalizedChartData, NormalizedSeries } from "@/adapter/types";
import type { ChartFormat } from "@/format";
import { looksLikeIsoDate, toDate } from "@/format/dates";
import {
  useChartInteractions,
  type ChartInteractionTarget,
  type PointSelection,
} from "@/provider/interactions";

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
  /**
   * TEMPORAL category axis only: `cat` parsed to a UTC-anchored Date, used as the
   * x channel against a `scaleUtc` so buckets sit at their true elapsed distance
   * (see {@link annotationToAxis}). Absent on every non-temporal chart, which
   * keeps reading `cat` against a point/band scale exactly as before.
   */
  t?: Date;
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
  opts?: {
    series?: readonly NormalizedSeries[];
    skipNull?: boolean;
    /** When set, every row also carries `t` (the bucket's Date) for a utc x scale. */
    temporal?: TemporalAxis | null;
  },
): SeriesRow[] {
  const series = opts?.series ?? data.series;
  const rows: SeriesRow[] = [];
  data.categories.forEach((cat, i) => {
    const t = opts?.temporal?.dates[i];
    for (const s of series) {
      const value = s.data[i] ?? null;
      if (value === null && opts?.skipNull) continue;
      rows.push({
        cat: typeof cat === "number" ? cat : String(cat),
        ...(t ? { t } : {}),
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

/* --------------------------------------------------- temporal category axis */

/**
 * A category axis that is HONESTLY temporal: the mapped category member is a
 * time dimension AND every bucket parses as a date, so the axis can carry real
 * elapsed-time spacing (d3 `scaleUtc`) instead of an evenly-spaced point/band
 * scale. This is the bridge TanStack's guidance calls for — a missing day must
 * leave a gap, and irregular buckets must not read as regular ones.
 */
export interface TemporalAxis {
  /** The Cube time-dimension member (WITHOUT the `.granularity` suffix). */
  member: string;
  /** Bucket granularity parsed off the annotation key, when it carries one. */
  granularity?: Granularity;
  /** UTC-anchored Date per category index — aligned 1:1 with `data.categories`. */
  dates: Date[];
  /** The original category values, kept so labels/selections round-trip exactly. */
  categories: readonly (string | number)[];
  /** Ascending, de-duplicated bucket candidates (brush snapping + keyboard steps). */
  values: Date[];
}

/**
 * A zone-less Cube bucket ("2026-07-15", "2026-07-15T00:00:00.000"). Those carry
 * NO offset, so reading them as local time and then plotting/ticking in UTC would
 * shift labels across a day boundary. We anchor them in UTC instead and render
 * labels back through the same wall clock ({@link utcNaiveIso}), which makes the
 * round trip exact regardless of the viewer's timezone.
 */
const NAIVE_ISO = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;

/** Parse a category to a UTC-anchored Date (zone-less buckets read AS UTC). */
function toUtcDate(value: string | number): Date | null {
  if (typeof value === "string" && NAIVE_ISO.test(value)) {
    const iso = value.replace(" ", "T");
    const d = new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : `${iso}Z`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  // Offset-bearing strings / epoch millis: the vetted parser already resolves them.
  return toDate(value);
}

/** A UTC-anchored Date back to its zone-less ISO wall clock ("…T00:00:00.000"). */
function utcNaiveIso(d: Date): string {
  return d.toISOString().slice(0, -1);
}

/** The trailing `.day` / `.month` / … segment of an annotation key, when it is one. */
function trailingGranularity(key: string, prefix?: string): Granularity | undefined {
  const tail = prefix ? key.slice(prefix.length + 1) : key.slice(key.lastIndexOf(".") + 1);
  const parsed = GranularitySchema.safeParse(tail);
  return parsed.success ? parsed.data : undefined;
}

/**
 * Decide whether this chart's category axis is temporal, and if so materialize it.
 *
 * The rule (BOTH halves must hold — annotation alone is not enough, and
 * date-looking strings alone are not either):
 *  1. `mapping.category.member` resolves to a `timeDimensions` entry of the result
 *     annotation. Cube keys bucketed time dimensions as `<member>.<granularity>`,
 *     so an exact key match OR a `<member>.` prefix match counts, and the trailing
 *     segment yields the granularity.
 *  2. EVERY category parses as a date: an ISO-shaped string (`looksLikeIsoDate`),
 *     or a bare number ONLY when a granularity says it is an epoch bucket — a
 *     plain numeric dimension must never be silently read as epoch millis.
 *
 * Returns `null` when either half fails, which leaves the existing point/band
 * category-scale path untouched.
 */
export function annotationToAxis(
  data: NormalizedChartData,
  options: ChartOptions,
): TemporalAxis | null {
  const member = options.mapping?.category?.member;
  const timeDimensions = data.raw.annotation?.timeDimensions;
  if (!member || !timeDimensions || data.categories.length === 0) return null;

  let matched: string | undefined;
  for (const key of Object.keys(timeDimensions)) {
    if (key === member || key.startsWith(`${member}.`)) {
      matched = key;
      break;
    }
  }
  if (matched === undefined) return null;

  // `trips.start_time` + key `trips.start_time.day` → day; a mapping that already
  // names the bucketed key (`trips.start_time.day`) yields it from the member.
  const granularity =
    matched === member ? trailingGranularity(member) : trailingGranularity(matched, member);
  // The semantic member a host filters on never carries the granularity suffix.
  const bare = granularity && member.endsWith(`.${granularity}`)
    ? member.slice(0, -(granularity.length + 1))
    : member;

  const dates: Date[] = [];
  for (const cat of data.categories) {
    if (typeof cat === "number" && granularity === undefined) return null;
    if (typeof cat === "string" && !looksLikeIsoDate(cat)) return null;
    const d = toUtcDate(cat);
    if (!d) return null;
    dates.push(d);
  }

  // Brush candidates must be unique and strictly monotone in scale position.
  const seen = new Set<number>();
  const values = dates
    .filter((d) => (seen.has(d.getTime()) ? false : (seen.add(d.getTime()), true)))
    .sort((a, b) => a.getTime() - b.getTime());
  // One distinct bucket has no elapsed spacing to be honest about, and a
  // degenerate utc domain would pin it to the plot edge — keep the point scale,
  // which centres it exactly as before.
  if (values.length < 2) return null;

  return { member: bare, granularity, dates, categories: data.categories, values };
}

/**
 * The x-axis scale input for a point-positioned family: real UTC time when the
 * axis is temporal, else the compact evenly-spaced point scale. Bars and heatmap
 * cells keep their band scale — a bar needs a bandwidth to be drawn in.
 */
export function categoryScale(temporal: TemporalAxis | null): typeof scaleUtc | typeof pointScale {
  return temporal ? scaleUtc : pointScale;
}

/** The row field the x channel reads: the Date on a temporal axis, else the category. */
export function categoryChannel(temporal: TemporalAxis | null): "t" | "cat" {
  return temporal ? "t" : "cat";
}

/**
 * Category label formatter for axis ticks / tooltips / crosshair, granularity-aware
 * through the existing `format.category` path. A tick that lands exactly on a bucket
 * formats the ORIGINAL category value (byte-identical to the pre-temporal labels);
 * a `scaleUtc` tick between buckets formats its UTC wall clock instead.
 */
export function categoryLabeler(
  temporal: TemporalAxis | null,
  format: ChartFormat,
): (value: ChartValue) => string {
  if (!temporal) return (v) => format.category(v as string | number);
  const byTime = new Map<number, string | number>();
  temporal.dates.forEach((d, i) => {
    const cat = temporal.categories[i];
    if (cat !== undefined) byTime.set(d.getTime(), cat);
  });
  return (v) =>
    v instanceof Date
      ? format.category(byTime.get(v.getTime()) ?? utcNaiveIso(v))
      : format.category(v as string | number);
}

/* ----------------------------------------------------------- range brushing */

/** The semantic ISO bound for a brushed endpoint: the bucket string Cube emitted. */
function semanticIso(temporal: TemporalAxis, d: Date): string {
  const i = temporal.dates.findIndex((c) => c.getTime() === d.getTime());
  const cat = i >= 0 ? temporal.categories[i] : undefined;
  return typeof cat === "string" ? cat : utcNaiveIso(d);
}

/**
 * Mount a controlled `brushX` over a TEMPORAL x axis when — and only when — a host
 * supplied an `onRangeSelect` handler somewhere up the tree. Committing a drag
 * calls it with the semantic ISO range of the mapped time member; a blank click
 * commits a zero-width range, which we read as "cleared" and report as `null`.
 *
 * Returns a MEMOIZED control array (or `undefined`), so a family can drop it
 * straight into `defineChart({ controls })` and into that definition's deps: the
 * identity changes only when the brush range or the bucket set actually changes,
 * never because the host re-rendered with a new handler closure.
 *
 * Note the deliberate trade-off: the brush overlay owns pointer events across the
 * plot, so an enabled range brush replaces hover-tooltip inspection with
 * drag-to-select (keyboard focus + the handles' slider role still work).
 */
export function useTemporalBrush(
  temporal: TemporalAxis | null,
  opts: { label: (value: ChartValue) => string; ariaLabel?: string },
): readonly ChartControl[] | undefined {
  const interactions = useChartInteractions();
  const [range, setRange] = React.useState<BrushRange<Date> | null>(null);

  // Latest-ref for everything read at GESTURE time (label formatter, emitter,
  // axis): none of them may participate in the control's memo identity.
  const latest = React.useRef({ opts, interactions, temporal });
  React.useLayoutEffect(() => {
    latest.current = { opts, interactions, temporal };
  });

  // A temporal axis already guarantees ≥2 distinct buckets, which is also the
  // minimum a brush can span.
  const enabled = interactions.rangeEnabled && temporal !== null;

  return React.useMemo(() => {
    if (!enabled || !temporal) return undefined;
    const values = temporal.values;
    const has = (d: Date | undefined): boolean =>
      d !== undefined && values.some((v) => v.getTime() === d.getTime());
    // brushX's range is NON-NULLABLE, so "nothing selected" still needs SOME range.
    // It is a COLLAPSED one parked on the first bucket, drawn with nothing painted
    // at all (see `resting` below) — deliberately not the full extent, because a
    // selection spanning the plot would swallow every new drag as a move-selection
    // gesture and make the brush impossible to re-draw. A range left over from
    // previous data (buckets that no longer exist) falls back to it.
    const committed = range && has(range.start) && has(range.end) ? range : null;
    const first = values[0] as Date;
    const current: BrushRange<Date> = committed ?? { start: first, end: first };
    const resting = committed === null;

    return [
      brushX<Date>({
        id: "cv-brush-x",
        values,
        range: controlledSignal<BrushRange<Date>, BrushXChange<Date>>(
          current,
          (next, { reason }) => {
            // Previews follow the pointer locally; only a COMMIT is application state.
            if (reason.type !== "commit") return;
            const axis = latest.current.temporal;
            const cleared = next.start.getTime() === next.end.getTime();
            setRange(cleared ? null : next);
            if (cleared || !axis) {
              latest.current.interactions.emitRange(null);
              return;
            }
            latest.current.interactions.emitRange({
              member: axis.member,
              granularity: axis.granularity,
              from: semanticIso(axis, next.start),
              to: semanticIso(axis, next.end),
            });
          },
        ),
        format: (v) => latest.current.opts.label(v),
        ariaLabel: opts.ariaLabel ?? "Time range",
        startAriaLabel: "Range start",
        endAriaLabel: "Range end",
        // The behavior PAINTS its handles (they are its keyboard sliders), so the
        // collapsed resting range would otherwise show as a solid block against the
        // first bucket. Resting paints nothing at all; a committed range gets the
        // real selection wash plus visible grips.
        handleSize: 10,
        selectionStyle: resting
          ? { fill: "none", stroke: "none" }
          : {
              fill: "var(--foreground)",
              fillOpacity: 0.08,
              stroke: "var(--foreground)",
              strokeOpacity: 0.35,
              strokeWidth: 1,
            },
        // Resting handles paint nothing (they still keep their slider role +
        // tab stop, and charts.css gives them a visible focus ring).
        handleStyle: resting
          ? { fill: "none" }
          : { fill: "var(--muted-foreground)", fillOpacity: 0.6 },
      }),
    ];
    // `opts` is read through the ref at gesture time; only the axis + committed
    // range may rebuild the control (and therefore the chart definition).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, temporal, range]);
}

/* -------------------------------------------------------- point → selection */

/**
 * Map a clicked chart point to the Cube member + value it stands for.
 *
 * The rule, in order:
 *  1. **Colour split wins over category.** When the chart's series ARE a pivot
 *     (`mapping.series.mode === "pivot"`) and the clicked datum belongs to a
 *     z/colour group, the click identifies a SERIES, so we report the split
 *     dimension and that series' raw pivot value — the more specific signal, and
 *     the one a host cross-filters on. (A stacked bar segment, a heatmap cell, or
 *     one line of a colour-split chart all land here.)
 *  2. Otherwise report the CATEGORY dimension with the row's raw category value,
 *     labelled through the chart's own bound formatter.
 *  3. Marks whose datum keeps only a display label (pie slices) report that label
 *     as both value and label against the category member.
 * A click with no point (blank surface) is a CLEAR and reports `null`.
 */
export function resolvePointSelection(
  point: ChartPoint<unknown, ChartValue, ChartValue> | null,
  target: ChartInteractionTarget,
): PointSelection | null {
  if (!point) return null;
  const datum = point.datum as Record<string, unknown> | null | undefined;
  if (!datum || typeof datum !== "object") return null;

  const key = typeof datum.key === "string" ? datum.key : undefined;
  const label = typeof datum.label === "string" ? datum.label : undefined;

  if (target.pivotMember && key !== undefined && point.group !== null) {
    return { member: target.pivotMember, value: key, label: label ?? key };
  }
  if (!target.categoryMember) return null;

  const cat = datum.cat;
  if (typeof cat === "string" || typeof cat === "number") {
    return {
      member: target.categoryMember,
      value: cat,
      label: target.formatCategory?.(cat) ?? String(cat),
    };
  }
  if (label !== undefined) {
    return { member: target.categoryMember, value: label, label };
  }
  return null;
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
  // Dates appear here on a TEMPORAL axis: a category rule must be reprojected to
  // the same x value the marks plot against, not to the raw bucket string.
  categories: readonly (string | number | Date)[],
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
  opts?: { swap?: boolean; temporal?: TemporalAxis | null },
): ChartMark[] {
  const labeled = rows.filter((r) => r.value !== null && !r.companion);
  if (!labeled.length) return [];
  // The label must sit on the same channel the data marks use (`t` when temporal).
  const catField = categoryChannel(opts?.temporal ?? null);
  return [
    text(labeled, {
      id: "cv-value-labels",
      x: opts?.swap ? "value" : catField,
      y: opts?.swap ? catField : "value",
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
  /**
   * Family override for the semantic click contract. Most families feed
   * {@link SeriesRow}s, which {@link resolvePointSelection} already reads; a family
   * whose datum has its own shape (scatter's projected points) supplies this to
   * name the member/value itself. Only consulted when a host enabled point select.
   */
  resolveSelection?: (
    point: ChartPoint<unknown, ChartValue, ChartValue> | null,
  ) => PointSelection | null;
}

/**
 * The family-facing chart shell: fills its container (the widget body sizes
 * charts via CSS), measures its box, and mounts the TanStack React renderer
 * component with the shared spring-motion renderer. Definitions must be
 * memoized by the caller — definition identity is the update boundary.
 *
 * It is ALSO the single place click-to-cross-filter is wired: every family
 * renders through here, so attaching `onSelect` once gives bars, points, slices
 * and cells the same semantic {@link PointSelection} contract without each family
 * knowing about it. The handler is attached only when a host actually supplied an
 * `onPointSelect` (and never on a sparkline), so nothing changes otherwise.
 */
export function CvChart({
  definition,
  ariaLabel,
  className,
  sparkline,
  animateInitial = true,
  minHeight = 200,
  onSelect,
  resolveSelection,
}: CvChartProps): React.ReactElement {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const interactions = useChartInteractions();
  const pointSelect = interactions.pointEnabled && !sparkline;
  // Latest-ref so a family's inline resolver never re-attaches the handler.
  const resolverRef = React.useRef(resolveSelection);
  React.useLayoutEffect(() => {
    resolverRef.current = resolveSelection;
  });
  // `interactions` is stable across handler-identity changes, so this callback is
  // too — it never forces the renderer to re-attach.
  const handleSelect = React.useCallback(
    (point: ChartPoint<unknown, ChartValue, ChartValue> | null) => {
      // A blank-surface click is an explicit CLEAR. A click that lands on a datum
      // this chart cannot name semantically (a KPI gauge arc, an ungrouped bubble)
      // is IGNORED rather than reported as a clear — it was not a "deselect".
      if (point === null) {
        interactions.emitPoint(null);
        return;
      }
      const resolve = resolverRef.current;
      const selection = resolve
        ? resolve(point)
        : resolvePointSelection(point, interactions.target);
      if (selection) interactions.emitPoint(selection);
    },
    [interactions],
  );
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
          onSelect={onSelect ?? (pointSelect ? handleSelect : undefined)}
        />
      )}
    </div>
  );
}
