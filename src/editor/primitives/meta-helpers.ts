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
export type MemberKind =
  | "measure"
  | "dimension"
  | "dimensionOrMeasure"
  | "time"
  | "numberDimension"
  | "geoPoint";

/** A flattened, UI-ready member descriptor (identity = `name`, read verbatim). */
export interface MemberOption {
  /** Fully-qualified member name, VERBATIM from meta. The value we emit. */
  name: string;
  /** Best human label: `shortTitle ?? title ?? name`. */
  label: string;
  title: string;
  shortTitle: string;
  /** Cube primitive type. Segments and synthetic geo points report their own kind. */
  type: "time" | "number" | "string" | "boolean" | "segment" | "geoPoint";
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
   * Cube's weak `connectedComponent` for the owning cube. This is descriptive only;
   * field visibility uses explicit cube `meta.joinTargets` because sibling facts in
   * one component are not necessarily query-joinable. `undefined` = isolated cube.
   */
  connectedComponent?: number;
  /** Coordinate members carried only by a synthetic `geoPoint` option. */
  latMember?: string;
  lngMember?: string;
}

/** A cube or view entry for the CubePicker. */
export interface CubeOption {
  name: string;
  title: string;
  /** "cube" | "view" — defaults to "cube" when meta omits `type`. */
  type: "cube" | "view";
  /** Join-graph id (see {@link MemberOption.connectedComponent}). */
  connectedComponent?: number;
  /** Direct outbound join targets declared in cube `meta.joinTargets`. */
  joinTargets: string[];
  /**
   * Model-authored table CATEGORY, read from cube-level `meta.category` (e.g.
   * "Vehicle activity", "Maintenance"). Table pickers group and head tables by it so
   * a long flat table list reads as a small set of subject areas. Undefined when the
   * model declares none — callers bucket those under a trailing fallback group.
   */
  category?: string;
  /**
   * Field-atlas mount slug from cube `meta.path` (e.g. "trips", "maintenance").
   * Cubes sharing a path render under ONE atlas heading ({@link pathLabel}) — that is
   * how a two-grain subject (maintenance records + schedules) stays one menu branch.
   * Undefined ⇒ the cube falls back to `category` grouping.
   */
  path?: string;
  /**
   * Human grain sentence from cube `meta.grain` (e.g. "one row per trip"). Shown
   * under the table heading so "which rows am I counting?" is answered before the
   * first field is picked; also feeds {@link grainAggLabel}.
   */
  grain?: string;
}

/** The `connectedComponent` (join-graph id) of a cube/view, or undefined. */
function componentOf(c: { connectedComponent?: number }): number | undefined {
  return typeof c.connectedComponent === "number" ? c.connectedComponent : undefined;
}

function joinTargetsOf(c: { meta?: unknown }): string[] {
  if (!c.meta || typeof c.meta !== "object") return [];
  const targets = (c.meta as Record<string, unknown>).joinTargets;
  return Array.isArray(targets) ? targets.filter((v): v is string => typeof v === "string") : [];
}

/** Cube-level `meta.category` (see {@link CubeOption.category}); undefined when absent. */
function categoryOf(c: { meta?: unknown }): string | undefined {
  return cubeMetaString(c, "category");
}

/** Read a non-empty string key off a CUBE-level `meta` blob. */
function cubeMetaString(c: { meta?: unknown }, key: string): string | undefined {
  if (!c.meta || typeof c.meta !== "object") return undefined;
  const v = (c.meta as Record<string, unknown>)[key];
  return typeof v === "string" && v.length > 0 ? v : undefined;
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
      joinTargets: joinTargetsOf(c),
      category: categoryOf(c),
      path: cubeMetaString(c, "path"),
      grain: cubeMetaString(c, "grain"),
    }));
}

/** Humanize an atlas path slug for a heading: "engine-health" → "Engine health". */
export function pathLabel(path: string): string {
  const words = path.replace(/[-_]+/g, " ").trim();
  return words.length > 0 ? words[0].toUpperCase() + words.slice(1) : path;
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

/**
 * A member's semantic GROUP label, read from Cube member `meta.group` (e.g. "Fuel",
 * "Safety", "Location"). The model authors this to organize a long member list into
 * intuitive sections; the field pickers render it as collapsible/labelled groups.
 * Undefined when the member carries no `meta.group` — callers fall back to a kind /
 * cube bucket so ungrouped members still appear.
 */
export function memberGroup(o: { meta?: Record<string, unknown> }): string | undefined {
  return metaString(o.meta, "group");
}

/** Display name and pairing key for a model-authored coordinate pair. */
export function memberGeoPoint(o: { meta?: Record<string, unknown> }): string | undefined {
  return metaString(o.meta, "geoPoint");
}

/** A coordinate member's role inside its `geoPoint` pair. */
export function memberGeoRole(
  o: { meta?: Record<string, unknown> },
): "latitude" | "longitude" | undefined {
  const role = metaString(o.meta, "geoRole");
  return role === "latitude" || role === "longitude" ? role : undefined;
}

/** Stable synthetic member id reproducible from the stored lat/lng pair alone. */
export function geoPointId(latMember: string, lngMember: string): string {
  return `geoPoint:${encodeURIComponent(latMember)}:${encodeURIComponent(lngMember)}`;
}

/**
 * Whether a member is its cube's CANONICAL time axis — Cube member meta
 * `canonicalTime: true`, authored on exactly one time dimension per cube (the
 * primary domain event time, e.g. `device_locations.timestamp`). Consumers use it
 * to sort/badge the member first in date pickers and to auto-fill empty time wells
 * so users don't have to pick "the" time axis themselves.
 */
export function memberCanonicalTime(o: { meta?: Record<string, unknown> }): boolean {
  return o.meta?.canonicalTime === true;
}

/**
 * The cube's canonical time dimension (see {@link memberCanonicalTime}), or
 * undefined when the cube doesn't declare one (e.g. config-style cubes whose only
 * time is an archive/creation stamp).
 */
export function canonicalTimeOf(
  meta: CubeMeta | undefined,
  cube: string | undefined,
): MemberOption | undefined {
  if (!cube) return undefined;
  return listMembers(meta, "time", cube).find(memberCanonicalTime);
}

/**
 * Group members by their {@link memberGroup} (`meta.group`), preserving first-appearance
 * order. Grouping is case-INSENSITIVE (so "Trip metrics" and "Trip Metrics" merge under
 * the first-seen label). Members without a group fall under `fallbackLabel(member)`
 * (e.g. their kind label, or the owning cube). Returns `[label, members][]` in a stable
 * order — group label first-seen order, members in their incoming (meta) order.
 */
export function groupMembersByMeta(
  members: MemberOption[],
  fallbackLabel: (m: MemberOption) => string,
): [string, MemberOption[]][] {
  const order: string[] = [];
  const byKey = new Map<string, { label: string; items: MemberOption[] }>();
  for (const m of members) {
    const g = memberGroup(m);
    const key = g ? `g:${g.toLowerCase()}` : `f:${fallbackLabel(m)}`;
    let entry = byKey.get(key);
    if (!entry) {
      entry = { label: g ?? fallbackLabel(m), items: [] };
      byKey.set(key, entry);
      order.push(key);
    }
    entry.items.push(m);
  }
  return order.map((k) => [byKey.get(k)!.label, byKey.get(k)!.items] as [string, MemberOption[]]);
}

/* ── Aggregate families ────────────────────────────────────────────────────────
 * The model publishes total/avg/max variants of one quantity as SEPARATE members
 * (member names are public API — saved specs store them), linked by member meta:
 *   family: "cost"            — the family key, unique within the cube
 *   agg: "total" | "avg" | "min" | "max" | "median" | "fleet" | "value"
 *   aggDefault: true          — on exactly one measure (the canonical pick)
 *   familyTitle: "Cost"       — on the default (the collapsed row's label)
 * "value" marks the family's ROW-LEVEL dimension (one number per record). The field
 * picker renders a family as ONE row with an aggregation pill; queries still carry
 * the concrete member name, so nothing about the wire format changes.
 */

/** The member's aggregation label within its family (undefined = not in a family). */
export function memberAgg(o: { meta?: Record<string, unknown> }): string | undefined {
  return metaString(o.meta, "agg");
}

/** The member's family key, namespaced by cube (families are per-cube). */
export function familyKeyOf(o: Pick<MemberOption, "cube" | "meta">): string | undefined {
  const family = metaString(o.meta, "family");
  return family ? `${o.cube}:${family}` : undefined;
}

/** Whether this member is its family's model-declared default aggregation. */
export function memberAggDefault(o: { meta?: Record<string, unknown> }): boolean {
  return o.meta?.aggDefault === true;
}

/** The family's display label, authored on the default member. */
export function memberFamilyTitle(o: { meta?: Record<string, unknown> }): string | undefined {
  return metaString(o.meta, "familyTitle");
}

/**
 * The pill label for a "value" (row-level) variant, derived from the cube's grain so
 * it names the actual row: "one row per trip" → "per trip". Falls back to "per row"
 * when the model declares no grain.
 */
export function grainAggLabel(grain: string | undefined): string {
  const m = grain?.match(/per\s+(.+)$/i);
  return m ? `per ${m[1]}` : "per row";
}

/** One collapsed picker row: a lone member, or a family of aggregation variants. */
export interface FamilyRow<T extends { option: MemberOption }> {
  /** Set only when ≥2 variants collapsed (the pill renders for these). */
  familyKey?: string;
  /** Row label: the model's familyTitle for a family, the member label otherwise. */
  label: string;
  /** Variants in incoming order (a lone member has exactly one). */
  variants: T[];
  /** The variant to lead with: model default, else first addable, else first. */
  defaultIndex: number;
}

/**
 * Collapse a candidate list into picker rows: candidates sharing a (cube, family)
 * merge into one row; everything else passes through untouched. Order is stable —
 * a family row sits where its first variant appeared.
 */
export function collapseFamilies<T extends { option: MemberOption; reason?: string }>(
  items: T[],
): FamilyRow<T>[] {
  const rows: FamilyRow<T>[] = [];
  const byFamily = new Map<string, FamilyRow<T>>();
  for (const item of items) {
    const key = familyKeyOf(item.option);
    if (!key) {
      rows.push({ label: item.option.label, variants: [item], defaultIndex: 0 });
      continue;
    }
    let row = byFamily.get(key);
    if (!row) {
      row = { familyKey: key, label: item.option.label, variants: [], defaultIndex: 0 };
      byFamily.set(key, row);
      rows.push(row);
    }
    row.variants.push(item);
  }
  for (const row of rows) {
    if (!row.familyKey) continue;
    // A "family" of one renders as a plain row (no pill) but keeps its clean title.
    const titled = row.variants.find((v) => memberFamilyTitle(v.option));
    const def = row.variants.findIndex((v) => memberAggDefault(v.option));
    const addable = row.variants.findIndex((v) => v.reason === undefined);
    row.defaultIndex = def >= 0 ? def : addable >= 0 ? addable : 0;
    row.label =
      memberFamilyTitle(titled?.option ?? {}) ?? row.variants[row.defaultIndex].option.label;
    if (row.variants.length < 2) row.familyKey = undefined;
  }
  return rows;
}

/**
 * The short TYPE/UNIT badge for a member row — what a field HOLDS, in the user's own
 * words, replacing the old glyph-per-type icons (a `#` or `T` said nothing to a fleet
 * manager). Numbers show their unit ("km", "L", "min", "%"), counts show "#", and the
 * unit-less types name themselves ("text", "date", "yes/no"). `displayUnit` converts a
 * storage unit to the viewer's unit system ("km" → "mi") so the badge matches what the
 * chart will actually render; pass nothing to show storage units.
 */
export function fieldBadge(
  option: Pick<MemberOption, "type" | "unit" | "quantity">,
  displayUnit?: (unit?: string) => string | undefined,
): string {
  switch (option.type) {
    case "time":
      return "date";
    case "boolean":
      return "yes/no";
    case "geoPoint":
      return "map";
    case "segment":
      return "filter";
    case "number": {
      // Durations are rendered humanized ("2d 19h", "45m 12s"), so their STORAGE
      // unit ("h", "min", "ms") is an implementation detail the badge must not
      // leak — it reads as a promise about the display. One generic word for all
      // of them; "date" (above) stays reserved for calendar timestamps.
      if (option.quantity === "time") return "time";
      const unit = displayUnit?.(option.unit) ?? option.unit;
      if (!unit || unit === "count") return "#";
      return unit;
    }
    default:
      return "text";
  }
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

function geoPointOptions(c: Cube, connectedComponent: number | undefined): MemberOption[] {
  const groups = new Map<string, TCubeDimension[]>();
  for (const d of c.dimensions) {
    const meta = d.meta as Record<string, unknown> | undefined;
    const point = memberGeoPoint({ meta });
    if (!point || !isPublic(d)) continue;
    groups.set(point, [...(groups.get(point) ?? []), d]);
  }

  const out: MemberOption[] = [];
  for (const [label, members] of groups) {
    const lat = members.filter(
      (d) =>
        d.type === "number" &&
        memberGeoRole({ meta: d.meta as Record<string, unknown> | undefined }) === "latitude",
    );
    const lng = members.filter(
      (d) =>
        d.type === "number" &&
        memberGeoRole({ meta: d.meta as Record<string, unknown> | undefined }) === "longitude",
    );
    // Malformed declarations stay invisible as bundles; their raw dimensions remain available.
    if (members.length !== 2 || lat.length !== 1 || lng.length !== 1) continue;
    out.push({
      name: geoPointId(lat[0].name, lng[0].name),
      label,
      title: label,
      shortTitle: label,
      type: "geoPoint",
      memberType: "dimension",
      cube: c.name,
      connectedComponent,
      latMember: lat[0].name,
      lngMember: lng[0].name,
    });
  }
  return out;
}

/**
 * Flatten meta into the member options matching `kind`, restricted to `cube` when
 * given. `"dimension"`/`"dimensionOrMeasure"` exclude time dimensions; `"time"`
 * returns only `type === "time"` dimensions; `"measure"` returns measures only;
 * `"numberDimension"` returns only `type === "number"` dimensions (raw per-row
 * numbers like coordinates); `"geoPoint"` returns one synthetic option per valid
 * model-authored latitude/longitude pair.
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

    if (kind === "geoPoint") {
      out.push(...geoPointOptions(c, comp));
      continue;
    }

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
    if (kind === "numberDimension") {
      for (const d of c.dimensions) {
        if (isPublic(d) && d.type === "number") push(dimensionToOption(d, c.name));
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
  return listMembers(meta, "geoPoint").find((o) => o.name === name);
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
