import * as React from "react";

import { cn } from "@/components/ui/utils";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
  className?: string;
}

/**
 * A bare accessible toggle switch — implemented WITHOUT `@radix-ui/react-switch`
 * (not installed). `role="switch"` + `aria-checked`; the thumb slides via a
 * transform. Used standalone or inside {@link SwitchRow}.
 */
export function Switch({
  checked,
  onChange,
  disabled,
  id,
  "aria-label": ariaLabel,
  className,
}: SwitchProps): React.ReactElement {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => onChange(!checked)}
      className={cn(
        "peer cv:inline-flex cv:h-5 cv:w-9 cv:shrink-0 cv:cursor-pointer cv:items-center cv:rounded-full cv:border-2 cv:border-transparent cv:transition-colors cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50",
        checked ? "cv:bg-primary" : "cv:bg-input",
        className,
      )}
    >
      <span
        className={cn(
          "cv:pointer-events-none cv:block cv:size-4 cv:rounded-full cv:bg-background cv:shadow-sm cv:ring-0 cv:transition-transform",
          checked ? "cv:translate-x-4" : "cv:translate-x-0",
        )}
      />
    </button>
  );
}

export interface SwitchRowProps {
  label: React.ReactNode;
  /** Helper text under the label. */
  hint?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * A label + helper text on the left, a {@link Switch} on the right — the standard
 * boolean option row (e.g. "Show legend", "Stack series"). Clicking the label
 * toggles the switch.
 */
export function SwitchRow({
  label,
  hint,
  checked,
  onChange,
  disabled,
  className,
}: SwitchRowProps): React.ReactElement {
  const id = React.useId();
  return (
    <div
      data-slot="switch-row"
      className={cn("cv:flex cv:items-center cv:justify-between cv:gap-3 cv:py-1.5", className)}
    >
      <label
        htmlFor={id}
        className={cn(
          "cv:flex cv:min-w-0 cv:flex-col cv:gap-0.5",
          disabled ? "cv:cursor-not-allowed cv:opacity-70" : "cv:cursor-pointer",
        )}
      >
        <span className="cv:text-sm cv:font-medium cv:leading-none">{label}</span>
        {hint ? <span className="cv:text-xs cv:text-muted-foreground">{hint}</span> : null}
      </label>
      <Switch id={id} checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  );
}
