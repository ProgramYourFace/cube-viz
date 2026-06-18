I'll produce the design section directly. This is a writing task and I have everything I need from the brief and research findings.

# cube-viz — Part A: Theme + Component-Override Surface · Part B: Preview Server

> Companion to the **Spec Schema & Variable Binding** contract. Where that document defines the *data* (`Spec`, `CubeQuery`, `VariableDecl`, `NormalizedChartData`), this one defines the *runtime surface*: how a host app injects its Cube client and theme, how a consumer overrides or replaces any piece of the rendering stack without forking, the editor UX, and the Bun preview server that doubles as a dev harness for consuming projects.

---

# PART A — Theme + Component-Override Surface

## A1. Theme: adopt aa-app's shadcn tokens verbatim

### A1.1 The token set (copied exactly, no renames)

cube-viz uses the **same `--color-*` CSS custom property names** that aa-app's `global.css` already defines. There is no cube-viz-specific token namespace — a host that already themed shadcn/ui has nothing to do.

**Core semantic tokens (28):**

```
--color-background            --color-foreground
--color-card                  --color-card-foreground
--color-popover               --color-popover-foreground
--color-primary               --color-primary-foreground
--color-secondary             --color-secondary-foreground
--color-muted                 --color-muted-foreground
--color-accent                --color-accent-foreground
--color-destructive           --color-destructive-foreground
--color-border
--color-input
--color-ring
--color-sidebar               --color-sidebar-foreground
--color-sidebar-primary       --color-sidebar-primary-foreground
--color-sidebar-accent        --color-sidebar-accent-foreground
--color-sidebar-border        --color-sidebar-ring
```

**Radius / spacing:**

```
--radius        (10px in aa-app)   --radius-sm = calc(radius - 4px)
--radius-md = calc(radius - 2px)   --radius-lg = radius
--radius-xl = calc(radius + 4px)
```

**Chart / series tokens (the only chromatic tokens) — 5:**

```
--chart-1   --chart-2   --chart-3   --chart-4   --chart-5
```

These are the **series color ramp**. cube-viz deliberately mirrors the shadcn 5-token set already present in aa-app rather than inventing Embeddable's 10-token `--em-sem-chart-color--1..10` ramp; the spec's `ChartColorToken` type (`"chart-1".."chart-5"`) is exactly this set, and the ramp **cycles** (series 6 → `chart-1`) when a chart has more series than tokens.

### A1.2 Why a consumer's existing `:root` / `.dark` tokens "just work"

cube-viz **reads** these CSS variables; it never **defines** them as a hard dependency. Resolution is pure CSS cascade:

- Every cube-viz DOM node lives under the host's themed root, so `bg-background`, `text-muted-foreground`, `border-border`, `var(--chart-1)` etc. resolve against whatever the host already set on `:root` (light) and its dark selector.
- **The one porting gotcha (documented in research):** aa-app uses Tailwind v4 / uniwind `@variant light` / `@variant dark` selectors, *not* a `.dark` class block. A stock shadcn web host toggles `.dark` on `<html>`. cube-viz must therefore support **both** dark-mode conventions. It does this by *not assuming either*: the library ships **no** dark selector of its own. It only ships an **optional fallback stylesheet** (`cube-viz/theme.css`) carrying the aa-app OKLCH values under *both* a `@variant dark` block **and** a `.dark {}` block (same values), so:
  - A host with its own tokens imports nothing — its cascade wins.
  - A host with *no* shadcn theme can `@import "cube-viz/theme.css"` to get a complete, working default in either dark convention.

- **OKLCH is the source of truth.** The fallback stylesheet copies aa-app's `global.css` OKLCH values verbatim (e.g. `--color-background: oklch(1 0 0)`, `--color-destructive: oklch(0.577 0.245 27.325)`, dark `--color-border: oklch(1 0 0 / 10%)` preserving alpha). The divergent HSL mirror in `lib/theme.ts` is **not** used — that exists only for React Navigation, which cube-viz (web) does not touch.

### A1.3 Mapping series colors → chart tokens (Recharts 3 form)

The adapter assigns each `NormalizedSeries` a `colorToken` (`ColorAssignment.byKey` → else round-robin over `ramp ?? ["chart-1".."chart-5"]`). The renderer then bridges into shadcn's `ChartConfig` so colors and labels flow through shadcn's `--color-<key>` mechanism automatically:

```ts
// renderer-internal: NormalizedSeries[] → shadcn ChartConfig
function toChartConfig(series: NormalizedSeries[]): ChartConfig {
  return Object.fromEntries(
    series.map((s) => [
      s.key,
      { label: s.label, color: `var(--${s.colorToken ?? "chart-1"})` }, // Recharts 3: var(), NOT hsl(var())
    ]),
  );
}
```

- **Recharts 3 rule:** reference tokens as `var(--chart-1)`, never the Recharts-2 `hsl(var(--chart-1))` wrapping.
- **Per-datum families (pie/donut/radial):** color goes on each **data row** (`fill: "var(--color-<key>)"`), not on the series element — the renderer handles this per family.
- `ChartContainer` always gets an explicit height class (`min-h-[...]` / `aspect-*`) so Recharts' `ResponsiveContainer` can measure on first paint.

### A1.4 `<CubeVizProvider>` — the single config surface

One context provider supplies everything the host injects. **The library never mints, stores, persists, or logs credentials** — it only forwards a token the host already has.

```tsx
import { CubeVizProvider } from "cube-viz";

<CubeVizProvider
  cube={cubeClient}            // host-supplied; see below
  theme={themeConfig}          // optional token/ramp overrides
  locale={localeConfig}        // formatting / unit system / tz
  registry={componentRegistry} // overrides (A2)
>
  {children}
</CubeVizProvider>
```

```ts
interface CubeVizConfig {
  /** Cube access — host injects a ready client OR a thunk. The library NEVER
      constructs creds; it forwards the token the host already holds. */
  cube: CubeApi | CubeConnection;

  theme?: {
    /** Override the default series ramp order/contents (still token *names*,
        never raw colors). */
    chartRamp?: ChartColorToken[];
    /** Force a mode; default "system" reads the host's existing dark selector. */
    mode?: "light" | "dark" | "system";
  };

  locale?: {
    locale?: string;                       // "en-US"
    timezone?: string;                     // IANA; default query/host tz
    unitSystem?: "metric" | "imperial";    // drives Cube meta.convert
    /** Central behavioral formatter override (the Embeddable lesson:
        format intelligence is DRY, defined once, not per chart). */
    formatValue?: (value: number, meta: MemberFormatMeta) => string;
  };

  registry?: ComponentRegistry;            // A2
}

/** Two ways to supply Cube. Either a fully-built @cubejs-client/core CubeApi,
    or a thin connection the library turns into one (still no secret minting:
    `token` is a value or an async getter the HOST owns). */
type CubeConnection = {
  apiUrl: string;                          // MUST include /cubejs-api/v1
  token: string | (() => Promise<string>); // async form ⇒ per-request JWT refresh
  headers?: Record<string, string>;
};
```

**Cube client construction (when given a `CubeConnection`):**

```ts
import cube from "@cubejs-client/core";
const api = cube(
  typeof token === "function" ? async () => token() : token, // async form refreshes JWTs
  { apiUrl }, // raw JWT in Authorization (no "Bearer "); SDK owns "Continue wait" polling
);
```

**Credential discipline (non-negotiable):**

- The token lives only in memory for the provider's lifetime. cube-viz never writes it to storage, never serializes it into a spec, never includes it in error messages or telemetry.
- RLS/tenancy is **entirely** in the host's JWT `securityContext.{systemIds, roles}`. cube-viz forwards the token unmodified; no spec field and no provider option can widen tenant scope.
- The preview server (Part B) handles its own in-UI token entry the same way — memory-only.

---

## A2. Override model (inspired by Embeddable, not a copy)

Embeddable's lesson, adapted: **the override seam is a wrapper/registry, not subclassing**, and it touches three points — *controls* (what's configurable), *props* (transform/inject), *render* (wrap/replace). cube-viz collapses Embeddable's "exclude + re-wrap a vendor component" mechanism into a single **component registry** keyed by stable slot names, plus exported **decorator helpers** and a **headless hooks layer**. Crucially, cube-viz inverts Embeddable's per-variant explosion: there is **one slot per chart family** (`chart:bar`), configured by `ChartOptions`, not six bar slots.

### A2.1 The registry shape

```ts
interface ComponentRegistry {
  /** (a) Whole chart-family components — one slot per family. */
  charts?: Partial<Record<ChartFamily, ChartComponent>>;

  /** (b) Widget chrome (the frame around a widget: header, menu, empty/error/loading). */
  chrome?: {
    widget?: WidgetChromeComponent;     // wraps every widget
    empty?: StateComponent;             // NormalizedChartData.empty === true
    error?: ErrorStateComponent;
    loading?: StateComponent;
  };

  /** (c) Input controls — one slot per control kind from InputControl. */
  controls?: Partial<Record<InputControlKind, InputControlComponent>>;

  /** Optional: central value formatter override (same effect as locale.formatValue,
      registry form for symmetry). */
  formatters?: Partial<Record<FormatKind, ValueFormatter>>;
}

type InputControlKind =
  | "dateRange" | "granularity" | "select" | "memberSelect"
  | "text" | "number" | "toggle";
```

Resolution is **registry → built-in fallback** per slot. A host overriding `charts.bar` leaves every other family on the built-in; nothing is all-or-nothing. This is the spiritual equivalent of Embeddable's `exclude` list, but additive and per-slot instead of fork-and-shadow.

### A2.2 (a) Replace or extend a whole chart family

Every chart component — built-in or override — receives the **same stable props** (the abstraction boundary is `NormalizedChartData` + `ChartOptions`, never a Cube `ResultSet`):

```ts
interface ChartComponentProps {
  data: NormalizedChartData;     // already fetched + normalized (categories/series/raw/empty)
  options: ChartOptions;         // family, mapping, stackMode, orientation, axes, format, colors
  config: ChartConfig;           // derived shadcn config (labels + var(--chart-N))
  state: { loading: boolean; error?: Error };
  theme: ResolvedTheme;          // resolved token values if a non-CSS renderer is needed
}
type ChartComponent = React.ComponentType<ChartComponentProps>;
```

**Replace** — drop in a totally custom bar implementation:

```tsx
const registry: ComponentRegistry = {
  charts: {
    bar: function MyBar({ data, options }) {
      return <MyFancyBars series={data.series} categories={data.categories} />;
    },
  },
};
```

**Extend (decorator HOC)** — wrap the built-in, adapting Embeddable's `withUnits(base)` pattern. cube-viz exports `defineChart` / `withChart` so a consumer decorates rather than reimplements:

```tsx
import { builtins, withChart } from "cube-viz";

// add a "target line" annotation on top of the built-in bar, leave everything else intact
const BarWithTarget = withChart(builtins.charts.bar, {
  wrapRender: (Base) => (props) => (
    <div className="relative">
      <Base {...props} />
      <TargetLineOverlay value={props.options.familyOptions?.target} />
    </div>
  ),
  // optionally inject/transform props before the base sees them:
  mapProps: (props) => ({ ...props, options: tweak(props.options) }),
});

const registry = { charts: { bar: BarWithTarget } };
```

`withChart(base, { mapProps?, wrapRender? })` mirrors Embeddable's three seams compressed to two practical ones for a pre-normalized component: **`mapProps`** (transform/inject — Embeddable's `config.props`) and **`wrapRender`** (wrap the render — Embeddable's `Component`). The "add controls" seam (Embeddable's `meta.inputs`) lives in the spec's `ChartOptions.familyOptions` instead, owned by the chart-options layer — so adding a knob is a schema change, not a registry change.

### A2.3 (b) Replace widget chrome

Chrome is the frame: title bar, overflow menu (export CSV/XLSX), drag handle affordance, and the empty/error/loading states. Overriding it restyles every widget at once:

```tsx
const registry: ComponentRegistry = {
  chrome: {
    widget: function Chrome({ title, menu, dragHandleProps, children }) {
      return (
        <Card>
          <CardHeader {...dragHandleProps}>
            <CardTitle>{title}</CardTitle>
            {menu /* built-in export/actions menu */}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      );
    },
    empty: () => <Muted>No data for the current filters</Muted>,
  },
};

interface WidgetChromeProps {
  widget: WidgetSpec;
  title?: string;
  menu: React.ReactNode;                  // built-in actions (export, edit in edit-mode)
  dragHandleProps: Record<string, unknown>; // spread onto your header for RGL drag
  children: React.ReactNode;              // the chart/text/input body
  state: { loading: boolean; error?: Error; empty: boolean };
}
```

The chrome receives `dragHandleProps` so a custom header still works as the RGL drag handle — the layout engine stays library-owned while the look is host-owned.

### A2.4 (c) Replace input controls

Each `InputControl.kind` is a slot. A control's contract is a **value + onChange** bound to a dashboard variable (Leg 1 of the binding model). cube-viz never lets a control widen scope; it only writes its declared variable.

```ts
interface InputControlProps<V = VariableValue> {
  value: V;                       // current store value (Leg 3 read-back)
  onChange: (next: V) => void;    // writes store[control.variable] (Leg 1)
  decl: VariableDecl;             // type/array/label/default for validation + UI
  control: InputControl["control"]; // kind-specific config (presets, options, min/max…)
}
type InputControlComponent = React.ComponentType<InputControlProps>;
```

```tsx
const registry: ComponentRegistry = {
  controls: {
    dateRange: function MyDatePicker({ value, onChange, control }) {
      return <FancyRangePicker value={value} presets={control.presets} onChange={onChange} />;
    },
  },
};
```

The control never sees the Cube client or the token — it is a pure value editor. This guarantees the "an author can't widen tenant scope by editing a widget" invariant holds even for fully custom controls.

### A2.5 (d) Headless core — hooks for full-custom rendering

For consumers who want cube-viz's data pipeline but *none* of its rendering, the same engine is exposed as framework-agnostic hooks. These are the seam the registry components themselves are built on, so a host gets identical behavior whether it uses `<CubeChart>` or wires the hooks by hand.

```ts
/** Raw Cube fetch for a RESOLVED query (variables already substituted). */
function useCubeQuery(
  query: CubeQuery,
  opts?: { skip?: boolean },
): { resultSet?: ResultSet; isLoading: boolean; error?: Error };

/** Fetch + normalize in one step, using ChartOptions.mapping. Returns the
    SAME NormalizedChartData the renderer consumes. Applies variable resolution
    + noFilter from the surrounding DashboardProvider automatically. */
function useNormalizedSeries(
  query: CubeQuery,
  options: ChartOptions,
): { data?: NormalizedChartData; isLoading: boolean; error?: Error };

/** Dashboard variable store + resolver. Powers the three-legged binding. */
function useDashboard(spec: DashboardSpec): {
  vars: Record<string, VariableValue>;            // current store
  setVar: (name: string, value: VariableValue) => void; // Leg 1 write
  resolveQuery: (q: CubeQuery) => CubeQuery;       // Leg 2: substitute {var} + noFilter
  resolveValue: (name: string) => VariableValue;   // Leg 3 read-back
};

/** Cube /meta introspection for editors / field pickers. */
function useCubeMeta(): { meta?: CubeMeta; isLoading: boolean; error?: Error };

/** Format a value using locale + member meta + spec overrides (one DRY path). */
function useFormatter(): (value: number, meta: MemberFormatMeta) => string;
```

Full-custom example — host renders its own chart with cube-viz only doing data:

```tsx
function CustomPanel({ query, options }: { query: CubeQuery; options: ChartOptions }) {
  const { resolveQuery } = useDashboard(dashboardSpec);
  const { data, isLoading } = useNormalizedSeries(resolveQuery(query), options);
  if (isLoading) return <Spin />;
  return <MyOwnViz categories={data!.categories} series={data!.series} empty={data!.empty} />;
}
```

This is the cleanest expression of the abstraction seam: **everything semantic (fetch, `castNumerics`, `Continue wait` polling, variable substitution, `noFilter`, annotation-driven formatting, series alignment) happens in the hook; the host owns only pixels.** Swapping Recharts — or rendering to canvas, or to a native view — touches nothing below `NormalizedChartData`.

### A2.6 Override-model summary

| Seam | Slot | Replace | Extend |
|---|---|---|---|
| Chart family | `registry.charts[family]` | drop-in `ChartComponent` | `withChart(builtins.charts[family], { mapProps, wrapRender })` |
| Widget chrome | `registry.chrome.{widget,empty,error,loading}` | custom frame w/ `dragHandleProps` | wrap built-in chrome |
| Input control | `registry.controls[kind]` | custom value editor (`value`/`onChange`) | wrap built-in control |
| Headless | hooks | render anything from `useNormalizedSeries` | compose `useCubeQuery`/`useDashboard`/`useCubeMeta` |
| Formatting | `locale.formatValue` / `registry.formatters` | one central override, DRY across all charts | — |

---

## A3. Editor UX summary

Both editors are **JSON-in / JSON-out**: they take a `Spec`, mutate it in memory, and emit a new `Spec` via `onChange`/`onSave`. **The library performs no I/O** — the host (or the preview server) decides where bytes go.

### A3.1 Chart editor — driven by Cube `/v1/meta`

`<ChartEditor spec={chartSpec} onChange={...} />` renders a two-pane layout: **left = config pickers**, **right = live preview** (the actual `<CubeChart>` re-fetching on every change, debounced).

Pickers are populated **entirely from `useCubeMeta()`**, reading member names **verbatim** (never guessed — critical for `prefix:true` view members like `trip_performance.devices_name`):

1. **Data source** — pick a cube *or* view from `meta.cubes[]` (`type: "cube" | "view"`).
2. **Measures** — multi-select from that cube's `measures[]`. Each picked measure becomes a `mapping.series` entry (mode `measures`) with per-series label/color/format/stackId sub-controls (the per-measure richness borrowed from Embeddable's array sub-inputs).
3. **Dimensions** — from `dimensions[]` where `type !== "time"`. One may be promoted to the `mapping.category` member, or to a `mode:"pivot"` split.
4. **Time dimension + granularity** — from `dimensions[]` where `type === "time"`; selecting one offers the standard granularity dropdown (`second…year`) and a date-range control. Granularity/date-range may be bound to a variable instead of a literal (writes a `{var}` token).
5. **Filters** — a builder over all measures+dimensions; member `type` drives the operator list (string → equals/contains/set; number → gt/lt/equals; boolean → equals true/false; time → inDateRange/before/after).
6. **Chart type + display** — `family` selector, then the cross-family envelope (`orientation`, `stackMode`, `legend`, `tooltip`, `axes`, `colors`) plus the family-specific `familyOptions` panel.
7. **Format** — `FormatOptions` overrides; defaults shown come from each member's `meta.{unit, quantity, convert}` (e.g. a `quantity:'time'` measure pre-shows "duration → 2d 19h").

`/v1/meta` returns shape only; the live preview pane is what issues `/v1/load`. The editor validates the assembled `ChartSpec` with its zod schema on every change and surfaces errors inline rather than emitting an invalid spec.

### A3.2 Dashboard editor — RGL canvas + per-widget panel

`<DashboardEditor spec={dashboardSpec} onChange={...} onSave={...} />`:

- **Canvas** — the dashboard rendered through the same `Responsive` + `useContainerWidth()` engine used at runtime, in **edit mode**: drag + resize via react-grid-layout, honoring `minW/minH` from `LayoutItem`. There is **one canonical (widest) layout**; the editor never exposes per-breakpoint editing. On drag/resize it captures the widest layout from RGL's `allLayouts` and writes it back as `layout`.
- **Add** — a toolbar adds a `ChartWidget` (opens the chart editor inline), a `TextWidget` (TipTap StarterKit editor, `editor.getJSON()` → `doc`), or an `InputWidget` (pick a variable + control kind).
- **Variables** — a panel to declare/edit `VariableDecl[]` (name, type, array, default — defaults prefer relative date strings like `"This month"`).
- **Select-to-edit panel** — clicking a widget opens its edit panel:
  - **Desktop:** a **right-side panel** (resizable), canvas reflows to the remaining width (and because reflow is container-width-based, the dashboard genuinely re-lays-out as the panel opens — no breakpoint hack).
  - **Mobile / narrow:** a **bottom sheet** over the canvas.
  - The panel hosts the chart editor (for chart widgets), the TipTap toolbar (text), or the control config (input).
- **Save** — `onSave(nextSpec)` hands the validated `DashboardSpec` JSON to the host. The editor itself writes nothing.

---

# PART B — Preview Server

## B1. A Bun-served preview app over a local content folder

A standalone Bun program (shipped in the package, runnable via `bunx cube-viz preview`) that turns a folder of spec JSON into a live, editable gallery — **using the exact same editors and renderer the library exports**, so previewing is a true integration test of the contract.

```
$ bunx cube-viz preview ./content
#   ./content/
#     dashboards/   *.json  (DashboardSpec)
#     charts/       *.json  (ChartSpec)
```

- **CLI arg** = path to a content root containing `dashboards/` and `charts/`. The server `Bun.serve()`s a small SPA + a JSON file API scoped to that root.
- **List** — the home view scans both folders and lists every spec by `meta.name`/`id`, tagged chart vs dashboard, with a thumbnail/preview.
- **Open / preview** — renders any spec against **live Cube data** using `<CubeChart>` / `<Dashboard>` from the library, under a `<CubeVizProvider>` whose `cube` connection comes from the in-UI token entry (B2).
- **Edit** — opens `<ChartEditor>` / `<DashboardEditor>`. These are JSON-in/JSON-out; the preview server is the *host* that supplies their `onSave`.
- **Export back to JSON** — `onSave` POSTs the spec to the server, which writes it to the originating file (pretty-printed, stable key order, trailing newline). **Create new** writes a new `{id}.json` into the right folder.

**Critical boundary:** *all file I/O lives in the server, never in the library.* The library only knows `Spec` objects and `onChange`/`onSave` callbacks. The preview server is just one host that happens to back those callbacks with `Bun.write` / `Bun.file`. This is the same contract a real consuming app (saving to Convex, S3, a DB) would implement — the preview server proves the contract with the filesystem.

```ts
// server side (Bun) — the I/O the LIBRARY never does
const root = process.argv[2] ?? "./content";

Bun.serve({
  port: 4321,
  routes: {
    "/api/specs": () => json(listSpecs(root)),                 // scan dashboards/ + charts/
    "/api/spec/:kind/:id": {
      GET: (req) => json(readSpec(root, req.params.kind, req.params.id)),
      PUT: async (req) => {                                     // ← editor onSave lands here
        const spec = await req.json();                         //   JSON-in
        validate(spec);                                        //   zod (same schema as lib)
        await Bun.write(specPath(root, spec.kind, spec.id),    //   JSON-out to disk
          JSON.stringify(spec, sortKeys, 2) + "\n");
        return json({ ok: true });
      },
    },
    "/api/cube/*": cubeProxy,                                   // optional same-origin proxy (B2)
    "/*": serveSpa,                                             // the preview SPA (web build)
  },
});
```

## B2. Cube endpoint + token entered in-UI (memory-only)

The preview app has a **Connection** dialog: `apiUrl` + token, entered by the user. Same credential discipline as the library:

- **Memory-only.** The token is held in the SPA's React state for the session. It is **never** written to disk, never put in a spec file, never logged (server log lines redact any `Authorization` header).
- **Optional `.env` prefill.** At startup the server may read `CUBE_API_URL` and `CUBE_API_TOKEN` from the environment **only to prefill the dialog fields** (the dialog still shows them as editable, masked). It does not persist them anywhere new and does not require them. This matches "optional .env prefill at startup" without turning the file into a credential store.
- **Two transport modes:**
  - **Direct** — the SPA builds a `CubeConnection` and the library's `cube()` client talks to `apiUrl` from the browser (token in memory, raw JWT in `Authorization`, no `Bearer`).
  - **Same-origin proxy** (default for local dev to dodce CORS) — the SPA sends the token to the local Bun server per request via a header; `/api/cube/*` forwards to the real Cube `apiUrl`, attaching the token server-side. The proxy keeps the token in the request lifecycle only — never stored, never logged.
- Once connected, every preview/editor renders folder content against **live Cube data**, and the chart editor's pickers populate from the real `/v1/meta`.

## B3. The same preview runnable from a consuming project

The headline capability: an app team that has written **their own theme, registry overrides, custom chart components, and content folder** can launch the *same* preview harness pointed at *their* code, and see their overrides against *their* live Cube — before shipping.

### B3.1 Package layout — three entry points, one codebase

```
cube-viz/
  package.json
    "exports": {
      ".":            "./dist/index.js",        // (1) LIBRARY entry — components, hooks,
                                                 //     CubeVizProvider, editors, builtins, withChart
      "./preview":    "./dist/preview/app.js",   // (2) PREVIEW entry — runPreview(opts):
                                                 //     mounts the gallery SPA programmatically
      "./theme.css":  "./dist/theme.css"         //     optional fallback tokens (A1.2)
    },
    "bin": { "cube-viz": "./dist/cli.js" }        // (3) CLI — `bunx cube-viz preview <dir>`

  src/
    index.ts            # library
    preview/
      app.tsx           # the gallery SPA (web)  ← used by BOTH cli and runPreview
      server.ts         # Bun.serve file API + cube proxy
      runPreview.ts     # exported programmatic launcher
    cli.ts              # arg parsing → runPreview
```

- **(1) Library entry** (`cube-viz`) — pure components/hooks, no Bun, no `fs`, framework-agnostic, bundler-friendly (Vite/Bun). This is all a production app ships.
- **(2) Preview entry** (`cube-viz/preview`) — exports `runPreview(opts)`, a programmatic launcher so a consumer mounts the gallery **with their own provider config injected**:

```ts
// consumer's preview.ts — run with: bun run preview.ts
import { runPreview } from "cube-viz/preview";
import { myRegistry, myTheme } from "./src/cube-viz-overrides";

await runPreview({
  contentDir: "./dashboards-content",   // their /charts + /dashboards JSON
  port: 4321,
  // The SAME provider config their app uses — overrides/theme/custom charts:
  provider: { theme: myTheme, registry: myRegistry },
  // optional: prefill, proxy on/off
  cube: { prefillFromEnv: true, proxy: true },
});
```

Because the gallery SPA renders folder content through a `<CubeVizProvider>` seeded with the consumer's `provider` config, **their custom `charts.bar`, their chrome, their controls, their theme tokens** are exercised exactly as in production — against live Cube data.

- **(3) CLI** (`bunx cube-viz preview ./content`) — the zero-config path: same `runPreview` with the **default** (built-in) registry/theme, content dir from `argv`. Used for quick previews and by the library's own dev loop.

### B3.2 Bun specifics

- **Server:** `Bun.serve({ routes })` for the file API + cube proxy; `Bun.file`/`Bun.write` for JSON I/O; `Bun.Glob` to scan `dashboards/` + `charts/`. No Express.
- **SPA build:** `Bun.build({ entrypoints: ["preview/app.tsx"], target: "browser" })` produces the gallery bundle the server serves at `/*`. In dev, Bun's bundler watches and HMRs.
- **One web codebase, two consumers:** the gallery is plain React + the library — no platform-specific code. It builds once.
- **`runPreview` is async** and returns a handle (`{ url, stop() }`) so it can be embedded in a consumer's own script or test.

### B3.3 Serving web + mobile-WebView from one web build

The preview SPA is a single responsive web app; mobile is **the same bytes in a WebView**, not a second codebase:

- **Web:** developer opens `http://localhost:4321` in a browser.
- **Mobile-WebView:** the same URL loads in a device WebView (e.g. an Expo/React-Native `WebView` pointed at the LAN address, or the device browser). Because the runtime layout engine is **container-width reflow** (`useContainerWidth()` + RGL auto-derived narrow layouts — no breakpoints), the dashboard reflows correctly to the phone's WebView width with zero mobile-specific layout code. The select-to-edit panel automatically becomes a **bottom sheet** at narrow widths (A3.2), so editing works on the phone too.
- The server binds to `0.0.0.0` (configurable) so a physical device on the same network can reach it; the in-UI connection dialog (and proxy) work identically over LAN. This delivers "web + mobile-WebView both served from one web codebase" with the single responsive gallery build.

### B3.4 Why this layout matters

| Goal | Mechanism |
|---|---|
| App ships minimal | Library entry has no Bun/`fs`; preview code is a separate, dev-only entry |
| Preview *your* overrides | `runPreview({ provider })` injects the consumer's registry/theme into the same gallery |
| Zero-config quick look | `bunx cube-viz preview <dir>` uses defaults |
| File I/O out of the library | All `Bun.write`/`Bun.file` live in `preview/server.ts`, behind the editors' JSON-in/out callbacks |
| Creds never stored | In-UI memory-only token, optional `.env` prefill, redacted logs, optional same-origin proxy |
| One UI for web + mobile | Single responsive SPA, container-width reflow, WebView loads the same URL |

---

## Closing note

Part A keeps cube-viz **theme-transparent** (it reads aa-app's exact shadcn tokens and the `chart-1..5` ramp, defining nothing the host already defines) and **override-complete** (every chart family, chrome, and control is a registry slot, with `withChart` decorators and a headless hook layer for full-custom rendering — all sitting on the `NormalizedChartData` boundary so Recharts is swappable). Part B makes that surface **provable**: a Bun preview server that renders a local content folder against live Cube, exports edits back to JSON via the editors' JSON-in/out contract, and — via `runPreview` — lets any consuming project preview *its own* theme, overrides, and content against *its own* Cube data, on web and in a mobile WebView, from one codebase. Throughout, credentials are host-supplied and memory-only, and RLS stays in the JWT where no spec or override can widen it.