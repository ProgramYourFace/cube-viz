import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/components/ui/utils";

export interface FieldRowProps {
  label: React.ReactNode;
  /** Helper text under the control. */
  hint?: React.ReactNode;
  /** Inline error; when set, overrides `hint` styling to destructive. */
  error?: React.ReactNode;
  /** `htmlFor` → focuses the labelled control on label click. */
  htmlFor?: string;
  /** Right-aligned adornment next to the label (e.g. a "use variable" toggle). */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * A labelled control row — the atomic building block of every config form. Label
 * on top, control below, optional hint/error and a right-aligned label action
 * (e.g. the FilterBuilder's "use variable" toggle). Stacked layout so it fits the
 * narrow editor pane and a mobile WebView without reflow.
 */
export function FieldRow({
  label,
  hint,
  error,
  htmlFor,
  action,
  className,
  children,
}: FieldRowProps): React.ReactElement {
  return (
    <div data-slot="field-row" className={cn("flex flex-col gap-1.5 py-1.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={htmlFor} className="text-muted-foreground">
          {label}
        </Label>
        {action ? <div className="flex shrink-0 items-center">{action}</div> : null}
      </div>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
