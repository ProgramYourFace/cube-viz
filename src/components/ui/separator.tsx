import * as React from "react";

import { cn } from "@/components/ui/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  /** Purely decorative (default) hides it from the a11y tree. */
  decorative?: boolean;
}

/**
 * shadcn "new-york" Separator, implemented WITHOUT `@radix-ui/react-separator`
 * (not installed). A 1px divider; `orientation="vertical"` is used by the
 * EditorShell two-pane border and inline toolbars.
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="separator"
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className,
        )}
        {...props}
      />
    );
  },
);
Separator.displayName = "Separator";

export { Separator };
