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
        "flex w-full min-w-[8rem] items-center gap-1 rounded-md border border-border bg-background px-1.5 py-1 transition-opacity",
        hidden && "opacity-50",
      )}
    >
      {title ? (
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </span>
      ) : null}
      <input
        value={ax.label ?? ""}
        placeholder={auto ?? "Axis title"}
        disabled={hidden}
        onChange={(e) => patchAxis(spec, update, axis, { label: e.target.value || undefined })}
        title={`Axis title${auto ? ` — defaults to “${auto}”` : ""} (leave blank for the default)`}
        className="h-6 min-w-0 flex-1 rounded border border-input bg-background px-1.5 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
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
 * hidden (the chart greys its legend to match in edit mode).
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
    <div className={cn("flex flex-col gap-1 transition-opacity", hidden && "opacity-50")}>
      <span className="px-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        Show legend
      </span>
      <button
        type="button"
        onClick={() =>
          update({ ...spec, chart: { ...spec.chart, legend: { ...spec.chart.legend, show: !hidden ? false : true } } })
        }
        aria-label={hidden ? "Show legend" : "Hide legend"}
        title={hidden ? "Show legend" : "Hide legend"}
        className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {hidden ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
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
      className="rounded p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {hidden ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
    </button>
  );
}
