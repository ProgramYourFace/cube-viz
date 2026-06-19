import * as React from "react";
import { ListFilter } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useCubeMeta } from "@/hooks";
import type { ChartSpec, CubeQuery } from "@/spec";

import { listSegments } from "../../primitives/meta-helpers";
import { FilterBuilder } from "../FilterBuilder";
import type { JoinScope } from "./join-scope";

export interface ChartFiltersPopoverProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  cube?: string;
  /** Joinable tables for cross-table filtering. */
  scopeCubes?: string[];
  /** Cross-table join scope — lets the Field selector reuse the rich axis-well picker. */
  scope?: JoinScope;
}

/**
 * The chart's FILTER widget — a dedicated, roomy popover (not crammed into the ⋯ menu)
 * pinned to the top bar where it reads contextually as "narrow this chart". The button
 * shows the active filter count; the panel hosts the readable {@link FilterBuilder}.
 */
export function ChartFiltersPopover({ spec, update, cube, scopeCubes, scope }: ChartFiltersPopoverProps): React.ReactElement {
  const { query } = spec;
  const count = (query.filters ?? []).length;
  const onFiltersChange = (filters: CubeQuery["filters"]): void =>
    update({ ...spec, query: { ...query, filters } });

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex h-8 items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
          count > 0 ? "text-foreground" : "text-muted-foreground",
        )}
        title="Filters"
        aria-label="Filters"
      >
        <ListFilter className="size-4" />
        Filter
        {count > 0 ? (
          <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
            {count}
          </span>
        ) : null}
      </PopoverTrigger>
      <PopoverContent align="end" className="flex max-h-[72vh] w-96 flex-col gap-2 overflow-y-auto p-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium">Filters</p>
          <p className="text-xs text-muted-foreground">
            Narrow this chart. Each row reads as a sentence — click to edit.
          </p>
        </div>
        <SegmentsControl spec={spec} update={update} scopeCubes={scopeCubes} />
        <FilterBuilder cube={cube} cubes={scopeCubes} scope={scope} value={query.filters} onChange={onFiltersChange} />
      </PopoverContent>
    </Popover>
  );
}

/** Segment toggles — Cube's named boolean filters, applied via `query.segments`. */
function SegmentsControl({
  spec,
  update,
  scopeCubes,
}: {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  scopeCubes?: string[];
}): React.ReactElement | null {
  const { meta } = useCubeMeta();
  const segs = listSegments(meta, scopeCubes);
  if (segs.length === 0) return null;
  const active = new Set(spec.query.segments ?? []);
  const toggle = (name: string): void => {
    const next = new Set(active);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    const arr = [...next];
    update({ ...spec, query: { ...spec.query, segments: arr.length ? arr : undefined } });
  };
  return (
    <div className="flex flex-col gap-1.5 border-b border-border pb-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Segments</p>
      <div className="flex flex-wrap gap-1.5">
        {segs.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => toggle(s.name)}
            title={s.description ?? s.name}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs transition-colors",
              active.has(s.name)
                ? "border-ring bg-accent text-foreground"
                : "border-input text-muted-foreground hover:bg-accent/50 hover:text-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
