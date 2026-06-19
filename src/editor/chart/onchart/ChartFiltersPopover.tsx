import * as React from "react";
import { ListFilter } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import type { ChartSpec, CubeQuery } from "@/spec";

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
        <FilterBuilder cube={cube} cubes={scopeCubes} scope={scope} value={query.filters} onChange={onFiltersChange} />
      </PopoverContent>
    </Popover>
  );
}
