import { describe, expect, it } from "vitest";

import { fieldBadge } from "./meta-helpers";

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
