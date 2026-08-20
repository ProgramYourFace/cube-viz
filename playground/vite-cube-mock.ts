import type { Connect, Plugin } from "vite";

/**
 * DEV/CI-ONLY Vite plugin: an OFFLINE Cube REST API.
 *
 * This is the enabling piece for screenshots on a clean runner (no Cube server, no
 * secrets). Rather than hand-faking a `ResultSet` — which would bypass the very code
 * we want to photograph — it serves canned HTTP that the REAL `@cubejs-client/core`
 * consumes, so `createCubeClient` → `CubeApi.load()` → `ResultSet` → `normalize()` →
 * the family renderers all run exactly as they do against a live deployment.
 *
 *   client → /cubejs-api/v1/meta   → this plugin (a small fleet model)
 *   client → /cubejs-api/v1/load   → this plugin (rows synthesized FROM the query)
 *
 * ── Response shapes (verified against node_modules/@cubejs-client/core@1.6.60) ──
 *
 * `/load`: `CubeApi.loadResponseInternal()` reads `response.results.length`
 * UNCONDITIONALLY (dist/src/index.js) and hands the whole body to `new ResultSet()`,
 * whose constructor takes the `'queryType' in loadResponse` branch and sets
 * `loadResponses = loadResponse.results`. So the body MUST be the multi-result
 * envelope — `{ queryType, results: [{ query, data, annotation, … }], pivotQuery }` —
 * NOT a bare `{ query, data, annotation }` (that shape would throw on `.results`).
 * `queryType` must be one of `ResultSet.QUERY_TYPE` ("regularQuery" here) or the
 * constructor throws "Unknown query type".
 *
 * `/meta`: wrapped in `new Meta(body)`, which reads `body.cubes[].{measures,
 * dimensions,segments}` — hence every cube below carries all three arrays.
 *
 * Time buckets: `ResultSet.pivot()` fills missing dates from a client-side series
 * built by `TIME_SERIES[granularity]` (dist/src/time.js), whose day format is
 * `YYYY-MM-DDT00:00:00.000`. Rows therefore carry BOTH `trips.start_time` and
 * `trips.start_time.day` in exactly that format — the same pair real Cube returns —
 * so the buckets line up and values actually land on the chart.
 *
 * ── WHY THE MODEL IS THIS BIG ──
 *
 * A one-cube model cannot exercise the editor's cross-table code at all, and every
 * bug that only shows up on a real deployment hides in exactly that gap. So the model
 * below deliberately mirrors the shape of a real Cube project:
 *
 *  - FOUR fact/dimension cubes joined through `meta.joinTargets`, so the field picker
 *    renders its "Related tables" sections (`section.tag === "related"`, collapsed by
 *    default) rather than a single flat list;
 *  - SEVERAL time dimensions per cube, exactly one of them `meta.canonicalTime`, so
 *    the "default" date badge and the auto-filled time well are both exercised;
 *  - semantic `meta.group`s (Fuel / Safety / Location / Health) that deliberately MIX
 *    measures, plain dimensions, numeric dimensions and dates inside ONE group — the
 *    picker's group-fallback logic branches on precisely that;
 *  - `meta.unit` / `meta.quantity` on the measures (km, L, km/h, h, %) so the value
 *    axis' unit rule has something to accept and something to refuse;
 *  - model-authored `meta.geoPoint` / `meta.geoRole` coordinate pairs, which is how a
 *    real model publishes numeric dimensions that are ALSO a synthetic geo member;
 *  - a curated VIEW (`type: "view"`) with prefixed members, so the source control and
 *    the view-locked join scope have a second option to offer.
 *
 * DETERMINISM: no `Math.random`, no `Date.now`. Every measure value is a pure
 * function of (measure, dimension values, bucket index), and relative date ranges
 * resolve against a FIXED {@link TODAY}. Two runs produce byte-identical rows, which
 * is what makes the screenshots stable.
 */

const PREFIX = "/cubejs-api/v1";

/** The fixed "now" every relative date range ("last 28 days") resolves against. */
const TODAY = "2026-08-11";

/* ─────────────────────────────── the model ──────────────────────────────── */

interface MockMeasure {
  name: string;
  title: string;
  shortTitle: string;
  meta?: Record<string, unknown>;
  /** The plausible magnitude a synthesized value is scaled to (see measureValue). */
  scale?: number;
  /** A rate (speed, %, score): stays in a band around `scale` instead of ramping from 0. */
  rate?: boolean;
  /** Whole numbers only (counts, event tallies). */
  integer?: boolean;
}
interface MockDimension {
  name: string;
  title: string;
  shortTitle: string;
  type: "string" | "time" | "number";
  values?: string[];
  meta?: Record<string, unknown>;
}
interface MockCube {
  name: string;
  title: string;
  description: string;
  type: "cube" | "view";
  /** Cube's weak join component; every table here belongs to the one fleet graph. */
  connectedComponent: number;
  /** Direct outbound join edges — what `join-scope.ts` walks (it fails closed). */
  joinTargets?: string[];
  /** Field-atlas mount slug (cube meta.path) — groups tables under one heading. */
  path?: string;
  /** Human grain sentence (cube meta.grain) — "one row per trip". */
  grain?: string;
  measures: MockMeasure[];
  dimensions: MockDimension[];
}

/**
 * `trips` — the fact table every chart in the playground is anchored to. Its measures
 * and dimensions keep the names, titles and value ranges they had when this mock served
 * one cube, so the seeded specs and every screenshot of them are unchanged.
 */
const TRIPS: MockCube = {
  name: "trips",
  title: "Trips",
  description: "Fleet trip facts (offline mock)",
  type: "cube",
  connectedComponent: 1,
  path: "trips",
  grain: "one row per trip",
  joinTargets: ["devices", "drivers", "geofences"],
  measures: [
    { name: "trips.count", title: "Trips Count", shortTitle: "Trips", scale: 24, integer: true },
    {
      name: "trips.total_distance",
      title: "Trips Total Distance",
      shortTitle: "Distance",
      // The distance AGGREGATE FAMILY: total (default) + avg + the per-trip row value
      // below — the picker collapses all three into one row with an agg pill.
      meta: { unit: "km", quantity: "distance", group: "Trip metrics", family: "distance", agg: "total", aggDefault: true, familyTitle: "Distance" },
      scale: 310,
    },
    {
      name: "trips.avg_distance",
      title: "Trips Average Distance",
      shortTitle: "Avg distance",
      meta: { unit: "km", quantity: "distance", group: "Trip metrics", family: "distance", agg: "avg" },
      scale: 38,
      rate: true,
    },
    {
      name: "trips.fuel",
      title: "Trips Fuel Used",
      shortTitle: "Fuel",
      meta: { unit: "L", quantity: "volume", group: "Fuel", family: "fuel", agg: "total", aggDefault: true, familyTitle: "Fuel used" },
      scale: 46,
    },
    {
      name: "trips.avg_fuel",
      title: "Trips Average Fuel",
      shortTitle: "Avg fuel",
      meta: { unit: "L", quantity: "volume", group: "Fuel", family: "fuel", agg: "avg" },
      scale: 9,
      rate: true,
    },
    {
      name: "trips.avg_speed",
      title: "Trips Average Speed",
      shortTitle: "Avg speed",
      meta: { unit: "km/h", quantity: "speed", group: "Trip metrics" },
      scale: 52,
      rate: true,
    },
    {
      name: "trips.idle_fuel",
      title: "Trips Idle Fuel",
      shortTitle: "Idle fuel",
      // A SECOND volume measure: the value axis' unit rule needs both a field it
      // accepts alongside Fuel and fields it must refuse.
      meta: { unit: "L", quantity: "volume", group: "Fuel" },
      scale: 8,
    },
    {
      name: "trips.harsh_braking",
      title: "Trips Harsh Braking Events",
      shortTitle: "Harsh braking",
      meta: { group: "Safety" },
      scale: 6,
      integer: true,
    },
  ],
  dimensions: [
    {
      name: "trips.vehicle",
      title: "Trips Vehicle",
      shortTitle: "Vehicle",
      type: "string",
      values: ["Truck 1", "Truck 2", "Van A", "Van B", "Pickup"],
    },
    {
      name: "trips.region",
      title: "Trips Region",
      shortTitle: "Region",
      type: "string",
      values: ["North", "South", "West"],
      meta: { group: "Location" },
    },
    {
      name: "trips.fuel_grade",
      title: "Trips Fuel Grade",
      shortTitle: "Fuel grade",
      type: "string",
      values: ["Diesel", "Petrol", "Electric"],
      // Same semantic group as the `trips.fuel` MEASURE — a mixed-kind group.
      meta: { group: "Fuel" },
    },
    {
      name: "trips.risk_band",
      title: "Trips Risk Band",
      shortTitle: "Risk band",
      type: "string",
      values: ["Low", "Medium", "High"],
      meta: { group: "Safety" },
    },
    {
      name: "trips.distance",
      title: "Trips Distance",
      shortTitle: "Distance",
      type: "number",
      values: ["12.4", "48.1", "88.9"],
      // The family's row-level value — pill-labeled from the cube grain ("per trip").
      meta: { unit: "km", quantity: "distance", group: "Trip metrics", family: "distance", agg: "value" },
    },
    {
      name: "trips.start_lat",
      title: "Trips Start Latitude",
      shortTitle: "Start latitude",
      type: "number",
      values: ["51.5", "52.2", "53.4"],
      meta: { group: "Location", geoPoint: "Start point", geoRole: "latitude" },
    },
    {
      name: "trips.start_lng",
      title: "Trips Start Longitude",
      shortTitle: "Start longitude",
      type: "number",
      values: ["-0.12", "0.14", "-2.98"],
      meta: { group: "Location", geoPoint: "Start point", geoRole: "longitude" },
    },
    {
      name: "trips.start_time",
      title: "Trips Start Time",
      shortTitle: "Start time",
      type: "time",
      // The cube's primary event time — auto-filled into empty time wells by the editor.
      meta: { canonicalTime: true },
    },
    {
      name: "trips.end_time",
      title: "Trips End Time",
      shortTitle: "End time",
      type: "time",
    },
    {
      name: "trips.recorded_at",
      title: "Trips Recorded At",
      shortTitle: "Recorded at",
      type: "time",
      // A DATE inside a semantic group: "Safety" now mixes measure + dimension + date.
      meta: { group: "Safety" },
    },
  ],
};

const DEVICES: MockCube = {
  name: "devices",
  title: "Devices",
  description: "Telematics units installed in the fleet",
  type: "cube",
  connectedComponent: 1,
  path: "vehicle",
  grain: "one row per device",
  joinTargets: ["trips"],
  measures: [
    { name: "devices.count", title: "Devices Count", shortTitle: "Devices", scale: 12, integer: true },
    {
      name: "devices.avg_battery",
      title: "Devices Average Battery",
      shortTitle: "Avg battery",
      meta: { unit: "%", quantity: "ratio", group: "Health" },
      scale: 78,
      rate: true,
    },
    {
      name: "devices.uptime",
      title: "Devices Uptime",
      shortTitle: "Uptime",
      meta: { unit: "h", quantity: "time", group: "Health" },
      scale: 640,
    },
  ],
  dimensions: [
    {
      name: "devices.name",
      title: "Devices Name",
      shortTitle: "Device",
      type: "string",
      values: ["TU-1001", "TU-1002", "TU-1003"],
    },
    {
      name: "devices.model",
      title: "Devices Model",
      shortTitle: "Model",
      type: "string",
      values: ["LMU-3030", "LMU-4200"],
    },
    {
      name: "devices.firmware",
      title: "Devices Firmware",
      shortTitle: "Firmware",
      type: "string",
      values: ["2.4.1", "2.5.0"],
      meta: { group: "Health" },
    },
    {
      name: "devices.installed_at",
      title: "Devices Installed At",
      shortTitle: "Installed at",
      type: "time",
      meta: { canonicalTime: true },
    },
    {
      name: "devices.last_seen_at",
      title: "Devices Last Seen At",
      shortTitle: "Last seen",
      type: "time",
      meta: { group: "Health" },
    },
  ],
};

const DRIVERS: MockCube = {
  name: "drivers",
  title: "Drivers",
  description: "Driver roster and safety scoring",
  type: "cube",
  connectedComponent: 1,
  path: "people",
  grain: "one row per driver",
  joinTargets: ["trips"],
  measures: [
    { name: "drivers.count", title: "Drivers Count", shortTitle: "Drivers", scale: 18, integer: true },
    {
      name: "drivers.safety_score",
      title: "Drivers Safety Score",
      shortTitle: "Safety score",
      meta: { group: "Safety" },
      scale: 84,
      rate: true,
    },
    {
      name: "drivers.avg_shift",
      title: "Drivers Average Shift",
      shortTitle: "Avg shift",
      meta: { unit: "h", quantity: "time", group: "Shifts" },
      scale: 7.5,
      rate: true,
    },
  ],
  dimensions: [
    {
      name: "drivers.name",
      title: "Drivers Name",
      shortTitle: "Driver",
      type: "string",
      values: ["A. Novak", "B. Silva", "C. Weber"],
    },
    {
      name: "drivers.license_class",
      title: "Drivers License Class",
      shortTitle: "License class",
      type: "string",
      values: ["B", "C", "C+E"],
    },
    {
      name: "drivers.status",
      title: "Drivers Status",
      shortTitle: "Status",
      type: "string",
      values: ["Active", "On leave"],
      meta: { group: "Safety" },
    },
    {
      name: "drivers.hired_at",
      title: "Drivers Hired At",
      shortTitle: "Hired at",
      type: "time",
      meta: { canonicalTime: true },
    },
    {
      name: "drivers.shift_start",
      title: "Drivers Shift Start",
      shortTitle: "Shift start",
      type: "time",
      meta: { group: "Shifts" },
    },
  ],
};

const GEOFENCES: MockCube = {
  name: "geofences",
  title: "Geofences",
  description: "Named areas trips are matched against",
  type: "cube",
  connectedComponent: 1,
  path: "places",
  grain: "one row per place",
  joinTargets: ["trips"],
  measures: [
    { name: "geofences.count", title: "Geofences Count", shortTitle: "Geofences", scale: 9, integer: true },
    {
      name: "geofences.area",
      title: "Geofences Area",
      shortTitle: "Area",
      meta: { unit: "km²", quantity: "area", group: "Location" },
      scale: 34,
    },
  ],
  dimensions: [
    {
      name: "geofences.name",
      title: "Geofences Name",
      shortTitle: "Geofence",
      type: "string",
      values: ["Depot", "Port", "City centre"],
    },
    {
      name: "geofences.category",
      title: "Geofences Category",
      shortTitle: "Category",
      type: "string",
      values: ["Depot", "Customer", "Restricted"],
      meta: { group: "Location" },
    },
    {
      name: "geofences.center_lat",
      title: "Geofences Center Latitude",
      shortTitle: "Center latitude",
      type: "number",
      values: ["51.4", "52.0"],
      meta: { group: "Location", geoPoint: "Centre", geoRole: "latitude" },
    },
    {
      name: "geofences.center_lng",
      title: "Geofences Center Longitude",
      shortTitle: "Center longitude",
      type: "number",
      values: ["-0.2", "0.4"],
      meta: { group: "Location", geoPoint: "Centre", geoRole: "longitude" },
    },
    {
      name: "geofences.created_at",
      title: "Geofences Created At",
      shortTitle: "Created at",
      type: "time",
      meta: { canonicalTime: true },
    },
  ],
};

/**
 * A curated VIEW. Its members already carry the joined-cube prefix in `name` exactly
 * as Cube emits them for `prefix: true`, which is what the "read identifiers verbatim"
 * rule in `meta-helpers.ts` exists for.
 */
const TRIP_PERFORMANCE: MockCube = {
  name: "trip_performance",
  title: "Trip performance",
  description: "Curated trips × devices × drivers dataset",
  type: "view",
  connectedComponent: 1,
  measures: [
    {
      name: "trip_performance.total_distance",
      title: "Trip Performance Total Distance",
      shortTitle: "Distance",
      meta: { unit: "km", quantity: "distance", group: "Trip metrics" },
      scale: 310,
    },
    {
      name: "trip_performance.fuel",
      title: "Trip Performance Fuel Used",
      shortTitle: "Fuel",
      meta: { unit: "L", quantity: "volume", group: "Fuel" },
      scale: 46,
    },
    {
      name: "trip_performance.trips_count",
      title: "Trip Performance Trips Count",
      shortTitle: "Trips",
      scale: 24,
      integer: true,
    },
  ],
  dimensions: [
    {
      name: "trip_performance.region",
      title: "Trip Performance Region",
      shortTitle: "Region",
      type: "string",
      values: ["North", "South", "West"],
      meta: { group: "Location" },
    },
    {
      name: "trip_performance.devices_name",
      title: "Trip Performance Device",
      shortTitle: "Device",
      type: "string",
      values: ["TU-1001", "TU-1002", "TU-1003"],
    },
    {
      name: "trip_performance.drivers_name",
      title: "Trip Performance Driver",
      shortTitle: "Driver",
      type: "string",
      values: ["A. Novak", "B. Silva", "C. Weber"],
    },
    {
      name: "trip_performance.start_time",
      title: "Trip Performance Start Time",
      shortTitle: "Start time",
      type: "time",
      meta: { canonicalTime: true },
    },
  ],
};

const CUBES: MockCube[] = [TRIPS, DEVICES, DRIVERS, GEOFENCES, TRIP_PERFORMANCE];

const MEASURES: MockMeasure[] = CUBES.flatMap((c) => c.measures);
const DIMENSIONS: MockDimension[] = CUBES.flatMap((c) => c.dimensions);

const MEASURE_BY_NAME = new Map(MEASURES.map((m) => [m.name, m]));
const DIMENSION_BY_NAME = new Map(DIMENSIONS.map((d) => [d.name, d]));

/** The `/meta` payload, shaped as Cube's `MetaResponse`. */
function metaResponse(): unknown {
  return {
    cubes: CUBES.map((c) => ({
      name: c.name,
      title: c.title,
      description: c.description,
      type: c.type,
      public: true,
      connectedComponent: c.connectedComponent,
      ...(c.joinTargets || c.path || c.grain
        ? {
            meta: {
              ...(c.joinTargets ? { joinTargets: c.joinTargets } : {}),
              ...(c.path ? { path: c.path } : {}),
              ...(c.grain ? { grain: c.grain } : {}),
            },
          }
        : {}),
      measures: c.measures.map((m) => ({
        name: m.name,
        title: m.title,
        shortTitle: m.shortTitle,
        type: "number",
        aggType: m.name.endsWith(".count") ? "count" : "number",
        cumulative: false,
        cumulativeTotal: false,
        drillMembers: [],
        drillMembersGrouped: { measures: [], dimensions: [] },
        isVisible: true,
        public: true,
        ...(m.meta ? { meta: m.meta } : {}),
      })),
      dimensions: c.dimensions.map((d) => ({
        name: d.name,
        title: d.title,
        shortTitle: d.shortTitle,
        type: d.type,
        suggestFilterValues: true,
        isVisible: true,
        public: true,
        ...(d.meta ? { meta: d.meta } : {}),
      })),
      segments: [],
      folders: [],
      nestedFolders: [],
      hierarchies: [],
    })),
  };
}

/* ───────────────────────── deterministic value engine ────────────────────── */

/** FNV-1a — a stable string hash. Same input ⇒ same output, forever. */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** A stable [0,1) from a seed string. */
function unit(seed: string): number {
  return hash(seed) / 0x100000000;
}

/**
 * The value of `measure` for one (dimension-combination, bucket-index) cell. A smooth
 * seasonal wave (so lines/areas have shape) plus a stable per-cell wobble (so the
 * series aren't identical), scaled into the measure's plausible range (the declared
 * `scale`; a `rate` measure stays in a band around it rather than ramping from zero).
 */
function measureValue(measure: string, key: string, index: number): number {
  const phase = unit(`${measure}|${key}|phase`) * Math.PI * 2;
  const wave = Math.sin(index / 3.1 + phase) * 0.55 + Math.sin(index / 1.3 + phase * 2) * 0.2;
  const wobble = unit(`${measure}|${key}|${index}`) * 0.3 - 0.15;
  const shape = 1 + wave + wobble; // ~[0, 2]

  const spec = MEASURE_BY_NAME.get(measure);
  const scale = spec?.scale ?? 100;
  if (spec?.integer) return Math.max(1, Math.round(scale * shape));
  // A rate is a level, not a total: keep it in a believable band around its scale.
  const raw = spec?.rate ? scale + scale * 0.27 * (shape - 1) : scale * shape;
  return Math.round(raw * 10) / 10;
}

/* ──────────────────────────── time bucket series ─────────────────────────── */

type Granularity = "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year";

const pad = (n: number, w = 2): string => String(n).padStart(w, "0");

/**
 * Format an epoch-ms as Cube's LOCAL-ISO bucket label. The client's `TIME_SERIES`
 * formats with dayjs in local time; we do all arithmetic on UTC components and only
 * ever emit whole days/hours, so the two agree in any timezone (the label is a plain
 * calendar string, never re-parsed with an offset).
 */
function fmtBucket(ms: number, granularity: Granularity): string {
  const d = new Date(ms);
  const date = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  if (granularity === "hour") return `${date}T${pad(d.getUTCHours())}:00:00.000`;
  if (granularity === "minute") return `${date}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:00.000`;
  if (granularity === "second") {
    return `${date}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}.000`;
  }
  return `${date}T00:00:00.000`;
}

const DAY_MS = 86_400_000;

/** Parse `YYYY-MM-DD` (or a longer ISO string) into epoch-ms at UTC midnight. */
function parseDay(s: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (!m) return Date.parse(`${TODAY}T00:00:00Z`);
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/**
 * Resolve a Cube `dateRange` — `[from, to]`, a relative string ("last 28 days",
 * "this year", "today"), or absent — to `[fromMs, toMs]` against the fixed
 * {@link TODAY}. Absent ⇒ the last 28 days, so a granularity-only query still draws.
 */
function resolveRange(dateRange: unknown): [number, number] {
  const today = parseDay(TODAY);
  if (Array.isArray(dateRange) && dateRange.length === 2) {
    return [parseDay(String(dateRange[0])), parseDay(String(dateRange[1]))];
  }
  if (typeof dateRange === "string") {
    const rel = /^last\s+(\d+)\s+(day|days|week|weeks|month|months|year|years)$/i.exec(dateRange.trim());
    if (rel) {
      const n = Number(rel[1]);
      const unitName = rel[2].toLowerCase();
      const days = unitName.startsWith("day")
        ? n
        : unitName.startsWith("week")
          ? n * 7
          : unitName.startsWith("month")
            ? n * 30
            : n * 365;
      return [today - (days - 1) * DAY_MS, today];
    }
    const lower = dateRange.trim().toLowerCase();
    if (lower === "today") return [today, today];
    if (lower === "yesterday") return [today - DAY_MS, today - DAY_MS];
    if (lower === "this week") return [today - 6 * DAY_MS, today];
    if (lower === "this month") {
      const d = new Date(today);
      return [Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1), today];
    }
    if (lower === "this year") {
      const d = new Date(today);
      return [Date.UTC(d.getUTCFullYear(), 0, 1), today];
    }
  }
  return [today - 27 * DAY_MS, today];
}

/** The bucket labels for one time dimension — the server-side mirror of `TIME_SERIES`. */
function timeBuckets(granularity: Granularity, dateRange: unknown): string[] {
  const [from, to] = resolveRange(dateRange);
  const out: string[] = [];
  const cap = 400; // a runaway guard; charts never need more

  if (granularity === "hour" || granularity === "minute" || granularity === "second") {
    const step = granularity === "hour" ? 3_600_000 : granularity === "minute" ? 60_000 : 1_000;
    // Sub-day granularities cover the LAST day of the range so the count stays sane.
    const start = Math.max(from, to - DAY_MS + step);
    for (let t = start; t <= to + DAY_MS - step && out.length < cap; t += step) {
      out.push(fmtBucket(t, granularity));
    }
    return out;
  }

  if (granularity === "day") {
    for (let t = from; t <= to && out.length < cap; t += DAY_MS) out.push(fmtBucket(t, granularity));
    return out;
  }

  if (granularity === "week") {
    // dayjs' internal locale sets weekStart = Monday.
    const d = new Date(from);
    const dow = (d.getUTCDay() + 6) % 7; // 0 = Monday
    for (let t = from - dow * DAY_MS; t <= to && out.length < cap; t += 7 * DAY_MS) {
      out.push(fmtBucket(t, granularity));
    }
    return out;
  }

  const start = new Date(from);
  const end = new Date(to);
  if (granularity === "month" || granularity === "quarter") {
    const step = granularity === "quarter" ? 3 : 1;
    let y = start.getUTCFullYear();
    let m = granularity === "quarter" ? Math.floor(start.getUTCMonth() / 3) * 3 : start.getUTCMonth();
    while ((y < end.getUTCFullYear() || (y === end.getUTCFullYear() && m <= end.getUTCMonth())) && out.length < cap) {
      out.push(fmtBucket(Date.UTC(y, m, 1), granularity));
      m += step;
      while (m > 11) {
        m -= 12;
        y += 1;
      }
    }
    return out;
  }

  for (let y = start.getUTCFullYear(); y <= end.getUTCFullYear() && out.length < cap; y++) {
    out.push(fmtBucket(Date.UTC(y, 0, 1), granularity));
  }
  return out;
}

/* ──────────────────────────── the /load synthesizer ──────────────────────── */

interface TimeDimensionReq {
  dimension: string;
  granularity?: Granularity;
  dateRange?: unknown;
}
interface LoadQuery {
  measures?: string[];
  dimensions?: string[];
  timeDimensions?: TimeDimensionReq[];
  filters?: unknown[];
  limit?: number | null;
  order?: unknown;
  timezone?: string;
  [k: string]: unknown;
}

/** Cartesian product of the requested dimensions' canned value lists. */
function dimensionCombos(dimensions: string[]): Array<Record<string, string>> {
  let combos: Array<Record<string, string>> = [{}];
  for (const name of dimensions) {
    const values = DIMENSION_BY_NAME.get(name)?.values ?? ["A", "B", "C"];
    const next: Array<Record<string, string>> = [];
    for (const combo of combos) for (const v of values) next.push({ ...combo, [name]: v });
    combos = next;
  }
  return combos;
}

/** Synthesize the `data` rows for a query — deterministic, query-shaped. */
function synthesizeRows(query: LoadQuery): Array<Record<string, unknown>> {
  const measures = (query.measures ?? []).filter((m) => typeof m === "string");
  // Time dimensions WITHOUT a granularity are a date filter only — they never bucket.
  const timeDims = (query.timeDimensions ?? []).filter((td) => Boolean(td?.granularity));
  const plainDims = (query.dimensions ?? []).filter((d) => typeof d === "string");

  const td = timeDims[0];
  const buckets = td ? timeBuckets(td.granularity as Granularity, td.dateRange) : [undefined];
  const combos = dimensionCombos(plainDims);

  const rows: Array<Record<string, unknown>> = [];
  for (const combo of combos) {
    const comboKey = plainDims.map((d) => `${d}=${combo[d]}`).join("&") || "all";
    buckets.forEach((bucket, index) => {
      const row: Record<string, unknown> = { ...combo };
      if (td && bucket !== undefined) {
        // Real Cube returns BOTH the bare member and the granularity-suffixed member.
        row[td.dimension] = bucket;
        row[`${td.dimension}.${td.granularity}`] = bucket;
      }
      for (const m of measures) row[m] = measureValue(m, comboKey, index);
      rows.push(row);
    });
  }

  const limit = typeof query.limit === "number" && query.limit > 0 ? query.limit : 5000;
  return rows.slice(0, limit);
}

/** The `annotation` block for exactly the members this query asked for. */
function annotationFor(query: LoadQuery): unknown {
  const measures: Record<string, unknown> = {};
  for (const name of query.measures ?? []) {
    const m = MEASURE_BY_NAME.get(name);
    measures[name] = {
      title: m?.title ?? name,
      shortTitle: m?.shortTitle ?? name,
      type: "number",
      ...(m?.meta ? { meta: m.meta } : {}),
    };
  }

  const dimensions: Record<string, unknown> = {};
  for (const name of query.dimensions ?? []) {
    const d = DIMENSION_BY_NAME.get(name);
    dimensions[name] = {
      title: d?.title ?? name,
      shortTitle: d?.shortTitle ?? name,
      type: d?.type ?? "string",
      ...(d?.meta ? { meta: d.meta } : {}),
    };
  }

  const timeDimensions: Record<string, unknown> = {};
  for (const td of query.timeDimensions ?? []) {
    const d = DIMENSION_BY_NAME.get(td.dimension);
    const entry = {
      title: d?.title ?? td.dimension,
      shortTitle: d?.shortTitle ?? td.dimension,
      type: "time",
      ...(d?.meta ? { meta: d.meta } : {}),
    };
    timeDimensions[td.dimension] = entry;
    if (td.granularity) timeDimensions[`${td.dimension}.${td.granularity}`] = entry;
  }

  return { measures, dimensions, segments: {}, timeDimensions };
}

/**
 * The full `/load` envelope. Mirrors Cube's own multi-result response so the SDK's
 * `loadResponseInternal` + `ResultSet` constructor take their normal paths.
 */
function loadResponse(query: LoadQuery): unknown {
  const data = synthesizeRows(query);
  // Real Cube NORMALIZES a relative dateRange string ("last 30 days") into a
  // concrete [from, to] pair in the echoed response query — and
  // @cubejs-client/core's ResultSet.timeSeries RELIES on that (it calls
  // `dateRange.find(...)`, which throws on a string). Echoing the raw query
  // verbatim crashed every chart whose time axis used a relative range.
  const echoed = {
    ...query,
    ...(Array.isArray(query.timeDimensions) && query.timeDimensions.length
      ? {
          timeDimensions: query.timeDimensions.map((td) => {
            if (!td || td.dateRange === undefined || Array.isArray(td.dateRange)) return td;
            const [from, to] = resolveRange(td.dateRange);
            const iso = (t: number): string => new Date(t).toISOString().slice(0, 10);
            return { ...td, dateRange: [`${iso(from)}T00:00:00.000`, `${iso(to)}T23:59:59.999`] };
          }),
        }
      : {}),
  };
  return {
    queryType: "regularQuery",
    results: [
      {
        query: echoed,
        data,
        annotation: annotationFor(query),
        lastRefreshTime: `${TODAY}T00:00:00.000Z`,
        refreshKeyValues: [],
        usedPreAggregations: {},
        transformedQuery: null,
        requestId: "cube-viz-mock",
        external: false,
        dbType: "mock",
        extDbType: "mock",
        slowQuery: false,
        total: null,
      },
    ],
    pivotQuery: { ...echoed, queryType: "regularQuery" },
    slowQuery: false,
  };
}

/* ─────────────────────────────── the plugin ──────────────────────────────── */

/** Read a JSON request body (POST path); `{}` when absent or unparsable. */
async function readJsonBody(req: Connect.IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<string, unknown>;
  } catch {
    return {};
  }
}

/** Pull the `query` param out of a GET query string (`?query=<json>&queryType=multi`). */
function queryFromSearch(url: string): LoadQuery {
  const qs = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
  const params = new URLSearchParams(qs);
  const raw = params.get("query");
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as LoadQuery | LoadQuery[];
    return Array.isArray(parsed) ? (parsed[0] ?? {}) : parsed;
  } catch {
    return {};
  }
}

/**
 * True when the offline mock should serve `/cubejs-api/v1`: no real Cube credentials
 * in the environment (the {@link cubeDevProxy} path), or `CUBE_MOCK=1` forcing it on
 * (what `scripts/shots.mjs` sets, so screenshots never depend on a developer's `.env`).
 */
export function cubeMockEnabled(): boolean {
  if (process.env.CUBE_MOCK === "1") return true;
  return !(process.env.CUBE_API_URL && process.env.CUBE_API_SECRET);
}

export function cubeMock(): Plugin {
  return {
    name: "cube-viz-offline-mock",
    apply: "serve",
    configureServer(server) {
      if (!cubeMockEnabled()) {
        server.config.logger.info("[cube-mock] real Cube env present — offline mock disabled.");
        return;
      }
      server.config.logger.info(`[cube-mock] offline Cube API serving ${PREFIX}/{meta,load}`);

      server.middlewares.use(PREFIX, (req, res, next) => {
        const path = (req.url ?? "/").split("?")[0].replace(/\/$/, "") || "/";

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        const json = (body: unknown): void => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "no-store");
          res.end(JSON.stringify(body));
        };

        if (path === "/meta") {
          json(metaResponse());
          return;
        }

        if (path === "/load" || path === "/subscribe" || path === "/dry-run") {
          void (async () => {
            const query =
              req.method === "POST"
                ? (((await readJsonBody(req)).query as LoadQuery | LoadQuery[] | undefined) ?? {})
                : queryFromSearch(req.url ?? "");
            const one = (Array.isArray(query) ? (query[0] ?? {}) : query) as LoadQuery;
            if (path === "/dry-run") {
              json({
                queryType: "regularQuery",
                normalizedQueries: [one],
                pivotQuery: { ...one, queryType: "regularQuery" },
                queryOrder: [],
                transformedQueries: [],
              });
              return;
            }
            json(loadResponse(one));
          })();
          return;
        }

        next();
      });
    },
  };
}
