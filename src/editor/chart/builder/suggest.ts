import type { ChartFamily, ChartSpec } from "@/spec";

import type { ChartFamilyDescriptor, FamilyRegistry } from "@/charts";

import {
  channelFitScore,
  isChannelWell,
  wellAccepts,
  type Channel,
  type FieldKind,
  type WellDef,
} from "./channels";
import { placeField } from "./wells";

/**
 * Chart Builder v4 — FIT RANKING (the "Suggested types" model).
 *
 * The channel model gave every family a machine-readable shape (`wells` carrying a
 * `target` + a `channel`). This module turns that shape into the ONE thing a
 * non-technical user actually needs from a type picker: *which of these eight tiles
 * is right for the fields I already have?*
 *
 * The heuristic is deliberately small and entirely DESCRIPTOR-DRIVEN — it hardcodes
 * no family key, so a host family registered via `<CubeVizProvider families>` is
 * ranked by exactly the same rules as `bar`:
 *
 *   score = structuralFit          // channelFitScore, normalized by the family's own max
 *         − 0.35 × wastedFields    // fields the family genuinely cannot show
 *         + timeAffinity           // how this family treats a date
 *         − detailOnlyDiscount     // a table can always "fit"; it rarely *suggests*
 *
 * Why normalize: {@link channelFitScore} pays +3 per filled required well, so a
 * family with more wells always out-scores a simpler one that fits perfectly (a
 * heatmap would beat a KPI for a lone measure). Dividing by the family's own maximum
 * asks "how much of THIS chart did your fields fill?", which is the question a
 * suggestion answers.
 *
 * LANGUAGE RULE: every string this module produces is shown to a non-technical user.
 * It speaks in tasks and field names ("Rows needs a category", "2 measures over
 * time") and never in grammar ("channel", "encoding", "pivot").
 */

/* ──────────────────────────── the field shape ─────────────────────────────── */

/** A field the user has already put on the chart, with the role Cube gives it. */
export interface FieldRef {
  member: string;
  kind: FieldKind;
}

/**
 * The user's CURRENT field shape, read from the query rather than the chart — the
 * query is the one place every family agrees on (scatter/kpi/table park their
 * members in `familyOptions`, so reading the mapping would under-count them).
 *
 * Ordered measures → dates → categories, which is also the order the greedy well
 * matcher consumes: a well that takes "a date or category" prefers the date, so a
 * cartesian X comes up chronological.
 *
 * A time dimension with NO granularity is a date *filter*, not a time axis (the same
 * rule `ChartEditor` uses to decide a query is renderable), so it is not a field.
 */
export function fieldShape(spec: ChartSpec): FieldRef[] {
  const query = spec.query ?? {};
  const out: FieldRef[] = [];
  for (const m of query.measures ?? []) out.push({ member: m, kind: "number" });
  for (const td of query.timeDimensions ?? []) {
    if (td.granularity !== undefined) out.push({ member: td.dimension, kind: "time" });
  }
  for (const d of query.dimensions ?? []) out.push({ member: d, kind: "category" });
  return out;
}

/* ─────────────────────────── the greedy well matcher ──────────────────────── */

/** One well's outcome against the field pool. */
interface WellMatch {
  well: WellDef;
  /** The kinds this well consumed (empty ⇒ nothing available for it). */
  kinds: FieldKind[];
  /** The members this well consumed, in order. */
  members: string[];
}

interface Assignment {
  matched: WellMatch[];
  /** Required wells nothing could fill — the reason a family does not fit. */
  missing: WellDef[];
  /** Fields no well took. */
  leftover: FieldRef[];
}

/**
 * Hand each field to the first well (top→bottom) that accepts its kind — the SAME
 * greedy walk {@link channelFitScore} scores, so the score, the "fits" verdict, the
 * human reason and the tile preview all describe one consistent assignment.
 *
 * A `many` well keeps taking (a bar's Values well absorbs every measure); a `one`
 * well takes exactly one. Host-managed wells (no `target`) are skipped — the
 * interpreter cannot reason about them.
 */
function assign(wells: readonly WellDef[], fields: readonly FieldRef[]): Assignment {
  const pool = [...fields];
  const matched: WellMatch[] = [];
  const missing: WellDef[] = [];

  for (const well of wells) {
    if (!isChannelWell(well)) continue;
    const limit = well.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY;
    const kinds: FieldKind[] = [];
    const members: string[] = [];
    for (let i = 0; i < pool.length && kinds.length < limit; ) {
      if (wellAccepts(well, pool[i].kind)) {
        kinds.push(pool[i].kind);
        members.push(pool[i].member);
        pool.splice(i, 1);
      } else {
        i += 1;
      }
    }
    if (kinds.length > 0) matched.push({ well, kinds, members });
    else if (!well.optional) missing.push(well);
  }
  return { matched, missing, leftover: pool };
}

/** The best score a family could reach: every required well filled, every optional too. */
function maxFitScore(wells: readonly WellDef[]): number {
  let max = 0;
  for (const well of wells) {
    if (!isChannelWell(well)) continue;
    max += well.optional ? 1 : 3;
  }
  return max;
}

/** Could ANY well still absorb another field of this kind (a `many` well)? */
function absorbable(wells: readonly WellDef[], kind: FieldKind): boolean {
  return wells.some((w) => isChannelWell(w) && w.cardinality === "many" && wellAccepts(w, kind));
}

/* ──────────────────────────────── the scoring ─────────────────────────────── */

/** A wasted field costs this much of the family's normalized fit. */
const WASTE_PENALTY = 0.35;
/** A family that only shows fields as DETAIL (a table) is a fallback, not a suggestion. */
const DETAIL_ONLY_DISCOUNT = 0.4;
/** A family that declares a canonical time well is built for dates. */
const TIME_FIRST_BONUS = 0.3;
/** Any other family with a continuous (cartesian) X handles dates well enough. */
const CARTESIAN_TIME_BONUS = 0.1;
/** A family that would turn dates into slices / rows reads badly as a time chart. */
const TIME_AS_CATEGORY_PENALTY = 0.3;
/** A time-first family asked to plot pure categories is a slightly odd pick. */
const TIME_FIRST_WITHOUT_TIME_PENALTY = 0.2;

/**
 * How the family treats a DATE, from its descriptor alone:
 *  - it names a canonical time well (line / area, a host map's path order) → built for it;
 *  - else it has a continuous cartesian X (bar) → fine, just not its default;
 *  - else its X-channel well would still swallow the date (pie slices, heatmap
 *    columns) → the date becomes a pile of labels, which is what we steer away from.
 */
function timeAffinity(descriptor: ChartFamilyDescriptor, hasTime: boolean): number {
  const timeFirst = descriptor.canonicalTimeWell !== undefined;
  if (!hasTime) return timeFirst ? -TIME_FIRST_WITHOUT_TIME_PENALTY : 0;
  if (timeFirst) return TIME_FIRST_BONUS;
  if (descriptor.supportsCartesianAxes) return CARTESIAN_TIME_BONUS;
  const xTakesTime = descriptor.wells.some(
    (w) => isChannelWell(w) && w.channel === "x" && wellAccepts(w, "time"),
  );
  return xTakesTime ? -TIME_AS_CATEGORY_PENALTY : 0;
}

/** True when every channel well is pure DETAIL — the family lists fields, it doesn't plot them. */
function detailOnly(wells: readonly WellDef[]): boolean {
  const channels = wells.filter(isChannelWell);
  return channels.length > 0 && channels.every((w) => w.channel === "detail");
}

/* ────────────────────────────── human reasons ─────────────────────────────── */

/** What a well is still waiting for, in the user's words (mirrors `placementBlockReason`). */
function wants(well: WellDef): string {
  if (well.kinds.includes("number")) return "a measure";
  if (well.kinds.includes("time")) {
    return well.kinds.includes("category") ? "a date or category" : "a date";
  }
  return "a category";
}

const plural = (n: number, one: string, many: string): string => (n === 1 ? one : many);

/**
 * A SHORT line telling the user why this type is (or is not) a fit. Derived from the
 * assignment, so it stays true for host families too.
 */
function reasonFor(descriptor: ChartFamilyDescriptor, a: Assignment): string {
  if (a.missing.length > 0) {
    const well = a.missing[0];
    return `${well.label} needs ${wants(well)}`;
  }

  const byChannel = new Map<Channel, FieldKind[]>();
  let measures = 0;
  for (const m of a.matched) {
    measures += m.kinds.filter((k) => k === "number").length;
    if (m.well.channel) {
      byChannel.set(m.well.channel, [...(byChannel.get(m.well.channel) ?? []), ...m.kinds]);
    }
  }
  const x = byChannel.get("x") ?? [];
  const y = byChannel.get("y") ?? [];
  const nMeasures = `${measures} ${plural(measures, "measure", "measures")}`;

  if (detailOnly(descriptor.wells)) return "Every field, row by row";
  if (byChannel.has("row")) return "A grid of two categories";
  if (x.includes("number") && y.includes("number")) return "One measure against another";
  if (x.includes("time")) return `${nMeasures} over time`;
  if (x.includes("category")) {
    return byChannel.has("color")
      ? `${nMeasures} by category, split in colours`
      : `${nMeasures} by category`;
  }
  if (measures === 1) return "One headline number";
  if (measures > 1) return `${nMeasures}, no breakdown`;
  return "Fits your fields";
}

/* ──────────────────────────────── the ranking ─────────────────────────────── */

/** One family's verdict against the current field shape. */
export interface FamilyFit {
  family: ChartFamily;
  descriptor: ChartFamilyDescriptor;
  /** Higher is a better fit. ~1.0 = this family is exactly what the fields want. */
  score: number;
  /** Every REQUIRED well can be filled from the current fields — the chart would draw. */
  fits: boolean;
  /** A short, non-technical line: why this type, or what it is still missing. */
  reason: string;
}

/**
 * Rank every non-query-less family against the spec's current field shape, best
 * first (ties broken by the picker's own `order`, so the grid stays predictable).
 *
 * Query-less families (a host AI tile) are omitted: they render from their own
 * state, so "does it fit the fields" is not a question about them.
 */
export function rankFamilies(registry: FamilyRegistry, spec: ChartSpec): FamilyFit[] {
  const fields = fieldShape(spec);
  const kinds = fields.map((f) => f.kind);
  const hasTime = kinds.includes("time");

  const out: FamilyFit[] = [];
  for (const descriptor of registry.list()) {
    if (descriptor.queryless) continue;
    const wells = descriptor.wells;
    const a = assign(wells, fields);
    const max = maxFitScore(wells);

    // `channelFitScore` charges 0.5 per field it could not place, but it only ever
    // places ONE field per well — so a bar's `many` Values well looks like it wasted
    // every measure after the first. Refund that charge (it consumed exactly one
    // field per matched well) so the structural term is purely "how much of this
    // chart did your fields fill", then charge our own kind-aware waste below.
    const unplaced = Math.max(0, fields.length - a.matched.length);
    const raw = channelFitScore(wells, kinds) + 0.5 * unplaced;
    const structural = max > 0 ? raw / max : 0;

    // A leftover DATE is never waste — it is the chart's date range. A leftover field
    // a `many` well would still absorb is not waste either (channelFitScore only ever
    // matches one field per well, so it under-counts those).
    const wasted = a.leftover.filter(
      (f) => f.kind !== "time" && !absorbable(wells, f.kind),
    ).length;

    const score =
      structural -
      WASTE_PENALTY * wasted +
      timeAffinity(descriptor, hasTime) -
      (detailOnly(wells) ? DETAIL_ONLY_DISCOUNT : 0);

    out.push({
      family: descriptor.family,
      descriptor,
      score: Math.round(score * 1000) / 1000,
      fits: max > 0 && a.missing.length === 0,
      reason: reasonFor(descriptor, a),
    });
  }

  return out.sort((a, b) => b.score - a.score || a.descriptor.order - b.descriptor.order);
}

/**
 * The families to show under "Suggested": the best-fitting ones that would actually
 * draw. Empty when nothing is placed yet — there is nothing to suggest FROM, and a
 * confident-looking suggestion built on no evidence is worse than none.
 */
export function suggestedFamilies(ranked: readonly FamilyFit[], limit = 3): FamilyFit[] {
  return ranked.filter((f) => f.fits).slice(0, limit);
}

/* ───────────────────────── preview spec construction ──────────────────────── */

/**
 * Re-bind the user's CURRENT fields into `family`'s wells, returning a spec that
 * family can actually draw — what each tile in the type picker previews.
 *
 * This is deliberately NOT `migrateToFamily`: that preserves the user's intent by
 * matching channels (so flipping types is lossless), which means a field whose
 * channel has no home in the destination is intentionally dropped. For a PREVIEW we
 * want the opposite — the most flattering arrangement this family could make of
 * these fields — so we reuse the same greedy well matcher the ranking scores. A
 * bar's colour split therefore shows up as the heatmap's rows, which is exactly what
 * the user would get after one drag.
 */
export function previewSpecFor(
  registry: FamilyRegistry,
  spec: ChartSpec,
  family: ChartFamily,
): ChartSpec {
  const descriptor = registry.require(family);
  const a = assign(descriptor.wells, fieldShape(spec));
  let next: ChartSpec = {
    ...spec,
    chart: { family, mapping: undefined, familyOptions: undefined },
  };
  for (const m of a.matched) {
    m.members.forEach((member, i) => {
      next = placeField(next, family, m.well.id, member, m.kinds[i], registry);
    });
  }
  return next;
}
