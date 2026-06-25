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
          "cv:flex cv:h-8 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
          count > 0 ? "cv:text-foreground" : "cv:text-muted-foreground",
        )}
        title="Filters"
        aria-label="Filters"
      >
        <ListFilter className="cv:size-4" />
        Filter
        {count > 0 ? (
          <span className="cv:ml-0.5 cv:flex cv:h-4 cv:min-w-4 cv:items-center cv:justify-center cv:rounded-full cv:bg-primary cv:px-1 cv:text-[10px] cv:font-semibold cv:text-primary-foreground">
            {count}
          </span>
        ) : null}
      </PopoverTrigger>
      <PopoverContent align="end" className="cv:flex cv:max-h-[72vh] cv:w-96 cv:flex-col cv:gap-2 cv:overflow-y-auto cv:p-3">
        <div className="cv:flex cv:flex-col cv:gap-0.5">
          <p className="cv:text-sm cv:font-medium">Filters</p>
          <p className="cv:text-xs cv:text-muted-foreground">
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
    <div className="cv:flex cv:flex-col cv:gap-1.5 cv:border-b cv:border-border cv:pb-2">
      <p className="cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground">Segments</p>
      <div className="cv:flex cv:flex-wrap cv:gap-1.5">
        {segs.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => toggle(s.name)}
            title={s.description ?? s.name}
            className={cn(
              "cv:rounded-full cv:border cv:px-2.5 cv:py-1 cv:text-xs cv:transition-colors",
              active.has(s.name)
                ? "cv:border-ring cv:bg-accent cv:text-foreground"
                : "cv:border-input cv:text-muted-foreground cv:hover:bg-accent/50 cv:hover:text-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
