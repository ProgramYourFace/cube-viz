import { describe, expect, it } from "vitest";

import {
  collapseFamilies,
  defaultAggForKind,
  fieldBadge,
  grainAggLabel,
  memberAggDefault,
  pathLabel,
  type MemberOption,
} from "./meta-helpers";
import { aggHint, aggPillLabel } from "../chart/onchart/AggSegments";

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

  it("labels the row-level variant from the cube grain as a grain switch, not a summary", () => {
    expect(grainAggLabel("one row per trip")).toBe("each trip");
    expect(grainAggLabel("one row per service record")).toBe("each service record");
    expect(grainAggLabel(undefined)).toBe("each row");
  });

  it("humanizes atlas path slugs", () => {
    expect(pathLabel("trips")).toBe("Trips");
    expect(pathLabel("engine-health")).toBe("Engine health");
  });
});

/**
 * `kind` is the model's ONE statement about a family; the default aggregation and
 * the "latest" label DERIVE from it, so `aggDefault`/`aggLabel` hand-stamps exist
 * only as explicit overrides (partition families).
 */
describe("measurement kinds", () => {
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

  it("derives each kind's default aggregation", () => {
    expect(defaultAggForKind("flow")).toBe("total");
    expect(defaultAggForKind("gauge")).toBe("avg");
    expect(defaultAggForKind("counter")).toBe("max");
    expect(defaultAggForKind("stat")).toBe("avg");
    expect(defaultAggForKind("part")).toBeUndefined();
    expect(defaultAggForKind(undefined)).toBeUndefined();
  });

  it("marks the derived default without an aggDefault stamp", () => {
    expect(memberAggDefault(opt("t.total_cost", { family: "cost", agg: "total", kind: "flow" }))).toBe(true);
    expect(memberAggDefault(opt("t.avg_cost", { family: "cost", agg: "avg", kind: "flow" }))).toBe(false);
    expect(memberAggDefault(opt("t.avg_rpm", { family: "rpm", agg: "avg", kind: "gauge" }))).toBe(true);
  });

  it("keeps honoring an explicit aggDefault stamp (partition families, exceptions)", () => {
    expect(
      memberAggDefault(opt("p.engine_on", { family: "time", agg: "engine-on", kind: "part", aggDefault: true })),
    ).toBe(true);
    expect(memberAggDefault(opt("p.idle", { family: "time", agg: "idle", kind: "part" }))).toBe(false);
  });

  it("collapseFamilies leads with the kind-derived default (no stamps in meta)", () => {
    const rows = collapseFamilies([
      { option: opt("t.distance", { family: "distance", agg: "value", kind: "stat" }) },
      { option: opt("t.total_distance", { family: "distance", agg: "total", kind: "stat" }) },
      { option: opt("t.avg_distance", { family: "distance", agg: "avg", kind: "stat", familyTitle: "Distance" }) },
    ]);
    expect(rows[0].defaultIndex).toBe(2);
    expect(rows[0].label).toBe("Distance");
  });

  it("labels a counter's max as 'latest' with no aggLabel stamp", () => {
    const max = opt("e.max_odometer", { family: "odometer", agg: "max", kind: "counter" });
    expect(aggPillLabel(max, undefined)).toBe("latest");
    // Explicit overrides still win; other aggs keep their own name.
    expect(aggPillLabel(opt("e.x", { agg: "max", kind: "counter", aggLabel: "newest" }), undefined)).toBe("newest");
    expect(aggPillLabel(opt("e.avg_odometer", { family: "odometer", agg: "avg", kind: "counter" }), undefined)).toBe("avg");
  });

  it("teaches the default-agg rule where the choice is made (aggHint)", () => {
    const cube = { name: "trips", title: "Trips", type: "cube" as const, joinTargets: [], grain: "one row per trip" };
    const gauge = opt("l.avg_speed", { family: "speed", agg: "avg", kind: "gauge" });
    expect(aggHint([gauge], cube, gauge)).toContain("reading");
    const counter = opt("e.max_odometer", { family: "odometer", agg: "max", kind: "counter" });
    expect(aggHint([counter], cube, counter)).toContain("latest");
    const stat = opt("t.avg_distance", { family: "distance", agg: "avg", kind: "stat" });
    expect(aggHint([stat], cube, stat)).toContain("one trip at a time");
    // The selected row-level variant explains its grain switch instead.
    const value = opt("t.distance", { family: "distance", agg: "value", kind: "stat" });
    expect(aggHint([stat, value], cube, value)).toBe(
      "Plots each trip as its own point instead of summarizing.",
    );
    // A partition family speaks with the model's own familyHint.
    const part = opt("l.total_idle_time", {
      family: "time_breakdown", agg: "idle", kind: "part",
    });
    const partTitled = opt("l.total_engine_on_time", {
      family: "time_breakdown", agg: "engine-on", kind: "part", aggDefault: true,
      familyTitle: "Time breakdown", familyHint: "Idle + moving add up to engine-on.",
    });
    expect(aggHint([partTitled, part], cube, part)).toBe("Idle + moving add up to engine-on.");
  });
});
