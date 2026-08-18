# cube-viz Chart Builder v4 — Channel-Typed Wells

> **Status:** as-built (2026-08). **Scope:** the editor (`src/editor/**`) plus the `wells`
> declarations it reads off `ChartFamilyDescriptor` (`src/charts/familyDescriptors.ts`).
> **Invariant, unchanged since v2:** the `ChartSpec` schema (`src/spec/schema.ts`), the family
> renderers (`src/charts/**`), `resolveOptions`, and `useChartEditorState` are untouched by the
> builder. Every edit still emits a **full** `ChartSpec` through the unchanged
> `update → validate(ChartSpecSchema) → debounce-emit` engine.

**The lineage.** v2 replaced the 7-accordion config panel with *chart-type-first + typed wells*.
v3 removed the panel entirely: the live preview **is** the editing surface (§1). v4 changes what
a well **is**. A well used to be a family-specific slot whose behaviour lived in a per-family
`switch`; it is now a declaration of two facts — **where** its field lives in the spec
(`target`) and **which visual channel** it feeds (`channel`) — and ONE generic interpreter
services every builtin family from those two facts.

The payoff is not code size (though `builder/wells.ts` went from 751 lines of per-family dialects
to 173 lines of dispatch). It is that the questions the editor keeps asking —
*what is in this slot? may this field go here? which chart type suits these fields? what happens
if I switch type?* — now have **one** answer each instead of five that disagreed at the edges.

---

## 1. The surface (unchanged from v3)

`ChartEditOverlay` (`src/editor/chart/onchart/ChartEditOverlay.tsx`) arranges field slots
**around** the live `<CubeChart>` preview:

```
┌────────────────────────────────────────────────────────────────┐
│ [toolbar]                                          [⋯ chrome]  │
├──────────────┬─────────────────────────────────────────────────┤
│  LEFT strip  │                                                 │
│  (zones.left)│              LIVE CHART PREVIEW                 │
│  ┌─────────┐ │        (centre: chart-type pill / the           │
│  │ Values  │ │         empty-state type chooser)               │
│  │ [Σ …+]  │ │                                                 │
│  └─────────┘ │                                                 │
├──────────────┴─────────────────────────────────────────────────┤
│  BOTTOM strip (zones.bottom):  [Horizontal axis ▾] [Split by +]│
└────────────────────────────────────────────────────────────────┘
```

- `descriptor.zones` decides which wells anchor **left** (the value axis) and which **bottom**
  (category + splits). Zones adapt to state: a **horizontal** bar swaps its value and category
  strips so editing matches the chart.
- `descriptor.sidebarWidthClass` widens the left strip for KPI (`cv-sidebar--wide`), whose
  strip carries value/comparison/sparkline config blocks rather than one slot.
- A `WellGroup` renders one well: its placed field pills plus an add button opening
  `FieldPickerPopover` (§6). Where a well holds several fields at once its order **means**
  something — series draw / legend / stack order — so the pills carry a grip and are
  **dragged** into place, the same HTML5 pattern `MemberMultiPicker` uses for its ordered
  list. The drag session lives on the well (it is the only thing that sees both the pill
  being carried and the pill it is over) and the list rearranges live under the pointer,
  so the drop is just letting go of what you already see. **Alt+↑/↓** on a focused pill
  does the same move, because a drag alone would put ordering out of reach for anyone not
  using a pointer. This replaced a pair of Up/Down buttons buried in the pill's config
  popover; `scripts/shots.mjs` drives both paths (`verifyWellReorder`), since a screenshot
  can show the grip but not that it works.
- The centre holds `ChartTypePill` (configured chart) or `CenterTypePicker` (empty chart) —
  both now render the **suggested-types tile grid with live previews** (§5).
- The value well's per-field colour swatches use the **same** `resolveSeriesColors` resolver the
  renderer uses, so the editor never disagrees with the chart.
- **Auto-fill:** when a family declares `canonicalTimeWell` and that well is still empty, the
  first field placement also places the cube's canonical time dimension (member meta
  `canonicalTime: true`) there — so a line/area comes up as a proper time series from the first
  drop. Builtins: `line`/`area` → `"x"`; `bar` deliberately unset (its default axis is
  categorical). It is a plain placement — one tap removes it.

---

## 2. The channel model

### 2.1 The three vocabularies

```ts
/** A field's primitive role — what Cube says it is. */
type FieldKind = "number" | "category" | "time" | "numberDimension" | "geoPoint";

/** The visual role a well feeds. */
type Channel = "x" | "y" | "color" | "size" | "row" | "detail";

/** Where a well's field(s) live in the spec. */
type WellTarget =
  | { kind: "category" }                 // mapping.category.member (+ the query dim/timeDim)
  | { kind: "measures" }                 // the mapped measure list + query.measures
  | { kind: "pivot" }                    // mapping.series.pivot — the splitting dimension
  | { kind: "option"; key: string }      // familyOptions[key] = member
  | { kind: "optionList"; key: string }; // familyOptions[key] = [{ member }, …]
```

**`FieldKind`** gates *drops*. `numberDimension` exists because Cube models coordinates and
other per-row numbers (latitude, longitude, headings) as `type: number` **dimensions** — the
`number` kind only surfaces measures, so a well wanting raw per-row numbers opts in with
`kinds: ["number", "numberDimension"]`. Placement routes them differently (`number` →
`query.measures`, `numberDimension` → `query.dimensions`). `geoPoint` is one synthetic picker
option bundling a model-authored latitude/longitude pair; it never enters the saved spec — the
editor fans it out to a host family's internal lat/lng wells.

**`Channel`** is the load-bearing addition. Two families that expose the same channel **mean the
same thing by it**, which is what makes type-switching lossless (§4), fit-ranking possible (§5),
and the editor uniform: the category slot behaves identically in bar, line, area and heatmap
because it *is* the same channel. Note `row` vs `color`: both are stored as a pivot dimension,
but `row` is a second categorical **position** channel (the heatmap's rows) while `color` is a
categorical **paint** channel (a bar/line split). They differ only in how the mark reads them.

**`WellTarget`** is the storage address. This is where v2's "decisive principle" (mapping
families vs `familyOptions` families) went: it is no longer a fork in the code, it is a field on
the well.

### 2.2 `WellDef`

```ts
interface WellDef {
  id: string;
  label: string;
  hint?: string;
  cardinality: "one" | "many";
  kinds: FieldKind[];
  optional?: boolean;   // renders a muted "(optional)" affordance
  target?: WellTarget;  // ABSENT ⇒ host-managed (see §7)
  channel?: Channel;    // absent ⇒ excluded from unification
}
```

`isChannelWell(well)` is the predicate: a well carrying a `target` is serviced by the generic
interpreter. A well with no `target` is **host-managed** — the descriptor's own
`readWells`/`placeField`/`removeField` own it, exactly as before v4.

### 2.3 The builtin well table — family → well → target / channel

This mirrors `src/charts/familyDescriptors.ts` (which is the single source of truth). Wells are
listed **top → bottom**, i.e. the order the greedy matcher (§5) walks them.

| Family | Well `id` | Label | Card. | Accepted kinds | `target` | `channel` | Optional |
|---|---|---|---|---|---|---|---|
| **bar / line / area** *(one shared `CARTESIAN_WELLS` array)* | `y` | Values | many | `number` | `measures` | `y` | |
| | `x` | Horizontal axis | one | `time`, `category` | `category` | `x` | |
| | `color` | Split by | one | `category` | `pivot` | `color` | ✓ |
| **heatmap** | `value` | Value | one | `number` | `measures` | `y` | |
| | `hy` | Rows | one | `category` | `pivot` | `row` | |
| | `hx` | Columns | one | `time`, `category` | `category` | `x` | |
| **pie** | `slices` | Slices | one | `category`, `time` | `category` | `x` | |
| | `size` | Size | one | `number` | `measures` | `y` | |
| **scatter** | `sx` | Horizontal axis | one | `number` | `option: "x"` | `x` | |
| | `sy` | Vertical axis | one | `number` | `option: "y"` | `y` | |
| | `size` | Bubble size | one | `number` | `option: "size"` | `size` | ✓ |
| | `color` | Split by | one | `category` | `option: "groupBy"` | `color` | ✓ |
| **kpi** | `value` | Value | one | `number` | `option: "measure"` | `y` | |
| **table** | `columns` | Columns | many | `number`, `category`, `time` | `optionList: "columns"` | `detail` | |

Zones (`descriptor.zones`), for completeness:

| Family | left | bottom |
|---|---|---|
| bar / line / area | `y` | `x`, `color` |
| heatmap | `value`, `hy` | `hx` |
| pie | `size` | `slices` |
| scatter | `sy` | `sx`, `size`, `color` |
| kpi | `value` | — |
| table | `columns` | — |

Three things to read out of this table:

1. **`x` and `y` are not "horizontal/vertical".** They are *position* channels in the family's
   own idiom: pie's `slices` is the `x` channel (it is the category) and its `size` is `y` (it is
   the measure). That is precisely what makes bar → pie preserve both.
2. **The same `target` serves different channels.** Heatmap `hy` and cartesian `color` both write
   `mapping.series.pivot`; they differ only in channel, so a bar's colour split becomes a
   heatmap's *rows* rather than being dropped.
3. **`table` is `detail` on purpose.** A table column carries no position or paint role, so a
   table's fields only survive a type switch into another detail-bearing family — and the
   ranking (§5) discounts detail-only families so a table never *suggests* itself over a chart.

### 2.4 The interpreter

`src/editor/chart/builder/channels.ts` answers, generically, every question the per-family
switches used to answer in five dialects:

| Question | Function |
|---|---|
| what is in this well? | `readChannelWells(spec, wells, claimed?)` |
| may this field go here? | `wellAccepts(well, kind)` |
| why not? (user-facing) | `placementBlockReason(well, kind, current)` |
| put it here | `placeInChannelWell(spec, wells, wellId, member, kind)` |
| take it out | `removeFromChannelWell(spec, wells, wellId, member)` |
| keep my fields when I switch | `unifyChannels(spec, fromWells, toWells)` |
| how well does this family fit? | `channelFitScore(wells, fields)` |

`src/editor/chart/builder/wells.ts` is now pure dispatch — **descriptor hook (host families) →
else the interpreter** — plus two time-axis guards (§3.4). Its public shape
(`getWells`/`readWells`/`placeField`/`removeField`, the `WellDef`/`FieldKind` types,
`adaptiveGranularity`) is unchanged, so every call site and every host family built against it
keeps compiling.

---

## 3. Reading and writing, and the forgiving behaviours

### 3.1 The mapping envelope is assembled, not open-coded

`assembleMapping(category, measures, pivot, prevMeta)` is the single place the
measures-mode ⇄ pivot-mode transition happens (each cartesian writer used to open-code it):

- category + ≥1 measure + pivot ⇒ **pivot** mode (`series = measure × pivot value`)
- category, any measures, no pivot ⇒ **measures** mode
- no category ⇒ **no mapping** (the fields wait on the query)

Per-measure meta (label / colour token / curve) is carried across mode flips for every measure
still selected, so adding a split never wipes series colours.

### 3.2 A split dropped *before* its measures is HELD, not discarded

**Changed in v4.** The old per-family writers silently dropped a pivot placement on bar/line/area
when there was nothing yet to split. `pendingPivot` instead reports the first `query.dimensions`
entry that no other well has claimed, so the field is **visibly placed and bound to the query**;
the moment a measure lands, `assembleMapping` promotes it to a real pivot. Exploring in any order
is safe.

The `claimed` argument to `readChannelWells` exists for the same reason in reverse: a writer binds
its member to the query one step *before* the mapping records the role, so without it an in-flight
member would look like an unclaimed dimension and `pendingPivot` would adopt it as a split — a
category placed after a measure would pivot on itself.

### 3.3 Removing a field two wells share no longer unbinds it from the query

**Changed in v4.** `unbindFromQuery` first re-reads every *other* well; if any still holds the
member, the query is returned untouched. The old removers each hand-rolled this and disagreed at
the edges — a member sitting in two wells (a scatter with the same measure on both axes) could be
yanked out from under one of them.

Removal is otherwise per-target: losing the **category** collapses the mapping but leaves the
measures on the query (re-dropping an X restores the chart); losing the **last measure** also
drops the pivot and its dimension (there is nothing left to split).

### 3.4 Time-dimension guards

The interpreter edits a **single** time dimension (`query.timeDimensions[0]`) — right for the
one-time-axis families, wrong for a table whose `columns` well may hold several date fields. Two
guards in `wells.ts` reconcile the result with what the wells actually hold:

- `keepPlacedTimeDimensions` restores every time dimension that is still placed in a well but fell
  off the query.
- `keepTimeWindow` carries the edited granularity + `dateRange` across a one-for-one time-axis
  **swap** (replacing X unbinds the outgoing entry before binding the incoming one, which would
  otherwise drop the user's window with it).

Neither ever *prunes* a time dimension: a `dateRange`-only entry that no well claims is the
chart's date **filter**.

**Auto granularity.** A freshly-placed date is stored as `granularity: "auto"` with a
`dateRange` default of `"last 30 days"` (`DEFAULT_NEW_TIME_RANGE`) when nothing carried over —
so the first preview shows a month of daily buckets rather than every row since forever. The
spec keeps `"auto"`; the **variable resolver** substitutes the span-fitting concrete bucket
(`autoGranularityFor`: ≤2 days → `hour`, ≤90 → `day`, ≤730 → `month`, else `year`, no
readable span → `day`) right before the query is POSTed, so Cube never sees the token and a
later range change re-fits the bucket. The pill's "Group dates by" select leads with
**Auto (Day)** — the parenthesis names what it currently resolves to — and picking a concrete
bucket pins it. `adaptiveGranularity` (re-exported from `wells.ts` for host families) now
delegates to the same rule, so an explicit adaptive pick and Auto can never disagree.

---

## 4. Switching chart type = channel unification

`migrateToFamily(spec, next, registry)` (`src/editor/chart/helpers.ts`) used to be a per-family
`switch` that re-derived each destination's structure from the raw query. It is now:

```
read the SOURCE's channels  →  re-place them into the DESTINATION's wells that want those channels
        x → x        y → y        color → color        size → size        row → row
```

`unifyChannels` (in `channels.ts`) collects `channel → members` in well order from the source,
then walks the destination's wells and places what each one's channel offers (`one`-cardinality
wells take the first; `many` take all). Two details make it behave:

- **`coerceKind`** picks a kind the destination will accept without changing the query routing: a
  plain dimension and a numeric dimension both live in `query.dimensions`, so a well wanting one
  takes the other; a `time` field is accepted by a `category`-only well. If nothing coerces, the
  field is skipped.
- **The chart is cleared but the query is INTACT.** `mapping` and `familyOptions` are reset (the
  destination re-derives them; family defaults supply the rest, e.g. the KPI's
  `display: "number"`), while the rest of the display envelope — orientation, stack mode, axes,
  legend, format — is carried across **unchanged**, so bar → pie → bar restores the user's
  stacking rather than silently resetting it. The query (date range, granularity, filters, limit,
  timezone) is the *user's* context, not the chart's, and is never touched.

**Fields whose channel has no home in the destination are dropped from the wells but left on the
query**, so flipping back restores them. That is why the round trip works:

| Switch | Outcome |
|---|---|
| bar → line | x, y and the split all preserved |
| bar → pie | category → slices, first measure → size; the split has no home |
| bar → pie → bar | **restores the split** (it was still on the query) |
| line → heatmap | x → columns, y → value; only Rows is left to ask for |
| bar → kpi → bar | the measure survives both ways |
| bar → scatter | the measures land on the value axes; a *categorical* x has no home on a scatter (both scatter axes take numbers only) |

**Guard.** `isChannelManaged(descriptor)` requires every well to carry **both** a `target` and a
`channel`. A family with even one host-managed well keeps fields the interpreter cannot see, so
unifying would silently drop them; when either side fails the check, `migrateFromQuery` re-derives
the destination from the query greedily — the old switch's behaviour, generalized (see §7).

---

## 5. Suggested types + live tile previews

`src/editor/chart/builder/suggest.ts` turns the machine-readable family shape into the one thing a
non-technical user actually needs from a type picker: *which of these tiles is right for the
fields I already have?*

### 5.1 The field shape

`fieldShape(spec)` reads the **query**, not the chart — the query is the one place every family
agrees (scatter/kpi/table park their members in `familyOptions`, so reading the mapping would
under-count them). Ordered measures → dates → categories, which is also the order the greedy
matcher consumes, so a cartesian X comes up chronological. A time dimension with **no
granularity** is a date *filter*, not an axis, and is not a field.

### 5.2 The ranking

```
score = structuralFit            // channelFitScore, normalized by the family's own max
      − 0.35 × wastedFields      // fields this family genuinely cannot show
      + timeAffinity             // how this family treats a date
      − 0.4 if detail-only       // a table can always "fit"; it rarely suggests
```

- **Why normalize.** `channelFitScore` pays +3 per filled required well and +1 per optional one,
  so a family with more wells would always out-score a simpler one that fits perfectly (a heatmap
  would beat a KPI for a lone measure). Dividing by the family's own maximum asks *"how much of
  THIS chart did your fields fill?"*, which is the question a suggestion answers.
- **Waste is kind-aware.** A leftover **date** is never waste — it is the chart's date range. A
  leftover field a `many` well would still absorb is not waste either. (`channelFitScore` only
  ever matches one field per well, so the ranking refunds its 0.5-per-unplaced charge first and
  then charges its own.)
- **`timeAffinity`** is read off the descriptor, not a family key: a family naming a
  `canonicalTimeWell` is built for dates (+0.3); else a cartesian X handles them fine (+0.1);
  else an x-channel well that would still swallow the date (pie slices, heatmap columns) turns it
  into a pile of labels (−0.3). A time-first family asked to plot pure categories takes −0.2.

Nothing in the module hardcodes a family key, so a host family registered via
`<CubeVizProvider families>` is ranked by exactly the same rules as `bar`.

`rankFamilies` returns every non-query-less family best-first (ties broken by picker `order`, so
the grid does not reshuffle), each with `fits` (every required well can be filled — the chart
would actually draw) and a short `reason`. `suggestedFamilies(ranked, 3)` takes the best fitting
ones, and is **empty when nothing is placed yet**: there is nothing to suggest *from*, and a
confident-looking suggestion built on no evidence is worse than none.

**Language rule (enforced by a test):** every string this module produces is user-facing, so it
speaks in tasks and field names — *"Rows needs a category"*, *"2 measures over time"*, *"A grid of
two categories"*, *"Every field, row by row"* — and never in grammar (*channel*, *encoding*,
*pivot*).

### 5.3 The tiles

`CenterTypePicker` renders two grids — **"Suggested for your fields"** (with the reason line) and
**"All types"** (registry order, so it never reshuffles under the cursor) — where every tile is a
**miniature of this chart drawn as that type**:

- `previewSpecFor(registry, spec, family)` re-binds the user's current fields into that family's
  wells. This is deliberately **not** `migrateToFamily`: migration preserves *intent* by matching
  channels (so a field with no home is intentionally dropped), whereas a preview wants the most
  flattering arrangement this family could make of these fields — so it reuses the same greedy
  matcher the ranking scores. A bar's colour split therefore shows up as the heatmap's rows, which
  is exactly what the user gets after one drag. The **current** family previews the user's actual
  arrangement.
- The picker **loads the real query itself**, capped at **200 rows** and only while the popover is
  open (Radix unmounts closed content). It has to: the editor's data is fetched *inside*
  `<CubeChart>` and never lifted — `onState` surfaces raw rows, not the normalized shape. Dashboard
  `{var}` bindings are resolved the same way `useNormalizedSeries` does, so a chart bound to a
  date-range variable previews rather than failing.
- `miniChrome` strips the tile down to shape: no legend, no tooltip, no axes, and `chrome: "none"`
  **only** where the family declares that option (a stray key would sit unvalidated in another
  family's options).
- **Sample fallback.** Only families the current fields can actually fill preview with real data;
  the rest fall back to a small canned series. A scatter drawing its own "No data" teaches nothing
  about what a scatter looks like.
- Each tile is memoized and error-boundaried to its family icon (the picker itself must never
  break), and its hit target is a transparent overlay **over** the preview rather than its parent —
  a chart contains its own focusable nodes, and nesting those inside a `<button>` is invalid and a
  keyboard trap. One tile = one tab stop; the miniatures are out of the tab order.

---

## 6. Forgiving slots

**Changed in v4.** Field slots used to *hide* fields of a type they could not take. Hunting for
"Revenue" in the Category slot therefore found **nothing**, and the user had no way to learn why.

- Related tables are grouped under **cube-level `meta.category` headings** ("Vehicle
  activity", "Maintenance", …; alphabetical, uncategorized under a trailing "More tables") —
  authored on the Cube model, read off `/v1/meta` verbatim (`CubeOption.category`). The source
  table stays pinned on top with its "Main table" tag, and `CubePicker` (the Source control)
  groups its table list by the same headings. With no categories in the model the pickers
  degrade to the old flat list.
- `FieldPickerPopover` now lists everything. Usable kinds come first (in the picker's canonical
  order `geoPoint → number → numberDimension → category → time`), then the kinds this slot
  rejects — **muted, `aria-disabled`, still focusable**, each carrying the same short reason the
  slot itself would give (`placementBlockReason`: *"Horizontal axis needs a date or
  category"*, *"Values needs a number (a total, average or count)"* — the copy avoids
  "measure"/"dimension", which name spec storage, not anything a chart reader recognizes).
  `candidateReason` refines the slot rule when the FIELD's nature names the fix better: a
  numeric **dimension** on a numeric slot reads *"One value per record — pick its total or
  average instead"*, a boolean reads *"Yes/no field — use it as a filter or in Split by"*. A
  fully-rejected group header is marked *"not for this slot"*.
- The reason is rendered **inline**, not only in the `title`: a WebView has no hover, so a
  tooltip-only hint is invisible on touch. (This replaced a flat *"Not available"*.)
- The slot's own wrong-kind reason **wins** over the other blocks (cross-dataset, second measure
  source, axis-unit mismatch), because it names the fix — *put this somewhere else* — where the
  others describe the model.
- Every row carries a **type/unit chip** (`fieldBadge` + `.cv-field-unit`) instead of the old
  glyph-per-type icon: numbers show their unit in the *viewer's* unit system ("km"/"mi", "L",
  "min", "%", counts "#"), and the unit-less types name themselves ("text", "date", "yes/no",
  "map"). The same chip renders on placed pills and in the member pickers/filter builder
  (`MemberUnitChip`), so a field looks the same everywhere it appears.
- `WellGroup` titles its add button with the same sentence (`takesHint`), so the button and the
  greyed rows inside it never disagree; a well that takes everything (a table column) falls back to
  its own `hint`. With nothing placed anywhere yet, the required value slot — the measure is what
  every family needs first — shows a single *"Pick a number to get started"* line.
- `placementBlockReason` deliberately returns `undefined` for a full `one`-cardinality well:
  those **replace** rather than refuse. It is kept as a hook for callers that want to warn
  ("replaces Distance") instead of disabling.

### 6.1 "Only compatible fields" — hiding, as an explicit choice

Listing the blocked fields is the default, but a user who knows what they want does not need the
lesson every time. The picker header therefore carries one icon toggle button, inline at the end of the
search row, that hides every row that cannot be added **for any reason** (`src/editor/chart/onchart/picker-filter.ts`):

- `candidateReason(well, kind, inWell, option, contextReason)` is the single availability verdict:
  the slot's own rule (`placementBlockReason`) first, then the chart-level context reason
  `ChartEditOverlay` supplies — cross-dataset, second measure source, or the **axis unit/quantity**
  block (`axisUnitBlockReason`, applied on the value well of the families that declare
  `enforcesAxisUnit`). One value drives both the muted row's inline hint and whether the toggle
  hides it, so the two can never disagree.
- Consequence, and the reason it was asked for: with a **Distance** measure on the value axis, the
  toggle leaves only distance-compatible measures listed — litres and km/h are `unavailable` and
  disappear along with the wrong kinds.
- Hiding costs discoverability, so it is always paid for: the pressed button carries a **count
  badge** of what it is hiding (and says so in its tooltip / `aria-label`), the table counts drop to
  what is visible, and a list emptied *only* by the toggle says so and offers **"Show all fields"**
  instead of reading as "this field does not exist".
- The data-source control beside it (all related tables vs a saved Cube view) renders **only when it
  has more than one option** — with no views published, or a chart already anchored to one, the menu
  could change nothing, so it is not drawn at all.
- The glyph is lucide **`ListChecks`**, not `ListFilter`: the top bar's query-filter button already
  owns the funnel-ish decreasing lines, and one glyph doing double duty made this control read as
  *"filter the data"*. A checked list says what it actually does — *of the entries in this list,
  the ones that fit here* — and its left-hand ticks stay unmistakable beside the top bar at 16px in
  both themes (`screenshots/field-picker-compatible-only{,-dark}.png`).
- The choice is **one shared, observable value for the whole editor** (`onlyCompatibleStore` in
  `picker-filter.ts`), consumed with `useSyncExternalStore`. It is *not* per-popover state seeded
  from storage: the editor mounts one picker per well up front, so a local copy taken at mount time
  never learns that the user flipped the switch in a different slot — the bug that left the Values
  slot listing every date and dimension under *"Values needs a number…"* while its own toggle read
  `aria-pressed="false"`. The store also adopts a change made in another tab (`storage` event) and
  keeps working where `localStorage` cannot be written at all (it just does not survive a reload).
- It persists under `localStorage["cube-viz:field-picker:only-compatible"]`, read through a
  guard that tolerates no storage at all (SSR) and a `localStorage` access that *throws* (hardened
  WebView / blocked cookies). **Default ON** — the common intent is to fill the slot, so the list
  leads with what fits; both states persist explicitly ("1"/"0", legacy "1" honoured) so a future
  default flip cannot move a user who has chosen.
- A member Cube models as a `type: "number"` **dimension** (a coordinate, a heading) is reported by
  `listMembers` under *both* `numberDimension` and the plain `dimension` bucket, so `groupsFor`
  de-duplicates per table and keeps the FIRST hit — and since `kindOrder` leads with the kinds the
  slot accepts, the surviving row is the placeable one.
- Tests: `src/editor/chart/onchart/picker-filter.test.ts` (the hidden set incl. the
  distance-vs-litres case, the persistence guard, and the shared store). The end-to-end invariant —
  *with the toggle on, no slot in any table renders a row it would refuse* — is asserted in the DOM
  by `verifyCompatibilityInvariant` in `scripts/shots.mjs`, over every add-slot of
  `/editor.html?seed=empty`, once per slot the switch was flipped in. A screenshot cannot see it:
  the leak was in the slots the camera was not pointed at.

---

## 7. Host families

A host-registered family stays self-contained, and now has a choice:

- **Declare `target` + `channel` on its wells** ⇒ the generic interpreter gives it read/place/
  remove and lossless type-switching for free; no hooks needed.
- **Leave `target` off** ⇒ the well is host-managed and the descriptor's
  `readWells`/`placeField`/`removeField` own it, exactly as before v4.
- **Mix both** ⇒ declare targets on the wells the interpreter can service and a *partial*
  `readWells` for the rest; the host's output wins for the wells it returns
  (`readWells` merges `{ ...generic, ...host }`).

`WellDef`, `FieldKind`, `WellTarget` and `Channel` are all exported from the chart-editor barrel
for exactly this.

**The fallback path.** When either side of a type switch is not fully interpreter-managed,
`migrateFromQuery(spec, to)` re-derives the destination from the query: measures and dimensions are
handed to the destination's channel wells greedily, in well order, by what each well accepts —
which reproduces the old per-family recipes (cartesian: all measures + the first dimension; pie:
one measure + one slice dimension; scatter: the first measures + a group-by; kpi: the first
measure; table: every member as a column). A well that takes **both** kinds (a table's columns)
reads dimensions-first, which is the column order the old recipe produced. If the destination is
itself host-managed, the mapping envelope is carried across when it declares `supportsMapping`,
and otherwise its own hooks re-derive as the user rebinds.

---

## 8. Customize — the small remaining per-family option set

The type picker's **Options** panel (`CustomizeSection`) still holds only the meaning-changing
knobs. As built today:

| Family | Controls | Spec field |
|---|---|---|
| **bar** | Horizontal · Stacked (None / Stacked / 100%) | `chart.orientation` · `chart.stackMode` |
| **line** | Line shape (Smooth / Straight / Step / Curved) | `familyOptions.curve` |
| **area** | Line shape · Stacked (None / Stacked / 100%), with a hint explaining the shape-aware default while `stackMode` is unset | `familyOptions.curve` · `chart.stackMode` |
| **pie** | Donut · Slice labels (None / % / Value / Name) | `familyOptions.innerRadiusPct` · `showLabels` |
| **scatter** | *(none)* | — |
| **kpi** | *(none — configured by the Value / Comparison / Trend blocks in the config strip)* | — |
| **table** | *(none — sorting and a pinned header are always on, row density follows the row count)* | — |
| **heatmap** | *(none — in-cell values appear whenever the grid is small enough to read them)* | — |
| **bar / line / area** | **Compare** (None / Rolling average / Running total / % of total), plus a **Window** input revealed only for the rolling average | **`chart.transform`** (docs/01 §3.6, docs/02 §2.9) |

**Line shape is here, not on the field pill (spec v5).** It used to be per-measure, and
per-measure it could not work: a stacked or 100% area draws a whole stack from one mark,
and a color-split chart has no per-measure `meta` to write to — so the picker was ignored
in one case and absent in the other. Points (`meta.dots`) stayed per-measure, because a
dot is its own mark per series. See docs/02 §7.10.

The `transform` row is the one addition: it is an **envelope** option, not a family one, offered
wherever `familySupportsTransform(descriptor)` holds (`supportsMapping && supportsCartesianAxes &&
!queryless`). `hasCustomizeOptions(family, families)` therefore returns true for a family that
supports the transform even when the descriptor flag is `false` — that is `line`, which is
otherwise edited entirely in context but still needs somewhere for the Compare select to live.

Everything v2 made automatic stays automatic: legend show/position, tooltip, axis labels/scale/
domain, and number/date/unit formatting (host `ChartFormat`, member-meta driven).

---

## 8b. Nothing a knob does may cost you the dashboard

The editor is a tree of small controls over one spec, and any of them can be handed a
shape it did not expect — a value bound to a variable where a literal was assumed, an
option written by a newer build, a half-migrated preset. Unguarded, one such control
throws, React unmounts the tree, and the whole board becomes a blank error screen with
nothing naming which knob did it. Worse, the offending value is *in the spec*, so every
reload does it again and there is no way back in to fix it.

This actually shipped. The KPI **Trend** popover printed its bucket by casting it to a
string; a bucket may be a `{var}` binding, which is an object, and React refuses an
object as a child. Binding the trend took the dashboard down permanently.

Four things now stand between a bad value and that outcome, in order of preference:

1. **`bindingSummary`** (`chart/binding/variable-binding.ts`) — the one way to render a
   value that may be a literal or a `{var}`. It returns a **string for every input**, so
   a collapsed summary can never be the thing that breaks; bound values read as
   `{variable}`, the convention the filter summaries already use. `granularitySummary`
   wraps it with the bucket display names.
2. **`granularityOptionsFor`** (`src/variables/granularity-span.ts`) — every picker that
   chooses a bucket for a *known* date range offers only the buckets that divide it into
   something readable. "Second" over four weeks is 2.4 million points: a query that
   hangs or is refused, reached by picking a plainly-offered option. The rail is the
   option list, not a warning afterwards. An unknown or variable-bound range narrows
   nothing, and the value already stored always stays in the list so a picker can never
   show a placeholder over a real setting.
3. **Resolution always runs.** `useNormalizedSeries` resolves `{var}` tokens whether or
   not there is a `DashboardProvider`; outside one there is nothing to resolve against,
   so tokens resolve to empty and their field drops — the resolver's own
   narrowing-or-neutral contract. Passing the query verbatim instead used to send the
   raw token to Cube, where `@cubejs-client/core` reads a `dateRange` as an array and
   threw on the object.
4. **`EditorErrorBoundary`** (`editor/primitives/`) — the backstop, at every surface that
   can be reasoned about on its own: each KPI config popover, each `WellGroup`, the whole
   on-chart overlay, and the dashboard editor's full-screen body. The failure reads as a
   message *inside that surface*, naming it ("Trend couldn't be shown"), and the rest of
   the editor keeps working. It clears on `resetKey` (the spec), so editing the offending
   value retries the render. The full-screen **header stays outside** its boundary on
   purpose: whatever went wrong, "Done" is still there to get back to the canvas.

`playground/editor.tsx` carries a `?seed=kpi-bound` regression seed — a KPI whose trend
bucket and date range are variable-bound — and `scripts/shots.mjs` shoots it. That
harness fails the run on any page error, so the frame existing at all is the assertion.

---

## 9. Open questions / known gaps

The three current gaps are stated once, in **docs/02 §7**, because they are renderer-layer facts:

1. **A bucketed date column renders as em-dashes in the `table` family** (docs/02 §7.1). Relevant
   here because the `columns` well is where such a column is placed: the editor stores the bare
   member (`trips.start_time`) while Cube's `tablePivot()` keys it `trips.start_time.day`.
   **Pre-existing** — the v3 `placeTable` writer stored the same shape — and the fix belongs in
   `TableFamily`'s column resolver, not in the well model.
2. **TanStack Charts is pre-1.0**, so the brush and scale APIs the interaction seam uses may churn
   (docs/02 §7.2). No editor surface depends on them.
3. **Enabling a range brush costs hover inspection on that chart** (docs/02 §7.3).

Builder-specific, still open:

4. **`geoPoint` has no builtin consumer.** The kind, the synthetic picker option and the lat/lng
   fan-out exist for host geo families only; no builtin well accepts it, so it is exercised solely
   through the host `map` example.
5. **The pivot is discovered, not stored, while it is pending.** `pendingPivot` (§3.2) infers a
   held split from "the first unclaimed `query.dimensions` entry". That is unambiguous for the
   builtin families (they have at most one pivot well), but a future family with two pivot-targeted
   wells would need the held field recorded explicitly rather than derived.

---

### Key files

| Concern | File |
|---|---|
| The channel model + the generic interpreter | `src/editor/chart/builder/channels.ts` |
| Well declarations (`target` + `channel`) per family | `src/charts/familyDescriptors.ts` |
| Dispatch (host hook → interpreter) + time-axis guards | `src/editor/chart/builder/wells.ts` |
| Type switching (`migrateToFamily` → `unifyChannels`) | `src/editor/chart/helpers.ts` |
| Fit ranking + preview specs | `src/editor/chart/builder/suggest.ts` |
| The on-chart surface | `src/editor/chart/onchart/ChartEditOverlay.tsx` |
| Slots + the forgiving field picker | `src/editor/chart/onchart/WellGroup.tsx`, `FieldPickerPopover.tsx` |
| Drag-to-reorder a well's fields (+ Alt+↑/↓) | `WellGroup.tsx` owns the drag session; `FieldPill.tsx` is the source |
| Rendering a maybe-bound value safely | `src/editor/chart/binding/variable-binding.ts` (`bindingSummary`) |
| Bucket options that fit the range | `src/variables/granularity-span.ts` |
| Containing a control's crash to that control | `src/editor/primitives/EditorErrorBoundary.tsx` |
| Field availability + the "only compatible" switch | `src/editor/chart/onchart/picker-filter.ts` |
| Type picker + live tile previews | `src/editor/chart/onchart/CenterTypePicker.tsx` |
| Per-family Options (incl. the transform select) | `src/editor/chart/builder/CustomizeSection.tsx` |
| Value-axis unit consistency | `src/editor/chart/builder/axis.ts`, `onchart/picker-filter.ts` |
| Controlled-spec engine (unchanged) | `src/editor/chart/useChartEditorState.ts` |
| Tests | `src/editor/chart/builder/channels.test.ts`, `suggest.test.ts`, `onchart/picker-filter.test.ts` |
