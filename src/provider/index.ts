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

// Context + accessor.
export { CubeVizContext, useCubeVizContext } from "./context";
export type {
  CubeVizContextValue,
  ResolvedLocale,
  ResolvedMaps,
  ResolvedTheme,
  MemberFormatMeta,
} from "./context";

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
