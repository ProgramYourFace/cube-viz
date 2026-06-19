import type {
  ChartWidget,
  InputWidget,
  TextWidget,
  VariableDecl,
  WidgetSpec,
} from "@/spec";

/**
 * Factories for new widgets / variables (docs/03 §A3.2 "Add"). Every blank widget
 * is a VALID, minimal `WidgetSpec` so the canvas can render it immediately and the
 * spec stays schema-valid before the user edits anything.
 *
 * Ids come from a caller-supplied {@link IdFactory} (the editor's `newId` prop) —
 * we never call `Math.random()`/`Date.now()` at module scope (deterministic SSR +
 * test-friendly). The default factory is a closure-counter the editor instantiates
 * once per mount.
 */

/** Produces unique widget ids. The editor's `newId` prop. */
export type IdFactory = () => string;

/**
 * Build a counter-based id factory: `${prefix}-1`, `${prefix}-2`, … The counter is
 * created on call (NOT at module scope), so each editor instance gets its own.
 */
export function createIdFactory(prefix = "w"): IdFactory {
  let n = 0;
  return () => `${prefix}-${++n}`;
}

/** A blank chart widget: an empty query + a bar family (a valid, renderable shell). */
export function newChartWidget(id: string): ChartWidget {
  return {
    id,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" },
  };
}

/** A blank text widget: an empty TipTap doc with a single empty paragraph. */
export function newTextWidget(id: string): TextWidget {
  return {
    id,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] },
  };
}

/**
 * A blank input widget. `variable` starts empty — the panel makes the user bind it
 * to a declared variable. Defaults to a `select` control with no options yet.
 */
export function newInputWidget(id: string): InputWidget {
  return {
    id,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } },
  };
}

/** Dispatch a fresh widget of the requested kind. */
export function newWidget(type: WidgetSpec["type"], id: string): WidgetSpec {
  switch (type) {
    case "chart":
      return newChartWidget(id);
    case "text":
      return newTextWidget(id);
    case "input":
      return newInputWidget(id);
  }
}

/**
 * A blank variable declaration. Date-range variables default to a relative preset
 * string (host-friendly, no absolute dates baked in — docs/03 §A3.2 "Variables").
 */
export function newVariable(name: string): VariableDecl {
  return { name, type: "string" };
}

/** Per-type sensible default value when a variable's `type` changes. */
export function defaultForType(type: VariableDecl["type"]): VariableDecl["default"] {
  switch (type) {
    case "dateRange":
      // Defaults PREFER relative strings over absolute [from,to] pairs.
      return "last 30 days";
    case "time":
      return "today";
    case "granularity":
      return "day";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "string":
    case "dimension":
    case "measure":
    case "dimensionOrMeasure":
      return "";
  }
}
