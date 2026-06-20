import type * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import { DEFAULT_COLOR_RAMP } from "@/adapter";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { ChartConfig } from "@/components/ui/chart";
import type { NormalizedChartData } from "@/adapter/types";
import type { ChartComponentProps } from "./types";
import type { ComboFamilyOptions, ComboSeriesOpt } from "./defaults";
import {
  axisDomain,
  axisScale,
  legendAlign,
  legendDisplay,
  legendLayout,
  legendVerticalAlign,
  resolvedAxisLabels,
  tooltipValueFormatter,
} from "./_shared";
import { colorVarName } from "@/components/ui/utils";

/**
 * `combo` — covers Combo / Bar+Line / Dual-axis (docs/02-chart-options.md §2.8).
 * Each `ComboSeriesOpt` declares its own `render` (bar|line|area) and `axis`
 * (left|right → mounts a 2nd YAxis). `mapping.category` is the shared x. The
 * inline `series` list is the combo seam, so envelope `mapping.series` is ignored.
 */
export function ComboChartFamily({ data, options, format, editing }: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as ComboFamilyOptions;
  const seriesOpts = fo.series ?? [];

  const rows = buildComboRows(data, seriesOpts);
  const catFmt = (v: string | number) => format.category(v);

  const hasRight = seriesOpts.some((s) => s.axis === "right");
  const leftMember = seriesOpts.find((s) => s.axis !== "right")?.member;
  const rightMember = seriesOpts.find((s) => s.axis === "right")?.member;
  // Axis labels: override → auto (x from the category; left/right from each axis' series).
  const axl = resolvedAxisLabels(data, options);
  const leftLabel = options.axes?.y?.labelHide
    ? undefined
    : (options.axes?.y?.label ?? (leftMember ? labelOf(data, leftMember) : undefined));
  const rightLabel = options.axes?.y2?.labelHide
    ? undefined
    : (options.axes?.y2?.label ?? (rightMember ? labelOf(data, rightMember) : undefined));

  const config: ChartConfig = {};
  seriesOpts.forEach((s, i) => {
    const token = s.colorToken ?? DEFAULT_COLOR_RAMP[i % DEFAULT_COLOR_RAMP.length];
    config[s.member] = {
      label: s.label ?? labelOf(data, s.member),
      color: `var(--${token})`,
    };
  });

  return (
    <ChartContainer config={config} className="h-full w-full min-h-[200px]">
      <ComposedChart accessibilityLayer data={rows}>
        <CartesianGrid vertical={false} />
        <XAxis
          type="category"
          dataKey="__cat"
          hide={options.axes?.x?.hide}
          tickFormatter={catFmt}
          label={axl.x ? { value: axl.x, position: "insideBottom", offset: -2 } : undefined}
        />
        <YAxis
          yAxisId="left"
          type="number"
          hide={options.axes?.y?.hide}
          scale={axisScale(options.axes?.y)}
          domain={axisDomain(options.axes?.y)}
          tickFormatter={(v: number) => format.value(v, leftMember, "axis")}
          label={
            leftLabel
              ? { value: leftLabel, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }
              : undefined
          }
        />
        {hasRight && (
          <YAxis
            yAxisId="right"
            orientation="right"
            type="number"
            hide={options.axes?.y2?.hide}
            scale={axisScale(options.axes?.y2)}
            domain={axisDomain(options.axes?.y2)}
            tickFormatter={(v: number) => format.value(v, rightMember, "axis")}
            label={
              rightLabel
                ? { value: rightLabel, angle: 90, position: "insideRight", style: { textAnchor: "middle" } }
                : undefined
            }
          />
        )}
        {options.tooltip?.show !== false && (
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(label) => format.category(label as string | number)}
                indicator={options.tooltip?.indicator ?? "dot"}
                valueFormatter={tooltipValueFormatter(format)}
              />
            }
          />
        )}
        {legendDisplay(options, editing).show && (
          <ChartLegend
            content={<ChartLegendContent className={legendDisplay(options, editing).greyed ? "opacity-40" : undefined} />}
            verticalAlign={legendVerticalAlign(options.legend?.position)}
            layout={legendLayout(options.legend?.position)}
            align={legendAlign(options.legend?.position)}
          />
        )}
        {seriesOpts.map((s) => renderSeries(s, data, fo))}
        {fo.referenceLines?.map((r, k) => (
          <ReferenceLine
            key={k}
            yAxisId="left"
            {...(r.axis === "y" ? { y: r.value } : { x: r.value })}
            label={r.label}
            stroke={`var(--${r.colorToken ?? "muted-foreground"})`}
            strokeDasharray="4 4"
          />
        ))}
      </ComposedChart>
    </ChartContainer>
  );
}

function renderSeries(
  s: ComboSeriesOpt,
  data: NormalizedChartData,
  fo: ComboFamilyOptions,
): React.ReactElement {
  const yAxisId = s.axis === "right" ? "right" : "left";
  const color = `var(${colorVarName(s.member)})`;
  const name = s.label ?? labelOf(data, s.member);
  // Per-series option, then the family-level option, then a sensible default.
  const curve = s.curve ?? fo.curve ?? "monotone";
  const dots = s.dots ?? fo.dots ?? false;
  const connectNulls = fo.connectNulls ?? false;

  if (s.render === "bar") {
    return (
      <Bar
        key={s.member}
        yAxisId={yAxisId}
        dataKey={s.member}
        name={name}
        stackId={s.stackId}
        fill={color}
        radius={[fo.barRadius ?? 3, fo.barRadius ?? 3, 0, 0]}
      />
    );
  }
  if (s.render === "area") {
    return (
      <Area
        key={s.member}
        yAxisId={yAxisId}
        type={curve}
        dataKey={s.member}
        name={name}
        stackId={s.stackId}
        stroke={color}
        strokeWidth={fo.strokeWidth ?? 2}
        fill={color}
        fillOpacity={fo.fillOpacity ?? 0.25}
        dot={dots}
        connectNulls={connectNulls}
      />
    );
  }
  return (
    <Line
      key={s.member}
      yAxisId={yAxisId}
      type={curve}
      dataKey={s.member}
      name={name}
      stroke={color}
      strokeWidth={fo.strokeWidth ?? 2}
      dot={dots}
      connectNulls={connectNulls}
    />
  );
}

/**
 * Build combo rows keyed by each series' `member`. Prefer the normalized series
 * (already aligned + numeric) when present; otherwise project from raw rows.
 */
function buildComboRows(
  data: NormalizedChartData,
  seriesOpts: ComboSeriesOpt[],
): Record<string, string | number | null>[] {
  const byKey = new Map(data.series.map((s) => [s.key, s]));
  const useNormalized = seriesOpts.every((s) => byKey.has(s.member));

  if (useNormalized && data.categories.length > 0) {
    return data.categories.map((cat, i) => {
      const row: Record<string, string | number | null> = {
        __cat: typeof cat === "number" ? cat : String(cat),
      };
      for (const s of seriesOpts) row[s.member] = byKey.get(s.member)?.data[i] ?? null;
      return row;
    });
  }

  // Fall back to raw rows: x from the category member, y from each series member.
  const catMember = data.raw.query.dimensions?.[0] ?? data.raw.query.timeDimensions?.[0]?.dimension;
  return data.raw.rows.map((raw) => {
    const catVal = catMember ? raw[catMember] : undefined;
    const row: Record<string, string | number | null> = {
      __cat: catVal === undefined || catVal === null ? "" : String(catVal),
    };
    for (const s of seriesOpts) row[s.member] = num(raw[s.member]);
    return row;
  });
}

function labelOf(data: NormalizedChartData, member: string): string {
  return (
    data.raw.annotation?.measures[member]?.shortTitle ??
    data.raw.annotation?.measures[member]?.title ??
    member
  );
}

function num(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
