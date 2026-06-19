/**
 * Public surface of the ChartEditor (B2, docs/03 §A3.1). Kept as a standalone
 * re-export file so the chart-editor and dashboard-editor can each own their barrel
 * without clobbering a shared `editor/index.ts`; the main barrel re-exports from here.
 */

export { ChartEditor } from "./ChartEditor";
export type { ChartEditorProps } from "./ChartEditor";

// Chart Builder v3 — the panel-less, on-chart editing surface (docs/05): field slots
// arranged around the live preview. Reusable by a host that wants to wrap its own
// chart preview with the same direct-manipulation slots. The pure well↔spec seam
// (`chart/builder/wells.ts` + `axis.ts`) is unchanged underneath.
export { ChartEditOverlay } from "./chart/onchart/ChartEditOverlay";
export type { ChartEditOverlayProps } from "./chart/onchart/ChartEditOverlay";

export { FilterBuilder } from "./chart/FilterBuilder";
export type { FilterBuilderProps } from "./chart/FilterBuilder";

// The controlled-spec engine (validate + debounce-emit), for advanced hosts.
export { useChartEditorState } from "./chart/useChartEditorState";
export type {
  UseChartEditorState,
  UseChartEditorStateOptions,
  ChartEditorIssue,
} from "./chart/useChartEditorState";
