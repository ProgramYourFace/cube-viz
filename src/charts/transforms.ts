import type { ChartTransform, TransformKind } from "@/spec";
import { DEFAULT_TRANSFORM_WINDOW } from "@/spec";
import type {
  NormalizedChartData,
  NormalizedSeries,
  SeriesValueMeta,
} from "@/adapter/types";
import type { ChartFormat, FormatRole } from "@/format";

// Type-only — no runtime edge into the descriptor table (which pulls in every family
// component), so this module stays a pure leaf importable from tests and the editor.
import type { ChartFamilyDescriptor } from "./familyDescriptors";

/**
 * PRESENTATION transforms (spec: `chart.transform`).
 *
 * TanStack Charts deliberately keeps presentational reshaping in the view layer while
 * the semantic layer (Cube) owns aggregation. Without this, "7-day rolling average",
 * "running total" and "% of total" each force a NEW Cube measure for what is purely a
 * display choice. One envelope option covers all three.
 *
 * Everything here is PURE and operates on the normalized
 * `{ categories, series[{ data }] }` shape — never on raw rows — so every cartesian
 * family gets it for free and no family file changes. `ChartRenderer` applies it once
 * before dispatch.
 */

/* ─────────────────────────────── applicability ───────────────────────────── */

/**
 * The families a transform is offered on: the CARTESIAN, mapping-driven ones
 * (bar / line / area — and any host family that declares both flags).
 *
 * Deliberately conservative. A transform reshapes values ALONG the category axis, so
 * it only means something where categories are an ordered, shared axis:
 *  - `kpi` renders a single aggregate — there is no category series to roll or sum.
 *  - `table` shows the raw rows; silently rewriting cells would misrepresent the data.
 *  - `pie` has no category ordering (rolling/cumulative are meaningless) and already
 *    shows shares, so `percentOfTotal` would be a no-op at best.
 *  - `scatter` has no `mapping`/category axis at all (x/y live in familyOptions).
 *  - `heatmap` is mapping-driven but NOT cartesian (both axes are band axes and the
 *    value is a color) — a rolling mean across columns would read as real data.
 *  - `map` / `ai` (host families) declare neither flag, so they are excluded too.
 */
export function familySupportsTransform(
  descriptor: Pick<
    ChartFamilyDescriptor,
    "supportsMapping" | "supportsCartesianAxes" | "queryless"
  > | undefined,
): boolean {
  if (!descriptor || descriptor.queryless) return false;
  return descriptor.supportsMapping && descriptor.supportsCartesianAxes;
}

/* ────────────────────────────── the transforms ───────────────────────────── */

/** Clamp the spec window to something usable (the schema already bounds it 2…90). */
function resolveWindow(window: number | undefined): number {
  const n = Math.floor(window ?? DEFAULT_TRANSFORM_WINDOW);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

/**
 * Trailing mean over `window` categories, per series.
 *
 * Leading positions with fewer than `window` samples average WHAT EXISTS rather than
 * emitting null — a leading gap in the line reads as broken data, not as "warming up".
 * Nulls are skipped in BOTH the sum and the count (so a gap doesn't drag the mean
 * toward zero); a window containing only nulls stays null.
 */
function rollingAvg(data: (number | null)[], window: number): (number | null)[] {
  const out: (number | null)[] = new Array(data.length);
  for (let i = 0; i < data.length; i++) {
    const from = Math.max(0, i - window + 1);
    let sum = 0;
    let count = 0;
    for (let j = from; j <= i; j++) {
      const v = data[j];
      if (v === null || v === undefined || !Number.isFinite(v)) continue;
      sum += v;
      count += 1;
    }
    out[i] = count === 0 ? null : sum / count;
  }
  return out;
}

/**
 * Running sum per series. Nulls accumulate as 0 (the total must not reset or jump),
 * but the OUTPUT stays null where the input was null — so a genuine gap remains
 * visible instead of being papered over with a flat carried-forward total.
 */
function cumulative(data: (number | null)[]): (number | null)[] {
  const out: (number | null)[] = new Array(data.length);
  let running = 0;
  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    if (v === null || v === undefined || !Number.isFinite(v)) {
      out[i] = null;
      continue;
    }
    running += v;
    out[i] = running;
  }
  return out;
}

/**
 * Each value as its share (0..1) of the CATEGORY total across series — the same
 * geometry the `percent` stackMode expands to, made explicit as data. A zero or
 * non-finite category total yields null for that whole category (no divide-by-zero
 * spikes); a null input stays null and contributes nothing to the total.
 */
function percentOfTotal(series: NormalizedSeries[], length: number): (number | null)[][] {
  const totals: number[] = new Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    let total = 0;
    for (const s of series) {
      const v = s.data[i];
      if (v === null || v === undefined || !Number.isFinite(v)) continue;
      total += v;
    }
    totals[i] = total;
  }
  return series.map((s) => {
    const out: (number | null)[] = new Array(length);
    for (let i = 0; i < length; i++) {
      const v = s.data[i];
      const total = totals[i]!;
      if (v === null || v === undefined || !Number.isFinite(v)) {
        out[i] = null;
        continue;
      }
      out[i] = !Number.isFinite(total) || total === 0 ? null : v / total;
    }
    return out;
  });
}

/* ─────────────────────────────── unit honesty ────────────────────────────── */

/**
 * A `percentOfTotal` series is NO LONGER in its measure's unit — it's a 0..1 ratio.
 * So the series meta is rewritten: the measure's `unit`/`quantity`/`convert` are
 * DROPPED (a "42%" suffixed with "km" is a lie, and unit conversion must not re-run)
 * and `format` becomes `{ kind: "percent" }`.
 *
 * `meta.measure` is KEPT deliberately: it still drives the axis TITLE and the tooltip
 * label ("Revenue"), which stay correct — only the value's unit changed.
 *
 * NOTE the mechanism: `ChartFormat` is built from the ANNOTATION + `options.format`
 * (see `format/chart-format.ts`) and does not read series meta, so this meta alone
 * would not change a single rendered tick. The rendered percent comes from
 * {@link transformedChartFormat}, which `ChartRenderer` wraps around the injected
 * formatter. The meta rewrite keeps the normalized data self-describing for any other
 * consumer (image export, a host family, debug) — the two travel together.
 */
function percentSeriesMeta(meta: SeriesValueMeta | undefined): SeriesValueMeta {
  const { unit: _unit, quantity: _quantity, convert: _convert, ...rest } = meta ?? {};
  return { ...rest, format: { kind: "percent", decimals: 0 } };
}

/**
 * The {@link ChartFormat} a transformed chart should render with. Only
 * `percentOfTotal` changes it: every value becomes a share, so ALL value surfaces
 * (axis ticks, tooltip, value labels, KPI) format as a percent regardless of the
 * member's unit. Category formatting is untouched.
 *
 * Mirrors `_shared.percentTick` (Intl `style:"percent"`, 0 fraction digits) so a
 * `percentOfTotal` chart reads identically to a `percent`-stacked one.
 */
export function transformedChartFormat(
  format: ChartFormat,
  transform: ChartTransform | undefined,
  locale?: string,
): ChartFormat {
  if (transform?.kind !== "percentOfTotal") return format;
  const pct = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 });
  return {
    ...format,
    value: (value: number | string | null | undefined, _member?: string, _role?: FormatRole) => {
      // `Number(null)` is 0, so a gap must be rejected BEFORE coercion (else a null
      // reads as a real "0%"). Mirrors percentTick's no-data convention: empty string.
      if (value === null || value === undefined || value === "") return "";
      const n = typeof value === "number" ? value : Number(value);
      return Number.isFinite(n) ? pct.format(n) : "";
    },
  };
}

/* ──────────────────────────────── entry point ────────────────────────────── */

/**
 * Apply a presentation `transform` to normalized chart data, returning NEW data.
 *
 * Series IDENTITY is preserved exactly — `key`, `label`, `colorToken` and `meta` are
 * carried through untouched; only `data` changes (plus, for `percentOfTotal`, the
 * unit-bearing fields of `meta`; see {@link percentSeriesMeta}). `categories`, `raw`
 * and `empty` pass through by reference.
 *
 * No transform, empty data, or no categories → the SAME object is returned, so the
 * caller's `useMemo` identity stays stable and non-transformed charts pay nothing.
 */
export function applyTransform(
  data: NormalizedChartData,
  transform: ChartTransform | undefined,
): NormalizedChartData {
  if (!transform) return data;
  if (data.empty || data.categories.length === 0 || data.series.length === 0) return data;

  const kind: TransformKind = transform.kind;
  const length = data.categories.length;

  if (kind === "percentOfTotal") {
    const shares = percentOfTotal(data.series, length);
    return {
      ...data,
      series: data.series.map((s, i) => ({
        ...s,
        data: shares[i]!,
        meta: percentSeriesMeta(s.meta),
      })),
    };
  }

  const window = resolveWindow(transform.window);
  return {
    ...data,
    series: data.series.map((s) => ({
      ...s,
      data: kind === "rollingAvg" ? rollingAvg(s.data, window) : cumulative(s.data),
    })),
  };
}
