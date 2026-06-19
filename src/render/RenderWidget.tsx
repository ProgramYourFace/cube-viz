import { useCallback, useState, type ReactElement, type ReactNode } from "react";

import type { WidgetSpec } from "@/spec";

import { CubeChart, type CubeChartProps } from "./CubeChart";
import { TextWidget } from "./TextWidget";
import { InputWidgetView } from "./InputWidgetView";
import { WidgetActionsMenu } from "./WidgetActionsMenu";
import { WidgetChrome } from "./WidgetChrome";

/**
 * Dispatch a {@link WidgetSpec} by `type` (chart / text / input) to its renderer,
 * wrapped in the (overridable) {@link WidgetChrome} (docs/03-override-theme-preview.md
 * A2.3, A3). The body owns its own loading / error / empty states (a chart fetches
 * via `CubeChart`); the chrome owns the frame + drag handle.
 *
 * `dragHandleProps` come from the Dashboard's grid item and are spread onto the
 * chrome header so the title bar is the RGL drag handle in edit mode.
 */

export interface RenderWidgetProps {
  /** The widget to render. */
  widget: WidgetSpec;
  /** Spread onto the chrome header so it acts as the RGL drag handle. */
  dragHandleProps?: Record<string, unknown>;
  /** Edit mode — gates the chrome actions menu (export/edit affordances). */
  editable?: boolean;
}

/** Render the body for a widget by its discriminated `type`. */
function WidgetBody({
  widget,
  onState,
}: {
  widget: WidgetSpec;
  onState?: CubeChartProps["onState"];
}): ReactElement {
  switch (widget.type) {
    case "chart":
      return <CubeChart query={widget.query} chart={widget.chart} onState={onState} />;
    case "text":
      return <TextWidget doc={widget.doc} />;
    case "input":
      // The widget title becomes the field label (no separate card header).
      return <InputWidgetView control={widget.control} title={widget.title} />;
  }
}

export function RenderWidget({ widget, dragHandleProps = {} }: RenderWidgetProps): ReactElement {
  // Lift the chart's rows + refetch up so the chrome can offer Export / Refresh — in
  // BOTH view and edit mode (a viewer can get the data out of an embedded dashboard).
  const [chartState, setChartState] = useState<{
    rows: Record<string, unknown>[];
    refetch?: () => void;
  }>({ rows: [] });
  const onState = useCallback<NonNullable<CubeChartProps["onState"]>>(
    (s) => setChartState({ rows: s.rows, refetch: s.refetch }),
    [],
  );

  // Text + input are FRAMELESS: no card, no title header — they sit directly on the
  // dashboard (text carries its own headings; an input's title is its field label).
  // Only data widgets (charts) get the bordered Card chrome + draggable title bar.
  if (widget.type === "text" || widget.type === "input") {
    return (
      <div className="h-full w-full overflow-auto p-2">
        <WidgetBody widget={widget} />
      </div>
    );
  }

  const menu: ReactNode = (
    <WidgetActionsMenu title={widget.title} rows={chartState.rows} refetch={chartState.refetch} />
  );

  return (
    <WidgetChrome
      widget={widget}
      title={widget.title}
      menu={menu}
      dragHandleProps={dragHandleProps}
      state={{ loading: false, empty: false }}
    >
      <WidgetBody widget={widget} onState={onState} />
    </WidgetChrome>
  );
}
