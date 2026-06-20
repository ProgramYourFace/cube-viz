import type * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { ChartComponentProps } from "./types";
import type { AreaFamilyOptions } from "./defaults";
import {
  axisDomain,
  axisScale,
  buildRows,
  isStacked,
  legendAlign,
  legendDisplay,
  legendLayout,
  legendVerticalAlign,
  percentTick,
  pivotValueMember,
  primaryMember,
  resolvedAxisLabels,
  seriesColorVar,
  tooltipValueFormatter,
} from "./_shared";

/**
 * `area` — absorbs Area/StackedArea/AreaPercent (docs/02-chart-options.md §2.3).
 * `stackMode` is the load-bearing input: none = overlapping areas, stacked =
 * shared stackId, percent = stackId + stackOffset="expand". orientation ignored.
 */
export function AreaChartFamily({
  data,
  options,
  config,
  format,
  editing,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as AreaFamilyOptions;
  // Shape-aware default: a color-split (pivot) area stacks (parts of a whole), but
  // multiple INDEPENDENT measures overlap — stacking them would sum unrelated / mixed-unit
  // series into a meaningless cumulative band. An explicit `stackMode` always wins.
  const isPivot = options.mapping?.series?.mode === "pivot";
  const stackMode = options.stackMode ?? (isPivot ? "stacked" : "none");
  const stacked = isStacked(stackMode);
  const percent = stackMode === "percent";

  const rows = buildRows(data);
  const catFmt = (v: string | number) => format.category(v);
  const curve = fo.curve ?? "monotone";
  // In a color split every series is the same measure → units come from it, not the
  // per-series (pivot-value) key.
  const splitMember = pivotValueMember(options);
  const valueMember = splitMember ?? primaryMember(data);
  const axl = resolvedAxisLabels(data, options);

  return (
    <ChartContainer config={config} className="h-full w-full min-h-[200px]">
      <AreaChart accessibilityLayer data={rows} stackOffset={percent ? "expand" : undefined}>
        <CartesianGrid vertical={false} />
        <defs>
          {data.series.map((s) => (
            <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={seriesColorVar(s)} stopOpacity={fo.fillOpacity ?? 0.4} />
              <stop offset="95%" stopColor={seriesColorVar(s)} stopOpacity={(fo.fillOpacity ?? 0.4) * 0.2} />
            </linearGradient>
          ))}
        </defs>
        <XAxis
          type="category"
          dataKey="__cat"
          hide={options.axes?.x?.hide}
          tickFormatter={catFmt}
          label={axl.x ? { value: axl.x, position: "insideBottom", offset: -2 } : undefined}
        />
        <YAxis
          type="number"
          hide={options.axes?.y?.hide}
          scale={axisScale(options.axes?.y)}
          domain={axisDomain(options.axes?.y)}
          tickFormatter={(v: number) =>
            percent ? percentTick(v) : format.value(v, valueMember, "axis")
          }
          label={
            axl.left
              ? { value: axl.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }
              : undefined
          }
        />
        {options.tooltip?.show !== false && (
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(label) => format.category(label as string | number)}
                indicator={options.tooltip?.indicator ?? "dot"}
                valueFormatter={
                  percent
                    ? (value) => percentTick(value as number | string | null | undefined)
                    : tooltipValueFormatter(format, splitMember)
                }
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
        {data.series.map((s) => (
          <Area
            key={s.key}
            type={curve}
            dataKey={s.key}
            name={s.label}
            stackId={stacked ? (s.meta?.stackId ?? "stack") : undefined}
            stroke={seriesColorVar(s)}
            strokeWidth={fo.strokeWidth ?? 2}
            fill={`url(#fill-${s.key})`}
            fillOpacity={1}
            dot={fo.dots ?? false}
            connectNulls={fo.connectNulls ?? false}
          />
        ))}
        {fo.referenceLines?.map((r, k) => (
          <ReferenceLine
            key={k}
            {...(r.axis === "y" ? { y: r.value } : { x: r.value })}
            label={r.label}
            stroke={`var(--${r.colorToken ?? "muted-foreground"})`}
            strokeDasharray="4 4"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
