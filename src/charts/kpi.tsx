import * as React from "react";
import { areaY, defineChart, lineY } from "@tanstack/charts";
import { polar, radialArc } from "@tanstack/charts/polar";
import { ArrowDown, ArrowUp, CalendarRange, Minus } from "lucide-react";

import type { CubeQuery } from "@/spec";
import type { NormalizedChartData, NormalizedSeries } from "@/adapter/types";
import type { ChartComponentProps } from "./types";
import type { KpiFamilyOptions } from "./defaults";
import { buildSeriesRows, chartCurve, CvChart, pointScale, valueScale } from "./tanstack";

/** Direction kind for a change, shared by the delta chip + the sparkline area
 *  (via `currentColor`) so the number and trend always agree. */
type DirKind = "good" | "bad" | "flat";
function directionKind(diff: number, goodDirection: "up" | "down"): DirKind {
  if (!Number.isFinite(diff) || diff === 0) return "flat";
  return diff > 0 === (goodDirection === "up") ? "good" : "bad";
}
/** CSS trend-color modifier (sets `color:`; marks paint with `currentColor`). */
function trendClass(kind: DirKind): string {
  return `cv-kpi-trend--${kind}`;
}

/**
 * `kpi` — covers KPI/Number/Comparison + the folded-in radial gauge
 * (docs/02-chart-options.md §2.6). `display:"number"` is a styled card (NOT a
 * chart) with an optional comparison delta chip; `display:"gauge"` is a TanStack
 * polar radialArc composition. `sparkline` is a chrome-less inline areaY chart.
 *
 * `familyOptions.icon` IS DROPPED: it has never been rendered (not in the Recharts
 * stack either). Painting an arbitrary lucide icon NAME means bundling lucide's whole
 * icon map; a host that wants one should use widget chrome or its own family
 * (docs/02-chart-options.md §7.8 — a removal candidate).
 */
export function KpiFamily(props: ChartComponentProps): React.ReactElement {
  const { data, options, format } = props;
  const fo = (options.familyOptions ?? {}) as KpiFamilyOptions;
  const fmt = (v: number) => format.value(v, fo.measure, "kpi");

  // Read the headline from the CURRENT (first) row ONLY. With previous-period
  // comparison on, rows = [current, prior]; a null current measure must NOT fall
  // through to the prior row (readMeasure scans all rows) and borrow its value.
  // Keep `null` (no coercion to 0): a NULL measure for every row is a no-value state,
  // not a measured zero — collapsing it to 0 would be indistinguishable from a real 0
  // (and would fill a gauge to its minimum). The renderers show an em-dash instead.
  const value = readMeasure([data.raw.rows[0] ?? {}], fo.measure);
  const label =
    data.raw.annotation?.measures[fo.measure]?.shortTitle ??
    data.raw.annotation?.measures[fo.measure]?.title ??
    fo.measure;

  if (fo.display === "gauge") {
    return <GaugeKpi value={value} label={label} fmt={fmt} fo={fo} />;
  }

  return <NumberKpi {...props} value={value} label={label} fo={fo} fmt={fmt} />;
}

/* ──────────────────────────────── number ─────────────────────────────────── */

function NumberKpi({
  data,
  value,
  fo,
  fmt,
}: ChartComponentProps & {
  value: number | null;
  label: string;
  fo: KpiFamilyOptions;
  fmt: (v: number) => string;
}): React.ReactElement {
  const goodDirection = fo.goodDirection ?? fo.comparison?.goodDirection ?? "up";
  // A null headline has no baseline-able number → no delta is computed (the chip falls to
  // the no-data placeholder when comparison is on).
  const delta = value === null ? null : computeDelta(data.raw.rows, value, fo);
  // Comparison is CONFIGURED on this KPI (the user turned it on). We render something for
  // it even when no baseline is available — e.g. the prior period has no data, there's no
  // time dimension, or the range can't be offset — instead of silently dropping the chip
  // (which read as "broken"). `delta === null` with comparison on ⇒ the graceful no-data
  // placeholder.
  const comparisonOn = !!fo.comparison;
  // Distinguish "comparison needs a date range to compute the prior period" (a SETUP
  // requirement the user must satisfy: bind a time field + date range on the value) from
  // "configured correctly but the prior period genuinely has no data" — so the on-chart
  // hint is actionable instead of a vague, misleading "no prior data".
  const needsDateRange = comparisonOn && !delta && comparisonNeedsDateRange(data.raw.query, fo);
  const spark = fo.sparkline ? data.series[0] : undefined;
  const hasSpark = !!spark && spark.data.some((v) => v !== null);
  // The trend area is colored by the SAME good/bad direction as the delta: prefer the
  // comparison change, else the sparkline's own net movement across the range.
  const trendDiff = delta ? delta.diff : spark ? netChange(spark) : 0;
  const dirClass = trendClass(directionKind(trendDiff, goodDirection));

  // The widget chrome already frames the KPI + supplies the title, so this is just the
  // big number, the comparison chip, and an optional trend footer — CENTERED and sized to
  // the cell. `container-type: size` (in .cv-kpi) lets the headline scale via
  // container-query units so it fills whatever cell the KPI lands in (small tile →
  // small number, big tile → big).
  return (
    <div className="cv-kpi">
      <div className="cv-kpi-body">
        <span className={value === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value"}>
          {value === null ? "—" : fmt(value)}
        </span>
        {comparisonOn &&
          (delta ? (
            <DeltaChip delta={delta} goodDirection={goodDirection} fo={fo} fmt={fmt} />
          ) : needsDateRange ? (
            <ComparisonSetupHint />
          ) : (
            <NoComparison />
          ))}
      </div>
      {hasSpark && (
        <div className="cv-kpi-sparkline-wrap">
          <KpiSparkline data={data} series={spark} colorClass={dirClass} />
        </div>
      )}
    </div>
  );
}

/**
 * Previous-period comparison REQUIRES a time field on the value WITH a date range — that's
 * what defines the window to offset. Returns true when that requirement is unmet (no time
 * dimension, or one without a usable date range), so the KPI can prompt the user to set it
 * up rather than implying the data is simply missing. `value`-mode comparison needs no range.
 */
function comparisonNeedsDateRange(query: CubeQuery, fo: KpiFamilyOptions): boolean {
  if (fo.comparison?.mode !== "previousPeriod") return false;
  const range = query.timeDimensions?.[0]?.dateRange;
  if (range === undefined || range === null) return true;
  if (Array.isArray(range)) return range.length < 2 || range.some((d) => !d);
  return String(range).trim() === "";
}

/**
 * Shown when previous-period comparison is enabled but the value has NO time field / date
 * range to compute the prior window from — a clear, actionable SETUP requirement (the user
 * hit "no prior data" when the real issue was an unconfigured range). Distinct from
 * {@link NoComparison}, which means "configured, but the prior period truly has no data".
 */
function ComparisonSetupHint(): React.ReactElement {
  return (
    <span
      className="cv-kpi-chip cv-kpi-hint"
      title="Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed."
    >
      <CalendarRange />
      <span className="cv-kpi-chip-label">set a date range to compare</span>
    </span>
  );
}

/**
 * Shown when comparison is enabled AND properly configured (a date range IS set) but the
 * prior period simply returned no data. A muted, honest placeholder beats a missing chip
 * (which reads as broken) or a phantom 0%.
 */
function NoComparison(): React.ReactElement {
  return (
    <span className="cv-kpi-chip cv-kpi-nodata" title="No data in the comparison period">
      <Minus />
      <span className="cv-kpi-chip-label">no prior data</span>
    </span>
  );
}

/**
 * The inline area trend footer: a chrome-less areaY + boundary stroke painted with
 * `currentColor`, so the trend always matches the delta's good/bad color (set by
 * `colorClass` on the chart container). No axes/guides/tooltip/keyboard — it's a
 * decoration, not an explorable chart — and no entrance animation (live tiles).
 */
function KpiSparkline({
  data,
  series,
  colorClass,
}: {
  data: NormalizedChartData;
  series: NormalizedSeries;
  colorClass: string;
}): React.ReactElement {
  const definition = React.useMemo(() => {
    // connectNulls (the old sparkline behavior): drop null rows so the path bridges gaps.
    const rows = buildSeriesRows(data, { series: [series], skipNull: true });
    const y = valueScale(undefined);
    return defineChart({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        areaY(rows, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: chartCurve("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15,
        }),
        lineY(rows, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: chartCurve("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75,
        }),
      ],
      x: { scale: pointScale, axis: false },
      y: { scale: y.scale, nice: y.nice, axis: false },
      guides: false,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: false,
    });
  }, [data, series]);

  return (
    <CvChart
      definition={definition}
      ariaLabel={`${series.label || series.key} trend`}
      sparkline
      animateInitial={false}
      className={`cv-kpi-sparkline ${colorClass}`}
    />
  );
}

/** Net movement of a series over its range (last minus first non-null). */
function netChange(series: NormalizedSeries): number {
  const vals = series.data.filter((v): v is number => v !== null);
  return vals.length >= 2 ? vals[vals.length - 1] - vals[0] : 0;
}

interface Delta {
  current: number;
  baseline: number;
  diff: number;
  pct: number | null;
}

function DeltaChip({
  delta,
  goodDirection,
  fo,
  fmt,
}: {
  delta: Delta;
  goodDirection: "up" | "down";
  fo: KpiFamilyOptions;
  fmt: (v: number) => string;
}): React.ReactElement {
  const up = delta.diff > 0;
  const flat = delta.diff === 0;
  const isGood = flat ? true : up === (goodDirection === "up");
  const Icon = flat ? Minus : up ? ArrowUp : ArrowDown;
  const text =
    fo.comparison?.showAsPercent && delta.pct !== null
      ? `${delta.pct > 0 ? "+" : ""}${(delta.pct * 100).toFixed(1)}%`
      : `${delta.diff > 0 ? "+" : ""}${fmt(delta.diff)}`;
  const mod = flat ? "cv-kpi-delta--flat" : isGood ? "cv-kpi-delta--good" : "cv-kpi-delta--bad";

  return (
    <span
      className={`cv-kpi-chip cv-kpi-delta ${mod}`}
      title={`vs prior period: ${delta.diff > 0 ? "+" : ""}${fmt(delta.diff)}`}
    >
      <Icon />
      <span className="cv-kpi-chip-label">{text}</span>
    </span>
  );
}

/* ───────────────────────────────── gauge ─────────────────────────────────── */

/**
 * Gauge sweep geometry — mirrors the old Recharts RadialBarChart exactly.
 * Recharts used startAngle=210° → endAngle=-30° (degrees, 0° at 3 o'clock,
 * counter-clockwise positive): a 240° clockwise sweep from lower-left, over the
 * top, to lower-right, leaving a 120° opening at the bottom. In TanStack's polar
 * convention (radians, 0 at 12 o'clock, clockwise positive) the same arc is
 * -120° → +120°, i.e. -2π/3 → +2π/3.
 */
const GAUGE_START = -(2 * Math.PI) / 3;
const GAUGE_END = (2 * Math.PI) / 3;
const GAUGE_SWEEP = GAUGE_END - GAUGE_START; // 240° in radians

function GaugeKpi({
  value,
  label,
  fmt,
  fo,
}: {
  value: number | null;
  label: string;
  fmt: (v: number) => string;
  fo: KpiFamilyOptions;
}): React.ReactElement {
  const min = fo.gauge?.min ?? 0;
  // Guard the domain span: a misconfigured max <= min (the schema allows it) would map
  // both endpoints to the same angle → a zero-sweep (invisible) ring. Keep a positive
  // width so the gauge always fills visibly.
  const rawMax = fo.gauge?.max ?? Math.max(value ?? 0, 1);
  const max = rawMax > min ? rawMax : min + 1;
  // A null measure has no value to plot: fill nothing (background ring only) and show an
  // em-dash, rather than filling to the minimum (which reads as a real measured min).
  const clamped = value === null ? min : Math.max(min, Math.min(max, value));
  const colorToken = (value === null ? undefined : thresholdColor(value, fo)) ?? "chart-1";

  const definition = React.useMemo(() => {
    // value → angle: linear fraction of [min, max] mapped onto the 240° sweep.
    const fraction = (clamped - min) / (max - min);
    const valueEnd = GAUGE_START + fraction * GAUGE_SWEEP;
    // The ring occupies 70%→100% of the layout radius (the old innerRadius/outerRadius),
    // with rounded arc ends like the old cornerRadius={8}.
    const innerRadius = ({ radius }: { radius: number }) => radius * 0.7;
    const track = radialArc([{ startAngle: GAUGE_START, endAngle: GAUGE_END }], {
      id: "cv-gauge-track",
      innerRadius,
      cornerRadius: 8,
      fill: "var(--muted)",
    });
    const marks =
      fraction > 0
        ? [
            track,
            radialArc([{ startAngle: GAUGE_START, endAngle: valueEnd }], {
              id: "cv-gauge-value",
              innerRadius,
              cornerRadius: 8,
              fill: `var(--${colorToken})`,
            }),
          ]
        : [track];
    return defineChart({
      marks: [
        polar({
          id: "cv-gauge",
          startAngle: GAUGE_START,
          endAngle: GAUGE_END,
          marks,
        }),
      ],
      guides: false,
      margin: 0,
      keyboard: false,
    });
  }, [min, max, clamped, colorToken]);

  return (
    <div className="cv-kpi-gauge">
      <CvChart
        definition={definition}
        ariaLabel={label}
        animateInitial={false}
        minHeight={180}
        className="cv-kpi-gauge-chart"
      />
      <div className="cv-kpi-gauge-center">
        <span
          className={
            value === null ? "cv-kpi-gauge-value cv-kpi-gauge-value--empty" : "cv-kpi-gauge-value"
          }
        >
          {value === null ? "—" : fmt(value)}
        </span>
        <span className="cv-kpi-gauge-label">{label}</span>
      </div>
    </div>
  );
}

function thresholdColor(value: number, fo: KpiFamilyOptions): string | undefined {
  const thresholds = fo.gauge?.thresholds;
  if (!thresholds?.length) return undefined;
  let chosen: string | undefined;
  for (const t of [...thresholds].sort((a, b) => a.at - b.at)) {
    if (value >= t.at) chosen = t.colorToken;
  }
  return chosen;
}

/* ──────────────────────────────── helpers ────────────────────────────────── */

/** First non-null value of `member` across rows. */
function readMeasure(rows: Record<string, unknown>[], member: string): number | null {
  for (const row of rows) {
    const n = num(row[member]);
    if (n !== null) return n;
  }
  return null;
}

/**
 * Compute the comparison delta. `mode:"value"` baselines off an explicit member
 * column or literal number; `mode:"previousPeriod"` reads the SECOND row's
 * measure (Cube's compareDateRange yields one row per range).
 */
function computeDelta(
  rows: Record<string, unknown>[],
  current: number,
  fo: KpiFamilyOptions,
): Delta | null {
  const cmp = fo.comparison;
  if (!cmp) return null;

  let baseline: number | null = null;
  if (cmp.mode === "value") {
    if (typeof cmp.value === "number") baseline = cmp.value;
    else if (typeof cmp.value === "string") baseline = readMeasure(rows, cmp.value);
  } else {
    // previousPeriod: Cube's compareDateRange yields one row per range (prior is the
    // 2nd). A single-row result has NO prior period → null, so we never show a phantom
    // 0% delta computed against the current value itself.
    const prior = rows[1];
    baseline = prior ? num(prior[fo.measure]) : null;
  }

  if (baseline === null) return null;
  const diff = current - baseline;
  const pct = baseline !== 0 ? diff / baseline : null;
  return { current, baseline, diff, pct };
}

function num(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
