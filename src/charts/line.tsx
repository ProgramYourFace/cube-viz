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
  pivotValueMember,
  seriesColorVar,
  tooltipValueFormatter,
} from "./_shared";

/**
 * `line` — absorbs Line/Grouped/Multi/Sparkline (docs/02-chart-options.md §2.2).
 * Multi-series = `series.length`; sparkline = `chrome:"none"` (no axes/grid/
 * legend/tooltip); dual-axis = a series with `meta.axis:"right"`. Line ignores
 * orientation/stackMode (stacked lines use the `area` family).
 */
export function LineChartFamily({
  data,
  options,
  config,
  format,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as LineFamilyOptions;
  const sparkline = fo.chrome === "none";

  const rows = buildRows(data);
  const catFmt = (v: string | number) => format.category(v);

  const hasRight = data.series.some((s) => s.meta?.axis === "right");
  const curve = fo.curve ?? "monotone";
  // In a color split every series is the same measure → units come from it, not the
  // per-series (pivot-value) key.
  const splitMember = pivotValueMember(options);
  // Representative member per axis so ticks render that axis's unit.
  const leftMember = splitMember ?? data.series.find((s) => s.meta?.axis !== "right")?.key;
  const rightMember = data.series.find((s) => s.meta?.axis === "right")?.key;

  // Visible points only when explicitly enabled; the hover dot stays on (for tooltips)
  // unless this is a chrome-less sparkline.
  const dotProp = !sparkline && fo.dots === true;
  const activeDotProp = !sparkline;

  return (
    <ChartContainer
      config={config}
      className={sparkline ? "aspect-[5/1] w-full" : "h-full w-full min-h-[200px]"}
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
          tickFormatter={(v: number) => format.value(v, leftMember, "axis")}
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
            tickFormatter={(v: number) => format.value(v, rightMember, "axis")}
          />
        )}
        {!sparkline && options.tooltip?.show !== false && (
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(label) => format.category(label as string | number)}
                indicator={options.tooltip?.indicator ?? "line"}
                valueFormatter={tooltipValueFormatter(format, splitMember)}
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
                  format.value(typeof v === "boolean" ? Number(v) : v, splitMember ?? s.key, "label")
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
