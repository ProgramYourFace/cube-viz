import { describe, expect, it } from "vitest";

import {
  buildFamilyRegistry,
  builtinFamilyRegistry,
  defaultChartFamilies,
  type ChartFamilyDescriptor,
} from "@/charts";
import { SCHEMA_VERSION, type ChartFamily, type ChartSpec, type SeriesMapping } from "@/spec";

import { migrateToFamily } from "../helpers";
import { placeField, readWells, removeField, type FieldKind } from "./wells";
import { adaptiveGranularity, channelFitScore, DEFAULT_NEW_TIME_RANGE, unifyChannels, wellAccepts } from "./channels";

/**
 * The channel model (docs/05 §2) — ONE interpreter servicing every builtin family from
 * the `target` + `channel` its wells declare, in place of the six per-family
 * place/remove/read switches this suite replaces. What is asserted here is the
 * CONTRACT the editor and the renderers depend on: a placement round-trips through
 * `readWells`, the mapping envelope lands in exactly the shape the family component
 * reads, and switching chart type preserves the user's fields.
 */

const R = builtinFamilyRegistry;

const AMOUNT = "Orders.amount";
const COUNT = "Orders.count";
const STATUS = "Orders.status";
const CITY = "Orders.city";
const CREATED = "Orders.createdAt";
const SHIPPED = "Orders.shippedAt";

function specOf(family: ChartFamily, patch: Partial<ChartSpec> = {}): ChartSpec {
  return {
    schemaVersion: SCHEMA_VERSION,
    id: "test",
    kind: "chart",
    query: {},
    chart: { family },
    ...patch,
  };
}

/** Apply a script of placements, the way the overlay does (one edit per drop). */
function place(
  spec: ChartSpec,
  drops: [wellId: string, member: string, kind: FieldKind][],
): ChartSpec {
  return drops.reduce(
    (acc, [wellId, member, kind]) => placeField(acc, acc.chart.family, wellId, member, kind, R),
    spec,
  );
}

const wellsOf = (spec: ChartSpec): Record<string, string[]> => readWells(spec, R);
const mappingOf = (spec: ChartSpec): SeriesMapping | undefined => spec.chart.mapping;
const optionsOf = (spec: ChartSpec): Record<string, unknown> =>
  (spec.chart.familyOptions ?? {}) as Record<string, unknown>;

/* ───────────────────────── descriptor declarations ────────────────────────── */

describe("well declarations", () => {
  it("gives every builtin well a target and a channel", () => {
    for (const descriptor of R.list()) {
      for (const well of descriptor.wells) {
        expect(well.target, `${descriptor.family}.${well.id} target`).toBeDefined();
        expect(well.channel, `${descriptor.family}.${well.id} channel`).toBeDefined();
      }
    }
  });

  it("keeps the same channel meaning across families", () => {
    const channelOf = (family: ChartFamily, id: string): string | undefined =>
      R.require(family).wells.find((w) => w.id === id)?.channel;
    expect(channelOf("bar", "x")).toBe("x");
    expect(channelOf("pie", "slices")).toBe("x");
    expect(channelOf("heatmap", "hx")).toBe("x");
    expect(channelOf("bar", "y")).toBe("y");
    expect(channelOf("pie", "size")).toBe("y");
    expect(channelOf("heatmap", "value")).toBe("y");
    expect(channelOf("kpi", "value")).toBe("y");
    // Rows are a POSITION channel, not the paint channel a split uses.
    expect(channelOf("heatmap", "hy")).toBe("row");
    expect(channelOf("bar", "color")).toBe("color");
  });
});

/* ──────────────────────────── read/write round-trips ──────────────────────── */

describe("readWells round-trips place/remove", () => {
  const cases: {
    family: ChartFamily;
    drops: [string, string, FieldKind][];
    expected: Record<string, string[]>;
  }[] = [
    {
      family: "bar",
      drops: [
        ["y", AMOUNT, "number"],
        ["x", STATUS, "category"],
        ["color", CITY, "category"],
      ],
      expected: { y: [AMOUNT], x: [STATUS], color: [CITY] },
    },
    {
      family: "pie",
      drops: [
        ["size", AMOUNT, "number"],
        ["slices", STATUS, "category"],
      ],
      expected: { size: [AMOUNT], slices: [STATUS] },
    },
    {
      family: "heatmap",
      drops: [
        ["value", AMOUNT, "number"],
        ["hy", CITY, "category"],
        ["hx", STATUS, "category"],
      ],
      expected: { value: [AMOUNT], hy: [CITY], hx: [STATUS] },
    },
    {
      family: "scatter",
      drops: [
        ["sx", AMOUNT, "number"],
        ["sy", COUNT, "number"],
        ["color", CITY, "category"],
      ],
      expected: { sx: [AMOUNT], sy: [COUNT], size: [], color: [CITY] },
    },
    {
      family: "kpi",
      drops: [["value", AMOUNT, "number"]],
      expected: { value: [AMOUNT] },
    },
    {
      family: "table",
      drops: [
        ["columns", CITY, "category"],
        ["columns", AMOUNT, "number"],
      ],
      expected: { columns: [CITY, AMOUNT] },
    },
  ];

  for (const { family, drops, expected } of cases) {
    it(`${family}: reads back what was placed, and unbinds on remove`, () => {
      const built = place(specOf(family), drops);
      expect(wellsOf(built)).toEqual(expected);

      // Every placed member is bound somewhere on the query…
      const bound = new Set([
        ...(built.query.measures ?? []),
        ...(built.query.dimensions ?? []),
        ...(built.query.timeDimensions ?? []).map((t) => t.dimension),
      ]);
      for (const member of drops.map((d) => d[1])) expect(bound.has(member)).toBe(true);

      // …and removing everything empties both the wells and the query.
      const emptied = drops.reduce(
        (acc, [wellId, member]) => removeField(acc, family, wellId, member, R),
        built,
      );
      for (const members of Object.values(wellsOf(emptied))) expect(members).toEqual([]);
      expect(emptied.query.measures ?? []).toEqual([]);
      expect(emptied.query.dimensions ?? []).toEqual([]);
      expect(emptied.query.timeDimensions ?? []).toEqual([]);
    });
  }
});

/* ─────────────────────── cartesian measures ⇄ pivot mode ──────────────────── */

describe("cartesian measures ⇄ pivot transitions", () => {
  it("flips to pivot when a split lands on top of measures", () => {
    const measuresMode = place(specOf("bar"), [
      ["y", AMOUNT, "number"],
      ["x", STATUS, "category"],
    ]);
    expect(mappingOf(measuresMode)).toEqual({
      category: { member: STATUS },
      series: { mode: "measures", members: [AMOUNT] },
    });

    const pivoted = place(measuresMode, [["color", CITY, "category"]]);
    expect(mappingOf(pivoted)).toEqual({
      category: { member: STATUS },
      series: { mode: "pivot", value: AMOUNT, pivot: CITY },
    });
    expect(pivoted.query.dimensions).toEqual([STATUS, CITY]);
  });

  it("keeps every measure split by the colour dimension (series = measure × value)", () => {
    const spec = place(specOf("bar"), [
      ["y", AMOUNT, "number"],
      ["x", STATUS, "category"],
      ["color", CITY, "category"],
      ["y", COUNT, "number"],
    ]);
    expect(mappingOf(spec)).toMatchObject({
      series: { mode: "pivot", value: AMOUNT, values: [AMOUNT, COUNT], pivot: CITY },
    });
    expect(wellsOf(spec).y).toEqual([AMOUNT, COUNT]);
  });

  it("drops the pivot (and its dimension) when the last measure leaves", () => {
    const spec = place(specOf("bar"), [
      ["y", AMOUNT, "number"],
      ["x", STATUS, "category"],
      ["color", CITY, "category"],
    ]);
    const bare = removeField(spec, "bar", "y", AMOUNT, R);
    expect(wellsOf(bare)).toEqual({ y: [], x: [STATUS], color: [] });
    expect(mappingOf(bare)).toEqual({
      category: { member: STATUS },
      series: { mode: "measures", members: [] },
    });
    expect(bare.query.dimensions).toEqual([STATUS]);
  });

  it("carries per-measure meta (colorToken) across the mode flip, both ways", () => {
    const withMeta = place(specOf("bar"), [
      ["y", AMOUNT, "number"],
      ["x", STATUS, "category"],
    ]);
    const painted: ChartSpec = {
      ...withMeta,
      chart: {
        ...withMeta.chart,
        mapping: {
          category: { member: STATUS },
          series: { mode: "measures", members: [AMOUNT], meta: { [AMOUNT]: { colorToken: "chart-3" } } },
        },
      },
    };

    const pivoted = place(painted, [["color", CITY, "category"]]);
    expect(mappingOf(pivoted)).toMatchObject({
      series: { mode: "pivot", meta: { [AMOUNT]: { colorToken: "chart-3" } } },
    });

    const back = removeField(pivoted, "bar", "color", CITY, R);
    expect(mappingOf(back)).toEqual({
      category: { member: STATUS },
      series: { mode: "measures", members: [AMOUNT], meta: { [AMOUNT]: { colorToken: "chart-3" } } },
    });
  });

  it("never leaves the category standing in as its own pivot", () => {
    // The category is bound to `query.dimensions` a beat before it reaches
    // `mapping.category`, which the interpreter's pending-split scan can misread.
    const spec = place(specOf("bar"), [
      ["y", AMOUNT, "number"],
      ["x", STATUS, "category"],
    ]);
    expect(mappingOf(spec)?.series.mode).toBe("measures");
    expect(wellsOf(spec).color).toEqual([]);
  });
});

/* ───────────────────────────── heatmap trio ───────────────────────────────── */

describe("heatmap", () => {
  it("stores the trio as the pivot mapping the renderer reads", () => {
    const spec = place(specOf("heatmap"), [
      ["value", AMOUNT, "number"],
      ["hy", CITY, "category"],
      ["hx", STATUS, "category"],
    ]);
    // category = Columns, pivot = Rows, value = the measure.
    expect(mappingOf(spec)).toEqual({
      category: { member: STATUS },
      series: { mode: "pivot", value: AMOUNT, pivot: CITY },
    });
  });

  it("holds a partial trio without inventing a pivot", () => {
    const partial = place(specOf("heatmap"), [
      ["value", AMOUNT, "number"],
      ["hx", STATUS, "category"],
    ]);
    expect(mappingOf(partial)).toEqual({
      category: { member: STATUS },
      series: { mode: "measures", members: [AMOUNT] },
    });
    expect(wellsOf(partial)).toEqual({ value: [AMOUNT], hy: [], hx: [STATUS] });
  });

  it("shows Rows before Columns exists", () => {
    const rowsFirst = place(specOf("heatmap"), [["hy", CITY, "category"]]);
    expect(wellsOf(rowsFirst).hy).toEqual([CITY]);
    expect(mappingOf(rowsFirst)).toBeUndefined();
  });
});

/* ───────────────────────────── time placement ─────────────────────────────── */

describe("time fields", () => {
  it("sets an AUTO time dimension, preserving the bound range", () => {
    const withRange = specOf("bar", {
      query: { timeDimensions: [{ dimension: SHIPPED, dateRange: ["2024-01-01", "2024-02-01"] }] },
    });
    const spec = place(withRange, [
      ["y", AMOUNT, "number"],
      ["x", CREATED, "time"],
    ]);
    // "auto" is stored, not a concrete bucket — the variable resolver substitutes the
    // span-fitting granularity at query time, so a later range change re-fits it.
    expect(spec.query.timeDimensions).toEqual([
      { dimension: CREATED, granularity: "auto", dateRange: ["2024-01-01", "2024-02-01"] },
    ]);
    expect(spec.query.dimensions ?? []).toEqual([]);
    expect(wellsOf(spec).x).toEqual([CREATED]);
  });

  it("gives a FRESH time placement a real window, so the first preview reads", () => {
    const spec = place(specOf("bar"), [["x", CREATED, "time"]]);
    expect(spec.query.timeDimensions).toEqual([
      { dimension: CREATED, granularity: "auto", dateRange: DEFAULT_NEW_TIME_RANGE },
    ]);
  });

  it("keeps a user-chosen granularity and range on an axis swap", () => {
    const withChoice = specOf("bar", {
      query: {
        timeDimensions: [
          { dimension: SHIPPED, granularity: "week", dateRange: ["2024-01-01", "2024-02-01"] },
        ],
      },
    });
    const spec = place(withChoice, [["x", CREATED, "time"]]);
    expect(spec.query.timeDimensions).toEqual([
      { dimension: CREATED, granularity: "week", dateRange: ["2024-01-01", "2024-02-01"] },
    ]);
  });

  it("adaptiveGranularity fits the span (shared rule with the auto resolver)", () => {
    expect(adaptiveGranularity(["2024-01-01", "2024-01-02"])).toBe("hour");
    expect(adaptiveGranularity(["2024-01-01", "2024-03-01"])).toBe("day");
    expect(adaptiveGranularity(["2024-01-01", "2025-01-01"])).toBe("month");
    expect(adaptiveGranularity(["2020-01-01", "2024-01-01"])).toBe("year");
    expect(adaptiveGranularity("last 30 days")).toBe("day");
    expect(adaptiveGranularity(undefined)).toBe("day");
  });

  it("keeps a table's other date columns bound when a second one is added", () => {
    const spec = place(specOf("table"), [
      ["columns", CREATED, "time"],
      ["columns", SHIPPED, "time"],
    ]);
    expect(wellsOf(spec).columns).toEqual([CREATED, SHIPPED]);
    expect((spec.query.timeDimensions ?? []).map((t) => t.dimension).sort()).toEqual(
      [CREATED, SHIPPED].sort(),
    );
  });
});

/* ─────────────────────── a split dropped before a measure ─────────────────── */

describe("a split dropped before any measure", () => {
  it("is HELD (not silently dropped) and becomes a real pivot once a measure lands", () => {
    const held = place(specOf("bar"), [
      ["x", STATUS, "category"],
      ["color", CITY, "category"],
    ]);
    // Nothing to split yet — but the field is visibly placed and bound to the query.
    expect(wellsOf(held).color).toEqual([CITY]);
    expect(held.query.dimensions).toEqual([STATUS, CITY]);
    expect(mappingOf(held)?.series.mode).toBe("measures");

    const live = place(held, [["y", AMOUNT, "number"]]);
    expect(mappingOf(live)).toEqual({
      category: { member: STATUS },
      series: { mode: "pivot", value: AMOUNT, pivot: CITY },
    });
    expect(wellsOf(live)).toEqual({ y: [AMOUNT], x: [STATUS], color: [CITY] });
  });
});

/* ─────────────────────────── shared members ───────────────────────────────── */

describe("a member held by two wells", () => {
  it("stays bound to the query when one of them releases it", () => {
    const spec = place(specOf("scatter"), [
      ["sx", AMOUNT, "number"],
      ["sy", AMOUNT, "number"],
    ]);
    expect(spec.query.measures).toEqual([AMOUNT]);

    const half = removeField(spec, "scatter", "sx", AMOUNT, R);
    expect(wellsOf(half)).toMatchObject({ sx: [], sy: [AMOUNT] });
    expect(half.query.measures).toEqual([AMOUNT]); // still held by the vertical axis

    const none = removeField(half, "scatter", "sy", AMOUNT, R);
    expect(none.query.measures ?? []).toEqual([]);
  });
});

/* ──────────────────────────── type switching ──────────────────────────────── */

describe("migrateToFamily / unifyChannels", () => {
  const bar = place(specOf("bar"), [
    ["y", AMOUNT, "number"],
    ["x", STATUS, "category"],
    ["color", CITY, "category"],
  ]);

  it("bar → line keeps x, y and the split", () => {
    const line = migrateToFamily(bar, "line", R);
    expect(line.chart.family).toBe("line");
    expect(wellsOf(line)).toEqual({ y: [AMOUNT], x: [STATUS], color: [CITY] });
    expect(mappingOf(line)).toEqual({
      category: { member: STATUS },
      series: { mode: "pivot", value: AMOUNT, pivot: CITY },
    });
  });

  it("bar → pie keeps the category and the first measure", () => {
    const twoMeasures = place(bar, [["y", COUNT, "number"]]);
    const pie = migrateToFamily(twoMeasures, "pie", R);
    expect(wellsOf(pie)).toEqual({ slices: [STATUS], size: [AMOUNT] });
    expect(mappingOf(pie)).toEqual({
      category: { member: STATUS },
      series: { mode: "measures", members: [AMOUNT] },
    });
    // The split has no home on a pie — dropped from the wells, left on the query so
    // flipping back restores it.
    expect(pie.query.dimensions).toContain(CITY);
  });

  it("line → heatmap keeps x and y and asks only for Rows", () => {
    const line = migrateToFamily(
      place(specOf("line"), [
        ["y", AMOUNT, "number"],
        ["x", STATUS, "category"],
      ]),
      "heatmap",
      R,
    );
    expect(wellsOf(line)).toEqual({ value: [AMOUNT], hy: [], hx: [STATUS] });
    expect(mappingOf(line)).toEqual({
      category: { member: STATUS },
      series: { mode: "measures", members: [AMOUNT] },
    });
  });

  it("round-trips: bar → pie → bar restores what pie could not show", () => {
    const back = migrateToFamily(migrateToFamily(bar, "pie", R), "bar", R);
    expect(back.chart.family).toBe("bar");
    expect(wellsOf(back)).toEqual({ y: [AMOUNT], x: [STATUS], color: [CITY] });
  });

  it("bar → kpi → bar keeps the measure", () => {
    const kpi = migrateToFamily(bar, "kpi", R);
    expect(optionsOf(kpi)).toEqual({ measure: AMOUNT });
    expect(wellsOf(kpi)).toEqual({ value: [AMOUNT] });
    const back = migrateToFamily(kpi, "bar", R);
    expect(wellsOf(back).y).toEqual([AMOUNT]);
  });

  it("bar → scatter maps the value channel onto the vertical axis", () => {
    const scatter = migrateToFamily(place(bar, [["y", COUNT, "number"]]), "scatter", R);
    // x/y on a scatter are NUMBERS: the bar's categorical x has no home, the measures do.
    expect(wellsOf(scatter)).toMatchObject({ sy: [AMOUNT], sx: [] });
    expect(optionsOf(scatter)).toMatchObject({ y: AMOUNT, groupBy: CITY });
  });

  it("keeps the display envelope and the query context across a switch", () => {
    const styled: ChartSpec = {
      ...bar,
      query: { ...bar.query, limit: 50, timezone: "UTC" },
      chart: { ...bar.chart, stackMode: "stacked", orientation: "horizontal" },
    };
    const pie = migrateToFamily(styled, "pie", R);
    expect(pie.chart.stackMode).toBe("stacked");
    expect(pie.chart.orientation).toBe("horizontal");
    expect(pie.query.limit).toBe(50);
    expect(pie.query.timezone).toBe("UTC");
    // familyOptions never leak across families.
    expect(pie.chart.familyOptions?.groupBy).toBeUndefined();
  });

  it("unifyChannels alone is family-agnostic (no registry, no family swap)", () => {
    const unified = unifyChannels(bar, R.require("bar").wells, R.require("pie").wells);
    expect(unified.chart.family).toBe("bar"); // it moves FIELDS, not the discriminator
    expect(unified.chart.mapping).toEqual({
      category: { member: STATUS },
      series: { mode: "measures", members: [AMOUNT] },
    });
  });
});

/* ──────────────────────────── host families ───────────────────────────────── */

describe("host families (no channel wells)", () => {
  // A host family is self-contained: its wells declare NO target, so the descriptor's
  // own hooks own them. It may still declare a target on the wells the interpreter can
  // service — its `readWells` then wins only for the wells it returns.
  const host: ChartFamilyDescriptor = {
    ...R.require("bar"),
    family: "geo",
    label: "Map",
    wells: [
      { id: "place", label: "Location", cardinality: "one", kinds: ["category"] },
      { id: "metric", label: "Metric", cardinality: "one", kinds: ["number"] },
      // Serviced by the interpreter, not the hook.
      { id: "time", label: "Path order", cardinality: "one", kinds: ["time"], target: { kind: "category" }, channel: "x" },
    ],
    zones: { left: ["metric"], bottom: ["place", "time"] },
    readWells: (spec) => ({
      place: spec.query.dimensions ?? [],
      metric: spec.query.measures ?? [],
    }),
    placeField: (spec, wellId, member) => ({
      ...spec,
      query:
        wellId === "metric"
          ? { ...spec.query, measures: [member] }
          : { ...spec.query, dimensions: [member] },
    }),
    removeField: (spec) => spec,
  };
  const HR = buildFamilyRegistry(defaultChartFamilies, [host]);

  const built = placeField(
    placeField(specOf("geo"), "geo", "metric", AMOUNT, "number", HR),
    "geo",
    "place",
    CITY,
    "category",
    HR,
  );

  it("dispatches to the descriptor hooks, merging the interpreter's wells underneath", () => {
    expect(readWells(built, HR)).toEqual({ place: [CITY], metric: [AMOUNT], time: [] });
  });

  it("host → builtin re-derives the destination from the query", () => {
    const bar = migrateToFamily(built, "bar", HR);
    expect(bar.chart.family).toBe("bar");
    expect(readWells(bar, HR)).toEqual({ y: [AMOUNT], x: [CITY], color: [] });
    expect(bar.chart.mapping).toEqual({
      category: { member: CITY },
      series: { mode: "measures", members: [AMOUNT] },
    });
  });

  it("builtin → host carries the mapping envelope across", () => {
    const bar = place(specOf("bar"), [
      ["y", AMOUNT, "number"],
      ["x", CITY, "category"],
    ]);
    const geo = migrateToFamily(bar, "geo", HR);
    expect(geo.chart.family).toBe("geo");
    expect(geo.chart.mapping).toEqual({
      category: { member: CITY },
      series: { mode: "measures", members: [AMOUNT] },
    });
    expect(readWells(geo, HR)).toMatchObject({ place: [CITY], metric: [AMOUNT] });
  });
});

/* ─────────────────────────────── fit ranking ──────────────────────────────── */

describe("channelFitScore", () => {
  it("ranks the families that can show the user's fields highest", () => {
    const fields: FieldKind[] = ["number", "category"];
    const score = (family: ChartFamily): number =>
      channelFitScore(R.require(family).wells, fields);
    // A measure + a category is exactly a bar/pie; a scatter wants a second number.
    expect(score("bar")).toBeGreaterThan(score("scatter"));
    expect(score("pie")).toBeGreaterThan(score("scatter"));
  });

  it("gates drops by kind", () => {
    const y = R.require("bar").wells.find((w) => w.id === "y")!;
    expect(wellAccepts(y, "number")).toBe(true);
    expect(wellAccepts(y, "category")).toBe(false);
  });
});
