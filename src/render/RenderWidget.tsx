import type { ReactElement, ReactNode } from "react";

import type { WidgetSpec } from "@/spec";

import { CubeChart } from "./CubeChart";
import { TextWidget } from "./TextWidget";
import { InputWidgetView } from "./InputWidgetView";
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
function WidgetBody({ widget }: { widget: WidgetSpec }): ReactElement {
  switch (widget.type) {
    case "chart":
      return <CubeChart query={widget.query} chart={widget.chart} />;
    case "text":
      return <TextWidget doc={widget.doc} />;
    case "input":
      return <InputWidgetView control={widget.control} />;
  }
}

export function RenderWidget({
  widget,
  dragHandleProps = {},
  editable = false,
}: RenderWidgetProps): ReactElement {
  // The chrome actions menu — empty in view mode; reserved for export/edit in edit
  // mode (wired by the editor layer in a later wave). Kept as a slot here.
  const menu: ReactNode = editable ? null : null;

  return (
    <WidgetChrome
      widget={widget}
      title={widget.title}
      menu={menu}
      dragHandleProps={dragHandleProps}
      state={{ loading: false, empty: false }}
    >
      <WidgetBody widget={widget} />
    </WidgetChrome>
  );
}
