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
  legendLayout,
  legendVerticalAlign,
  percentTick,
  primaryMember,
  seriesColorVar,
  tooltipValueFormatter,
  pivotValueMember,
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
  // In a color split every series is the same measure → units come from it, not the
  // per-series (pivot-value) key.
  const splitMember = pivotValueMember(options);
  const valueMember = splitMember ?? primaryMember(data);

  const catAxisHidden = horizontal ? options.axes?.y?.hide : options.axes?.x?.hide;
  const valAxis = horizontal ? options.axes?.x : options.axes?.y;
  // Dual value axis (VERTICAL bars only): a measure with meta.axis:"right" mounts a 2nd
  // Y, so two same-unit measures of disparate magnitude stay readable side by side.
  const hasRight = !horizontal && data.series.some((s) => s.meta?.axis === "right");
  const leftMember = splitMember ?? data.series.find((s) => s.meta?.axis !== "right")?.key ?? valueMember;
  const rightMember = data.series.find((s) => s.meta?.axis === "right")?.key;

  return (
    <ChartContainer config={config} className="h-full w-full min-h-[200px]">
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
            <YAxis type="category" dataKey="__cat" hide={catAxisHidden} tickFormatter={catFmt} />
            <XAxis
              type="number"
              hide={valAxis?.hide}
              scale={axisScale(valAxis)}
              domain={axisDomain(valAxis)}
              tickFormatter={(v: number) => valueFmt(v, valueMember, "axis")}
            />
          </>
        ) : (
          <>
            <XAxis type="category" dataKey="__cat" hide={catAxisHidden} tickFormatter={catFmt} />
            <YAxis
              yAxisId="left"
              type="number"
              hide={valAxis?.hide}
              scale={axisScale(valAxis)}
              domain={axisDomain(valAxis)}
              tickFormatter={(v: number) => valueFmt(v, leftMember, "axis")}
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
                    ? (value) => percentTick(value as number | string | null | undefined)
                    : tooltipValueFormatter(format, splitMember)
                }
              />
            }
          />
        )}
        {options.legend?.show && (
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign={legendVerticalAlign(options.legend.position)}
            layout={legendLayout(options.legend.position)}
            align={legendAlign(options.legend.position)}
          />
        )}
        {data.series.map((s) => (
          <Bar
            key={s.key}
            yAxisId={horizontal ? undefined : s.meta?.axis === "right" && hasRight ? "right" : "left"}
            dataKey={s.key}
            name={s.label}
            stackId={stacked ? (s.meta?.stackId ?? "stack") : undefined}
            fill={seriesColorVar(s)}
            radius={cornerRadius(fo.barRadius, horizontal)}
            maxBarSize={fo.maxBarSize}
          >
            {fo.showValueLabels && (
              <LabelList
                dataKey={s.key}
                position={horizontal ? "right" : "top"}
                className="fill-foreground text-[10px]"
                formatter={(v: string | number | boolean | null | undefined) =>
                  valueFmt(typeof v === "boolean" ? Number(v) : v, splitMember ?? s.key, "label")
                }
              />
            )}
          </Bar>
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
      </BarChart>
    </ChartContainer>
  );
}
