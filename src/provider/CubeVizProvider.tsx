import type * as React from "react";
import { useMemo, useState } from "react";

import { resolveMarkTheme, type ChartMarkTheme } from "@/charts";
import type { ChartColorToken } from "@/spec";
import { createCubeClient, DEFAULT_COLOR_RAMP } from "@/adapter";
import type { CubeClient, CubeConnection } from "@/adapter";
import {
  buildFamilyRegistry,
  defaultChartFamilies,
  type ChartFamilyDescriptor,
  type FamilyRegistry,
} from "@/charts";
import { PortalContainerProvider } from "@/components/ui/portal-container";
import { cn } from "@/components/ui/utils";

import {
  CubeVizContext,
  type CubeVizContextValue,
  type ResolvedLocale,
  type ResolvedMaps,
  type ResolvedTheme,
} from "./context";
import { ChartInteractionProvider, type ChartInteractionHandlers } from "./interactions";
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
  /**
   * Mark GEOMETRY for every chart in the app — bar radius and thickness, area fill
   * opacity, line width, pie gap/radius, bubble area range. Partial: anything omitted
   * keeps {@link DEFAULT_MARK_THEME}.
   *
   * These are set HERE and nowhere else. They used to be per-chart `familyOptions`,
   * which meant a person building a chart was asked how round its corners should be —
   * a question about a rectangle, not about their data, and one with no wrong answer.
   * Appearance is a property of the product, so it is configured once by the host.
   */
  marks?: Partial<ChartMarkTheme>;
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
  /**
   * Host-registered chart families (the extension point now that `map` is no longer
   * builtin — a host ships its own `map` descriptor here). Built into an immutable
   * {@link FamilyRegistry} (builtins first, then these augment/override by
   * `descriptor.family`) and carried through context, so they appear in the type
   * picker, are editable (wells/placement/customize), validate (optionsSchema/defaults),
   * and render (component). The registry is memoized by the families' CONTENT (the
   * family keys), so a fresh array literal each render (`families={[mapDescriptor]}`)
   * does NOT churn the registry identity.
   */
  families?: ChartFamilyDescriptor[];
  /**
   * App-wide semantic interaction handlers (brush-to-drill / click-to-cross-filter).
   * This is the OUTERMOST level of the innermost-wins chain
   * provider → `<Dashboard>` → `<CubeChart>`; every emitted selection names its
   * source widget. Omit it and no chart mounts a brush or a click handler, so an
   * existing embed is untouched.
   */
  interactions?: ChartInteractionHandlers;
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
  families,
  interactions,
  children,
}: CubeVizProviderProps): React.ReactElement {
  // Build the immutable family registry (builtins seeded in order, then host families
  // augment/override by key) ONCE — carried through context so the first paint of the
  // type picker / dispatch already sees host families. Memoized by the families'
  // CONTENT KEY (the family keys), NOT the array reference, so a host passing a fresh
  // `families={[mapDescriptor]}` literal each render keeps a STABLE registry identity —
  // letting it sit in downstream `useMemo` deps (normalize / wells) without churn.
  const familiesKey = (families ?? []).map((d) => d.family).join("|");
  const familyRegistry = useMemo<FamilyRegistry>(
    () => buildFamilyRegistry(defaultChartFamilies, families),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [familiesKey],
  );

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
      marks: resolveMarkTheme(theme?.marks),
    }),
    [theme?.chartRamp, theme?.mode, theme?.marks],
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
      families: familyRegistry,
      locale: resolvedLocale,
      theme: resolvedTheme,
      maps: resolvedMaps,
    }),
    [cubeClient, resolvedRegistry, familyRegistry, resolvedLocale, resolvedTheme, resolvedMaps],
  );

  // Apply theme.mode by scoping the `.dark` token set to the provider subtree.
  // `display:contents` keeps the wrapper layout-transparent while the CSS custom
  // properties still cascade to descendants. "system" defers to the host's selector.
  //
  // The root node is also the PORTAL TARGET for every popover/select below it: a
  // Radix portal defaults to `document.body`, which is outside this subtree, so a
  // portalled surface used to resolve its tokens against `:root` and paint light
  // even in dark mode. Held in state (not a ref) so the first render after mount
  // hands the real node down; `null` until then just means "Radix default".
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  return (
    <CubeVizContext.Provider value={value}>
      <div
        ref={setRoot}
        className={cn(
          "cv-root",
          resolvedTheme.mode === "dark" && "dark",
          resolvedTheme.mode === "light" && "cube-viz-light",
        )}
      >
        <PortalContainerProvider container={root}>
          <ChartInteractionProvider
            onRangeSelect={interactions?.onRangeSelect}
            onPointSelect={interactions?.onPointSelect}
          >
            {children}
          </ChartInteractionProvider>
        </PortalContainerProvider>
      </div>
    </CubeVizContext.Provider>
  );
}
