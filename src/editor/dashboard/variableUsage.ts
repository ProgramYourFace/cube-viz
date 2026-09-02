import { isVarRef, type DashboardSpec, type VarRef, type WidgetSpec } from "@/spec";

/**
 * Variable USAGE — who actually depends on a declared dashboard variable, and the
 * rewrites that keep those dependents honest when a variable is renamed or removed.
 *
 * A variable name is a REFERENCE, not a label: input widgets bind to it by name
 * (`control.variable`) and chart widgets carry `{ var: "name" }` tokens deep inside
 * their query / chart options. Editing the declaration alone therefore orphans every
 * one of those bindings silently — the board keeps rendering, the control keeps
 * writing to a variable nothing reads. So the variables UI never patches a name in
 * place: it goes through {@link renameVariable} (rewrites declaration + refs + input
 * bindings together) or {@link removeVariable} (drops the declaration AND unbinds).
 *
 * Everything here is pure — no React, no spec mutation.
 */

export interface VariableUsage {
  /** Ids of input widgets bound to this variable (`control.variable === name`). */
  inputs: string[];
  /** How many `{var:name}` tokens live in chart widgets' query / chart options. */
  refs: number;
}

/**
 * Usage of every declared variable (plus any name only referenced, never declared —
 * a dangling ref is exactly what the panel should surface). Declared-but-unused
 * variables get a zeroed entry, so a caller can read `usages[name]` unconditionally.
 */
export function variableUsages(spec: DashboardSpec): Record<string, VariableUsage> {
  const out: Record<string, VariableUsage> = {};
  const entry = (name: string): VariableUsage =>
    (out[name] ??= { inputs: [], refs: 0 });

  for (const v of spec.variables) entry(v.name);

  for (const w of spec.widgets) {
    if (w.type === "input") {
      const name = w.control.variable;
      if (name) entry(name).inputs.push(w.id);
      continue;
    }
    if (w.type !== "chart") continue;
    // Chart widgets are where `{var}` tokens live — query filters/date ranges and
    // chart options (familyOptions included, it's nested under `chart`).
    walkVarRefs(w.query, (ref) => void entry(ref.var).refs++);
    walkVarRefs(w.chart, (ref) => void entry(ref.var).refs++);
  }
  return out;
}

/** "2 inputs · 5 queries" — or "Unused". The one-line "Used by" caption. */
export function usageSummary(usage: VariableUsage | undefined): string {
  const parts: string[] = [];
  const inputs = usage?.inputs.length ?? 0;
  const refs = usage?.refs ?? 0;
  if (inputs > 0) parts.push(`${inputs} input${inputs === 1 ? "" : "s"}`);
  if (refs > 0) parts.push(`${refs} quer${refs === 1 ? "y" : "ies"}`);
  return parts.length > 0 ? parts.join(" · ") : "Unused";
}

/**
 * Rename a variable EVERYWHERE: the declaration, every `{var:from}` token in every
 * widget, and every input widget bound to it. Returns the spec unchanged when the
 * name is a no-op or `to` is already taken (the caller shows the inline error — we
 * refuse rather than silently merge two variables into one).
 */
export function renameVariable(spec: DashboardSpec, from: string, to: string): DashboardSpec {
  if (from === to || to === "") return spec;
  const vars = spec.variables;
  if (!vars.some((v) => v.name === from)) return spec;
  if (vars.some((v) => v.name === to)) return spec;

  return {
    ...spec,
    variables: vars.map((v) => (v.name === from ? { ...v, name: to } : v)),
    widgets: spec.widgets.map((w) => rewriteWidget(w, from, () => ({ var: to }), to)),
  };
}

/**
 * Drop a variable's declaration AND unbind everything that depended on it: input
 * widgets fall back to an empty binding (the panel then makes the user re-pick), and
 * every `{var:name}` token is replaced by the variable's `default` — or removed
 * outright when it had none, since leaving the token behind would resolve to nothing
 * and the chart would query for a variable that no longer exists.
 */
export function removeVariable(spec: DashboardSpec, name: string): DashboardSpec {
  const decl = spec.variables.find((v) => v.name === name);
  const fallback = decl?.default;
  return {
    ...spec,
    variables: spec.variables.filter((v) => v.name !== name),
    widgets: spec.widgets.map((w) =>
      rewriteWidget(w, name, () => (fallback === undefined ? REMOVE : fallback), ""),
    ),
  };
}

/* ─────────────────────────────── internals ──────────────────────────────── */

/** Sentinel: this node has no replacement and should disappear from its parent. */
const REMOVE = Symbol("cv.removeVarRef");

/** Rewrite one widget: `{var:name}` tokens via `replace`, input bindings to `bindTo`. */
function rewriteWidget(
  widget: WidgetSpec,
  name: string,
  replace: (ref: VarRef) => unknown,
  bindTo: string,
): WidgetSpec {
  let next = widget;
  if (next.type === "input" && next.control.variable === name) {
    next = { ...next, control: { ...next.control, variable: bindTo } };
  }
  const mapped = mapVarRefs(next, name, replace);
  // A whole widget can never itself BE a var ref, so the cast is safe.
  return (mapped === REMOVE ? next : mapped) as WidgetSpec;
}

/** Visit every `{ var: … }` token in a value (depth-first). */
function walkVarRefs(node: unknown, visit: (ref: VarRef) => void): void {
  if (isVarRef(node)) {
    visit(node);
    return;
  }
  if (Array.isArray(node)) {
    for (const item of node) walkVarRefs(item, visit);
    return;
  }
  if (node && typeof node === "object") {
    for (const value of Object.values(node)) walkVarRefs(value, visit);
  }
}

/**
 * Structurally share-and-copy `node`, replacing every `{var:name}` token with
 * `replace(ref)`. A replacement of {@link REMOVE} drops the holding array element /
 * object key. Untouched subtrees keep their identity (cheap re-renders downstream).
 */
function mapVarRefs(
  node: unknown,
  name: string,
  replace: (ref: VarRef) => unknown,
): unknown | typeof REMOVE {
  if (isVarRef(node)) return node.var === name ? replace(node) : node;

  if (Array.isArray(node)) {
    let changed = false;
    const out: unknown[] = [];
    for (const item of node) {
      const mapped = mapVarRefs(item, name, replace);
      if (mapped === REMOVE) {
        changed = true;
        continue;
      }
      if (mapped !== item) changed = true;
      out.push(mapped);
    }
    return changed ? out : node;
  }

  if (node && typeof node === "object") {
    let changed = false;
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      const mapped = mapVarRefs(value, name, replace);
      if (mapped === REMOVE) {
        changed = true;
        continue;
      }
      if (mapped !== value) changed = true;
      out[key] = mapped;
    }
    return changed ? out : node;
  }

  return node;
}
