import type * as React from "react";
import {
  CartesianGrid,
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
  legendDisplay,
  legendLayout,
  legendVerticalAlign,
  memberByKey,
  resolvedAxisLabels,
  seriesColorVar,
  seriesMember,
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
  editing,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as LineFamilyOptions;
  const sparkline = fo.chrome === "none";

  const rows = buildRows(data);
  const catFmt = (v: string | number) => format.category(v);

  const hasRight = data.series.some((s) => s.meta?.axis === "right");
  const curve = fo.curve ?? "monotone";
  // Representative SOURCE measure per axis so ticks render that axis's unit. In a color
  // split a series' own key is a pivot value (no unit); `meta.measure` is the real measure.
  const keyToMember = memberByKey(data);
  const leftMember = seriesMember(data.series.find((s) => s.meta?.axis !== "right"));
  const rightMember = seriesMember(data.series.find((s) => s.meta?.axis === "right"));
  const axl = resolvedAxisLabels(data, options);

  // Visible points only when explicitly enabled; the hover dot stays on (for tooltips)
  // unless this is a chrome-less sparkline.
  const dotProp = !sparkline && fo.dots === true;
  const activeDotProp = !sparkline;

  return (
    <ChartContainer
      config={config}
      className={sparkline ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]"}
    >
      <LineChart accessibilityLayer data={rows} margin={sparkline ? { top: 4, bottom: 4, left: 4, right: 4 } : undefined}>
        {!sparkline && <CartesianGrid vertical={false} />}
        <XAxis
          type="category"
          dataKey="__cat"
          hide={sparkline || options.axes?.x?.hide}
          tickFormatter={catFmt}
          label={!sparkline && axl.x ? { value: axl.x, position: "insideBottom", offset: -2 } : undefined}
        />
        <YAxis
          yAxisId="left"
          type="number"
          hide={sparkline || options.axes?.y?.hide}
          scale={axisScale(options.axes?.y)}
          domain={axisDomain(options.axes?.y)}
          tickFormatter={(v: number) => format.value(v, leftMember, "axis")}
          label={
            !sparkline && axl.left
              ? { value: axl.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }
              : undefined
          }
        />
        {hasRight && (
          <YAxis
            yAxisId="right"
            orientation="right"
            type="number"
            hide={sparkline || options.axes?.y2?.hide}
            scale={axisScale(options.axes?.y2)}
            domain={axisDomain(options.axes?.y2)}
            tickFormatter={(v: number) => format.value(v, rightMember, "axis")}
            label={
              !sparkline && axl.right
                ? { value: axl.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } }
                : undefined
            }
          />
        )}
        {!sparkline && options.tooltip?.show !== false && (
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(label) => format.category(label as string | number)}
                indicator={options.tooltip?.indicator ?? "line"}
                valueFormatter={tooltipValueFormatter(format, undefined, keyToMember)}
              />
            }
          />
        )}
        {!sparkline && legendDisplay(options, editing).show && (
          <ChartLegend
            content={<ChartLegendContent className={legendDisplay(options, editing).greyed ? "cv:opacity-40" : undefined} />}
            verticalAlign={legendVerticalAlign(options.legend?.position)}
            layout={legendLayout(options.legend?.position)}
            align={legendAlign(options.legend?.position)}
          />
        )}
        {data.series.map((s) => (
          <Line
            key={s.key}
            yAxisId={hasRight && s.meta?.axis === "right" ? "right" : "left"}
            type={s.meta?.curve ?? curve}
            dataKey={s.key}
            name={s.label}
            stroke={seriesColorVar(s)}
            strokeWidth={fo.strokeWidth ?? 2}
            strokeDasharray={s.meta?.companion ? "5 4" : undefined}
            strokeOpacity={s.meta?.companion ? 0.55 : undefined}
            dot={sparkline || s.meta?.companion ? false : (s.meta?.dots ?? dotProp)}
            activeDot={activeDotProp}
            connectNulls={fo.connectNulls ?? false}
            isAnimationActive={!sparkline}
          >
            {!sparkline && fo.showValueLabels && (
              <LabelList
                dataKey={s.key}
                position="top"
                className="cv:fill-foreground cv:text-[10px]"
                formatter={(v: string | number | boolean | null | undefined) =>
                  format.value(typeof v === "boolean" ? Number(v) : v, seriesMember(s), "label")
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
