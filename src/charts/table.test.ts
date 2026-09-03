import { describe, expect, it } from "vitest";

import type { ChartFormat } from "@/format";
import type { ResultAnnotation } from "@/adapter/types";
import { compareCell, resolveColumns, rowMatches } from "./table";

// The table family is a headless TanStack Table over `raw.rows`; these pin the
// pure halves it is built from — the numeric-aware comparator, the search
// predicate (matches the FORMATTED text the reader sees), and column
// resolution (labels, alignment, per-column format, hidden/ordered overrides).

const format = {
  value: (n: number, member: string) => (member.endsWith("fuel") ? `${n} gal` : `${n}`),
  category: (v: string | number) => String(v),
  derive: (opts: { suffix?: string }) =>
    ({
      value: (n: number) => `${n}${opts.suffix ?? ""}`,
      category: (v: string | number) => String(v),
    }) as unknown as ChartFormat,
} as unknown as ChartFormat;

const ann = {
  measures: { "trips.total_fuel": { title: "Total fuel", shortTitle: "Fuel" } },
  dimensions: { "devices.name": { title: "Device name", shortTitle: "Vehicle" } },
  timeDimensions: {},
  segments: {},
} as unknown as ResultAnnotation;

const rows = [
  { "devices.name": "RAV4", "trips.total_fuel": 59.4 },
  { "devices.name": "Explorer", "trips.total_fuel": 0 },
];

describe("compareCell", () => {
  it("compares numbers by value and strings as text", () => {
    expect(compareCell(2, 10)).toBeLessThan(0);
    expect(compareCell("10", "9")).toBeGreaterThan(0);
    expect(compareCell("b", "a")).toBeGreaterThan(0);
    expect(compareCell(null, "a")).toBeLessThan(0);
  });
});

describe("rowMatches", () => {
  it("is a case-insensitive substring match with an empty query matching all", () => {
    expect(rowMatches("29.6 mpg", "MPG")).toBe(true);
    expect(rowMatches("29.6 mpg", " 29.6 ")).toBe(true);
    expect(rowMatches("29.6 mpg", "gal")).toBe(false);
    expect(rowMatches("anything", "")).toBe(true);
  });
});

describe("resolveColumns", () => {
  it("defaults to every row key, measures right-aligned with annotation labels", () => {
    const cols = resolveColumns(rows, ann, {}, format);
    expect(cols.map((c) => [c.member, c.label, c.align])).toEqual([
      ["devices.name", "Vehicle", "left"],
      ["trips.total_fuel", "Fuel", "right"],
    ]);
    expect(cols[1].text(59.4)).toBe("59.4 gal");
    expect(cols[1].text(null)).toBe("—");
  });

  it("honors column overrides: order, hidden, label, align, per-column format", () => {
    const cols = resolveColumns(
      rows,
      ann,
      {
        columns: [
          { member: "trips.total_fuel", label: "Burn", align: "center", format: { suffix: " L" } },
          { member: "devices.name", hidden: true },
        ],
      },
      format,
    );
    expect(cols).toHaveLength(1);
    expect(cols[0]).toMatchObject({ member: "trips.total_fuel", label: "Burn", align: "center" });
    expect(cols[0].text(3)).toBe("3 L");
  });
});
