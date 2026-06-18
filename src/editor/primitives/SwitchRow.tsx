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
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-input",
        className,
      )}
    >
      <span
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform",
          checked ? "translate-x-4" : "translate-x-0",
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
      className={cn("flex items-center justify-between gap-3 py-1.5", className)}
    >
      <label
        htmlFor={id}
        className={cn(
          "flex min-w-0 flex-col gap-0.5",
          disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        )}
      >
        <span className="text-sm font-medium leading-none">{label}</span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </label>
      <Switch id={id} checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  );
}
