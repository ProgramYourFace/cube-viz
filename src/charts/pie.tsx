import type * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

import { makeFormatter, formatCategory } from "@/format";
import { DEFAULT_COLOR_RAMP } from "@/adapter";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { ChartConfig } from "@/components/ui/chart";
import type { ChartComponentProps } from "./types";
import type { PieFamilyOptions } from "./defaults";
import { legendAlign, legendLayout, legendVerticalAlign } from "./_shared";

interface Slice {
  key: string;
  label: string;
  value: number;
  fill: string;
}

/**
 * `pie` — covers pie + donut (donut = innerRadiusPct > 0); per-slice color comes
 * from the DATA ROW via <Cell> (a Recharts-3 requirement), cycling chart-1..5.
 * `maxSlices` keeps the top-N and folds the remainder into an "Other" slice.
 * See docs/02-chart-options.md §2.4. Pie plots `categories` × the FIRST series.
 */
export function PieChartFamily({ data, options }: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as PieFamilyOptions;
  const measure = data.series[0];
  const valueFmt = makeFormatter(options.format, data.raw.annotation);

  // 1) categories × first series → raw slices (drop null/zero-less values).
  const raw: Slice[] = data.categories.map((cat, i) => {
    const label = formatCategory(cat, { format: options.format });
    return {
      key: `slice-${i}`,
      label,
      value: measure?.data[i] ?? 0,
      fill: `var(--${DEFAULT_COLOR_RAMP[i % DEFAULT_COLOR_RAMP.length]})`,
    };
  });

  // 2) top-N + "Other" rollup.
  const slices = rollupSlices(raw, fo.maxSlices);
  const total = slices.reduce((sum, s) => sum + s.value, 0);

  // 3) per-slice ChartConfig so the legend/tooltip resolve labels + colors.
  const config: ChartConfig = {};
  slices.forEach((s, i) => {
    config[s.key] = {
      label: s.label,
      color: `var(--${DEFAULT_COLOR_RAMP[i % DEFAULT_COLOR_RAMP.length]})`,
    };
  });

  const inner = `${fo.innerRadiusPct ?? 0}%`;
  const outer = `${fo.outerRadiusPct ?? 80}%`;
  const isDonut = (fo.innerRadiusPct ?? 0) > 0;
  const showLabels = fo.showLabels ?? "percent";

  // Recharts passes PieLabelRenderProps (the datum is on `payload`, plus a
  // computed `percent`); we read what we need and render a string.
  const sliceLabel:
    | false
    | ((props: { payload?: Slice; percent?: number }) => string) =
    showLabels === "none"
      ? false
      : ({ payload, percent }) => {
          const entry = payload;
          if (showLabels === "name") return entry?.label ?? "";
          if (showLabels === "value") return valueFmt(entry?.value, measure?.key);
          const pct =
            percent !== undefined
              ? percent
              : entry && total > 0
                ? entry.value / total
                : 0;
          return `${(pct * 100).toFixed(0)}%`;
        };

  return (
    <ChartContainer config={config} className="min-h-[240px] w-full [&_.recharts-pie-label-text]:fill-foreground">
      <PieChart accessibilityLayer>
        {options.tooltip?.show !== false && (
          <ChartTooltip
            content={<ChartTooltipContent nameKey="label" hideLabel indicator={options.tooltip?.indicator ?? "dot"} />}
          />
        )}
        <Pie
          data={slices}
          dataKey="value"
          nameKey="label"
          innerRadius={inner}
          outerRadius={outer}
          paddingAngle={fo.padAngle}
          cornerRadius={fo.cornerRadius}
          label={sliceLabel}
          labelLine={showLabels !== "none" && !isDonut}
          isAnimationActive={false}
        >
          {slices.map((s) => (
            <Cell key={s.key} fill={s.fill} />
          ))}
          {isDonut && fo.centerLabel && (
            <Label
              position="center"
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox)) return null;
                const { cx, cy } = viewBox as { cx: number; cy: number };
                const big =
                  fo.centerLabel?.value === undefined || fo.centerLabel.value === "total"
                    ? valueFmt(total, measure?.key)
                    : fo.centerLabel.value;
                return (
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={cx} y={cy} className="fill-foreground text-2xl font-bold">
                      {big}
                    </tspan>
                    {fo.centerLabel?.label && (
                      <tspan x={cx} y={cy + 20} className="fill-muted-foreground text-xs">
                        {fo.centerLabel.label}
                      </tspan>
                    )}
                  </text>
                );
              }}
            />
          )}
        </Pie>
        {options.legend?.show && (
          <ChartLegend
            content={<ChartLegendContent nameKey="label" />}
            verticalAlign={legendVerticalAlign(options.legend.position)}
            layout={legendLayout(options.legend.position)}
            align={legendAlign(options.legend.position)}
          />
        )}
      </PieChart>
    </ChartContainer>
  );
}

/** Keep the top-(maxSlices-1) by value, summing the rest into an "Other" slice. */
function rollupSlices(slices: Slice[], maxSlices?: number): Slice[] {
  if (!maxSlices || slices.length <= maxSlices) return slices;
  const sorted = [...slices].sort((a, b) => b.value - a.value);
  const head = sorted.slice(0, maxSlices - 1);
  const tail = sorted.slice(maxSlices - 1);
  const otherValue = tail.reduce((sum, s) => sum + s.value, 0);
  const otherIdx = maxSlices - 1;
  return [
    ...head,
    {
      key: "slice-other",
      label: "Other",
      value: otherValue,
      fill: `var(--${DEFAULT_COLOR_RAMP[otherIdx % DEFAULT_COLOR_RAMP.length]})`,
    },
  ];
}
