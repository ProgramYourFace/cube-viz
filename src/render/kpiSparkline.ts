import type { ChartOptions, CubeQuery } from "@/spec";
import type { KpiFamilyOptions } from "@/charts";

/**
 * The secondary, time-bucketed query + options that feed a KPI's sparkline.
 *
 * A KPI's MAIN query is an AGGREGATE (the headline number); bucketing it by a
 * granularity would turn the single total into one row per bucket and break the
 * number. So the sparkline is fetched as a SEPARATE trend query and merged into the
 * render data as `series`/`categories` — the headline stays untouched. Returns
 * `null` when the chart isn't a KPI or has no complete sparkline config.
 *
 * The granularity / dateRange may be `{var}` bindings: they ride on the spark
 * query's timeDimension, so the dashboard resolver substitutes them like any query.
 */
const DEFAULT_SPARKLINE_GRANULARITY = "day" as const;

export function kpiSparklineInput(
  query: CubeQuery,
  chart: ChartOptions,
): { query: CubeQuery; chart: ChartOptions } | null {
  if (chart.family !== "kpi") return null;
  const fo = chart.familyOptions as KpiFamilyOptions | undefined;
  const sp = fo?.sparkline;
  if (!sp) return null;

  // The sparkline is TIED to the KPI: its measure defaults to the headline measure and
  // its time dimension / range to the KPI's own query. Only the granularity differs
  // (the number aggregates the full range; the trend buckets it).
  const member = sp.member ?? fo?.measure;
  const td0 = query.timeDimensions?.[0];
  const timeDimension = sp.timeDimension ?? td0?.dimension;
  if (!member || !timeDimension) return null;
  const dateRange = sp.dateRange ?? td0?.dateRange;

  const sparkQuery: CubeQuery = {
    measures: [member],
    timeDimensions: [
      {
        dimension: timeDimension,
        granularity: sp.granularity ?? DEFAULT_SPARKLINE_GRANULARITY,
        ...(dateRange !== undefined ? { dateRange } : {}),
      },
    ],
    ...(query.filters ? { filters: query.filters } : {}),
    ...(query.segments ? { segments: query.segments } : {}),
    order: [[timeDimension, "asc"]],
  };

  // A measures-mode mapping so `normalize` emits one trend series for the KPI renderer.
  const sparkChart: ChartOptions = {
    family: "line",
    mapping: {
      category: { member: timeDimension },
      series: { mode: "measures", members: [member] },
    },
    familyOptions: { chrome: "none" },
  };

  return { query: sparkQuery, chart: sparkChart };
}
