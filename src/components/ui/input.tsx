import * as React from "react";

import { cn } from "@/components/ui/utils";

/**
 * shadcn "new-york" Input. Plain `<input>` (no Radix) — the editor primitives
 * (FieldRow, FilterBuilder, MemberPicker search) build on this for all free-text
 * and numeric entry. Styling mirrors the SelectTrigger so controls line up.
 *
 * Every instance always carries an `id`: an explicit one when the caller pairs the
 * field with a `<label htmlFor>`, otherwise a stable {@link React.useId} fallback, so
 * no rendered field is ever anonymous (Chrome reports id-less fields as an issue and
 * cannot autofill them). The fallback is NOT a substitute for a label — callers still
 * own the `<label htmlFor>` / `aria-label` that names the field.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, id, ...props }, ref) => {
    const fallbackId = React.useId();
    return (
      <input
        ref={ref}
        type={type}
        id={id ?? fallbackId}
        data-slot="input"
        className={cn("cv-input", className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
