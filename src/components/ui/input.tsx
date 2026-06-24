import * as React from "react";

import { cn } from "@/components/ui/utils";

/**
 * shadcn "new-york" Input. Plain `<input>` (no Radix) — the editor primitives
 * (FieldRow, FilterBuilder, MemberPicker search) build on this for all free-text
 * and numeric entry. Styling mirrors the SelectTrigger so controls line up.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
