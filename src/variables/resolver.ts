import {
  isVarRef,
  type CubeQuery,
  type LeafFilter,
  type QueryFilter,
  type Scalar,
  type TimeDimension,
  type VariableDecl,
  type VariableValue,
} from "@/spec";

/**
 * The variable resolver — legs 2 & 3 of the binding model, plus the `noFilter`
 * fail-safe rule. Pure, framework-free. See docs/01-spec-schema.md §5.
 *
 * Leg 2 (READ into data): {@link resolveQuery} deep-walks a `CubeQuery`, replaces
 * every `{var:"name"}` token with `store[name] ?? decl.default`, then drops any
 * filter / time-dimension field whose token resolved to *empty* — the result is a
 * literal-only query safe to POST to `/v1/load`.
 *
 * Leg 3 (READ into control): {@link resolveValue} reads a single variable back the
 * same way, so an Input control reflects the same value it writes.
 *
 * The rule is strictly narrowing-or-neutral: an unset variable can only *remove* a
 * predicate, never widen scope. RLS is orthogonal and lives in the JWT, untouchable
 * by anything here.
 */

/* ───────────────────────────── emptiness ─────────────────────────────────── */

/**
 * The single source of truth for "this resolved value contributes nothing."
 * Treats `undefined`, `null`, empty string, and empty array as empty. A `0` or
 * `false` is a real value (a filter on `count = 0` or `flag = false` is valid).
 */
export function isEmptyValue(v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (typeof v === "string") return v.length === 0;
  if (Array.isArray(v)) return v.length === 0;
  return false;
}

/* ───────────────────────────── single value ──────────────────────────────── */

const declMap = (decls: VariableDecl[]): Map<string, VariableDecl> => {
  const m = new Map<string, VariableDecl>();
  for (const d of decls) m.set(d.name, d);
  return m;
};

/**
 * Leg-3 read-back: resolve one variable name to its current value using the
 * default-resolution order — store value, else decl default, else `undefined`.
 */
export function resolveValue(
  name: string,
  store: Record<string, VariableValue>,
  decls: VariableDecl[],
): VariableValue | undefined {
  if (Object.prototype.hasOwnProperty.call(store, name) && store[name] !== undefined) {
    return store[name];
  }
  return decls.find((d) => d.name === name)?.default;
}

/** Resolve one value position: a `VarRef` token → its value, anything else passthrough. */
function resolveToken<T>(value: T, decls: Map<string, VariableDecl>, store: Record<string, VariableValue>): T | VariableValue | undefined {
  if (isVarRef(value)) {
    const name = value.var;
    if (Object.prototype.hasOwnProperty.call(store, name) && store[name] !== undefined) {
      return store[name];
    }
    return decls.get(name)?.default;
  }
  return value;
}

/* ───────────────────────────── filters ───────────────────────────────────── */

/**
 * Resolve a leaf filter's `values` array. Each entry may be a literal scalar or a
 * `VarRef`. An array-valued variable (multi-select) flattens into the values list.
 * Returns the cleaned scalar array, or `undefined` if the filter must be dropped.
 *
 * Operators `set` / `notSet` legitimately carry no values, so they survive an empty
 * `values` and are never dropped by this rule.
 */
function resolveLeafFilter(
  filter: LeafFilter,
  decls: Map<string, VariableDecl>,
  store: Record<string, VariableValue>,
): LeafFilter | undefined {
  const valueless = filter.operator === "set" || filter.operator === "notSet";

  if (filter.values === undefined) {
    // No values authored: valueless operators survive (sans `values`), others drop.
    return valueless ? { member: filter.member, operator: filter.operator } : undefined;
  }

  const out: Scalar[] = [];
  for (const entry of filter.values) {
    const resolved = resolveToken(entry, decls, store);
    if (isEmptyValue(resolved)) continue;
    if (Array.isArray(resolved)) {
      // Multi-select variable: spread its members in, skipping empties.
      for (const item of resolved) {
        if (!isEmptyValue(item)) out.push(item);
      }
    } else {
      out.push(resolved as Scalar);
    }
  }

  if (out.length === 0) {
    // No surviving values: keep only valueless operators (without `values`); drop the rest.
    return valueless ? { member: filter.member, operator: filter.operator } : undefined;
  }
  return { member: filter.member, operator: filter.operator, values: out };
}

/** Resolve a filter node (leaf or and/or group), dropping empties and collapsing emptied groups. */
function resolveFilter(
  filter: QueryFilter,
  decls: Map<string, VariableDecl>,
  store: Record<string, VariableValue>,
): QueryFilter | undefined {
  if ("and" in filter) {
    const kids = resolveFilterList(filter.and, decls, store);
    return kids.length > 0 ? { and: kids } : undefined;
  }
  if ("or" in filter) {
    const kids = resolveFilterList(filter.or, decls, store);
    return kids.length > 0 ? { or: kids } : undefined;
  }
  return resolveLeafFilter(filter, decls, store);
}

function resolveFilterList(
  filters: QueryFilter[],
  decls: Map<string, VariableDecl>,
  store: Record<string, VariableValue>,
): QueryFilter[] {
  const out: QueryFilter[] = [];
  for (const f of filters) {
    const r = resolveFilter(f, decls, store);
    if (r !== undefined) out.push(r);
  }
  return out;
}

/* ───────────────────────────── time dimensions ───────────────────────────── */

function resolveTimeDimension(
  td: TimeDimension,
  decls: Map<string, VariableDecl>,
  store: Record<string, VariableValue>,
): TimeDimension {
  const out: TimeDimension = { dimension: td.dimension };

  if (td.granularity !== undefined) {
    const g = resolveToken(td.granularity, decls, store);
    // Empty granularity is DELETED (the time dim stays, ungrouped).
    if (!isEmptyValue(g)) out.granularity = g as TimeDimension["granularity"];
  }

  if (td.dateRange !== undefined) {
    const dr = resolveToken(td.dateRange, decls, store);
    // Empty dateRange is DELETED; the time dim stays for grouping (if granularity present).
    if (!isEmptyValue(dr)) out.dateRange = dr as TimeDimension["dateRange"];
  }

  // compareDateRange carries no var tokens in the contract; passthrough verbatim.
  if (td.compareDateRange !== undefined) out.compareDateRange = td.compareDateRange;

  return out;
}

/* ───────────────────────────── query ─────────────────────────────────────── */

/**
 * Leg-2 resolution: deep-walk a `CubeQuery`, substitute every `{var}` token, then
 * apply the `noFilter` rule. The returned query is a fresh, literal-only object;
 * the input is never mutated.
 */
export function resolveQuery(
  query: CubeQuery,
  store: Record<string, VariableValue>,
  decls: VariableDecl[],
): CubeQuery {
  const dmap = declMap(decls);
  const out: CubeQuery = {};

  // Member lists never carry var tokens; copy verbatim when present.
  if (query.measures !== undefined) out.measures = [...query.measures];
  if (query.dimensions !== undefined) out.dimensions = [...query.dimensions];
  if (query.segments !== undefined) out.segments = [...query.segments];

  if (query.timeDimensions !== undefined) {
    out.timeDimensions = query.timeDimensions.map((td) => resolveTimeDimension(td, dmap, store));
  }

  if (query.filters !== undefined) {
    const filters = resolveFilterList(query.filters, dmap, store);
    if (filters.length > 0) out.filters = filters;
  }

  if (query.order !== undefined) {
    // OrderSpec is an object or [member, dir][] tuple list; no var tokens — clone.
    out.order = Array.isArray(query.order)
      ? query.order.map((pair) => [...pair] as [string, "asc" | "desc"])
      : { ...query.order };
  }

  if (query.limit !== undefined) {
    const limit = resolveToken(query.limit, dmap, store);
    // Empty limit is DELETED (Cube default applies).
    if (!isEmptyValue(limit)) out.limit = limit as number;
  }

  if (query.offset !== undefined) {
    const offset = resolveToken(query.offset, dmap, store);
    if (!isEmptyValue(offset)) out.offset = offset as number;
  }

  if (query.total !== undefined) out.total = query.total;
  if (query.timezone !== undefined) out.timezone = query.timezone;

  return out;
}

/**
 * A per-caller memoized {@link resolveQuery}: caches the last input + the serialized
 * resolved output, and returns the PRIOR resolved object (same reference) when the new
 * resolution is byte-identical. This gives downstream identity-based memos (e.g.
 * `useNormalizedSeries`' `data` memo) referential stability — a `setVar` that doesn't
 * affect THIS query produces no new `resolvedQuery` reference, so `normalize()` does not
 * re-run. A real change to a bound variable still yields a new reference (the
 * serialization differs), so the bound widget correctly updates.
 *
 * Each caller (one per chart) gets its own memoizer, so unrelated queries never evict
 * each other's cache.
 */
export function createQueryResolver(): (
  query: CubeQuery,
  store: Record<string, VariableValue>,
  decls: VariableDecl[],
) => CubeQuery {
  let lastOut: CubeQuery | undefined;
  let lastKey: string | undefined;
  return (query, store, decls) => {
    const out = resolveQuery(query, store, decls);
    const key = JSON.stringify(out);
    if (lastOut !== undefined && key === lastKey) return lastOut;
    lastOut = out;
    lastKey = key;
    return out;
  };
}
