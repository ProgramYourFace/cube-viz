import type * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
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

import type { FormatRole } from "@/format";
import type { ChartComponentProps } from "./types";
import type { BarFamilyOptions } from "./defaults";
import {
  axisDomain,
  axisScale,
  buildRows,
  cornerRadius,
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
 * `bar` — absorbs all six Embeddable Bar Pros via `orientation` × `stackMode`
 * (docs/02-chart-options.md §2.1). orientation→layout, stackMode→stackId/
 * stackOffset are translated HERE; the spec never carries a Recharts prop.
 */
export function BarChartFamily({
  data,
  options,
  config,
  format,
  editing,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as BarFamilyOptions;
  const horizontal = options.orientation === "horizontal";
  const stacked = isStacked(options.stackMode);
  const percent = options.stackMode === "percent";

  const rows = buildRows(data);
  // percent stackMode is chart geometry (0..1), not a host unit rule → local tick.
  const valueFmt = (v: number | string | null | undefined, member?: string, role: FormatRole = "value") =>
    percent ? percentTick(v) : format.value(v, member, role);
  const catFmt = (v: string | number) => format.category(v);
  // The value-axis unit comes from each series' SOURCE measure (a pivot series' own key
  // is a pivot value with no unit); `meta.measure` points at the real measure.
  const keyToMember = memberByKey(data);
  const valueMember = seriesMember(data.series[0]);

  const catAxisHidden = horizontal ? options.axes?.y?.hide : options.axes?.x?.hide;
  const valAxis = horizontal ? options.axes?.x : options.axes?.y;
  // Dual value axis (VERTICAL bars only): a measure with meta.axis:"right" mounts a 2nd
  // Y, so two measures (each its own unit) stay readable side by side.
  const hasRight = !horizontal && data.series.some((s) => s.meta?.axis === "right");
  const leftMember = seriesMember(data.series.find((s) => s.meta?.axis !== "right")) ?? valueMember;
  const rightMember = seriesMember(data.series.find((s) => s.meta?.axis === "right"));
  // Axis labels (override → auto). Category=axl.x, value(left)=axl.left, value(right)=axl.right;
  // for a horizontal bar the category sits on Y and the value on X, so they swap below.
  const axl = resolvedAxisLabels(data, options);
  const catLabel = axl.x ? { value: axl.x, position: "insideBottom" as const, offset: -2 } : undefined;
  const catLabelV = axl.x ? { value: axl.x, angle: -90, position: "insideLeft" as const, style: { textAnchor: "middle" as const } } : undefined;
  const valLabelH = axl.left ? { value: axl.left, position: "insideBottom" as const, offset: -2 } : undefined;
  const valLabelL = axl.left ? { value: axl.left, angle: -90, position: "insideLeft" as const, style: { textAnchor: "middle" as const } } : undefined;
  const valLabelR = axl.right ? { value: axl.right, angle: 90, position: "insideRight" as const, style: { textAnchor: "middle" as const } } : undefined;

  return (
    <ChartContainer config={config} className="cv:h-full cv:w-full cv:min-h-[200px]">
      <BarChart
        accessibilityLayer
        data={rows}
        layout={horizontal ? "vertical" : "horizontal"}
        stackOffset={percent ? "expand" : undefined}
        barGap={fo.barGap}
        barCategoryGap={fo.barCategoryGap}
      >
        <CartesianGrid vertical={horizontal} horizontal={!horizontal} />
        {horizontal ? (
          <>
            <YAxis
              type="category"
              dataKey="__cat"
              hide={catAxisHidden}
              tickFormatter={catFmt}
              label={catLabelV}
            />
            <XAxis
              type="number"
              hide={valAxis?.hide}
              scale={axisScale(valAxis)}
              domain={axisDomain(valAxis)}
              tickFormatter={(v: number) => valueFmt(v, valueMember, "axis")}
              label={valLabelH}
            />
          </>
        ) : (
          <>
            <XAxis
              type="category"
              dataKey="__cat"
              hide={catAxisHidden}
              tickFormatter={catFmt}
              label={catLabel}
            />
            <YAxis
              yAxisId="left"
              type="number"
              hide={valAxis?.hide}
              scale={axisScale(valAxis)}
              domain={axisDomain(valAxis)}
              tickFormatter={(v: number) => valueFmt(v, leftMember, "axis")}
              label={valLabelL}
            />
            {hasRight && (
              <YAxis
                yAxisId="right"
                orientation="right"
                type="number"
                hide={options.axes?.y2?.hide}
                scale={axisScale(options.axes?.y2)}
                domain={axisDomain(options.axes?.y2)}
                tickFormatter={(v: number) => valueFmt(v, rightMember, "axis")}
                label={valLabelR}
              />
            )}
          </>
        )}
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
          <Bar
            key={s.key}
            yAxisId={horizontal ? undefined : s.meta?.axis === "right" && hasRight ? "right" : "left"}
            dataKey={s.key}
            name={s.label}
            stackId={
              stacked ? (s.meta?.companion ? "__prev" : (s.meta?.stackId ?? "stack")) : undefined
            }
            fill={seriesColorVar(s)}
            fillOpacity={s.meta?.companion ? 0.4 : undefined}
            radius={cornerRadius(fo.barRadius, horizontal)}
            maxBarSize={fo.maxBarSize}
          >
            {fo.showValueLabels && (
              <LabelList
                dataKey={s.key}
                position={horizontal ? "right" : "top"}
                className="cv:fill-foreground cv:text-[10px]"
                formatter={(v: string | number | boolean | null | undefined) =>
                  valueFmt(typeof v === "boolean" ? Number(v) : v, seriesMember(s), "label")
                }
              />
            )}
          </Bar>
        ))}
        {fo.referenceLines?.map((r, k) => (
          <ReferenceLine
            key={k}
            yAxisId={horizontal ? undefined : "left"}
            {...(r.axis === "y" ? { y: r.value } : { x: r.value })}
            label={r.label}
            stroke={`var(--${r.colorToken ?? "muted-foreground"})`}
            strokeDasharray="4 4"
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
