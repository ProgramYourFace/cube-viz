import { describe, expect, it } from "vitest";

import type { CubeMeta } from "@/adapter";
import type { ChartSpec } from "@/spec";
import { builtinFamilyRegistry } from "@/charts";

import { computeJoinScope, cubeInJoinScope, reconcileQueryJoin } from "./join-scope";

/**
 * Join scope must mirror Cube's own rule: a query is accepted iff SOME root cube
 * reaches every referenced cube along the DIRECTED fact→dimension edges. The two
 * user-visible failures pinned here:
 *
 *  1. ORDER-DEPENDENT AVAILABILITY — placing `devices.name` first collapsed the
 *     picker to devices+systems (one-way reachability from the first field), while
 *     placing a fact measure first offered everything including `devices.name`.
 *  2. "Can't find join path to join 'device_locations', 'device_trips'" — a
 *     dateRange-only time FILTER (no well shows it) kept pointing at the old fact
 *     cube after the visible fields moved to another one.
 */

const R = builtinFamilyRegistry;

const cube = (
  name: string,
  joinTargets: string[],
  members: { measures?: string[]; timeDims?: string[]; dims?: string[] } = {},
) => ({
  name,
  title: name,
  type: "cube",
  public: true,
  meta: { joinTargets },
  measures: (members.measures ?? []).map((m) => ({
    name: `${name}.${m}`,
    title: m,
    shortTitle: m,
    type: "number",
    public: true,
  })),
  dimensions: [
    ...(members.timeDims ?? []).map((d) => ({
      name: `${name}.${d}`,
      title: d,
      shortTitle: d,
      type: "time",
      public: true,
      meta: { canonicalTime: true },
    })),
    ...(members.dims ?? []).map((d) => ({
      name: `${name}.${d}`,
      title: d,
      shortTitle: d,
      type: "string",
      public: true,
    })),
  ],
  segments: [],
});

// The real model's shape in miniature: two sibling facts joining the same
// dimension tables; no edge between the facts themselves.
const META = {
  cubes: [
    cube("devices", ["systems"], { dims: ["name"] }),
    cube("systems", [], { dims: ["name"] }),
    cube("device_locations", ["devices"], {
      measures: ["count"],
      timeDims: ["timestamp"],
      dims: ["speed_limit"],
    }),
    cube("device_trips", ["devices"], {
      measures: ["trip_count"],
      timeDims: ["start_time"],
    }),
  ],
} as unknown as CubeMeta;

const barSpec = (over: Partial<ChartSpec["query"]>): ChartSpec => {
  const query = { measures: [], dimensions: [], timeDimensions: [], ...over };
  return {
    version: 4,
    query,
    chart: {
      family: "bar",
      mapping: {
        category: { member: (query.dimensions ?? [])[0] },
        series: { mode: "measures", members: query.measures ?? [] },
      },
    },
  } as unknown as ChartSpec;
};

describe("computeJoinScope — joint-root joinability", () => {
  it("a dimension-table field placed FIRST still admits every fact that joins it", () => {
    const spec = barSpec({ dimensions: ["devices.name"] });
    const scope = computeJoinScope(META, spec, undefined, R);
    expect(cubeInJoinScope(scope, "device_locations")).toBe(true);
    expect(cubeInJoinScope(scope, "device_trips")).toBe(true);
    expect(cubeInJoinScope(scope, "systems")).toBe(true);
  });

  it("is order-independent: fact-first and dimension-first agree", () => {
    const factFirst = computeJoinScope(META, barSpec({ measures: ["device_locations.count"] }), undefined, R);
    const dimFirst = computeJoinScope(
      META,
      barSpec({ dimensions: ["devices.name"] }),
      undefined,
      R,
    );
    // Everything fact-first allows outside the sibling-fact rule, dimension-first
    // must allow too (dimension-first is strictly less constrained).
    for (const allowed of factFirst.allowedCubes) {
      expect(dimFirst.allowedCubes).toContain(allowed);
    }
  });

  it("still refuses sibling facts once a fact cube is referenced", () => {
    const scope = computeJoinScope(META, barSpec({ measures: ["device_locations.count"] }), undefined, R);
    expect(cubeInJoinScope(scope, "device_trips")).toBe(false);
    expect(cubeInJoinScope(scope, "devices")).toBe(true);
  });
});

describe("reconcileQueryJoin — the invisible date filter follows the fact cube", () => {
  it("re-points a dateRange-only time dimension stranded on a sibling fact", () => {
    const spec = barSpec({
      measures: ["device_locations.count"],
      dimensions: ["device_locations.speed_limit"],
      timeDimensions: [{ dimension: "device_trips.start_time", dateRange: "last 30 days" }],
    });
    const fixed = reconcileQueryJoin(spec, META, R);
    expect(fixed.query.timeDimensions).toEqual([
      { dimension: "device_locations.timestamp", dateRange: "last 30 days" },
    ]);
  });

  it("leaves an already-joinable query untouched", () => {
    const spec = barSpec({
      measures: ["device_locations.count"],
      dimensions: ["devices.name"],
      timeDimensions: [{ dimension: "device_locations.timestamp", dateRange: "last 30 days" }],
    });
    expect(reconcileQueryJoin(spec, META, R)).toBe(spec);
  });

  it("drops the stranded filter when the fact cube has no time axis to carry it", () => {
    const meta = {
      cubes: [
        cube("devices", ["systems"], { dims: ["name"] }),
        cube("systems", []),
        cube("timeless_fact", ["devices"], { measures: ["count"] }),
        cube("device_trips", ["devices"], { timeDims: ["start_time"] }),
      ],
    } as unknown as CubeMeta;
    const spec = barSpec({
      measures: ["timeless_fact.count"],
      timeDimensions: [{ dimension: "device_trips.start_time", dateRange: "last 30 days" }],
    });
    expect(reconcileQueryJoin(spec, meta, R).query.timeDimensions).toEqual([]);
  });
});
