/**
 * Public surface of the ChartEditor (B2, docs/03 §A3.1). Kept as a standalone
 * re-export file so the chart-editor and dashboard-editor can each own their barrel
 * without clobbering a shared `editor/index.ts`; the main barrel re-exports from here.
 */

export { ChartEditor } from "./ChartEditor";
export type { ChartEditorProps } from "./ChartEditor";

// Helper components reusable by a host building a custom chart-config surface.
export { ChartConfigPanel } from "./chart/ChartConfigPanel";
export type { ChartConfigPanelProps } from "./chart/ChartConfigPanel";

export { FilterBuilder } from "./chart/FilterBuilder";
export type { FilterBuilderProps } from "./chart/FilterBuilder";

export { FormatOptionsEditor } from "./chart/FormatOptionsEditor";
export type { FormatOptionsEditorProps } from "./chart/FormatOptionsEditor";

export { SeriesMetaEditor } from "./chart/SeriesMetaEditor";
export type { SeriesMetaEditorProps } from "./chart/SeriesMetaEditor";

// The controlled-spec engine (validate + debounce-emit), for advanced hosts.
export { useChartEditorState } from "./chart/useChartEditorState";
export type {
  UseChartEditorState,
  UseChartEditorStateOptions,
  ChartEditorIssue,
} from "./chart/useChartEditorState";
