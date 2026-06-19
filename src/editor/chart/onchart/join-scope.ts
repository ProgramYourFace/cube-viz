import type { CubeMeta } from "@/adapter";
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
 * The chart's CROSS-TABLE scope, derived purely from Cube `/v1/meta`'s
 * `connectedComponent` (the only join signal it exposes). A chart is bound either to
 * a curated VIEW (flat, pre-joined, fan-out-safe) or to the raw TABLE graph — and in
 * the table graph it may draw measures from ONE table but dimensions from any table
 * in the same join component. That single-measure-source rule is what keeps the UI
 * from building a query Cube would reject as a fan-out ("can't find join path").
 */
export interface JoinScope {
  /** When the chart is bound to a curated view, its name (single flat source). */
  viewLocked?: string;
  /** The primary source table (the measure owner / first field) — listed first. */
  sourceCube?: CubeOption;
  /** Other joinable cube tables (same connectedComponent), excluding the source. */
  relatedCubes: CubeOption[];
  /** Curated views, offered as ready-made cross-table datasets. */
  views: CubeOption[];
  /** The cube currently owning the measures (single-measure-source guardrail). */
  measureSource?: string;
  /** The join-graph id the chart is anchored to (undefined when empty). */
  scopeComponent?: number;
}

/**
 * Resolve the current {@link JoinScope} for a chart spec. `sourceHint` (a cube/view
 * name chosen via the Source control) scopes an EMPTY chart to that source so the
 * picker focuses it before any field is placed.
 */
export function computeJoinScope(
  meta: CubeMeta | undefined,
  spec: ChartSpec,
  sourceHint?: string,
): JoinScope {
  const all = listCubes(meta);
  const views = all.filter((c) => c.type === "view");

  const placed = readWells(spec);
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
  const scopeComponent = anchor?.connectedComponent ?? hintCube?.connectedComponent;

  const measures = spec.query.measures ?? [];
  const measureSource = measures.length ? cubeOfMember(measures[0]) : undefined;

  if (viewLocked) {
    return { viewLocked, relatedCubes: [], views, measureSource, scopeComponent };
  }

  const sourceName = measureSource ?? anchor?.cube ?? hintCube?.name;
  const sourceCube = sourceName ? findCube(meta, sourceName) : undefined;

  const cubeSources = all.filter((c) => c.type === "cube" && c.connectedComponent !== undefined);
  const inScope =
    scopeComponent === undefined
      ? cubeSources
      : cubeSources.filter((c) => c.connectedComponent === scopeComponent);
  const relatedCubes = inScope
    .filter((c) => c.name !== sourceName)
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    sourceCube: sourceCube?.type === "cube" ? sourceCube : undefined,
    relatedCubes,
    views,
    measureSource,
    scopeComponent,
  };
}
