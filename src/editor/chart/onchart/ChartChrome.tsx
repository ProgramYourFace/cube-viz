import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/components/ui/utils";
import type { AxisOptions, ChartSpec } from "@/spec";

/**
 * In-context editing of a chart's CHROME — axis labels (auto, with an inline override)
 * and the show/hide of axes and the legend — instead of burying them as toggles in the
 * chart-type options. A hidden element greys its control. This is the "fewest knobs,
 * edit on the chart" surface; the renderers honor `axes.*.{label,hide}` + `legend.show`.
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

/** An axis chrome control: title + inline label override (auto placeholder) + show/hide. */
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
  const hidden = ax.labelHide === true;
  // The visible "TITLE" caption IS this input's label, so it is what names the field:
  // the caption carries an id and the input points at it (`aria-labelledby`), which
  // keeps the compact inline design and still gives the field a real accessible name.
  // With no caption rendered, fall back to naming the axis outright.
  const captionId = React.useId();
  const inputId = React.useId();
  const axisName = axis === "y" ? "Value axis title" : "Category axis title";
  return (
    <div
      className={cn(
        "cv-axis-chrome",
        hidden && "cv-axis-chrome--hidden",
      )}
    >
      {title ? (
        <span id={captionId} className="cv-axis-chrome-label">
          {title}
        </span>
      ) : null}
      <input
        id={inputId}
        {...(title ? { "aria-labelledby": captionId } : { "aria-label": axisName })}
        value={ax.label ?? ""}
        placeholder={auto ?? "Axis title"}
        disabled={hidden}
        onChange={(e) => patchAxis(spec, update, axis, { label: e.target.value || undefined })}
        title={`Axis title${auto ? ` — defaults to “${auto}”` : ""} (leave blank for the default)`}
        className="cv-axis-chrome-input"
      />
      <EyeButton
        hidden={hidden}
        what="axis title"
        onClick={() => patchAxis(spec, update, axis, { labelHide: hidden ? undefined : true })}
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

function EyeButton({
  hidden,
  what,
  onClick,
}: {
  hidden: boolean;
  what: string;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={hidden ? `Show ${what}` : `Hide ${what}`}
      title={hidden ? `Show ${what}` : `Hide ${what}`}
      className="cv-chrome-eye"
    >
      {hidden ? <EyeOff className="cv-ec-icon" /> : <Eye className="cv-ec-icon" />}
    </button>
  );
}
