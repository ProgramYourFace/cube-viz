import * as React from "react";
import { Calendar, Check, ChevronDown, ChevronRight, Database, Hash, Layers, MapPin, Search, Table2, Type } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useCubeMeta } from "@/hooks";

import {
  findCube,
  listMembers,
  memberCanonicalTime,
  memberGroup,
  type CubeOption,
  type MemberKind,
  type MemberOption,
} from "../../primitives/meta-helpers";
import { placementBlockReason, wellAccepts } from "../builder/channels";
import type { FieldKind, WellDef } from "../builder/wells";
import type { JoinScope } from "./join-scope";

export interface FieldPickerPopoverProps {
  /** The slot being filled — its `kinds` order the list; the rest show disabled. */
  well: WellDef;
  /** Members already placed anywhere — hidden from the list. */
  placed: string[];
  /** Members in THIS well (cardinality context for the block reason). */
  inWell?: string[];
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

// `number` (measures) and `numberDimension` (numeric dimensions, e.g. coordinates)
// share the "Numbers" label so a well accepting both renders ONE merged bucket
// (groupsFor keys fallback buckets by label).
const GROUP_META: Record<FieldKind, { label: string; icon: React.ReactElement; metaKind: MemberKind }> = {
  geoPoint: { label: "Location", icon: <MapPin className="cv-ec-icon--sm" />, metaKind: "geoPoint" },
  number: { label: "Numbers", icon: <Hash className="cv-ec-icon--sm" />, metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: <Hash className="cv-ec-icon--sm" />, metaKind: "numberDimension" },
  category: { label: "Categories", icon: <Type className="cv-ec-icon--sm" />, metaKind: "dimension" },
  time: { label: "Dates", icon: <Calendar className="cv-ec-icon--sm" />, metaKind: "time" },
};
const KIND_ORDER: FieldKind[] = ["geoPoint", "number", "numberDimension", "category", "time"];

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
  /** Every item is of a type this slot cannot take (a fully-disabled bucket). */
  rejected?: boolean;
  items: { option: MemberOption; kind: FieldKind; blocked?: string }[];
}

/**
 * The cross-table field picker. Fields are grouped FIRST by relation to the source
 * dataset (the source table, then related joined tables) and THEN by data type
 * (Numbers / Categories / Dates). A source selector switches between "All related
 * tables" and the curated views.
 *
 * Nothing is hidden. Fields of a type this slot cannot take used to be omitted
 * entirely, so hunting for "Revenue" in the Category slot found *nothing* and the
 * user had no way to learn why. They are now listed after the usable ones, disabled,
 * each carrying the same short reason the slot would give
 * ({@link placementBlockReason} — "Category takes a date or category"). The other
 * blocks (a 2nd measure table, a field from another dataset, an axis-unit mismatch)
 * read the same way, so the user can only build queries Cube will actually resolve —
 * and always knows which slot to try instead.
 */
export function FieldPickerPopover({
  well,
  placed,
  inWell,
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

  // Every list now mixes kinds (the ones this slot cannot take come last, disabled),
  // so the per-row data-type icon always earns its place: it is the fastest way to
  // see WHY a row is greyed out.
  const showRowIcon = true;

  // Usable kinds first (in the picker's canonical order), then the ones this slot
  // rejects — so the list still leads with what the user can actually pick.
  const kindOrder: FieldKind[] = [
    ...KIND_ORDER.filter((k) => wellAccepts(well, k)),
    ...KIND_ORDER.filter((k) => !wellAccepts(well, k)),
  ];

  // Members for `cubeName` (across the well's allowed kinds, minus already-placed and
  // non-matching-search), grouped by their SEMANTIC `meta.group` (Fuel / Safety /
  // Location …) in first-appearance order. Members without a `meta.group` fall back to
  // their data-type bucket (Numbers / Categories / Dates) so nothing is dropped. This is
  // the upgrade that turns a long flat member list into intuitive, authored sections.
  const groupsFor = (cubeName: string): PickGroup[] => {
    const order: string[] = [];
    const byKey = new Map<string, PickGroup>();
    for (const k of kindOrder) {
      const gm = GROUP_META[k];
      // The slot-level reason ("Slices takes a date or category") — undefined for the
      // kinds this well accepts.
      const kindBlock = placementBlockReason(well, k, inWell ?? []);
      let members = listMembers(meta, gm.metaKind, cubeName);
      // The cube's canonical time axis sorts first (stable) so the right date is
      // always the top pick; PickerRow badges it "default".
      if (k === "time") {
        members = [...members].sort(
          (a, b) => Number(memberCanonicalTime(b)) - Number(memberCanonicalTime(a)),
        );
      }
      for (const o of members) {
        if (placedSet.has(o.name)) continue;
        if (q && !(o.label.toLowerCase().includes(q) || o.name.toLowerCase().includes(q))) continue;
        const group = memberGroup(o);
        // Fallback buckets key by LABEL (not kind) so kinds sharing a label merge.
        const key = group ? `g:${group.toLowerCase()}` : `k:${gm.label}`;
        let grp = byKey.get(key);
        if (!grp) {
          // Semantic groups can mix kinds, so they carry no header icon; the kind-fallback
          // buckets keep their data-type icon + label.
          grp = {
            key,
            label: group ?? gm.label,
            headerIcon: group ? undefined : gm.icon,
            rejected: kindBlock !== undefined,
            items: [],
          };
          byKey.set(key, grp);
          order.push(key);
        }
        // A semantic group that mixes usable and unusable kinds is not "rejected".
        if (kindBlock === undefined) grp.rejected = false;
        grp.items.push({ option: o, kind: k, blocked: kindBlock });
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
      <PopoverContent align={align} side={side} className="cv-picker">
        <div className="cv-picker-header">
          <div className="cv-picker-search">
            <Search className="cv-ec-icon cv-ec-icon--muted" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isLoading ? "Loading fields…" : "Search fields…"}
              className="cv-picker-search-input"
            />
          </div>
          <SourceMenu
            browse={browse}
            label={browseLabel}
            views={scope.viewLocked ? scope.views.filter((v) => v.name === scope.viewLocked) : []}
            onBrowse={setBrowse}
          />
        </div>

        <div className="cv-picker-list">
          {!hasAny ? (
            <p className="cv-picker-empty">
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
                    <div className="cv-picker-related-heading">
                      Related tables
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={() =>
                      setCollapsedOverride((m) => ({ ...m, [section.cube.name]: !effectiveCollapsed }))
                    }
                    className="cv-picker-table"
                  >
                    {expanded ? (
                      <ChevronDown className="cv-ec-icon--sm cv-ec-icon--muted" />
                    ) : (
                      <ChevronRight className="cv-ec-icon--sm cv-ec-icon--muted" />
                    )}
                    <Table2 className="cv-ec-icon--sm cv-ec-icon--muted" />
                    <span className="cv-picker-table-title">{section.cube.title}</span>
                    {section.tag === "source" ? (
                      <span className="cv-picker-tag cv-picker-tag--primary">
                        Main table
                      </span>
                    ) : section.tag === "dataset" ? (
                      <span className="cv-picker-tag cv-picker-tag--muted">
                        dataset
                      </span>
                    ) : null}
                    <span className="cv-picker-count">
                      {count}
                    </span>
                  </button>
                  {expanded
                    ? groups.map((g) => (
                        <div
                          key={g.key}
                          className={cn(
                            "cv-picker-group",
                            g.rejected && "cv-picker-group--rejected",
                          )}
                        >
                          {groups.length > 1 ? (
                            <div className="cv-picker-group-header">
                              {g.headerIcon}
                              {g.label}
                              {g.rejected ? (
                                <span className="cv-picker-group-note">not for this slot</span>
                              ) : null}
                            </div>
                          ) : null}
                          {g.items.map(({ option, kind, blocked }) => (
                            <PickerRow
                              key={option.name}
                              option={option}
                              kindIcon={showRowIcon ? GROUP_META[kind].icon : undefined}
                              badge={kind === "time" && memberCanonicalTime(option) ? "default" : undefined}
                              // The slot's own "wrong kind of field" reason wins: it names
                              // the fix ("put a measure here instead"), where the dataset /
                              // axis-unit blocks describe the model.
                              reason={blocked ?? blockReason(option)}
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
        className="cv-picker-source-trigger"
        title={`Data source: ${label}`}
      >
        <Database className="cv-ec-icon cv-ec-icon--muted" />
        <span className="cv-ec-truncate">{label}</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="cv-picker-source-menu">
        <MenuItem active={browse === "tables"} icon={<Table2 className="cv-ec-icon" />} onClick={() => choose("tables")}>
          All related tables
        </MenuItem>
        {views.length > 0 ? (
          <>
            <div className="cv-ec-menu-heading">
              Saved datasets
            </div>
            {views.map((v) => (
              <MenuItem
                key={v.name}
                active={browse === v.name}
                icon={<Layers className="cv-ec-icon" />}
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
        "cv-ec-menu-item",
        active && "cv-ec-menu-item--active",
      )}
    >
      <span className="cv-ec-menu-icon">{icon}</span>
      <span className="cv-ec-menu-label">{children}</span>
      {active ? <Check className="cv-ec-icon" /> : null}
    </button>
  );
}

interface PickerRowProps {
  option: MemberOption;
  reason?: string;
  onPick: () => void;
  /** Data-type icon, shown only for mixed-kind wells (semantic groups can mix kinds). */
  kindIcon?: React.ReactElement;
  /** A small trailing chip (e.g. "default" on the cube's canonical time axis). */
  badge?: string;
}

/**
 * One member row. A blocked row is muted, `aria-disabled`, and still focusable so the
 * hint is reachable — and it SHOWS the reason inline rather than only in the tooltip:
 * a WebView has no hover, so a title-only hint is invisible on touch.
 */
function PickerRow({ option, reason, onPick, kindIcon, badge }: PickerRowProps): React.ReactElement {
  if (reason) {
    return (
      <span
        tabIndex={0}
        aria-disabled
        title={reason}
        className="cv-picker-row--disabled"
      >
        <span className="cv-picker-row-main">
          {kindIcon}
          <span className="cv-ec-truncate">{option.label}</span>
        </span>
        <span className="cv-picker-row-reason">{reason}</span>
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onPick}
      title={option.description ?? option.name}
      className="cv-picker-row"
    >
      {kindIcon}
      <span className="cv-picker-row-label">{option.label}</span>
      {badge ? (
        <span className="cv-picker-badge">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
