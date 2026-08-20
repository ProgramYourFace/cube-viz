import type { CubeMeta } from "@/adapter";
import type { FamilyRegistry } from "@/charts";
import type { ChartSpec, TimeDimension } from "@/spec";

import { cubeOfMember } from "../helpers";
import { readWells } from "../builder/wells";
import {
  canonicalTimeOf,
  findCube,
  findMember,
  listCubes,
  type CubeOption,
  type MemberOption,
} from "../../primitives/meta-helpers";

/**
 * The chart's CROSS-TABLE scope. Cube's `connectedComponent` only describes a weak
 * component and incorrectly treats sibling facts as mutually joinable. Models may
 * therefore publish direct outbound edges as cube `meta.joinTargets`; this module
 * mirrors Cube's own join-tree rule and otherwise fails closed.
 *
 * Cube accepts a query iff SOME root cube reaches every referenced cube along the
 * DIRECTED join edges (fact → dimension). That makes joinability a property of the
 * whole SET of placed cubes, not of the first-placed field: `devices.name` placed
 * first must still admit every fact cube that joins to `devices` (the fact is the
 * root), which one-way reachability from `devices` would wrongly refuse — the
 * order-dependent-availability bug. Every answer here is therefore "would the set
 * {placed ∪ candidate} still have a viable root?".
 */
export interface JoinScope {
  /** When the chart is bound to a curated view, its name (single flat source). */
  viewLocked?: string;
  /** The primary source table (the measure owner / first field) — listed first. */
  sourceCube?: CubeOption;
  /** Other cube tables reachable by declared join edges, excluding the source. */
  relatedCubes: CubeOption[];
  /** Curated views, offered as ready-made cross-table datasets. */
  views: CubeOption[];
  /** The cube currently owning the measures (single-measure-source guardrail). */
  measureSource?: string;
  /** Source + every table reachable from it. All cubes only while unanchored. */
  allowedCubes: string[];
}

/** Central join-scope predicate shared by field and axis validation. */
export function cubeInJoinScope(scope: JoinScope, cube: string): boolean {
  return scope.allowedCubes.includes(cube);
}

/** Every cube reachable from `source` (inclusive) along directed join edges. */
function reachSet(cubes: Map<string, CubeOption>, source: string): Set<string> {
  const seen = new Set<string>([source]);
  const queue = [source];
  while (queue.length > 0) {
    const current = cubes.get(queue.shift()!);
    for (const target of current?.joinTargets ?? []) {
      if (!cubes.has(target) || seen.has(target)) continue;
      seen.add(target);
      queue.push(target);
    }
  }
  return seen;
}

/** name → cube map of the CUBE (non-view) options. */
function cubeMap(all: CubeOption[]): Map<string, CubeOption> {
  return new Map(all.filter((c) => c.type === "cube").map((c) => [c.name, c]));
}

/**
 * Cube's own acceptance rule: SOME root reaches every cube in `required`. Unknown
 * cube names (not in the map) fail closed.
 */
function hasViableRoot(cubes: Map<string, CubeOption>, required: ReadonlySet<string>): boolean {
  if (required.size === 0) return true;
  for (const name of required) if (!cubes.has(name)) return false;
  if (required.size === 1) return true;
  for (const root of cubes.keys()) {
    const reach = reachSet(cubes, root);
    let covers = true;
    for (const name of required) {
      if (!reach.has(name)) {
        covers = false;
        break;
      }
    }
    if (covers) return true;
  }
  return false;
}

/**
 * The cubes a NEXT field may come from, given the cubes already referenced: every X
 * where {placed ∪ X} still has a viable root. With nothing placed that is every cube.
 */
function joinableWith(cubes: Map<string, CubeOption>, placed: ReadonlySet<string>): string[] {
  const out: string[] = [];
  for (const name of cubes.keys()) {
    if (placed.has(name)) {
      out.push(name);
      continue;
    }
    if (hasViableRoot(cubes, new Set([...placed, name]))) out.push(name);
  }
  return out;
}

/**
 * Resolve the current {@link JoinScope} for a chart spec. `sourceHint` (a cube/view
 * name chosen via the Source control) scopes an EMPTY chart to that source so the
 * picker focuses it before any field is placed.
 */
export function computeJoinScope(
  meta: CubeMeta | undefined,
  spec: ChartSpec,
  sourceHint: string | undefined,
  registry: FamilyRegistry,
): JoinScope {
  const all = listCubes(meta);
  const views = all.filter((c) => c.type === "view");

  const placed = readWells(spec, registry);
  const placedMembers = Object.values(placed).flat();
  let anchor: MemberOption | undefined;
  for (const m of placedMembers) {
    const o = findMember(meta, m);
    if (o) {
      anchor = o;
      break;
    }
  }

  // With no placed field, fall back to the chosen source hint so the picker is scoped.
  const hintCube = !anchor && sourceHint ? findCube(meta, sourceHint) : undefined;
  const anchorCube = anchor ? findCube(meta, anchor.cube) : hintCube;
  const viewLocked = anchorCube?.type === "view" ? anchorCube.name : undefined;
  const measures = spec.query.measures ?? [];
  const measureSource = measures.length ? cubeOfMember(measures[0]) : undefined;

  if (viewLocked) {
    return { viewLocked, relatedCubes: [], views, measureSource, allowedCubes: [viewLocked] };
  }

  const sourceName = measureSource ?? anchor?.cube ?? hintCube?.name;
  const sourceCube = sourceName ? findCube(meta, sourceName) : undefined;

  const cubes = cubeMap(all);
  // Every cube the CURRENT chart references constrains the next pick — the wells,
  // the measure source, and the source hint alike. (The wells cover the visible
  // fields; the invisible dateRange-only time filter is reconciled by
  // `reconcileQueryJoin` rather than allowed to constrain the picker.)
  const placedCubes = new Set<string>();
  for (const m of placedMembers) {
    const cube = findMember(meta, m)?.cube;
    if (cube && cubes.has(cube)) placedCubes.add(cube);
  }
  if (measureSource && cubes.has(measureSource)) placedCubes.add(measureSource);
  if (!placedCubes.size && sourceName && cubes.has(sourceName)) placedCubes.add(sourceName);

  const allowedCubes = joinableWith(cubes, placedCubes);
  const relatedCubes = allowedCubes
    .filter((name) => name !== sourceName)
    .map((name) => cubes.get(name)!)
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    sourceCube: sourceCube?.type === "cube" ? sourceCube : undefined,
    relatedCubes,
    views,
    measureSource,
    allowedCubes,
  };
}

/**
 * Repair the parts of the QUERY the wells don't show, so the spec the editor emits is
 * one Cube will accept ("Can't find join path to join 'device_locations',
 * 'device_trips'" was a user-visible failure):
 *
 *  • a `dateRange`-only time dimension (the chart's date FILTER — no well claims it)
 *    left pointing at a cube the rest of the query can no longer join is RE-POINTED
 *    to the query's own fact cube (its `canonicalTime` axis), keeping the window;
 *    dropped when that cube has no time axis;
 *  • any other query member set that has no viable join root keeps only the members
 *    the wells actually hold (stale writers, never user-visible fields).
 *
 * Pure spec-in/spec-out; call it on every editor emit.
 */
export function reconcileQueryJoin(
  spec: ChartSpec,
  meta: CubeMeta | undefined,
  registry: FamilyRegistry,
): ChartSpec {
  if (!meta) return spec;
  const cubes = cubeMap(listCubes(meta));
  const query = spec.query ?? {};
  const placed = new Set(Object.values(readWells(spec, registry)).flat());

  // `cubeOfMember` yields undefined for a malformed name — treat those as outside
  // the graph (they can't constrain or be repaired).
  const cubeOf = (m: string): string | undefined => {
    const c = cubeOfMember(m);
    return c !== undefined && cubes.has(c) ? c : undefined;
  };

  const queryCubes = new Set<string>();
  for (const m of [...(query.measures ?? []), ...(query.dimensions ?? [])]) {
    const cube = cubeOf(m);
    if (cube) queryCubes.add(cube);
  }
  const timeDims = query.timeDimensions ?? [];
  for (const t of timeDims) {
    const cube = cubeOf(t.dimension);
    if (cube) queryCubes.add(cube);
  }
  if (hasViableRoot(cubes, queryCubes)) return spec;

  // The fact cube (measure owner) anchors the repair; fall back to the first placed
  // member's cube so a measure-less chart still converges.
  const factCube =
    (query.measures ?? []).map(cubeOf).find((c) => c !== undefined) ??
    [...placed].map((m) => findMember(meta, m)?.cube).find((c) => c !== undefined && cubes.has(c));
  if (!factCube) return spec;

  const keptCubes = new Set<string>([factCube]);
  const joins = (cube: string): boolean =>
    hasViableRoot(cubes, new Set([...keptCubes, cube])) && (keptCubes.add(cube), true);

  const nextTimeDims: TimeDimension[] = [];
  for (const t of timeDims) {
    const cube = cubeOf(t.dimension);
    if (cube && joins(cube)) {
      nextTimeDims.push(t);
      continue;
    }
    if (!placed.has(t.dimension)) {
      // The invisible date filter: follow the fact cube, keep the window.
      const canonical = canonicalTimeOf(meta, factCube);
      if (canonical && !nextTimeDims.some((d) => d.dimension === canonical.name)) {
        nextTimeDims.push({ ...t, dimension: canonical.name });
      }
    }
    // A placed-but-unjoinable time axis should have been blocked at placement;
    // dropping it here would fight the user, so leave it for the picker rules.
    else nextTimeDims.push(t);
  }

  const keepMember = (m: string): boolean => {
    if (placed.has(m)) return true;
    const cube = cubeOf(m);
    return cube !== undefined && joins(cube);
  };
  const nextQuery = {
    ...query,
    measures: (query.measures ?? []).filter(keepMember),
    dimensions: (query.dimensions ?? []).filter(keepMember),
    timeDimensions: nextTimeDims,
  };
  return { ...spec, query: nextQuery };
}
