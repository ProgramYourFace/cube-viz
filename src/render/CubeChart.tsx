import { useEffect, useMemo, type ReactElement } from "react";

import type { ChartOptions, ChartSpec, CubeQuery } from "@/spec";
import type { NormalizedChartData } from "@/adapter/types";
import { useNormalizedSeries } from "@/hooks";
import { ChartRenderer } from "@/charts";
import type { ChartConfig } from "@/charts";
import { makeChartFormat } from "@/format";
import type { ChartFormat } from "@/format";
import { createUnitsFormatter, mergeUnitConversions } from "@/units";
import { resolveChart, useCubeVizContext } from "@/provider";
import { kpiSparklineInput } from "./kpiSparkline";

/**
 * The data-fetching wrapper around the pure {@link ChartRenderer}
 * (docs/03-override-theme-preview.md A3, A2.5). `CubeChart` is the JSON→UI surface
 * for a single chart: it fetches + normalizes via `useNormalizedSeries` (which
 * picks up dashboard variable resolution + noFilter automatically when inside a
 * `DashboardProvider`), resolves the family component from the registry, and hands
 * `NormalizedChartData` + `ChartOptions` to `ChartRenderer`.
 *
 * Everything semantic (fetch / castNumerics / Continue-wait polling / variable
 * substitution / annotation-driven formatting) happens below `useNormalizedSeries`;
 * the renderer only maps `NormalizedChartData` → Recharts. Loading / error / empty
 * pass straight through to `ChartRenderer`, which renders the shared state chrome.
 */

export interface CubeChartProps {
  /** The Cube query (may carry `{var}` tokens — resolved by the surrounding dashboard). */
  query: CubeQuery;
  /** The chart option envelope (family, mapping, axes, …). */
  chart: ChartOptions;
  /** Lifts the resolved rows + a refetch up to the chrome (for export / refresh). */
  onState?: (state: { rows: Record<string, unknown>[]; refetch?: () => void; isLoading: boolean }) => void;
}

/** A normalized-but-empty placeholder so `ChartRenderer` can render state chrome before data arrives. */
const EMPTY_DATA: NormalizedChartData = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: true,
};

export function CubeChart({ query, chart, onState }: CubeChartProps): ReactElement {
  const { registry, locale } = useCubeVizContext();

  // Inject the provider's unit system as the default so the pure families (which
  // only see `options`) convert km→mi / L→gal etc. A per-chart `format.unitSystem`
  // still wins. This is how the host-wide "metric|imperial" choice reaches the
  // member-meta-driven formatter without the families needing context.
  const resolvedChart = useMemo<ChartOptions>(() => {
    if (chart.format?.unitSystem || !locale?.unitSystem) return chart;
    return { ...chart, format: { ...chart.format, unitSystem: locale.unitSystem } };
  }, [chart, locale?.unitSystem]);

  // Inject the host's IANA timezone so Cube buckets/relative-ranges resolve in the
  // host's zone (not UTC). A query-level `timezone` always wins.
  const tzQuery = useMemo<CubeQuery>(
    () => (query.timezone || !locale?.timezone ? query : { ...query, timezone: locale.timezone }),
    [query, locale?.timezone],
  );

  const { data, isLoading, error, refetch } = useNormalizedSeries(tzQuery, resolvedChart);

  // KPI sparkline: a KPI's main query is an AGGREGATE (the headline number), so its
  // trend is fetched as a SEPARATE time-bucketed query and merged into the render data
  // below. `kpiSparklineInput` returns null for non-KPI charts or KPIs without a
  // sparkline, so the hook is skipped (no extra request) in the common case.
  const sparkInput = useMemo(() => kpiSparklineInput(tzQuery, resolvedChart), [tzQuery, resolvedChart]);
  const sparkline = useNormalizedSeries(
    sparkInput?.query ?? tzQuery,
    sparkInput?.chart ?? resolvedChart,
    { skip: !sparkInput },
  );

  // Resolve the family component once (registry override → builtin) and feed it to
  // the pure dispatcher as a single-entry `components` map so resolution stays in
  // one place (resolveChart) rather than duplicating the registry-fallback logic.
  const components = useMemo(
    () => ({ [resolvedChart.family]: resolveChart(registry, resolvedChart.family) }),
    [registry, resolvedChart.family],
  );

  // ChartRenderer requires non-null data; before the first result we feed an empty
  // placeholder and let `state.loading` / `state.error` take precedence inside it.
  // For a KPI with a sparkline, merge the trend's series/categories onto the aggregate
  // data — the headline still reads `raw.rows` from the main aggregate query.
  const renderData = useMemo<NormalizedChartData>(() => {
    const base = data ?? EMPTY_DATA;
    if (sparkInput && sparkline.data) {
      return { ...base, series: sparkline.data.series, categories: sparkline.data.categories };
    }
    return base;
  }, [data, sparkInput, sparkline.data]);

  // Lift the resolved rows + a refetch to the chrome (CSV export / Refresh actions).
  useEffect(() => {
    onState?.({ rows: renderData.raw.rows, refetch, isLoading });
  }, [onState, renderData.raw.rows, refetch, isLoading]);

  const emptyConfig: ChartConfig = {};

  // Build the bound, member-aware formatter from the context-resolved ValueFormatter.
  // Units are CORE + on by default: when the host supplies no `locale.formatValue`,
  // fall back to `createUnitsFormatter` (host-registered `locale.units` merged over
  // the defaults) so every axis/tooltip/label localizes metric↔imperial. Memoized on
  // the inputs that change its output: the annotation, resolved options, locale config.
  const valueFormatter = useMemo(
    () => locale.formatValue ?? createUnitsFormatter(mergeUnitConversions(locale.units)),
    [locale.formatValue, locale.units],
  );
  const format = useMemo<ChartFormat>(
    () =>
      makeChartFormat(renderData.raw.annotation, resolvedChart, valueFormatter, {
        locale: locale.locale,
        unitSystem: locale.unitSystem,
      }),
    [renderData.raw.annotation, resolvedChart, valueFormatter, locale.locale, locale.unitSystem],
  );

  return (
    <ChartRenderer
      data={renderData}
      options={resolvedChart}
      config={emptyConfig}
      format={format}
      state={{ loading: isLoading && !data, error }}
      components={components}
    />
  );
}

export interface CubeChartSpecProps {
  /** A standalone chart spec; its `query` + `chart` drive the render. */
  spec: ChartSpec;
}

/** Convenience wrapper that renders a standalone {@link ChartSpec}. */
export function CubeChartSpec({ spec }: CubeChartSpecProps): ReactElement {
  return <CubeChart query={spec.query} chart={spec.chart} />;
}
