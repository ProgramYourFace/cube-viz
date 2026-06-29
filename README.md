# cube-viz

A focused React library that **renders** and **edits** JSON dashboard / chart specs backed by
[Cube](https://cube.dev). You give it a spec (JSON); it fetches from Cube, normalizes the result,
and draws charts, rich text, and input controls — or hands you an editor that mutates the same
spec. Storage, retrieval, and templating stay the consuming app's concern. The UI is built on
shadcn/ui (Recharts) + Tailwind, with a self-contained `cv:`-prefixed utility stylesheet so it
drops into any host without a Tailwind setup. Web-first; on mobile it embeds into a React
Native / Expo host through a WebView — the entire renderer and editor run inside the WebView.

The spec contract (`@/spec`, exported from the root) is the stable, library-agnostic boundary.
Charts consume a normalized adapter shape, never Cube or Recharts directly, and **chart families
are host-extensible** (see [Extending chart families](#extending-chart-families)).

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

`recharts`, `react-grid-layout`, `@tiptap/*`, `zod`, `@cubejs-client/core`, `lucide-react`,
`date-fns`, and the Radix primitives are **bundled dependencies** (see `package.json`) — you do
not install them yourself.

### Styles

The library ships two stylesheets. Import them once at your app entry:

```ts
import "cube-viz/theme.css";   // CSS custom-property tokens (colors, chart ramp, dark mode)
import "cube-viz/styles.css";  // the self-contained cv:-prefixed utility + component styles
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
| `children` | `React.ReactNode` | **Required.** |

## Built-in chart families

`BUILTIN_CHART_FAMILIES` (the picker order) ships eight families in-box:

`bar` · `line` · `area` · `pie` · `scatter` · `kpi` · `table` · `combo`

> **`map` is *not* built in.** It was removed from the library and is provided by the host as the
> canonical extension example (see [Extending chart families](#extending-chart-families)).

Each family is a pure component `(NormalizedChartData, ChartOptions, ChartConfig) → ReactElement`.
Recharts is confined inside the family components; specs never carry a Recharts prop. The full
options surface per family lives in `BUILTIN_FAMILY_OPTION_SCHEMAS` / `BUILTIN_DEFAULTS`
(exported from the root). `resolveOptions(chartOptions, registry?)` deep-merges a spec's options
over its family defaults (objects recurse; arrays replace wholesale); pass the context registry
(or rely on the builtin-only default) so a host family resolves exactly like a builtin.

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
| `barChartFamily` … `comboChartFamily` | One named export per builtin, to compose a custom `families` list. |
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
  wells: WellDef[];              // typed field slots (top→bottom): { id, label, hint?, cardinality, kinds, optional? }
  zones: { left: string[]; bottom: string[] };  // which wells anchor LEFT (value) vs BOTTOM (category) in the overlay

  // ── behaviour flags ───────────────────────────────────────────────
  dualAxisY: boolean;               // has two renderer value axes (left + right)
  supportsMapping: boolean;         // consumes the generic `mapping` envelope (vs. storing fields in familyOptions)
  supportsCartesianAxes: boolean;   // exposes the cross-family display envelope (orientation/stack/axes)
  enforcesAxisUnit: boolean;        // enforces per-axis unit consistency on the multi-number "y" well
  measureOnly: boolean;             // still renders from a category-less (measure-only) query
  hasLegend: boolean;               // has a chart legend (everything except kpi/table)
  hasCustomizeOptions: boolean;     // shows a type-level "Options" section in the picker
  supportsComparePrevious: boolean; // supports previous-period comparison
  comparePreviousMode?: "series" | "kpiRow"; // HOW prior data merges; undefined ⇔ supportsComparePrevious === false
  sidebarWidthClass: string;        // editor left-strip width class (e.g. "cv:w-40"; KPI uses "cv:w-56")

  // ── host-extensibility hooks (OPTIONAL; builtins leave these unset) ──
  Customize?: React.ComponentType<{ spec: ChartSpec; update: (next: ChartSpec) => void }>;
  placeField?: (spec: ChartSpec, wellId: string, member: string, kind: FieldKind) => ChartSpec;
  removeField?: (spec: ChartSpec, wellId: string, member: string) => ChartSpec;
  readWells?: (spec: ChartSpec) => Record<string, string[]>;
  assignSeriesAxis?: (spec: ChartSpec, member: string, side: "left" | "right") => ChartSpec;
}
```

**The host hooks** (all optional). Builtin families leave these unset and keep their procedural
bodies inside the library (`wells.ts` / `CustomizeSection.tsx`); the editor dispatches to a
descriptor hook **when present, else falls back to its builtin switch**. A host family with its
own field storage must supply them so the editor never needs a builtin arm:

- **`Customize`** — the type-level "Options" panel rendered in the type picker (only consulted
  when `hasCustomizeOptions` is `true`). Receives `{ spec, update }`; call `update(nextSpec)` with
  a full next spec.
- **`placeField(spec, wellId, member, kind)`** — place `member` (of `kind`) into well `wellId`,
  returning a **full** next `ChartSpec`. The editor dispatches a field drop/click here.
- **`removeField(spec, wellId, member)`** — remove `member` from well `wellId`, returning a full
  next spec. The inverse of `placeField`.
- **`readWells(spec)`** — derive each well's current member name(s) from the spec
  (`Record<wellId, string[]>`); the inverse that lets the overlay show what's bound.
- **`assignSeriesAxis(spec, member, side)`** — for a `dualAxisY` family, assign `member` to the
  `"left"`/`"right"` value axis (called after `placeField`). Builtins leave this unset and the
  editor falls back to the builtin `withSeriesAxis` (combo / cartesian `mapping.series` meta), so a
  host with its own field storage must supply it to control dual-axis assignment.

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

// No Recharts envelope; lat/lng are user-picked, so only `mode` is seeded.
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
  if (!fo.lat || !fo.lng) return <Placeholder>Pick a latitude and longitude field</Placeholder>;
  // …project rows → points, render the map (points / paths / heatmap)…
}
```

**`wells.ts`** — typed wells + zones + the place/remove/read writers (each returns a **full**
spec; here bindings are stored as Cube member names in `familyOptions`):

```ts
import type { ChartSpec, FieldKind, WellDef } from "cube-viz";

export const MAP_WELLS: WellDef[] = [
  { id: "lat", label: "Latitude", cardinality: "one", kinds: ["number"] },
  { id: "lng", label: "Longitude", cardinality: "one", kinds: ["number"] },
  { id: "weight", label: "Weight", cardinality: "one", kinds: ["number"], optional: true },
  { id: "series", label: "Split by", cardinality: "one", kinds: ["category"], optional: true },
  { id: "time", label: "Path order", cardinality: "one", kinds: ["time"], optional: true },
];

// A map isn't cartesian — every well anchors LEFT.
export const MAP_ZONES = { left: ["lat", "lng", "weight", "series", "time"], bottom: [] };

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

  dualAxisY: false,
  supportsMapping: false,         // bindings live in familyOptions, not the `mapping` envelope
  supportsCartesianAxes: false,
  enforcesAxisUnit: false,
  measureOnly: false,
  hasLegend: false,
  hasCustomizeOptions: true,
  supportsComparePrevious: false,
  sidebarWidthClass: "cv:w-40",

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

## Breaking changes

### Immutable, injected family registry (semver-major)

The module-global chart-family registry was replaced by an **immutable `FamilyRegistry`** built by
the provider and carried through context. This is a breaking change to the public family-extension
surface:

- **Removed:** the imperative free functions `registerChartFamily`, `familyDescriptor`,
  `getFamilyDescriptor`, `listFamilyDescriptors`, `chartFamilies`, `familyDefaults`,
  `familyOptionsSchema`. There is no module-global `Map` to mutate.
- **Replaced by:** `buildFamilyRegistry(defaults, host?)`, `builtinFamilyRegistry`,
  `defaultChartFamilies`, the per-family named exports (`barChartFamily` … `comboChartFamily`),
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
2. [`02-chart-options.md`](./docs/02-chart-options.md) — the chart-options surface
3. [`03-override-theme-preview.md`](./docs/03-override-theme-preview.md) — theme, overrides, preview
4. [`04-webview-bridge.md`](./docs/04-webview-bridge.md) — the Expo/WebView embed bridge
5. [`05`](./docs) — Chart Builder v3 (the on-chart editing surface)

## Develop

```bash
bun install
bun run dev          # Vite playground at http://localhost:5180
bun run typecheck    # tsc --noEmit
bun run build        # library build (ESM + types) + theme.css
```
