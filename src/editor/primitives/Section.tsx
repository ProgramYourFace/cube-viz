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
          className={cn("cv-section-chevron", open && "cv-section-chevron--open")}
        />
      ) : null}
      <span className="cv-section-title">{title}</span>
      {summary != null ? (
        <span className="cv-section-summary">{summary}</span>
      ) : null}
    </>
  );

  return (
    <div
      data-slot="section-header"
      className={cn("cv-section-header", className)}
    >
      {collapsible ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={regionId}
          className="cv-section-toggle"
        >
          {content}
        </button>
      ) : (
        <div className="cv-section-heading">{content}</div>
      )}
      {actions ? (
        <div
          className="cv-section-actions"
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
      className={cn("cv-section", className)}
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
        <div id={regionId} data-slot="section-body" className="cv-section-body">
          {children}
        </div>
      ) : null}
    </section>
  );
}
