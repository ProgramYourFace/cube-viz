import * as React from "react";
import { Calendar, Check, ChevronDown, ChevronRight, Database, Hash, Layers, Search, Table2, Type } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useCubeMeta } from "@/hooks";

import { findCube, listMembers, memberGroup, type CubeOption, type MemberOption } from "../../primitives/meta-helpers";
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
  number: { label: "Numbers", icon: <Hash className="cv:size-3" />, metaKind: "measure" },
  category: { label: "Categories", icon: <Type className="cv:size-3" />, metaKind: "dimension" },
  time: { label: "Dates", icon: <Calendar className="cv:size-3" />, metaKind: "time" },
};
const KIND_ORDER: FieldKind[] = ["number", "category", "time"];

interface TableSection {
  cube: CubeOption;
  tag?: "source" | "related" | "dataset";
}

/** A rendered group within a table: a semantic `meta.group` or a data-type fallback bucket. */
interface PickGroup {
  /** Stable key (lowercased semantic group, or `k:<kind>` fallback). */
  key: string;
  label: string;
  /** Data-type icon — set only for kind-fallback buckets (semantic groups may mix kinds). */
  headerIcon?: React.ReactElement;
  items: { option: MemberOption; kind: FieldKind }[];
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
  // Per-table collapse overrides (related tables default collapsed; search forces open).
  const [collapsedOverride, setCollapsedOverride] = React.useState<Record<string, boolean>>({});

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

  // Show a per-row data-type icon only when the well mixes kinds (e.g. a table's
  // columns) — single-kind wells don't need it, and it would clutter the semantic groups.
  const showRowIcon = well.kinds.length > 1;

  // Members for `cubeName` (across the well's allowed kinds, minus already-placed and
  // non-matching-search), grouped by their SEMANTIC `meta.group` (Fuel / Safety /
  // Location …) in first-appearance order. Members without a `meta.group` fall back to
  // their data-type bucket (Numbers / Categories / Dates) so nothing is dropped. This is
  // the upgrade that turns a long flat member list into intuitive, authored sections.
  const groupsFor = (cubeName: string): PickGroup[] => {
    const order: string[] = [];
    const byKey = new Map<string, PickGroup>();
    for (const k of KIND_ORDER) {
      if (!well.kinds.includes(k)) continue;
      const gm = GROUP_META[k];
      for (const o of listMembers(meta, gm.metaKind, cubeName)) {
        if (placedSet.has(o.name)) continue;
        if (q && !(o.label.toLowerCase().includes(q) || o.name.toLowerCase().includes(q))) continue;
        const group = memberGroup(o);
        const key = group ? `g:${group.toLowerCase()}` : `k:${k}`;
        let grp = byKey.get(key);
        if (!grp) {
          // Semantic groups can mix kinds, so they carry no header icon; the kind-fallback
          // buckets keep their data-type icon + label.
          grp = { key, label: group ?? gm.label, headerIcon: group ? undefined : gm.icon, items: [] };
          byKey.set(key, grp);
          order.push(key);
        }
        grp.items.push({ option: o, kind: k });
      }
    }
    return order.map((key) => byKey.get(key)!);
  };

  const rendered = sections
    .map((s) => ({ section: s, groups: groupsFor(s.cube.name) }))
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
      <PopoverContent align={align} side={side} className="cv:w-80 cv:p-2">
        <div className="cv:flex cv:items-center cv:gap-2 cv:pb-1.5">
          <div className="cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2">
            <Search className="cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isLoading ? "Loading fields…" : "Search fields…"}
              className="cv:h-8 cv:w-full cv:bg-transparent cv:text-sm cv:outline-none cv:placeholder:text-muted-foreground"
            />
          </div>
          <SourceMenu browse={browse} label={browseLabel} views={scope.views} onBrowse={setBrowse} />
        </div>

        <div className="cv:max-h-80 cv:overflow-y-auto">
          {!hasAny ? (
            <p className="cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground">
              {isLoading ? "Loading fields…" : "No fields match."}
            </p>
          ) : (
            rendered.map(({ section, groups }, idx) => {
              const count = groups.reduce((n, g) => n + g.items.length, 0);
              // Related tables collapse by default; an explicit toggle overrides; a
              // search query forces every table open so matches are always visible.
              const defaultCollapsed = section.tag === "related";
              const effectiveCollapsed = collapsedOverride[section.cube.name] ?? defaultCollapsed;
              const expanded = q.length > 0 ? true : !effectiveCollapsed;
              return (
                <div key={section.cube.name}>
                  {section.tag === "related" && idx > 0 && rendered[idx - 1].section.tag !== "related" ? (
                    <div className="cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70">
                      Related tables
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={() =>
                      setCollapsedOverride((m) => ({ ...m, [section.cube.name]: !effectiveCollapsed }))
                    }
                    className="cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:hover:bg-accent/50"
                  >
                    {expanded ? (
                      <ChevronDown className="cv:size-3 cv:shrink-0 cv:text-muted-foreground" />
                    ) : (
                      <ChevronRight className="cv:size-3 cv:shrink-0 cv:text-muted-foreground" />
                    )}
                    <Table2 className="cv:size-3 cv:shrink-0 cv:text-muted-foreground" />
                    <span className="cv:truncate cv:text-xs cv:font-medium">{section.cube.title}</span>
                    {section.tag === "source" ? (
                      <span className="cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary">
                        Main table
                      </span>
                    ) : section.tag === "dataset" ? (
                      <span className="cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground">
                        dataset
                      </span>
                    ) : null}
                    <span className="cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70">
                      {count}
                    </span>
                  </button>
                  {expanded
                    ? groups.map((g) => (
                        <div key={g.key} className="cv:pb-0.5 cv:pl-4">
                          {groups.length > 1 ? (
                            <div className="cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70">
                              {g.headerIcon}
                              {g.label}
                            </div>
                          ) : null}
                          {g.items.map(({ option, kind }) => (
                            <PickerRow
                              key={option.name}
                              option={option}
                              kindIcon={showRowIcon ? GROUP_META[kind].icon : undefined}
                              reason={blockReason(option)}
                              onPick={() => pick(option.name, kind)}
                            />
                          ))}
                        </div>
                      ))
                    : null}
                </div>
              );
            })
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
        className="cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:hover:bg-accent"
        title={`Data source: ${label}`}
      >
        <Database className="cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" />
        <span className="cv:truncate">{label}</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="cv:w-60 cv:p-1">
        <MenuItem active={browse === "tables"} icon={<Table2 className="cv:size-3.5" />} onClick={() => choose("tables")}>
          All related tables
        </MenuItem>
        {views.length > 0 ? (
          <>
            <div className="cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground">
              Saved datasets
            </div>
            {views.map((v) => (
              <MenuItem
                key={v.name}
                active={browse === v.name}
                icon={<Layers className="cv:size-3.5" />}
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
        "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
        active && "cv:bg-accent/60",
      )}
    >
      <span className="cv:text-muted-foreground">{icon}</span>
      <span className="cv:min-w-0 cv:flex-1 cv:truncate">{children}</span>
      {active ? <Check className="cv:size-3.5 cv:shrink-0" /> : null}
    </button>
  );
}

interface PickerRowProps {
  option: MemberOption;
  reason?: string;
  onPick: () => void;
  /** Data-type icon, shown only for mixed-kind wells (semantic groups can mix kinds). */
  kindIcon?: React.ReactElement;
}

/** One member row; disabled-with-reason rows stay focusable so the hint is reachable. */
function PickerRow({ option, reason, onPick, kindIcon }: PickerRowProps): React.ReactElement {
  if (reason) {
    return (
      <span
        tabIndex={0}
        aria-disabled
        title={reason}
        className="cv:flex cv:cursor-not-allowed cv:items-center cv:justify-between cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:opacity-45 cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
      >
        <span className="cv:flex cv:min-w-0 cv:items-center cv:gap-1.5">
          {kindIcon}
          <span className="cv:truncate">{option.label}</span>
        </span>
        <span className="cv:shrink-0 cv:text-[10px] cv:text-muted-foreground">Not available</span>
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onPick}
      title={option.description ?? option.name}
      className="cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent cv:hover:text-accent-foreground"
    >
      {kindIcon}
      <span className="cv:min-w-0 cv:truncate">{option.label}</span>
    </button>
  );
}
