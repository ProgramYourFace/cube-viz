/**
 * Public surface for the dashboard editor (B3 — docs/03 §A3.2). Re-exported from a
 * dedicated `*.exports.ts` (NOT a shared `index.ts`) so the barrel wiring can be
 * assembled later without touching this file. A host imports the editor + the
 * helpers it needs to drive it (factories for ids, the layout/spec mutators for
 * building custom toolbars, and the responsive shell).
 */

export { DashboardEditor } from "./DashboardEditor";
export type { DashboardEditorProps } from "./DashboardEditor";

/* ── sub-panels (compose a custom editor layout) ──────────────────────────── */
export { EditorToolbar } from "./dashboard/EditorToolbar";
export type { EditorToolbarProps } from "./dashboard/EditorToolbar";

export { EditorCanvas } from "./dashboard/EditorCanvas";
export type { EditorCanvasProps } from "./dashboard/EditorCanvas";

export { WidgetEditPanel } from "./dashboard/WidgetEditPanel";
export type { WidgetEditPanelProps } from "./dashboard/WidgetEditPanel";

export { VariablesPanel } from "./dashboard/VariablesPanel";
export type { VariablesPanelProps } from "./dashboard/VariablesPanel";

export { TextWidgetEditor } from "./dashboard/TextWidgetEditor";
export type { TextWidgetEditorProps } from "./dashboard/TextWidgetEditor";

export { InputWidgetEditor } from "./dashboard/InputWidgetEditor";
export type { InputWidgetEditorProps } from "./dashboard/InputWidgetEditor";

/* ── pure spec/layout helpers + factories (host toolbars / tests) ─────────── */
export {
  appendWidget,
  removeWidget,
  replaceWidget,
  mergeLayout,
  pickCanonicalLayout,
  placeNewItem,
  CANONICAL_BREAKPOINT,
  DEFAULT_COLS,
} from "./dashboard/layout";

export {
  createIdFactory,
  newWidget,
  newChartWidget,
  newTextWidget,
  newInputWidget,
  newVariable,
  defaultForType,
} from "./dashboard/factories";
export type { IdFactory } from "./dashboard/factories";

export { useDebouncedCallback } from "./dashboard/useDebouncedCallback";
