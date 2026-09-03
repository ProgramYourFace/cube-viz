/**
 * Public surface for the dashboard editor (B3 — docs/03 §A3.2). Re-exported from a
 * dedicated `*.exports.ts` (NOT a shared `index.ts`) so the barrel wiring can be
 * assembled later without touching this file. A host imports the editor + the
 * helpers it needs to drive it (factories for ids, the layout/spec mutators for
 * building custom toolbars, and the pure variable-usage rewrites).
 */

export { DashboardEditor } from "./DashboardEditor";
export type { DashboardEditorProps, EditMeta } from "./DashboardEditor";

/* ── sub-panels (compose a custom editor layout) ──────────────────────────── */
export { EditorToolbar } from "./dashboard/EditorToolbar";
export type { EditorToolbarProps } from "./dashboard/EditorToolbar";

export { EditorCanvas } from "./dashboard/EditorCanvas";
export type { EditorCanvasProps } from "./dashboard/EditorCanvas";

export { WidgetEditPanel } from "./dashboard/WidgetEditPanel";
export type { WidgetEditPanelProps } from "./dashboard/WidgetEditPanel";

export { VariablesDock } from "./dashboard/VariablesDock";
export type { VariablesDockProps } from "./dashboard/VariablesDock";

export { InsertLines } from "./dashboard/InsertLines";
export type { InsertLinesProps } from "./dashboard/InsertLines";

export { TextWidgetEditor } from "./dashboard/TextWidgetEditor";
export type { TextWidgetEditorProps } from "./dashboard/TextWidgetEditor";

export { InputWidgetEditor } from "./dashboard/InputWidgetEditor";
export type { InputWidgetEditorProps } from "./dashboard/InputWidgetEditor";

/* ── pure spec/layout helpers + factories (host toolbars / tests) ─────────── */
export {
  appendWidget,
  insertWidgetAtRow,
  insertWidgetAtColumn,
  removeWidget,
  replaceWidget,
  mergeLayout,
  pickCanonicalLayout,
  placeNewItem,
  rowBoundaries,
  columnBoundaries,
  editorGridMetrics,
  rowBoundaryTop,
  rowSpanHeight,
  columnWidth,
  columnBoundaryLeft,
  CANONICAL_BREAKPOINT,
  DEFAULT_COLS,
  DEFAULT_FOOTPRINT,
} from "./dashboard/layout";
export type { EditorGridMetrics, ColumnBoundary } from "./dashboard/layout";

/* ── variable usage: rename/remove WITHOUT orphaning bindings ─────────────── */
export {
  variableUsages,
  usageSummary,
  renameVariable,
  removeVariable,
} from "./dashboard/variableUsage";
export type { VariableUsage } from "./dashboard/variableUsage";

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
