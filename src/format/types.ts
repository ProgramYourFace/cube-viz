import type { FormatOptions, Granularity } from "@/spec";

/**
 * The host-pluggable value-formatting contract for cube-viz.
 *
 * cube-viz does NOT hardcode unit conversion (km→mi), duration humanization, or
 * quantity rules. Those are host policy: a host supplies a {@link ValueFormatter}
 * (via the provider's `locale.formatValue`) and the library ships only a MINIMAL
 * default ({@link import("./default").defaultFormatter}). Every layer — families,
 * axes, tooltips, KPIs, tables — formats through one resolved {@link ChartFormat}.
 *
 * See docs/02-chart-options.md §5 and docs/01-spec-schema.md §3.3.
 */

/** Where a value is being rendered. Lets a host vary formatting by surface. */
export type FormatRole = "value" | "axis" | "tooltip" | "label" | "category" | "kpi";

/**
 * Member-level metadata from the Cube annotation (`annotation().<bucket>.<member>.meta`).
 * `unit`/`quantity`/`convert` are the conventional keys cube-viz forwards, but the
 * shape is open so a host can read any custom meta its schema attaches.
 */
export interface MemberMeta {
  /** e.g. "km", "s", "%". Forwarded verbatim; the default appends it as a plain suffix. */
  unit?: string;
  /** e.g. "time", "ratio", "distance". Host policy may key conversion/duration off this. */
  quantity?: string;
  /** Host opt-in for unit conversion. The default NEVER converts regardless of this flag. */
  convert?: boolean;
  [k: string]: unknown;
}

/**
 * The full context handed to a {@link ValueFormatter}. It carries the raw value,
 * the member it belongs to (with its annotation meta + title), the rendering role,
 * the spec's {@link FormatOptions}, and the resolved locale/unit-system so a host
 * can implement any policy it likes without re-reading the annotation.
 */
export interface FormatContext {
  /** The raw value to format. */
  value: number | string | null | undefined;
  /** Fully-qualified Cube member (series key / measure / dimension / column), when known. */
  member?: string;
  /** Member meta from the Cube annotation. */
  meta?: MemberMeta;
  /** Member shortTitle/title from the annotation, for label-style formatting. */
  title?: string;
  /** The rendering surface. */
  role: FormatRole;
  /** The spec's resolved FormatOptions (decimals/abbreviate/prefix/suffix/dateFormat/kind…). */
  format?: FormatOptions;
  /** Granularity of a time-dimension category bucket, when applicable. */
  granularity?: Granularity;
  /** BCP-47 locale tag, e.g. "en-US". */
  locale?: string;
  /** Resolved host unit system; a host formatter keys conversion off this. */
  unitSystem?: "metric" | "imperial";
}

/** A host-pluggable value formatter: pure `(FormatContext) → string`. */
export type ValueFormatter = (ctx: FormatContext) => string;

/**
 * The bound, member-aware formatter every chart family consumes. Built by
 * {@link import("./chart-format").makeChartFormat} from a result annotation, the
 * resolved chart options, and a {@link ValueFormatter}. Families never read the
 * annotation or build a FormatContext themselves — they call these two methods.
 */
export interface ChartFormat {
  /**
   * Format a single value. Looks `member` up in the annotation for meta+title,
   * builds a {@link FormatContext} (with the options' `format`), and delegates to
   * the resolved {@link ValueFormatter}. `role` defaults to `"value"`.
   */
  value: (
    value: number | string | null | undefined,
    member?: string,
    role?: FormatRole,
  ) => string;
  /**
   * Format a category-axis label (role `"category"`), threading the time-dimension
   * granularity from the chart options/query when discoverable.
   */
  category: (value: string | number | null | undefined) => string;
}
