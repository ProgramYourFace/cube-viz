import { createContext, useContext } from "react";

import type { ChartColorToken, FormatOptions } from "@/spec";
import type { ValueFormatter } from "@/format";
import type { UnitDef } from "@/units";
import type { CubeClient } from "@/adapter";
import type { ComponentRegistry } from "./registry";

/**
 * The single runtime context cube-viz reads (docs/03-override-theme-preview.md
 * §A1.4). It carries everything the host injects through {@link CubeVizProvider}:
 * the Cube client, the component-override registry, the resolved locale/formatting
 * config, and the resolved theme. The library NEVER stores, serializes, or logs
 * the Cube token — it lives only inside the host-built `cubeClient`.
 */

/**
 * Member-level formatting metadata, retained as the host-facing shape for the
 * legacy `useFormatter` convenience hook. The pluggable formatter seam is now the
 * richer {@link import("@/format").FormatContext}; this stays a flat, host-friendly
 * projection of it.
 */
export interface MemberFormatMeta {
  /** Fully-qualified member name, when known. */
  member?: string;
  /** Cube `meta.unit` (e.g. "km", "s", "%"). */
  unit?: string;
  /** Cube `meta.quantity` (e.g. "time", "ratio", "distance"). */
  quantity?: string;
  /** Cube `meta.convert` opt-in (host policy; the default formatter never converts). */
  convert?: boolean;
  /** Resolved spec-level format override for this value position. */
  format?: FormatOptions;
}

/** Resolved locale / formatting config (defaults applied in the provider). */
export interface ResolvedLocale {
  /** BCP-47 locale tag, e.g. "en-US". */
  locale?: string;
  /** IANA timezone; default query/host tz. */
  timezone?: string;
  /** The host's unit system, threaded into every {@link import("@/format").FormatContext}. */
  unitSystem?: "metric" | "imperial";
  /**
   * Central host-pluggable {@link ValueFormatter} (the Embeddable lesson: formatting
   * is DRY — defined once, not per chart). When present it is the formatter every
   * chart/axis/tooltip/KPI/table uses; otherwise the library's minimal
   * {@link import("@/format").defaultFormatter} is used. This is where a host plugs
   * in unit conversion / duration humanization / quantity rules — the library ships
   * none of those.
   */
  formatValue?: ValueFormatter;
  /**
   * Extra/override metric→imperial unit conversions, merged OVER the core
   * {@link import("@/units").DEFAULT_UNIT_CONVERSIONS}. This is the EXTENSION POINT
   * for the core units feature: hosts register additional storage units (or
   * override a default rule) without touching the library. Ignored when a host
   * supplies `formatValue` (that fully overrides the core formatter).
   */
  units?: Record<string, UnitDef>;
}

/** Resolved theme config (defaults applied in the provider). */
export interface ResolvedTheme {
  /** Series color ramp as token *names* (never raw colors); cycles when exhausted. */
  chartRamp: ChartColorToken[];
  /** Forced color mode; "system" defers to the host's existing dark selector. */
  mode: "light" | "dark" | "system";
}

/** The full context value provided by {@link CubeVizProvider}. */
export interface CubeVizContextValue {
  /** The host-built Cube client. The token is held only inside this instance. */
  cubeClient: CubeClient;
  /** Component overrides; absent slots fall back to the built-ins. */
  registry: ComponentRegistry;
  /** Resolved locale / formatting config. */
  locale: ResolvedLocale;
  /** Resolved theme config. */
  theme: ResolvedTheme;
}

/** The React context. `null` until a {@link CubeVizProvider} mounts above. */
export const CubeVizContext = createContext<CubeVizContextValue | null>(null);
CubeVizContext.displayName = "CubeVizContext";

/**
 * Read the cube-viz runtime context. Throws if no {@link CubeVizProvider} is an
 * ancestor — every chart/hook needs the Cube client + registry, so a missing
 * provider is a programming error worth failing loudly on.
 */
export function useCubeVizContext(): CubeVizContextValue {
  const ctx = useContext(CubeVizContext);
  if (ctx === null) {
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>.",
    );
  }
  return ctx;
}
