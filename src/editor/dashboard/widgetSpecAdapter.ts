import { SCHEMA_VERSION, type ChartSpec, type ChartWidget } from "@/spec";

/**
 * The ChartWidget ↔ ChartSpec adapters at the dashboard/chart-editor seam. The
 * ChartEditor edits a standalone `ChartSpec`; the dashboard stores a `ChartWidget`
 * (the same query/chart under a widget envelope with `title`). The pair MUST be a
 * lossless round trip — `widgetToChartSpec(chartSpecToWidget(w, s))` has the same
 * content as `s` — because the chart editor recognises its own emission coming back
 * as the `spec` prop by CONTENT (see useChartEditorState); a lossy adapter would make
 * every echo look like an external change and re-seed over in-flight typing.
 */

/** Adapt a ChartWidget into the ChartSpec the ChartEditor edits. */
export function widgetToChartSpec(w: ChartWidget): ChartSpec {
  const spec: ChartSpec = {
    schemaVersion: SCHEMA_VERSION,
    id: w.id,
    kind: "chart",
    query: w.query,
    chart: w.chart,
  };
  if (w.title !== undefined) spec.name = w.title;
  return spec;
}

/** Pull the query/chart (and edited name) back out of a ChartSpec into the widget. */
export function chartSpecToWidget(prev: ChartWidget, spec: ChartSpec): ChartWidget {
  const next: ChartWidget = {
    ...prev,
    query: spec.query,
    chart: spec.chart,
  };
  if (spec.name !== undefined) next.title = spec.name;
  return next;
}
