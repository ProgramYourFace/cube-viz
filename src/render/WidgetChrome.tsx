import type { ReactElement } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCubeVizContext, type WidgetChromeProps } from "@/provider";
import { cn } from "@/components/ui/utils";

/**
 * The default widget frame (docs/03-override-theme-preview.md A2.3): a `Card` whose
 * optional title header doubles as the react-grid-layout drag handle (the chrome
 * header carries the RGL handle class + `dragHandleProps`). The body fills the
 * remaining height so charts can measure inside it.
 *
 * `WidgetChrome` honors `registry.chrome.widget`: when a host supplies a custom
 * frame it is rendered with the SAME {@link WidgetChromeProps} (including
 * `dragHandleProps`), so the layout engine stays library-owned while the look is
 * host-owned. Replacing chrome restyles every widget at once.
 */

/** The RGL drag-handle class — Dashboard passes this as `draggableHandle`. */
export const DRAG_HANDLE_CLASS = "cube-viz-drag-handle";

export function WidgetChrome(props: WidgetChromeProps): ReactElement {
  const { registry } = useCubeVizContext();
  const Override = registry.chrome?.widget;
  if (Override) return <Override {...props} />;

  const { title, menu, dragHandleProps, children } = props;

  // Inline, Embeddable-style frame: a softly-tinted rounded panel — NO hard
  // border, NO drop shadow, NO header divider — so charts read as inline cards
  // rather than boxed-in. (Restyle every widget at once by overriding
  // `registry.chrome.widget`.)
  return (
    <Card className="cv-widget-chrome">
      {title ? (
        <CardHeader
          {...dragHandleProps}
          className={cn(DRAG_HANDLE_CLASS, "cv-widget-chrome-header")}
        >
          <CardTitle className="cv-widget-chrome-title">{title}</CardTitle>
          {menu}
        </CardHeader>
      ) : null}
      <CardContent className="cv-widget-chrome-body">{children}</CardContent>
    </Card>
  );
}
