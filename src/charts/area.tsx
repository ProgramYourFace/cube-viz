import * as React from "react";
import { areaY, defineChart, dot, lineY, stack, type ChartMark } from "@tanstack/charts";
import { crosshair } from "@tanstack/charts/crosshair";

import type { ChartComponentProps } from "./types";
import type { AreaFamilyOptions } from "./defaults";
import {
  annotationToAxis,
  axisFormat,
  buildSeriesRows,
  buildStackedRows,
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
  seriesDots,
  seriesLabel,
  seriesMember,
  stackGroups,
  useTemporalBrush,
  valueAnchor,
  valueScale,
  type CurveName,
  type SeriesRow,
  type StackedRow,
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
  theme,
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
  // Axis TICKS may carry their own FormatOptions (`axes.x.tickFormat`); the tooltip /
  // crosshair / brush keep the chart-level category format.
  const xAxis = options.axes?.x;
  const catTick = React.useMemo(
    () => (xAxis?.tickFormat ? categoryLabeler(temporal, axisFormat(format, xAxis)) : catLabel),
    [temporal, format, xAxis, catLabel],
  );
  const controls = useTemporalBrush(temporal, { label: catLabel, ariaLabel: "Time range" });

  const definition = React.useMemo(() => {
    const xField = categoryChannel(temporal);
    const connectNulls = fo.connectNulls ?? false;
    const curveName = (fo.curve ?? "monotone") as CurveName;
    const curve = chartCurve(curveName);
    const fillOpacity = theme.areaFillOpacity;
    // Stacked bands never overlap each other, so they render near-solid — a 0.4
    // fill over a dark background reads as a SECOND OVERLAPPING series, not a band
    // riding on the one below (the exact misread users report as "not stacking").
    const stackedFillOpacity = theme.stackedAreaFillOpacity;
    const strokeWidth = theme.lineWidth;
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
      // Per-series `meta.stackId`: one areaY mark PER STACK, each stacking its own
      // series implicitly. Separate stacks overlay each other from the shared zero
      // baseline (the Recharts behavior — distinct stackIds were independent bands),
      // which the translucent fill keeps readable. A single stack is the common case
      // and renders exactly as before.
      for (const { stackId, series: group } of stackGroups(primaries)) {
        const rows = buildSeriesRows(data, { series: group, skipNull: connectNulls, temporal });
        marks.push(
          areaY(rows, {
            id: stackId ? `cv-area-stack-${stackId}` : "cv-area-stack",
            x: xField,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (r: SeriesRow) => `${r.key}:${r.i}`,
            curve,
            fillOpacity: stackedFillOpacity,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (r: SeriesRow) => colorByKey.get(r.key) ?? "currentColor",
            strokeWidth,
            layout: percent ? stack({ offset: "normalize" }) : undefined,
          }),
        );
      }
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

    // Point markers (`dots`, or a per-series `meta.dots` from the field pill). areaY
    // has no `points` option, so they are their own `dot` mark — which is also what
    // lets a STACKED dot sit on its segment's top (`y2`) instead of its raw value.
    const dotted = new Set(
      primaries.filter((s) => seriesDots(s, fo.dots)).map((s) => s.key),
    );
    if (dotted.size > 0) {
      const dotRows = stacked
        ? buildStackedRows(data, primaries, { normalize: percent, temporal }).filter(
            (r) => dotted.has(r.key) && r.value !== null,
          )
        : buildSeriesRows(data, {
            series: primaries.filter((s) => dotted.has(s.key)),
            skipNull: true,
            temporal,
          });
      marks.push(
        dot(dotRows, {
          id: "cv-area-dots",
          x: xField,
          y: (r: SeriesRow) => (stacked ? ((r as StackedRow).y2 ?? null) : r.value),
          z: "label",
          color: "label",
          key: (r: SeriesRow) => `${r.key}:${r.i}`,
          r: 3,
        }),
      );
    }

    marks.push(
      ...referenceLineMarks(fo.referenceLines, temporal?.dates ?? data.categories, {
        valueAnchor: valueAnchor(data),
      }),
    );
    marks.push(crosshair({ x: {}, y: false, marker: true }));

    return defineChart({
      marks,
      gradients,
      x: {
        scale: categoryScale(temporal),
        axis: options.axes?.x?.hide
          ? false
          : {
              label: axl.x,
              ticks: { format: catTick },
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
                // `axes.y.tickFormat` re-binds the formatter for the value ticks only
                // (percent geometry stays a local 0..1 tick, as before).
                format: (v: number) =>
                  percent
                    ? percentTick(v)
                    : axisFormat(format, options.axes?.y).value(v, valueMember, "axis"),
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
          : cubeTooltip({
              format,
              percentShare: percent,
              category: catLabel,
              indicator: options.tooltip?.indicator,
              showTotal: options.tooltip?.showTotal,
            }),
      keyboard: true,
      controls,
    });
  }, [data, options, format, fo, theme, stacked, percent, temporal, catLabel, catTick, controls]);

  const label = data.series.map(seriesLabel).join(", ") || "Area chart";
  return <CvChart definition={definition} ariaLabel={label} className="cv-chart--fill" />;
}
