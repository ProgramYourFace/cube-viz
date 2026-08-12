import { describe, expect, it } from "vitest";

import type { NormalizedChartData, NormalizedSeries } from "@/adapter/types";
import { ChartOptionsSchema, type ChartTransform } from "@/spec";

import {
  applyTransform,
  familySupportsTransform,
  transformedChartFormat,
} from "./transforms";

/* ───────────────────────────────── fixtures ──────────────────────────────── */

function series(
  key: string,
  data: (number | null)[],
  extra: Partial<NormalizedSeries> = {},
): NormalizedSeries {
  return {
    key,
    label: key.toUpperCase(),
    data,
    colorToken: "chart-2",
    meta: { measure: key, unit: "km", quantity: "distance", convert: true },
    ...extra,
  };
}

function chartData(all: NormalizedSeries[], categories?: (string | number)[]): NormalizedChartData {
  return {
    categories: categories ?? all[0]!.data.map((_, i) => `c${i}`),
    series: all,
    raw: { rows: [], query: {} },
    empty: false,
  };
}

const of = (d: NormalizedChartData, i = 0): (number | null)[] => d.series[i]!.data;
const round = (xs: (number | null)[], p = 6): (number | null)[] =>
  xs.map((v) => (v === null ? null : Number(v.toFixed(p))));

/* ─────────────────────────────── no transform ────────────────────────────── */

describe("applyTransform — pass-through", () => {
  it("returns the SAME object when there is no transform", () => {
    const d = chartData([series("a", [1, 2, 3])]);
    expect(applyTransform(d, undefined)).toBe(d);
  });

  it("returns the SAME object for empty data (the data.empty guard)", () => {
    const d: NormalizedChartData = { ...chartData([series("a", [1, 2, 3])]), empty: true };
    expect(applyTransform(d, { kind: "cumulative" })).toBe(d);
  });

  it("returns the SAME object when there are no categories or no series", () => {
    const noCats = chartData([series("a", [])], []);
    expect(applyTransform(noCats, { kind: "rollingAvg" })).toBe(noCats);
    const noSeries = chartData([], ["c0", "c1"]);
    expect(applyTransform(noSeries, { kind: "percentOfTotal" })).toBe(noSeries);
  });
});

/* ──────────────────────────────── rollingAvg ─────────────────────────────── */

describe("applyTransform — rollingAvg", () => {
  it("is a TRAILING mean over `window` categories", () => {
    const d = applyTransform(chartData([series("a", [1, 2, 3, 4, 5])]), {
      kind: "rollingAvg",
      window: 3,
    });
    // leading positions average what exists: [1], [1,2], [1,2,3], [2,3,4], [3,4,5]
    expect(of(d)).toEqual([1, 1.5, 2, 3, 4]);
  });

  it("defaults the window to 7 when unspecified", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    const d = applyTransform(chartData([series("a", data)]), { kind: "rollingAvg" });
    // index 7 spans indices 1..7 (a 7-wide trailing window) → mean of 2..8 = 5
    expect(of(d)[7]).toBe(5);
    // index 6 spans 0..6 → mean of 1..7 = 4
    expect(of(d)[6]).toBe(4);
  });

  it("emits NO leading nulls — short windows average what exists", () => {
    const d = applyTransform(chartData([series("a", [10, 20, 30])]), {
      kind: "rollingAvg",
      window: 30,
    });
    expect(of(d)).toEqual([10, 15, 20]);
    expect(of(d).some((v) => v === null)).toBe(false);
  });

  it("handles a window LARGER than the series length (expanding mean)", () => {
    const d = applyTransform(chartData([series("a", [2, 4, 6, 8])]), {
      kind: "rollingAvg",
      window: 90,
    });
    expect(of(d)).toEqual([2, 3, 4, 5]);
  });

  it("window = 1 is the identity", () => {
    const src = [3, null, 7, 0];
    const d = applyTransform(chartData([series("a", src)]), { kind: "rollingAvg", window: 1 });
    expect(of(d)).toEqual(src);
  });

  it("skips nulls in BOTH the sum and the count", () => {
    const d = applyTransform(chartData([series("a", [4, null, 8])]), {
      kind: "rollingAvg",
      window: 3,
    });
    // [4] → 4; [4,null] → 4 (not 2); [4,null,8] → 6 (not 4)
    expect(of(d)).toEqual([4, 4, 6]);
  });

  it("keeps an ALL-NULL window null", () => {
    const d = applyTransform(chartData([series("a", [null, null, 9, null])]), {
      kind: "rollingAvg",
      window: 2,
    });
    // [null] → null; [null,null] → null; [null,9] → 9; [9,null] → 9
    expect(of(d)).toEqual([null, null, 9, 9]);
  });

  it("rolls each series independently", () => {
    const d = applyTransform(
      chartData([series("a", [1, 3]), series("b", [10, 30])]),
      { kind: "rollingAvg", window: 2 },
    );
    expect(of(d, 0)).toEqual([1, 2]);
    expect(of(d, 1)).toEqual([10, 20]);
  });
});

/* ──────────────────────────────── cumulative ─────────────────────────────── */

describe("applyTransform — cumulative", () => {
  it("is a running sum per series", () => {
    const d = applyTransform(
      chartData([series("a", [1, 2, 3, 4]), series("b", [5, 0, -5, 10])]),
      { kind: "cumulative" },
    );
    expect(of(d, 0)).toEqual([1, 3, 6, 10]);
    expect(of(d, 1)).toEqual([5, 5, 0, 10]);
  });

  it("keeps the OUTPUT null where the input was null, and the total intact after it", () => {
    const d = applyTransform(chartData([series("a", [1, null, 2, 3])]), { kind: "cumulative" });
    // the gap stays visible; accumulation treats it as 0 and resumes from 1
    expect(of(d)).toEqual([1, null, 3, 6]);
  });

  it("handles an all-null series", () => {
    const d = applyTransform(chartData([series("a", [null, null])]), { kind: "cumulative" });
    expect(of(d)).toEqual([null, null]);
  });

  it("ignores `window` (it is rollingAvg-only)", () => {
    const withWindow = applyTransform(chartData([series("a", [1, 2, 3])]), {
      kind: "cumulative",
      window: 2,
    });
    const without = applyTransform(chartData([series("a", [1, 2, 3])]), { kind: "cumulative" });
    expect(of(withWindow)).toEqual(of(without));
  });
});

/* ─────────────────────────────── percentOfTotal ──────────────────────────── */

describe("applyTransform — percentOfTotal", () => {
  it("expresses each value as a 0..1 share of its CATEGORY total across series", () => {
    const d = applyTransform(
      chartData([series("a", [25, 10]), series("b", [75, 30])]),
      { kind: "percentOfTotal" },
    );
    expect(of(d, 0)).toEqual([0.25, 0.25]);
    expect(of(d, 1)).toEqual([0.75, 0.75]);
  });

  it("shares sum to 1 within each category", () => {
    const d = applyTransform(
      chartData([series("a", [1, 2]), series("b", [2, 1]), series("c", [1, 1])]),
      { kind: "percentOfTotal" },
    );
    for (let i = 0; i < 2; i++) {
      const total = d.series.reduce((acc, s) => acc + (s.data[i] ?? 0), 0);
      expect(Number(total.toFixed(9))).toBe(1);
    }
  });

  it("yields null for a ZERO category total (no divide-by-zero spike)", () => {
    const d = applyTransform(
      chartData([series("a", [0, 5]), series("b", [0, 5])]),
      { kind: "percentOfTotal" },
    );
    expect(of(d, 0)).toEqual([null, 0.5]);
    expect(of(d, 1)).toEqual([null, 0.5]);
  });

  it("yields null for a category whose values cancel to zero", () => {
    const d = applyTransform(
      chartData([series("a", [10]), series("b", [-10])]),
      { kind: "percentOfTotal" },
    );
    expect(of(d, 0)).toEqual([null]);
    expect(of(d, 1)).toEqual([null]);
  });

  it("keeps nulls null and excludes them from the total", () => {
    const d = applyTransform(
      chartData([series("a", [null, 1]), series("b", [3, 3])]),
      { kind: "percentOfTotal" },
    );
    expect(of(d, 0)).toEqual([null, 0.25]);
    expect(of(d, 1)).toEqual([1, 0.75]);
  });

  it("handles an all-null category (total 0 → null)", () => {
    const d = applyTransform(
      chartData([series("a", [null, 2]), series("b", [null, 2])]),
      { kind: "percentOfTotal" },
    );
    expect(round(of(d, 0))).toEqual([null, 0.5]);
  });

  it("DROPS the measure unit/quantity/convert and formats as a percent", () => {
    const d = applyTransform(chartData([series("a", [1, 3])]), { kind: "percentOfTotal" });
    const meta = d.series[0]!.meta!;
    expect(meta.unit).toBeUndefined();
    expect(meta.quantity).toBeUndefined();
    expect(meta.convert).toBeUndefined();
    expect(meta.format).toEqual({ kind: "percent", decimals: 0 });
    // `measure` is KEPT — it still drives the axis title / tooltip label.
    expect(meta.measure).toBe("a");
  });

  it("survives a series with no meta at all", () => {
    const bare: NormalizedSeries = { key: "a", label: "A", data: [1, 1] };
    const d = applyTransform(chartData([bare]), { kind: "percentOfTotal" });
    expect(d.series[0]!.meta).toEqual({ format: { kind: "percent", decimals: 0 } });
  });
});

/* ─────────────────────── identity + purity guarantees ────────────────────── */

describe("applyTransform — series identity + purity", () => {
  const kinds: ChartTransform[] = [
    { kind: "rollingAvg", window: 3 },
    { kind: "cumulative" },
    { kind: "percentOfTotal" },
  ];

  for (const t of kinds) {
    it(`preserves key/label/colorToken across ${t.kind}`, () => {
      const src = chartData([
        series("m1", [1, 2, 3], { label: "Trips", colorToken: "chart-3" }),
        series("m2", [4, 5, 6], { label: "Miles", colorToken: "chart-5" }),
      ]);
      const d = applyTransform(src, t);
      expect(d.series.map((s) => s.key)).toEqual(["m1", "m2"]);
      expect(d.series.map((s) => s.label)).toEqual(["Trips", "Miles"]);
      expect(d.series.map((s) => s.colorToken)).toEqual(["chart-3", "chart-5"]);
      expect(d.categories).toBe(src.categories);
      expect(d.raw).toBe(src.raw);
      expect(d.empty).toBe(false);
    });

    it(`does not MUTATE the input for ${t.kind}`, () => {
      const src = chartData([series("a", [1, null, 3])]);
      const snapshot = JSON.parse(JSON.stringify(src)) as NormalizedChartData;
      applyTransform(src, t);
      expect(src).toEqual(snapshot);
    });
  }

  it("preserves the FULL meta (curve/dots/stackId/companion) for non-percent kinds", () => {
    const src = chartData([
      series("a", [1, 2], {
        meta: { measure: "a", unit: "km", curve: "step", dots: true, stackId: "s", companion: true },
      }),
    ]);
    const d = applyTransform(src, { kind: "cumulative" });
    expect(d.series[0]!.meta).toEqual(src.series[0]!.meta);
  });

  it("keeps curve/dots/stackId through percentOfTotal (only unit fields are dropped)", () => {
    const src = chartData([
      series("a", [1, 1], { meta: { measure: "a", unit: "km", curve: "step", stackId: "s" } }),
    ]);
    const d = applyTransform(src, { kind: "percentOfTotal" });
    expect(d.series[0]!.meta).toEqual({
      measure: "a",
      curve: "step",
      stackId: "s",
      format: { kind: "percent", decimals: 0 },
    });
  });
});

/* ───────────────────────────── format + gating ───────────────────────────── */

describe("transformedChartFormat", () => {
  const base = {
    value: (v: number | string | null | undefined) => `${v} km`,
    category: (v: string | number | null | undefined) => `cat:${v}`,
  };

  it("is the IDENTITY for no transform / rollingAvg / cumulative", () => {
    expect(transformedChartFormat(base, undefined)).toBe(base);
    expect(transformedChartFormat(base, { kind: "rollingAvg", window: 7 })).toBe(base);
    expect(transformedChartFormat(base, { kind: "cumulative" })).toBe(base);
  });

  it("formats every value surface as a percent for percentOfTotal", () => {
    const f = transformedChartFormat(base, { kind: "percentOfTotal" }, "en-US");
    expect(f.value(0.25, "device_trips.distance", "axis")).toBe("25%");
    expect(f.value(0.256, "device_trips.distance", "tooltip")).toBe("26%");
    expect(f.value(1, "device_trips.distance", "label")).toBe("100%");
    expect(f.value(null)).toBe("");
    // categories are untouched
    expect(f.category("2026-01-01")).toBe("cat:2026-01-01");
  });
});

describe("familySupportsTransform", () => {
  const d = (supportsMapping: boolean, supportsCartesianAxes: boolean, queryless?: boolean) => ({
    supportsMapping,
    supportsCartesianAxes,
    queryless,
  });

  it("allows mapping-driven CARTESIAN families (bar/line/area)", () => {
    expect(familySupportsTransform(d(true, true))).toBe(true);
  });

  it("excludes pie/heatmap (mapping but not cartesian), scatter/kpi/table, and query-less", () => {
    expect(familySupportsTransform(d(true, false))).toBe(false); // pie, heatmap
    expect(familySupportsTransform(d(false, false))).toBe(false); // scatter, kpi, table, map
    expect(familySupportsTransform(d(true, true, true))).toBe(false); // ai (query-less)
    expect(familySupportsTransform(undefined)).toBe(false);
  });
});

/* ─────────────────────────────── the spec seam ───────────────────────────── */

describe("ChartOptionsSchema.transform", () => {
  const parse = (transform: unknown) =>
    ChartOptionsSchema.safeParse({ family: "line", transform });

  it("accepts each kind, and window only where it belongs", () => {
    expect(parse({ kind: "rollingAvg", window: 7 }).success).toBe(true);
    expect(parse({ kind: "cumulative" }).success).toBe(true);
    expect(parse({ kind: "percentOfTotal" }).success).toBe(true);
  });

  it("stays OPTIONAL — a v2 spec with no transform is still valid", () => {
    expect(ChartOptionsSchema.safeParse({ family: "bar" }).success).toBe(true);
  });

  it("bounds the window to 2…90 integers and rejects unknown keys/kinds", () => {
    expect(parse({ kind: "rollingAvg", window: 1 }).success).toBe(false);
    expect(parse({ kind: "rollingAvg", window: 91 }).success).toBe(false);
    expect(parse({ kind: "rollingAvg", window: 7.5 }).success).toBe(false);
    expect(parse({ kind: "rollingAvg", window: 2 }).success).toBe(true);
    expect(parse({ kind: "rollingAvg", window: 90 }).success).toBe(true);
    expect(parse({ kind: "nope" }).success).toBe(false);
    expect(parse({ kind: "cumulative", extra: 1 }).success).toBe(false);
  });
});
