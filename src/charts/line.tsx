import * as React from "react";
import { defineChart, lineY, type ChartMark } from "@tanstack/charts";
import { crosshair } from "@tanstack/charts/crosshair";

import type { ChartComponentProps } from "./types";
import type { LineFamilyOptions } from "./defaults";
import {
  annotationToAxis,
  axisFormat,
  buildSeriesRows,
  categoryChannel,
  categoryLabeler,
  categoryScale,
  chartCurve,
  cubeTooltip,
  CvChart,
  legendDisplay,
  legendPlacement,
  referenceLineMarks,
  resolvedAxisLabels,
  seriesColor,
  seriesColorVar,
  seriesCurve,
  seriesDots,
  seriesLabel,
  useTemporalBrush,
  valueAnchor,
  valueLabelMarks,
  valueScale,
  type CurveName,
} from "./tanstack";

/**
 * `line` — absorbs Line/Grouped/Multi/Sparkline (docs/02-chart-options.md §2.2).
 * Multi-series = one lineY mark per series; sparkline = `chrome:"none"` (no
 * axes/grid/legend/tooltip). Line ignores orientation/stackMode (stacked lines
 * use the `area` family). Dual-axis was removed with the combo family.
 *
 * A TIME-DIMENSION category axis renders on a real `scaleUtc` (see
 * {@link annotationToAxis}): buckets sit at their true elapsed distance, so a
 * missing day now draws as a gap instead of collapsing into the next bucket.
 */
export function LineChartFamily({
  data,
  options,
  format,
  theme,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as LineFamilyOptions;
  const sparkline = fo.chrome === "none";

  // A sparkline is a shape, not an axis: it has no ticks and no room for a brush,
  // so it stays on the compact point scale.
  const temporal = React.useMemo(
    () => (sparkline ? null : annotationToAxis(data, options)),
    [data, options, sparkline],
  );
  const catLabel = React.useMemo(() => categoryLabeler(temporal, format), [temporal, format]);
  // Axis TICKS may carry their own FormatOptions (`axes.x.tickFormat`); the tooltip /
  // crosshair / brush keep the chart-level category format.
  const xAxis = options.axes?.x;
  const catTick = React.useMemo(
    () => (xAxis?.tickFormat ? categoryLabeler(temporal, axisFormat(format, xAxis)) : catLabel),
    [temporal, format, xAxis, catLabel],
  );
  const controls = useTemporalBrush(temporal, {
    label: catLabel,
    ariaLabel: "Time range",
  });

  const definition = React.useMemo(() => {
    const xField = categoryChannel(temporal);
    const connectNulls = fo.connectNulls ?? false;
    const curveName = (fo.curve ?? "monotone") as CurveName;
    const axl = resolvedAxisLabels(data, options);
    const y = valueScale(options.axes?.y);
    // A single data point has no line segment; force a visible dot so the
    // chart degrades gracefully instead of rendering nothing.
    const singlePoint = data.categories.length <= 1;

    const marks: ChartMark[] = data.series.map((s) => {
      const rows = buildSeriesRows(data, { series: [s], skipNull: connectNulls, temporal });
      return lineY(rows, {
        id: `cv-line-${s.key}`,
        x: xField,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        // Per-series shape wins over the family default: the shape picker on a
        // field pill writes `meta.curve`, and reading only `fo.curve` here made
        // that control do nothing.
        curve: chartCurve(seriesCurve(s, curveName)),
        strokeWidth: theme.lineWidth,
        strokeDasharray: s.meta?.companion ? "5 4" : undefined,
        strokeOpacity: s.meta?.companion ? 0.55 : undefined,
        stroke: seriesColorVar(s),
        points: !sparkline && !s.meta?.companion && (seriesDots(s, fo.dots) || singlePoint),
      });
    });

    if (!sparkline) {
      marks.push(
        ...referenceLineMarks(fo.referenceLines, temporal?.dates ?? data.categories, {
          valueAnchor: valueAnchor(data),
        }),
        ...valueLabelMarks(
          fo.showValueLabels ? buildSeriesRows(data, { skipNull: true, temporal }) : [],
          format,
          { temporal },
        ),
      );
      // `dots` also decides the HOVER point (Recharts' `activeDot`): the crosshair's
      // marker is the TanStack equivalent, and without it `dots:"active"` — the
      // family DEFAULT — drew nothing at all. `false` opts out of both.
      marks.push(crosshair({ x: {}, y: false, marker: fo.dots !== false }));
    }

    return defineChart({
      marks,
      x: {
        scale: categoryScale(temporal),
        axis: sparkline || options.axes?.x?.hide
          ? false
          : {
              label: axl.x,
              ticks: { format: catTick },
            },
      },
      y: {
        scale: y.scale,
        nice: y.nice,
        grid: !sparkline,
        axis: sparkline || options.axes?.y?.hide
          ? false
          : {
              label: axl.y,
              ticks: {
                // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
                format: (v: number) =>
                  axisFormat(format, options.axes?.y).value(
                    v,
                    data.series[0]?.meta?.measure ?? data.series[0]?.key,
                    "axis",
                  ),
              },
            },
      },
      guides: !sparkline,
      color: seriesColor(data, {
        legend: !sparkline && legendDisplay(options) && data.series.length > 1,
        legendPlacement: legendPlacement(options.legend?.position),
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip:
        sparkline || options.tooltip?.show === false
          ? undefined
          : cubeTooltip({
              format,
              category: catLabel,
              indicator: options.tooltip?.indicator,
              showTotal: options.tooltip?.showTotal,
            }),
      margin: sparkline ? 4 : undefined,
      keyboard: !sparkline,
      controls,
    });
  }, [data, options, format, fo, theme, sparkline, temporal, catLabel, catTick, controls]);

  const label = data.series.map(seriesLabel).join(", ") || "Line chart";
  return (
    <CvChart
      definition={definition}
      ariaLabel={label}
      sparkline={sparkline}
      className={sparkline ? undefined : "cv-chart--fill"}
    />
  );
}
