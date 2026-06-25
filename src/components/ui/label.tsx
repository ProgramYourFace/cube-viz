import * as React from "react";

import { cn } from "@/components/ui/utils";

/**
 * shadcn "new-york" Label, implemented WITHOUT `@radix-ui/react-label` (not
 * installed in cube-viz). A plain `<label>` carries the same a11y semantics for
 * our use (clicking focuses the associated control via `htmlFor`); the
 * peer-disabled styling matches the Radix variant so disabled FieldRows dim.
 */
const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn(
          "cv:flex cv:items-center cv:gap-2 cv:text-sm cv:font-medium cv:leading-none cv:select-none cv:peer-disabled:cursor-not-allowed cv:peer-disabled:opacity-70",
          className,
        )}
        {...props}
      />
    );
  },
);
Label.displayName = "Label";

export { Label };
