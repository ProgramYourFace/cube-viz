import { useMemo, type ReactElement, type ReactNode } from "react";

import {
  buildFamilyRegistry,
  defaultChartFamilies,
  type ChartFamilyDescriptor,
} from "@/charts";

import { CubeVizContext, useCubeVizContext } from "./context";

/**
 * A per-component chart-families override. When a `families` array is given, it
 * re-publishes the parent {@link CubeVizContext} value with ONLY its `families` field
 * replaced by a registry built from those descriptors (builtins first, then the
 * override augments/overrides by key) — every other context field (cubeClient /
 * registry / locale / theme / maps) is spread through unchanged, so the Cube client is
 * never blanked. With no override it renders children inheriting the provider's
 * registry untouched.
 *
 * This is the safe implementation of the per-component `families?` prop on
 * {@link import("@/render").Dashboard} / `ChartView` / `DashboardEditor`: it reads the
 * surrounding provider rather than building a second, divergent merge path.
 */
export function FamilyRegistryOverride({
  families,
  children,
}: {
  families?: ChartFamilyDescriptor[];
  children: ReactNode;
}): ReactElement {
  const parent = useCubeVizContext();
  // Keyed on the override's CONTENT (family keys), so a fresh array literal each render
  // keeps a stable registry identity (mirrors CubeVizProvider's content-keyed memo).
  const key = (families ?? []).map((d) => d.family).join("|");
  const value = useMemo(() => {
    if (!families || families.length === 0) return parent;
    return { ...parent, families: buildFamilyRegistry(defaultChartFamilies, families) };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
  }, [parent, key]);

  if (!families || families.length === 0) return <>{children}</>;
  return <CubeVizContext.Provider value={value}>{children}</CubeVizContext.Provider>;
}
