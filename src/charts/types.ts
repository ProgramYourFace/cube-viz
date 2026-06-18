import type * as React from "react";

import type { ChartOptions } from "@/spec";
import type { NormalizedChartData } from "@/adapter/types";
import type { ChartConfig } from "@/components/ui/chart";
import type { ChartFormat } from "@/format";

/**
 * The chart-family seam (docs/02-chart-options.md §3): every family is a PURE
 * component `(NormalizedChartData, ChartOptions, ChartConfig) → ReactElement`.
 * It receives already-fetched, already-normalized data + the resolved options +
 * the derived shadcn `ChartConfig`. It NEVER fetches and NEVER sees a Cube
 * ResultSet — Recharts props are confined inside each family component.
 */
export interface ChartComponentProps {
  /** Already-fetched, normalized adapter output. */
  data: NormalizedChartData;
  /** Resolved chart options (envelope + familyOptions, defaults already merged). */
  options: ChartOptions;
  /** shadcn ChartConfig derived from `data.series` (key → {label, color}). */
  config: ChartConfig;
  /**
   * The host-pluggable, member-aware value formatter for this chart. Families call
   * `format.value(v, member, role)` / `format.category(v)` — they NEVER read the
   * annotation or hardcode units/durations. Built from the resolved
   * {@link ValueFormatter} + annotation + options.
   */
  format: ChartFormat;
  /** Optional fetch state; families render their own loading/error chrome from it. */
  state?: { loading?: boolean; error?: Error };
}

/** A chart family is any component rendering {@link ChartComponentProps}. */
export type ChartComponent = React.ComponentType<ChartComponentProps>;

export type { ChartConfig, ChartFormat };
