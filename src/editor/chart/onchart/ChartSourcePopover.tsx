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
        className="cv:flex cv:h-8 cv:max-w-[12rem] cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent"
        title="Data source"
        aria-label="Data source"
      >
        <Database className="cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" />
        <span className={cn("cv:truncate", !current && "cv:text-muted-foreground")}>
          {current ? current.title : "Choose source"}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="cv:w-64 cv:p-1">
        {pending ? (
          <div className="cv:flex cv:flex-col cv:gap-2 cv:p-2">
            <p className="cv:text-sm">
              Switch to <span className="cv:font-medium">{pendingTitle}</span>?
            </p>
            <p className="cv:text-xs cv:text-muted-foreground">This clears the chart's current fields.</p>
            <div className="cv:flex cv:justify-end cv:gap-1.5">
              <Button variant="ghost" size="sm" className="cv:h-7" onClick={() => setPending(null)}>
                Cancel
              </Button>
              <Button size="sm" className="cv:h-7" onClick={confirm}>
                Switch
              </Button>
            </div>
          </div>
        ) : (
          <div className="cv:max-h-[60vh] cv:overflow-y-auto">
            {views.length > 0 ? (
              <>
                <p className="cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground">
                  Saved datasets
                </p>
                {views.map((v) => (
                  <SourceItem
                    key={v.name}
                    icon={<Layers className="cv:size-3.5" />}
                    label={v.title}
                    active={v.name === currentName}
                    onClick={() => choose(v.name)}
                  />
                ))}
              </>
            ) : null}
            <p className="cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground">
              Tables
            </p>
            {tables.map((t) => (
              <SourceItem
                key={t.name}
                icon={<Box className="cv:size-3.5" />}
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
        "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
        active && "cv:bg-accent/60",
      )}
    >
      <span className="cv:text-muted-foreground">{icon}</span>
      <span className="cv:min-w-0 cv:flex-1 cv:truncate">{label}</span>
      {active ? <Check className="cv:size-3.5 cv:shrink-0" /> : null}
    </button>
  );
}
