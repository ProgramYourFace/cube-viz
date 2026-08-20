import { describe, expect, it } from "vitest";
import type { ResultSet } from "@cubejs-client/core";
import { normalize } from "./normalize";
import type { ChartOptions } from "@/spec";

/**
 * normalizePivot's boolean labeling: a split on a boolean dimension must name
 * its series "<dimension title>: yes|no" — never the raw "1"/"0" the warehouse
 * emits — because that label IS the legend and tooltip text.
 */

/** Minimal ResultSet stub exercising the pivot path. */
function booleanSplitResultSet(dimensionType: string): ResultSet<Record<string, unknown>> {
  const stub = {
    annotation: () => ({
      measures: {
        "device_locations.total_fuel": { title: "Fuel used", shortTitle: "Fuel used", type: "number" },
      },
      dimensions: {
        "device_locations.is_speeding": {
          title: "Location history Is speeding",
          shortTitle: "Is speeding",
          type: dimensionType,
        },
      },
      segments: {},
      timeDimensions: {},
    }),
    tablePivot: () => [
      { "device_locations.timestamp.day": "2026-07-22T00:00:00.000" },
      { "device_locations.timestamp.day": "2026-07-23T00:00:00.000" },
    ],
    chartPivot: () => [
      { x: "2026-07-22T00:00:00.000", "0,device_locations.total_fuel": 4, "1,device_locations.total_fuel": 1 },
      { x: "2026-07-23T00:00:00.000", "0,device_locations.total_fuel": 5, "1,device_locations.total_fuel": 2 },
    ],
    seriesNames: () => [
      { key: "0,device_locations.total_fuel", yValues: ["0", "device_locations.total_fuel"] },
      { key: "1,device_locations.total_fuel", yValues: ["1", "device_locations.total_fuel"] },
    ],
  };
  return stub as unknown as ResultSet<Record<string, unknown>>;
}

const OPTIONS: ChartOptions = {
  family: "line",
  mapping: {
    category: { member: "device_locations.timestamp" },
    series: {
      mode: "pivot",
      pivot: "device_locations.is_speeding",
      value: "device_locations.total_fuel",
    },
  },
} as ChartOptions;

const QUERY = {
  measures: ["device_locations.total_fuel"],
  dimensions: ["device_locations.is_speeding"],
};

describe("normalize: boolean split-by series labels", () => {
  it('names boolean pivot series "<title>: yes|no" instead of 1/0', () => {
    const data = normalize(booleanSplitResultSet("boolean"), OPTIONS, QUERY);
    expect(data.series.map((s) => s.label)).toEqual(["Is speeding: no", "Is speeding: yes"]);
    // Keys stay raw — hosts filter/color by the raw pivot value.
    expect(data.series.map((s) => s.key)).toEqual([
      "0,device_locations.total_fuel",
      "1,device_locations.total_fuel",
    ]);
  });

  it("leaves non-boolean pivot values untouched", () => {
    const data = normalize(booleanSplitResultSet("string"), OPTIONS, QUERY);
    expect(data.series.map((s) => s.label)).toEqual(["0", "1"]);
  });
});
