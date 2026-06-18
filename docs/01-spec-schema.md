This is a design/writing task with no code dependencies, and the grounded research findings give me everything I need. I'll produce the markdown design section directly.

# cube-viz Spec Schema & Variable Binding Model

> **Status:** Stable contract proposal, v1. This is the library-agnostic source of truth that every other cube-viz layer (renderer, editor, adapter, preview server) builds on. Library-specific concerns (Recharts, react-grid-layout, TipTap) never leak into the spec.

---

## 0. Design axioms

These constrain every decision below:

1. **The spec is data, not code.** A spec is a plain JSON object that round-trips losslessly through `JSON.parse(JSON.stringify(spec))`. No functions, no class instances, no `var()` strings baked into stored specs (theme resolution happens at render).
2. **One configurable component per chart *family*.** Orientation, stacking, and series count are *inputs*, not distinct kinds — inverting Embeddable's six-Bar-component explosion (`BarChartStackedPro`, `BarChartGroupedHorizontalPro`, …) into one `family: "bar"` with `orientation` + `stackMode` options.
3. **Three stable seams** mirror Embeddable's proven override trio, expressed as data: the **Cube query** (what data), the **option envelope** (how it looks), the **variable bindings** (what's reactive).
4. **The resultSet→series adapter is the abstraction boundary.** Chart components consume a normalized `{ categories, series, raw }` shape, never a Cube `ResultSet`. Swapping Recharts for anything else touches only the renderer, never the spec or the adapter.
5. **Fail safe, fail closed.** A missing variable drops its predicate (`noFilter`), never widens scope. RLS/tenancy is *not* in the spec — it lives in the JWT `securityContext` the host forwards. A spec author can never widen tenant scope by editing a widget.

---

## 1. Top-level spec kinds & the discriminated union

cube-viz has exactly **three persistable top-level kinds**, discriminated by a `kind` literal. `WidgetSpec` is itself a nested discriminated union of three widget types.

```ts
type SpecVersion = 1; // integer, bumped only on breaking shape changes

interface SpecMeta {
  schemaVersion: SpecVersion;   // REQUIRED on every persisted top-level spec
  id: string;                   // stable, host-assigned (nanoid/uuid); never reused
  name?: string;                // human label for pickers
  description?: string;
  createdAt?: string;           // ISO-8601, informational only
  updatedAt?: string;
}

// ── Top-level discriminated union ──────────────────────────────
type Spec = ChartSpec | DashboardSpec;
//                       ^ WidgetSpec is NOT independently persistable at top level;
//                         it always lives inside a DashboardSpec.widgets[].
//                         A standalone chart persists as ChartSpec (kind:"chart").

interface ChartSpec extends SpecMeta {
  kind: "chart";
  query: CubeQuery;             // §2
  chart: ChartOptions;          // §3
}

interface DashboardSpec extends SpecMeta {
  kind: "dashboard";
  variables: VariableDecl[];    // §4 / §5
  widgets: WidgetSpec[];        // §4
  layout: LayoutItem[];         // §4 — the ONE canonical layout
  grid?: GridConfig;            // §4 — optional grid tuning
}

// ── Nested widget union (lives inside DashboardSpec) ───────────
type WidgetSpec = ChartWidget | TextWidget | InputWidget;

interface WidgetBase {
  id: string;                   // MUST equal the matching layout item's `i`
  title?: string;               // optional chrome header
}

interface ChartWidget extends WidgetBase {
  type: "chart";
  query: CubeQuery;             // §2 (may reference dashboard variables)
  chart: ChartOptions;          // §3
}

interface TextWidget extends WidgetBase {
  type: "text";
  doc: TipTapDoc;               // ProseMirror JSON (editor.getJSON()) — §3.5
}

interface InputWidget extends WidgetBase {
  type: "input";
  control: InputControl;        // §5 — WRITES a dashboard variable
}
```

### Why this shape

- **`kind` vs `type`.** The *top level* discriminates on `kind` (`"chart" | "dashboard"`). *Widgets inside a dashboard* discriminate on `type` (`"chart" | "text" | "input"`). Two distinct fields means a flattened tool (e.g. a generic visitor) never has to disambiguate "is this a top-level chart or an embedded chart widget" — the presence of `schemaVersion`/`kind` marks a persisted root.
- **A standalone `ChartSpec` and an embedded `ChartWidget` share `query` + `chart`.** They are intentionally the *same two sub-objects*, so the chart renderer takes `{ query, chart }` and is agnostic to whether it's rendering a lone chart file or a dashboard cell. The only difference: a `ChartWidget`'s `query` may contain variable references that resolve against the parent dashboard's variable store; a top-level `ChartSpec` resolves variable references against an empty/host-supplied store (so any `{var}` it carries must have a host default or it fails safe).

### Validation, versioning & migration (recommend **zod**)

- **Validate with zod.** Every top-level kind gets a zod schema (`ChartSpecSchema`, `DashboardSpecSchema`) composed via `z.discriminatedUnion("kind", [...])`; `WidgetSpec` is `z.discriminatedUnion("type", [...])`. zod is chosen over JSON Schema/ajv because the spec is authored *and* consumed in TypeScript — one source of truth generates both the runtime guard and the `Spec` type (`z.infer`). The preview server validates on load and on export; the editor validates on every save; the renderer validates (or trusts a pre-validated boundary) on mount.

- **`schemaVersion` is an integer, not semver.** It bumps only on *breaking* shape changes (rename/remove a field, change a field's type, change a discriminant). Additive, optional fields do **not** bump it.

- **Migrate forward with a registered ladder.** Maintain `migrations: Record<from, (raw: unknown) => unknown>` keyed by `from` version, each lifting `n → n+1`. On load:

  ```
  load(raw):
    v = raw.schemaVersion ?? 1            // absent ⇒ treat as v1
    while v < CURRENT_VERSION:
      raw = migrations[v](raw); v += 1
    return SchemaForKind(raw.kind).parse(raw)   // zod validates the final shape
  ```

  Migrations run *before* zod parsing so old shapes are repaired, then proven valid against the current schema. A spec with `schemaVersion > CURRENT_VERSION` is rejected (the host is older than the file). This keeps stored specs immutable on disk until re-saved, but always loadable.

---

## 2. The embedded Cube query (`CubeQuery`)

The query is a **near-passthrough of the Cube REST `Query` JSON** (the contract `@cubejs-client/core`'s `cube().load(query)` already speaks), with exactly one cube-viz extension: any *value* position may carry a **variable reference token** (§5) instead of a literal. Members are the real, verbatim `cube.member` / `view.member` names read from `/v1/meta` — never guessed.

```ts
interface CubeQuery {
  measures?: Member[];          // ["device_trips.total_distance", ...]
  dimensions?: Member[];        // ["device_trips.device_id", ...]  (type !== 'time')
  timeDimensions?: TimeDimension[];
  filters?: QueryFilter[];      // leaf filters or and/or groups
  segments?: Member[];          // model declares none today; kept for forward-compat
  order?: OrderSpec;            // object or [member, dir][] tuple form
  limit?: number | VarRef;
  offset?: number | VarRef;
  total?: boolean;
  timezone?: string;            // IANA tz; defaults host-side
}

type Member = string;           // fully-qualified, dot-namespaced, snake_case

interface TimeDimension {
  dimension: Member;            // a dimension whose meta type === 'time'
                                // e.g. "device_trips.start_time", "device_locations.timestamp"
  granularity?: Granularity | VarRef;   // omit ⇒ plain date filter, no grouping
  dateRange?: DateRange | VarRef;        // ['2026-06-01','2026-06-18'] | "last 7 days" | {var}
  compareDateRange?: DateRange[];        // period-over-period
}

type Granularity =
  | "second" | "minute" | "hour" | "day"
  | "week" | "month" | "quarter" | "year";

type DateRange = [string, string] | string;   // absolute pair OR relative ("last 30 days")

// Filters: leaf or boolean group; a single group must NOT mix dim & measure filters.
type QueryFilter = LeafFilter | { and: QueryFilter[] } | { or: QueryFilter[] };

interface LeafFilter {
  member: Member;
  operator: FilterOperator;
  values?: (string | number | boolean | VarRef)[];   // may be a [{var}] token
}

type FilterOperator =
  | "equals" | "notEquals" | "gt" | "gte" | "lt" | "lte"
  | "contains" | "notContains" | "startsWith" | "endsWith"
  | "set" | "notSet"
  | "inDateRange" | "notInDateRange"
  | "beforeDate" | "beforeOrOnDate" | "afterDate" | "afterOrOnDate"
  | "measureFilter";

type OrderSpec =
  | Record<Member, "asc" | "desc">
  | [Member, "asc" | "desc"][];        // tuple form preserves key order
```

### How the query references variables

Anywhere a literal value would go, the spec may carry a `VarRef` token: `{ "var": "<variableName>" }`. At render time the resolver (§5) replaces each token with the variable's current value (or default), then drops any filter/time-dimension field whose token resolved to *empty* (the `noFilter` rule). The cleaned, literal-only query is what's POSTed to `/v1/load`.

**Example — a dashboard's date-range + granularity variables feeding a trips-by-day query** (real `device_trips` members):

```json
{
  "measures": ["device_trips.total_distance", "device_trips.total_idle_duration"],
  "timeDimensions": [
    {
      "dimension": "device_trips.start_time",
      "granularity": { "var": "granularity" },
      "dateRange": { "var": "dateRange" }
    }
  ],
  "dimensions": ["device_trips.device_id"],
  "filters": [
    { "member": "device_trips.system_id", "operator": "equals", "values": [{ "var": "systemId" }] }
  ],
  "order": [["device_trips.start_time", "asc"]],
  "limit": 5000
}
```

If `dateRange` is unset, the whole `timeDimensions[0].dateRange` is dropped (no date predicate). If `granularity` is unset, the time dimension stays but ungrouped. If `systemId` is unset, the `system_id` filter is dropped entirely (and RLS in the JWT still scopes rows — the spec can't widen it).

> **Why passthrough.** Keeping `CubeQuery` shape-compatible with Cube's own `Query` means the adapter forwards it to `cube().load()` after token resolution with zero translation, and a future cube version's new query field is a one-line additive schema change. The *only* thing cube-viz adds is the `VarRef` token; everything else is Cube's own grammar.

---

## 3. The chart option envelope (`ChartOptions`)

This section defines the **envelope** and the **generic series/category mapping** — *not* the exhaustive per-family option catalog (that is the chart-options agent's deliverable, slotted into `familyOptions`).

```ts
interface ChartOptions {
  family: ChartFamily;          // ONE component per family
  mapping: SeriesMapping;       // generic data→visual mapping (the load-bearing part)

  // ── cross-family display envelope ──
  orientation?: "vertical" | "horizontal";     // bar/composed; ignored by pie/etc.
  stackMode?: "none" | "stacked" | "grouped" | "percent";  // bar/area; default "none"

  legend?: LegendOptions;
  tooltip?: TooltipOptions;
  axes?: AxesOptions;           // x/y axis envelope (label, hide, scale, domain)
  colors?: ColorAssignment;     // → chart tokens (§3.4)
  format?: FormatOptions;       // number/date formatting (§3.3)

  // ── per-family escape hatch ──
  familyOptions?: Record<string, unknown>;     // OWNED BY the chart-options agent;
                                               // validated by a family-specific zod schema.
}

type ChartFamily =
  | "bar" | "line" | "area" | "pie" | "scatter" | "radial" | "composed" | "kpi" | "table";
```

> One `family` value maps to exactly one renderer component. `orientation` + `stackMode` collapse what Embeddable shipped as six separate Bar components and the split Line variants into props. `kpi` and `table` are families too (a KPI is a single-value chart; a table is `resultSet.tablePivot`).

### 3.1 Series / category mapping — the generic seam

This is the heart of the option layer: a **library-agnostic description of which query members become categories vs series**, expressed once and interpreted by every family. It is deliberately *not* Recharts-shaped.

```ts
interface SeriesMapping {
  // The category axis (x for vertical bar/line, the slice label for pie, the row for table).
  category: {
    member: Member;             // usually the time dimension or a grouping dimension
    // for time dims, the resolved granularity from the query drives bucket labels
  };

  // How series are produced. Two mutually-exclusive strategies:
  series:
    | {
        // (a) MEASURE-PER-SERIES: each listed measure is its own series.
        mode: "measures";
        members: Member[];      // subset/order of query.measures
        meta?: Record<Member, SeriesMeta>;   // per-series label/color/stackId/axis
      }
    | {
        // (b) PIVOT-BY-DIMENSION: one measure, fanned into a series per distinct
        //     value of a pivot dimension (e.g. one line per device_id).
        mode: "pivot";
        value: Member;          // the single measure to plot
        pivot: Member;          // the dimension to split on
        // labels/colors derived from pivot values at render via the adapter + colors ramp
      };
}

interface SeriesMeta {
  label?: string;               // overrides annotation().shortTitle
  colorToken?: ChartColorToken; // "chart-1".."chart-5" (§3.4)
  stackId?: string;             // same id ⇒ stacked together (only when stackMode demands)
  axis?: "left" | "right";      // dual-axis (composed/line)
  format?: FormatOptions;       // per-series override of number formatting
}
```

- **Mode (a) `measures`** answers "plot `total_distance` and `total_idle_duration` as two bars/lines per day." Series identity = measure name; labels/colors come from `meta` or fall through to `annotation()`.
- **Mode (b) `pivot`** answers "one line per `device_id`." Series identity = distinct pivot value; the adapter (§6) produces one series per value and the color ramp assigns tokens round-robin. This maps directly onto Cube's `pivot`/`chartPivot` with `y: [pivotMember, "measures"]`.

This single mapping object is what makes "swap Recharts later" cheap: the renderer reads `mapping` + the normalized series (§6), never the raw query.

### 3.2 Legend / tooltip / axes envelope

```ts
interface LegendOptions { show?: boolean; position?: "top" | "right" | "bottom" | "left"; }
interface TooltipOptions {
  show?: boolean;
  indicator?: "dot" | "line" | "dashed";   // maps to shadcn ChartTooltipContent
  showTotal?: boolean;                      // sum series in stacked tooltips
}
interface AxesOptions {
  x?: AxisOptions;
  y?: AxisOptions;
  y2?: AxisOptions;            // secondary axis when SeriesMeta.axis === "right"
}
interface AxisOptions {
  label?: string;
  hide?: boolean;
  scale?: "linear" | "log";   // log ↔ Cube/Embeddable showLogarithmicScale
  domain?: [number | "auto", number | "auto"];
  tickFormat?: FormatOptions; // overrides global format for this axis
}
```

These are deliberately *abstract* (no `XAxis`/`YAxis` Recharts names). The renderer translates `orientation: "horizontal"` into Recharts' `layout="vertical"` + swapped axis types; the spec stays declarative.

### 3.3 Number / date formatting (`FormatOptions`) — behavior on the theme, defaults in the spec

Formatting follows Embeddable's lesson that *format intelligence lives on the data model*: defaults are derived from each member's Cube `meta.{unit, quantity, convert}` by the adapter, and the spec only carries **overrides**.

```ts
interface FormatOptions {
  kind?: "number" | "percent" | "currency" | "duration" | "date" | "auto";
  // "auto" (default) ⇒ derive from member meta.quantity:
  //   quantity:'time' ⇒ duration ("2d 19h"); convert:false percentages ⇒ percent; else number.
  decimals?: number;
  abbreviate?: boolean;         // 12_300 → "12.3k"
  prefix?: string;              // "$"
  suffix?: string;              // "km" / "(ms)"
  unitSystem?: "metric" | "imperial";  // drives meta.convert; default host clientContext
  dateFormat?: string;          // for category time buckets / axis ticks
}
```

The *behavioral* defaults (e.g. "render `meta.quantity:'time'` as `2d 19h` everywhere," the CSV/XLSX export `(ms)` suffix) live in the **theme/registry**, not repeated per chart — exactly the DRY win that kept Embeddable's duration logic out of 25 components. The spec's `format` only overrides.

### 3.4 Colors → chart tokens

Specs reference **semantic token names**, never raw colors, so theme/light-dark swaps require no spec edits.

```ts
type ChartColorToken = "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";

interface ColorAssignment {
  // explicit per-series-key token; unassigned series get the ramp round-robin.
  byKey?: Record<string, ChartColorToken>;
  ramp?: ChartColorToken[];     // override the default 1→5 cycling order
}
```

At render the token resolves to `var(--chart-N)` (Recharts 3 form, **not** `hsl(var(--chart-N))`). The canonical OKLCH values come from `global.css`; the renderer derives shadcn's `ChartConfig` (`{ label, color: "var(--chart-N)" }`) from `mapping` + `colors` so colors/labels flow through shadcn's `--color-<key>` mechanism automatically. The numbered ramp mirrors Embeddable's `--em-sem-chart-color--1..10`; cube-viz uses the 5-token shadcn set already defined in `global.css`.

### 3.5 Text & Input widget payloads (for completeness)

- **`TextWidget.doc`** is **ProseMirror JSON** straight from `editor.getJSON()` (TipTap StarterKit schema, v3). It renders read-only via the *same* StarterKit + `editable:false`. The registered extension set is pinned to the schemaVersion so stored docs never hit unknown node types.
- **`InputWidget.control`** is defined in §5 (it's a *write* surface for a variable, so it belongs to the binding model).

---

## 4. `DashboardSpec` — layout, widgets, variables

```ts
interface DashboardSpec extends SpecMeta {
  kind: "dashboard";
  variables: VariableDecl[];
  widgets: WidgetSpec[];
  layout: LayoutItem[];         // THE ONE canonical layout (widest only)
  grid?: GridConfig;
}

interface GridConfig {
  cols?: number;                // canonical column count (default 12)
  rowHeight?: number;           // px per grid row (default 40)
  margin?: [number, number];    // default [12,12]
  containerPadding?: [number, number];
}

// One canonical layout. NO per-breakpoint maps in the spec.
interface LayoutItem {
  i: string;                    // MUST equal a WidgetSpec.id
  x: number; y: number;         // grid units, in the canonical (widest) layout
  w: number; h: number;         // grid units
  minW?: number; minH?: number; // ONLY min constraints persisted — no maxW/maxH,
                                // no per-breakpoint sizing (reflow derives the rest)
  static?: boolean;             // pinned, non-draggable/resizable
}
```

### Responsive *without* breakpoints (the canonical-layout rule)

The spec stores **exactly one layout**, authored at the **widest** column count. The renderer wraps react-grid-layout's `Responsive` with `useContainerWidth()` so the dashboard reflows to its **container**, not the viewport. Narrower layouts are **auto-derived** by RGL's `findOrGenerateResponsiveLayout` (clone from nearest larger breakpoint → `correctBounds` clamps `x/w` to the narrower `cols` → compact). This is why the spec persists only `minW/minH` (constraints that survive reflow) and never `maxW/maxH` or per-breakpoint arrays — there is one source of truth and the layout for every width is a pure function of it. When a user edits and saves, the host captures the *widest* layout from RGL's `allLayouts` and writes it back as the new canonical `layout`.

### Variable declaration

```ts
interface VariableDecl {
  name: string;                 // referenced by {var:"name"} tokens; unique per dashboard
  type: VariableType;           // shapes the control + the value's runtime type
  label?: string;               // for the control / editor
  array?: boolean;              // multi-select ⇒ resolves to a list (SQL IN)
  default?: VariableValue;      // default resolution (§5); prefer relative for dates
}

type VariableType =
  | "dateRange" | "time" | "granularity"
  | "string" | "number" | "boolean"
  | "dimension" | "measure" | "dimensionOrMeasure";

type VariableValue =
  | string | number | boolean
  | DateRange                   // ["2026-06-01","2026-06-18"] | "last 30 days"
  | Granularity
  | string[] | number[];        // when array:true
```

`dateRange` defaults **should prefer a relative string** (`"This month"`, `"last 30 days"`) over absolute dates so a saved dashboard stays current — mirroring Embeddable's `relativeTimeString` guidance. `dimension`/`measure`/`dimensionOrMeasure` variables let an Input pick *which member* a chart plots (a member-valued variable referenced in `mapping`/`query`), enabling "metric switcher" controls without per-chart edits.

---

## 5. The variable binding model

A clean **three-legged reactive contract**, adapted from Embeddable's WRITE / READ-into-data / READ-into-control model, but expressed entirely as spec data + a render-time resolver. Variables live in a **per-dashboard variable store** (in-memory at runtime; the spec only declares names + defaults).

```
        ┌────────────────────────────────────────────────────────┐
        │            Dashboard Variable Store (runtime)           │
        │   name → currentValue   (seeded from VariableDecl.default)│
        └──────────▲───────────────────────────────┬─────────────┘
   (1) WRITE       │                                │  (2)/(3) READ
   Input widget    │                                ▼
   control.onChange│        ┌──────────────────────────────────────┐
   sets the var ───┘        │  resolver: deep-walk a query/options, │
                            │  replace every {var:"x"} token, then  │
                            │  apply the noFilter drop rule         │
                            └──────────────────────────────────────┘
```

### Leg 1 — WRITE: the Input widget

```ts
interface InputControl {
  variable: string;             // the VariableDecl.name this control writes
  control:
    | { kind: "dateRange"; presets?: string[]; allowFuture?: boolean }
    | { kind: "granularity"; options?: Granularity[] }
    | { kind: "select"; options: { value: VariableValue; label: string }[]; multiple?: boolean }
    | { kind: "memberSelect"; from: "dimension" | "measure" | "dimensionOrMeasure"; cube?: string }
    | { kind: "text"; placeholder?: string }
    | { kind: "number"; min?: number; max?: number; step?: number }
    | { kind: "toggle" };
  // initial display value READS the same variable (leg 3) so the control reflects state.
}
```

An Input widget is the **only** writer of a variable. On change it sets `store[control.variable] = value`. The control's *displayed* value is itself read back from the store (leg 3), so the control and the data stay in lockstep — a date picker reflects the current `dateRange`, a granularity dropdown reflects the current `granularity`. The control `kind` must be type-compatible with the `VariableDecl.type`/`array` (validated at load).

### Leg 2 — READ into data: `{var}` tokens in the query

A `CubeQuery` (or `ChartOptions.mapping`, for member-valued vars) references a variable by the token `{ "var": "name" }` in any value position (§2). The resolver deep-walks the query and replaces each token with `store[name] ?? decl.default`.

### Leg 3 — READ into control: the Input's own displayed value

The Input control's current value is `store[variable] ?? decl.default` — the same resolution, so writing and reflecting are symmetric.

### Default resolution order

For any token `{var:"x"}`:

1. `store["x"]` if the user has set it,
2. else `VariableDecl.default`,
3. else **unset** → trigger the `noFilter` rule.

### The `noFilter` (fail-safe) rule — exactly specified

When a `{var}` token resolves to **unset** (no store value and no default) or **empty** (empty string, empty array, `null`):

- **In a `LeafFilter.values`** → the entire `LeafFilter` is **removed** from the query.
- **In `TimeDimension.dateRange`** → the `dateRange` field is **removed** (the time dimension stays for grouping if `granularity` is present; otherwise it's an ungrouped passthrough).
- **In `TimeDimension.granularity`** → the `granularity` field is **removed** (ungrouped).
- **In `limit`/`offset`** → the field is **removed** (Cube default applies).
- **In `mapping`/options (member-valued var)** → the chart renders an **empty/placeholder state** (it cannot plot an unspecified member) rather than erroring.
- **Inside an `and`/`or` group** → the empty leaf is dropped; if the group empties, the group is dropped.

The rule is **strictly narrowing-or-neutral**: an unset variable can only *remove* a predicate, never broaden tenant scope. **RLS is orthogonal and untouchable** — row scoping comes from the JWT `securityContext.{systemIds, roles}` the host forwards to Cube; no spec field can alter it. A `system_id` *filter* in a query is an additional narrowing on top of RLS, never a substitute for it.

---

## 6. The resultSet → normalized-series adapter contract

The adapter is the **single abstraction boundary** between Cube and the renderer. Chart components consume `NormalizedChartData`; they never see a Cube `ResultSet`. Swapping Recharts (or adding a second renderer) touches only code downstream of this type.

```ts
interface NormalizedSeries {
  key: string;                  // stable series id (measure name OR pivot value)
  label: string;                // display label (from SeriesMeta → annotation().shortTitle → key)
  data: (number | null)[];      // aligned 1:1 with `categories` (null = gap)
  colorToken?: ChartColorToken; // resolved from ColorAssignment / ramp
  meta?: {                      // formatting hints, sourced from Cube annotation + member meta
    format: FormatOptions;      // resolved (auto from quantity/unit, then spec overrides)
    unit?: string; quantity?: string; convert?: boolean;
    axis?: "left" | "right";
    stackId?: string;
  };
}

interface NormalizedChartData {
  categories: (string | number)[];   // x labels (time buckets or dimension values),
                                      // aligned to every series' `data` index
  series: NormalizedSeries[];
  raw: {
    rows: Record<string, unknown>[];  // resultSet.tablePivot() — for tables/KPIs/debug
    annotation: ResultAnnotation;     // resultSet.annotation() — titles/types/formats
    query: CubeQuery;                 // the RESOLVED (literal) query that produced this
  };
  empty: boolean;               // true when noFilter dropped everything / zero rows
}
```

### Adapter responsibilities (the contract)

1. **Resolve the query** (apply variable store + `noFilter`) → a literal Cube `Query`.
2. **Fetch** via `cube().load(resolvedQuery, { castNumerics: true })` — `castNumerics` is mandatory because Cube returns measures as **strings** by default. Let the SDK own the `Continue wait` polling and the raw-JWT `Authorization` header (no `Bearer`).
3. **Normalize** using `ChartOptions.mapping`:
   - **`mode:"measures"`** → use `resultSet.series()` / `chartPivot()`; one `NormalizedSeries` per listed measure; `categories` = the category member's bucket labels.
   - **`mode:"pivot"`** → call `pivot`/`chartPivot` with `pivotConfig.y = [pivotMember, "measures"]`; one `NormalizedSeries` per distinct pivot value; assign ramp colors round-robin.
   - Use `seriesNames()` for legend/key metadata and `tableColumns()`/`tablePivot()` for the `table` family.
4. **Derive formatting & labels** from `resultSet.annotation()` (titles, types) and each member's Cube `meta.{unit, quantity, convert}` — *never* re-derive titles or assume numeric types. Spec `format` overrides win over derived defaults.
5. **Align series to a shared `categories` axis** (one index space; `null` for gaps). Honor `pivotConfig.fillMissingDates` — default `true`, but expose it so sparse data can opt out.
6. **Set `empty:true`** when the resolved query was emptied by `noFilter` or returned zero rows, so the renderer shows an empty state rather than a broken chart.

> The renderer's job shrinks to: map `family` → Recharts container, map `mapping`/`stackMode`/`orientation` → stackId/layout/axis props, and bind `NormalizedSeries.colorToken` → `var(--chart-N)` through shadcn `ChartConfig`. Everything semantic already happened in the adapter.

---

## 7. Concrete examples

### 7.1 A standalone `ChartSpec` — grouped bar of trips by day (`device_trips`)

Two measures plotted side-by-side per day, vertical grouped bars, real member names, no variables (a self-contained chart file).

```json
{
  "schemaVersion": 1,
  "kind": "chart",
  "id": "chart_trips_by_day",
  "name": "Distance vs Idle by Day",
  "query": {
    "measures": ["device_trips.total_distance", "device_trips.total_idle_duration"],
    "timeDimensions": [
      {
        "dimension": "device_trips.start_time",
        "granularity": "day",
        "dateRange": "last 30 days"
      }
    ],
    "order": [["device_trips.start_time", "asc"]],
    "limit": 1000
  },
  "chart": {
    "family": "bar",
    "orientation": "vertical",
    "stackMode": "grouped",
    "mapping": {
      "category": { "member": "device_trips.start_time" },
      "series": {
        "mode": "measures",
        "members": ["device_trips.total_distance", "device_trips.total_idle_duration"],
        "meta": {
          "device_trips.total_distance":      { "label": "Distance",     "colorToken": "chart-1" },
          "device_trips.total_idle_duration": { "label": "Idle (time)",  "colorToken": "chart-2", "format": { "kind": "duration" } }
        }
      }
    },
    "legend": { "show": true, "position": "bottom" },
    "tooltip": { "show": true, "indicator": "dot" },
    "axes": { "x": { "label": "Day" }, "y": { "label": "Distance", "scale": "linear" } },
    "format": { "kind": "auto" }
  }
}
```

`total_distance` carries `meta.quantity` (distance) so it auto-labels in km/mi per `unitSystem`; `total_idle_duration` is `quantity:'time'`, so the explicit `format.kind:"duration"` renders `2d 19h` in tooltips/ticks.

### 7.2 A `DashboardSpec` — one date-range Input feeding two charts

A date-range Input writes the `dateRange` variable; both charts read it via `{var:"dateRange"}`. One canonical layout (min constraints only). Granularity is a second variable bound to a granularity control and the line chart's time dimension.

```json
{
  "schemaVersion": 1,
  "kind": "dashboard",
  "id": "dash_fleet_utilization",
  "name": "Fleet Utilization",
  "grid": { "cols": 12, "rowHeight": 40, "margin": [12, 12] },
  "variables": [
    { "name": "dateRange",   "type": "dateRange",   "label": "Date range", "default": "This month" },
    { "name": "granularity", "type": "granularity", "label": "Granularity", "default": "day" }
  ],
  "layout": [
    { "i": "w_controls", "x": 0, "y": 0, "w": 12, "h": 1, "minW": 4, "minH": 1 },
    { "i": "w_distance", "x": 0, "y": 1, "w": 6,  "h": 5, "minW": 3, "minH": 3 },
    { "i": "w_trips",    "x": 6, "y": 1, "w": 6,  "h": 5, "minW": 3, "minH": 3 }
  ],
  "widgets": [
    {
      "id": "w_controls",
      "type": "input",
      "title": "Filters",
      "control": {
        "variable": "dateRange",
        "control": { "kind": "dateRange", "allowFuture": false, "presets": ["This month", "last 30 days", "last quarter"] }
      }
    },
    {
      "id": "w_distance",
      "type": "chart",
      "title": "Total Distance Over Time",
      "query": {
        "measures": ["device_trips.total_distance"],
        "timeDimensions": [
          {
            "dimension": "device_trips.start_time",
            "granularity": { "var": "granularity" },
            "dateRange": { "var": "dateRange" }
          }
        ],
        "order": [["device_trips.start_time", "asc"]],
        "limit": 5000
      },
      "chart": {
        "family": "line",
        "mapping": {
          "category": { "member": "device_trips.start_time" },
          "series": {
            "mode": "measures",
            "members": ["device_trips.total_distance"],
            "meta": { "device_trips.total_distance": { "label": "Distance", "colorToken": "chart-1" } }
          }
        },
        "legend": { "show": false },
        "tooltip": { "show": true, "indicator": "line" }
      }
    },
    {
      "id": "w_trips",
      "type": "chart",
      "title": "Trip Count by Device",
      "query": {
        "measures": ["device_trips.count"],
        "dimensions": ["device_trips.device_id"],
        "timeDimensions": [
          { "dimension": "device_trips.start_time", "dateRange": { "var": "dateRange" } }
        ],
        "order": { "device_trips.count": "desc" },
        "limit": 10
      },
      "chart": {
        "family": "bar",
        "orientation": "horizontal",
        "stackMode": "none",
        "mapping": {
          "category": { "member": "device_trips.device_id" },
          "series": {
            "mode": "measures",
            "members": ["device_trips.count"],
            "meta": { "device_trips.count": { "label": "Trips", "colorToken": "chart-3" } }
          }
        },
        "legend": { "show": false },
        "tooltip": { "show": true, "indicator": "dot" }
      }
    }
  ]
}
```

**Reactive flow.** The `w_controls` Input writes `dateRange` → both `w_distance` and `w_trips` queries read `{var:"dateRange"}` and re-fetch. `w_distance` additionally reads `{var:"granularity"}` for its bucket size. If the user clears the date range, `noFilter` drops `dateRange` from both queries (and `granularity` from the line chart's grouping) — the charts fall back to all-time, ungrouped data rather than erroring, and RLS in the JWT still scopes every row to the tenant's `systemIds`.

---

## 8. Summary of the contract

| Concern | Contract | Why |
|---|---|---|
| Top-level kinds | `kind: "chart" \| "dashboard"`; widgets `type: "chart"\|"text"\|"input"` | Two discriminants separate persisted roots from embedded widgets |
| Validation | **zod** discriminated unions; `z.infer` is the type | One source of truth for guard + type |
| Versioning | integer `schemaVersion` + forward migration ladder, then zod-parse | Old specs always loadable; additive changes don't bump |
| Query | Cube `Query` passthrough + `{var}` token extension; verbatim `cube.member` names | Zero translation to `cube().load()`; future-proof |
| Chart family | one `family` + `orientation`/`stackMode` props | Inverts Embeddable's per-variant component explosion |
| Mapping | `SeriesMapping` (`mode:"measures"` \| `"pivot"`) | Library-agnostic data→visual seam |
| Colors | `chart-1..chart-5` tokens → `var(--chart-N)` | Theme/dark-mode swap with no spec edits |
| Layout | ONE canonical (widest) layout, `minW/minH` only | Reflow auto-derives all widths via RGL |
| Variables | declare in dashboard; WRITE via Input, READ via `{var}`, `noFilter` on empty | Fail-safe reactive contract; can't widen RLS |
| Adapter | `{ categories, series:[{key,label,data,colorToken,meta}], raw, empty }` | Single boundary; swapping Recharts touches only the renderer |
| RLS | **not in the spec** — JWT `securityContext.{systemIds,roles}` | Authors can never widen tenant scope |

This is the stable v1 contract. The chart-options agent fills `familyOptions` per family; the renderer maps `NormalizedChartData` + `ChartOptions` onto Recharts; the editor and preview server author and validate `Spec` objects. None of those layers can alter the shape above without a `schemaVersion` bump.