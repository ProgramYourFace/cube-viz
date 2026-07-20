import type { CubeMeta } from "@/adapter";
import type { FamilyRegistry } from "@/charts";
import type { ChartSpec } from "@/spec";

import { cubeOfMember } from "../helpers";
import { readWells } from "../builder/wells";
import {
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
 * computes transitive reachability from the selected source and otherwise fails closed.
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

function reachableFrom(all: CubeOption[], source: string): CubeOption[] {
  const cubes = new Map(all.filter((c) => c.type === "cube").map((c) => [c.name, c]));
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
  return [...seen]
    .filter((name) => name !== source)
    .map((name) => cubes.get(name)!)
    .sort((a, b) => a.title.localeCompare(b.title));
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

  const cubeSources = all.filter((c) => c.type === "cube");
  const relatedCubes = sourceName ? reachableFrom(cubeSources, sourceName) : cubeSources;
  const allowedCubes = sourceName
    ? [sourceName, ...relatedCubes.map((c) => c.name)]
    : cubeSources.map((c) => c.name);

  return {
    sourceCube: sourceCube?.type === "cube" ? sourceCube : undefined,
    relatedCubes,
    views,
    measureSource,
    allowedCubes,
  };
}
