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
    <Card className="cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none">
      {title ? (
        <CardHeader
          {...dragHandleProps}
          className={cn(
            DRAG_HANDLE_CLASS,
            "cv:flex cv:shrink-0 cv:cursor-grab cv:flex-row cv:items-center cv:justify-between cv:gap-2",
            "cv:px-4 cv:pb-1 cv:pt-3 cv:active:cursor-grabbing",
          )}
        >
          <CardTitle className="cv:truncate cv:text-sm cv:font-semibold">{title}</CardTitle>
          {menu}
        </CardHeader>
      ) : null}
      <CardContent className="cv:min-h-0 cv:flex-1 cv:overflow-auto cv:px-4 cv:pb-4 cv:pt-1">{children}</CardContent>
    </Card>
  );
}
