import { useEffect, useMemo, type ReactElement } from "react";

import type { ChartOptions, ChartSpec, CubeQuery } from "@/spec";
import type { NormalizedChartData } from "@/adapter/types";
import { useNormalizedSeries } from "@/hooks";
import { ChartRenderer } from "@/charts";
import type { ChartConfig } from "@/charts";
import { makeChartFormat } from "@/format";
import type { ChartFormat } from "@/format";
import { createUnitsFormatter, mergeUnitConversions } from "@/units";
import { resolveChart, useCubeVizContext, useFamilyRegistry } from "@/provider";
import { kpiSparklineInput } from "./kpiSparkline";
import { comparePreviousInput } from "./comparePrevious";

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
  /** Editing surface: hidden chrome renders greyed (not removed) — see ChartComponentProps. */
  editing?: boolean;
}

/** A normalized-but-empty placeholder so `ChartRenderer` can render state chrome before data arrives. */
const EMPTY_DATA: NormalizedChartData = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: true,
};

export function CubeChart({ query, chart, onState, editing }: CubeChartProps): ReactElement {
  const { registry, locale } = useCubeVizContext();
  // The family registry (builtins + host families), read ONCE so resolveChart,
  // comparePreviousInput, and ChartRenderer all share one stable identity.
  const families = useFamilyRegistry();

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

  const { data, isLoading, error, refetch, resolvedQuery } = useNormalizedSeries(tzQuery, resolvedChart);

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

  // Previous-period comparison (bar/line/area): the immediately-preceding window is
  // fetched as a SEPARATE query and merged below as muted, dashed companion series.
  // Built from the RESOLVED query so a date range set via a {var} works the same as a
  // literal one; fetched with skipResolve since it's already literal. Returns null when
  // comparison is off / not applicable, so the hook is skipped (no extra request).
  const compareInput = useMemo(
    () => comparePreviousInput(resolvedQuery, resolvedChart, families),
    [resolvedQuery, resolvedChart, families],
  );
  const compare = useNormalizedSeries(
    compareInput?.query ?? tzQuery,
    resolvedChart,
    { skip: !compareInput, skipResolve: true },
  );

  // Resolve the family component once (registry override → builtin) and feed it to
  // the pure dispatcher as a single-entry `components` map so resolution stays in
  // one place (resolveChart) rather than duplicating the registry-fallback logic.
  const components = useMemo(
    () => ({ [resolvedChart.family]: resolveChart(registry, resolvedChart.family, families) }),
    [registry, resolvedChart.family, families],
  );

  // ChartRenderer requires non-null data; before the first result we feed an empty
  // placeholder and let `state.loading` / `state.error` take precedence inside it.
  // For a KPI with a sparkline, merge the trend's series/categories onto the aggregate
  // data — the headline still reads `raw.rows` from the main aggregate query.
  const renderData = useMemo<NormalizedChartData>(() => {
    let result = data ?? EMPTY_DATA;

    // KPI sparkline: the trend's series/categories overlay the aggregate (headline reads raw).
    if (sparkInput && sparkline.data) {
      result = { ...result, series: sparkline.data.series, categories: sparkline.data.categories };
      // Recompute `empty` from what the KPI family ACTUALLY renders: the headline reads
      // `raw.rows` and the sparkline footer reads `series`. The aggregate `data.empty`
      // alone would suppress (via ChartRenderer's empty short-circuit) a KPI whose
      // headline range is empty but whose trend has data — so the cell is non-empty when
      // EITHER source has something to show.
      const hasHeadline = result.raw.rows.length > 0;
      const hasTrend = result.series.some((s) => s.data.some((v) => v !== null));
      result = { ...result, empty: !hasHeadline && !hasTrend };
    }

    // Previous-period comparison (applied AFTER the sparkline so a KPI can have both).
    if (compareInput && compare.data) {
      if (compareInput.mode === "kpiRow") {
        // KPI: append the prior-period aggregate as the 2nd row, which the KPI delta
        // (computeDelta) reads as the baseline. The headline still reads row 0.
        const priorRow = compare.data.raw.rows[0];
        if (priorRow) {
          const current = result.raw.rows[0];
          result = {
            ...result,
            raw: { ...result.raw, rows: current ? [current, priorRow] : [priorRow] },
          };
        }
      } else if (result.series.length > 0) {
        // bar/line/area: one muted/dashed companion series per current series, paired by
        // key (so it inherits the same colour) and read positionally (bucket i) against the
        // current categories — "this period vs last" overlaid.
        //
        // buildRows reads every series positionally (`s.data[i]` against category i), so a
        // companion MUST be exactly `result.categories.length` long and offset-aligned to
        // the current window's start. Both windows are anchored at their start (start-of-
        // week/month/…), so offset-from-start IS the correct pairing — but the prev window
        // can have a different bucket count (e.g. "this week" on day granularity yields a
        // partial current week vs a whole 7-day prior week; "last 1 month" on days yields
        // April's 30 vs May's 31). Reproject onto the current length: truncate the prev
        // tail that has no current counterpart, null-pad where prev is shorter. Without
        // this, a longer prev silently drops its tail and a shorter prev leaves trailing
        // buckets mis-paired.
        const len = result.categories.length;
        const companions = compare.data.series.map((s) => {
          const paired = result.series.find((b) => b.key === s.key);
          const data = Array.from({ length: len }, (_, i) => s.data[i] ?? null);
          return {
            ...s,
            key: `${s.key}__prev`,
            label: `${paired?.label ?? s.label} (prev)`,
            colorToken: paired?.colorToken ?? s.colorToken,
            data,
            meta: { ...s.meta, companion: true },
          };
        });
        result = { ...result, series: [...result.series, ...companions] };
      }
    }
    return result;
  }, [data, sparkInput, sparkline.data, compareInput, compare.data]);

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
      registry={families}
      editing={editing}
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
