import * as React from "react";

import { cn } from "@/components/ui/utils";
import { ChartColorTokenSchema, type ChartColorToken } from "@/spec";

const TOKENS = ChartColorTokenSchema.options;

export interface ColorTokenPickerProps {
  /** Selected token; `undefined` = inherit the auto-assigned ramp color. */
  value?: ChartColorToken;
  /** `null` is emitted when the user clears back to auto (only if `allowClear`). */
  onChange: (token: ChartColorToken | null) => void;
  /** Show an "auto" swatch that clears the override. Default true. */
  allowClear?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * A swatch row over the spec's five chart tokens (`chart-1…chart-5`). Each swatch
 * renders the live theme color via `var(--chart-N)`, so it always matches the
 * host theme. Selecting clears to auto if the same token is re-clicked (when
 * `allowClear`), or use the explicit "Auto" swatch.
 */
export function ColorTokenPicker({
  value,
  onChange,
  allowClear = true,
  disabled,
  className,
}: ColorTokenPickerProps): React.ReactElement {
  return (
    <div
      data-slot="color-token-picker"
      role="radiogroup"
      aria-label="Series color"
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      {allowClear ? (
        <button
          type="button"
          role="radio"
          aria-checked={value === undefined}
          aria-label="Auto color"
          disabled={disabled}
          onClick={() => onChange(null)}
          className={cn(
            "relative flex size-6 items-center justify-center rounded-full border text-[9px] font-medium uppercase text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
            value === undefined
              ? "border-ring ring-2 ring-ring/40"
              : "border-input hover:border-ring",
          )}
        >
          A
        </button>
      ) : null}
      {TOKENS.map((token) => {
        const selected = value === token;
        return (
          <button
            key={token}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={token}
            title={token}
            disabled={disabled}
            onClick={() => onChange(selected && allowClear ? null : token)}
            className={cn(
              "size-6 rounded-full border transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
              selected ? "border-ring ring-2 ring-ring/40" : "border-black/10 hover:border-ring",
            )}
            style={{ backgroundColor: `var(--${token})` }}
          />
        );
      })}
    </div>
  );
}
