import type { Cube, TCubeDimension, TCubeMeasure, TCubeSegment } from "@cubejs-client/core";

import type { CubeMeta } from "@/adapter";
import type { FilterOperator } from "@/spec";

/**
 * Pure helpers over Cube `/v1/meta` shared by the field pickers + filter builder.
 *
 * The cardinal rule (docs/03 §A3.1): member identifiers are read **verbatim** from
 * meta — never composed or guessed. A view's `prefix:true` members already carry
 * the joined-cube prefix in `name` (e.g. `trip_performance.devices_name`), so we
 * key everything off `member.name` exactly as the server returns it.
 */

/** What kind of member a picker/filter target wants. */
export type MemberKind = "measure" | "dimension" | "dimensionOrMeasure" | "time";

/** A flattened, UI-ready member descriptor (identity = `name`, read verbatim). */
export interface MemberOption {
  /** Fully-qualified member name, VERBATIM from meta. The value we emit. */
  name: string;
  /** Best human label: `shortTitle ?? title ?? name`. */
  label: string;
  title: string;
  shortTitle: string;
  /** Cube primitive type. Segments report "segment". */
  type: "time" | "number" | "string" | "boolean" | "segment";
  memberType: "measure" | "dimension" | "segment";
  /** Owning cube/view name (the part before the first dot, or cube.name). */
  cube: string;
  description?: string;
  /** Member `meta` blob (unit/quantity/convert live here for formatting). */
  meta?: Record<string, unknown>;
  /** Cube `meta.quantity` (e.g. "distance", "time"), lifted for axis-unit checks. */
  quantity?: string;
  /** Cube `meta.unit` (e.g. "km", "L"), lifted for axis-unit checks. */
  unit?: string;
  /**
   * Cube's `connectedComponent` for the owning cube — cubes sharing a value are in
   * the SAME join graph (mutually joinable). The only join signal `/v1/meta` gives
   * us, so cross-table field selection keys off it. `undefined` = an isolated cube.
   */
  connectedComponent?: number;
}

/** A cube or view entry for the CubePicker. */
export interface CubeOption {
  name: string;
  title: string;
  /** "cube" | "view" — defaults to "cube" when meta omits `type`. */
  type: "cube" | "view";
  /** Join-graph id (see {@link MemberOption.connectedComponent}). */
  connectedComponent?: number;
}

/** The `connectedComponent` (join-graph id) of a cube/view, or undefined. */
function componentOf(c: { connectedComponent?: number }): number | undefined {
  return typeof c.connectedComponent === "number" ? c.connectedComponent : undefined;
}

function isPublic(m: { public?: boolean; isVisible?: boolean }): boolean {
  // `public` is the modern flag; fall back to the deprecated `isVisible`; default visible.
  if (m.public !== undefined) return m.public;
  if (m.isVisible !== undefined) return m.isVisible;
  return true;
}

/** Cubes + views from meta, visible only, tagged cube/view. */
export function listCubes(meta: CubeMeta | undefined): CubeOption[] {
  if (!meta) return [];
  return meta.cubes
    .filter((c) => isPublic(c))
    .map((c: Cube) => ({
      name: c.name,
      title: c.title ?? c.name,
      type: c.type === "view" ? ("view" as const) : ("cube" as const),
      connectedComponent: componentOf(c as { connectedComponent?: number }),
    }));
}

/** A single cube/view's option (title, type, join-graph id) by name. */
export function findCube(meta: CubeMeta | undefined, name: string | undefined): CubeOption | undefined {
  if (!meta || !name) return undefined;
  return listCubes(meta).find((c) => c.name === name);
}

function toLabel(m: { shortTitle?: string; title?: string; name: string }): string {
  return m.shortTitle || m.title || m.name;
}

/** Read a string-valued key off a member `meta` blob (undefined when absent/non-string). */
function metaString(meta: Record<string, unknown> | undefined, key: string): string | undefined {
  const v = meta?.[key];
  return typeof v === "string" ? v : undefined;
}

function measureToOption(m: TCubeMeasure, cube: string): MemberOption {
  const meta = m.meta as Record<string, unknown> | undefined;
  return {
    name: m.name,
    label: toLabel(m),
    title: m.title ?? m.name,
    shortTitle: m.shortTitle ?? m.name,
    type: "number",
    memberType: "measure",
    cube,
    description: m.description,
    meta,
    quantity: metaString(meta, "quantity"),
    unit: metaString(meta, "unit"),
  };
}

function dimensionToOption(m: TCubeDimension, cube: string): MemberOption {
  const meta = m.meta as Record<string, unknown> | undefined;
  return {
    name: m.name,
    label: toLabel(m),
    title: m.title ?? m.name,
    shortTitle: m.shortTitle ?? m.name,
    type: m.type,
    memberType: "dimension",
    cube,
    description: m.description,
    meta,
    quantity: metaString(meta, "quantity"),
    unit: metaString(meta, "unit"),
  };
}

function segmentToOption(m: TCubeSegment, cube: string): MemberOption {
  return {
    name: m.name,
    label: toLabel(m),
    title: m.title ?? m.name,
    shortTitle: m.shortTitle ?? m.name,
    type: "segment",
    memberType: "segment",
    cube,
    description: m.description,
    meta: m.meta as Record<string, unknown> | undefined,
  };
}

/**
 * Flatten meta into the member options matching `kind`, restricted to `cube` when
 * given. `"dimension"`/`"dimensionOrMeasure"` exclude time dimensions; `"time"`
 * returns only `type === "time"` dimensions; `"measure"` returns measures only.
 */
export function listMembers(
  meta: CubeMeta | undefined,
  kind: MemberKind,
  cube?: string,
): MemberOption[] {
  if (!meta) return [];
  const out: MemberOption[] = [];

  for (const c of meta.cubes) {
    if (!isPublic(c)) continue;
    if (cube && c.name !== cube) continue;
    const comp = componentOf(c as { connectedComponent?: number });
    const push = (o: MemberOption): void => {
      o.connectedComponent = comp;
      out.push(o);
    };

    if (kind === "measure" || kind === "dimensionOrMeasure") {
      for (const m of c.measures) {
        if (isPublic(m)) push(measureToOption(m, c.name));
      }
    }
    if (kind === "dimension" || kind === "dimensionOrMeasure") {
      for (const d of c.dimensions) {
        if (isPublic(d) && d.type !== "time") push(dimensionToOption(d, c.name));
      }
    }
    if (kind === "time") {
      for (const d of c.dimensions) {
        if (isPublic(d) && d.type === "time") push(dimensionToOption(d, c.name));
      }
    }
  }

  return out;
}

/** Segment options (boolean named filters) across the visible cubes, restricted to
 *  `cubes` (the chart's join scope) when given. Segments are applied via query.segments. */
export function listSegments(meta: CubeMeta | undefined, cubes?: string[]): MemberOption[] {
  if (!meta) return [];
  const allow = cubes ? new Set(cubes) : undefined;
  const out: MemberOption[] = [];
  for (const c of meta.cubes) {
    if (!isPublic(c)) continue;
    if (allow && !allow.has(c.name)) continue;
    const comp = componentOf(c as { connectedComponent?: number });
    for (const s of c.segments) {
      if (!isPublic(s)) continue;
      const o = segmentToOption(s, c.name);
      o.connectedComponent = comp;
      out.push(o);
    }
  }
  return out;
}

/** Find a single member option by its verbatim name. */
export function findMember(
  meta: CubeMeta | undefined,
  name: string | undefined,
): MemberOption | undefined {
  if (!meta || !name) return undefined;
  for (const c of meta.cubes) {
    const comp = componentOf(c as { connectedComponent?: number });
    const tag = (o: MemberOption | undefined): MemberOption | undefined => {
      if (o) o.connectedComponent = comp;
      return o;
    };
    const found =
      c.measures.find((m) => m.name === name) ??
      c.dimensions.find((d) => d.name === name);
    if (found) {
      return found.type
        ? "aggType" in found
          ? tag(measureToOption(found as TCubeMeasure, c.name))
          : tag(dimensionToOption(found as TCubeDimension, c.name))
        : undefined;
    }
    const seg = c.segments.find((s) => s.name === name);
    if (seg) return tag(segmentToOption(seg, c.name));
  }
  return undefined;
}

/**
 * Operators valid for a member's primitive type (docs/03 §A3.1 step 5).
 * `set`/`notSet` are universal; the rest are type-scoped. Segments are membership
 * toggles and have no leaf operators (caller handles segments separately).
 */
export function operatorsForType(
  type: MemberOption["type"] | undefined,
): FilterOperator[] {
  const universal: FilterOperator[] = ["set", "notSet"];
  switch (type) {
    case "string":
      return [
        "equals",
        "notEquals",
        "contains",
        "notContains",
        "startsWith",
        "endsWith",
        ...universal,
      ];
    case "number":
      return ["equals", "notEquals", "gt", "gte", "lt", "lte", ...universal];
    case "boolean":
      return ["equals", "notEquals", ...universal];
    case "time":
      return [
        "inDateRange",
        "notInDateRange",
        "beforeDate",
        "beforeOrOnDate",
        "afterDate",
        "afterOrOnDate",
        ...universal,
      ];
    default:
      return ["equals", "notEquals", ...universal];
  }
}

/** Operators that take no value(s) — the value editor hides for these. */
export const VALUELESS_OPERATORS: ReadonlySet<FilterOperator> = new Set<FilterOperator>([
  "set",
  "notSet",
]);

/** Human labels for operators (used by the FilterBuilder operator select). */
export const OPERATOR_LABELS: Record<FilterOperator, string> = {
  equals: "equals",
  notEquals: "does not equal",
  gt: "greater than",
  gte: "greater than or equal",
  lt: "less than",
  lte: "less than or equal",
  contains: "contains",
  notContains: "does not contain",
  startsWith: "starts with",
  endsWith: "ends with",
  set: "is set",
  notSet: "is not set",
  inDateRange: "in date range",
  notInDateRange: "not in date range",
  beforeDate: "before",
  beforeOrOnDate: "before or on",
  afterDate: "after",
  afterOrOnDate: "after or on",
  measureFilter: "measure filter",
};
