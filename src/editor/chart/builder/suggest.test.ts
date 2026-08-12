import { describe, expect, it } from "vitest";

import { builtinFamilyRegistry } from "@/charts";
import { SCHEMA_VERSION, type ChartFamily, type ChartSpec, type CubeQuery } from "@/spec";

import { fieldShape, previewSpecFor, rankFamilies, suggestedFamilies } from "./suggest";
import { readWells } from "./wells";

/**
 * Fit ranking — the "Suggested types" heuristic. What is asserted here is the
 * PRODUCT PROMISE, not the arithmetic: for each realistic field shape a
 * non-technical user arrives with, the chart type they should reach for is at the
 * top of the list, the ones that cannot draw are marked `fits: false` with a reason
 * naming the field they need, and no user-facing string leaks grammar language.
 */

const R = builtinFamilyRegistry;

const AMOUNT = "Orders.amount";
const COUNT = "Orders.count";
const STATUS = "Orders.status";
const CITY = "Orders.city";
const CREATED = "Orders.createdAt";

function specOf(query: CubeQuery, family: ChartFamily = "bar"): ChartSpec {
  return { schemaVersion: SCHEMA_VERSION, id: "t", kind: "chart", query, chart: { family } };
}

const time = (dimension: string): CubeQuery["timeDimensions"] => [
  { dimension, granularity: "day" },
];

/** Families in rank order, best first. */
const order = (spec: ChartSpec): ChartFamily[] => rankFamilies(R, spec).map((f) => f.family);
const fitOf = (spec: ChartSpec, family: ChartFamily) =>
  rankFamilies(R, spec).find((f) => f.family === family)!;
/** 0-based position in the ranking. */
const rankOf = (spec: ChartSpec, family: ChartFamily): number => order(spec).indexOf(family);

/* ───────────────────────────── the field shape ────────────────────────────── */

describe("fieldShape", () => {
  it("reads measures, dated axes and categories off the query", () => {
    const spec = specOf({
      measures: [AMOUNT, COUNT],
      timeDimensions: time(CREATED),
      dimensions: [STATUS],
    });
    expect(fieldShape(spec)).toEqual([
      { member: AMOUNT, kind: "number" },
      { member: COUNT, kind: "number" },
      { member: CREATED, kind: "time" },
      { member: STATUS, kind: "category" },
    ]);
  });

  it("ignores a granularity-less time dimension — that is a date FILTER, not an axis", () => {
    const spec = specOf({
      measures: [AMOUNT],
      timeDimensions: [{ dimension: CREATED, dateRange: ["2026-01-01", "2026-02-01"] }],
    });
    expect(fieldShape(spec)).toEqual([{ member: AMOUNT, kind: "number" }]);
  });
});

/* ──────────────────────────── the realistic shapes ────────────────────────── */

describe("rankFamilies — realistic field shapes", () => {
  it("1 measure over time → line/area top, kpi close behind", () => {
    const spec = specOf({ measures: [AMOUNT], timeDimensions: time(CREATED) });
    const ranked = rankFamilies(R, spec);
    const top = ranked.slice(0, 2).map((f) => f.family);

    expect(top).toEqual(["line", "area"]);
    // "Close" is the product requirement: a single measure over a date really can be a
    // KPI, so it must sit with the winners — ahead of bar, within 25% of the top score.
    const kpi = fitOf(spec, "kpi");
    expect(rankOf(spec, "kpi")).toBeLessThan(rankOf(spec, "bar"));
    expect(kpi.score).toBeGreaterThan(ranked[0].score * 0.75);
    expect(kpi.fits).toBe(true);
    expect(ranked[0].reason).toBe("1 measure over time");
  });

  it("2 measures over time → still line/area, and the reason says so", () => {
    const spec = specOf({ measures: [AMOUNT, COUNT], timeDimensions: time(CREATED) });
    const ranked = rankFamilies(R, spec);
    expect(ranked.slice(0, 2).map((f) => f.family)).toEqual(["line", "area"]);
    expect(ranked[0].reason).toBe("2 measures over time");
  });

  it("1 measure by 1 category → bar/pie top (no time chart)", () => {
    const spec = specOf({ measures: [AMOUNT], dimensions: [STATUS] });
    const ranked = rankFamilies(R, spec);
    expect(new Set(ranked.slice(0, 2).map((f) => f.family))).toEqual(new Set(["bar", "pie"]));
    // A date-first family must NOT win a purely categorical shape.
    expect(rankOf(spec, "bar")).toBeLessThan(rankOf(spec, "line"));
    expect(fitOf(spec, "bar").reason).toBe("1 measure by category");
  });

  it("2 categories + 1 measure → heatmap ranks with the best (it is the shape's chart)", () => {
    const spec = specOf({ measures: [AMOUNT], dimensions: [STATUS, CITY] });
    const ranked = rankFamilies(R, spec);
    const heatmap = fitOf(spec, "heatmap");

    expect(heatmap.fits).toBe(true);
    expect(rankOf(spec, "heatmap")).toBeLessThan(2); // top two
    expect(heatmap.score).toBeGreaterThanOrEqual(ranked[0].score);
    expect(heatmap.reason).toBe("A grid of two categories");
    // …and it beats every family that would have to throw one of the categories away.
    expect(heatmap.score).toBeGreaterThan(fitOf(spec, "pie").score);
    expect(heatmap.score).toBeGreaterThan(fitOf(spec, "kpi").score);
  });

  it("1 measure only → kpi tops", () => {
    const spec = specOf({ measures: [AMOUNT] });
    const ranked = rankFamilies(R, spec);
    expect(ranked[0].family).toBe("kpi");
    expect(ranked[0].reason).toBe("One headline number");
    // Nothing that needs an axis can draw this yet.
    expect(fitOf(spec, "bar").fits).toBe(false);
    expect(fitOf(spec, "bar").reason).toBe("Category needs a date or category");
  });

  it("2 measures, no dimension → scatter tops", () => {
    const spec = specOf({ measures: [AMOUNT, COUNT] });
    const ranked = rankFamilies(R, spec);
    expect(ranked[0].family).toBe("scatter");
    expect(ranked[0].reason).toBe("One measure against another");
    expect(fitOf(spec, "scatter").score).toBeGreaterThan(fitOf(spec, "kpi").score);
  });

  it("nothing placed yet → no family fits, so nothing is suggested", () => {
    const spec = specOf({});
    expect(rankFamilies(R, spec).every((f) => !f.fits)).toBe(true);
    expect(suggestedFamilies(rankFamilies(R, spec))).toEqual([]);
  });
});

/* ──────────────────────────── fits + block reasons ────────────────────────── */

describe("fits / reasons", () => {
  it("marks a family unfittable and names the field it is waiting for", () => {
    const spec = specOf({ measures: [AMOUNT], timeDimensions: time(CREATED) });
    const heatmap = fitOf(spec, "heatmap");
    const scatter = fitOf(spec, "scatter");

    expect(heatmap.fits).toBe(false);
    expect(heatmap.reason).toBe("Rows needs a category");
    expect(scatter.fits).toBe(false);
    expect(scatter.reason).toBe("Vertical axis needs a measure");
  });

  it("never speaks grammar to the user", () => {
    const specs = [
      specOf({ measures: [AMOUNT] }),
      specOf({ measures: [AMOUNT], dimensions: [STATUS] }),
      specOf({ measures: [AMOUNT, COUNT], dimensions: [STATUS, CITY], timeDimensions: time(CREATED) }),
      specOf({}),
    ];
    const banned = /\b(channel|encoding|pivot|dimension|cardinality|well)\b/i;
    for (const spec of specs) {
      for (const fit of rankFamilies(R, spec)) {
        expect(fit.reason, `${fit.family}: ${fit.reason}`).not.toMatch(banned);
        expect(fit.reason.length).toBeLessThanOrEqual(44);
      }
    }
  });

  it("suggests only families that would actually draw", () => {
    const spec = specOf({ measures: [AMOUNT], dimensions: [STATUS] });
    const suggested = suggestedFamilies(rankFamilies(R, spec));
    expect(suggested.length).toBeGreaterThan(0);
    expect(suggested.every((f) => f.fits)).toBe(true);
    expect(suggested.map((f) => f.family)).not.toContain("scatter");
  });
});

/* ─────────────────────────── the tile preview specs ───────────────────────── */

describe("previewSpecFor", () => {
  it("re-binds the current fields into the target family's wells", () => {
    const spec = specOf({
      measures: [AMOUNT, COUNT],
      timeDimensions: time(CREATED),
      dimensions: [STATUS],
    });

    const bar = previewSpecFor(R, spec, "bar");
    expect(readWells(bar, R)).toEqual({ y: [AMOUNT, COUNT], x: [CREATED], color: [STATUS] });

    const kpi = previewSpecFor(R, spec, "kpi");
    expect(readWells(kpi, R).value).toEqual([AMOUNT]);

    const scatter = previewSpecFor(R, spec, "scatter");
    expect(readWells(scatter, R).sx).toEqual([AMOUNT]);
    expect(readWells(scatter, R).sy).toEqual([COUNT]);
  });

  it("fills a family whose channels the CURRENT family has no home for", () => {
    // A bar's colour split is a `color` channel; the heatmap's rows are a `row`
    // channel, so a channel-preserving switch would drop it. The preview must still
    // show the heatmap the user would get after one drag.
    const spec = specOf({ measures: [AMOUNT], dimensions: [STATUS, CITY] });
    const wells = readWells(previewSpecFor(R, spec, "heatmap"), R);
    expect(wells.value).toEqual([AMOUNT]);
    expect(wells.hy).toEqual([STATUS]);
    expect(wells.hx).toEqual([CITY]);
  });

  it("leaves unfillable wells empty rather than throwing", () => {
    const spec = specOf({ measures: [AMOUNT] });
    expect(() => previewSpecFor(R, spec, "heatmap")).not.toThrow();
    expect(readWells(previewSpecFor(R, spec, "heatmap"), R).hy).toEqual([]);
  });

  /**
   * A tile is a PICTURE OF ONE CHART TYPE, so the spec behind it must stay that type
   * whatever the fields are — a tile that quietly previews another family is the same
   * class of bug as one that draws the wrong marks (which is checked end-to-end, in a
   * browser, by `scripts/verify-type-picker.mjs`).
   */
  it("keeps the requested family for every field shape", () => {
    const shapes = [
      specOf({ measures: [AMOUNT] }),
      specOf({ measures: [AMOUNT, COUNT], timeDimensions: time(CREATED) }),
      specOf({ measures: [AMOUNT], dimensions: [STATUS, CITY] }),
      specOf({}),
    ];
    for (const spec of shapes) {
      for (const descriptor of R.list()) {
        if (descriptor.queryless) continue;
        const preview = previewSpecFor(R, spec, descriptor.family);
        expect(preview.chart.family).toBe(descriptor.family);
      }
    }
  });

  /**
   * The area family renders two DIFFERENT ways and the tile hits both, so pin which
   * field shape lands where: independent measures overlap (one gradient-filled mark per
   * measure), a colour split stacks (one flat-filled mark). The overlap arrangement is
   * the one whose fill regressed to invisible, which is why it is asserted here as well
   * as in the DOM check.
   */
  it("previews independent measures as an OVERLAP area and a colour split as a stacked one", () => {
    const measures = previewSpecFor(
      R,
      specOf({ measures: [AMOUNT, COUNT], timeDimensions: time(CREATED) }),
      "area",
    ).chart;
    expect(measures.mapping?.series?.mode).toBe("measures");
    // No explicit stackMode ⇒ the renderer's shape-aware default applies, which for
    // measure-mode series is "none" (overlapping fills).
    expect(measures.stackMode).toBeUndefined();

    const split = previewSpecFor(
      R,
      specOf({ measures: [AMOUNT], timeDimensions: time(CREATED), dimensions: [STATUS] }),
      "area",
    ).chart;
    expect(split.mapping?.series?.mode).toBe("pivot");
    expect(split.stackMode).toBeUndefined();
  });
});
