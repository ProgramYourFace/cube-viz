import * as React from "react";
import { cell, defineChart, text, type ChartMark } from "@tanstack/charts";

import type { ChartComponentProps } from "./types";
import type { HeatmapFamilyOptions } from "./defaults";
import {
  axisFormat,
  axisTitle,
  bandScale,
  cubeTooltip,
  CvChart,
  decorativeMark,
  rowKeyFor,
  type SeriesRow,
} from "./tanstack";

/**
 * `heatmap` — a two-dimension × one-measure matrix drawn with the TanStack `cell`
 * mark. It consumes `data.raw.rows` directly (like scatter/table — one row per
 * (x, y) pair), with the roles read from the generic `mapping` envelope:
 * `mapping.category.member` = the x (column) dimension, `mapping.series.pivot`
 * = the y (row) dimension, `mapping.series.value` = the measure.
 *
 * Encoding: x and y are band scales; the value is a single-hue sequential ramp
 * on the family's `colorToken` via a fill-opacity ramp
 * (`opacity = 0.15 + 0.85 · (value − min)/(max − min)`), realized as a
 * `color-mix(var(--chart-N) P%, transparent)` so it stays theme-adaptive
 * (light→dark within the token's hue in both themes).
 */

/** One rendered cell. Extends SeriesRow so {@link cubeTooltip} formats it as-is:
 *  `cat` = the x category (tooltip title), `label` = the y category (row label),
 *  `member` = the measure (unit-aware value formatting). */
interface HeatmapCell extends SeriesRow {
  value: number;
}

/** The heatmap's mapped members, read from the generic mapping envelope. */
function heatmapMembers(options: ChartComponentProps["options"]): {
  x?: string;
  y?: string;
  value?: string;
} {
  const mapping = options.mapping;
  const series = mapping?.series;
  if (!mapping || !series || series.mode !== "pivot") return {};
  return { x: mapping.category.member, y: series.pivot, value: series.value };
}

/**
 * Resolve the raw-row key for a member. Cube's `tablePivot` keys a bucketed time
 * dimension as `<member>.<granularity>`, so fall back to the first prefixed key.
 */
function coerceNumber(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

/** The prescribed sequential ramp: opacity 0.15 (min) → 1.0 (max), single hue. */
function rampOpacity(value: number, min: number, max: number): number {
  const t = max > min ? (value - min) / (max - min) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, t));
}

/**
 * A configured TanStack color scale mapping a cell VALUE to its ramped color.
 * Shaped like a `ConfiguredColorScaleLike` (callable + `copy`) so the chart's
 * color system uses it verbatim without inferring a domain.
 */
function rampColorScale(min: number, max: number, token: string) {
  const scale = (value: string | number): string => {
    const n = typeof value === "number" ? value : Number(value);
    const opacity = Number.isFinite(n) ? rampOpacity(n, min, max) : 0.15;
    return `color-mix(in oklab, var(--${token}) ${Math.round(opacity * 100)}%, transparent)`;
  };
  scale.copy = () => rampColorScale(min, max, token);
  return scale;
}

export function HeatmapChartFamily({
  data,
  options,
  format,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as HeatmapFamilyOptions;
  const { x: xMember, y: yMember, value: valueMember } = heatmapMembers(options);
  const rows = data.raw.rows;
  const ann = data.raw.annotation;

  // Cells in raw-row order; band domains follow first appearance. Duplicate
  // (x, y) pairs keep the LAST row (mirrors how a pivot would resolve them).
  const cells = React.useMemo<HeatmapCell[]>(() => {
    if (!xMember || !yMember || !valueMember || rows.length === 0) return [];
    const xKey = rowKeyFor(rows, xMember);
    const yKey = rowKeyFor(rows, yMember);
    const byPair = new Map<string, HeatmapCell>();
    rows.forEach((row, i) => {
      const value = coerceNumber(row[valueMember]);
      const xv = row[xKey];
      const yv = row[yKey];
      if (value === null || xv === null || xv === undefined || yv === null || yv === undefined) {
        return;
      }
      const cat = typeof xv === "number" ? xv : String(xv);
      const label = String(yv);
      byPair.set(`${cat}\u0000${label}`, {
        cat,
        label,
        value,
        key: `${cat}|${label}`,
        member: valueMember,
        i,
      });
    });
    return [...byPair.values()];
  }, [rows, xMember, yMember, valueMember]);

  const definition = React.useMemo(() => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const c of cells) {
      if (c.value < min) min = c.value;
      if (c.value > max) max = c.value;
    }

    // Axis titles: the spec override wins, else the dimension's shortTitle.
    const lbl = (m?: string): string | undefined => {
      if (!m) return undefined;
      const a = ann?.dimensions[m] ?? ann?.timeDimensions[m] ?? ann?.measures[m];
      return a?.shortTitle ?? a?.title ?? m;
    };
    const xLabel = axisTitle(options.axes?.x, lbl(xMember));
    const yLabel = axisTitle(options.axes?.y, lbl(yMember));

    const marks: ChartMark[] = [
      cell(cells, {
        id: "cv-heatmap-cells",
        x: "cat",
        y: "label",
        color: "value",
        key: "key",
        inset: 1,
        radius: 2,
      }),
    ];

    // In-cell numbers are legible up to roughly a 10×10 grid and turn to noise past it,
    // and the renderer already knows the grid size — so it decides, and the editor does
    // not ask. (`showValues` left the spec in v4.)
    if (cells.length > 0 && cells.length <= 100) {
      marks.push(
        // Decorative: the in-cell number restates the cell's own value, so it must
        // not emit a second focus point (the tooltip would list the cell twice).
        decorativeMark(
          text(cells, {
            id: "cv-heatmap-values",
            x: "cat",
            y: "label",
            text: (c: HeatmapCell) => format.value(c.value, c.member, "label"),
            fill: "currentColor",
            fontSize: 10,
          }),
        ),
      );
    }

    return defineChart({
      marks,
      x: {
        scale: () => bandScale(0.05),
        axis: options.axes?.x?.hide
          ? false
          : {
              label: xLabel,
              // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
              // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
              // axes are band scales and the value is a color, not a position.)
              ticks: {
                format: (v: string | number) => axisFormat(format, options.axes?.x).category(v),
              },
            },
      },
      y: {
        scale: () => bandScale(0.05),
        axis: options.axes?.y?.hide
          ? false
          : {
              label: yLabel,
              ticks: {
                format: (v: string | number) => axisFormat(format, options.axes?.y).category(v),
              },
            },
      },
      color: {
        scale: rampColorScale(min, max, fo.colorToken ?? "chart-1"),
      },
      tooltip:
        options.tooltip?.show === false
          ? undefined
          : cubeTooltip({ format, indicator: options.tooltip?.indicator }),
    });
  }, [cells, options, format, fo, ann, xMember, yMember]);

  // Nothing mapped yet, or every (x, y, value) triple was incomplete — mirror the
  // renderer's muted empty state (rows may exist, so `data.empty` never fires here).
  if (cells.length === 0) {
    return <div className="cv-chart-empty">No data</div>;
  }

  const label = `Heatmap of ${valueMember ?? "value"} by ${xMember ?? "x"} and ${yMember ?? "y"}`;
  return <CvChart definition={definition} ariaLabel={label} className="cv-chart--fill" />;
}
