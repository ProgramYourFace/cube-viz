import type { ChartFamily, ChartSpec, TimeDimension } from "@/spec";

import type { FamilyRegistry } from "@/charts";

import {
  placeInChannelWell,
  pivotOf,
  readChannelWells,
  removeFromChannelWell,
  type Channel,
  type FieldKind,
  type WellDef,
  type WellTarget,
} from "./channels";

/**
 * Chart Builder v4 — the PURE seam (no React) between the editor UI and a
 * {@link ChartSpec}. Every writer returns a FULL spec, so the panel funnels each edit
 * through the unchanged `update → validate → debounce-emit` engine.
 *
 * This module used to BE the mapping: ~600 lines of per-family `switch` arms
 * (`placeCartesian`/`placeHeatmap`/`placePie`/`placeScatter`/`placeKpi`/`placeTable`
 * + a remover each + their own query mutators), each re-answering "what's in this
 * well / put it here / take it out" in its own dialect. That knowledge is now DATA on
 * the descriptor — every builtin well declares a `target` (where its member lives in
 * the spec) and a `channel` (which visual role it feeds) — and ONE interpreter
 * (`./channels`) reads and writes it. What remains here is dispatch:
 *
 *   descriptor hook (host families)  →  else the channel interpreter.
 *
 * The public shape (`getWells`/`readWells`/`placeField`/`removeField`, plus the
 * {@link WellDef}/`FieldKind` types and {@link adaptiveGranularity}) is unchanged, so
 * every call site — and every host family built against it — keeps compiling.
 */

// The well SHAPE moved to `./channels` (it grew the `target`/`channel` bindings).
// Re-exported here because `familyDescriptors`, the on-chart editor components and
// host-registered families all import these types from this path.
export type { Channel, FieldKind, WellDef, WellTarget };

// The map/geo host families derive a default time bucket with this; keep the export
// path stable (it was defined in this module before the channel model absorbed it).
export { adaptiveGranularity } from "./channels";

/* ─────────────────────────── per-family well sets ─────────────────────────── */

/**
 * The typed wells for a family, top→bottom (docs/05 §2). Reads NOTHING from the spec —
 * pure shape. The well DATA lives on the {@link ChartFamilyDescriptor} (single source
 * of truth); this is the accessor.
 */
export function getWells(family: ChartFamily, registry: FamilyRegistry): WellDef[] {
  return registry.require(family).wells;
}

/* ─────────────────────────────── read model ──────────────────────────────── */

/** The pivot (split) member, if the mapping is in pivot mode. */
export function pivotColorOf(spec: ChartSpec): string | undefined {
  return pivotOf(spec.chart);
}

/**
 * Derive each well's current member name(s) from the spec (docs/05 §6) — the inverse
 * of {@link placeField}/{@link removeField}.
 *
 * Channel wells are read by the generic interpreter; a host family's `readWells` hook
 * wins for the wells IT returns, so a host may declare targets on the wells the
 * interpreter can service and hook only the rest.
 */
export function readWells(spec: ChartSpec, registry: FamilyRegistry): Record<string, string[]> {
  const descriptor = registry.require(spec.chart.family);
  const generic = readChannelWells(spec, descriptor.wells);
  const host = descriptor.readWells?.(spec);
  return host ? { ...generic, ...host } : generic;
}

/* ─────────────────────────────── writers ─────────────────────────────────── */

/**
 * Place `member` (of `kind`) into well `wellId` for `family`, returning a full spec.
 * One-cardinality wells replace; many-cardinality wells append.
 */
export function placeField(
  spec: ChartSpec,
  family: ChartFamily,
  wellId: string,
  member: string,
  kind: FieldKind,
  registry: FamilyRegistry,
): ChartSpec {
  const descriptor = registry.require(family);
  // Host families supply their own placement writer on the descriptor.
  if (descriptor.placeField) return descriptor.placeField(spec, wellId, member, kind);
  const next = placeInChannelWell(spec, descriptor.wells, wellId, member, kind);
  return keepTimeAxes(spec, next, descriptor.wells);
}

/**
 * Remove `member` from well `wellId`, unbinding it from the query and any
 * family-specific structure. Returns a full spec.
 */
export function removeField(
  spec: ChartSpec,
  family: ChartFamily,
  wellId: string,
  member: string,
  registry: FamilyRegistry,
): ChartSpec {
  const descriptor = registry.require(family);
  // Host families supply their own removal writer on the descriptor.
  if (descriptor.removeField) return descriptor.removeField(spec, wellId, member);
  const next = removeFromChannelWell(spec, descriptor.wells, wellId, member);
  return keepPlacedTimeDimensions(spec, next, descriptor.wells);
}

/* ───────────────────── interpreter guards (multi-time axes) ───────────────── */
//
// The interpreter edits a SINGLE time dimension (`query.timeDimensions[0]`), which is
// exactly right for the one-time-axis families (bar/line/area/pie/heatmap) but not for
// the table, whose `columns` well may hold several date fields. These guards reconcile
// the result with what the wells actually hold. They never PRUNE a time dimension: a
// `dateRange`-only entry that no well claims is the chart's date FILTER.

/**
 * Restore the time dimensions the single-time-dimension write dropped, THEN carry the
 * edited window across if this was a straight one-for-one swap of the time axis.
 */
function keepTimeAxes(before: ChartSpec, after: ChartSpec, wells: readonly WellDef[]): ChartSpec {
  return keepTimeWindow(before, keepPlacedTimeDimensions(before, after, wells));
}

/**
 * Carry the edited time window across a time-axis SWAP. Replacing X unbinds the
 * outgoing time dimension before binding the incoming one, which would drop the user's
 * granularity + dateRange with it; the old per-family writers captured them first.
 * Only applies to the single-time-axis case (one entry before, one after).
 */
function keepTimeWindow(before: ChartSpec, after: ChartSpec): ChartSpec {
  const prevList = before.query?.timeDimensions ?? [];
  const nextList = after.query?.timeDimensions ?? [];
  if (prevList.length !== 1 || nextList.length !== 1) return after;
  const [prev] = prevList;
  const [next] = nextList;
  if (prev.dimension === next.dimension || next.dateRange !== undefined) return after;
  if (prev.dateRange === undefined) return after;
  const merged: TimeDimension = {
    ...next,
    granularity: prev.granularity ?? next.granularity,
    dateRange: prev.dateRange,
  };
  return { ...after, query: { ...(after.query ?? {}), timeDimensions: [merged] } };
}

/**
 * Restore every time dimension that is STILL placed in a well but fell off the query
 * (the single-time-dimension write dropped it) — a table's other date columns.
 */
function keepPlacedTimeDimensions(
  before: ChartSpec,
  after: ChartSpec,
  wells: readonly WellDef[],
): ChartSpec {
  const prevList = before.query?.timeDimensions ?? [];
  if (prevList.length === 0) return after;
  const nextList = after.query?.timeDimensions ?? [];
  const bound = new Set(nextList.map((t) => t.dimension));
  const placed = new Set(Object.values(readChannelWells(after, wells)).flat());
  const restore = prevList.filter((t) => !bound.has(t.dimension) && placed.has(t.dimension));
  if (restore.length === 0) return after;
  return { ...after, query: { ...(after.query ?? {}), timeDimensions: [...nextList, ...restore] } };
}

