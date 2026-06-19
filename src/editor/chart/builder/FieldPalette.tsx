import * as React from "react";
import { Calendar, Database, Hash, Search, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useCubeMeta } from "@/hooks";

import { CubePicker } from "../../primitives/CubePicker";
import { listMembers, type MemberOption } from "../../primitives/meta-helpers";
import type { FieldDrag } from "./useFieldDrag";
import type { FieldKind, WellDef } from "./wells";

export interface FieldPaletteProps {
  /** Active cube/view; when undefined, all cubes' fields are offered. */
  cube?: string;
  /** Change the active data source (replaces the standalone Data-source section). */
  onCubeChange: (cube: string) => void;
  /** The family's wells — used to compute legal click-to-add targets per field. */
  wells: WellDef[];
  /**
   * Which wells currently have room for THIS option (one-wells: only when empty;
   * value wells also reject axis-unit-incompatible fields).
   */
  legalWells: (option: MemberOption, kind: FieldKind) => WellDef[];
  /** Add a field to a specific well (click-to-add path). */
  onAdd: (wellId: string, name: string, kind: FieldKind) => void;
  /**
   * Why an option is blocked from a well (axis-unit mismatch), for the disabled
   * tooltip + click feedback. Undefined = allowed. Checked against the enforcing
   * value well.
   */
  blockReason: (wellId: string, option: MemberOption) => string | undefined;
  drag: FieldDrag;
  /** Whether to lay the palette out as a horizontal scroll row (narrow). */
  horizontal?: boolean;
  className?: string;
}

interface Group {
  key: FieldKind;
  label: string;
  icon: React.ReactElement;
  items: MemberOption[];
}

/**
 * The searchable, grouped field palette (docs/05 §3): Numbers / Categories / Dates,
 * humanized labels, drag source + always-available click-to-add. Hosts the
 * "Change data source" affordance in its header (the old standalone Data-source
 * section). Container-responsive: a vertical strip when wide, a horizontal scroll
 * row when narrow.
 */
export function FieldPalette({
  cube,
  onCubeChange,
  wells,
  legalWells,
  onAdd,
  blockReason,
  drag,
  horizontal = false,
  className,
}: FieldPaletteProps): React.ReactElement {
  const { meta, isLoading } = useCubeMeta();
  const [search, setSearch] = React.useState("");

  const groups = React.useMemo<Group[]>(() => {
    const numbers = listMembers(meta, "measure", cube);
    const categories = listMembers(meta, "dimension", cube);
    const dates = listMembers(meta, "time", cube);
    return [
      { key: "number", label: "Numbers", icon: <Hash className="size-3.5" />, items: numbers },
      { key: "category", label: "Categories", icon: <Type className="size-3.5" />, items: categories },
      { key: "time", label: "Dates", icon: <Calendar className="size-3.5" />, items: dates },
    ];
  }, [meta, cube]);

  const q = search.trim().toLowerCase();
  const filterItems = (items: MemberOption[]): MemberOption[] =>
    q
      ? items.filter((m) => m.label.toLowerCase().includes(q) || m.name.toLowerCase().includes(q))
      : items;

  const hasAny = groups.some((g) => filterItems(g.items).length > 0);

  return (
    <div data-slot="field-palette" className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-input bg-background px-2">
          <Search className="size-3.5 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isLoading ? "Loading fields…" : "Search fields…"}
            className="h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-8 shrink-0"
              title="Change data source"
              aria-label="Change data source"
            >
              <Database className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 p-2">
            <p className="px-1 pb-1.5 text-xs text-muted-foreground">Data source</p>
            <CubePicker value={cube} onChange={onCubeChange} />
          </PopoverContent>
        </Popover>
      </div>

      <div
        className={cn(
          horizontal
            ? "flex gap-3 overflow-x-auto pb-1"
            : "flex flex-col gap-2",
        )}
      >
        {!hasAny ? (
          <p className="px-1 py-3 text-center text-xs text-muted-foreground">
            {isLoading ? "Loading fields…" : "No fields match."}
          </p>
        ) : (
          groups.map((g) => {
            const items = filterItems(g.items);
            if (items.length === 0) return null;
            return (
              <div
                key={g.key}
                className={cn("flex flex-col gap-1", horizontal && "min-w-44 shrink-0")}
              >
                <div className="flex items-center gap-1.5 px-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {g.icon}
                  {g.label}
                </div>
                <div className={cn("flex gap-1", horizontal ? "flex-col" : "flex-wrap")}>
                  {items.map((m) => {
                    const legal = legalWells(m, g.key);
                    // An axis-unit mismatch with an enforcing value well the field
                    // kind targets → a blocked (dimmed) item with an explanatory reason.
                    const blocked = enforcingWellBlock(wells, m, g.key, blockReason);
                    return (
                      <PaletteItem
                        key={m.name}
                        option={m}
                        kind={g.key}
                        legalWells={legal}
                        blocked={blocked}
                        onAdd={onAdd}
                        drag={drag}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/** An axis-unit block: the enforcing well + the one-line reason. */
interface AxisBlock {
  wellId: string;
  reason: string;
}

/**
 * Find the first enforcing value well (of a kind this field targets) that REJECTS
 * the field on axis-unit grounds, returning its id + reason. Used to render the
 * field as a blocked-but-explainable item (click surfaces the reason).
 */
function enforcingWellBlock(
  wells: WellDef[],
  option: MemberOption,
  kind: FieldKind,
  blockReason: (wellId: string, option: MemberOption) => string | undefined,
): AxisBlock | undefined {
  for (const w of wells) {
    if (!w.kinds.includes(kind)) continue;
    const reason = blockReason(w.id, option);
    if (reason) return { wellId: w.id, reason };
  }
  return undefined;
}

interface PaletteItemProps {
  option: MemberOption;
  kind: FieldKind;
  legalWells: WellDef[];
  /** An axis-unit block (mismatch with an enforcing value well), or undefined. */
  blocked?: AxisBlock;
  onAdd: (wellId: string, name: string, kind: FieldKind) => void;
  drag: FieldDrag;
}

/** One draggable + click-to-add field chip. */
function PaletteItem({
  option,
  kind,
  legalWells,
  blocked,
  onAdd,
  drag,
}: PaletteItemProps): React.ReactElement {
  const [menuOpen, setMenuOpen] = React.useState(false);
  // No legal target. If an axis-unit block explains it, keep the field CLICKABLE so
  // the click can surface the reason (via the rejecting well's onAdd); otherwise it
  // is a hard-disabled cardinality/kind miss.
  const noLegal = legalWells.length === 0;
  const axisBlocked = noLegal && blocked !== undefined;
  const disabled = noLegal && !axisBlocked;

  const click = (): void => {
    if (axisBlocked) {
      // Route to the rejecting well so the panel surfaces the reason note.
      onAdd(blocked.wellId, option.name, kind);
      return;
    }
    if (disabled) return;
    if (legalWells.length === 1) {
      onAdd(legalWells[0].id, option.name, kind);
    } else {
      setMenuOpen(true);
    }
  };

  const dimmed = disabled || axisBlocked;

  const button = (
    <button
      type="button"
      draggable={!dimmed}
      onDragStart={(e) => {
        drag.start({ name: option.name, kind });
        e.dataTransfer.setData("text/plain", option.name);
        e.dataTransfer.effectAllowed = "copy";
      }}
      onDragEnd={() => drag.end()}
      onClick={click}
      disabled={disabled}
      aria-disabled={dimmed}
      title={blocked?.reason ?? option.description ?? option.name}
      className={cn(
        "flex max-w-full items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-left text-xs transition-colors",
        dimmed
          ? "cursor-not-allowed opacity-40"
          : "cursor-grab hover:border-primary hover:bg-accent active:cursor-grabbing",
      )}
    >
      <span className="min-w-0 truncate">{option.label}</span>
    </button>
  );

  // Single legal well (or none) → plain click. Multiple → an "Add to →" menu.
  if (legalWells.length <= 1) return button;

  return (
    <Popover open={menuOpen} onOpenChange={setMenuOpen}>
      <PopoverTrigger asChild>{button}</PopoverTrigger>
      <PopoverContent align="start" className="w-48 p-1">
        <p className="px-2 py-1 text-[10px] uppercase tracking-wide text-muted-foreground">
          Add to
        </p>
        {legalWells.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => {
              onAdd(w.id, option.name, kind);
              setMenuOpen(false);
            }}
            className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
          >
            {w.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
