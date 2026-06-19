I now have a complete and authoritative picture of the spec model, the per-family `familyOptions` mappings, the editor state engine, the responsive shell, and every reusable primitive. I'm ready to write the design doc.

Note: the combo family reads `mapping.category` for its x but its series live in `familyOptions.series` (each with `render`), so a combo well-set must write both. Scatter/kpi/table carry their own member references inside `familyOptions`. This is decisive for the well→spec mapping below.

---

# cube-viz Chart Builder v2 — A Radically Simpler UI Over the Same ChartSpec

**Status:** design, implementation-ready. **Scope:** the editor only (`src/editor/**`). **Invariant:** the `ChartSpec` schema (`src/spec/schema.ts`), the family renderers (`src/charts/**`), `resolveOptions`, and `useChartEditorState` are **unchanged**. This is a new front of house over the same JSON.

The one structural idea: replace the 7 stacked accordion `Section`s (`Data source → Measures → Dimension → Time → Filters → Chart type → Format`) with **chart-type-first + a small set of typed wells you fill by dragging or clicking**, and **delete the formatting/axis/legend-position controls entirely** (they become automatic). Every well edit goes through the existing `update(nextSpec)`.

---

## 1. Builder layout (top → bottom) and responsive behavior

```
┌──────────────────────────────────────────────────────────────────────┐
│  ❶ TypePicker  [▮ Bar] [Line] [Area] [Pie] [Scatter] [# KPI] [Table]   │  ← top, conditions everything
├───────────────────────────────┬──────────────────────────────────────┤
│  ❷ WELLS (role slots, per type)│                                       │
│   ┌─ The number ─────────────┐ │            ❹ LIVE CHART               │
│   │ [Σ Distance ✎ ● ✕]       │ │     (on-chart editing: click legend   │
│   │ + drop a number here     │ │      to hide a series, click title    │
│   └──────────────────────────┘ │      to rename, click swatch to       │
│   ┌─ Break it down by ───────┐ │      recolor, "+ click to add metric")│
│   │ [▦ Day ▾gran ✕]          │ │                                       │
│   └──────────────────────────┘ │                                       │
│   ┌─ Split by color (opt) ───┐ │                                       │
│   │ + drop something here    │ │                                       │
│   └──────────────────────────┘ │                                       │
│                                │                                       │
│  ❸ FIELD PALETTE (searchable)  │                                       │
│   Numbers ▸  Day ▸  Labels ▸   │                                       │
│   [Σ Total distance]  [Σ Trips]│                                       │
│   [▦ Day] [▦ Week] …           │                                       │
│   [⌗ Device] [⌗ Driver] …      │                                       │
│                                │                                       │
│  ▸ Filters (collapsed)         │                                       │
│  ▸ Customize (collapsed)       │  ← the SMALL per-family option set     │
└───────────────────────────────┴──────────────────────────────────────┘
```

Top-to-bottom order in the left config column:

1. **TypePicker** — full-width segmented strip of chart families, **first**, because it conditions which wells and which Customize options exist (the user's authoritative constraint).
2. **Wells** — the typed role slots for the selected family (§2). Empty wells show drop-zone microcopy.
3. **Field palette** — searchable, grouped, humanized field list (§3). Drag source + click-to-add.
4. **Filters** — one collapsed `Section` wrapping the **existing** `FilterBuilder` verbatim (no redesign needed; it already works).
5. **Customize** — one collapsed `Section` with the **few** meaning-changing toggles for this family (§4).

The right pane is the **live `<CubeChart>` preview** (unchanged wiring from `ChartEditor.tsx`), now also an edit surface (§3.4).

### Responsive (container-driven, WebView-safe)

Reuse `EditorShell mode="two-pane"` and `useContainerBreakpoint` (threshold 720px) exactly as today — nothing viewport-based.

- **Wide (> 720px):** config column (`panelWidth`, default 360) left, live chart right. Palette sits **below the wells** in the config column (a vertical strip), so wells and palette are both visible for drag.
- **Narrow (≤ 720px, the WebView/phone case):** `EditorShell` already stacks **preview on top, config below**. Two adjustments for touch:
  - The **palette becomes a horizontal, chip-scrolling row** under the wells (`overflow-x-auto`), so it doesn't eat vertical space.
  - **Click-to-add is the primary path** on narrow (drag from a scrolling row into a well is unreliable on touch). Tapping a palette chip opens the tiny "Add to → The number / Break it down by / Split by color" menu (only the legal wells for that field's kind are shown; if exactly one legal empty well, it fills it directly with no menu). Drag still works where the platform supports it but is never required — matching the existing `MemberMultiPicker` philosophy ("the reliable path inside a mobile WebView").

A `useWells(spec)` read-model + `wellsToSpec` writer (pure, mirrors `helpers.ts`) is the seam, so the same components render in both layouts.

---

## 2. Wells per family — names, cardinality, allowed kinds, and the ChartSpec mapping

Field **kinds** come straight from `meta-helpers.ts`: `measure` (the "number"), non-time `dimension` (a "label"), and time `dimension` (`type === "time"`, a "date"). The palette and wells reuse `listMembers(meta, kind, cube)` and `findMember` verbatim — **no new member logic, names stay verbatim** (critical for `prefix:true` view members).

Cube scoping rule (preserve today's behavior): the **first placed field sets the active cube** (`inferCube`); subsequent wells/palette filter to that cube. Dropping a field from another cube triggers the existing "switching the data source clears member-bound state" reset (`onCubeChange`).

Legend: **kinds** — `#` number (measure), `🗓` date (time dim), `⌗` label (non-time dim). **Card.** = cardinality.

### bar / line / area  (`familyUsesMapping` + `familyHasCartesianAxes`)

| Well (plain name) | Card. | Allowed kind | ChartSpec writes |
|---|---|---|---|
| **The number** | many | `#` number | `query.measures = [...]` **and** `chart.mapping.series = { mode:"measures", members, meta? }` |
| **Break it down by** | one | `🗓` date **or** `⌗` label | if date → `query.timeDimensions = [{ dimension, granularity }]` and `chart.mapping.category = { member }`; if label → `query.dimensions = [member]` and `chart.mapping.category = { member }` |
| **Split by color** *(optional)* | one | `⌗` label (≠ the break-down field) | **pivot mode:** moves the series to `mapping.series = { mode:"pivot", value: <first number>, pivot: <this label> }`, adds the label to `query.dimensions`. (When empty, series stays `mode:"measures"`.) |

Rules enforced by the wells (Looker/Power BI constraint, surfaced as plain microcopy, not errors):
- **Split by color** is enabled only when **The number** has exactly **one** field (pivot needs a single value). If a second number is added while a color split exists, the color split is auto-cleared and a one-line note appears: *"Pick one number to split by color, or remove the color split to compare several numbers."*
- This is precisely the existing `buildSeries`/`buildMapping` machinery extended with the pivot branch; both already exist in `SeriesMappingSchema`.

### pie  (`familyUsesMapping`, no cartesian axes)

| Well | Card. | Kind | Writes |
|---|---|---|---|
| **Slices** | one | `⌗` label (or `🗓` date) | `query.dimensions=[member]` (or `timeDimensions`), `mapping.category={member}` |
| **Size of each slice** | one | `#` number | `query.measures=[member]`, `mapping.series={mode:"measures",members:[member]}` |

No color/series well (pie colors by slice automatically). No orientation, no axes.

### scatter  (mapping lives in `familyOptions`, not the envelope)

| Well | Card. | Kind | Writes |
|---|---|---|---|
| **X (a number)** | one | `#` | `familyOptions.x`; member added to `query.measures`/`dimensions` as appropriate |
| **Y (a number)** | one | `#` | `familyOptions.y`; member added to query |
| **Bubble size** *(opt)* | one | `#` | `familyOptions.size` |
| **Split by color** *(opt)* | one | `⌗` | `familyOptions.groupBy`; added to `query.dimensions` |

Validates against `ScatterFamilyOptionsSchema` (x, y required). `chart.mapping` stays `undefined` (the renderer ignores it).

### kpi  (single number; mapping in `familyOptions`)

| Well | Card. | Kind | Writes |
|---|---|---|---|
| **The number** | one | `#` | `familyOptions.measure`; `query.measures=[member]` |
| **Compare to previous period** *(opt — a toggle, not a field well)* | — | — | `familyOptions.comparison = { mode:"previousPeriod", showAsPercent:true }` |

No X, no color. (Comparison is a Customize toggle, §4.)

### table  (no positional slots)

| Well | Card. | Kind | Writes |
|---|---|---|---|
| **Columns** | many | any (`#`/`🗓`/`⌗`) | each column → `query.measures`/`dimensions`/`timeDimensions` by its kind, **and** appends `familyOptions.columns[] = { member, label? }` (order preserved) |
| **Group by** *(opt)* | one | `⌗` | a Customize-level pivot toggle; v2 ships **Columns only** and parks Group-by as a stub well (pivot table isn't in the renderer today — keep it out of the first cut). |

### combo  (shared category + per-series render in `familyOptions.series`)

| Well | Card. | Kind | Writes |
|---|---|---|---|
| **Break it down by** | one | `🗓`/`⌗` | `mapping.category={member}` + query as for bar |
| **The numbers** | many | `#` | each number → `query.measures[]` **and** `familyOptions.series[] = { member, render }` where `render` defaults `line`/`bar` alternating; each chip gets a per-series **bar/line/area** toggle (the one place combo earns an extra control) |

Combo is the only family whose number chips carry a render-type selector; everything else's chips are uniform.

**Decisive principle:** for `mapping`-based families the wells are a thin restatement of today's `measuresOf`/`categoryOf`/`buildMapping`; for `familyOptions`-based families (scatter/kpi/table/combo) the wells write the family's own member fields. Both paths emit a full `ChartSpec` and run through the **unchanged** `update → validate(ChartSpecSchema) → debounce-emit`.

---

## 3. The field palette, the add interaction, and per-chip config

### 3.1 Palette contents (humanized, grouped)

Source: `listMembers(meta, "dimensionOrMeasure"|"time", cube)` (already humanized — each `MemberOption` carries `label = shortTitle ?? title ?? name`, an icon by `type`, and `description` for the tooltip). The palette **groups by kind**, in this order, with plain headers:

- **Numbers** (`memberType==="measure"`) — icon `#`
- **Dates** (`type==="time"`) — icon `🗓`
- **Labels** (non-time dimensions) — icon `⌗`

A search box (reuse the `MemberMultiPicker` search) filters by `label`/`name`. Before any field is placed, the palette shows **all cubes** grouped (`groupByCube`); once a cube is active it filters to that cube and shows a tiny "Change data source" affordance (the old `CubePicker`) at the palette header — this replaces the standalone **"Data source"** section.

### 3.2 Add interaction (drag primary, click mandatory fallback)

- **Drag:** each palette item is `draggable`. On `dragstart` it sets a lightweight payload `{ name, kind }`. Wells are drop targets that **highlight only when the dragged kind is legal** for that well (e.g. a Label won't highlight "The number"); illegal wells dim. Drop → `placeField(well, name)`. (Mirrors the HTML5 DnD already used in `MemberMultiPicker`.)
- **Click (always available, primary on touch):** clicking a palette item:
  - if exactly **one** legal empty well exists → fills it;
  - else opens a 1-level menu **"Add to → "** listing only legal wells.
  This is the keyboard/screen-reader path and the WebView path. Each placed field announces via an `aria-live` region: *"Total distance added to The number."*
- **Click the chart to add (bonus):** the live preview accepts a click on empty plot area when **The number** is empty → opens the same compact "Add a number" menu sourced from palette Numbers. Implemented as an overlay affordance in the preview wrapper; no renderer change (the renderers stay pure).

### 3.3 A placed field = a **Chip**

A `Chip` is the in-well token: `[icon · label · (date→granularity ▾) · (combo→render ▾) · ✎ · ● · ✕]`. Minimal controls:

- **Rename (✎):** inline text → writes `mapping.series.meta[member].label` (numbers) / column label (table) / series label (combo). Reuses the label field already in `SeriesMetaEditor`.
- **Recolor (●):** the existing `ColorTokenPicker` in a popover → `meta[member].colorToken`. Only on number/series chips.
- **Remove (✕):** unbinds the field from the well and from the query (reuses the removal logic in `onMeasuresChange`/`onCategoryChange`).
- **Granularity (▾):** only on a **date** chip in a break-down/x well — a compact `GranularityPicker` writing `timeDimensions[0].granularity`. **Adaptive default:** when first dropped, granularity is chosen from the bound date range if one exists (range ≤ ~2 days → `hour`, ≤ ~90 days → `day`, ≤ ~2 years → `month`, else `year`), instead of the flat `day` default. Falls back to `day` when no range is set.
- **Reorder:** for many-cardinality wells (numbers, table columns) keep the up/down + drag reorder already in `MemberMultiPicker`.

The heavyweight per-series `FormatOptionsEditor` is **removed from the chip** (formatting becomes automatic via the host formatter — §4). The chip keeps only label + color + (granularity/render). This is the bulk of the simplification.

### 3.4 On-chart editing (replaces several panel controls)

- **Legend click = series control:** toggle show/hide a series on the chart (removes the need for any "series visibility" UI).
- **Title / axis-title click = inline rename.**
- **Legend swatch click = recolor** (same `ColorTokenPicker` popover).

These need small affordance hooks in the preview wrapper; the family components stay pure `(data, options, config, format) → element`.

---

## 4. The small remaining option set per family (Customize) + what becomes automatic

The **Customize** `Section` (collapsed by default) shows only meaning-changing toggles for the active family. Everything written below maps to existing envelope/`familyOptions` fields.

| Family | Customize controls (the whole list) | Spec field |
|---|---|---|
| **bar** | **Horizontal** (toggle) · **Stacked** (None / Stacked / 100%) | `chart.orientation` · `chart.stackMode` |
| **line** | **Curved** (smooth) · **Show points** · **Fill area** | `familyOptions.curve` (`monotone`↔`linear`) · `familyOptions.dots` · `familyOptions.showArea` |
| **area** | **Stacked** (None / Stacked / 100%) · **Curved** | `chart.stackMode` · `familyOptions.curve` |
| **pie** | **Donut** (toggle) | `familyOptions.innerRadiusPct` (0 ↔ ~55) |
| **scatter** | **Bubble shape** (circle default) | `familyOptions.shape` (kept minimal; optional) |
| **kpi** | **Compare to previous period** (toggle) · **Show as %** | `familyOptions.comparison` |
| **table** | **Compact rows** (toggle) | `familyOptions.rowHeight` |
| **combo** | per-series **bar/line/area** lives on the chip; no envelope extras | `familyOptions.series[i].render` |

**Orientation:** rendered **only for bar** (per the user's rule). Auto-default stays `vertical`; flips to `horizontal` is a manual toggle. **Removed entirely** from line/area/combo/pie/kpi/table.

### Becomes automatic (no UI at all)

- **Legend show/hide & position** — auto: shown when >1 series, hidden for single-series; position stays the family default in `DEFAULTS`. The **position picker is deleted**; an optional "Show legend" lives only behind nothing-by-default (we drop it; legend auto-manages and the on-chart legend click handles hide). `chart.legend` is simply left to defaults.
- **Tooltip** — always on (family default); no toggle.
- **Axis labels / scale / domain** — auto from field names; `chart.axes` left to defaults. (Log scale + manual range are dropped from the UI; still expressible in raw JSON for power users.)
- **Number / date / unit formatting** — auto via the host `ChartFormat` (`format.value`/`format.category`), driven by member `meta` (unit/quantity). `chart.format` defaults to `{ kind:"auto" }`; the per-series `FormatOptionsEditor` is removed.
- **Granularity** — adaptive default (§3.3), still editable on the date chip.
- **Pie `maxSlices`, bar `barRadius/maxBarSize`, dots style, etc.** — keep `DEFAULTS`; no UI.

---

## 5. What to DELETE, and the migration (old `ChartConfigPanel` sections → new wells)

Everything below is **UI removal only** — the spec fields remain valid and back-compatible; old specs render unchanged, and any field we stop exposing simply keeps its stored/default value.

| Old `ChartConfigPanel` element | Fate | New home |
|---|---|---|
| **§1 Data source** `Section` + standalone `CubePicker` | **Delete the section** | "Change data source" affordance in the **palette header**; cube auto-set by first placed field (`inferCube`) |
| **§2 Measures** `MemberMultiPicker` + `SeriesMetaEditor` stack | **Replace** | **"The number(s)"** well + `Chip`s (label/color kept, per-series **Format removed**) |
| **§3 Dimension** "Category dimension" `MemberPicker` (the confusing label) | **Replace + rename** | **"Break it down by"** / **"Slices"** / **"X"** well per family |
| **§4 Time** member + granularity + date-range rows | **Split** | time member folds into the **"Break it down by"** well (a date chip); **granularity → chip ▾**; **date range → Filters / a host date-range variable** (no longer a free-text row in the builder) |
| **§5 Filters** `FilterBuilder` | **Keep**, move into collapsed **Filters** `Section` | unchanged component |
| **§6 Chart type — Family `SegmentedControl`** | **Promote to top** | **TypePicker** (§1) |
| **§6 — Orientation `SegmentedControl`** | **Delete for all but bar** | bar-only toggle in **Customize** |
| **§6 — Stacking `SegmentedControl`** | **Keep** (bar/area) | **Customize** |
| **§6 — "Show legend" + Legend position** | **Delete both** | automatic; on-chart legend click for hide |
| **§6 — "Show tooltip"** | **Delete** | automatic (always on) |
| **§6 — X/Y axis label, Y-axis scale** | **Delete** | automatic |
| **§7 Format** `FormatOptionsEditor` | **Delete** | automatic via host formatter |
| `BindToggle`/`BoundField` (granularity/date-range var binding) | **Keep, relocate** | granularity chip ▾ gets a small "bind {var}" affordance (dashboard context only); date-range binding moves to Filters/variables |

No schema migration, no `migrate.ts` change, no data migration: v2 emits the same `ChartSpec` shape v1 did. A spec authored in v1 with, say, a manual legend position or per-series format still **renders** identically; v2 just doesn't surface those controls (they round-trip untouched because the panel only writes the fields it owns).

---

## 6. Component plan — new React components and how they emit ChartSpec

All new components live in `src/editor/chart/builder/` and emit changes **only** through the existing `update(next: ChartSpec)` from `useChartEditorState` (unchanged). `ChartEditor.tsx` swaps `<ChartConfigPanel>` for `<ChartBuilderPanel>`; `useChartEditorState` and the preview wiring are untouched.

**Pure seam (no React) — `builder/wells.ts`:** the single place that knows the well↔spec mapping.
- `type WellId` per family; `getWells(family): WellDef[]` (name, cardinality, allowed kinds).
- `readWells(spec): Record<WellId, string[]>` — derives chip contents from the spec (extends `measuresOf`/`categoryOf`/`timeDimensionOf` + reads `familyOptions` for scatter/kpi/table/combo).
- `placeField(spec, well, member, meta): ChartSpec` and `removeField(spec, well, member): ChartSpec` — the writers (wrap/extend `buildMapping`/`buildSeries`, plus the pivot + `familyOptions` branches). Pure, unit-testable, returns a full spec for `update`.

**Components:**

| Component | Responsibility | Emits via |
|---|---|---|
| `ChartBuilderPanel` | Orchestrates TypePicker + Wells + Palette + Filters + Customize; holds `spec`/`update` | calls `update(placeField/removeField/...)` |
| `TypePicker` | Top family strip (reuse `SegmentedControl` + `FAMILY_LABELS`); on change → `update({...spec, chart:{...chart, family, familyOptions: undefined}})` (today's `onFamilyChange`) | `update` |
| `FieldPalette` | `listMembers`-driven, grouped (Numbers/Dates/Labels), searchable; drag source + click-to-add menu; hosts "Change data source" | drag payload / `onAdd(member, kind)` |
| `Well` | One typed slot: label, drop-target (kind-gated highlight), empty-state microcopy, renders `Chip`s; legality + cardinality enforcement | `onPlace`/`onRemove` → `wells.ts` |
| `Chip` | Placed field token: label, rename (✎), color (● → `ColorTokenPicker`), remove (✕), conditional **granularity ▾** (`GranularityPicker`) and **render ▾** (combo); reorder for many-wells | patch callbacks |
| `CustomizeSection` | Per-family small toggle set (§4), inside one collapsed `Section` | `setEnvelope`/`familyOptions` patch (today's helpers) |
| `useWells(spec)` | Thin hook wrapping `readWells` + memoized `MemberOption` lookups (`findMember`) for chip labels/icons | — |
| `useFieldDrag()` | Shared drag state (dragged `{name,kind}`, legal-well predicate) for Palette↔Well; touch-safe (drag optional) | — |
| *(preview hooks)* | small overlay in the existing preview wrapper for legend-click-hide, title-rename, swatch-recolor, click-to-add-metric | `update` |

**Reused as-is:** `EditorShell`, `useContainerBreakpoint`, `Section`, `SegmentedControl`, `SwitchRow`, `FieldRow`, `MemberPicker`/`MemberMultiPicker` internals (search, DnD reorder, `memberTypeIcon`), `GranularityPicker`, `ColorTokenPicker`, `FilterBuilder`, `CubePicker`, and all of `meta-helpers.ts`. **Removed from the panel:** `FormatOptionsEditor` (chip + envelope), the legend-position/axis/tooltip blocks. `SeriesMetaEditor` is **superseded** by `Chip` (its label+color rows move into `Chip`; its format row is dropped).

**Net:** one new pure module (`wells.ts`) + ~6 small components, all funnelling through the existing validated `update`. No change to `schema.ts`, `defaults.ts`, `resolveOptions`, the renderers, or `useChartEditorState` — so the "spec/query model stays the same under the hood" guarantee holds.

---

### Key files referenced
- Spec contract: `/Users/csilvas/Documents/GitHub/cube-viz/src/spec/schema.ts`
- Family option schemas + defaults: `/Users/csilvas/Documents/GitHub/cube-viz/src/charts/defaults.ts`
- Editor state engine (keep): `/Users/csilvas/Documents/GitHub/cube-viz/src/editor/chart/useChartEditorState.ts`
- Current panel (replace): `/Users/csilvas/Documents/GitHub/cube-viz/src/editor/chart/ChartConfigPanel.tsx`
- Mapping helpers (extend in `wells.ts`): `/Users/csilvas/Documents/GitHub/cube-viz/src/editor/chart/helpers.ts`
- Meta → member options (reuse): `/Users/csilvas/Documents/GitHub/cube-viz/src/editor/primitives/meta-helpers.ts`
- Responsive shell (reuse): `/Users/csilvas/Documents/GitHub/cube-viz/src/editor/primitives/EditorShell.tsx`
- Reusable primitives: `ColorTokenPicker.tsx`, `GranularityPicker.tsx`, `MemberMultiPicker.tsx`, `SegmentedControl.tsx`, `Section.tsx`, `SwitchRow.tsx` (all under `/Users/csilvas/Documents/GitHub/cube-viz/src/editor/primitives/`)
- Editor host (swap panel only): `/Users/csilvas/Documents/GitHub/cube-viz/src/editor/ChartEditor.tsx`