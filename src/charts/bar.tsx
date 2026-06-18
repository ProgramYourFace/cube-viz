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

import { makeFormatter, formatCategory } from "@/format";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
  primaryMember,
  seriesColorVar,
  tooltipValueFormatter,
} from "./_shared";

/**
 * `bar` — absorbs all six Embeddable Bar Pros via `orientation` × `stackMode`
 * (docs/02-chart-options.md §2.1). orientation→layout, stackMode→stackId/
 * stackOffset are translated HERE; the spec never carries a Recharts prop.
 */
export function BarChartFamily({ data, options, config }: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as BarFamilyOptions;
  const horizontal = options.orientation === "horizontal";
  const stacked = isStacked(options.stackMode);
  const percent = options.stackMode === "percent";

  const rows = buildRows(data);
  const valueFmt = makeFormatter(percent ? { kind: "percent" } : options.format, data.raw.annotation);
  const catFmt = (v: string | number) => formatCategory(v, { format: options.format });

  const catAxisHidden = horizontal ? options.axes?.y?.hide : options.axes?.x?.hide;
  const valAxis = horizontal ? options.axes?.x : options.axes?.y;

  return (
    <ChartContainer config={config} className="min-h-[240px] w-full">
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
              tickFormatter={(v: number) => valueFmt(v, primaryMember(data))}
            />
          </>
        ) : (
          <>
            <XAxis type="category" dataKey="__cat" hide={catAxisHidden} tickFormatter={catFmt} />
            <YAxis
              type="number"
              hide={valAxis?.hide}
              scale={axisScale(valAxis)}
              domain={axisDomain(valAxis)}
              tickFormatter={(v: number) => valueFmt(v, primaryMember(data))}
            />
          </>
        )}
        {options.tooltip?.show !== false && (
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator={options.tooltip?.indicator ?? "dot"}
                valueFormatter={tooltipValueFormatter(valueFmt)}
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
                  valueFmt(typeof v === "number" ? v : Number(v), s.key)
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
