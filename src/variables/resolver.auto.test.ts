import { describe, expect, it } from "vitest";

import type { VariableDecl } from "@/spec";
import { resolveQuery } from "./resolver";

/**
 * The "auto" granularity contract: the SPEC may store `granularity: "auto"`, but the
 * query POSTed to Cube never carries it — resolution substitutes the bucket that fits
 * the (resolved) date range. This is what lets the editor default new time fields to
 * Auto: change the range, the bucket follows; pin a bucket, it sticks.
 */
describe("resolveQuery — auto granularity", () => {
  const q = (granularity: unknown, dateRange?: unknown) => ({
    measures: ["trips.count"],
    timeDimensions: [
      {
        dimension: "trips.start_time",
        granularity: granularity as never,
        ...(dateRange !== undefined ? { dateRange: dateRange as never } : {}),
      },
    ],
  });

  const td = (query: ReturnType<typeof q>, store = {}, decls: VariableDecl[] = []) =>
    resolveQuery(query, store, decls).timeDimensions?.[0];

  it("substitutes the span-fitting bucket for an absolute range", () => {
    expect(td(q("auto", ["2026-07-01", "2026-07-02"]))?.granularity).toBe("hour");
    expect(td(q("auto", ["2026-01-01", "2026-03-01"]))?.granularity).toBe("day");
    expect(td(q("auto", ["2024-06-01", "2026-01-01"]))?.granularity).toBe("month");
  });

  it("understands relative presets (the default new-chart range)", () => {
    expect(td(q("auto", "last 30 days"))?.granularity).toBe("day");
    expect(td(q("auto", "last 12 months"))?.granularity).toBe("month");
  });

  it("falls back to day with no range at all", () => {
    expect(td(q("auto"))?.granularity).toBe("day");
  });

  it("resolves against the VARIABLE-bound range, not the token", () => {
    const decls: VariableDecl[] = [{ name: "range", type: "dateRange" }];
    const query = q("auto", { var: "range" });
    expect(td(query, { range: ["2026-07-01", "2026-07-02"] }, decls)?.granularity).toBe("hour");
    expect(td(query, { range: ["2024-06-01", "2026-01-01"] }, decls)?.granularity).toBe("month");
  });

  it("substitutes when a granularity VARIABLE carries 'auto'", () => {
    const decls: VariableDecl[] = [{ name: "bucket", type: "granularity" }];
    const query = {
      measures: ["trips.count"],
      timeDimensions: [
        {
          dimension: "trips.start_time",
          granularity: { var: "bucket" },
          dateRange: ["2026-07-01", "2026-07-02"] as [string, string],
        },
      ],
    };
    expect(
      resolveQuery(query, { bucket: "auto" }, decls).timeDimensions?.[0]?.granularity,
    ).toBe("hour");
  });

  it("leaves a concrete granularity alone", () => {
    expect(td(q("week", ["2026-07-01", "2026-07-02"]))?.granularity).toBe("week");
  });
});
