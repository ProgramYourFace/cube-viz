import * as React from "react";
import {
  colorLegend,
  defineChart,
  dot,
  ruleX,
  ruleY,
  text,
  type ChartColorOptions,
  type ChartMark,
  type ChartPoint,
  type ChartTooltipContent,
  type ChartValue,
  type DotOptions,
} from "@tanstack/charts";
import { tooltip } from "@tanstack/charts/tooltip";
import { scaleSqrt } from "d3-scale";

import { DEFAULT_COLOR_RAMP } from "@/adapter";
import type { PointSelection } from "@/provider/interactions";
import type { ChartComponentProps } from "./types";
import type { ScatterFamilyOptions } from "./defaults";
import {
  axisFormat,
  axisTitle,
  CvChart,
  legendDisplay,
  legendPlacement,
  tooltipClassName,
  valueScale,
} from "./tanstack";

/**
 * `scatter` — covers scatter + bubble (docs/02-chart-options.md §2.5). Its
 * mapping does NOT reduce to category+series: it consumes `raw.rows` and
 * projects {x,y,size} per point from members named in familyOptions. Both axes
 * are QUANTITATIVE (valueScale), unlike the cartesian families' category axis.
 * `size` ⇒ an `r` channel + sqrt radius scale (bubble); `groupBy` ⇒ the dot's
 * z/color channel with a fixed domain→ramp-token mapping (first-seen order,
 * mirroring the old per-group <Scatter> coloring).
 *
 * There is no point-SHAPE option: the `dot` mark draws one symbol, so groups are
 * distinguished by color (and size, when bound). Bubble area range is app-level
 * geometry from the theme, never a per-chart knob.
 */

/** One valid raw observation projected to mark-ready form. */
interface ScatterRow {
  x: number;
  y: number;
  /** Bubble size value (null when the size member is unset/invalid for the row). */
  size: number | null;
  /** groupBy member value (undefined when ungrouped). */
  group?: string;
  /** Original raw-row index — stable scene/interaction identity. */
  i: number;
}

export function ScatterChartFamily({
  data,
  options,
  format,
  theme,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as ScatterFamilyOptions;
  const ann = data.raw.annotation;

  // Axis/tooltip labels from the member annotation shortTitles (old-file logic).
  const memberLabel = (m: string): string =>
    ann?.measures[m]?.shortTitle ?? ann?.dimensions[m]?.shortTitle ?? m;
  const xLabel = fo.x ? memberLabel(fo.x) : "x";
  const yLabel = fo.y ? memberLabel(fo.y) : "y";
  const sizeLabel = fo.size ? memberLabel(fo.size) : undefined;

  const definition = React.useMemo(() => {
    // Without x/y members every point is unprojectable; with members set but null
    // for every row nothing survives the filter. Both cases fall through to the
    // shared muted empty state below (rows exist, so the renderer's aggregate
    // "No data" never fires — same guards as the Recharts version).
    if (!fo.x || !fo.y) return null;
    const rows = buildScatterRows(data.raw.rows, fo);
    if (rows.length === 0) return null;

    const grouped = Boolean(fo.groupBy);
    // Distinct group values in first-seen order → ramp tokens, mirroring the old
    // per-group series coloring (i-th group gets DEFAULT_COLOR_RAMP[i % 5]).
    const groupValues: string[] = [];
    if (grouped) {
      for (const r of rows) {
        if (r.group !== undefined && !groupValues.includes(r.group)) groupValues.push(r.group);
      }
    }

    // Recharts' ZAxis range is symbol AREA (px²); the dot mark's rScale maps the
    // raw size to a pixel RADIUS. Convert the configured area range to radii and
    // let the factory infer the [0, max] domain from the r channel (sqrt keeps
    // bubble AREA proportional to the value).
    const [areaMin, areaMax] = theme.bubbleAreaRange;
    const rMin = Math.sqrt(Math.max(areaMin, 0) / Math.PI);
    const rMax = Math.sqrt(Math.max(areaMax, 0) / Math.PI);

    const dotOptions: DotOptions<ScatterRow> = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i",
    };
    // The envelope's `colors.ramp` orders the group palette (a scatter's "series" are
    // its groupBy values). `colors.byKey` is keyed by SERIES key — scatter has no
    // normalized series — so it does not apply (docs/02-chart-options.md §7.6).
    const ramp = options.colors?.ramp?.length ? options.colors.ramp : DEFAULT_COLOR_RAMP;
    if (grouped) {
      dotOptions.z = "group";
      dotOptions.color = "group";
    } else {
      dotOptions.fill = `var(--${ramp[0]})`;
    }
    // No point SHAPE knob: the `dot` mark draws one symbol. Groups are told apart by
    // color (and size, when bound) — `shape` was removed from the schema in v3 because
    // every value it accepted rendered as a circle anyway (docs/02-chart-options.md §7.7).
    if (fo.size) {
      // Null sizes map to the raw 0 → the minimum radius, so a row without a
      // size still plots (Recharts rendered those at the range minimum too).
      dotOptions.r = (d: ScatterRow) => d.size ?? 0;
      dotOptions.rScale = { scale: () => scaleSqrt().range([rMin, rMax]) };
    } else {
      dotOptions.r = 4;
    }

    const marks: ChartMark[] = [dot(rows, dotOptions)];

    // Reference lines: both axes are numeric here, so plain ruleX/ruleY at the
    // value — no category reprojection (that convention belongs to the
    // band/point category axes of the cartesian families).
    fo.referenceLines?.forEach((r, k) => {
      const stroke = `var(--${r.colorToken ?? "muted-foreground"})`;
      const style = { stroke, strokeWidth: 1.25, strokeDasharray: "4 4" } as const;
      if (r.axis === "y") {
        marks.push(ruleY([r.value], { id: `cv-ref-${k}`, ...style }));
        if (r.label) {
          marks.push(
            text([{ v: r.value, label: r.label }], {
              id: `cv-ref-label-${k}`,
              y: "v",
              text: "label",
              fill: stroke,
              fontSize: 10,
              dy: -6,
              anchor: "start",
            }),
          );
        }
      } else {
        marks.push(ruleX([r.value], { id: `cv-ref-${k}`, ...style }));
        if (r.label) {
          marks.push(
            text([{ v: r.value, label: r.label }], {
              id: `cv-ref-label-${k}`,
              x: "v",
              text: "label",
              fill: stroke,
              fontSize: 10,
              dy: 8,
              anchor: "start",
            }),
          );
        }
      }
    });

    // Fixed domain→range color mapping (never inferred), so a filtered group
    // never repaints the survivors — same rule as the seam's seriesColor.
    let color: ChartColorOptions | undefined;
    if (grouped) {
      color = {
        domain: groupValues,
        range: groupValues.map((_, i) => `var(--${ramp[i % ramp.length]})`),
      };
      if (legendDisplay(options)) {
        color.legend = colorLegend({ placement: legendPlacement(options.legend?.position) });
      }
    }

    const xTitle = axisTitle(options.axes?.x, xLabel);
    const yTitle = axisTitle(options.axes?.y, yLabel);
    const xs = valueScale(options.axes?.x);
    const ys = valueScale(options.axes?.y);
    const xMember = fo.x;
    const yMember = fo.y;
    const sizeMember = fo.size;

    return defineChart({
      marks,
      x: {
        scale: xs.scale,
        nice: xs.nice,
        grid: true,
        axis: options.axes?.x?.hide
          ? false
          : {
              label: xTitle,
              // Both scatter axes are quantitative, so each honors its own
              // `tickFormat` FormatOptions override.
              ticks: {
                format: (v: number) => axisFormat(format, options.axes?.x).value(v, xMember, "axis"),
              },
            },
      },
      y: {
        scale: ys.scale,
        nice: ys.nice,
        grid: true,
        axis: options.axes?.y?.hide
          ? false
          : {
              label: yTitle,
              ticks: {
                format: (v: number) => axisFormat(format, options.axes?.y).value(v, yMember, "axis"),
              },
            },
      },
      color,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip:
        options.tooltip?.show === false
          ? undefined
          : {
              use: tooltip,
              className: tooltipClassName(options.tooltip?.indicator),
              // Structured content like cubeTooltip, but written inline: the
              // focused rows here are raw ScatterRows, not SeriesRows — title is
              // the group value (omitted when ungrouped), one row per member.
              content: (
                untypedPoints: readonly ChartPoint<unknown, ChartValue, ChartValue>[],
              ): ChartTooltipContent => {
                const points = untypedPoints as readonly ChartPoint<
                  ScatterRow,
                  ChartValue,
                  ChartValue
                >[];
                const p = points[0];
                if (!p) return { rows: [] };
                const d = p.datum;
                const tooltipRows = [
                  { label: xLabel, value: format.value(d.x, xMember, "tooltip") },
                  { label: yLabel, value: format.value(d.y, yMember, "tooltip") },
                ];
                if (sizeMember) {
                  tooltipRows.push({
                    label: sizeLabel ?? sizeMember,
                    value: format.value(d.size, sizeMember, "tooltip"),
                  });
                }
                return { title: d.group, color: p.color, rows: tooltipRows };
              },
            },
      keyboard: true,
    });
  }, [data, options, format, fo, theme, xLabel, yLabel, sizeLabel]);

  // Scatter has NO category axis, so the shared SeriesRow click contract does not
  // apply: the only dimension a point stands for is its `groupBy` value. Ungrouped
  // bubbles carry no member at all and report nothing (a blank click still clears).
  const groupBy = fo.groupBy;
  const resolveSelection = (
    point: ChartPoint<unknown, ChartValue, ChartValue> | null,
  ): PointSelection | null => {
    if (!point || !groupBy) return null;
    const group = (point.datum as ScatterRow | undefined)?.group;
    return group === undefined ? null : { member: groupBy, value: group, label: group };
  };

  if (!definition) {
    return <div style={EMPTY_STYLE}>No data</div>;
  }

  return (
    <CvChart
      definition={definition}
      ariaLabel={`${xLabel} vs ${yLabel} scatter chart`}
      className="cv-chart--fill"
      resolveSelection={resolveSelection}
    />
  );
}

/** Shared muted empty-state chrome (plain CSS — no Tailwind in the chart layer). */
const EMPTY_STYLE: React.CSSProperties = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)",
};

/**
 * Project raw rows → {x,y,size,group} points, coercing numerics and DROPPING
 * rows whose x or y is missing/non-numeric (the dot mark would skip them
 * anyway; filtering first keeps the rScale domain and color domain honest).
 */
function buildScatterRows(
  rows: Record<string, unknown>[],
  fo: ScatterFamilyOptions,
): ScatterRow[] {
  const out: ScatterRow[] = [];
  rows.forEach((row, i) => {
    const x = num(row[fo.x]);
    const y = num(row[fo.y]);
    if (x === null || y === null) return;
    out.push({
      x,
      y,
      size: fo.size ? num(row[fo.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: fo.groupBy ? String(row[fo.groupBy] ?? "—") : undefined,
      i,
    });
  });
  return out;
}

/** Coerce a raw cell to a finite number, else null. */
function num(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
