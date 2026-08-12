import { describe, expect, it } from "vitest";

import { rowKeyFor } from "./tanstack";

/**
 * A bucketed time dimension is SELECTED as `trips.start_time` but comes back from
 * `tablePivot()` keyed `trips.start_time.day`. Indexing rows by the bare member
 * missed, so date columns rendered as em-dashes (and sorted as no-data).
 */
describe("rowKeyFor", () => {
  it("returns the member when the row carries it verbatim", () => {
    expect(rowKeyFor([{ "trips.count": 3 }], "trips.count")).toBe("trips.count");
  });

  it("resolves a bucketed time dimension to its granularity-suffixed key", () => {
    const rows = [{ "trips.start_time.day": "2026-07-15T00:00:00.000", "trips.count": 3 }];
    expect(rowKeyFor(rows, "trips.start_time")).toBe("trips.start_time.day");
  });

  it("prefers an exact match over a prefixed one", () => {
    const rows = [{ "t.at": "raw", "t.at.day": "bucketed" }];
    expect(rowKeyFor(rows, "t.at")).toBe("t.at");
  });

  it("falls back to the member when nothing matches, so absent columns stay empty", () => {
    expect(rowKeyFor([{ "trips.count": 1 }], "trips.missing")).toBe("trips.missing");
  });

  it("falls back on empty rows rather than throwing", () => {
    expect(rowKeyFor([], "trips.start_time")).toBe("trips.start_time");
  });

  it("does not confuse a sibling member sharing a prefix stem", () => {
    // `trips.start` must not match `trips.start_time.day`: the prefix is `trips.start.`
    const rows = [{ "trips.start_time.day": "x" }];
    expect(rowKeyFor(rows, "trips.start")).toBe("trips.start");
  });
});
