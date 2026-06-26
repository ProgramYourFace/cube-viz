import type * as React from "react";
import { useMemo } from "react";

import type { ChartColorToken } from "@/spec";
import { createCubeClient, DEFAULT_COLOR_RAMP } from "@/adapter";
import type { CubeClient, CubeConnection } from "@/adapter";
import { cn } from "@/components/ui/utils";

import {
  CubeVizContext,
  type CubeVizContextValue,
  type ResolvedLocale,
  type ResolvedMaps,
  type ResolvedTheme,
} from "./context";
import type { ComponentRegistry } from "./registry";

/**
 * The single config surface (docs/03-override-theme-preview.md §A1.4). One context
 * provider supplies the Cube client, theme, locale, and component-override registry.
 *
 * **Credential discipline (non-negotiable):** the library never mints, stores,
 * persists, or logs credentials. When given a {@link CubeConnection} it builds a
 * client via {@link createCubeClient}, forwarding the host-owned token (or thunk)
 * unmodified — the token lives only in memory for the provider's lifetime. RLS /
 * tenancy stays entirely in the host's JWT; no prop here can widen tenant scope.
 */

/** Host-supplied theme overrides (token *names* only, never raw colors). */
export interface CubeVizThemeConfig {
  /** Override the default series ramp order/contents. */
  chartRamp?: ChartColorToken[];
  /** Force a mode; "system" (default) defers to the host's existing dark selector. */
  mode?: "light" | "dark" | "system";
}

/** Host-supplied locale / formatting config. */
export type CubeVizLocaleConfig = ResolvedLocale;

/**
 * Host-supplied Google Maps config for the `map` chart family. The host injects its
 * own Google Maps JS API key here (e.g. from `GOOGLE_API_KEY`); the library never
 * hardcodes, stores, or logs it — it only forwards it to `<APIProvider>`. Omit it
 * (or its `apiKey`) and the map family renders a graceful placeholder.
 */
export type CubeVizMapsConfig = ResolvedMaps;

export interface CubeVizProviderProps {
  /**
   * Cube access — either a fully-built {@link CubeClient} (a `@cubejs-client/core`
   * CubeApi) the host already constructed, or a {@link CubeConnection} the library
   * turns into one. Either way the token is host-owned; the library only forwards it.
   */
  cube: CubeClient | CubeConnection;
  /** Theme token/ramp/mode overrides. */
  theme?: CubeVizThemeConfig;
  /** Locale / formatting / unit-system / timezone config. */
  locale?: CubeVizLocaleConfig;
  /**
   * Google Maps config (api key / map id) for the `map` chart family. Host-owned;
   * the library only forwards it. Absent ⇒ maps degrade to a placeholder.
   */
  maps?: CubeVizMapsConfig;
  /** Component overrides; absent slots fall back to the built-ins. */
  registry?: ComponentRegistry;
  children: React.ReactNode;
}

/**
 * Distinguish a ready {@link CubeClient} from a {@link CubeConnection}. A built
 * CubeApi exposes a `load` method; a connection is a plain object with `endpoint`.
 */
function isCubeConnection(cube: CubeClient | CubeConnection): cube is CubeConnection {
  return (
    typeof cube === "object" &&
    cube !== null &&
    typeof (cube as Partial<CubeClient>).load !== "function" &&
    typeof (cube as CubeConnection).endpoint === "string"
  );
}

export function CubeVizProvider({
  cube,
  theme,
  locale,
  maps,
  registry,
  children,
}: CubeVizProviderProps): React.ReactElement {
  // Build (or adopt) the Cube client. Rebuilt only when the connection identity
  // changes — never logged, never persisted. A ready CubeApi is adopted as-is.
  const cubeClient = useMemo<CubeClient>(
    () => (isCubeConnection(cube) ? createCubeClient(cube) : cube),
    [cube],
  );

  const resolvedTheme = useMemo<ResolvedTheme>(
    () => ({
      chartRamp: theme?.chartRamp?.length ? theme.chartRamp : DEFAULT_COLOR_RAMP,
      mode: theme?.mode ?? "system",
    }),
    [theme?.chartRamp, theme?.mode],
  );

  const resolvedLocale = useMemo<ResolvedLocale>(
    () => ({
      locale: locale?.locale,
      timezone: locale?.timezone,
      unitSystem: locale?.unitSystem,
      formatValue: locale?.formatValue,
      units: locale?.units,
    }),
    [locale?.locale, locale?.timezone, locale?.unitSystem, locale?.formatValue, locale?.units],
  );

  const resolvedRegistry = useMemo<ComponentRegistry>(() => registry ?? {}, [registry]);

  const resolvedMaps = useMemo<ResolvedMaps | undefined>(
    () => (maps?.apiKey || maps?.mapId ? { apiKey: maps.apiKey, mapId: maps.mapId } : undefined),
    [maps?.apiKey, maps?.mapId],
  );

  const value = useMemo<CubeVizContextValue>(
    () => ({
      cubeClient,
      registry: resolvedRegistry,
      locale: resolvedLocale,
      theme: resolvedTheme,
      maps: resolvedMaps,
    }),
    [cubeClient, resolvedRegistry, resolvedLocale, resolvedTheme, resolvedMaps],
  );

  // Apply theme.mode by scoping the `.dark` token set to the provider subtree.
  // `display:contents` keeps the wrapper layout-transparent while the CSS custom
  // properties still cascade to descendants. "system" defers to the host's selector.
  return (
    <CubeVizContext.Provider value={value}>
      <div
        className={cn(
          "cv:contents",
          resolvedTheme.mode === "dark" && "dark",
          resolvedTheme.mode === "light" && "cube-viz-light",
        )}
      >
        {children}
      </div>
    </CubeVizContext.Provider>
  );
}
