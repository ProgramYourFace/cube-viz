import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/components/ui/utils";
import type { AxisOptions, ChartSpec } from "@/spec";

/**
 * In-context editing of a chart's CHROME — the axis titles and the legend's visibility —
 * instead of burying them as toggles in the chart-type options.
 *
 * The axis title has no hide button. It used to: a text input whose PLACEHOLDER showed
 * the automatic title, beside an eye that set `labelHide`. That is three states across
 * two controls (auto / overridden / hidden) where the user can only see two, and the
 * input went disabled when hidden — so the thing you would reach for to fix it was the
 * thing that stopped working.
 *
 * Now the input shows the title that is actually on the chart, and clearing it removes
 * the title. One control, and what you read is what renders. In the spec that is
 * `label: undefined` ⇒ automatic, `label: ""` ⇒ no title, anything else ⇒ itself; the
 * separate `labelHide` flag is gone (v4).
 */

type AxisKey = "x" | "y";

function patchAxis(
  spec: ChartSpec,
  update: (n: ChartSpec) => void,
  axis: AxisKey,
  patch: Partial<AxisOptions>,
): void {
  const ax = (spec.chart.axes?.[axis] ?? {}) as AxisOptions;
  update({ ...spec, chart: { ...spec.chart, axes: { ...spec.chart.axes, [axis]: { ...ax, ...patch } } } });
}

/** The axis title field. Shows what the chart draws; clearing it removes the title. */
export function AxisChrome({
  spec,
  update,
  axis,
  title,
  auto,
}: {
  spec: ChartSpec;
  update: (n: ChartSpec) => void;
  axis: AxisKey;
  title: string;
  auto?: string;
}): React.ReactElement {
  const ax = (spec.chart.axes?.[axis] ?? {}) as AxisOptions;
  // WYSIWYG: show the title the chart is actually drawing. Untouched, that is the
  // member's own name (`auto`) and the spec stays clean — `label` is only written once
  // the user edits, so renaming the member keeps flowing through until then.
  const shown = ax.label ?? auto ?? "";
  const hidden = ax.label === "";
  // The visible "TITLE" caption IS this input's label, so it is what names the field:
  // the caption carries an id and the input points at it (`aria-labelledby`), which
  // keeps the compact inline design and still gives the field a real accessible name.
  // With no caption rendered, fall back to naming the axis outright.
  const captionId = React.useId();
  const inputId = React.useId();
  const axisName = axis === "y" ? "Value axis title" : "Category axis title";
  return (
    <div className={cn("cv-axis-chrome", hidden && "cv-axis-chrome--hidden")}>
      {title ? (
        <span id={captionId} className="cv-axis-chrome-label">
          {title}
        </span>
      ) : null}
      <input
        id={inputId}
        {...(title ? { "aria-labelledby": captionId } : { "aria-label": axisName })}
        value={shown}
        placeholder="No title"
        // "" is MEANINGFUL here (no title) and must reach the spec, so this cannot
        // collapse an empty string to undefined the way an optional field usually would.
        onChange={(e) => patchAxis(spec, update, axis, { label: e.target.value })}
        title="Axis title — clear it to remove the title"
        className="cv-axis-chrome-input"
      />
    </div>
  );
}

/**
 * The legend chrome control, rendered as a labeled column so it lines up beside the
 * category / split wells: a header + a show/hide toggle that greys when the legend is
 * hidden. Hiding it removes the legend from the chart entirely (in edit mode too); this
 * toggle is the re-enable affordance.
 */
export function LegendChrome({
  spec,
  update,
}: {
  spec: ChartSpec;
  update: (n: ChartSpec) => void;
}): React.ReactElement {
  const hidden = spec.chart.legend?.show === false;
  return (
    <div className={cn("cv-legend-chrome", hidden && "cv-legend-chrome--hidden")}>
      <span className="cv-legend-chrome-label">
        Show legend
      </span>
      <button
        type="button"
        onClick={() =>
          update({ ...spec, chart: { ...spec.chart, legend: { ...spec.chart.legend, show: !hidden ? false : true } } })
        }
        aria-label={hidden ? "Show legend" : "Hide legend"}
        title={hidden ? "Show legend" : "Hide legend"}
        className="cv-legend-chrome-toggle"
      >
        {hidden ? <EyeOff className="cv-ec-icon" /> : <Eye className="cv-ec-icon" />}
        {hidden ? "Hidden" : "Shown"}
      </button>
    </div>
  );
}
