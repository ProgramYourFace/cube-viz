import * as React from "react";
import { Box, Check, Database, Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useCubeMeta } from "@/hooks";

import { listCubes } from "../../primitives/meta-helpers";

export interface ChartSourcePopoverProps {
  /** The chart's current source table/view name (or undefined when empty). */
  currentName?: string;
  /** Whether the chart has fields (→ switching needs a confirm, it clears them). */
  hasFields: boolean;
  /** Re-point the chart to a new table/view (clears incompatible fields). */
  onSelect: (name: string) => void;
}

/**
 * The chart's SOURCE control — a top-bar chip showing the current table/view with a
 * one-click switch to any cube or view. Switching re-points the chart (members can't
 * cross datasets, so it clears existing fields — confirmed first when any exist).
 */
export function ChartSourcePopover({ currentName, hasFields, onSelect }: ChartSourcePopoverProps): React.ReactElement {
  const { meta } = useCubeMeta();
  const sources = React.useMemo(() => listCubes(meta), [meta]);
  const views = sources.filter((s) => s.type === "view");
  const tables = sources.filter((s) => s.type === "cube");
  const current = sources.find((s) => s.name === currentName);

  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState<string | null>(null);

  const choose = (name: string): void => {
    if (name === currentName) {
      setOpen(false);
      return;
    }
    if (hasFields) setPending(name); // confirm — switching clears the current fields
    else {
      onSelect(name);
      setOpen(false);
    }
  };
  const confirm = (): void => {
    if (pending) onSelect(pending);
    setPending(null);
    setOpen(false);
  };

  const pendingTitle = pending ? (sources.find((s) => s.name === pending)?.title ?? pending) : "";

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setPending(null);
      }}
    >
      <PopoverTrigger
        className="cv-source-trigger"
        title="Data source"
        aria-label="Data source"
      >
        <Database className="cv-ec-icon cv-ec-icon--muted" />
        <span className={cn("cv-source-trigger-label", !current && "cv-source-trigger-label--placeholder")}>
          {current ? current.title : "Choose source"}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="cv-source-popover">
        {pending ? (
          <div className="cv-source-confirm">
            <p className="cv-source-confirm-title">
              Switch to <span className="cv-ec-medium">{pendingTitle}</span>?
            </p>
            <p className="cv-source-confirm-note">This clears the chart's current fields.</p>
            <div className="cv-source-confirm-actions">
              <Button variant="ghost" size="sm" className="cv-ec-h7" onClick={() => setPending(null)}>
                Cancel
              </Button>
              <Button size="sm" className="cv-ec-h7" onClick={confirm}>
                Switch
              </Button>
            </div>
          </div>
        ) : (
          <div className="cv-source-list">
            {views.length > 0 ? (
              <>
                <p className="cv-ec-menu-heading">
                  Saved datasets
                </p>
                {views.map((v) => (
                  <SourceItem
                    key={v.name}
                    icon={<Layers className="cv-ec-icon" />}
                    label={v.title}
                    active={v.name === currentName}
                    onClick={() => choose(v.name)}
                  />
                ))}
              </>
            ) : null}
            <p className="cv-ec-menu-heading">
              Tables
            </p>
            {tables.map((t) => (
              <SourceItem
                key={t.name}
                icon={<Box className="cv-ec-icon" />}
                label={t.title}
                active={t.name === currentName}
                onClick={() => choose(t.name)}
              />
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

function SourceItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactElement;
  label: string;
  active: boolean;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cv-ec-menu-item",
        active && "cv-ec-menu-item--active",
      )}
    >
      <span className="cv-ec-menu-icon">{icon}</span>
      <span className="cv-ec-menu-label">{label}</span>
      {active ? <Check className="cv-ec-icon" /> : null}
    </button>
  );
}
