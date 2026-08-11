/**
 * The render engine — the JSON→UI surface (docs/03-override-theme-preview.md A3,
 * docs/01-spec-schema.md §4). Everything here turns a validated `Spec` into rendered
 * UI: the container-width responsive primitive, the data-fetching chart wrapper, the
 * widget renderers, the overridable chrome, and the dashboard grid. All rendering
 * sits on the `NormalizedChartData` / variable-binding seams from the hooks + provider
 * layers, so swapping Recharts (or the host's chrome/controls) touches nothing here.
 */

// Container-width responsive primitive (reflow to container, not viewport).
export { useContainerWidth } from "./useContainerWidth";

// Data-fetching chart wrapper around the pure ChartRenderer.
export { CubeChart, CubeChartSpec } from "./CubeChart";
export type {
  CubeChartProps,
  CubeChartSpecProps,
} from "./CubeChart";

// Read-only rich-text widget (TipTap StarterKit, editable:false). Exported as
// TextWidgetView to avoid colliding with the `TextWidget` spec TYPE from @/spec
// (and to mirror InputWidgetView).
export { TextWidget as TextWidgetView } from "./TextWidget";
export type { TextWidgetProps as TextWidgetViewProps } from "./TextWidget";

// Variable-bound input control view.
export { InputWidgetView } from "./InputWidgetView";
export type { InputWidgetViewProps } from "./InputWidgetView";

// Default (overridable) widget chrome + the RGL drag-handle class.
export { WidgetChrome, DRAG_HANDLE_CLASS } from "./WidgetChrome";

// Per-widget dispatch (chart / text / input → chrome-wrapped body).
export { RenderWidget } from "./RenderWidget";
export type { RenderWidgetProps } from "./RenderWidget";

// Dashboard grid + standalone chart view.
export { Dashboard, ChartView } from "./Dashboard";
export type {
  DashboardProps,
  ChartViewProps,
} from "./Dashboard";

// The semantic interaction contract every render surface above accepts: a chart
// reports a Cube member + ISO range (brush-to-drill) or member + value
// (click-to-cross-filter), never pixels. Defined in the provider layer (that is
// where the ambient handlers live) and re-published here so a host importing the
// render surface gets the types with it.
export { ChartInteractionProvider, useChartInteractions } from "@/provider/interactions";
export type {
  RangeSelection,
  PointSelection,
  RangeSelectHandler,
  PointSelectHandler,
  ChartInteractionHandlers,
  ChartInteractionProviderProps,
  ChartInteractionTarget,
  ChartInteractions,
} from "@/provider/interactions";
