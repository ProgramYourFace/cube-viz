/**
 * The runtime provider layer: the single config surface (`CubeVizProvider`), its
 * React context, and the component-override registry. See
 * docs/03-override-theme-preview.md Part A.
 */

// Provider + its config props.
export { CubeVizProvider } from "./CubeVizProvider";
export type {
  CubeVizProviderProps,
  CubeVizThemeConfig,
  CubeVizLocaleConfig,
  CubeVizMapsConfig,
} from "./CubeVizProvider";

// Context + accessors.
export { CubeVizContext, useCubeVizContext, useFamilyRegistry } from "./context";

// Per-component chart-families override (safe context re-publish).
export { FamilyRegistryOverride } from "./FamilyOverride";
export type {
  CubeVizContextValue,
  ResolvedLocale,
  ResolvedMaps,
  ResolvedTheme,
  MemberFormatMeta,
} from "./context";

// Semantic interaction seam: brush-to-drill + click-to-cross-filter. Handlers are
// optional at every level (provider → dashboard → chart, innermost wins) and the
// selections a chart reports are Cube members/values, never pixels.
export { ChartInteractionProvider, useChartInteractions } from "./interactions";
export type {
  RangeSelection,
  PointSelection,
  RangeSelectHandler,
  PointSelectHandler,
  ChartInteractionHandlers,
  ChartInteractionProviderProps,
  ChartInteractionTarget,
  ChartInteractions,
} from "./interactions";

// Component-override registry.
export { resolveChart } from "./registry";
export type {
  ComponentRegistry,
  WidgetChromeProps,
  WidgetChromeComponent,
  StateComponent,
  ErrorStateProps,
  ErrorStateComponent,
  InputControlProps,
  InputControlComponent,
} from "./registry";

// NOTE: the host-pluggable formatter contract (ValueFormatter/FormatContext/…) that
// `locale.formatValue` plugs into lives in `@/format` and is re-exported from the
// top-level barrel there — NOT duplicated here, so `export *` stays unambiguous.
