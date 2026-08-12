import { describe, expect, it } from "vitest";

import { dateRangeVarByWidget, filterVarByMember } from "./drill";
import type { WidgetSpec } from "@/spec";

/** A chart widget carrying just the query bits the drill mappers read. */
const chart = (id: string, query: unknown): WidgetSpec =>
  ({ id, type: "chart", chart: { family: "line" }, query }) as unknown as WidgetSpec;

describe("dateRangeVarByWidget", () => {
  it("maps a widget whose dateRange is variable-bound", () => {
    const widgets = [
      chart("w1", { timeDimensions: [{ dimension: "t.ts", dateRange: { var: "range" } }] }),
    ];
    expect(dateRangeVarByWidget(widgets).get("w1")).toBe("range");
  });

  it("ignores a literal dateRange and a widget with no time dimension", () => {
    const widgets = [
      chart("lit", { timeDimensions: [{ dimension: "t.ts", dateRange: "last 7 days" }] }),
      chart("none", { measures: ["t.count"] }),
    ];
    expect(dateRangeVarByWidget(widgets).size).toBe(0);
  });

  it("skips non-chart widgets, which carry no query", () => {
    const widgets = [{ id: "txt", type: "text", text: "hi" } as unknown as WidgetSpec];
    expect(dateRangeVarByWidget(widgets).size).toBe(0);
  });
});

describe("filterVarByMember", () => {
  it("finds a binding on a leaf filter", () => {
    const widgets = [
      chart("w1", {
        filters: [{ member: "t.vehicle", operator: "equals", values: [{ var: "vehicle" }] }],
      }),
    ];
    expect(filterVarByMember(widgets).get("t.vehicle")).toBe("vehicle");
  });

  it("walks nested and/or groups", () => {
    const widgets = [
      chart("w1", {
        filters: [
          {
            and: [
              { member: "t.status", operator: "equals", values: ["done"] },
              { or: [{ member: "t.vehicle", operator: "equals", values: [{ var: "veh" }] }] },
            ],
          },
        ],
      }),
    ];
    expect(filterVarByMember(widgets).get("t.vehicle")).toBe("veh");
  });

  it("keeps the FIRST binding when a member is bound twice across widgets", () => {
    const widgets = [
      chart("a", { filters: [{ member: "t.v", operator: "equals", values: [{ var: "first" }] }] }),
      chart("b", { filters: [{ member: "t.v", operator: "equals", values: [{ var: "second" }] }] }),
    ];
    expect(filterVarByMember(widgets).get("t.v")).toBe("first");
  });

  it("ignores literal-valued filters", () => {
    const widgets = [
      chart("w1", { filters: [{ member: "t.v", operator: "equals", values: ["Truck 1"] }] }),
    ];
    expect(filterVarByMember(widgets).size).toBe(0);
  });
});
