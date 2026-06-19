import type * as React from "react";
import { AlertCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import type { ChartFamily } from "@/spec";
import type { ChartFormat } from "@/format";
import { defaultFormatter, makeChartFormat } from "@/format";
import type { ChartComponent, ChartComponentProps, ChartConfig } from "./types";
import { resolveOptions } from "./defaults";
import { configFromSeries } from "./_shared";
import { BarChartFamily } from "./bar";
import { LineChartFamily } from "./line";
import { AreaChartFamily } from "./area";
import { PieChartFamily } from "./pie";
import { ScatterChartFamily } from "./scatter";
import { KpiFamily } from "./kpi";
import { TableFamily } from "./table";
import { ComboChartFamily } from "./combo";

/**
 * The pure family dispatcher (docs/02-chart-options.md §2.0, §3). It:
 *  1. resolves options (envelope + familyOptions defaults merged),
 *  2. derives a shadcn ChartConfig from `data.series` (key → {label, color}),
 *  3. renders the shared loading / error / empty states,
 *  4. else picks the family component (`components?.[family]` ?? builtin).
 *
 * It NEVER fetches and NEVER sees a Cube ResultSet.
 */

/** The builtin family → component table. Override any entry via `components`. */
export const builtinCharts: Record<ChartFamily, ChartComponent> = {
  bar: BarChartFamily,
  line: LineChartFamily,
  area: AreaChartFamily,
  pie: PieChartFamily,
  scatter: ScatterChartFamily,
  kpi: KpiFamily,
  table: TableFamily,
  combo: ComboChartFamily,
};

export interface ChartRendererProps extends Omit<ChartComponentProps, "format"> {
  /**
   * The bound value formatter. Optional here: when absent the renderer builds a
   * default from `data.raw.annotation` + the resolved options + the minimal
   * {@link defaultFormatter}. `CubeChart` supplies the context-resolved one.
   */
  format?: ChartFormat;
  /** Per-family component overrides; a missing family falls back to the builtin. */
  components?: Partial<Record<ChartFamily, ChartComponent>>;
}

export function ChartRenderer({
  data,
  options,
  config,
  format,
  state,
  components,
}: ChartRendererProps): React.ReactElement {
  const resolved = resolveOptions(options);

  // 1) loading — Skeleton sized to the container height; no Recharts mount yet.
  if (state?.loading) {
    return <Skeleton className="h-full w-full min-h-[200px]" />;
  }

  // 2) error — destructive Alert; never leaks tenant data (message only).
  if (state?.error) {
    return (
      <Alert variant="destructive" className="w-full">
        <AlertCircle />
        <AlertTitle>Failed to load chart</AlertTitle>
        <AlertDescription>{state.error.message}</AlertDescription>
      </Alert>
    );
  }

  // 3) empty — centered muted "No data"; Recharts not mounted (avoids 0-row glitches).
  if (data.empty) {
    return (
      <div className="flex h-full w-full min-h-[200px] items-center justify-center text-sm text-muted-foreground">
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

  // 4) dispatch.
  const Family = components?.[resolved.family] ?? builtinCharts[resolved.family];
  return (
    <Family data={data} options={resolved} config={chartConfig} format={chartFormat} state={state} />
  );
}
