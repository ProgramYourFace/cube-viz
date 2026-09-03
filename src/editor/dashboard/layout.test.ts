import { describe, expect, it } from "vitest";

import { SCHEMA_VERSION, type DashboardSpec } from "@/spec";

import { newWidget } from "./factories";
import {
  columnBoundaries,
  columnBoundaryLeft,
  editorGridMetrics,
  insertWidgetAtColumn,
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

/** A board carrying an arbitrary layout (widgets are irrelevant to the placement math). */
function boardWith(layout: DashboardSpec["layout"]): DashboardSpec {
  return { ...board(), widgets: [], layout } as DashboardSpec;
}

describe("columnBoundaries", () => {
  it("offers each row band's right edge when the row has free columns", () => {
    // Both bands stop at column 6 of 12, so both offer a free-edge insert.
    expect(columnBoundaries(board().layout)).toEqual([
      { rowY: 0, rowBottom: 6, x: 6, free: true },
      { rowY: 6, rowBottom: 9, x: 6, free: true },
    ]);
  });

  it("offers the gap between two adjacent widgets, and never the canvas edge", () => {
    expect(
      columnBoundaries([
        { i: "a", x: 0, y: 0, w: 6, h: 4 },
        { i: "b", x: 6, y: 0, w: 6, h: 4 },
      ]),
    ).toEqual([{ rowY: 0, rowBottom: 4, x: 6, free: false }]); // 12 is the canvas edge
  });

  it("drops an edge a wider band-mate straddles", () => {
    expect(
      columnBoundaries([
        { i: "wide", x: 0, y: 0, w: 8, h: 6 },
        { i: "top", x: 8, y: 0, w: 2, h: 3 },
        { i: "bottom", x: 8, y: 3, w: 4, h: 3 },
      ]),
      // `top`'s right edge (10) is inside `bottom` (8→12), so only 8 survives.
    ).toEqual([{ rowY: 0, rowBottom: 6, x: 8, free: false }]);
  });
});

describe("insertWidgetAtColumn", () => {
  it("shifts the row-mates right when the row still fits", () => {
    const spec = boardWith([
      { i: "a", x: 0, y: 0, w: 3, h: 4 },
      { i: "b", x: 3, y: 0, w: 3, h: 4 },
    ]);
    const next = insertWidgetAtColumn(spec, newWidget("input", "c"), 0, 3);
    const byId = new Map(next.layout.map((it) => [it.i, it]));
    expect(byId.get("c")).toMatchObject({ x: 3, y: 0, w: 3, h: 2 });
    expect(byId.get("a")).toMatchObject({ x: 0, w: 3 });
    expect(byId.get("b")).toMatchObject({ x: 6, y: 0, w: 3 });
  });

  it("squeezes the row-mates when shifting would overflow the grid", () => {
    const spec = boardWith([
      { i: "a", x: 0, y: 0, w: 6, h: 4 },
      { i: "b", x: 6, y: 0, w: 6, h: 4, minW: 2 },
    ]);
    const next = insertWidgetAtColumn(spec, newWidget("input", "c"), 0, 6);
    const byId = new Map(next.layout.map((it) => [it.i, it]));
    expect(byId.get("c")).toMatchObject({ x: 6, y: 0, w: 3 });
    expect(byId.get("b")).toMatchObject({ x: 9, y: 0, w: 3 }); // squeezed, still >= minW
    expect(byId.get("b")!.x + byId.get("b")!.w).toBeLessThanOrEqual(12);
  });

  it("pushes down rather than squeezing a row-mate into an unreadable sliver", () => {
    // `b` declares no minW; the squeeze floor (2 cols) makes the row infeasible, so it
    // drops below instead of surviving as a 1-column strip.
    const spec = boardWith([
      { i: "a", x: 0, y: 0, w: 8, h: 6 },
      { i: "b", x: 8, y: 0, w: 4, h: 3 },
    ]);
    const next = insertWidgetAtColumn(spec, newWidget("input", "c"), 0, 8);
    const byId = new Map(next.layout.map((it) => [it.i, it]));
    expect(byId.get("c")).toMatchObject({ x: 8, y: 0, w: 3 });
    expect(byId.get("b")).toMatchObject({ x: 8, y: 2, w: 4 });
  });

  it("pushes the row-mates down when even a squeezed row cannot fit", () => {
    const spec = boardWith([
      { i: "a", x: 0, y: 0, w: 6, h: 6 },
      { i: "b", x: 6, y: 0, w: 6, h: 6 },
    ]);
    const next = insertWidgetAtColumn(spec, newWidget("chart", "c"), 0, 6);
    const byId = new Map(next.layout.map((it) => [it.i, it]));
    expect(byId.get("c")).toMatchObject({ x: 6, y: 0, w: 6, h: 6 });
    expect(byId.get("a")).toMatchObject({ x: 0, y: 0 }); // left of the line: untouched
    expect(byId.get("b")).toMatchObject({ x: 6, y: 6, w: 6 }); // dropped below
  });

  it("fills a row's free right edge without moving anyone", () => {
    const spec = boardWith([{ i: "a", x: 0, y: 0, w: 6, h: 4 }]);
    const next = insertWidgetAtColumn(spec, newWidget("chart", "c"), 0, 6);
    expect(next.layout.find((it) => it.i === "a")).toMatchObject({ x: 0, y: 0, w: 6 });
    expect(next.layout.find((it) => it.i === "c")).toMatchObject({ x: 6, y: 0, w: 6, h: 6 });
  });

  it("caps a free-edge insert at the columns that are actually left", () => {
    const spec = boardWith([{ i: "a", x: 0, y: 0, w: 10, h: 4 }]);
    const item = insertWidgetAtColumn(spec, newWidget("chart", "c"), 0, 10).layout.find(
      (it) => it.i === "c",
    );
    expect(item).toMatchObject({ x: 10, w: 2, minW: 2 });
  });

  it("leaves widgets in OTHER row bands alone", () => {
    const spec = boardWith([
      { i: "a", x: 0, y: 0, w: 6, h: 4 },
      { i: "b", x: 6, y: 0, w: 6, h: 4 },
      { i: "below", x: 0, y: 4, w: 12, h: 3 },
    ]);
    const next = insertWidgetAtColumn(spec, newWidget("input", "c"), 0, 6);
    expect(next.layout.find((it) => it.i === "below")).toMatchObject({ x: 0, y: 4, w: 12 });
  });

  it("does not mutate the input spec", () => {
    const spec = boardWith([
      { i: "a", x: 0, y: 0, w: 6, h: 4 },
      { i: "b", x: 6, y: 0, w: 6, h: 4 },
    ]);
    const snapshot = JSON.stringify(spec);
    insertWidgetAtColumn(spec, newWidget("chart", "c"), 0, 6);
    expect(JSON.stringify(spec)).toBe(snapshot);
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

  it("puts a column line in the middle of the gap left of its column", () => {
    const m = editorGridMetrics(undefined, 900);
    // 12 cols, 11 gaps of 12px → colWidth 64; left(6) = 6*(64+12) - 6.
    expect(columnBoundaryLeft(6, m, 900)).toBe(450);
    expect(columnBoundaryLeft(0, m, 900)).toBe(0); // clamped to the grid's left edge
  });
});
