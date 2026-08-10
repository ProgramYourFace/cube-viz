import * as React from "react";
import { defineChart, lineY, type ChartMark } from "@tanstack/charts";
import { crosshair } from "@tanstack/charts/crosshair";

import type { ChartComponentProps } from "./types";
import type { LineFamilyOptions } from "./defaults";
import {
  buildSeriesRows,
  chartCurve,
  cubeTooltip,
  CvChart,
  legendDisplay,
  legendPlacement,
  pointScale,
  referenceLineMarks,
  resolvedAxisLabels,
  seriesColor,
  seriesColorVar,
  seriesLabel,
  valueLabelMarks,
  valueScale,
  type CurveName,
} from "./tanstack";

/**
 * `line` — absorbs Line/Grouped/Multi/Sparkline (docs/02-chart-options.md §2.2).
 * Multi-series = one lineY mark per series; sparkline = `chrome:"none"` (no
 * axes/grid/legend/tooltip). Line ignores orientation/stackMode (stacked lines
 * use the `area` family). Dual-axis was removed with the combo family.
 */
export function LineChartFamily({
  data,
  options,
  format,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as LineFamilyOptions;
  const sparkline = fo.chrome === "none";

  const definition = React.useMemo(() => {
    const connectNulls = fo.connectNulls ?? false;
    const curve = chartCurve((fo.curve ?? "monotone") as CurveName);
    const axl = resolvedAxisLabels(data, options);
    const y = valueScale(options.axes?.y);
    // A single data point has no line segment; force a visible dot so the
    // chart degrades gracefully instead of rendering nothing.
    const singlePoint = data.categories.length <= 1;

    const marks: ChartMark[] = data.series.map((s) => {
      const rows = buildSeriesRows(data, { series: [s], skipNull: connectNulls });
      return lineY(rows, {
        id: `cv-line-${s.key}`,
        x: "cat",
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve,
        strokeWidth: fo.strokeWidth ?? 2,
        strokeDasharray: s.meta?.companion ? "5 4" : undefined,
        strokeOpacity: s.meta?.companion ? 0.55 : undefined,
        stroke: seriesColorVar(s),
        points:
          !sparkline && !s.meta?.companion && ((s.meta?.dots ?? fo.dots) === true || singlePoint),
      });
    });

    if (!sparkline) {
      marks.push(
        ...referenceLineMarks(fo.referenceLines, data.categories),
        ...valueLabelMarks(
          fo.showValueLabels ? buildSeriesRows(data, { skipNull: true }) : [],
          format,
        ),
      );
      marks.push(crosshair({ x: {}, y: false }));
    }

    return defineChart({
      marks,
      x: {
        scale: pointScale,
        axis: sparkline || options.axes?.x?.hide
          ? false
          : {
              label: axl.x,
              ticks: { format: (v: string | number) => format.category(v) },
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
                format: (v: number) =>
                  format.value(v, data.series[0]?.meta?.measure ?? data.series[0]?.key, "axis"),
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
          : cubeTooltip({ format }),
      margin: sparkline ? 4 : undefined,
      keyboard: !sparkline,
    });
  }, [data, options, format, fo, sparkline]);

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
