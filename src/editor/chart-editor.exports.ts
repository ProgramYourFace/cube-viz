/**
 * Public surface of the ChartEditor (B2, docs/03 §A3.1). Kept as a standalone
 * re-export file so the chart-editor and dashboard-editor can each own their barrel
 * without clobbering a shared `editor/index.ts`; the main barrel re-exports from here.
 */

export { ChartEditor } from "./ChartEditor";
export type { ChartEditorProps } from "./ChartEditor";

// Chart Builder v2 — the type-first config surface (docs/05), reusable by a host
// building a custom chart-config UI. Supersedes ChartConfigPanel/SeriesMetaEditor/
// FormatOptionsEditor (formatting/axes/legend are now automatic).
export { ChartBuilderPanel } from "./chart/builder/ChartBuilderPanel";
export type { ChartBuilderPanelProps } from "./chart/builder/ChartBuilderPanel";

export { FilterBuilder } from "./chart/FilterBuilder";
export type { FilterBuilderProps } from "./chart/FilterBuilder";

// The controlled-spec engine (validate + debounce-emit), for advanced hosts.
export { useChartEditorState } from "./chart/useChartEditorState";
export type {
  UseChartEditorState,
  UseChartEditorStateOptions,
  ChartEditorIssue,
} from "./chart/useChartEditorState";
