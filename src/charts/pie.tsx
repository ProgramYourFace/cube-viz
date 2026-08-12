import * as React from "react";
import {
  colorLegend,
  defineChart,
  type ChartColorOptions,
  type ChartPoint,
  type ChartTooltipContent,
  type ChartValue,
} from "@tanstack/charts";
import { pie, polar, radialArc, radialText, type PieDatum } from "@tanstack/charts/polar";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";

import { DEFAULT_COLOR_RAMP } from "@/adapter";

import type { ChartComponentProps } from "./types";
import type { PieFamilyOptions } from "./defaults";
import {
  CvChart,
  legendDisplay,
  legendPlacement,
  percentTick,
  seriesMember,
  tooltipClassName,
} from "./tanstack";

/** One slice in mark-ready form: the category label doubles as the stable key
 *  AND the color-scale value; `token` is the assigned palette token. */
interface SliceRow {
  /** Formatted category label — slice identity (key + color domain value). */
  label: string;
  value: number;
  /** Palette token (chart-1..5), assigned by post-rollup slice index. */
  token: string;
}

type PieSlice = PieDatum<SliceRow>;

/** Shared muted empty-state chrome (plain CSS — no Tailwind in this layer). */
const emptyStyle: React.CSSProperties = {
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
 * `pie` — covers pie + donut (donut = innerRadiusPct > 0) on TanStack polar
 * marks: the eager `pie()` transform allocates angles (gapAngle ⇐ padAngle),
 * `radialArc` renders the slices, `radialText` draws slice labels and the donut
 * center label. `maxSlices` keeps the top-N and folds the remainder into an
 * "Other" slice. Pie plots `categories` × the FIRST series
 * (docs/02-chart-options.md §2.4).
 *
 * Slice color: the arc's `color` channel is the category label, and the chart
 * color scale gets an explicit domain (labels) + range (ramp token vars) so the
 * built-in legend renders one swatch per slice.
 */
export function PieChartFamily({
  data,
  options,
  format,
  theme,
}: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as PieFamilyOptions;
  const measure = data.series[0];
  const member = seriesMember(measure);

  // 1) categories × first series → raw slices; 2) top-N + "Other" rollup;
  // 3) palette tokens by post-rollup index (legend and fill always agree).
  // A pie's "series" are its SLICES (one per category), so the envelope's
  // `colors.ramp` is what applies here — cycled by post-rollup slice index.
  // (`colors.byKey` is keyed by SERIES key and has no slice to bind to, so it does
  // not apply to pie; see docs/02-chart-options.md §7.6.)
  const ramp = options.colors?.ramp?.length ? options.colors.ramp : DEFAULT_COLOR_RAMP;
  const slices: SliceRow[] = React.useMemo(() => {
    const raw = data.categories.map((cat, i) => ({
      label: format.category(cat),
      value: measure?.data[i] ?? 0,
    }));
    return rollupSlices(raw, fo.maxSlices).map((s, i) => ({
      ...s,
      token: ramp[i % ramp.length],
    }));
  }, [data, format, measure, fo.maxSlices, ramp]);

  const total = slices.reduce((sum, s) => sum + s.value, 0);
  // Negative values break pie geometry (the pie transform rejects them) and
  // would produce negative percent labels. Degrade visibly instead.
  const hasNegative = slices.some((s) => s.value < 0);
  // Rows present but every measure null/0 ⇒ data.empty is false, so the
  // renderer's "No data" never fires — guard here (mirrors the old family).
  const degenerate = hasNegative || slices.length === 0 || total <= 0;

  const definition = React.useMemo(() => {
    if (degenerate) return null;

    const inner = (fo.innerRadiusPct ?? 0) / 100;
    const outer = theme.pieRadiusPct / 100;
    const isDonut = inner > 0;
    const showLabels = fo.showLabels ?? "percent";

    // Recharts' paddingAngle was degrees; the pie transform's gapAngle is radians.
    const rows = pie(slices, {
      value: "value",
      gapAngle: (theme.pieGapAngle * Math.PI) / 180,
    });

    const arcs = radialArc(rows, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius }) => radius * inner,
      outerRadius: ({ radius }) => radius * outer,
      cornerRadius: theme.pieCornerRadius,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- heterogeneous
    // polar mark set (arc rows vs. center-label datum); CvChart erases types anyway.
    const polarMarks: any[] = [arcs];

    if (showLabels !== "none") {
      const sliceText = (d: PieSlice): string => {
        if (showLabels === "name") return d.label;
        if (showLabels === "value") return format.value(d.value, member, "label");
        return percentTick(d.fraction);
      };
      // Inside the slice at ~outer*0.75; for donuts, centered in the ring so the
      // label can't fall into the hole.
      const labelRadius = isDonut ? (inner + outer) / 2 : outer * 0.75;
      polarMarks.push(
        radialText(
          rows.filter((d) => d.value > 0),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (d: PieSlice) => d.angle,
            radius: labelRadius,
            text: sliceText,
            fill: "var(--foreground)",
            fontSize: 11,
            anchor: "middle",
            baseline: "middle",
          },
        ),
      );
    }

    // The center label lives in the DONUT HOLE: on a full pie it would land on top of
    // the slices, so it is donut-only (`innerRadiusPct > 0`) — as it was pre-migration.
    if (isDonut && fo.centerLabel) {
      const big =
        fo.centerLabel.value === undefined || fo.centerLabel.value === "total"
          ? format.value(total, member, "label")
          : fo.centerLabel.value;
      polarMarks.push(
        radialText([{ id: "cv-pie-center" }], {
          id: "cv-pie-center",
          key: "id",
          angle: 0,
          radius: 0,
          text: () => big,
          fill: "var(--foreground)",
          fontSize: 24,
          fontWeight: 700,
          anchor: "middle",
          baseline: "middle",
        }),
      );
      if (fo.centerLabel.label) {
        const sub = fo.centerLabel.label;
        polarMarks.push(
          radialText([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => sub,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle",
          }),
        );
      }
    }

    // Legend from the chart color scale: domain = slice labels, range = tokens.
    const color: ChartColorOptions = {
      domain: slices.map((s) => s.label),
      range: slices.map((s) => `var(--${s.token})`),
    };
    if (legendDisplay(options)) {
      color.legend = colorLegend({ placement: legendPlacement(options.legend?.position) });
    }

    const measureLabel = measure ? measure.label || measure.key : "";

    return defineChart({
      marks: [
        polar({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: scaleLinear().domain([0, Math.PI * 2]) },
          radius: { scale: scaleLinear().domain([0, 1]) },
          marks: polarMarks,
        }),
      ],
      x: null,
      y: null,
      guides: false,
      color,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip:
        options.tooltip?.show === false
          ? undefined
          : {
              use: tooltip,
              className: tooltipClassName(options.tooltip?.indicator),
              content: (
                untypedPoints: readonly ChartPoint<unknown, ChartValue, ChartValue>[],
              ): ChartTooltipContent => {
                // Only the arc mark emits interaction points here; their rows
                // are PieDatum<SliceRow>, so the cast is safe by construction.
                const p = (untypedPoints as readonly ChartPoint<PieSlice, ChartValue, ChartValue>[])[0];
                if (!p) return { rows: [] };
                const d = p.datum;
                return {
                  title: d.label,
                  rows: [
                    {
                      label: measureLabel,
                      value: `${format.value(d.value, member, "tooltip")} (${percentTick(d.fraction)})`,
                      color: p.color,
                    },
                  ],
                };
              },
            },
      keyboard: true,
    });
  }, [degenerate, slices, total, options, format, fo, theme, measure, member]);

  if (hasNegative) {
    return <div style={emptyStyle}>Pie charts can&apos;t show negative values</div>;
  }
  if (!definition) {
    return <div style={emptyStyle}>No data</div>;
  }

  const label = slices.map((s) => s.label).join(", ") || "Pie chart";
  return <CvChart definition={definition} ariaLabel={label} className="cv-chart--fill" />;
}

/** Keep the top-(maxSlices-1) by value, summing the rest into an "Other" slice. */
function rollupSlices(
  slices: readonly Omit<SliceRow, "token">[],
  maxSlices?: number,
): Omit<SliceRow, "token">[] {
  if (!maxSlices || slices.length <= maxSlices) return [...slices];
  const sorted = [...slices].sort((a, b) => b.value - a.value);
  const head = sorted.slice(0, maxSlices - 1);
  const tail = sorted.slice(maxSlices - 1);
  return [...head, { label: "Other", value: tail.reduce((sum, s) => sum + s.value, 0) }];
}
