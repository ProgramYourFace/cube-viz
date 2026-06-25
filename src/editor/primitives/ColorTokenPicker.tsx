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
      className={cn("cv:flex cv:flex-wrap cv:items-center cv:gap-1.5", className)}
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
            "cv:relative cv:flex cv:size-6 cv:items-center cv:justify-center cv:rounded-full cv:border cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground cv:transition-shadow cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:opacity-50",
            value === undefined
              ? "cv:border-ring cv:ring-2 cv:ring-ring/40"
              : "cv:border-input cv:hover:border-ring",
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
              "cv:size-6 cv:rounded-full cv:border cv:transition-shadow cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:opacity-50",
              selected ? "cv:border-ring cv:ring-2 cv:ring-ring/40" : "cv:border-black/10 cv:hover:border-ring",
            )}
            style={{ backgroundColor: `var(--${token})` }}
          />
        );
      })}
    </div>
  );
}
