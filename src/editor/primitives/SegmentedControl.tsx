import * as React from "react";

import { cn } from "@/components/ui/utils";

export interface SegmentedOption<T extends string> {
  value: T;
  label: React.ReactNode;
  /** Optional leading icon (lucide element). */
  icon?: React.ReactNode;
  /** Tooltip / a11y label when `label` is icon-only. */
  title?: string;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Stretch segments to fill the row (default true). */
  fullWidth?: boolean;
  size?: "sm" | "default";
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

/**
 * A compact single-select segmented toggle — the editor's pick for small, fixed
 * enums (chart family, orientation, stackMode, legend position). Generic over the
 * option value so callers get exhaustively-typed `onChange`. Wraps to multiple
 * rows when the container is narrow rather than overflowing, so it stays usable
 * in a mobile WebView.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  fullWidth = true,
  size = "default",
  disabled,
  "aria-label": ariaLabel,
  className,
}: SegmentedControlProps<T>): React.ReactElement {
  return (
    <div
      data-slot="segmented-control"
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "flex flex-wrap gap-1 rounded-lg bg-muted p-1 text-muted-foreground",
        className,
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            title={opt.title}
            disabled={disabled || opt.disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              size === "sm" ? "h-7 px-2 text-xs" : "h-7 px-2.5 text-sm",
              fullWidth && "flex-1",
              selected
                ? "bg-background text-foreground shadow-sm"
                : "hover:text-foreground",
            )}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
