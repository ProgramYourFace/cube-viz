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

    expect(chart.familyOptions).toEqual({
      x: "Trips.distance",
      y: "Trips.duration",
      sizeRange: [40, 400],
    });
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
