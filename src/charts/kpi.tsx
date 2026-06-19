import type * as React from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

import { cn } from "@/components/ui/utils";
import { ChartContainer } from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";

import type { ChartConfig } from "@/components/ui/chart";
import type { ChartComponentProps } from "./types";
import type { KpiFamilyOptions } from "./defaults";
import { LineChartFamily } from "./line";

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
  config,
  format,
  value,
  label,
  fo,
  fmt,
}: ChartComponentProps & {
  value: number;
  label: string;
  fo: KpiFamilyOptions;
  fmt: (v: number) => string;
}): React.ReactElement {
  const delta = computeDelta(data.raw.rows, value, fo);

  return (
    <Card className="h-full w-full">
      <CardContent className="flex h-full flex-col justify-center gap-1 pt-6">
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums text-foreground">{fmt(value)}</span>
          {delta && <DeltaChip delta={delta} fo={fo} fmt={fmt} />}
        </div>
        {fo.sparkline && data.series.length > 0 && (
          <div className="mt-2 h-12">
            <LineChartFamily
              data={data}
              config={config}
              format={format}
              options={{ family: "line", familyOptions: { chrome: "none" } }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface Delta {
  current: number;
  baseline: number;
  diff: number;
  pct: number | null;
}

function DeltaChip({
  delta,
  fo,
  fmt,
}: {
  delta: Delta;
  fo: KpiFamilyOptions;
  fmt: (v: number) => string;
}): React.ReactElement {
  const up = delta.diff > 0;
  const flat = delta.diff === 0;
  const goodDir = fo.comparison?.goodDirection ?? "up";
  const isGood = flat ? true : up === (goodDir === "up");
  const Icon = flat ? Minus : up ? ArrowUp : ArrowDown;
  const text =
    fo.comparison?.showAsPercent && delta.pct !== null
      ? `${delta.pct > 0 ? "+" : ""}${(delta.pct * 100).toFixed(1)}%`
      : `${delta.diff > 0 ? "+" : ""}${fmt(delta.diff)}`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-sm font-medium",
        flat ? "text-muted-foreground" : isGood ? "text-emerald-600" : "text-destructive",
      )}
    >
      <Icon className="size-3.5" />
      {text}
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
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <ChartContainer config={config} className="aspect-square min-h-[180px] w-full">
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
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tabular-nums text-foreground">{fmt(value)}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
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
    // previousPeriod: the prior compareDateRange row's measure.
    const prior = rows[1] ?? rows[rows.length - 1];
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
