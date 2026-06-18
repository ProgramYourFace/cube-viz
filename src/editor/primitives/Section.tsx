import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/components/ui/utils";

export interface SectionHeaderProps {
  title: React.ReactNode;
  /** Shown muted to the right of the title (e.g. a summary like "3 measures"). */
  summary?: React.ReactNode;
  /** Right-aligned actions (e.g. an "+ Add" button). Clicks don't toggle. */
  actions?: React.ReactNode;
  collapsible?: boolean;
  open?: boolean;
  onToggle?: () => void;
  /** id of the controlled region, for aria-controls. */
  regionId?: string;
  className?: string;
}

/**
 * A section title bar. On its own it's a static header; inside {@link Section}
 * it becomes the collapsible toggle. `actions` render to the right and stop
 * propagation so an inline "+ Add" doesn't collapse the section.
 */
export function SectionHeader({
  title,
  summary,
  actions,
  collapsible = false,
  open = true,
  onToggle,
  regionId,
  className,
}: SectionHeaderProps): React.ReactElement {
  const content = (
    <>
      {collapsible ? (
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-90",
          )}
        />
      ) : null}
      <span className="text-sm font-medium">{title}</span>
      {summary != null ? (
        <span className="truncate text-xs text-muted-foreground">{summary}</span>
      ) : null}
    </>
  );

  return (
    <div
      data-slot="section-header"
      className={cn("flex items-center justify-between gap-2", className)}
    >
      {collapsible ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={regionId}
          className="flex min-w-0 flex-1 items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
        >
          {content}
        </button>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-1.5">{content}</div>
      )}
      {actions ? (
        <div
          className="flex shrink-0 items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export interface SectionProps {
  title: React.ReactNode;
  summary?: React.ReactNode;
  actions?: React.ReactNode;
  /** Collapsible (default true). When false, renders a static header + body. */
  collapsible?: boolean;
  /** Uncontrolled initial open state. Default true. */
  defaultOpen?: boolean;
  /** Controlled open state (pair with `onOpenChange`). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * A collapsible config section: a {@link SectionHeader} above a body. Controlled
 * (`open`/`onOpenChange`) or uncontrolled (`defaultOpen`). Sections stack
 * vertically in the config pane and read the same web + mobile-WebView.
 */
export function Section({
  title,
  summary,
  actions,
  collapsible = true,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  children,
}: SectionProps): React.ReactElement {
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = collapsible ? (isControlled ? openProp : internalOpen) : true;
  const regionId = React.useId();

  const toggle = React.useCallback(() => {
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [open, isControlled, onOpenChange]);

  return (
    <section
      data-slot="section"
      data-state={open ? "open" : "closed"}
      className={cn("border-b border-border py-2 last:border-b-0", className)}
    >
      <SectionHeader
        title={title}
        summary={summary}
        actions={actions}
        collapsible={collapsible}
        open={open}
        onToggle={toggle}
        regionId={regionId}
      />
      {open ? (
        <div id={regionId} data-slot="section-body" className="pt-2">
          {children}
        </div>
      ) : null}
    </section>
  );
}
