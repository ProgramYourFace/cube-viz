import { describe, expect, it } from "vitest";

import {
  collapseFamilies,
  fieldBadge,
  grainAggLabel,
  pathLabel,
  type MemberOption,
} from "./meta-helpers";

/**
 * The field-row badge says what a field HOLDS in the user's words. The load-bearing
 * case: DURATION fields (quantity "time") never leak their storage unit ("h", "min",
 * "ms" — an implementation detail; the chart renders durations humanized), while
 * calendar timestamps keep the distinct "date" badge.
 */
describe("fieldBadge", () => {
  it("shows a generic 'time' badge for durations, whatever the storage unit", () => {
    for (const unit of ["h", "min", "ms", "d"]) {
      expect(fieldBadge({ type: "number", unit, quantity: "time" })).toBe("time");
    }
  });

  it("keeps 'date' for calendar time dimensions (not durations)", () => {
    expect(fieldBadge({ type: "time", unit: undefined, quantity: undefined })).toBe("date");
  });

  it("still shows real display units for non-duration numbers", () => {
    expect(fieldBadge({ type: "number", unit: "km", quantity: "distance" })).toBe("km");
    expect(
      fieldBadge({ type: "number", unit: "km", quantity: "distance" }, () => "mi"),
    ).toBe("mi");
  });

  it("shows # for counts and unitless numbers", () => {
    expect(fieldBadge({ type: "number", unit: "count", quantity: "count" })).toBe("#");
    expect(fieldBadge({ type: "number", unit: undefined, quantity: undefined })).toBe("#");
  });

  it("never routes a duration through the display-unit converter", () => {
    expect(
      fieldBadge({ type: "number", unit: "h", quantity: "time" }, () => "SHOULD NOT APPEAR"),
    ).toBe("time");
  });
});

describe("aggregate families", () => {
  const opt = (
    name: string,
    metaBlob: Record<string, unknown> | undefined,
    cube = "trips",
  ): MemberOption => ({
    name,
    label: name.split(".")[1],
    title: name,
    shortTitle: name,
    type: "number",
    memberType: "measure",
    cube,
    meta: metaBlob,
  });

  it("collapses variants sharing (cube, family) into one row at first appearance", () => {
    const items = [
      { option: opt("trips.total_distance", { family: "distance", agg: "total", aggDefault: true, familyTitle: "Distance" }) },
      { option: opt("trips.count", undefined) },
      { option: opt("trips.avg_distance", { family: "distance", agg: "avg" }) },
    ];
    const rows = collapseFamilies(items);
    expect(rows.map((r) => r.label)).toEqual(["Distance", "count"]);
    expect(rows[0].familyKey).toBe("trips:distance");
    expect(rows[0].variants).toHaveLength(2);
    expect(rows[0].defaultIndex).toBe(0);
  });

  it("does not merge same family key across cubes", () => {
    const rows = collapseFamilies([
      { option: opt("trips.total_distance", { family: "distance", agg: "total" }) },
      { option: opt("pings.total_distance", { family: "distance", agg: "total" }, "pings") },
    ]);
    expect(rows).toHaveLength(2);
    expect(rows.every((r) => r.familyKey === undefined)).toBe(true);
  });

  it("prefers the first addable variant when the model default is blocked", () => {
    const rows = collapseFamilies([
      { option: opt("trips.distance", { family: "distance", agg: "value" }), reason: "blocked" },
      { option: opt("trips.avg_distance", { family: "distance", agg: "avg" }) },
      { option: opt("trips.max_distance", { family: "distance", agg: "max" }) },
    ]);
    expect(rows[0].defaultIndex).toBe(1);
  });

  it("a family of one renders as a plain row but keeps the clean familyTitle", () => {
    const rows = collapseFamilies([
      { option: opt("trips.total_fuel", { family: "fuel", agg: "total", aggDefault: true, familyTitle: "Fuel used" }) },
    ]);
    expect(rows[0].familyKey).toBeUndefined();
    expect(rows[0].label).toBe("Fuel used");
  });

  it("labels the row-level variant from the cube grain", () => {
    expect(grainAggLabel("one row per trip")).toBe("per trip");
    expect(grainAggLabel("one row per service record")).toBe("per service record");
    expect(grainAggLabel(undefined)).toBe("per row");
  });

  it("humanizes atlas path slugs", () => {
    expect(pathLabel("trips")).toBe("Trips");
    expect(pathLabel("engine-health")).toBe("Engine health");
  });
});
