import * as React from "react";
import { MapPin } from "lucide-react";
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

import { useCubeVizContext } from "@/provider/context";

import type { ChartComponentProps } from "./types";
import type { MapFamilyOptions } from "./defaults";

/**
 * `map` — renders Cube query ROWS on a Google Map (docs/02-chart-options.md §2.8).
 * Unlike the Recharts families it consumes `raw.rows` directly, projecting a
 * `(lat,lng)` per row from members named in `familyOptions`, and reads the Google
 * Maps key/mapId from the {@link useCubeVizContext} `maps` config (host-injected —
 * NEVER hardcoded). Three modes:
 *   - points:  one marker per row, colored by `series`.
 *   - paths:   one polyline per series, vertices ordered by `time`.
 *   - heatmap: a weighted HeatmapLayer (`weight` member, default 1).
 *
 * Degrades GRACEFULLY: no api key → a centered placeholder; no lat/lng → a
 * "pick a field" placeholder; zero/invalid rows → an empty placeholder. It never
 * crashes, so the playground (which has no key) renders the placeholder cleanly.
 */
export function MapChartFamily({ data, options }: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as MapFamilyOptions;
  const { maps } = useCubeVizContext();

  const mode = fo.mode ?? "points";
  const rows = data.raw.rows;

  // Project every row to a {lat,lng,...} point, skipping non-numeric coordinates.
  const points = React.useMemo<MapPoint[]>(() => {
    if (!fo.lat || !fo.lng) return [];
    return projectPoints(rows, fo);
  }, [rows, fo]);

  // ── graceful placeholders (never crash) ─────────────────────────────────────
  if (!maps?.apiKey) {
    return <Placeholder>Add a Google Maps API key to render the map</Placeholder>;
  }
  if (!fo.lat || !fo.lng) {
    return <Placeholder>Pick a latitude and longitude field</Placeholder>;
  }
  if (points.length === 0) {
    return <Placeholder>No map data</Placeholder>;
  }

  const bounds = boundsOf(points);
  const center = bounds ? centerOf(bounds) : { lat: 0, lng: 0 };
  const seriesColors = buildSeriesColors(points);

  return (
    <div className="cv:h-full cv:w-full cv:min-h-[200px] cv:overflow-hidden cv:rounded-md">
      <APIProvider apiKey={maps.apiKey} libraries={["visualization", "marker"]}>
        <GoogleMap
          mapId={maps.mapId}
          defaultCenter={center}
          defaultZoom={fo.zoom ?? 4}
          gestureHandling="greedy"
          disableDefaultUI
          zoomControl
          style={{ width: "100%", height: "100%" }}
        >
          <FitBounds bounds={bounds} />
          {mode === "points" && (
            <PointsLayer points={points} colors={seriesColors} mapId={maps.mapId} />
          )}
          {mode === "paths" && <PathsLayer points={points} colors={seriesColors} fo={fo} />}
          {mode === "heatmap" && <HeatmapLayer points={points} fo={fo} />}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}

/* ─────────────────────────────── point model ─────────────────────────────── */

interface MapPoint {
  lat: number;
  lng: number;
  weight: number;
  series: string;
  /** Raw order-by value (usually time) for path ordering; falls back to row index. */
  order: number | string | undefined;
  /** Original row index — the stable tiebreak / fallback order. */
  index: number;
}

/** Project rows → numeric points, skipping rows with missing/non-numeric coords. */
function projectPoints(rows: Record<string, unknown>[], fo: MapFamilyOptions): MapPoint[] {
  const out: MapPoint[] = [];
  rows.forEach((row, index) => {
    const lat = num(row[fo.lat as string]);
    const lng = num(row[fo.lng as string]);
    if (lat === null || lng === null) return;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return;
    out.push({
      lat,
      lng,
      weight: fo.weight ? (num(row[fo.weight]) ?? 1) : 1,
      series: fo.series ? String(row[fo.series] ?? "—") : "",
      order: fo.time ? (row[fo.time] as number | string | undefined) : undefined,
      index,
    });
  });
  return out;
}

/* ─────────────────────────────── color ramp ──────────────────────────────── */

// The map's polyline/heatmap/markers render on a Google-owned canvas/DOM subtree
// where CSS custom properties (`--chart-N`) don't reliably resolve, so map layers
// use literal hex mirroring the brand ramp (tokens.css chart-1..5).
const MAP_RAMP = ["#008079", "#d9a300", "#2f7de1", "#7c3aed", "#e2533f"] as const;
const HEATMAP_GRADIENT = [
  "rgba(0,128,121,0)",
  "rgba(0,128,121,0.6)",
  "rgba(47,125,225,0.7)",
  "rgba(217,163,0,0.85)",
  "rgba(226,83,63,1)",
];

/** Stable series-name → hex color map (insertion order = ramp order). */
function buildSeriesColors(points: MapPoint[]): Map<string, string> {
  const colors = new Map<string, string>();
  for (const p of points) {
    if (!colors.has(p.series)) {
      colors.set(p.series, MAP_RAMP[colors.size % MAP_RAMP.length]);
    }
  }
  return colors;
}

/* ───────────────────────────────── layers ────────────────────────────────── */

/** Imperatively fit the map viewport to the data extent on mount / bounds change. */
function FitBounds({ bounds }: { bounds: Bounds | null }): null {
  const map = useMap();
  React.useEffect(() => {
    if (!map || !bounds) return;
    const ll = new google.maps.LatLngBounds(
      { lat: bounds.minLat, lng: bounds.minLng },
      { lat: bounds.maxLat, lng: bounds.maxLng },
    );
    // A single point yields a zero-area bounds → keep a sensible zoom rather than
    // slamming to max. fitBounds with padding handles the multi-point case.
    if (bounds.minLat === bounds.maxLat && bounds.minLng === bounds.maxLng) {
      map.setCenter({ lat: bounds.minLat, lng: bounds.minLng });
    } else {
      map.fitBounds(ll, 24);
    }
  }, [map, bounds]);
  return null;
}

/** One marker per row. Uses an AdvancedMarker pin (mapId present) else a fallback dot. */
function PointsLayer({
  points,
  colors,
  mapId,
}: {
  points: MapPoint[];
  colors: Map<string, string>;
  mapId?: string;
}): React.ReactElement {
  // AdvancedMarker requires a mapId; without one fall back to plain DOM overlays via
  // the marker library is overkill — render small colored dots through AdvancedMarker
  // only when a mapId exists, else a circle layer (works on any map).
  if (mapId) {
    return (
      <>
        {points.map((p) => (
          <AdvancedMarker key={p.index} position={{ lat: p.lat, lng: p.lng }}>
            <Dot color={colors.get(p.series) ?? MAP_RAMP[0]} />
          </AdvancedMarker>
        ))}
      </>
    );
  }
  return <CircleMarkers points={points} colors={colors} />;
}

/** A small colored dot used as the AdvancedMarker content. */
function Dot({ color }: { color: string }): React.ReactElement {
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "9999px",
        backgroundColor: color,
        border: "2px solid white",
        boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
      }}
    />
  );
}

/** Plain `google.maps.Circle` markers — works WITHOUT a mapId (no Advanced Markers). */
function CircleMarkers({
  points,
  colors,
}: {
  points: MapPoint[];
  colors: Map<string, string>;
}): null {
  const map = useMap();
  React.useEffect(() => {
    if (!map) return;
    const circles = points.map(
      (p) =>
        new google.maps.Circle({
          map,
          center: { lat: p.lat, lng: p.lng },
          radius: 600,
          strokeColor: colors.get(p.series) ?? MAP_RAMP[0],
          strokeWeight: 1,
          fillColor: colors.get(p.series) ?? MAP_RAMP[0],
          fillOpacity: 0.7,
        }),
    );
    return () => circles.forEach((c) => c.setMap(null));
  }, [map, points, colors]);
  return null;
}

/** One polyline per series, vertices ordered by the `time` member (else row order). */
function PathsLayer({
  points,
  colors,
  fo,
}: {
  points: MapPoint[];
  colors: Map<string, string>;
  fo: MapFamilyOptions;
}): null {
  const map = useMap();
  React.useEffect(() => {
    if (!map) return;
    const bySeries = groupBySeries(points);
    const lines: google.maps.Polyline[] = [];
    for (const [series, pts] of bySeries) {
      const ordered = [...pts].sort(orderComparator(Boolean(fo.time)));
      const line = new google.maps.Polyline({
        map,
        path: ordered.map((p) => ({ lat: p.lat, lng: p.lng })),
        strokeColor: colors.get(series) ?? MAP_RAMP[0],
        strokeWeight: 3,
        strokeOpacity: 0.9,
      });
      lines.push(line);
    }
    return () => lines.forEach((l) => l.setMap(null));
  }, [map, points, colors, fo.time]);
  return null;
}

/**
 * A weighted `google.maps.visualization.HeatmapLayer`. The bundled `@types/google.maps`
 * carries only a stubbed (deprecated) HeatmapLayer signature, so the runtime
 * options/`setMap` calls are routed through a narrow local interface rather than the
 * stale type — the live `visualization` library still supports them.
 */
interface HeatmapCtor {
  new (opts: {
    map: google.maps.Map;
    radius?: number;
    gradient?: string[];
    data: { location: google.maps.LatLng; weight: number }[];
  }): { setMap(map: google.maps.Map | null): void };
}

function HeatmapLayer({ points, fo }: { points: MapPoint[]; fo: MapFamilyOptions }): null {
  const map = useMap();
  const viz = useMapsLibrary("visualization");
  React.useEffect(() => {
    if (!map || !viz) return;
    const Ctor = (viz as unknown as { HeatmapLayer: HeatmapCtor }).HeatmapLayer;
    const layer = new Ctor({
      map,
      radius: fo.heatmapRadius ?? 20,
      gradient: HEATMAP_GRADIENT,
      data: points.map((p) => ({
        location: new google.maps.LatLng(p.lat, p.lng),
        weight: p.weight,
      })),
    });
    return () => layer.setMap(null);
  }, [map, viz, points, fo.heatmapRadius]);
  return null;
}

/* ──────────────────────────────── geometry ───────────────────────────────── */

interface Bounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

function boundsOf(points: MapPoint[]): Bounds | null {
  if (points.length === 0) return null;
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const p of points) {
    if (p.lat < minLat) minLat = p.lat;
    if (p.lat > maxLat) maxLat = p.lat;
    if (p.lng < minLng) minLng = p.lng;
    if (p.lng > maxLng) maxLng = p.lng;
  }
  return { minLat, maxLat, minLng, maxLng };
}

function centerOf(b: Bounds): google.maps.LatLngLiteral {
  return { lat: (b.minLat + b.maxLat) / 2, lng: (b.minLng + b.maxLng) / 2 };
}

function groupBySeries(points: MapPoint[]): Map<string, MapPoint[]> {
  const out = new Map<string, MapPoint[]>();
  for (const p of points) {
    const list = out.get(p.series) ?? [];
    list.push(p);
    out.set(p.series, list);
  }
  return out;
}

/** Sort by the `time`/order member when present, else by stable row index. */
function orderComparator(hasTime: boolean): (a: MapPoint, b: MapPoint) => number {
  return (a, b) => {
    if (hasTime) {
      const av = orderValue(a.order);
      const bv = orderValue(b.order);
      if (av !== bv) return av < bv ? -1 : 1;
    }
    return a.index - b.index;
  };
}

/** Normalize an order value to a comparable number (date string → epoch) or string. */
function orderValue(v: number | string | undefined): number | string {
  if (v === undefined || v === null) return Number.POSITIVE_INFINITY;
  if (typeof v === "number") return v;
  const t = Date.parse(v);
  return Number.isNaN(t) ? v : t;
}

/* ──────────────────────────────── chrome ─────────────────────────────────── */

/** Centered muted placeholder — mirrors the renderer's empty-state convention. */
function Placeholder({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:flex-col cv:items-center cv:justify-center cv:gap-2 cv:rounded-md cv:border cv:border-dashed cv:border-border cv:bg-muted/30 cv:p-4 cv:text-center">
      <MapPin className="cv:size-6 cv:text-muted-foreground/60" />
      <p className="cv:text-sm cv:text-muted-foreground">{children}</p>
    </div>
  );
}

function num(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
