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
    <div data-slot="field-row" className={cn("cv:flex cv:flex-col cv:gap-1.5 cv:py-1.5", className)}>
      <div className="cv:flex cv:items-center cv:justify-between cv:gap-2">
        <Label htmlFor={htmlFor} className="cv:text-muted-foreground">
          {label}
        </Label>
        {action ? <div className="cv:flex cv:shrink-0 cv:items-center">{action}</div> : null}
      </div>
      {children}
      {error ? (
        <p className="cv:text-xs cv:text-destructive">{error}</p>
      ) : hint ? (
        <p className="cv:text-xs cv:text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
