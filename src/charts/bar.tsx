import * as React from "react";
import { barX, barY, defineChart, group, lineY, lineX, stack, type ChartMark } from "@tanstack/charts";

import type { ChartComponentProps } from "./types";
import type { BarFamilyOptions } from "./defaults";
import {
  axisFormat,
  bandScale,
  buildSeriesRows,
  buildStackedRows,
  cubeTooltip,
  CvChart,
  legendDisplay,
  legendPlacement,
  percentTick,
  pivotValueMember,
  referenceLineMarks,
  resolvedAxisLabels,
  chartCurve,
  seriesColor,
  seriesColorVar,
  seriesLabel,
  seriesMember,
  stackGroups,
  valueAnchor,
  valueLabelMarks,
  valueScale,
  type SeriesRow,
  type StackedRow,
} from "./tanstack";

/**
 * `bar` — absorbs all six Embeddable Bar Pros via `orientation` × `stackMode`
 * (docs/02-chart-options.md §2.1). orientation → barY/barX, stackMode → mark
 * layout (group()/implicit stack/stack({offset:"normalize"})) are translated
 * HERE; the spec never carries a renderer prop. One mark renders ALL series
 * from long rows — grouping/stacking is per-mark geometry, and per-series
 * paint comes from the chart-level color domain/range (seriesColor).
 * Dual-axis (`meta.axis === "right"`) was removed with the combo family.
 */
export function BarChartFamily({
  data,
  options,
  format,
  theme,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as BarFamilyOptions;

  const definition = React.useMemo(() => {
    const horizontal = options.orientation === "horizontal";
    const percent = options.stackMode === "percent";
    const stacked = options.stackMode === "stacked" || percent;

    // comparePrevious companions: in GROUPED mode they render as ordinary extra
    // bars with a translucent per-datum fill (the old `fillOpacity: 0.4`). In
    // STACKED mode they must NOT join the stack (that would inflate totals —
    // Recharts kept them in a separate `__prev` stack); instead the previous
    // period renders as a dashed step line of companion totals over the stack.
    const companions = data.series.filter((s) => s.meta?.companion);
    const mains = companions.length ? data.series.filter((s) => !s.meta?.companion) : data.series;
    const barSeries = stacked ? mains : data.series;

    // Per-series `meta.stackId`: series sharing an id stack together, DIFFERENT ids
    // are separate stacks drawn side by side (the Recharts contract). One stack ⇒
    // the ordinary implicit-stacking path below, untouched.
    const stacks = stacked ? stackGroups(barSeries) : [];
    const multiStack = stacks.length > 1;
    const rows = multiStack
      ? buildStackedRows(data, barSeries, { normalize: percent })
      : buildSeriesRows(data, { series: barSeries });
    const tokenByLabel = new Map(data.series.map((s) => [seriesLabel(s), seriesColorVar(s)]));
    // Category index → every row in it (the multi-stack tooltip's expansion).
    const rowsByCategory = new Map<number, SeriesRow[]>();
    if (multiStack) {
      for (const r of rows) {
        const bucket = rowsByCategory.get(r.i);
        if (bucket) bucket.push(r);
        else rowsByCategory.set(r.i, [r]);
      }
    }
    const axl = resolvedAxisLabels(data, options);
    // Visual-axis semantics (as before): for a horizontal bar the category sits
    // on Y and the value on X, so hide flags + scale options swap with it.
    const catAxisHidden = horizontal ? options.axes?.y?.hide : options.axes?.x?.hide;
    const valAxis = horizontal ? options.axes?.x : options.axes?.y;
    const val = valueScale(valAxis);
    const catPadding = theme.barCategoryGap;
    // Per-axis `tickFormat` overrides re-bind the formatter for THAT axis' ticks only
    // (the visual axes swap with `orientation`, so the category axis reads the
    // category-side options and the value axis the value-side ones).
    const catAxisOpts = horizontal ? options.axes?.y : options.axes?.x;
    const catTickFormat = axisFormat(format, catAxisOpts);
    const valTickFormat = axisFormat(format, valAxis);
    // percent stackMode is chart geometry (0..1), not a host unit rule → local tick.
    const valueMember = pivotValueMember(options) ?? seriesMember(data.series[0]);
    const valueTick = (v: number): string =>
      percent ? percentTick(v) : valTickFormat.value(v, valueMember, "axis");
    const categoryAxis = catAxisHidden
      ? (false as const)
      : {
          label: axl.x,
          ticks: { format: (v: string | number) => catTickFormat.category(v) },
        };
    const valueAxis = valAxis?.hide
      ? (false as const)
      : { label: axl.y, ticks: { format: valueTick } };

    // stackMode → layout: percent = normalized stack; stacked = implicit stack
    // (repeated categories stack automatically once z is set); none/grouped =
    // explicit side-by-side geometry. MULTI-STACK is the fourth case: the rows
    // carry their own [y1,y2] intervals (which opts the mark out of implicit
    // stacking, normalize included), so the layout groups the STACKS side by side.
    const groupLayout = group({ padding: theme.barGap });
    const layout = multiStack
      ? groupLayout
      : percent
        ? stack({ offset: "normalize" })
        : stacked
          ? undefined
          : groupLayout;

    const barOptions = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (r: SeriesRow) => (multiStack ? (r as StackedRow).stack : r.label),
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (r: SeriesRow) => `${r.label} ${r.i}`,
      layout,
      radius: theme.barRadius,
      maxThickness: theme.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (r: SeriesRow) => {
        const token = tokenByLabel.get(r.label) ?? "var(--chart-1)";
        return r.companion ? `color-mix(in oklab, ${token} 40%, transparent)` : token;
      },
    } as const;

    const marks: ChartMark[] = [
      multiStack
        ? horizontal
          ? barX(rows as StackedRow[], { ...barOptions, x1: "y1", x2: "y2", y: "cat" })
          : barY(rows as StackedRow[], { ...barOptions, x: "cat", y1: "y1", y2: "y2" })
        : horizontal
          ? barX(rows, { ...barOptions, x: "value", y: "cat" })
          : barY(rows, { ...barOptions, x: "cat", y: "value" }),
    ];

    // Stacked previous-period overlay: dashed step line of companion totals.
    // Skipped in percent mode (a share axis has no meaningful prev total).
    if (stacked && !percent && companions.length) {
      const prevRows: SeriesRow[] = data.categories.map((cat, i) => ({
        cat: typeof cat === "number" ? cat : String(cat),
        value: companions.reduce<number | null>((sum, s) => {
          const v = s.data[i];
          if (typeof v !== "number") return sum;
          return (sum ?? 0) + v;
        }, null),
        key: "__prev_total",
        label: "Previous period",
        member: companions[0]?.meta?.measure ?? companions[0]?.key,
        companion: true,
        i,
      }));
      if (prevRows.some((r) => r.value !== null)) {
        const prevStyle = {
          id: "cv-bars-prev",
          key: (r: SeriesRow) => `prev ${r.i}`,
          curve: chartCurve("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4",
        } as const;
        marks.push(
          horizontal
            ? lineX(prevRows, { ...prevStyle, x: "value", y: "cat" })
            : lineY(prevRows, { ...prevStyle, x: "cat", y: "value" }),
        );
      }
    }

    marks.push(
      ...referenceLineMarks(fo.referenceLines, data.categories, {
        swap: horizontal,
        valueAnchor: valueAnchor(data),
      }),
    );
    if (fo.showValueLabels) {
      // A stacked bar's segment sits at its CUMULATIVE top, and in percent mode on a
      // 0..1 axis — so stacked labels ride pre-computed stack rows (and print the
      // share, which is what the normalized geometry actually shows). Grouped/none
      // keeps labelling the raw value at the bar's own height.
      const labelRows = stacked
        ? multiStack
          ? (rows as StackedRow[])
          : buildStackedRows(data, barSeries, { normalize: percent })
        : rows;
      marks.push(
        ...valueLabelMarks(labelRows, format, {
          swap: horizontal,
          share: percent,
          stacked,
        }),
      );
    }

    return defineChart({
      marks,
      x: horizontal
        ? { scale: val.scale, nice: val.nice, grid: true, axis: valueAxis }
        : { scale: () => bandScale(catPadding), axis: categoryAxis },
      y: horizontal
        ? { scale: () => bandScale(catPadding), axis: categoryAxis }
        : { scale: val.scale, nice: val.nice, grid: true, axis: valueAxis },
      color: seriesColor(stacked ? { ...data, series: barSeries } : data, {
        legend: legendDisplay(options) && barSeries.length > 1,
        legendPlacement: legendPlacement(options.legend?.position),
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: horizontal ? "group-y" : "group-x",
      tooltip:
        options.tooltip?.show === false
          ? undefined
          : cubeTooltip({
              format,
              // Multi-stack percent shares are per STACK, not per category, so the
              // row carries its own share and the generic denominator is bypassed.
              percentShare: percent && !multiStack,
              value:
                percent && multiStack
                  ? (r) => {
                      const share = (r as StackedRow).share;
                      return typeof share === "number" ? percentTick(share) : "";
                    }
                  : undefined,
              // A multi-stack mark groups by STACK, so grouped focus yields one point
              // per stack; expand back to every series of the focused category.
              expand: multiStack
                ? (focused) => rowsByCategory.get(focused.i) ?? [focused]
                : undefined,
              colorOf: multiStack
                ? (r) => tokenByLabel.get(r.label) ?? "var(--chart-1)"
                : undefined,
              indicator: options.tooltip?.indicator,
              showTotal: options.tooltip?.showTotal,
            }),
      keyboard: true,
    });
  }, [data, options, format, fo, theme]);

  const label = data.series.map(seriesLabel).join(", ") || "Bar chart";
  return <CvChart definition={definition} ariaLabel={label} className="cv-chart--fill" />;
}
