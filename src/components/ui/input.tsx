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
        className={cn("cv-input", className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
