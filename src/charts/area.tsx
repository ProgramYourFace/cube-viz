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
  memberByKey,
  percentShareFormatter,
  percentTick,
  resolvedAxisLabels,
  seriesColorVar,
  seriesMember,
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
  // The value-axis unit comes from the series' SOURCE measure (a pivot series' own key
  // is a pivot value with no unit).
  const keyToMember = memberByKey(data);
  const valueMember = seriesMember(data.series[0]);
  const axl = resolvedAxisLabels(data, options);

  return (
    <ChartContainer config={config} className="cv:h-full cv:w-full cv:min-h-[200px]">
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
                    ? percentShareFormatter()
                    : tooltipValueFormatter(format, undefined, keyToMember)
                }
              />
            }
          />
        )}
        {legendDisplay(options, editing).show && (
          <ChartLegend
            content={<ChartLegendContent className={legendDisplay(options, editing).greyed ? "cv:opacity-40" : undefined} />}
            verticalAlign={legendVerticalAlign(options.legend?.position)}
            layout={legendLayout(options.legend?.position)}
            align={legendAlign(options.legend?.position)}
          />
        )}
        {data.series.map((s) => (
          <Area
            key={s.key}
            type={s.meta?.curve ?? curve}
            dataKey={s.key}
            name={s.label}
            // A companion (previous period) never stacks — it overlays as a dashed,
            // fill-less line so it reads as a reference, not part of the whole.
            stackId={stacked && !s.meta?.companion ? (s.meta?.stackId ?? "stack") : undefined}
            stroke={seriesColorVar(s)}
            strokeWidth={fo.strokeWidth ?? 2}
            strokeDasharray={s.meta?.companion ? "5 4" : undefined}
            strokeOpacity={s.meta?.companion ? 0.55 : undefined}
            fill={s.meta?.companion ? "none" : `url(#fill-${s.key})`}
            fillOpacity={1}
            dot={s.meta?.companion ? false : (s.meta?.dots ?? (fo.dots ?? false))}
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
