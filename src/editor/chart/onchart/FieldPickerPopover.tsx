import * as React from "react";
import { Calendar, Check, Database, Hash, Layers, Search, Table2, Type } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useCubeMeta } from "@/hooks";

import { findCube, listMembers, type CubeOption, type MemberOption } from "../../primitives/meta-helpers";
import type { FieldKind, WellDef } from "../builder/wells";
import type { JoinScope } from "./join-scope";

export interface FieldPickerPopoverProps {
  /** The slot being filled — its `kinds` decide which data-type groups show. */
  well: WellDef;
  /** Members already placed anywhere — hidden from the list. */
  placed: string[];
  /** Cross-table scope (source table, related tables, views) — see join-scope.ts. */
  scope: JoinScope;
  /** Why an option can't be added (cross-dataset / measure-source / axis-unit). */
  blockReason: (option: MemberOption) => string | undefined;
  /** Add a field. The popover closes after a successful pick. */
  onSelect: (name: string, kind: FieldKind) => void;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  /** The trigger (an AddSlot). */
  children: React.ReactNode;
}

const GROUP_META: Record<FieldKind, { label: string; icon: React.ReactElement; metaKind: "measure" | "dimension" | "time" }> = {
  number: { label: "Numbers", icon: <Hash className="size-3" />, metaKind: "measure" },
  category: { label: "Categories", icon: <Type className="size-3" />, metaKind: "dimension" },
  time: { label: "Dates", icon: <Calendar className="size-3" />, metaKind: "time" },
};
const KIND_ORDER: FieldKind[] = ["number", "category", "time"];

interface TableSection {
  cube: CubeOption;
  tag?: "source" | "related" | "dataset";
}

/**
 * The cross-table field picker. Fields are grouped FIRST by relation to the source
 * dataset (the source table, then related joined tables) and THEN by data type
 * (Numbers / Categories / Dates). A source selector switches between "All related
 * tables" and the curated views. Incompatible picks (a 2nd measure table, a field
 * from another dataset, an axis-unit mismatch) are disabled with a reason, so the
 * user can only build queries Cube will actually resolve.
 */
export function FieldPickerPopover({
  well,
  placed,
  scope,
  blockReason,
  onSelect,
  align = "start",
  side = "bottom",
  children,
}: FieldPickerPopoverProps): React.ReactElement {
  const { meta, isLoading } = useCubeMeta();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  // Which source we're browsing: the raw table graph, or a specific view.
  const [browse, setBrowse] = React.useState<string>(scope.viewLocked ?? "tables");

  // Re-seed the browse source whenever the popover (re)opens for a new scope.
  React.useEffect(() => {
    if (open) setBrowse(scope.viewLocked ?? "tables");
  }, [open, scope.viewLocked]);

  const placedSet = React.useMemo(() => new Set(placed), [placed]);
  const q = search.trim().toLowerCase();

  // The table sections to render, in relation order: source first, then related.
  const sections = React.useMemo<TableSection[]>(() => {
    if (browse !== "tables") {
      const v = scope.views.find((x) => x.name === browse) ?? findCube(meta, browse);
      return v ? [{ cube: v, tag: "dataset" }] : [];
    }
    const out: TableSection[] = [];
    if (scope.sourceCube) out.push({ cube: scope.sourceCube, tag: "source" });
    for (const c of scope.relatedCubes) out.push({ cube: c, tag: "related" });
    return out;
  }, [browse, scope, meta]);

  const showKindHeaders = well.kinds.length > 1;

  const kindGroupsFor = (cubeName: string): { kind: FieldKind; label: string; icon: React.ReactElement; items: MemberOption[] }[] =>
    KIND_ORDER.filter((k) => well.kinds.includes(k))
      .map((k) => {
        const m = GROUP_META[k];
        const items = listMembers(meta, m.metaKind, cubeName)
          .filter((o) => !placedSet.has(o.name))
          .filter((o) => (q ? o.label.toLowerCase().includes(q) || o.name.toLowerCase().includes(q) : true));
        return { kind: k, label: m.label, icon: m.icon, items };
      })
      .filter((g) => g.items.length > 0);

  const rendered = sections
    .map((s) => ({ section: s, groups: kindGroupsFor(s.cube.name) }))
    .filter((r) => r.groups.length > 0);
  const hasAny = rendered.length > 0;

  const pick = (name: string, kind: FieldKind): void => {
    onSelect(name, kind);
    setOpen(false);
    setSearch("");
  };

  const browseLabel =
    browse === "tables"
      ? "All related tables"
      : (scope.views.find((v) => v.name === browse)?.title ?? findCube(meta, browse)?.title ?? browse);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} side={side} className="w-80 p-2">
        <div className="flex items-center gap-2 pb-1.5">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-input bg-background px-2">
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isLoading ? "Loading fields…" : "Search fields…"}
              className="h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <SourceMenu browse={browse} label={browseLabel} views={scope.views} onBrowse={setBrowse} />
        </div>

        <div className="max-h-80 overflow-y-auto">
          {!hasAny ? (
            <p className="px-1 py-6 text-center text-xs text-muted-foreground">
              {isLoading ? "Loading fields…" : "No fields match."}
            </p>
          ) : (
            rendered.map(({ section, groups }, idx) => (
              <div key={section.cube.name}>
                {section.tag === "related" && idx > 0 && rendered[idx - 1].section.tag !== "related" ? (
                  <div className="px-1 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/70">
                    Related tables
                  </div>
                ) : null}
                <div className="flex items-center gap-1.5 px-1 pb-0.5 pt-1.5">
                  <Table2 className="size-3 text-muted-foreground" />
                  <span className="truncate text-xs font-medium">{section.cube.title}</span>
                  {section.tag === "source" ? (
                    <span className="rounded-sm bg-primary/10 px-1 py-px text-[9px] font-medium uppercase text-primary">
                      source
                    </span>
                  ) : section.tag === "dataset" ? (
                    <span className="rounded-sm bg-muted px-1 py-px text-[9px] font-medium uppercase text-muted-foreground">
                      dataset
                    </span>
                  ) : null}
                </div>
                {groups.map((g) => (
                  <div key={g.kind} className="pb-0.5">
                    {showKindHeaders ? (
                      <div className="flex items-center gap-1.5 px-2 pb-0.5 pt-1 text-[9px] uppercase tracking-wide text-muted-foreground/70">
                        {g.icon}
                        {g.label}
                      </div>
                    ) : null}
                    {g.items.map((o) => (
                      <PickerRow key={o.name} option={o} reason={blockReason(o)} onPick={() => pick(o.name, g.kind)} />
                    ))}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface SourceMenuProps {
  browse: string;
  label: string;
  views: CubeOption[];
  onBrowse: (browse: string) => void;
}

/** The "data source" selector: all related tables, or a curated view. */
function SourceMenu({ browse, label, views, onBrowse }: SourceMenuProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const choose = (v: string): void => {
    onBrowse(v);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="flex h-8 max-w-[9rem] shrink-0 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-xs hover:bg-accent"
        title={`Data source: ${label}`}
      >
        <Database className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate">{label}</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60 p-1">
        <MenuItem active={browse === "tables"} icon={<Table2 className="size-3.5" />} onClick={() => choose("tables")}>
          All related tables
        </MenuItem>
        {views.length > 0 ? (
          <>
            <div className="px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              Datasets (views)
            </div>
            {views.map((v) => (
              <MenuItem
                key={v.name}
                active={browse === v.name}
                icon={<Layers className="size-3.5" />}
                onClick={() => choose(v.name)}
              >
                {v.title}
              </MenuItem>
            ))}
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

function MenuItem({
  active,
  icon,
  onClick,
  children,
}: {
  active: boolean;
  icon: React.ReactElement;
  onClick: () => void;
  children: React.ReactNode;
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
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {active ? <Check className="size-3.5 shrink-0" /> : null}
    </button>
  );
}

interface PickerRowProps {
  option: MemberOption;
  reason?: string;
  onPick: () => void;
}

/** One member row; disabled-with-reason rows stay focusable so the hint is reachable. */
function PickerRow({ option, reason, onPick }: PickerRowProps): React.ReactElement {
  if (reason) {
    return (
      <span
        tabIndex={0}
        aria-disabled
        title={reason}
        className="flex cursor-not-allowed items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left text-sm opacity-45 outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span className="min-w-0 truncate">{option.label}</span>
        <span className="shrink-0 text-[10px] text-muted-foreground">unavailable</span>
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onPick}
      title={option.description ?? option.name}
      className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
    >
      <span className="min-w-0 truncate">{option.label}</span>
    </button>
  );
}
