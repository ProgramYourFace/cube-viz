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
        className="flex h-8 max-w-[12rem] items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent"
        title="Data source"
        aria-label="Data source"
      >
        <Database className="size-3.5 shrink-0 text-muted-foreground" />
        <span className={cn("truncate", !current && "text-muted-foreground")}>
          {current ? current.title : "Choose source"}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-1">
        {pending ? (
          <div className="flex flex-col gap-2 p-2">
            <p className="text-sm">
              Switch to <span className="font-medium">{pendingTitle}</span>?
            </p>
            <p className="text-xs text-muted-foreground">This clears the chart's current fields.</p>
            <div className="flex justify-end gap-1.5">
              <Button variant="ghost" size="sm" className="h-7" onClick={() => setPending(null)}>
                Cancel
              </Button>
              <Button size="sm" className="h-7" onClick={confirm}>
                Switch
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto">
            {views.length > 0 ? (
              <>
                <p className="px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                  Datasets (views)
                </p>
                {views.map((v) => (
                  <SourceItem
                    key={v.name}
                    icon={<Layers className="size-3.5" />}
                    label={v.title}
                    active={v.name === currentName}
                    onClick={() => choose(v.name)}
                  />
                ))}
              </>
            ) : null}
            <p className="px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              Tables
            </p>
            {tables.map((t) => (
              <SourceItem
                key={t.name}
                icon={<Box className="size-3.5" />}
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
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
        active && "bg-accent/60",
      )}
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {active ? <Check className="size-3.5 shrink-0" /> : null}
    </button>
  );
}
