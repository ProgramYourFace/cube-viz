import { isVarRef, type VariableDecl, type VariableType } from "@/spec";

/**
 * The value-binding seam (docs/05): every place a chart value can be a FIXED literal
 * OR bound to a dashboard variable (`{var}`) — filter values, a time field's date
 * range, its granularity — flows through one {@link ValueBinding} control. This module
 * is the pure glue: which variable TYPES may fill a given slot, and how to mint a new
 * typed variable when the user binds to a fresh one.
 */

/** The kind of value a binding slot holds (drives the fixed editor + compatible vars). */
export type BindKind = "dateRange" | "granularity" | "string" | "number" | "boolean";

/**
 * A one-line summary of a value that may be a fixed literal OR a `{var}` binding —
 * for the collapsed state of a control (a popover trigger, a pill caption).
 *
 * It exists because EVERY such slot is two-shaped, and reading one as "just a
 * string" is a live crash: a bound value is an OBJECT, and React throws
 * ("Objects are not valid as a React child") the moment one reaches JSX — taking
 * the whole editor, and with it the dashboard, down. This ALWAYS returns a string,
 * so a summary can never be the thing that breaks. Bound values read as
 * `{variable}`, the same convention the filter summaries use.
 */
export function bindingSummary(value: unknown, none = "None"): string {
  if (isVarRef(value)) {
    // Strip braces from the name so they cannot break the {…} wrapper.
    return `{${value.var.replace(/[{}]/g, "")}}`;
  }
  if (value === undefined || value === null || value === "") return none;
  if (Array.isArray(value)) {
    const parts = value.map((v) => bindingSummary(v, none)).filter((s) => s !== none);
    return parts.length > 0 ? parts.join(" – ") : none;
  }
  // Any other object shape has no honest one-line reading — and printing
  // "[object Object]" would be worse than saying nothing.
  if (typeof value === "object") return none;
  return String(value);
}

/** Variable types that can legally fill a binding slot of `kind`. */
export function acceptedVarTypes(kind: BindKind): VariableType[] {
  switch (kind) {
    case "dateRange":
      return ["dateRange", "time"];
    case "granularity":
      return ["granularity"];
    case "string":
      return ["string", "dimension", "dimensionOrMeasure"];
    case "number":
      return ["number", "measure"];
    case "boolean":
      return ["boolean"];
  }
}

/** Declared variables compatible with a binding slot of `kind`. */
export function compatibleVars(decls: VariableDecl[], kind: BindKind): VariableDecl[] {
  const allow = new Set(acceptedVarTypes(kind));
  return decls.filter((d) => allow.has(d.type));
}

/** The variable type a freshly-created variable should carry for this slot. */
function varTypeFor(kind: BindKind): VariableType {
  switch (kind) {
    case "dateRange":
      return "dateRange";
    case "granularity":
      return "granularity";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "string":
      return "string";
  }
}

/** A unique, kebab-ish variable name derived from a label (or the kind). */
export function uniqueVarName(label: string, kind: BindKind, existing: VariableDecl[]): string {
  const taken = new Set(existing.map((d) => d.name));
  const base =
    label
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || kind;
  let name = base;
  let i = 2;
  while (taken.has(name)) name = `${base}_${i++}`;
  return name;
}

/** Mint a typed {@link VariableDecl} for a newly-created binding variable. */
export function newVariable(kind: BindKind, label: string, existing: VariableDecl[]): VariableDecl {
  const type = varTypeFor(kind);
  const decl: VariableDecl = { name: uniqueVarName(label, kind, existing), type };
  const trimmed = label.trim();
  if (trimmed) decl.label = trimmed;
  // Sensible defaults so a freshly-bound variable resolves to something usable.
  if (type === "dateRange") decl.default = "last 7 days";
  else if (type === "granularity") decl.default = "day";
  return decl;
}
