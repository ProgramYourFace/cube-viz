import type * as React from "react";
import { useId } from "react";
import { Area, AreaChart, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { ArrowDown, ArrowUp, CalendarRange, Minus } from "lucide-react";

import { cn } from "@/components/ui/utils";
import { ChartContainer } from "@/components/ui/chart";

import type { ChartConfig } from "@/components/ui/chart";
import type { CubeQuery } from "@/spec";
import type { NormalizedSeries } from "@/adapter/types";
import type { ChartComponentProps } from "./types";
import type { KpiFamilyOptions } from "./defaults";

/** Tailwind text-color class for a change direction, shared by the delta chip + the
 *  sparkline area (via `currentColor`) so the number and trend always agree. */
type DirKind = "good" | "bad" | "flat";
function directionKind(diff: number, goodDirection: "up" | "down"): DirKind {
  if (!Number.isFinite(diff) || diff === 0) return "flat";
  return diff > 0 === (goodDirection === "up") ? "good" : "bad";
}
function directionClass(kind: DirKind): string {
  return kind === "flat" ? "text-muted-foreground" : kind === "good" ? "text-emerald-600" : "text-destructive";
}

/**
 * `kpi` — covers KPI/Number/Comparison + the folded-in radial gauge
 * (docs/02-chart-options.md §2.6). `display:"number"` is a styled card (NOT
 * Recharts) with an optional comparison delta chip; `display:"gauge"` is a
 * Recharts RadialBarChart. `sparkline` reuses the line family with chrome:"none".
 */
export function KpiFamily(props: ChartComponentProps): React.ReactElement {
  const { data, options, format } = props;
  const fo = (options.familyOptions ?? {}) as KpiFamilyOptions;
  const fmt = (v: number) => format.value(v, fo.measure, "kpi");

  const value = readMeasure(data.raw.rows, fo.measure) ?? 0;
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
  value: number;
  label: string;
  fo: KpiFamilyOptions;
  fmt: (v: number) => string;
}): React.ReactElement {
  const goodDirection = fo.goodDirection ?? fo.comparison?.goodDirection ?? "up";
  const delta = computeDelta(data.raw.rows, value, fo);
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
  const dirClass = directionClass(directionKind(trendDiff, goodDirection));

  // The widget chrome already frames the KPI + supplies the title, so this is just the
  // big number, the comparison chip, and an optional trend footer — CENTERED and sized to
  // the cell. `container-type: size` lets the headline scale via container-query units so
  // it fills whatever cell the KPI lands in (small tile → small number, big tile → big).
  return (
    <div className="cv:flex cv:h-full cv:w-full cv:flex-col" style={{ containerType: "size" }}>
      <div className="cv:flex cv:min-h-0 cv:flex-1 cv:flex-col cv:items-center cv:justify-center cv:gap-1.5 cv:overflow-hidden cv:px-3 cv:text-center">
        <span
          className="cv:max-w-full cv:font-bold cv:leading-none cv:tabular-nums cv:text-foreground"
          style={{ fontSize: "clamp(1.25rem, min(16cqw, 30cqh), 3.5rem)", whiteSpace: "nowrap" }}
        >
          {fmt(value)}
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
        <div className="cv:shrink-0 cv:px-1 cv:pb-1">
          <KpiSparkline series={spark} categories={data.categories} colorClass={dirClass} />
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
      className="cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-amber-500/10 cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-amber-600"
      title="Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed."
    >
      <CalendarRange className="cv:size-3 cv:shrink-0" />
      <span className="cv:truncate">set a date range to compare</span>
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
    <span
      className="cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-muted cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-muted-foreground"
      title="No data in the comparison period"
    >
      <Minus className="cv:size-3 cv:shrink-0" />
      <span className="cv:truncate">no prior data</span>
    </span>
  );
}

/** The inline area trend footer. Stroke + a vertical fade fill inherit `currentColor` from
 *  `colorClass`, so the trend always matches the delta's good/bad color. The gradient id is
 *  per-instance (useId) so multiple KPIs on a board don't collide on a shared <defs> id. */
function KpiSparkline({
  series,
  categories,
  colorClass,
}: {
  series: NormalizedSeries;
  categories: (string | number)[];
  colorClass: string;
}): React.ReactElement {
  const gradId = useId();
  const rows = categories.map((c, i) => ({ x: typeof c === "number" ? c : String(c), v: series.data[i] ?? null }));
  return (
    <div className={cn("cv:h-12 cv:w-full", colorClass)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rows} margin={{ top: 3, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.28} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area
            dataKey="v"
            type="monotone"
            stroke="currentColor"
            strokeWidth={1.75}
            fill={`url(#${gradId})`}
            dot={false}
            isAnimationActive={false}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
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

  return (
    <span
      className={cn(
        "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:px-2 cv:py-0.5 cv:text-sm cv:font-semibold cv:leading-none cv:tabular-nums",
        flat
          ? "cv:bg-muted cv:text-muted-foreground"
          : isGood
            ? "cv:bg-emerald-500/10 cv:text-emerald-600"
            : "cv:bg-destructive/10 cv:text-destructive",
      )}
      title={`vs prior period: ${delta.diff > 0 ? "+" : ""}${fmt(delta.diff)}`}
    >
      <Icon className="cv:size-3.5 cv:shrink-0" />
      <span className="cv:truncate">{text}</span>
    </span>
  );
}

/* ───────────────────────────────── gauge ─────────────────────────────────── */

function GaugeKpi({
  value,
  label,
  fmt,
  fo,
}: {
  value: number;
  label: string;
  fmt: (v: number) => string;
  fo: KpiFamilyOptions;
}): React.ReactElement {
  const min = fo.gauge?.min ?? 0;
  const max = fo.gauge?.max ?? Math.max(value, 1);
  const clamped = Math.max(min, Math.min(max, value));
  const colorToken = thresholdColor(value, fo) ?? "chart-1";

  const chartData = [{ name: label, value: clamped, fill: `var(--${colorToken})` }];
  const config: ChartConfig = { value: { label, color: `var(--${colorToken})` } };

  return (
    <div className="cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center">
      <ChartContainer config={config} className="cv:aspect-square cv:min-h-[180px] cv:w-full">
        <RadialBarChart
          data={chartData}
          startAngle={210}
          endAngle={-30}
          innerRadius="70%"
          outerRadius="100%"
        >
          <PolarAngleAxis type="number" domain={[min, max]} tick={false} axisLine={false} />
          <RadialBar dataKey="value" background cornerRadius={8} isAnimationActive={false} />
        </RadialBarChart>
      </ChartContainer>
      <div className="cv:pointer-events-none cv:absolute cv:inset-0 cv:flex cv:flex-col cv:items-center cv:justify-center">
        <span className="cv:text-2xl cv:font-bold cv:tabular-nums cv:text-foreground">{fmt(value)}</span>
        <span className="cv:text-xs cv:text-muted-foreground">{label}</span>
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
