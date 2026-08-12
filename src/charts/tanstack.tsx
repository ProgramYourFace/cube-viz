import * as React from "react";
import type {
  ChartColorOptions,
  ChartControl,
  ChartMark,
  ChartPoint,
  ChartTooltipContent,
  ChartTooltipRow,
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

import type {
  ChartOptions,
  AxisOptions,
  FormatOptions,
  Granularity,
  LegendOptions,
  TooltipOptions,
} from "@/spec";
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
 * cube-viz's NormalizedChartData maps onto the TanStack grammar — the same role
 * the (now deleted) `_shared.ts` played for Recharts (docs/02-chart-options.md §3).
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

/* ------------------------------------------------------- per-series stackIds */

/**
 * A series' stack membership (`SeriesMeta.stackId`), defaulting to the single
 * shared stack `""`. Series with the same id stack together; different ids are
 * SEPARATE stacks drawn side by side (bar) or overlaid (area) — the Recharts
 * `stackId` contract, which the TanStack rewrite initially dropped.
 */
export function stackIdOf(series: NormalizedSeries): string {
  return series.meta?.stackId ?? "";
}

/**
 * Group series into their stacks, in FIRST-APPEARANCE order (so the visual order of
 * the stacks follows the spec's series order). One entry ⇒ the ordinary
 * single-stack chart, which every family keeps rendering through its original path.
 */
export function stackGroups(
  series: readonly NormalizedSeries[],
): { stackId: string; series: NormalizedSeries[] }[] {
  const byId = new Map<string, NormalizedSeries[]>();
  for (const s of series) {
    const id = stackIdOf(s);
    const bucket = byId.get(id);
    if (bucket) bucket.push(s);
    else byId.set(id, [s]);
  }
  return [...byId].map(([stackId, group]) => ({ stackId, series: group }));
}

/** A long row carrying its PRE-COMPUTED stack interval (multi-stack bars). */
export interface StackedRow extends SeriesRow {
  /** Which stack this row belongs to (the bar mark's group channel). */
  stack: string;
  /** Interval start (the running total below this segment). */
  y1: number;
  /** Interval end (`y1 + value`, or the normalized share bound). */
  y2: number;
  /** This segment's share of its OWN stack's category total (percent mode). */
  share: number | null;
}

/**
 * Stack each series inside its OWN `stackId`, returning long rows with explicit
 * `[y1, y2]` intervals — the seam that lets one bar mark draw SEVERAL stacks side
 * by side: explicit endpoints opt the mark out of implicit stacking, and `z` is then
 * free to carry the stack id, so `group()` offsets the stacks within the band while
 * these bounds do the stacking within each one.
 *
 * Positives accumulate upward and negatives downward from the zero baseline (d3's
 * "diverging" convention), so a mixed-sign stack stays readable. `normalize` divides
 * each interval by its stack's total magnitude for that category (percent mode).
 */
export function buildStackedRows(
  data: NormalizedChartData,
  series: readonly NormalizedSeries[],
  opts?: { normalize?: boolean; temporal?: TemporalAxis | null },
): StackedRow[] {
  const rows: StackedRow[] = [];
  data.categories.forEach((cat, i) => {
    const t = opts?.temporal?.dates[i];
    // Per-stack magnitude for this category — the normalize denominator.
    const magnitude = new Map<string, number>();
    for (const s of series) {
      const v = s.data[i];
      if (typeof v === "number" && Number.isFinite(v)) {
        const id = stackIdOf(s);
        magnitude.set(id, (magnitude.get(id) ?? 0) + Math.abs(v));
      }
    }
    const up = new Map<string, number>();
    const down = new Map<string, number>();
    for (const s of series) {
      const value = s.data[i] ?? null;
      const id = stackIdOf(s);
      const total = magnitude.get(id) ?? 0;
      const share = value === null || total === 0 ? null : Math.abs(value) / total;
      let y1 = 0;
      let y2 = 0;
      if (value !== null) {
        const offsets = value < 0 ? down : up;
        y1 = offsets.get(id) ?? 0;
        y2 = y1 + value;
        offsets.set(id, y2);
      }
      const scale = opts?.normalize && total > 0 ? 1 / total : 1;
      rows.push({
        cat: typeof cat === "number" ? cat : String(cat),
        ...(t ? { t } : {}),
        value,
        key: s.key,
        label: s.label,
        member: s.meta?.measure ?? s.key,
        companion: s.meta?.companion ?? false,
        i,
        stack: id,
        y1: y1 * scale,
        y2: y2 * scale,
        share,
      });
    }
  });
  return rows;
}

/**
 * The key a Cube `tablePivot()` row actually uses for `member`.
 *
 * A BUCKETED time dimension is selected as `trips.start_time` but comes back
 * keyed `trips.start_time.day`, so indexing a row by the bare member misses and
 * the cell reads as no-data. Falls back to the member itself when nothing
 * matches, so a genuinely absent column still renders its empty state.
 */
export function rowKeyFor(rows: readonly Record<string, unknown>[], member: string): string {
  const first = rows[0];
  if (!first || member in first) return member;
  const prefix = `${member}.`;
  return Object.keys(first).find((k) => k.startsWith(prefix)) ?? member;
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

/**
 * `legend.position` → `ChartLegendPlacement`. Both vocabularies are exactly
 * `'top' | 'bottom'` (the schema dropped `left`/`right` in v3, since the renderer
 * has never had a side legend), so this only supplies the default.
 */
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
 *
 * PARTIALLY HONORED, deliberately: a HALF-explicit domain (`[0, "auto"]`) is
 * dropped and the axis infers BOTH ends. TanStack resolves a scale either from a
 * configured instance (domain fixed, no inference at all) or from a factory
 * (domain inferred from the materialized channel values, which this helper never
 * sees) — there is no "pin one end" seam, and re-deriving the free end here from
 * series data would have to re-implement stacking/normalize offsets to stay
 * honest. Recharts accepted `["auto", n]` natively; documented in
 * docs/02-chart-options.md §7.5.
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

/**
 * The curve a SERIES draws with: its own `meta.curve` (what the field pill's line-shape
 * picker writes) wins over the family default. Resolved as a NAME so the choice is
 * unit-testable without touching the renderer; pass the result to {@link chartCurve}.
 *
 * Only families that give each series its OWN mark can honor this — a single stacked
 * mark draws every series with one curve (see the area family).
 */
export function seriesCurve(
  series: Pick<NormalizedSeries, "meta">,
  familyCurve?: CurveName,
): CurveName | undefined {
  return (series.meta?.curve as CurveName | undefined) ?? familyCurve;
}

/**
 * Whether a SERIES draws point markers: its own `meta.dots` (the field pill's "Show
 * points" switch) wins over the family `dots`. `"active"` (line's default) means
 * hover-only, so it is NOT a static point.
 */
export function seriesDots(
  series: Pick<NormalizedSeries, "meta">,
  familyDots?: boolean | "active",
): boolean {
  return (series.meta?.dots ?? familyDots) === true;
}

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

/**
 * The formatter an axis' TICKS should use: the chart's bound {@link ChartFormat},
 * re-bound with that axis' `tickFormat` FormatOptions merged over the chart-level
 * `format` (decimals/abbreviate/prefix/suffix/currency/dateFormat/kind).
 *
 * Falls back to the undecorated formatter when the host handed in a hand-rolled
 * ChartFormat without `derive` (the method is optional on the interface).
 */
export function axisFormat(format: ChartFormat, axis?: AxisOptions): ChartFormat {
  const overrides: FormatOptions | undefined = axis?.tickFormat;
  if (!overrides || !format.derive) return format;
  return format.derive(overrides);
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
  value?: (row: SeriesRow) => string;
  /** percent stackMode: show each series' share of its category total. */
  percentShare?: boolean;
  /**
   * Replace the focused points with the full row set for that category.
   *
   * Needed where the mark's z/group channel is NOT the series: a multi-stack bar
   * groups by STACK, and TanStack's grouped focus keeps one point per group, so the
   * tooltip would list one series per stack instead of every series. The family
   * hands back all rows sharing the focused row's category index; `colorOf` paints
   * their swatches (the focus points' own colors are gone with them).
   */
  expand?: (focused: SeriesRow) => readonly SeriesRow[];
  /** Swatch color for an expanded row (required with {@link CubeTooltipOpts.expand}). */
  colorOf?: (row: SeriesRow) => string | undefined;
  /** `tooltip.indicator` — the swatch SHAPE (a css modifier; see charts.css). */
  indicator?: TooltipOptions["indicator"];
  /** `tooltip.showTotal` — append a summed "Total" row under a grouped tooltip. */
  showTotal?: boolean;
  locale?: string;
}

/**
 * The tooltip surface class + its `tooltip.indicator` modifier. The swatch shape
 * (dot / line / dashed) is pure presentation, so it is a CSS modifier rather than a
 * renderer option — the TanStack tooltip paints one swatch element per row and has
 * no shape knob (charts.css restyles it per modifier).
 */
export function tooltipClassName(indicator?: TooltipOptions["indicator"]): string {
  return indicator ? `cv-chart-tooltip cv-chart-tooltip--${indicator}` : "cv-chart-tooltip";
}

/**
 * The built-in tooltip wired for cube data: structured content (title = the
 * formatted category, one swatched row per focused series) with member-aware
 * value formatting. Works for single-point and grouped focus alike.
 */
export function cubeTooltip(opts: CubeTooltipOpts) {
  const catFmt = opts.category ?? ((v: ChartValue) => opts.format.category(v as string | number));
  const valueOf = (row: SeriesRow): string =>
    opts.value ? opts.value(row) : opts.format.value(row.value, row.member, "tooltip");
  return {
    use: tooltip,
    className: tooltipClassName(opts.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (
      untypedPoints: readonly ChartPoint<unknown, ChartValue, ChartValue>[],
    ): ChartTooltipContent => {
      const points = untypedPoints as readonly ChartPoint<SeriesRow, ChartValue, ChartValue>[];
      const first = points[0];
      const title = first ? catFmt(first.xValue ?? first.datum.cat) : undefined;
      // One entry per tooltip row: the focused points, or the family's expansion of
      // them (a stack-grouped mark focuses one point per stack, not per series).
      const entries: { datum: SeriesRow; color?: string }[] =
        opts.expand && first
          ? opts.expand(first.datum).map((datum) => ({ datum, color: opts.colorOf?.(datum) }))
          : points.map((p) => ({ datum: p.datum, color: p.color }));
      // The category total: the percent-share denominator AND the `showTotal` row.
      // Companion (previous-period) rows are excluded — they are a reference overlay,
      // not part of this period's total.
      let total = 0;
      let totalled = 0;
      if (opts.percentShare || opts.showTotal) {
        for (const e of entries) {
          const n = e.datum.value;
          if (e.datum.companion || typeof n !== "number" || !Number.isFinite(n)) continue;
          total += n;
          totalled += 1;
        }
      }
      const rows: ChartTooltipRow[] = entries.map((e) => ({
        label: e.datum.label,
        value:
          opts.percentShare && total > 0 && typeof e.datum.value === "number"
            ? percentTick(e.datum.value / total, opts.locale)
            : valueOf(e.datum),
        color: e.color,
      }));
      // A single-series tooltip's "total" would just repeat the one row (no swatch:
      // the total belongs to no series).
      if (opts.showTotal && totalled > 1) {
        rows.push({
          label: "Total",
          value: opts.percentShare
            ? percentTick(1, opts.locale)
            : opts.format.value(total, first?.datum.member, "tooltip"),
        });
      }
      return { title, rows };
    },
  };
}

/* ------------------------------------------------------- decorative marks */

/**
 * Strip a mark's INTERACTION POINTS while keeping everything it paints.
 *
 * `text` marks emit one focus point per label, so a chart's own annotations
 * (value labels, reference-line labels, in-cell heatmap values) would join the
 * focused group: the tooltip grew a duplicate row per labelled series (and a
 * `"target 15": —` row for a reference line), keyboard navigation stopped on
 * them, and a click could report one as a selection. They are DECORATION — they
 * restate data the reader already has — so they leave the focus model alone.
 */
export function decorativeMark<M extends ChartMark>(mark: M): M {
  return {
    ...mark,
    initialize: (context) => {
      const initialized = mark.initialize(context);
      const render = initialized.render;
      return {
        ...initialized,
        render: (ctx) => ({ ...render(ctx), points: [] }),
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
 *
 * LABELS (as Recharts drew them, on BOTH axes) need a full (x, y) position: the
 * `text` mark drops any datum whose x or y is not a chart value, so a label given
 * only its rule's own coordinate never rendered at all. The missing half comes from
 * the anchors: a value-axis label sits at the FIRST category (the plot's leading
 * edge, matching the old Recharts default position), and a category-axis label sits
 * at `valueAnchor` — the top of the plotted data, supplied by the family because
 * only it knows the value extent. Without an anchor the rule still draws; only its
 * label is skipped.
 */
export function referenceLineMarks(
  refs: readonly ReferenceLineOpt[] | undefined,
  // Dates appear here on a TEMPORAL axis: a category rule must be reprojected to
  // the same x value the marks plot against, not to the raw bucket string.
  categories: readonly (string | number | Date)[],
  opts?: { swap?: boolean; valueAnchor?: number },
): ChartMark[] {
  if (!refs?.length) return [];
  const marks: ChartMark[] = [];
  const catAnchor = categories[0];
  refs.forEach((r, k) => {
    const stroke = `var(--${r.colorToken ?? "muted-foreground"})`;
    const style = {
      stroke,
      strokeWidth: 1.25,
      strokeDasharray: "4 4",
    } as const;
    const onCategory = r.axis === "x";
    const catValue = onCategory ? categories[r.value] : undefined;
    if (onCategory && (catValue === undefined || catValue === null)) return;
    // The rule is vertical (a fixed x) when the reference is on the category
    // axis in vertical layout, or on the value axis in horizontal layout.
    const verticalRule = opts?.swap ? !onCategory : onCategory;
    const v = (
      verticalRule ? (opts?.swap ? r.value : catValue) : opts?.swap ? catValue : r.value
    ) as ChartValue;
    marks.push(
      verticalRule
        ? ruleX([v], { id: `cv-ref-${k}`, ...style })
        : ruleY([v], { id: `cv-ref-${k}`, ...style }),
    );
    if (!r.label) return;
    // The label's OTHER coordinate: the category anchor for a value rule, the
    // value anchor (top of the data) for a category rule.
    const other: ChartValue | undefined = onCategory ? opts?.valueAnchor : catAnchor;
    if (other === undefined || other === null) return;
    const horizontalLayout = opts?.swap === true;
    marks.push(
      decorativeMark(
        text(
          [
            {
              x: verticalRule ? v : other,
              y: verticalRule ? other : v,
              label: r.label,
            },
          ],
          {
            id: `cv-ref-label-${k}`,
            x: "x",
            y: "y",
            text: "label",
            fill: stroke,
            fontSize: 10,
            // Sit just clear of the rule: above a horizontal rule, just right of a
            // vertical one (mirroring the old Recharts label offsets).
            dy: verticalRule ? (horizontalLayout ? -6 : 8) : -6,
            dx: verticalRule ? 4 : 0,
            anchor: "start",
          },
        ),
      ),
    );
  });
  return marks;
}

/**
 * The largest plotted value across `series` — the anchor a category-axis reference
 * label is drawn at (see {@link referenceLineMarks}). Returns `undefined` when
 * nothing is plottable, which skips those labels instead of placing them at 0.
 */
export function valueAnchor(data: NormalizedChartData): number | undefined {
  let max = Number.NEGATIVE_INFINITY;
  for (const s of data.series) {
    for (const v of s.data) if (typeof v === "number" && v > max) max = v;
  }
  return Number.isFinite(max) ? max : undefined;
}

/* ------------------------------------------------------------ value labels */

/**
 * Direct value labels above each point/bar (`showValueLabels`). Skips nulls and
 * companion series; formatting is member-aware via the row itself.
 *
 * A STACKED caller passes {@link StackedRow}s: the label then sits on the segment's
 * own top (`y2`) instead of its raw value — a text mark carries no stack layout, so
 * raw positions would land wherever the un-stacked value happens to fall, and in
 * percent mode (a 0..1 axis) off the top of the plot entirely. `share` additionally
 * prints each segment's share of its stack, as the Recharts `percentShareFormatter`
 * did, because a raw number would contradict the normalized bar it labels.
 */
export function valueLabelMarks(
  rows: readonly SeriesRow[],
  format: ChartFormat,
  opts?: {
    swap?: boolean;
    temporal?: TemporalAxis | null;
    /** Label the value's SHARE of its stack (percent stackMode). */
    share?: boolean;
    /** Rows are stacked: position each label at its segment top. */
    stacked?: boolean;
    locale?: string;
  },
): ChartMark[] {
  const labeled = rows.filter((r) => r.value !== null && !r.companion);
  if (!labeled.length) return [];
  // The label must sit on the same channel the data marks use (`t` when temporal).
  const catField = categoryChannel(opts?.temporal ?? null);
  const positionOf = (r: SeriesRow): number | null =>
    opts?.stacked ? ((r as StackedRow).y2 ?? r.value) : r.value;
  const labelOf = (r: SeriesRow): string => {
    if (!opts?.share) return format.value(r.value, r.member, "label");
    const share = (r as StackedRow).share;
    return typeof share === "number" ? percentTick(share, opts.locale) : "";
  };
  return [
    decorativeMark(
      text(labeled, {
        id: "cv-value-labels",
        x: opts?.swap ? positionOf : catField,
        y: opts?.swap ? catField : positionOf,
        text: labelOf,
        fill: "currentColor",
        fontSize: 10,
        dy: opts?.swap ? 0 : -8,
        dx: opts?.swap ? 12 : 0,
      }),
    ),
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
