import * as React from "react";
import { areaY, defineChart, lineY, stack, type ChartMark } from "@tanstack/charts";
import { crosshair } from "@tanstack/charts/crosshair";

import type { ChartComponentProps } from "./types";
import type { AreaFamilyOptions } from "./defaults";
import {
  annotationToAxis,
  buildSeriesRows,
  categoryChannel,
  categoryLabeler,
  categoryScale,
  chartCurve,
  cubeTooltip,
  CvChart,
  legendDisplay,
  legendPlacement,
  percentTick,
  referenceLineMarks,
  resolvedAxisLabels,
  seriesColor,
  seriesColorVar,
  seriesLabel,
  seriesMember,
  useTemporalBrush,
  valueScale,
  type CurveName,
  type SeriesRow,
} from "./tanstack";

/**
 * `area` — absorbs Area/StackedArea/AreaPercent (docs/02-chart-options.md §2.3).
 * `stackMode` is the load-bearing input, translated to the TanStack grammar:
 *  - none    → one areaY PER SERIES with an explicit `y1: 0` baseline (explicit
 *              endpoints opt out of implicit stacking → overlapping fills).
 *  - stacked → ONE areaY over long rows with `z`/`color` = label, so repeated x
 *              positions stack implicitly by series.
 *  - percent → the stacked mark plus `layout: stack({ offset: "normalize" })`,
 *              percent value ticks, and share-of-total tooltip rows.
 * TanStack areas don't draw their upper line; the boundary stroke comes from the
 * areaY mark's own `stroke` channel (no separate line layer needed).
 * orientation is ignored, as before. Dual-axis was removed with the combo family.
 */
export function AreaChartFamily({
  data,
  options,
  format,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as AreaFamilyOptions;
  // Shape-aware default: a color-split (pivot) area stacks (parts of a whole), but
  // multiple INDEPENDENT measures overlap — stacking them would sum unrelated / mixed-unit
  // series into a meaningless cumulative band. An explicit `stackMode` always wins.
  const isPivot = options.mapping?.series?.mode === "pivot";
  const stackMode = options.stackMode ?? (isPivot ? "stacked" : "none");
  const stacked = stackMode === "stacked" || stackMode === "percent";
  const percent = stackMode === "percent";

  // A time-dimension category axis becomes a real utc scale (elapsed-time spacing,
  // honest gaps) — see annotationToAxis. Everything else keeps the point scale.
  const temporal = React.useMemo(() => annotationToAxis(data, options), [data, options]);
  const catLabel = React.useMemo(() => categoryLabeler(temporal, format), [temporal, format]);
  const controls = useTemporalBrush(temporal, { label: catLabel, ariaLabel: "Time range" });

  const definition = React.useMemo(() => {
    const xField = categoryChannel(temporal);
    const connectNulls = fo.connectNulls ?? false;
    const curve = chartCurve((fo.curve ?? "monotone") as CurveName);
    const fillOpacity = fo.fillOpacity ?? 0.4;
    const strokeWidth = fo.strokeWidth ?? 2;
    const axl = resolvedAxisLabels(data, options);
    const y = valueScale(options.axes?.y);
    // The value-axis unit comes from the series' SOURCE measure (a pivot series' own
    // key is a pivot value with no unit).
    const valueMember = seriesMember(data.series[0]);

    const primaries = data.series.filter((s) => !s.meta?.companion);
    // Percent (normalize) mode forces the y axis to 0..1; a companion doesn't stack,
    // so its RAW values would plot far off-scale. Drop it rather than draw it off the
    // top (degrade visibly, never off-scale). none/stacked modes keep companions.
    const companions = percent ? [] : data.series.filter((s) => s.meta?.companion);
    const colorByKey = new Map(data.series.map((s) => [s.key, seriesColorVar(s)]));

    const marks: ChartMark[] = [];
    // Overlap-mode fills keep the old vertical gradient fade (fillOpacity at the
    // top → ~15% at the baseline) via declared gradient resources. CvChart sets a
    // per-instance idPrefix so several charts in one document can't collide.
    const gradientId = (key: string): string =>
      `cv-area-fill-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
    const gradients = !stacked
      ? primaries.map((s) => ({
          id: gradientId(s.key),
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0,
          stops: [
            { offset: 0, color: seriesColorVar(s), opacity: fillOpacity * 0.15 },
            { offset: 1, color: seriesColorVar(s), opacity: fillOpacity },
          ],
        }))
      : undefined;

    if (stacked) {
      // One mark over long rows: repeated x positions stack implicitly by `z`.
      const rows = buildSeriesRows(data, { series: primaries, skipNull: connectNulls, temporal });
      marks.push(
        areaY(rows, {
          id: "cv-area-stack",
          x: xField,
          y: "value",
          z: "label",
          color: "label",
          // "i" alone collides across series inside a single multi-series mark.
          key: (r: SeriesRow) => `${r.key}:${r.i}`,
          curve,
          fillOpacity,
          // Boundary stroke; evaluated from each z-group's first row → per-series color.
          stroke: (r: SeriesRow) => colorByKey.get(r.key) ?? "currentColor",
          strokeWidth,
          layout: percent ? stack({ offset: "normalize" }) : undefined,
        }),
      );
    } else {
      // Overlap mode: explicit y1 baseline opts each series out of implicit stacking,
      // so every fill runs from zero (one mark per series, like the line family).
      for (const s of primaries) {
        const rows = buildSeriesRows(data, { series: [s], skipNull: connectNulls, temporal });
        marks.push(
          areaY(rows, {
            id: `cv-area-${s.key}`,
            x: xField,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve,
            fill: `url(#${gradientId(s.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: seriesColorVar(s),
            strokeWidth,
          }),
        );
      }
    }

    // A companion (previous period) never stacks — it overlays at its RAW values as a
    // dashed, fill-less line so it reads as a reference, not part of the whole (the
    // exact Recharts behavior: stroke-only Area with `stackId` unset).
    for (const s of companions) {
      const rows = buildSeriesRows(data, { series: [s], skipNull: connectNulls, temporal });
      marks.push(
        lineY(rows, {
          id: `cv-area-prev-${s.key}`,
          x: xField,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve,
          strokeWidth,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: seriesColorVar(s),
        }),
      );
    }

    marks.push(...referenceLineMarks(fo.referenceLines, temporal?.dates ?? data.categories));
    marks.push(crosshair({ x: {}, y: false }));

    return defineChart({
      marks,
      gradients,
      x: {
        scale: categoryScale(temporal),
        axis: options.axes?.x?.hide
          ? false
          : {
              label: axl.x,
              ticks: { format: catLabel },
            },
      },
      y: {
        scale: y.scale,
        nice: y.nice,
        grid: true,
        axis: options.axes?.y?.hide
          ? false
          : {
              label: axl.y,
              ticks: {
                format: (v: number) =>
                  percent ? percentTick(v) : format.value(v, valueMember, "axis"),
              },
            },
      },
      color: seriesColor(data, {
        legend: legendDisplay(options) && data.series.length > 1,
        legendPlacement: legendPlacement(options.legend?.position),
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip:
        options.tooltip?.show === false
          ? undefined
          : cubeTooltip({ format, percentShare: percent, category: catLabel }),
      keyboard: true,
      controls,
    });
  }, [data, options, format, fo, stacked, percent, temporal, catLabel, controls]);

  const label = data.series.map(seriesLabel).join(", ") || "Area chart";
  return <CvChart definition={definition} ariaLabel={label} className="cv-chart--fill" />;
}
