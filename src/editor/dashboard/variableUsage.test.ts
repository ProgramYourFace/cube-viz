import { describe, expect, it } from "vitest";

import { SCHEMA_VERSION, type DashboardSpec } from "@/spec";

import {
  removeVariable,
  renameVariable,
  usageSummary,
  variableUsages,
} from "./variableUsage";

/**
 * A board whose `range` variable is used THREE ways at once — an input widget bound
 * to it, a `{var}` date range in a chart query, and a `{var}` deep inside
 * `chart.familyOptions`. That triple is the whole point: a rename that only fixes the
 * declaration leaves all three dangling, which is the bug these functions exist to
 * prevent.
 */
function board(): DashboardSpec {
  return {
    schemaVersion: SCHEMA_VERSION,
    kind: "dashboard",
    id: "d1",
    variables: [
      { name: "range", type: "dateRange", default: "last 30 days" },
      { name: "bucket", type: "granularity" },
      { name: "unused", type: "string" },
    ],
    widgets: [
      {
        id: "w1",
        type: "chart",
        query: {
          measures: ["trips.total"],
          timeDimensions: [
            { dimension: "trips.start", dateRange: { var: "range" }, granularity: "day" },
          ],
          filters: [{ member: "trips.region", operator: "equals", values: [{ var: "range" }] }],
        },
        chart: { family: "kpi", familyOptions: { sparkline: { granularity: { var: "bucket" } } } },
      },
      { id: "w2", type: "input", control: { variable: "range", control: { kind: "dateRange" } } },
      { id: "w3", type: "text", doc: { type: "doc", content: [{ type: "paragraph" }] } },
    ],
    layout: [
      { i: "w1", x: 0, y: 0, w: 6, h: 6 },
      { i: "w2", x: 6, y: 0, w: 3, h: 2 },
      { i: "w3", x: 0, y: 6, w: 6, h: 3 },
    ],
  } as DashboardSpec;
}

describe("variableUsages", () => {
  it("counts input bindings and {var} refs per variable", () => {
    const usages = variableUsages(board());
    expect(usages.range).toEqual({ inputs: ["w2"], refs: 2 });
    expect(usages.bucket).toEqual({ inputs: [], refs: 1 });
  });

  it("gives a declared-but-unused variable a zeroed entry", () => {
    expect(variableUsages(board()).unused).toEqual({ inputs: [], refs: 0 });
  });

  it("surfaces a ref to a variable that was never declared", () => {
    const spec = board();
    spec.variables = [];
    expect(variableUsages(spec).range.refs).toBe(2);
  });

  it("summarizes usage in one line", () => {
    expect(usageSummary({ inputs: ["w2"], refs: 2 })).toBe("1 input · 2 queries");
    expect(usageSummary({ inputs: [], refs: 1 })).toBe("1 query");
    expect(usageSummary({ inputs: [], refs: 0 })).toBe("Unused");
    expect(usageSummary(undefined)).toBe("Unused");
  });
});

describe("renameVariable", () => {
  it("rewrites the declaration, every {var} ref and every input binding", () => {
    const next = renameVariable(board(), "range", "period");
    expect(next.variables.map((v) => v.name)).toEqual(["period", "bucket", "unused"]);

    const usages = variableUsages(next);
    expect(usages.period).toEqual({ inputs: ["w2"], refs: 2 });
    expect(usages.range).toBeUndefined();

    const chart = next.widgets[0] as Extract<DashboardSpec["widgets"][number], { type: "chart" }>;
    expect(chart.query.timeDimensions?.[0].dateRange).toEqual({ var: "period" });
    const input = next.widgets[1] as Extract<DashboardSpec["widgets"][number], { type: "input" }>;
    expect(input.control.variable).toBe("period");
  });

  it("leaves other variables' refs alone", () => {
    const next = renameVariable(board(), "range", "period");
    expect(variableUsages(next).bucket).toEqual({ inputs: [], refs: 1 });
  });

  it("refuses a duplicate, empty or no-op name (never merges two variables)", () => {
    const spec = board();
    expect(renameVariable(spec, "range", "bucket")).toBe(spec);
    expect(renameVariable(spec, "range", "")).toBe(spec);
    expect(renameVariable(spec, "range", "range")).toBe(spec);
    expect(renameVariable(spec, "nope", "other")).toBe(spec);
  });

  it("does not mutate the input spec", () => {
    const spec = board();
    const snapshot = JSON.stringify(spec);
    renameVariable(spec, "range", "period");
    expect(JSON.stringify(spec)).toBe(snapshot);
  });
});

describe("removeVariable", () => {
  it("drops the declaration, unbinds inputs and inlines the default for refs", () => {
    const next = removeVariable(board(), "range");
    expect(next.variables.map((v) => v.name)).toEqual(["bucket", "unused"]);

    const chart = next.widgets[0] as Extract<DashboardSpec["widgets"][number], { type: "chart" }>;
    expect(chart.query.timeDimensions?.[0].dateRange).toBe("last 30 days");
    expect(chart.query.filters?.[0]).toMatchObject({ values: ["last 30 days"] });

    const input = next.widgets[1] as Extract<DashboardSpec["widgets"][number], { type: "input" }>;
    expect(input.control.variable).toBe("");
  });

  it("removes the ref outright when the variable had no default", () => {
    const next = removeVariable(board(), "bucket");
    const chart = next.widgets[0] as Extract<DashboardSpec["widgets"][number], { type: "chart" }>;
    const options = chart.chart.familyOptions as { sparkline: Record<string, unknown> };
    expect(options.sparkline).toEqual({});
  });

  it("leaves a spec with no such variable structurally intact", () => {
    const next = removeVariable(board(), "nope");
    expect(next.variables).toHaveLength(3);
    expect(next.widgets[0]).toEqual(board().widgets[0]);
  });
});
