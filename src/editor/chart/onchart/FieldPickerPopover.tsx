import * as React from "react";
import { Calendar, Check, ChevronDown, ChevronRight, Database, Hash, Layers, ListChecks, MapPin, Search, Table2, Type } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useCubeMeta, useDisplayUnit } from "@/hooks";

import {
  collapseFamilies,
  fieldBadge,
  findCube,
  grainAggLabel,
  listMembers,
  memberAgg,
  memberCanonicalTime,
  memberGroup,
  pathLabel,
  type CubeOption,
  type MemberKind,
  type MemberOption,
} from "../../primitives/meta-helpers";
import { placementBlockReason, wellAccepts } from "../builder/channels";
import type { FieldKind, WellDef } from "../builder/wells";
import type { JoinScope } from "./join-scope";
import {
  candidateReason,
  isAvailable,
  onlyCompatibleStore,
  type FieldCandidate,
} from "./picker-filter";

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
  /**
   * The category heading this related table renders under (cube `meta.category`,
   * with a fallback for uncategorized tables). Only related sections carry one.
   */
  heading?: string;
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
  items: FieldCandidate[];
}

/**
 * The cross-table field picker. Fields are grouped FIRST by relation to the source
 * dataset (the source table, then related joined tables under their model-authored
 * `meta.category` headings — Vehicle activity / Maintenance / …) and THEN by the
 * model's semantic `meta.group` sections. A source selector switches between "All
 * related tables" and the curated views.
 *
 * Fields of a type this slot cannot take used to be omitted entirely, so hunting for
 * "Revenue" in the Category slot found *nothing* and the user had no way to learn why.
 * They are listed after the usable ones, disabled, each carrying the same short reason
 * the slot would give ({@link placementBlockReason} — "Slices needs a date or
 * category"). The other blocks (a 2nd measure table, a field from another dataset, an
 * axis-unit mismatch) read the same way, so the user can only build queries Cube will
 * actually resolve — and always knows which slot to try instead.
 *
 * The header's "Only compatible fields" toggle hides every row that cannot be added
 * for ANY reason (see {@link candidateReason}), so with a distance measure on the
 * value axis only distance measures remain listed. It is an icon toggle button inline
 * in the search row (`aria-pressed` + a filled pressed state, since a WebView has no
 * hover to lean on). It DEFAULTS ON — the common intent is to fill the slot, so the
 * list leads with what fits — and because hiding costs discoverability it states how
 * many rows it took away (a numeric badge on the icon plus the tooltip), and an
 * emptied list offers to show them back. The choice is ONE shared, observable value
 * for every picker on the page ({@link onlyCompatibleStore}) — not a per-popover
 * copy — and persists (localStorage, guarded).
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
  // "Only compatible fields" — the SHARED choice (see `onlyCompatibleStore`). Read
  // through the store rather than a local `useState` seeded from storage: the editor
  // mounts one of these per well up front, so a local copy taken at mount time never
  // learns that the user flipped the switch in a different slot, and that slot's list
  // goes on rendering rows it promised to hide.
  const onlyCompatible = React.useSyncExternalStore(
    onlyCompatibleStore.subscribe,
    onlyCompatibleStore.get,
    onlyCompatibleStore.getServer,
  );
  const setOnlyCompatible = onlyCompatibleStore.set;
  const searchId = React.useId();
  // Which source we're browsing: the raw table graph, or a specific view.
  const [browse, setBrowse] = React.useState<string>(scope.viewLocked ?? "tables");
  // Per-table collapse overrides (related tables default collapsed; search forces open).
  const [collapsedOverride, setCollapsedOverride] = React.useState<Record<string, boolean>>({});
  // Aggregation-pill choice per family (family key → member name). The pill remembers
  // the user's pick for this popover's lifetime; absent ⇒ the model's default.
  const [familySel, setFamilySel] = React.useState<Record<string, string>>({});

  // Re-seed the browse source whenever the popover (re)opens for a new scope.
  React.useEffect(() => {
    if (open) setBrowse(scope.viewLocked ?? "tables");
  }, [open, scope.viewLocked]);

  const placedSet = React.useMemo(() => new Set(placed), [placed]);
  const q = search.trim().toLowerCase();

  // The row badges show the unit the CHART will render — the viewer's unit system —
  // not the storage unit (same conversion the axis badge uses).
  const displayUnit = useDisplayUnit();

  // The table sections to render: source first, then related tables grouped under
  // their field-atlas mount (cube `meta.path` — Trips / Maintenance / …, ordered by
  // first appearance in meta so the model controls the sequence), falling back to
  // `meta.category` headings for path-less models. With neither, the flat "Related
  // tables" reading survives.
  const sections = React.useMemo<TableSection[]>(() => {
    if (browse !== "tables") {
      const v = scope.views.find((x) => x.name === browse) ?? findCube(meta, browse);
      return v ? [{ cube: v, tag: "dataset" }] : [];
    }
    const out: TableSection[] = [];
    if (scope.sourceCube) out.push({ cube: scope.sourceCube, tag: "source" });
    const anyCategory = scope.relatedCubes.some((c) => c.path ?? c.category);
    const fallback = anyCategory ? "More tables" : "Related tables";
    const headingOf = (c: CubeOption): string | undefined =>
      c.path ? pathLabel(c.path) : c.category;
    // Atlas order: the model's own declaration order (first cube seen per heading).
    const rank = new Map<string, number>();
    for (const c of scope.relatedCubes) {
      const h = headingOf(c);
      if (h !== undefined && !rank.has(h)) rank.set(h, rank.size);
    }
    const related = [...scope.relatedCubes].sort((a, b) => {
      const ha = headingOf(a);
      const hb = headingOf(b);
      if (ha === hb) return 0; // stable: keep join-scope's title order within a heading
      if (ha === undefined) return 1; // unmounted tables sink to the bottom
      if (hb === undefined) return -1;
      return (rank.get(ha) ?? 0) - (rank.get(hb) ?? 0);
    });
    for (const c of related) out.push({ cube: c, tag: "related", heading: headingOf(c) ?? fallback });
    return out;
  }, [browse, scope, meta]);

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
    // Cube models a per-row number (a coordinate, a heading) as a `type: "number"`
    // DIMENSION, and `listMembers` reports it under BOTH `numberDimension` and the
    // plain `dimension` bucket — so without this the same member is listed twice in
    // one table, under two different kinds and (since the buckets differ) often two
    // different headings, with React warning about the duplicated row key. Keeping the
    // FIRST hit is what makes it right rather than merely unique: `kindOrder` leads
    // with the kinds this slot ACCEPTS, so the surviving row is the placeable one.
    const seen = new Set<string>();
    for (const k of kindOrder) {
      const gm = GROUP_META[k];
      // The slot-level reason ("Slices needs a date or category") — undefined for the
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
        if (seen.has(o.name)) continue;
        if (q && !(o.label.toLowerCase().includes(q) || o.name.toLowerCase().includes(q))) continue;
        seen.add(o.name);
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
        // The FULL reason (slot kind first, then the chart-level dataset / measure-
        // source / axis-unit blocks) — one value drives both the muted row's hint and
        // whether "Only compatible fields" hides the row.
        grp.items.push({
          option: o,
          kind: k,
          reason: candidateReason(well, k, inWell ?? [], o, blockReason),
        });
      }
    }
    return order.map((key) => byKey.get(key)!);
  };

  // Every candidate, in render order, BEFORE the compatibility switch is applied —
  // so the hidden count below is honest about what the switch took away.
  const all = sections
    .map((s) => ({ section: s, groups: groupsFor(s.cube.name) }))
    .filter((r) => r.groups.length > 0);

  // How many rows matching the current search the switch is hiding right now.
  const hiddenCount = onlyCompatible
    ? all.reduce(
        (n, r) => n + r.groups.reduce((m, g) => m + g.items.filter((i) => !isAvailable(i)).length, 0),
        0,
      )
    : 0;

  const rendered = onlyCompatible
    ? all
        .map((r) => ({
          section: r.section,
          groups: r.groups
            .map((g) => ({ ...g, rejected: false, items: g.items.filter(isAvailable) }))
            .filter((g) => g.items.length > 0),
        }))
        .filter((r) => r.groups.length > 0)
    : all;
  const hasAny = rendered.length > 0;
  // Nothing left ONLY because the switch hid it — an empty list would look like the
  // field does not exist, so say what happened and offer the way back.
  const emptiedByFilter = !hasAny && hiddenCount > 0;

  const pick = (name: string, kind: FieldKind): void => {
    onSelect(name, kind);
    setOpen(false);
    setSearch("");
  };

  const browseLabel =
    browse === "tables"
      ? "All related tables"
      : (scope.views.find((v) => v.name === browse)?.title ?? findCube(meta, browse)?.title ?? browse);

  // The saved datasets the source menu can offer BESIDES "All related tables" — today
  // only the locked view of a view-bound chart (an unlocked chart browses the table
  // graph, so `scope.views` is not offered as an alternative there).
  const sourceViews = scope.viewLocked
    ? scope.views.filter((v) => v.name === scope.viewLocked)
    : [];

  // The toggle is icon-only, so its name has to carry the whole story: what it does
  // when off, and what it is currently taking away when on.
  const compatLabel = !onlyCompatible
    ? "Show only fields that can go in this slot"
    : hiddenCount > 0
      ? `Only compatible fields — ${hiddenCount} hidden`
      : "Only compatible fields — none hidden";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} side={side} className="cv-picker">
        <div className="cv-picker-header">
          <div className="cv-picker-search">
            <Search className="cv-ec-icon cv-ec-icon--muted" />
            <input
              autoFocus
              id={searchId}
              aria-label="Search fields"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isLoading ? "Loading fields…" : "Search fields…"}
              className="cv-picker-search-input"
            />
          </div>
          {/* The compatibility toggle. A plain button (no Radix Switch in this package)
              so it is keyboard- and WebView-native; `aria-pressed` + the filled state
              carry the meaning, and the badge is the discoverability receipt for
              everything it removed — the tooltip repeats it for the sighted-hover case.

              The glyph is `ListChecks`, NOT `ListFilter`: the top bar's query-filter
              button already owns the funnel-ish decreasing lines, and one glyph doing
              double duty is why this control read as "filter the data" instead of
              "only the fields that fit here". A checked list says exactly that — it is
              about the LIST in front of you and which of its entries qualify — and its
              left-hand ticks keep it unmistakable beside the top bar at 16px. */}
          <button
            type="button"
            aria-pressed={onlyCompatible}
            aria-label={compatLabel}
            title={compatLabel}
            onClick={() => setOnlyCompatible(!onlyCompatible)}
            className={cn("cv-picker-compat", onlyCompatible && "cv-picker-compat--on")}
          >
            <ListChecks className="cv-ec-icon" />
            {onlyCompatible && hiddenCount > 0 ? (
              <span className="cv-picker-compat-count">{hiddenCount}</span>
            ) : null}
          </button>
          {/* The source menu's only entries are "All related tables" plus the saved
              datasets; with none of the latter it is a one-item menu that can change
              nothing, so it is not rendered at all. `browse` keeps its "tables" default
              (seeded from `scope.viewLocked`) either way, so the list is unchanged. */}
          {sourceViews.length > 0 ? (
            <SourceMenu
              browse={browse}
              label={browseLabel}
              views={sourceViews}
              onBrowse={setBrowse}
            />
          ) : null}
        </div>

        <div className="cv-picker-list">
          {!hasAny ? (
            emptiedByFilter ? (
              <div className="cv-picker-empty">
                <p>
                  {hiddenCount} {q ? "matching " : ""}field{hiddenCount === 1 ? "" : "s"} cannot go
                  in this slot, and “Only compatible fields” is hiding{" "}
                  {hiddenCount === 1 ? "it" : "them"}.
                </p>
                <button
                  type="button"
                  className="cv-picker-show-all"
                  onClick={() => setOnlyCompatible(false)}
                >
                  Show all fields
                </button>
              </div>
            ) : (
              <p className="cv-picker-empty">
                {isLoading ? "Loading fields…" : "No fields match."}
              </p>
            )
          ) : (
            rendered.map(({ section, groups }, idx) => {
              const count = groups.reduce((n, g) => n + g.items.length, 0);
              // Related tables collapse by default; an explicit toggle overrides; a
              // search query forces every table open so matches are always visible.
              const defaultCollapsed = section.tag === "related";
              const effectiveCollapsed = collapsedOverride[section.cube.name] ?? defaultCollapsed;
              const expanded = q.length > 0 ? true : !effectiveCollapsed;
              // A category heading renders above the FIRST related table of each
              // category (sections arrive sorted by category).
              const prev = idx > 0 ? rendered[idx - 1].section : undefined;
              const showHeading =
                section.tag === "related" && section.heading !== undefined &&
                (prev?.tag !== "related" || prev.heading !== section.heading);
              return (
                <div key={section.cube.name}>
                  {showHeading ? (
                    <div className="cv-picker-related-heading">
                      {section.heading}
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
                    {section.cube.grain ? (
                      <span className="cv-picker-grain">{section.cube.grain}</span>
                    ) : null}
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
                          {collapseFamilies(g.items).map((row) => {
                            // An aggregate family renders as ONE row; the pill swaps
                            // which concrete member a click will place (total → avg →
                            // per <row>). Lone members render exactly as before.
                            const selName = row.familyKey ? familySel[row.familyKey] : undefined;
                            const selIdx = row.variants.findIndex((v) => v.option.name === selName);
                            const idx = selIdx >= 0 ? selIdx : row.defaultIndex;
                            const { option, kind, reason } = row.variants[idx];
                            const agg = row.familyKey
                              ? {
                                  label: aggPillLabel(option, findCube(meta, option.cube)),
                                  onCycle: (): void => {
                                    const next = row.variants[(idx + 1) % row.variants.length];
                                    setFamilySel((s) => ({ ...s, [row.familyKey!]: next.option.name }));
                                  },
                                }
                              : undefined;
                            return (
                              <PickerRow
                                key={row.familyKey ?? option.name}
                                option={option}
                                label={row.familyKey ? row.label : undefined}
                                unitBadge={fieldBadge(option, displayUnit)}
                                badge={kind === "time" && memberCanonicalTime(option) ? "default" : undefined}
                                reason={reason}
                                agg={agg}
                                onPick={() => pick(option.name, kind)}
                              />
                            );
                          })}
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

/**
 * The "data source" selector: all related tables, or a curated view. A quiet icon
 * button — the current source is already stated by the list's own table headings, so
 * the label only competed with the search box. The name lives in `aria-label`/`title`.
 */
function SourceMenu({ browse, label, views, onBrowse }: SourceMenuProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const choose = (v: string): void => {
    onBrowse(v);
    setOpen(false);
  };
  const name = `Data source: ${label}`;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="cv-picker-source-trigger"
        aria-label={name}
        title={name}
      >
        <Database className="cv-ec-icon" />
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

/**
 * The pill label for a family variant: its agg ("total", "avg"), with the row-level
 * variant named by the cube's grain ("per trip") instead of an abstract "value".
 */
function aggPillLabel(option: MemberOption, cube: CubeOption | undefined): string {
  const agg = memberAgg(option) ?? "";
  return agg === "value" ? grainAggLabel(cube?.grain) : agg;
}

interface PickerRowProps {
  option: MemberOption;
  /** Label override — a collapsed family renders its familyTitle, not the member's. */
  label?: string;
  reason?: string;
  onPick: () => void;
  /**
   * The type/unit chip ("km", "mpg", "#", "text", "date", "yes/no") — what the field
   * HOLDS, in words, replacing the old per-type glyph icons that named nothing.
   */
  unitBadge?: string;
  /** A small trailing chip (e.g. "default" on the cube's canonical time axis). */
  badge?: string;
  /**
   * The aggregation pill for a collapsed family row ("total ▾"). A SIBLING of the row
   * button (buttons cannot nest), clickable even when the current variant is blocked
   * so the user can cycle to one that fits.
   */
  agg?: { label: string; onCycle: () => void };
}

/**
 * One member row. A blocked row is muted, `aria-disabled`, and still focusable so the
 * hint is reachable — and it SHOWS the reason inline rather than only in the tooltip:
 * a WebView has no hover, so a title-only hint is invisible on touch.
 */
function PickerRow({ option, label, reason, onPick, unitBadge, badge, agg }: PickerRowProps): React.ReactElement {
  const unit = unitBadge ? <span className="cv-field-unit">{unitBadge}</span> : null;
  const text = label ?? option.label;
  const aggPill = agg ? (
    <button
      type="button"
      onClick={agg.onCycle}
      title={`Aggregation: ${agg.label} — click to change`}
      aria-label={`Aggregation: ${agg.label} — click to change`}
      className="cv-picker-agg"
    >
      {agg.label}
      <ChevronDown className="cv-ec-icon--xs" />
    </button>
  ) : null;
  const main = reason ? (
    <span
      tabIndex={0}
      aria-disabled
      title={reason}
      className="cv-picker-row--disabled"
    >
      <span className="cv-picker-row-main">
        {unit}
        <span className="cv-ec-truncate">{text}</span>
      </span>
      <span className="cv-picker-row-reason">{reason}</span>
    </span>
  ) : (
    <button
      type="button"
      onClick={onPick}
      title={option.description ?? option.name}
      className="cv-picker-row"
    >
      {unit}
      <span className="cv-picker-row-label">{text}</span>
      {badge ? (
        <span className="cv-picker-badge">
          {badge}
        </span>
      ) : null}
    </button>
  );
  if (!aggPill) return main;
  return (
    <span className="cv-picker-rowwrap">
      {main}
      {aggPill}
    </span>
  );
}
