import { describe, expect, it } from "vitest";

import { loadSpec, safeLoadSpec } from "./migrate";
import { SCHEMA_VERSION } from "./schema";

/**
 * The forward-migration ladder. These tests exist because the schemas are `.strict()`:
 * the moment an option is REMOVED, every persisted spec still carrying it stops
 * parsing — a saved dashboard becomes an error screen. A migration is the only thing
 * standing between a schema cleanup and that outcome, so each removal below is pinned
 * from BOTH directions: the old spec still loads, and the dead key is gone afterwards.
 *
 * The other invariant worth pinning is the CHAIN. `loadSpec` walks one step at a time,
 * so a v1 spec has to survive v1→v2 AND v2→v3; a migration that only ever sees
 * hand-written v2 fixtures can pass its own tests and still strand the oldest specs.
 */

/** A v-anything chart spec wrapper — `chart` is the part under test. */
function chartSpec(version: number, chart: Record<string, unknown>): Record<string, unknown> {
  return {
    schemaVersion: version,
    kind: "chart",
    id: "spec-1",
    query: { measures: ["Trips.count"] },
    chart,
  };
}

/** The minimum a cartesian chart needs to satisfy `ChartOptionsSchema`. */
function mapping(meta?: Record<string, unknown>): Record<string, unknown> {
  return {
    category: { member: "Trips.startedAt" },
    series: { mode: "measures", members: ["Trips.count"], ...(meta ? { meta } : {}) },
  };
}

/** Parse and hand back the chart-options object (the migrations' actual target). */
function loadChart(raw: Record<string, unknown>): Record<string, unknown> {
  const spec = loadSpec(raw);
  if (spec.kind !== "chart") throw new Error("expected a chart spec");
  return spec.chart as unknown as Record<string, unknown>;
}

describe("v2 → v3 — options that parsed but never rendered", () => {
  it("drops per-series meta.format and keeps the rest of that series' meta", () => {
    const chart = loadChart(
      chartSpec(2, {
        family: "line",
        mapping: mapping({
          "Trips.count": { label: "Trips", colorToken: "chart-2", format: { kind: "currency" } },
        }),
      }),
    );

    const seriesMeta = (chart.mapping as { series: { meta: Record<string, unknown> } }).series.meta;
    expect(seriesMeta["Trips.count"]).toEqual({ label: "Trips", colorToken: "chart-2" });
  });

  it("removes a series' meta entry entirely when format was all it carried", () => {
    const chart = loadChart(
      chartSpec(2, {
        family: "line",
        mapping: mapping({ "Trips.count": { format: { kind: "percent" } } }),
      }),
    );

    // `meta: {}` would be legal but is noise — the whole key goes.
    expect((chart.mapping as { series: Record<string, unknown> }).series.meta).toBeUndefined();
  });

  it.each(["left", "right"] as const)(
    "rewrites legend.position %s to bottom — where it was already drawing",
    (position) => {
      const chart = loadChart(
        chartSpec(2, { family: "bar", mapping: mapping(), legend: { show: true, position } }),
      );

      expect(chart.legend).toEqual({ show: true, position: "bottom" });
    },
  );

  it("leaves an explicit top legend alone", () => {
    const chart = loadChart(
      chartSpec(2, { family: "bar", mapping: mapping(), legend: { position: "top" } }),
    );

    expect(chart.legend).toEqual({ position: "top" });
  });

  it("keeps a fully numeric axis domain", () => {
    const chart = loadChart(
      chartSpec(2, { family: "line", mapping: mapping(), axes: { y: { domain: [0, 100] } } }),
    );

    expect(chart.axes).toEqual({ y: { domain: [0, 100] } });
  });

  it("drops a half-auto domain but keeps the axis' other options", () => {
    const chart = loadChart(
      chartSpec(2, {
        family: "line",
        mapping: mapping(),
        axes: { y: { label: "Trips", domain: [0, "auto"] } },
      }),
    );

    expect(chart.axes).toEqual({ y: { label: "Trips" } });
  });

  it("drops the axis, then the axes object, when the domain was all there was", () => {
    const chart = loadChart(
      chartSpec(2, {
        family: "line",
        mapping: mapping(),
        axes: { y: { domain: ["auto", "auto"] } },
      }),
    );

    expect(chart.axes).toBeUndefined();
  });

  it("drops scatter.shape and keeps the rest of familyOptions", () => {
    const chart = loadChart(
      chartSpec(2, {
        family: "scatter",
        familyOptions: {
          x: "Trips.distance",
          y: "Trips.duration",
          shape: "triangle",
          sizeRange: [40, 400],
        },
      }),
    );

    // `sizeRange` goes too — but at the NEXT step (v3 → v4, mark geometry), which is
    // why this asserts the end state of the whole ladder rather than v3's alone.
    expect(chart.familyOptions).toEqual({ x: "Trips.distance", y: "Trips.duration" });
  });

  it("drops kpi.icon", () => {
    const chart = loadChart(
      chartSpec(2, {
        family: "kpi",
        familyOptions: { measure: "Trips.count", display: "number", icon: "truck" },
      }),
    );

    expect(chart.familyOptions).toEqual({ measure: "Trips.count", display: "number" });
  });

  it("does not touch a `shape` key on a family that is not scatter", () => {
    // `familyOptions` is a per-family bag: only scatter's `shape` is the dead one, and a
    // host family (aa-app ships `map`) may legitimately use the same key name.
    const chart = loadChart(
      chartSpec(2, { family: "map", familyOptions: { shape: "hex", lat: "Trips.lat" } }),
    );

    expect(chart.familyOptions).toEqual({ shape: "hex", lat: "Trips.lat" });
  });
});

describe("v3 → v4 — mark geometry moved to the host theme", () => {
  it("strips every bar geometry key and keeps the meaning-bearing ones", () => {
    const chart = loadChart(
      chartSpec(3, {
        family: "bar",
        mapping: mapping(),
        familyOptions: {
          barRadius: 12,
          barGap: 0.3,
          barCategoryGap: "40%",
          maxBarSize: 120,
          showValueLabels: true,
          comparePrevious: true,
        },
      }),
    );

    expect(chart.familyOptions).toEqual({ showValueLabels: true, comparePrevious: true });
  });

  it.each([
    ["line", { strokeWidth: 6, curve: "step" }, { curve: "step" }],
    ["area", { fillOpacity: 0.9, strokeWidth: 4, dots: true }, { dots: true }],
    ["scatter", { x: "a", y: "b", sizeRange: [1, 2] }, { x: "a", y: "b" }],
  ] as const)("strips %s geometry", (family, familyOptions, expected) => {
    const chart = loadChart(chartSpec(3, { family, mapping: mapping(), familyOptions }));

    expect(chart.familyOptions).toEqual(expected);
  });

  it("strips pie paint but KEEPS innerRadiusPct — the donut switch is not geometry", () => {
    // innerRadiusPct decides whether the chart is a pie or a donut, which is a question
    // about the chart. padAngle/cornerRadius/outerRadiusPct only decide how it is painted.
    const chart = loadChart(
      chartSpec(3, {
        family: "pie",
        mapping: mapping(),
        familyOptions: {
          innerRadiusPct: 55,
          outerRadiusPct: 92,
          padAngle: 3,
          cornerRadius: 6,
          showLabels: "percent",
        },
      }),
    );

    expect(chart.familyOptions).toEqual({ innerRadiusPct: 55, showLabels: "percent" });
  });

  it.each([
    ["table", { pageSize: 50, sortable: false, stickyHeader: false, rowHeight: "compact", showRowNumbers: true }, { pageSize: 50 }],
    ["heatmap", { colorToken: "chart-3", showValues: true }, { colorToken: "chart-3" }],
  ] as const)("drops the %s switches that became fixed behavior", (family, familyOptions, expected) => {
    const chart = loadChart(chartSpec(3, { family, mapping: mapping(), familyOptions }));

    expect(chart.familyOptions).toEqual(expected);
  });

  it("turns a hidden axis title into an empty one", () => {
    const chart = loadChart(
      chartSpec(3, { family: "line", mapping: mapping(), axes: { y: { labelHide: true } } }),
    );

    // "" is how "no title" is said now — the flag is gone, the field carries the state.
    expect(chart.axes).toEqual({ y: { label: "" } });
  });

  it("a hidden title beats the override text it was hiding", () => {
    const chart = loadChart(
      chartSpec(3, {
        family: "line",
        mapping: mapping(),
        axes: { x: { label: "Week", labelHide: true }, y: { label: "Trips" } },
      }),
    );

    // The x title was invisible, so it stays invisible; y is untouched.
    expect(chart.axes).toEqual({ x: { label: "" }, y: { label: "Trips" } });
  });

  it("leaves a host family's familyOptions completely alone", () => {
    // The moved keys are per-BUILTIN-family. A host family (aa-app ships `map`) owns its
    // own option bag and may legitimately use a name like `strokeWidth`.
    const chart = loadChart(
      chartSpec(3, { family: "map", familyOptions: { strokeWidth: 3, lat: "Trips.lat" } }),
    );

    expect(chart.familyOptions).toEqual({ strokeWidth: 3, lat: "Trips.lat" });
  });
});

describe("v4 → v5 — line shape moved from the series to the chart", () => {
  it("promotes a per-series curve to the family option", () => {
    const chart = loadChart(
      chartSpec(4, {
        family: "area",
        mapping: mapping({ "Trips.count": { label: "Trips", curve: "step" } }),
      }),
    );

    // The shape survives — it just says it about the chart now, which is the only
    // level a stacked area could ever have honored it at.
    expect(chart.familyOptions).toEqual({ curve: "step" });
    const seriesMeta = (chart.mapping as { series: { meta: Record<string, unknown> } }).series.meta;
    expect(seriesMeta["Trips.count"]).toEqual({ label: "Trips" });
  });

  it("removes a series' meta entry entirely when the curve was all it carried", () => {
    const chart = loadChart(
      chartSpec(4, {
        family: "line",
        mapping: mapping({ "Trips.count": { curve: "linear" } }),
      }),
    );

    expect((chart.mapping as { series: Record<string, unknown> }).series.meta).toBeUndefined();
    expect(chart.familyOptions).toEqual({ curve: "linear" });
  });

  it("takes the FIRST series' curve when several disagree", () => {
    const chart = loadChart(
      chartSpec(4, {
        family: "line",
        mapping: {
          category: { member: "Trips.startedAt" },
          series: {
            mode: "measures",
            members: ["Trips.count", "Trips.distance"],
            meta: {
              "Trips.count": { curve: "step" },
              "Trips.distance": { curve: "natural" },
            },
          },
        },
      }),
    );

    expect(chart.familyOptions).toEqual({ curve: "step" });
  });

  it("does not overwrite a curve the chart already declared", () => {
    const chart = loadChart(
      chartSpec(4, {
        family: "line",
        familyOptions: { curve: "linear" },
        mapping: mapping({ "Trips.count": { curve: "step" } }),
      }),
    );

    expect(chart.familyOptions).toEqual({ curve: "linear" });
  });

  it("drops the curve rather than inventing an option a family has no schema for", () => {
    // A bar chart has no `curve`; promoting one would fail the strict parse that
    // follows, turning a repair into the very breakage it exists to prevent.
    const chart = loadChart(
      chartSpec(4, {
        family: "bar",
        mapping: mapping({ "Trips.count": { label: "Trips", curve: "step" } }),
      }),
    );

    expect(chart.familyOptions).toBeUndefined();
    const seriesMeta = (chart.mapping as { series: { meta: Record<string, unknown> } }).series.meta;
    expect(seriesMeta["Trips.count"]).toEqual({ label: "Trips" });
  });

  it("leaves per-series points alone — those DO apply per series", () => {
    const chart = loadChart(
      chartSpec(4, {
        family: "line",
        mapping: mapping({ "Trips.count": { curve: "step", dots: true } }),
      }),
    );

    const seriesMeta = (chart.mapping as { series: { meta: Record<string, unknown> } }).series.meta;
    expect(seriesMeta["Trips.count"]).toEqual({ dots: true });
  });
});

describe("the ladder", () => {
  it("carries a v1 spec through BOTH steps", () => {
    // v1 shape (dual-axis era) that ALSO carries a v3-removed option: the v1→v2 step
    // strips `axes.y2` / `meta.axis`, and v2→v3 must still run on the result.
    const chart = loadChart(
      chartSpec(1, {
        family: "line",
        mapping: mapping({
          "Trips.count": { axis: "right", label: "Trips", format: { kind: "percent" } },
        }),
        legend: { position: "right" },
        axes: { y: { label: "Trips" }, y2: { label: "Cost" } },
      }),
    );

    expect(chart).toEqual({
      family: "line",
      mapping: {
        category: { member: "Trips.startedAt" },
        series: { mode: "measures", members: ["Trips.count"], meta: { "Trips.count": { label: "Trips" } } },
      },
      legend: { position: "bottom" },
      axes: { y: { label: "Trips" } },
    });
  });

  it("stamps the current version onto a migrated spec", () => {
    const spec = loadSpec(chartSpec(1, { family: "bar", mapping: mapping() }));

    expect(spec.schemaVersion).toBe(SCHEMA_VERSION);
  });

  it("migrates every chart widget of a dashboard, not just the first", () => {
    const spec = loadSpec({
      schemaVersion: 2,
      kind: "dashboard",
      id: "dash-1",
      variables: [],
      layout: [],
      widgets: [
        {
          id: "w1",
          type: "chart",
          query: {},
          chart: { family: "bar", mapping: mapping(), legend: { position: "left" } },
        },
        {
          id: "w2",
          type: "chart",
          query: {},
          chart: { family: "kpi", familyOptions: { measure: "Trips.count", icon: "gauge" } },
        },
      ],
    });

    if (spec.kind !== "dashboard") throw new Error("expected a dashboard spec");
    const [w1, w2] = spec.widgets as unknown as { chart: Record<string, unknown> }[];
    expect(w1.chart.legend).toEqual({ position: "bottom" });
    expect(w2.chart.familyOptions).toEqual({ measure: "Trips.count" });
  });

  it("refuses a spec from a FUTURE version instead of guessing", () => {
    const result = safeLoadSpec(chartSpec(SCHEMA_VERSION + 1, { family: "bar", mapping: mapping() }));

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/newer than supported/);
  });

  it("never mutates the caller's JSON", () => {
    const raw = chartSpec(2, {
      family: "kpi",
      familyOptions: { measure: "Trips.count", icon: "truck" },
    });
    const before = structuredClone(raw);

    loadSpec(raw);

    expect(raw).toEqual(before);
  });
});
