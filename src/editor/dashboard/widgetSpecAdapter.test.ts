import { describe, expect, it } from "vitest";

import { SCHEMA_VERSION, type ChartWidget } from "@/spec";

import { isExternalSpec, specKey } from "../chart/useChartEditorState";
import { chartSpecToWidget, widgetToChartSpec } from "./widgetSpecAdapter";

const widget = (title?: string): ChartWidget =>
  ({
    id: "w1",
    type: "chart",
    ...(title !== undefined ? { title } : {}),
    query: { measures: ["m.count"], dimensions: ["m.name"] },
    chart: { family: "bar", legend: { show: true } },
  }) as ChartWidget;

/**
 * The property the chart editor's echo detection rests on: what it emits comes back
 * through the dashboard editor as the SAME content. If this ever breaks, every emission
 * reads as an external change and re-seeds over in-flight typing.
 */
describe("widget ↔ chart-spec adapters round-trip losslessly", () => {
  it("with a title", () => {
    const w = widget("Trips");
    const spec = widgetToChartSpec(w);
    expect(spec.name).toBe("Trips");
    const back = widgetToChartSpec(chartSpecToWidget(w, spec));
    expect(specKey(back)).toBe(specKey(spec));
  });

  it("without a title (no `name` key is minted)", () => {
    const w = widget();
    const spec = widgetToChartSpec(w);
    expect("name" in spec).toBe(false);
    const back = widgetToChartSpec(chartSpecToWidget(w, spec));
    expect(specKey(back)).toBe(specKey(spec));
  });

  it("after an edit, the echo of the emitted spec is not external", () => {
    const w = widget("Trips");
    const emitted = { ...widgetToChartSpec(w), chart: { family: "line" as const } };
    const echoed = widgetToChartSpec(chartSpecToWidget(w, emitted));
    expect(isExternalSpec(specKey(echoed), specKey(emitted))).toBe(false);
  });

  it("a change made elsewhere (undo, AI edit, collaborator) IS external", () => {
    const w = widget("Trips");
    const emitted = widgetToChartSpec(w);
    const external = widgetToChartSpec({ ...w, title: "Trips by day" });
    expect(isExternalSpec(specKey(external), specKey(emitted))).toBe(true);
  });

  it("an identity-only change is not external", () => {
    const spec = widgetToChartSpec(widget("Trips"));
    const copy = JSON.parse(JSON.stringify(spec));
    expect(copy).not.toBe(spec);
    expect(isExternalSpec(specKey(copy), specKey(spec))).toBe(false);
  });

  it("preserves the widget envelope the chart editor never sees", () => {
    const w = { ...widget("Trips"), schemaVersion: SCHEMA_VERSION } as ChartWidget;
    const next = chartSpecToWidget(w, { ...widgetToChartSpec(w), name: "Renamed" });
    expect(next.id).toBe("w1");
    expect(next.type).toBe("chart");
    expect(next.title).toBe("Renamed");
  });
});
