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
      // Track/thumb visuals key off the data-state attribute (see editor-dashboard.css).
      className={cn("cv-switch", className)}
    >
      <span className="cv-switch-thumb" />
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
      className={cn("cv-switch-row", className)}
    >
      <label
        htmlFor={id}
        className={cn("cv-switch-row-label", disabled && "cv-switch-row-label--disabled")}
      >
        <span className="cv-switch-row-title">{label}</span>
        {hint ? <span className="cv-switch-row-hint">{hint}</span> : null}
      </label>
      <Switch id={id} checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  );
}
