# cube-viz

A focused React library that **renders** and **edits** JSON dashboard / chart specs backed by
[Cube](https://cube.dev). You give it a spec (JSON); it fetches from Cube, normalizes the result,
and draws charts, rich text, and input controls — or hands you an editor that mutates the same
spec. Storage, retrieval, and templating stay the consuming app's concern. Charts render on
[@tanstack/charts](https://tanstack.com/charts) (grammar-of-graphics marks); the UI ships
hand-authored **semantic `cv-`-prefixed CSS** plus theme tokens — no utility framework, no
Tailwind toolchain — so it drops into any host. Web-first; on mobile it embeds into a React
Native / Expo host through a WebView — the entire renderer and editor run inside the WebView.

The spec contract (`@/spec`, exported from the root) is the stable, library-agnostic boundary.
Charts consume a normalized adapter shape, never Cube or TanStack Charts directly, and **chart
families are host-extensible** (see [Extending chart families](#extending-chart-families)).

Three things follow from that boundary and are worth knowing up front:

- **Interaction is semantic, never pixel-shaped.** A brushed range or a clicked mark is reported
  as a Cube member plus an ISO range or a raw dimension value — never scene coordinates. Inside a
  dashboard it also resolves *locally*, against the board's own variables. See
  [Drill & cross-filter](#drill--cross-filter).
- **Presentation transforms live in the view layer.** `chart.transform` gives you a rolling
  average, running total, or % of total without modelling a new Cube measure. See
  [Presentation transforms](#presentation-transforms-charttransform).
- **The editor's field slots are typed by visual channel.** Every builtin well declares *where*
  its field lives in the spec and *which* channel it feeds, which is what makes switching chart
  type lossless and lets the type picker rank and preview families. See
  [The `ChartFamilyDescriptor` contract](#the-chartfamilydescriptor-contract).

## Install

```bash
npm install cube-viz
# or: bun add cube-viz
```

### Peer dependencies

You supply React; everything else ships bundled.

| Peer (you provide) | Range |
| --- | --- |
| `react` | `^18.2.0 || ^19.0.0` |
| `react-dom` | `^18.2.0 || ^19.0.0` |

`@tanstack/charts` (+ `@tanstack/charts-scales`), `d3-scale`/`d3-shape`, `react-grid-layout`,
`@tiptap/*`, `zod`, `@cubejs-client/core`, `lucide-react`, `date-fns`, and the Radix primitives
are **regular dependencies** (see `package.json`) — you do not install them yourself. They are
kept **external** in the library's ESM build (see `vite.config.lib.ts`) so your bundler resolves
and dedupes them from cube-viz's own dependency tree.

### Styles

The library ships two stylesheets. Import them once at your app entry:

```ts
import "cube-viz/theme.css";   // CSS custom-property tokens (colors, chart ramp, dark mode)
import "cube-viz/styles.css";  // self-contained semantic cv- component styles (no utility framework)
```

## Quick start

Wrap your tree in a single `<CubeVizProvider>` and render either a view surface or an editor.

```tsx
import "cube-viz/theme.css";
import "cube-viz/styles.css";
import {
  CubeVizProvider,
  Dashboard,
  DashboardEditor,
  ChartView,
  type DashboardSpec,
} from "cube-viz";

function App({ spec }: { spec: DashboardSpec }) {
  return (
    <CubeVizProvider
      cube={{ endpoint: "https://cube.example.com/cubejs-api/v1", token: cubeJwt }}
      theme={{ mode: "system" }}
      locale={{ unitSystem: "metric" }}
    >
      {/* View */}
      <Dashboard spec={spec} />

      {/* …or edit */}
      {/* <DashboardEditor spec={spec} onChange={handleChange} onSave={handleSave} /> */}
    </CubeVizProvider>
  );
}
```

- **`<Dashboard spec={...} editable={false} />`** — renders a `DashboardSpec` (variables +
  widgets + canonical layout + grid). It reflows to its **container** width (not the viewport)
  and stacks to one column on narrow containers. Pass `editable` to enable drag/resize.
- **`<ChartView spec={...} />`** — renders a standalone `ChartSpec` in the default widget chrome
  (no dashboard / variables).
- **`<DashboardEditor spec={...} onChange={...} onSave={...} />`** — the panel-less, on-chart
  editing surface. The library writes nothing itself: wire `onChange` (debounced; the next spec)
  and `onSave` (re-validated through `DashboardSpecSchema`) to your store. It is intentionally
  history-less — the **host** owns undo/redo and re-seeds `spec` on undo/redo, passing
  `onUndo`/`onRedo`/`canUndo`/`canRedo`/`onDiscard` so the controls live in the one toolbar.
  `<ChartEditor>` (single-chart) is also exported.

### `CubeVizProvider` props

The single config surface. One provider supplies the Cube client, theme, locale, maps config,
the component-override registry, and host chart families.

| Prop | Type | Notes |
| --- | --- | --- |
| `cube` | `CubeClient \| CubeConnection` | **Required.** Either a fully-built `CubeApi` (a `@cubejs-client/core` client) you already constructed, or a `{ endpoint, token }` connection the library turns into one. The token is **host-owned** — the library only forwards it (never mints, stores, persists, or logs credentials). RLS/tenancy stays entirely in your JWT. |
| `theme` | `CubeVizThemeConfig` | `{ chartRamp?: ChartColorToken[]; mode?: "light" \| "dark" \| "system" }`. Token *names* only, never raw colors. `mode` defaults to `"system"` (defers to the host's dark selector). |
| `locale` | `CubeVizLocaleConfig` | `locale` / `timezone` / `unitSystem` (`"metric"`/`"imperial"`) / `formatValue` / `units`. |
| `maps` | `CubeVizMapsConfig` | `{ apiKey?: string; mapId?: string }`. **Forwarded to host map families** (cube-viz has no builtin map). Host-owned; read via `useCubeVizContext().maps`. Absent (or no `apiKey`) ⇒ a map family degrades to a placeholder. |
| `registry` | `ComponentRegistry` | Per-slot component overrides; absent slots fall back to built-ins. See [Component overrides](#component-overrides). |
| `families` | `ChartFamilyDescriptor[]` | Host chart families. Built into an **immutable** `FamilyRegistry` (builtins first, then these augment/override by `descriptor.family`) and carried through context, so they appear in the type picker, are editable, validate, and render. The registry is memoized by the families' **content** (the family keys), so a fresh array literal each render keeps a stable identity. See [Extending chart families](#extending-chart-families). |
| `interactions` | `ChartInteractionHandlers` | App-wide `{ onRangeSelect?, onPointSelect? }`. The **outermost** level of the innermost-wins chain provider → `<Dashboard>` → `<CubeChart>`; every emitted selection names its source widget. Omit it and no chart mounts a brush or a click handler. See [Drill & cross-filter](#drill--cross-filter). |
| `children` | `React.ReactNode` | **Required.** |

## Built-in chart families

`BUILTIN_CHART_FAMILIES` (the picker order) ships eight families in-box:

`bar` · `line` · `area` · `pie` · `scatter` · `heatmap` · `kpi` · `table`

> **`map` is *not* built in.** It was removed from the library and is provided by the host as the
> canonical extension example (see [Extending chart families](#extending-chart-families)).
> **`combo` was removed** in spec v2 (with all dual-axis support); v1 combo specs are migrated to
> `bar`/`line` automatically on load (see `src/spec/migrate.ts`). `heatmap` was added in v2.

Each family is a pure component `(NormalizedChartData, ChartOptions, ChartConfig) → ReactElement`.
TanStack Charts is confined inside the family components (via the shared seam in
`src/charts/tanstack.tsx`); specs never carry a renderer prop. The full
options surface per family lives in `BUILTIN_FAMILY_OPTION_SCHEMAS` / `BUILTIN_DEFAULTS`
(exported from the root). `resolveOptions(chartOptions, registry?)` deep-merges a spec's options
over its family defaults (objects recurse; arrays replace wholesale); pass the context registry
(or rely on the builtin-only default) so a host family resolves exactly like a builtin.

### Temporal axes (line / area)

When a chart's mapped category **is** a time dimension and every bucket parses as a date, line and
area render the x axis on a real d3 `scaleUtc` instead of an evenly-spaced point scale — so buckets
sit at their true elapsed distance and a missing day draws as a **gap** rather than collapsing into
the next bucket. Cube's zone-less bucket strings are anchored as UTC and tick labels are mapped
back to the originating bucket, so labels are byte-identical to before in any viewer timezone —
only the *spacing* changes. Bars and heatmaps keep band scales (a bar needs a bandwidth to be drawn
in). Nothing in a spec turns this on or off; it is inferred from the result annotation. Details in
[`docs/02`](./docs/02-chart-options.md) §2.2.

## Presentation transforms (`chart.transform`)

Cube owns aggregation; the view layer owns presentation. `chart.transform` lets "7-day rolling
average", "running total" and "% of total" be a **display choice** instead of three new Cube
measures:

```ts
chart.transform = { kind: "rollingAvg", window: 7 };  // window: int 2…90, default 7
chart.transform = { kind: "cumulative" };             // window ignored
chart.transform = { kind: "percentOfTotal" };         // window ignored
```

It is an **envelope** option, not a family one: it reshapes the generic
`{ categories, series[].data }` shape and is applied once in `ChartRenderer`, before any family
component sees the data — so every cartesian family gets it and no `familyOptions` schema grew a
knob. It is **purely additive** — it did not move `SCHEMA_VERSION` (it landed on v2 and left
every v2 spec valid), and every existing spec is unaffected.

- **Where it applies:** mapping-driven *cartesian* families — `bar` / `line` / `area`, plus any
  host family declaring both `supportsMapping` and `supportsCartesianAxes` (and not `queryless`).
  `kpi`, `table`, `pie`, `scatter` and `heatmap` are deliberately excluded — a transform reshapes
  values *along* the category axis, and only means something where categories are an ordered,
  shared axis.
- **Gaps stay gaps.** A rolling window skips nulls in both the sum and the count (so a gap does not
  drag the mean toward zero) but averages what exists at the leading edge; a running total keeps
  the total correct across nulls while leaving the output null where the input was; a zero category
  total yields `null` rather than a fake 0%.
- **`percentOfTotal` keeps the unit honest.** Every value surface formats as a percent, and the
  series' `unit`/`quantity`/`convert` meta is dropped (a "42%" suffixed with "km" is a lie). The
  measure label is kept, so axis titles and tooltip labels stay correct.

In the editor this is one **Compare** select in the chart type picker's Options panel, with a
window input revealed only for the rolling average. Full semantics in
[`docs/02`](./docs/02-chart-options.md) §2.9; the schema rationale in
[`docs/01`](./docs/01-spec-schema.md) §3.6.

## Drill & cross-filter

Charts report **what the reader pointed at, in Cube terms** — a member plus either an ISO time
range or a raw dimension value. Never pixels, never renderer points.

```ts
interface RangeSelection { widgetId?: string; member: string; granularity?: Granularity;
                           from: string; to: string; }   // inclusive ISO bucket bounds
interface PointSelection { widgetId?: string; member: string; value: string | number;
                           label: string; }              // raw value + its formatted label

interface ChartInteractionHandlers {
  onRangeSelect?: (selection: RangeSelection | null) => void;  // null = brush cleared
  onPointSelect?: (selection: PointSelection | null) => void;  // null = blank-surface click
}
```

Handlers are optional at three levels and **innermost wins per channel** — a chart overriding only
`onPointSelect` still inherits the dashboard's `onRangeSelect`:

```tsx
// App-wide fallbacks; anything set on <Dashboard> / <CubeChart> below wins per channel.
<CubeVizProvider cube={cube} interactions={{ onPointSelect: trackEverywhere }}>
  <Dashboard
    spec={spec}
    // Supplied here ⇒ this pair serves every widget on the board, and each selection
    // carries the source `widgetId`. (onPointSelect here shadows `trackEverywhere`.)
    onRangeSelect={(sel) => {
      if (!sel) return console.log("range cleared");
      // e.g. { widgetId: "w_trips", member: "trips.start_time",
      //        granularity: "day", from: "2026-07-01", to: "2026-07-14" }
      console.log(`${sel.member} narrowed to ${sel.from} → ${sel.to} (from ${sel.widgetId})`);
    }}
    onPointSelect={(sel) => {
      if (!sel) return console.log("cross-filter cleared");
      // e.g. { member: "trips.device_id", value: "dev-91", label: "Truck 91" }
      console.log(`${sel.member} = ${sel.value} (${sel.label})`);
    }}
  />
</CubeVizProvider>
```

Supply **nothing** and nothing interactive is mounted — no brush, no click handler — so an existing
embed is untouched.

**What emits what.** A chart with a temporal x axis mounts a controlled `brushX`; committing a drag
emits the exact bucket strings Cube produced. Clicking a mark emits the category dimension and its
raw value — or, when the series *are* a colour split, the **split** dimension and that series'
value, because that is the more specific signal (a stacked bar segment, a heatmap cell, one line of
a split chart). A click on the blank surface clears; a click on something the chart cannot name
(a KPI gauge arc, an ungrouped bubble) is ignored rather than reported as a clear.

> **Trade-off, by design:** enabling the brush hands plot pointer events to the D3 overlay, so
> **hover-tooltip inspection gives way to drag-to-select** on that chart (keyboard focus and the
> handles' slider role still work). This is why range selection is opt-in per chart.

**Inside a `<Dashboard>` it also resolves locally.** Before your handler runs, the selection is
written to the dashboard variable the affected widgets **already read**, discovered from the spec —
never guessed:

- brushing a widget whose `timeDimensions[0].dateRange` is `{var: "x"}` sets `x` to `[from, to]`;
- clicking a mark whose member is compared against `{var: "y"}` anywhere in the board's filters
  (the recursive and/or tree is walked in full) sets `y` to `[String(value)]` — the shape a Cube
  `equals` filter wants. A dimension is normally filtered on one variable across a board, so the
  first binding found for that member wins;
- clearing restores the bound variables to their declared defaults.

This happens in the library rather than in your handler because of the mobile embed: the Expo
`'use dom'` host boundary is **async and marshalled**, so routing a drill out to the host and back
would re-filter a frame or more late. Resolving against the local variable store keeps brushing
immediate — and **your handler still fires afterwards**, for persistence, navigation, or telemetry.
A board with no matching binding and no host handler advertises no handler at all, so it never
mounts a brush that would silently do nothing.

`ChartInteractionProvider`, `useChartInteractions`, and all of the types above are exported from the
root; `Dashboard`, `ChartView`, and `CubeChart` each accept the handler pair directly.

## Component overrides

A host can replace any presentational slot by passing a `ComponentRegistry` to
`<CubeVizProvider registry={...}>`. Resolution is always **registry slot → built-in fallback**,
per slot and additive — nothing is all-or-nothing. An override receives the same normalized-data
/ value boundaries the built-ins sit on, so behaviour is identical whether a slot is overridden.

```ts
interface ComponentRegistry {
  /** (a) Whole chart-family components — one slot per family key. */
  charts?: Partial<Record<ChartFamily, ChartComponent>>;
  /** (b) Widget chrome — the frame plus empty/error/loading body states. */
  chrome?: {
    widget?: WidgetChromeComponent;  // wraps every widget (custom header still gets dragHandleProps)
    empty?: StateComponent;          // NormalizedChartData.empty === true
    error?: ErrorStateComponent;     // fetch error (message only — never tenant data)
    loading?: StateComponent;        // while loading
  };
  /** (c) Input controls — one slot per InputControlKind. */
  controls?: Partial<Record<InputControlKind, InputControlComponent>>;
}
```

`resolveChart(registry, family, families)` is the per-slot resolver every renderer uses: it
returns `registry?.charts?.[family]` if present, **else the family's component** from the injected
`families` registry (builtin *or* host). It throws on an unknown family — a spec referencing an
unregistered family is a programming error.

## Extending chart families

**Chart families live in an immutable `FamilyRegistry`** — the runtime single source of truth for
which families exist and how each behaves. There is **no module-global state**: the registry is
built ONCE (from the eight builtins, then host families augment/override by key) and carried
through React context. A host adds an entirely new family (or replaces a builtin) **declaratively**
via the provider's `families` prop.

Because the spec's family discriminator (`ChartFamilySchema`) is an **open string**
(`z.string().min(1)`, not a closed enum), a spec that uses a host family validates and round-trips
through `ChartSpecSchema` / `DashboardSpecSchema` like any other.

### Providing families

The single, declarative entry point is the provider's `families` prop:

```tsx
import { CubeVizProvider } from "cube-viz";
import { mapDescriptor } from "./charts/map";

// The provider builds an immutable registry (builtins + your families) synchronously,
// BEFORE the subtree renders, so the first paint of the type picker / dispatcher sees it.
<CubeVizProvider cube={cube} families={[mapDescriptor]}>{children}</CubeVizProvider>
```

Builtins are seeded first, then your `families` **augment or override by `descriptor.family`** (a
host family reusing a builtin key replaces it wholesale). The registry is memoized by the families'
**content** (the family keys), so passing a fresh `families={[mapDescriptor]}` literal each render
does not churn its identity. A spec referencing a family not provided this way throws (the
registry's `require()` is the single dispatch point) — so include every family your specs use.

Per-component overrides are available too: `Dashboard`, `ChartView`, and `DashboardEditor` each
take an optional `families?` prop that augments the provider's registry **for that subtree only**
(the rest of the context — Cube client, theme, locale, maps — is inherited unchanged).

### Building a registry directly

For tests or non-React callers, build one explicitly:

```ts
import { buildFamilyRegistry, defaultChartFamilies, builtinFamilyRegistry } from "cube-viz";

const registry = buildFamilyRegistry(defaultChartFamilies, [mapDescriptor]);
registry.require("map").component;   // throws on an unknown family
registry.families();                  // all keys, in picker order
// `builtinFamilyRegistry` is a pre-built builtin-only registry (the back-compat default).
```

### Registry API

All exported from the root:

| Export | Purpose |
| --- | --- |
| `buildFamilyRegistry(defaults, host?)` | Build an immutable `FamilyRegistry` (seed `defaults`, then `host` augments/overrides by key). |
| `builtinFamilyRegistry` | A pre-built registry over the builtins only (the back-compat default). |
| `defaultChartFamilies` | The ordered builtin descriptor array — the picker's default order. |
| `barChartFamily` … `tableChartFamily` | One named export per builtin (incl. `heatmapChartFamily`), to compose a custom `families` list. |
| `useFamilyRegistry()` | The context registry (builtins + the provider's `families`), for component call sites. |
| `resolveOptions(options, registry?)` | Deep-merge a chart's options over its family's defaults (defaults to builtin-only). |

The `FamilyRegistry` value exposes `get(family)` (non-throwing), `require(family)` (the throwing
dispatch point), `list()` (descriptors, order-sorted), `families()` (keys, in picker order),
`defaults(family)`, `optionsSchema(family)`, and `resolveOptions(options)`.

### The `ChartFamilyDescriptor` contract

A descriptor centralizes everything that previously lived in ~10 scattered tables/switches: the
picker tile, the dispatch component, the option schema + defaults, the editor wells/zones, and the
behaviour flags. A host-registered family is **self-contained** — it supplies its own
field-placement logic and customize UI through the optional hooks, so the editor never needs a
builtin `switch` arm for it.

**Field placement is data too.** Every builtin well declares a `target` (where its member lives in
the spec) and a `channel` (which visual role it feeds); one generic interpreter
(`src/editor/chart/builder/channels.ts`) reads and writes every builtin family from those two
facts. A host family may do the same and skip the hooks entirely.

```ts
interface ChartFamilyDescriptor {
  // ── identity / picker ──────────────────────────────────────────────
  family: ChartFamily;   // the family key (the discriminator)
  label: string;         // human label (type-picker tiles + chart-type pill)
  icon: LucideIcon;      // the tile / pill icon
  order: number;         // UI ordering in the picker grid (ascending)

  // ── dispatch / validation ─────────────────────────────────────────
  component: ChartComponent;     // the family component (overridable per-slot via ComponentRegistry)
  optionsSchema: z.ZodTypeAny;   // validates this family's familyOptions (after default-merge)
  defaults: FamilyDefault;       // { envelope: Partial<ChartOptions>; familyOptions: Record<string, unknown> }

  // ── editor wells ──────────────────────────────────────────────────
  wells: WellDef[];              // typed field slots, top→bottom (see WellDef below)
  zones: { left: string[]; bottom: string[] };  // which wells anchor LEFT (value) vs BOTTOM (category) in the overlay

  // ── behaviour flags ───────────────────────────────────────────────
  supportsMapping: boolean;         // consumes the generic `mapping` envelope (vs. storing fields in familyOptions)
  supportsCartesianAxes: boolean;   // exposes the cross-family display envelope (orientation/stack/axes)
  enforcesAxisUnit: boolean;        // enforces per-axis unit consistency on the multi-number "y" well
  measureOnly: boolean;             // still renders from a category-less (measure-only) query
  hasLegend: boolean;               // has a chart legend (everything except kpi/table/heatmap)
  hasCustomizeOptions: boolean;     // shows a type-level "Options" section in the picker
  supportsComparePrevious: boolean; // supports previous-period comparison
  comparePreviousMode?: "series" | "kpiRow"; // HOW prior data merges; undefined ⇔ supportsComparePrevious === false
  sidebarWidthClass: string;        // editor left-strip width class ("cv-sidebar--default"; KPI uses "cv-sidebar--wide")
  requiresMeasure?: boolean;        // false for dimension-only families such as a point map
  canonicalTimeWell?: string;       // well auto-filled with the cube's canonical time dim (meta `canonicalTime: true`)
                                    // when empty and a field lands (builtins: line/area → "x")

  // ── host-extensibility hooks (OPTIONAL; builtins leave these unset) ──
  Customize?: React.ComponentType<{ spec: ChartSpec; update: (next: ChartSpec) => void }>;
  placeField?: (spec: ChartSpec, wellId: string, member: string, kind: FieldKind) => ChartSpec;
  removeField?: (spec: ChartSpec, wellId: string, member: string) => ChartSpec;
  readWells?: (spec: ChartSpec) => Record<string, string[]>;
}
```

#### `WellDef` — a typed field slot

```ts
type FieldKind = "number" | "category" | "time" | "numberDimension" | "geoPoint";
type Channel   = "x" | "y" | "color" | "size" | "row" | "detail";

type WellTarget =
  | { kind: "category" }                 // mapping.category.member (+ the query dim/timeDim)
  | { kind: "measures" }                 // the mapped measure list + query.measures
  | { kind: "pivot" }                    // mapping.series.pivot — the splitting dimension
  | { kind: "option"; key: string }      // familyOptions[key] = member
  | { kind: "optionList"; key: string }; // familyOptions[key] = [{ member }, …]

interface WellDef {
  id: string;
  label: string;
  hint?: string;
  cardinality: "one" | "many";
  kinds: FieldKind[];      // which field kinds may be dropped here
  optional?: boolean;      // renders a muted "(optional)" affordance
  target?: WellTarget;     // WHERE the member lives. ABSENT ⇒ host-managed (hooks below)
  channel?: Channel;       // WHICH visual role it feeds. Absent ⇒ excluded from type switching
}
```

`WellDef`, `FieldKind`, `WellTarget` and `Channel` are exported from the root.

**Why the two extra fields matter.** Declaring both opts a well into the generic interpreter, and
the family gets, for free:

- **read / place / remove** — no `readWells`/`placeField`/`removeField` hook needed;
- **lossless type switching** — swapping chart type re-places fields by matching **channel**
  (x→x, y→y, colour→colour), so a field keeps its meaning across families rather than being
  re-derived from the raw query;
- **fit ranking + live tile previews** — the type picker scores each family's channel signature
  against the fields already placed, and previews each tile with the user's own data.

Builtin examples: bar/line/area share `y` (`{kind:"measures"}`, channel `y`), `x`
(`{kind:"category"}`, channel `x`) and `color` (`{kind:"pivot"}`, channel `color`); scatter's axes
are `{kind:"option", key:"x"|"y"}`; a table's columns are
`{kind:"optionList", key:"columns"}` on the `detail` channel. The full family → well →
target/channel table is in [`docs/05`](./docs/05-chart-builder-design.md) §2.3.

**The host hooks** (all optional). A well with **no `target`** is host-managed: the editor
dispatches to the descriptor hook when present, else to the channel interpreter. A family may
**mix** the two — declare targets on the wells the interpreter can service and a *partial*
`readWells` for the rest (the host's output wins for the wells it returns):

- **`Customize`** — the type-level "Options" panel rendered in the type picker (only consulted
  when `hasCustomizeOptions` is `true`). Receives `{ spec, update }`; call `update(nextSpec)` with
  a full next spec.
- **`placeField(spec, wellId, member, kind)`** — place `member` (of `kind`) into well `wellId`,
  returning a **full** next `ChartSpec`. The editor dispatches a field drop/click here.
- **`removeField(spec, wellId, member)`** — remove `member` from well `wellId`, returning a full
  next spec. The inverse of `placeField`.
- **`readWells(spec)`** — derive each well's current member name(s) from the spec
  (`Record<wellId, string[]>`); the inverse that lets the overlay show what's bound.

### The `ChartComponentProps` a family component receives

Every family is a pure component — it gets already-fetched, already-normalized data plus the
resolved options. It **never** fetches and **never** sees a Cube `ResultSet`.

```ts
interface ChartComponentProps {
  data: NormalizedChartData;   // already-fetched, normalized adapter output (rows under data.raw.rows)
  options: ChartOptions;       // resolved (envelope + familyOptions, defaults merged)
  config: ChartConfig;         // shadcn ChartConfig derived from data.series (key → { label, color })
  format: ChartFormat;         // member-aware value formatter: format.value(v, member, role) / format.category(v)
  state?: { loading?: boolean; error?: Error };  // optional fetch state — render your own loading/error chrome
  editing?: boolean;           // true inside the on-chart editor (render hidden chrome greyed, not removed)
  updateFamilyOptions?: (patch: Record<string, unknown>) => void;
                               // editor-only familyOptions write-back (undefined in view mode) —
                               // lets a family render inline config on the chart itself (e.g. a
                               // query-less AI tile's prompt pane) instead of the Options popover
}
```

### Worked example: a host `map` family

The canonical extension (drawn from the real host app). A `map` family is self-contained: its own
component, option schema + defaults, wells/zones, `Customize`, and place/remove/read writers — so
cube-viz's editor never needs a builtin arm. Field bindings live in `familyOptions` (a map isn't
cartesian), so `supportsMapping` / `supportsCartesianAxes` are `false`. Trimmed code:

**`schema.ts`** — the option schema + total defaults:

```ts
import { z } from "zod";
import type { FamilyDefault } from "cube-viz";

const MemberSchema = z.string().min(1);

export const MapFamilyOptionsSchema = z
  .object({
    mode: z.enum(["points", "paths", "heatmap"]).default("points"),
    lat: MemberSchema.optional(),
    lng: MemberSchema.optional(),
    weight: MemberSchema.optional(),
    series: MemberSchema.optional(),
    time: MemberSchema.optional(),
    zoom: z.number().optional(),
    heatmapRadius: z.number().optional(),
  })
  .strict();
export type MapFamilyOptions = z.infer<typeof MapFamilyOptionsSchema>;

// No cartesian envelope; lat/lng are user-picked, so only `mode` is seeded.
export const MAP_FAMILY_DEFAULT: FamilyDefault = {
  envelope: {},
  familyOptions: { mode: "points" } satisfies MapFamilyOptions,
};
```

**`MapChart.tsx`** — the family component:

```tsx
import { useCubeVizContext, type ChartComponentProps } from "cube-viz";
import type { MapFamilyOptions } from "./schema";

export function MapChartFamily({ data, options }: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as MapFamilyOptions;
  const { maps } = useCubeVizContext();      // host Google Maps key/mapId (forwarded from provider `maps`)
  const rows = data.raw.rows;                // already-normalized adapter rows

  if (!maps?.apiKey) return <Placeholder>Add a Google Maps API key</Placeholder>;
  if (!fo.lat || !fo.lng) return <Placeholder>Pick a Location field</Placeholder>;
  // …project rows → points, render the map (points / paths / heatmap)…
}
```

**`wells.ts`** — typed wells + zones + the place/remove/read writers (each returns a **full**
spec; here bindings are stored as Cube member names in `familyOptions`):

```ts
import type { ChartSpec, FieldKind, WellDef } from "cube-viz";

// `geoPoint` offers one synthetic field for a model-authored latitude/longitude pair.
// The editor fans it out to the hidden lat/lng wells, preserving the stored shape.
//
// These wells declare NO `target`, so they are host-managed: the place/remove/read hooks
// below own them. A host whose fields map cleanly onto the spec could instead declare
// `target` + `channel` per well (e.g. `{ target: { kind: "option", key: "weight" },
// channel: "size" }`) and drop the three hooks entirely — see the WellDef section above.
export const MAP_WELLS: WellDef[] = [
  { id: "location", label: "Location", cardinality: "one", kinds: ["geoPoint"] },
  { id: "lat", label: "Latitude", cardinality: "one", kinds: ["numberDimension"] }, // internal
  { id: "lng", label: "Longitude", cardinality: "one", kinds: ["numberDimension"] }, // internal
  { id: "weight", label: "Weight", cardinality: "one", kinds: ["number", "numberDimension"], optional: true },
  { id: "series", label: "Split by", cardinality: "one", kinds: ["category"], optional: true },
  { id: "time", label: "Path order", cardinality: "one", kinds: ["time"], optional: true },
];

// A map isn't cartesian — every well anchors LEFT.
export const MAP_ZONES = { left: ["location", "weight", "series", "time"], bottom: [] };

export function placeMap(spec: ChartSpec, wellId: string, member: string, _kind: FieldKind): ChartSpec {
  const fo = { ...(spec.chart.familyOptions ?? {}) };
  fo[wellId] = member;                       // + bind member into spec.query (measure/dimension/timeDimension)
  return { ...spec, chart: { ...spec.chart, familyOptions: fo } };
}

export function removeMap(spec: ChartSpec, wellId: string, _member: string): ChartSpec {
  const fo = { ...(spec.chart.familyOptions ?? {}) };
  delete fo[wellId];                         // + unbind from spec.query
  return { ...spec, chart: { ...spec.chart, familyOptions: fo } };
}

export function readMapWells(spec: ChartSpec): Record<string, string[]> {
  const fo = (spec.chart.familyOptions ?? {}) as Record<string, unknown>;
  const one = (m: unknown): string[] => (m ? [m as string] : []);
  return { lat: one(fo.lat), lng: one(fo.lng), weight: one(fo.weight), series: one(fo.series), time: one(fo.time) };
}
```

**`Customize.tsx`** — the type-level Options panel (`hasCustomizeOptions: true`):

```tsx
import type { ChartSpec } from "cube-viz";

export function MapCustomize({ spec, update }: { spec: ChartSpec; update: (next: ChartSpec) => void }) {
  const fo = (spec.chart.familyOptions ?? {}) as Record<string, unknown>;
  const set = (patch: Record<string, unknown>) =>
    update({ ...spec, chart: { ...spec.chart, familyOptions: { ...fo, ...patch } } });
  // …a Mode segmented control (Points / Paths / Heatmap) + a heatmap-radius input…
}
```

**`descriptor.ts`** — assemble the descriptor:

```ts
import { MapPin } from "lucide-react";
import type { ChartFamilyDescriptor } from "cube-viz";
import { MapChartFamily } from "./MapChart";
import { MapCustomize } from "./Customize";
import { MapFamilyOptionsSchema, MAP_FAMILY_DEFAULT } from "./schema";
import { MAP_WELLS, MAP_ZONES, placeMap, removeMap, readMapWells } from "./wells";

export const mapDescriptor: ChartFamilyDescriptor = {
  family: "map",
  label: "Map",
  icon: MapPin,
  order: 8,                       // after the eight builtins (0..7), so it sorts last

  component: MapChartFamily,
  optionsSchema: MapFamilyOptionsSchema as unknown as ChartFamilyDescriptor["optionsSchema"],
  defaults: MAP_FAMILY_DEFAULT,

  wells: MAP_WELLS,
  zones: MAP_ZONES,

  supportsMapping: false,         // bindings live in familyOptions, not the `mapping` envelope
  supportsCartesianAxes: false,
  enforcesAxisUnit: false,
  measureOnly: false,
  hasLegend: false,
  hasCustomizeOptions: true,
  supportsComparePrevious: false,
  sidebarWidthClass: "cv-sidebar--default",

  // Host hooks — the editor dispatches to these for the map family:
  Customize: MapCustomize,
  placeField: placeMap,
  removeField: removeMap,
  readWells: readMapWells,
};
```

> **Note on cross-version zod.** If your app pins a different `zod` major than cube-viz bundles,
> cast `optionsSchema` as above. cube-viz only *stores* the schema (it validates specs through the
> loose envelope `familyOptions: z.record(...)`), so it is never `.parse()`d across the boundary.

**Provide, then render:**

```tsx
import { CubeVizProvider, Dashboard } from "cube-viz";
import { mapDescriptor } from "./charts/map";

export function App({ spec, cube }) {
  return (
    <CubeVizProvider
      cube={cube}
      maps={{ apiKey: process.env.GOOGLE_API_KEY, mapId: "…" }}  // forwarded to the map family
      families={[mapDescriptor]}                                  // the sole, declarative mechanism
    >
      <Dashboard spec={spec} />
    </CubeVizProvider>
  );
}
```

## Field picker member grouping

The editor's field pickers (the well/axis `FieldPickerPopover` and the `MemberPicker`)
group a cube's members into intuitive, **authored sections** instead of one long flat
list. Tag any dimension/measure with a `meta.group` in your Cube model and the picker
renders members under that label (case-insensitive; members without a group fall back to
their data-type bucket — Numbers / Categories / Dates):

```yaml
measures:
  - name: idle_fuel
    type: sum
    sql: idleFuel
    title: Idle Fuel
    meta:
      group: Fuel        # ← renders under a "Fuel" section in the picker
```

`meta.group` is read verbatim from `/v1/meta`, so no library wiring is needed — it works
the moment your model exposes it. Pair with `public: false` to hide internal/RLS members
from the picker entirely while keeping them available for joins and row-level security.

## Breaking changes

### Spec v2 + TanStack Charts renderer (semver-major)

- **Recharts was replaced by `@tanstack/charts` 0.9.** The `(NormalizedChartData, ChartOptions)`
  family seam is unchanged; specs are renderer-agnostic as designed. Legend, tooltip, and motion
  now come from TanStack built-ins: legend placement is **top/bottom only** (`left`/`right`
  degrade to `bottom` — and pie now renders its legend correctly), tooltips are interactive and
  **pinnable via click**, and charts animate with spring motion. Brush/zoom becomes possible
  future work on this stack.
- **Line shape became a chart-level option** in `SCHEMA_VERSION` 5: `familyOptions.curve` on
  `line`/`area`, replacing per-series `mapping.series.meta[member].curve`. Per-series could not
  be honored where it mattered — a stacked or 100% area draws a whole stack from one mark, and a
  color-split chart has no per-measure meta for a picker to write to — so the control silently
  did nothing in the two arrangements people reach for it in. `loadSpec` promotes the first
  series' stored curve. Per-series `dots` stayed (a dot is its own mark, one per series).
- **The `combo` family and all dual-axis support were removed** in `SCHEMA_VERSION` 2:
  `axes.y2`, per-series `meta.axis: "left"|"right"`, reference-line `side`, and the descriptor's
  `dualAxisY`/`assignSeriesAxis` are gone. `loadSpec` migrates v1 specs automatically — a combo
  widget becomes `bar` (if any series rendered bars) or `line`, and axis metadata is stripped.
- **A new `heatmap` family was added** (two dimensions × one measure; see the family list above).
- **The Tailwind toolchain and the `cv:` utility stylesheet were removed.** `cube-viz/styles.css`
  is now hand-authored semantic `cv-` CSS; hosts bring their own CSS setup — nothing to configure.

### Immutable, injected family registry (semver-major)

The module-global chart-family registry was replaced by an **immutable `FamilyRegistry`** built by
the provider and carried through context. This is a breaking change to the public family-extension
surface:

- **Removed:** the imperative free functions `registerChartFamily`, `familyDescriptor`,
  `getFamilyDescriptor`, `listFamilyDescriptors`, `chartFamilies`, `familyDefaults`,
  `familyOptionsSchema`. There is no module-global `Map` to mutate.
- **Replaced by:** `buildFamilyRegistry(defaults, host?)`, `builtinFamilyRegistry`,
  `defaultChartFamilies`, the per-family named exports (`barChartFamily` … `tableChartFamily`),
  `useFamilyRegistry()`, and the `FamilyRegistry` value's methods
  (`get`/`require`/`list`/`families`/`defaults`/`optionsSchema`/`resolveOptions`).
- **Migration:** drop any `registerChartFamily(...)` call — pass `families={[...]}` to
  `CubeVizProvider` instead (it is now the sole, declarative mechanism). Replace
  `familyDescriptor(family)` with `useFamilyRegistry().require(family)` in components, or thread a
  `FamilyRegistry` param into pure helpers. `resolveOptions(options)` still works (it defaults to a
  builtin-only registry); pass the context registry to resolve host families.
- **Signature changes:** `resolveChart(registry, family, families)`,
  `normalize(..., families?)`, and `comparePreviousInput(query, chart, families?)` take the
  registry (the latter two default to builtin-only for back-compat).

### Earlier breaking changes

- **`ChartFamily` is now an open string**, not a closed enum (`ChartFamilySchema = z.string().min(1)`).
  Specs that reference a host family validate and round-trip.
- **The built-in `map` family was removed.** It now ships as the host-extension example above;
  bring it back by providing a `map` descriptor via `families`.
- **`@vis.gl/react-google-maps` is no longer a peer dependency** — map rendering moved to the host,
  so the host owns that dependency.

## Design docs

The full design record lives in [`docs/`](./docs):

1. [`01-spec-schema.md`](./docs/01-spec-schema.md) — the spec contract + variable binding
   (`chart.transform` in §3.6)
2. [`02-chart-options.md`](./docs/02-chart-options.md) — the chart-options surface: presentation
   transforms (§2.9), temporal axes (§2.2), the semantic interaction seam (§3.1), and the
   **open questions / known gaps** (§7)
3. [`03-override-theme-preview.md`](./docs/03-override-theme-preview.md) — theme, overrides, preview
4. [`04-webview-bridge.md`](./docs/04-webview-bridge.md) — the Expo/WebView embed bridge
5. [`05-chart-builder-design.md`](./docs/05-chart-builder-design.md) — Chart Builder **v4**: the
   on-chart editing surface and the channel-typed well model

## Develop

```bash
bun install
bun run dev          # Vite playground at http://localhost:5180
bun run typecheck    # tsc --noEmit
bun run test         # vitest (spec migrations, adapter, transforms, editor helpers)
bun run build        # library build (ESM + types) + theme.css
```

### Checks that need a browser

These drive a real Chromium over the Vite playground and its offline Cube mock. They
are **local-only** — the Screenshots workflow that ran them on every push was removed
(2026-08-13) because a per-PR Chromium install to produce PNG artifacts nobody opened
was not worth the minutes. Run them yourself after touching a chart family, the type
picker, or the editor's wells:

```bash
PW_EXECUTABLE_PATH=/opt/pw-browsers/chromium bun run shots
PW_EXECUTABLE_PATH=/opt/pw-browsers/chromium bun run verify:type-picker
```

`bun run shots` is not only pictures — it fails on any page error, and carries four
assertions no screenshot can make: that a line shape reaches the marks on a color-split
chart, that both drag and Alt+↑/↓ reorder a well, that "Only compatible fields" hides
the same rows in every slot, and that a variable-bound KPI renders at all (the
regression that used to take a whole dashboard down). `verify:type-picker` asserts each
picker tile drew the chart type it is a picture of.

**cube-viz has no PR CI.** The only workflow left is `release.yml`, which builds and
tags on a push to master — so a build break is caught there, but typecheck and the unit
tests run *nowhere* automatically. Run `bun run typecheck && bun run test` before you
push.
