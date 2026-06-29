import { useMemo, type ReactElement } from "react";
import { AlertCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import type { ChartFamily } from "@/spec";
import type { ChartFormat } from "@/format";
import { defaultFormatter, makeChartFormat } from "@/format";
import type { ChartComponent, ChartComponentProps, ChartConfig } from "./types";
import { resolveOptions, builtinFamilyRegistry, type FamilyRegistry } from "./familyRegistry";
import { configFromSeries } from "./_shared";
import { builtinFamilyDescriptors } from "./familyDescriptors";

/**
 * The pure family dispatcher (docs/02-chart-options.md §2.0, §3). It:
 *  1. resolves options (envelope + familyOptions defaults merged),
 *  2. derives a shadcn ChartConfig from `data.series` (key → {label, color}),
 *  3. renders the shared loading / error / empty states,
 *  4. else picks the family component (`components?.[family]` ?? the registry's).
 *
 * It NEVER fetches and NEVER sees a Cube ResultSet. It stays PURE and provider-free:
 * its family registry is an OPTIONAL `registry` prop (defaulting to the builtin-only
 * {@link builtinFamilyRegistry}), so it renders standalone without a `CubeVizProvider`.
 * `CubeChart` passes the context registry down explicitly via this prop.
 */

/**
 * The builtin family → component table, DERIVED from the builtin descriptors. Note
 * this is BUILTIN-ONLY (host-registered families are NOT here); dispatch resolves the
 * component from the injected {@link FamilyRegistry}, so a host family still renders.
 * Override any entry via `components`.
 */
export const builtinCharts: Record<string, ChartComponent> = Object.fromEntries(
  Object.entries(builtinFamilyDescriptors).map(([family, d]) => [family, d.component]),
);

export interface ChartRendererProps extends Omit<ChartComponentProps, "format"> {
  /**
   * The bound value formatter. Optional here: when absent the renderer builds a
   * default from `data.raw.annotation` + the resolved options + the minimal
   * {@link defaultFormatter}. `CubeChart` supplies the context-resolved one.
   */
  format?: ChartFormat;
  /** Per-family component overrides; a missing family falls back to the builtin. */
  components?: Partial<Record<ChartFamily, ChartComponent>>;
  /**
   * The family registry to dispatch + resolve options against. Optional — defaults to
   * the builtin-only {@link builtinFamilyRegistry} so the renderer stays pure and works
   * standalone. `CubeChart` passes the context registry (builtins + host families).
   */
  registry?: FamilyRegistry;
}

export function ChartRenderer({
  data,
  options,
  config,
  format,
  state,
  components,
  editing,
  registry = builtinFamilyRegistry,
}: ChartRendererProps): ReactElement {
  const resolved = useMemo(() => resolveOptions(options, registry), [options, registry]);

  // 1) loading — Skeleton sized to the container height; no Recharts mount yet.
  if (state?.loading) {
    return <Skeleton className="cv:h-full cv:w-full cv:min-h-[200px]" />;
  }

  // 2) error — destructive Alert; never leaks tenant data (message only).
  if (state?.error) {
    return (
      <Alert variant="destructive" className="cv:w-full">
        <AlertCircle />
        <AlertTitle>Failed to load chart</AlertTitle>
        <AlertDescription>{state.error.message}</AlertDescription>
      </Alert>
    );
  }

  // 3) empty — centered muted "No data"; Recharts not mounted (avoids 0-row glitches).
  if (data.empty) {
    return (
      <div className="cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground">
        No data
      </div>
    );
  }

  // 2b) ChartConfig is DERIVED from the normalized series when not supplied.
  const chartConfig: ChartConfig =
    config && Object.keys(config).length > 0 ? config : configFromSeries(data);

  // 2c) The bound formatter — supplied by CubeChart (context-resolved), else a
  // minimal default from the annotation + resolved options.
  const chartFormat: ChartFormat =
    format ?? makeChartFormat(data.raw.annotation, resolved, defaultFormatter);

  // 4) dispatch: a per-slot override wins; else the family's registered component
  // (builtin OR host family) from the registry. `registry.require` throws (with an
  // actionable message) on an unknown family — a spec referencing an unregistered
  // family is a programming error.
  const Family = components?.[resolved.family] ?? registry.require(resolved.family).component;
  return (
    <Family
      data={data}
      options={resolved}
      config={chartConfig}
      format={chartFormat}
      state={state}
      editing={editing}
    />
  );
}
