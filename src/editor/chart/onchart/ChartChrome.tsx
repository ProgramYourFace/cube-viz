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

type AxisKey = "x" | "y" | "y2";

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
  return (
    <div
      className={cn(
        "cv:flex cv:w-full cv:min-w-[8rem] cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-1.5 cv:py-1 cv:transition-opacity",
        hidden && "cv:opacity-50",
      )}
    >
      {title ? (
        <span className="cv:shrink-0 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground">
          {title}
        </span>
      ) : null}
      <input
        value={ax.label ?? ""}
        placeholder={auto ?? "Axis title"}
        disabled={hidden}
        onChange={(e) => patchAxis(spec, update, axis, { label: e.target.value || undefined })}
        title={`Axis title${auto ? ` — defaults to “${auto}”` : ""} (leave blank for the default)`}
        className="cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
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
    <div className={cn("cv:flex cv:flex-col cv:gap-1 cv:transition-opacity", hidden && "cv:opacity-50")}>
      <span className="cv:px-0.5 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground">
        Show legend
      </span>
      <button
        type="button"
        onClick={() =>
          update({ ...spec, chart: { ...spec.chart, legend: { ...spec.chart.legend, show: !hidden ? false : true } } })
        }
        aria-label={hidden ? "Show legend" : "Hide legend"}
        title={hidden ? "Show legend" : "Hide legend"}
        className="cv:flex cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2 cv:py-1 cv:text-xs cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground"
      >
        {hidden ? <EyeOff className="cv:size-3.5" /> : <Eye className="cv:size-3.5" />}
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
      className="cv:rounded cv:p-0.5 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground"
    >
      {hidden ? <EyeOff className="cv:size-3.5" /> : <Eye className="cv:size-3.5" />}
    </button>
  );
}
