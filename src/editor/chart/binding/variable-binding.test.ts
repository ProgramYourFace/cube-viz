import { describe, expect, it } from "vitest";

import { bindingSummary } from "./variable-binding";

/**
 * These pin the property that keeps a bound value from crashing the editor.
 *
 * The failure this prevents is real and was shipped: the KPI "Trend" popover printed
 * its granularity by casting it to a string. A granularity may be a `{var}` binding,
 * so the cast handed React an OBJECT as a child, React threw ("Objects are not valid
 * as a React child … {var}"), and — with no boundary between that summary and the
 * dashboard — the whole board went to an error screen the user could not edit their
 * way out of. The value was still in the spec, so every reload crashed again.
 *
 * The invariant is therefore not "formats nicely" but "ALWAYS returns a string".
 */
describe("bindingSummary", () => {
  it("names the variable a bound value points at", () => {
    expect(bindingSummary({ var: "granularity" })).toBe("{granularity}");
  });

  it("returns a string for EVERY shape a value slot can hold", () => {
    const values: unknown[] = [
      undefined,
      null,
      "",
      "day",
      0,
      false,
      { var: "range" },
      ["2026-01-01", "2026-02-01"],
      // Shapes no slot should hold, which is exactly when a crash would be a surprise.
      { unexpected: true },
      [],
      new Date(0),
    ];

    for (const v of values) expect(typeof bindingSummary(v)).toBe("string");
  });

  it("says 'None' for the empty values, and never '[object Object]'", () => {
    expect(bindingSummary(undefined)).toBe("None");
    expect(bindingSummary(null)).toBe("None");
    expect(bindingSummary("")).toBe("None");
    expect(bindingSummary([])).toBe("None");
    expect(bindingSummary({ unexpected: true })).toBe("None");
    expect(bindingSummary(undefined, "No trend")).toBe("No trend");
  });

  it("keeps falsy-but-real values, which are not 'nothing'", () => {
    expect(bindingSummary(0)).toBe("0");
    expect(bindingSummary(false)).toBe("false");
  });

  it("reads a date range as its two ends", () => {
    expect(bindingSummary(["2026-01-01", "2026-02-01"])).toBe("2026-01-01 – 2026-02-01");
  });

  it("cannot have its braces broken by a variable named with braces", () => {
    expect(bindingSummary({ var: "a{b}c" })).toBe("{abc}");
  });
});
