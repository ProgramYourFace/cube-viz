import type * as React from "react";
import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
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
import type { ChartComponentProps } from "./types";
import type { ScatterFamilyOptions } from "./defaults";
import { axisDomain, axisScale, legendAlign, legendDisplay, legendLayout, legendVerticalAlign } from "./_shared";

type Point = { x: number | null; y: number | null; z?: number | null };

/**
 * `scatter` — covers scatter + bubble (docs/02-chart-options.md §2.5). Its
 * mapping does NOT reduce to category+series: it consumes `raw.rows` and projects
 * {x,y,z} per point from members named in familyOptions. `size` ⇒ <ZAxis> bubble;
 * `groupBy` ⇒ one <Scatter> series per distinct value, each colored from the ramp.
 */
export function ScatterChartFamily({ data, options, format, editing }: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as ScatterFamilyOptions;
  const ann = data.raw.annotation;
  const rows = data.raw.rows;

  // The scatter point keys (x/y/z) map back to their Cube members for formatting.
  const memberForKey: Record<string, string | undefined> = { x: fo.x, y: fo.y, z: fo.size };

  const xLabel = ann?.measures[fo.x]?.shortTitle ?? ann?.dimensions[fo.x]?.shortTitle ?? fo.x;
  const yLabel = ann?.measures[fo.y]?.shortTitle ?? ann?.dimensions[fo.y]?.shortTitle ?? fo.y;

  // Build one or many series depending on groupBy.
  const groups = groupRows(rows, fo);

  const config: ChartConfig = {};
  groups.forEach((g, i) => {
    config[g.key] = { label: g.label, color: `var(--${DEFAULT_COLOR_RAMP[i % DEFAULT_COLOR_RAMP.length]})` };
  });

  return (
    <ChartContainer config={config} className="h-full w-full min-h-[200px]">
      <ScatterChart accessibilityLayer margin={{ top: 12, right: 12, bottom: 12, left: 12 }}>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name={xLabel}
          hide={options.axes?.x?.hide}
          scale={axisScale(options.axes?.x)}
          domain={axisDomain(options.axes?.x)}
          tickFormatter={(v: number) => format.value(v, fo.x, "axis")}
        />
        <YAxis
          type="number"
          dataKey="y"
          name={yLabel}
          hide={options.axes?.y?.hide}
          scale={axisScale(options.axes?.y)}
          domain={axisDomain(options.axes?.y)}
          tickFormatter={(v: number) => format.value(v, fo.y, "axis")}
        />
        {fo.size && <ZAxis type="number" dataKey="z" range={fo.sizeRange ?? [40, 400]} name={fo.size} />}
        {options.tooltip?.show !== false && (
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={
              <ChartTooltipContent
                indicator={options.tooltip?.indicator ?? "dot"}
                valueFormatter={(value, item) => {
                  const dk = item?.dataKey;
                  const member =
                    typeof dk === "string" ? memberForKey[dk] : undefined;
                  return format.value(value as number | string | null | undefined, member, "tooltip");
                }}
              />
            }
          />
        )}
        {legendDisplay(options, editing).show && groups.length > 1 && (
          <ChartLegend
            content={<ChartLegendContent className={legendDisplay(options, editing).greyed ? "opacity-40" : undefined} />}
            verticalAlign={legendVerticalAlign(options.legend?.position)}
            layout={legendLayout(options.legend?.position)}
            align={legendAlign(options.legend?.position)}
          />
        )}
        {groups.map((g, i) => (
          <Scatter
            key={g.key}
            name={g.label}
            data={g.points}
            shape={fo.shape ?? "circle"}
            fill={`var(--color-${g.key})`}
          >
            {groups.length === 1 &&
              g.points.map((_, pi) => (
                <Cell key={pi} fill={`var(--${DEFAULT_COLOR_RAMP[i % DEFAULT_COLOR_RAMP.length]})`} />
              ))}
          </Scatter>
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
      </ScatterChart>
    </ChartContainer>
  );
}

interface PointGroup {
  key: string;
  label: string;
  points: Point[];
}

/** Project rows → {x,y,z} points, split into series by `groupBy` when present. */
function groupRows(rows: Record<string, unknown>[], fo: ScatterFamilyOptions): PointGroup[] {
  const toPoint = (row: Record<string, unknown>): Point => ({
    x: num(row[fo.x]),
    y: num(row[fo.y]),
    ...(fo.size ? { z: num(row[fo.size]) } : {}),
  });

  if (!fo.groupBy) {
    return [{ key: "series-0", label: "Points", points: rows.map(toPoint) }];
  }

  const byGroup = new Map<string, Point[]>();
  for (const row of rows) {
    const g = String(row[fo.groupBy] ?? "—");
    const list = byGroup.get(g) ?? [];
    list.push(toPoint(row));
    byGroup.set(g, list);
  }
  return [...byGroup.entries()].map(([label, points], i) => ({
    key: `series-${i}`,
    label,
    points,
  }));
}

function num(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
