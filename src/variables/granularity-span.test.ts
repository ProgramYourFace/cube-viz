import { describe, expect, it } from "vitest";

import { granularitiesForSpan, granularityOptionsFor, rangeSpanDays } from "./granularity-span";

/**
 * The bucket rail. A granularity is only meaningful against the span it divides, and
 * the failure mode is not cosmetic: bucketing a four-week range by SECOND asks for 2.4
 * million points — a query that times out, is refused, or returns enough to lock the
 * page. Every picker that chooses a bucket for a known range narrows to these.
 */
describe("granularitiesForSpan", () => {
  it("offers finer buckets for shorter ranges and coarser for longer", () => {
    expect(granularitiesForSpan(1)).toEqual(["minute", "hour", "day"]);
    expect(granularitiesForSpan(30)).toEqual(["hour", "day", "week"]);
    expect(granularitiesForSpan(90)).toEqual(["day", "week", "month"]);
    expect(granularitiesForSpan(365)).toEqual(["week", "month", "quarter"]);
    expect(granularitiesForSpan(3650)).toEqual(["month", "quarter", "year"]);
  });

  it("never offers a bucket that would blow the point count up", () => {
    // "second" is a legitimate bucket for a live-tail range, but no span this function
    // is asked about is short enough for it — the shortest bucket it will offer is a
    // minute, and only for a range measured in a day or two.
    for (const days of [1, 2, 3, 31, 90, 200, 800, 5000]) {
      expect(granularitiesForSpan(days)).not.toContain("second");
    }
  });
});

describe("rangeSpanDays", () => {
  it("measures an absolute [from, to] pair", () => {
    expect(rangeSpanDays(["2026-07-01", "2026-07-31"])).toBe(30);
  });

  it("reads Cube's relative presets", () => {
    expect(rangeSpanDays("last 7 days")).toBe(7);
    expect(rangeSpanDays("last 3 months")).toBe(90);
    expect(rangeSpanDays("today")).toBe(1);
    expect(rangeSpanDays("this quarter")).toBe(91);
  });

  it("is undefined for anything it cannot read", () => {
    expect(rangeSpanDays(undefined)).toBeUndefined();
    expect(rangeSpanDays("whenever")).toBeUndefined();
    expect(rangeSpanDays(["not-a-date", "also-not"])).toBeUndefined();
  });
});

describe("granularityOptionsFor", () => {
  it("narrows to the buckets that fit a known range", () => {
    expect(granularityOptionsFor("last 30 days")).toEqual(["hour", "day", "week"]);
  });

  it("narrows NOTHING when the range is unknown or variable-bound", () => {
    // An unresolved `{var}` has no span yet — the dashboard decides it at render time.
    // Guessing narrow here would hide buckets the eventual range makes correct.
    expect(granularityOptionsFor({ var: "range" })).toBeUndefined();
    expect(granularityOptionsFor(undefined)).toBeUndefined();
  });
});
