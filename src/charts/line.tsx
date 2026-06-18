import type * as React from "react";
import {
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import { makeFormatter, formatCategory } from "@/format";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { ChartComponentProps } from "./types";
import type { LineFamilyOptions } from "./defaults";
import {
  axisDomain,
  axisScale,
  buildRows,
  legendAlign,
  legendLayout,
  legendVerticalAlign,
  seriesColorVar,
  tooltipValueFormatter,
} from "./_shared";

/**
 * `line` — absorbs Line/Grouped/Multi/Sparkline (docs/02-chart-options.md §2.2).
 * Multi-series = `series.length`; sparkline = `chrome:"none"` (no axes/grid/
 * legend/tooltip); dual-axis = a series with `meta.axis:"right"`. Line ignores
 * orientation/stackMode (stacked lines use the `area` family).
 */
export function LineChartFamily({ data, options, config }: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as LineFamilyOptions;
  const sparkline = fo.chrome === "none";

  const rows = buildRows(data);
  const valueFmt = makeFormatter(options.format, data.raw.annotation);
  const catFmt = (v: string | number) => formatCategory(v, { format: options.format });

  const hasRight = data.series.some((s) => s.meta?.axis === "right");
  const curve = fo.curve ?? "monotone";
  // Representative member per axis so ticks render that axis's unit.
  const leftMember = data.series.find((s) => s.meta?.axis !== "right")?.key;
  const rightMember = data.series.find((s) => s.meta?.axis === "right")?.key;

  const dotProp = sparkline ? false : fo.dots === "active" ? false : Boolean(fo.dots);
  const activeDotProp = sparkline ? false : fo.dots !== false;

  return (
    <ChartContainer
      config={config}
      className={sparkline ? "aspect-[5/1] w-full" : "min-h-[240px] w-full"}
    >
      <LineChart accessibilityLayer data={rows} margin={sparkline ? { top: 4, bottom: 4, left: 4, right: 4 } : undefined}>
        {!sparkline && <CartesianGrid vertical={false} />}
        <XAxis
          type="category"
          dataKey="__cat"
          hide={sparkline || options.axes?.x?.hide}
          tickFormatter={catFmt}
        />
        <YAxis
          yAxisId="left"
          type="number"
          hide={sparkline || options.axes?.y?.hide}
          scale={axisScale(options.axes?.y)}
          domain={axisDomain(options.axes?.y)}
          tickFormatter={(v: number) => valueFmt(v, leftMember)}
        >
          {!sparkline && options.axes?.y?.label && (
            <Label value={options.axes.y.label} angle={-90} position="insideLeft" />
          )}
        </YAxis>
        {hasRight && (
          <YAxis
            yAxisId="right"
            orientation="right"
            type="number"
            hide={sparkline || options.axes?.y2?.hide}
            scale={axisScale(options.axes?.y2)}
            domain={axisDomain(options.axes?.y2)}
            tickFormatter={(v: number) => valueFmt(v, rightMember)}
          />
        )}
        {!sparkline && options.tooltip?.show !== false && (
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator={options.tooltip?.indicator ?? "line"}
                valueFormatter={tooltipValueFormatter(valueFmt)}
              />
            }
          />
        )}
        {!sparkline && options.legend?.show && (
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign={legendVerticalAlign(options.legend.position)}
            layout={legendLayout(options.legend.position)}
            align={legendAlign(options.legend.position)}
          />
        )}
        {data.series.map((s) => (
          <Line
            key={s.key}
            yAxisId={hasRight && s.meta?.axis === "right" ? "right" : "left"}
            type={curve}
            dataKey={s.key}
            name={s.label}
            stroke={seriesColorVar(s)}
            strokeWidth={fo.strokeWidth ?? 2}
            dot={dotProp}
            activeDot={activeDotProp}
            connectNulls={fo.connectNulls ?? false}
            isAnimationActive={!sparkline}
          >
            {!sparkline && fo.showValueLabels && (
              <LabelList
                dataKey={s.key}
                position="top"
                className="fill-foreground text-[10px]"
                formatter={(v: string | number | boolean | null | undefined) =>
                  valueFmt(typeof v === "number" ? v : Number(v), s.key)
                }
              />
            )}
          </Line>
        ))}
        {!sparkline &&
          fo.referenceLines?.map((r, k) => (
            <ReferenceLine
              key={k}
              yAxisId="left"
              {...(r.axis === "y" ? { y: r.value } : { x: r.value })}
              label={r.label}
              stroke={`var(--${r.colorToken ?? "muted-foreground"})`}
              strokeDasharray="4 4"
            />
          ))}
      </LineChart>
    </ChartContainer>
  );
}
