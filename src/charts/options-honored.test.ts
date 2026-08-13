import { describe, expect, it } from "vitest";

import { makeChartFormat } from "@/format/chart-format";
import { defaultFormatter } from "@/format/default";
import type { NormalizedChartData, NormalizedSeries } from "@/adapter/types";
import type { ChartOptions } from "@/spec";

import {
  axisFormat,
  buildStackedRows,
  referenceLineMarks,
  seriesDots,
  stackGroups,
  stackIdOf,
  tooltipClassName,
  valueAnchor,
  valueLabelMarks,
} from "./tanstack";

/**
 * Regression cover for the spec options the Recharts → TanStack rewrite silently
 * dropped (audit, 2026-08): per-series `meta.curve`/`meta.dots`/`meta.stackId`,
 * `axes.*.tickFormat`, `tooltip.indicator`, percent-mode value labels and
 * reference-line labels. Each test pins the MAPPING helper, not the React tree.
 */

function series(
  key: string,
  data: (number | null)[],
  meta?: NormalizedSeries["meta"],
): NormalizedSeries {
  return { key, label: key, data, meta };
}

function chartData(
  categories: (string | number)[],
  s: NormalizedSeries[],
): NormalizedChartData {
  return { categories, series: s, raw: { rows: [], query: {} }, empty: false };
}

/* ───────────────────────────── point markers ──────────────────────────────── */

describe("seriesDots (per-series meta.dots)", () => {
  it("lets a series turn points on over a family default of off", () => {
    expect(seriesDots(series("a", [], { dots: true }), false)).toBe(true);
  });

  it("lets a series turn points OFF over a family default of on", () => {
    expect(seriesDots(series("a", [], { dots: false }), true)).toBe(false);
  });

  it("treats the line family's `active` default as hover-only, not a static point", () => {
    expect(seriesDots(series("a", []), "active")).toBe(false);
  });
});

/* ──────────────────────────── per-series stackId ─────────────────────────── */

describe("stackGroups (per-series meta.stackId)", () => {
  it("defaults an unset stackId to the single shared stack", () => {
    expect(stackIdOf(series("a", []))).toBe("");
    const groups = stackGroups([series("a", []), series("b", [])]);
    expect(groups).toHaveLength(1);
    expect(groups[0].series.map((s) => s.key)).toEqual(["a", "b"]);
  });

  it("splits series into one group per distinct stackId, in first-appearance order", () => {
    const groups = stackGroups([
      series("a", [], { stackId: "left" }),
      series("b", [], { stackId: "right" }),
      series("c", [], { stackId: "left" }),
    ]);
    expect(groups.map((g) => g.stackId)).toEqual(["left", "right"]);
    expect(groups[0].series.map((s) => s.key)).toEqual(["a", "c"]);
    expect(groups[1].series.map((s) => s.key)).toEqual(["b"]);
  });
});

describe("buildStackedRows", () => {
  const data = chartData(
    ["Mon", "Tue"],
    [
      series("a", [10, 20], { stackId: "left" }),
      series("b", [30, 40], { stackId: "left" }),
      series("c", [5, 5], { stackId: "right" }),
    ],
  );

  it("stacks each series INSIDE its own stackId, not across stacks", () => {
    const rows = buildStackedRows(data, data.series);
    const mon = rows.filter((r) => r.i === 0);
    expect(mon.map((r) => [r.key, r.stack, r.y1, r.y2])).toEqual([
      ["a", "left", 0, 10],
      ["b", "left", 10, 40],
      // The right-hand stack restarts at the baseline instead of continuing at 40.
      ["c", "right", 0, 5],
    ]);
  });

  it("keeps the RAW value on every row (tooltips/labels never see the offset)", () => {
    const rows = buildStackedRows(data, data.series);
    expect(rows.filter((r) => r.i === 1).map((r) => r.value)).toEqual([20, 40, 5]);
  });

  it("normalizes each stack against ITS OWN total", () => {
    const rows = buildStackedRows(data, data.series, { normalize: true });
    const mon = rows.filter((r) => r.i === 0);
    expect(mon.map((r) => r.y2)).toEqual([0.25, 1, 1]);
    expect(mon.map((r) => r.share)).toEqual([0.25, 0.75, 1]);
  });

  it("stacks negatives downward from the baseline (a mixed stack stays readable)", () => {
    const mixed = chartData(["Mon"], [series("up", [10]), series("down", [-4])]);
    const rows = buildStackedRows(mixed, mixed.series);
    expect(rows.map((r) => [r.y1, r.y2])).toEqual([
      [0, 10],
      [0, -4],
    ]);
  });

  it("leaves a null datum as a zero-width interval with no share", () => {
    const gappy = chartData(["Mon"], [series("a", [null]), series("b", [8])]);
    const rows = buildStackedRows(gappy, gappy.series, { normalize: true });
    expect(rows[0]).toMatchObject({ value: null, y1: 0, y2: 0, share: null });
    expect(rows[1]).toMatchObject({ value: 8, y2: 1 });
  });
});

/* ─────────────────────────── axes.*.tickFormat ───────────────────────────── */

describe("axisFormat (axes.*.tickFormat)", () => {
  const annotation = {
    measures: { "t.km": { title: "Distance", shortTitle: "Distance", meta: {} } },
    dimensions: {},
    segments: {},
    timeDimensions: {},
  };
  const options = { family: "line", format: { kind: "number" } } as ChartOptions;
  const base = makeChartFormat(annotation, options, defaultFormatter);

  it("returns the SAME formatter when the axis carries no override", () => {
    expect(axisFormat(base, undefined)).toBe(base);
    expect(axisFormat(base, { label: "x" })).toBe(base);
  });

  it("applies the axis' own FormatOptions to its ticks", () => {
    const ticks = axisFormat(base, { tickFormat: { suffix: "km", decimals: 1 } });
    expect(ticks.value(12.34, "t.km", "axis")).toBe("12.3 km");
    // The chart-level formatter is untouched.
    expect(base.value(12.34, "t.km", "axis")).not.toContain("km");
  });

  it("falls back to the undecorated formatter when a host ChartFormat has no derive", () => {
    const hostFormat = { value: () => "raw", category: () => "cat" };
    expect(axisFormat(hostFormat, { tickFormat: { decimals: 2 } })).toBe(hostFormat);
  });
});

/* ─────────────────────────── tooltip.indicator ───────────────────────────── */

describe("tooltipClassName (tooltip.indicator)", () => {
  it("keeps the bare surface class when no indicator is set", () => {
    expect(tooltipClassName(undefined)).toBe("cv-chart-tooltip");
  });

  it("adds the shape modifier charts.css styles the swatch with", () => {
    expect(tooltipClassName("dashed")).toBe("cv-chart-tooltip cv-chart-tooltip--dashed");
    expect(tooltipClassName("line")).toBe("cv-chart-tooltip cv-chart-tooltip--line");
  });
});

/* ───────────────────── value labels + reference-line labels ───────────────── */

const fmt = makeChartFormat(undefined, { family: "bar" } as ChartOptions, defaultFormatter);

describe("valueLabelMarks", () => {
  const data = chartData(["Mon"], [series("a", [25]), series("b", [75])]);

  it("emits one text mark for the labelled rows", () => {
    expect(valueLabelMarks(buildStackedRows(data, data.series), fmt, {})).toHaveLength(1);
  });

  it("emits nothing when every row is null (no empty label layer)", () => {
    const blank = chartData(["Mon"], [series("a", [null])]);
    expect(valueLabelMarks(buildStackedRows(blank, blank.series), fmt, {})).toHaveLength(0);
  });

  it("computes each row's share for the percent mode label", () => {
    const rows = buildStackedRows(data, data.series, { normalize: true });
    expect(rows.map((r) => r.share)).toEqual([0.25, 0.75]);
  });
});

describe("referenceLineMarks", () => {
  const categories = ["Mon", "Tue", "Wed"];

  it("draws the rule alone when the line carries no label", () => {
    expect(referenceLineMarks([{ axis: "y", value: 10 }], categories)).toHaveLength(1);
  });

  it("adds a label mark for a VALUE-axis line, anchored at the first category", () => {
    const marks = referenceLineMarks([{ axis: "y", value: 10, label: "target" }], categories);
    expect(marks).toHaveLength(2);
  });

  it("adds a label mark for a CATEGORY-axis line once the family supplies a value anchor", () => {
    const ref = [{ axis: "x" as const, value: 1, label: "launch" }];
    // No anchor ⇒ the rule still draws, the (unplaceable) label is skipped.
    expect(referenceLineMarks(ref, categories)).toHaveLength(1);
    expect(referenceLineMarks(ref, categories, { valueAnchor: 42 })).toHaveLength(2);
  });

  it("skips a category rule whose index is out of range", () => {
    expect(referenceLineMarks([{ axis: "x", value: 9, label: "x" }], categories)).toHaveLength(0);
  });
});

describe("valueAnchor", () => {
  it("is the largest plotted value across every series", () => {
    const data = chartData(["a", "b"], [series("x", [1, 9]), series("y", [4, null])]);
    expect(valueAnchor(data)).toBe(9);
  });

  it("is undefined when nothing is plottable, so labels are skipped not placed at 0", () => {
    expect(valueAnchor(chartData(["a"], [series("x", [null])]))).toBeUndefined();
  });
});
