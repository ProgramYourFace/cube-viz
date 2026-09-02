import { describe, expect, it } from "vitest";

import { SCHEMA_VERSION, type DashboardSpec } from "@/spec";

import { newWidget } from "./factories";
import {
  editorGridMetrics,
  insertWidgetAtRow,
  rowBoundaries,
  rowBoundaryTop,
} from "./layout";

/** Two stacked rows: a chart on rows 0–5 and a text block on rows 6–8. */
function board(): DashboardSpec {
  return {
    schemaVersion: SCHEMA_VERSION,
    kind: "dashboard",
    id: "d1",
    variables: [],
    widgets: [
      {
        id: "a",
        type: "chart",
        query: {},
        chart: { family: "bar" },
      },
      { id: "b", type: "text", doc: { type: "doc", content: [{ type: "paragraph" }] } },
    ],
    layout: [
      { i: "a", x: 0, y: 0, w: 6, h: 6 },
      { i: "b", x: 0, y: 6, w: 6, h: 3 },
    ],
  } as DashboardSpec;
}

describe("insertWidgetAtRow", () => {
  it("places the newcomer at the row and pushes everything below it down", () => {
    const next = insertWidgetAtRow(board(), newWidget("chart", "c"), 6);
    const byId = new Map(next.layout.map((it) => [it.i, it]));
    expect(byId.get("a")).toMatchObject({ y: 0, h: 6 }); // above the line: untouched
    expect(byId.get("c")).toMatchObject({ x: 0, y: 6, w: 6, h: 6 });
    expect(byId.get("b")).toMatchObject({ y: 12 }); // 6 + the chart's height
    expect(next.widgets.map((w) => w.id)).toEqual(["a", "b", "c"]);
  });

  it("inserting at the top pushes the whole board down", () => {
    const next = insertWidgetAtRow(board(), newWidget("input", "c"), 0);
    const byId = new Map(next.layout.map((it) => [it.i, it]));
    expect(byId.get("c")).toMatchObject({ x: 0, y: 0, w: 3, h: 2 });
    expect(byId.get("a")).toMatchObject({ y: 2 });
    expect(byId.get("b")).toMatchObject({ y: 8 });
  });

  it("inserting past the last row is a plain append (nothing shifts)", () => {
    const next = insertWidgetAtRow(board(), newWidget("text", "c"), 9);
    const byId = new Map(next.layout.map((it) => [it.i, it]));
    expect(byId.get("a")).toMatchObject({ y: 0 });
    expect(byId.get("b")).toMatchObject({ y: 6 });
    expect(byId.get("c")).toMatchObject({ y: 9 });
  });

  it("caps the footprint width at the grid's column count", () => {
    const spec = { ...board(), grid: { cols: 4 } } as DashboardSpec;
    const item = insertWidgetAtRow(spec, newWidget("chart", "c"), 0).layout.find(
      (it) => it.i === "c",
    );
    expect(item).toMatchObject({ w: 4, minW: 3 });
  });

  it("does not mutate the input spec", () => {
    const spec = board();
    const snapshot = JSON.stringify(spec);
    insertWidgetAtRow(spec, newWidget("chart", "c"), 0);
    expect(JSON.stringify(spec)).toBe(snapshot);
  });
});

describe("rowBoundaries", () => {
  it("is the top plus every distinct item bottom, ascending", () => {
    expect(rowBoundaries(board().layout)).toEqual([0, 6, 9]);
  });

  it("de-duplicates side-by-side widgets sharing a bottom edge", () => {
    expect(
      rowBoundaries([
        { i: "a", x: 0, y: 0, w: 6, h: 4 },
        { i: "b", x: 6, y: 0, w: 6, h: 4 },
      ]),
    ).toEqual([0, 4]);
  });

  it("drops a boundary a taller neighbour straddles (an insert there would not land)", () => {
    expect(
      rowBoundaries([
        { i: "tall", x: 0, y: 0, w: 8, h: 6 },
        { i: "short", x: 8, y: 0, w: 4, h: 3 },
        { i: "under", x: 8, y: 3, w: 4, h: 3 },
      ]),
    ).toEqual([0, 6]); // 3 is inside `tall`, so it is not offered
  });

  it("is just the top for an empty board", () => {
    expect(rowBoundaries([])).toEqual([0]);
  });
});

describe("editorGridMetrics / rowBoundaryTop", () => {
  it("scales the cell metrics down on a narrow canvas and never below the floor", () => {
    expect(editorGridMetrics(undefined, 900).scale).toBe(1);
    expect(editorGridMetrics(undefined, 450).scale).toBeCloseTo(0.5, 5);
    expect(editorGridMetrics(undefined, 100).scale).toBeCloseTo(0.4, 5);
  });

  it("quantizes the scale so width jitter doesn't churn the metrics", () => {
    expect(editorGridMetrics(undefined, 449).scale).toEqual(editorGridMetrics(undefined, 451).scale);
  });

  it("puts a boundary line in the middle of the gap above its row", () => {
    const m = editorGridMetrics(undefined, 900); // rowHeight 40, margin [12,12]
    expect(rowBoundaryTop(0, m)).toBe(0); // clamped: never above the grid
    expect(rowBoundaryTop(6, m)).toBe(6 * 52 - 6);
  });
});
