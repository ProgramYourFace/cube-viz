/**
 * The cube-viz formatting layer (host-pluggable, docs/02-chart-options.md §5).
 *
 * The library does NOT hardcode unit conversion, duration humanization, or
 * quantity rules — a host supplies a {@link ValueFormatter} via the provider's
 * `locale.formatValue`, and the library ships a MINIMAL {@link defaultFormatter}.
 * Families format through one bound {@link ChartFormat} built by {@link makeChartFormat}.
 */

// The contract (types).
export type {
  FormatRole,
  MemberMeta,
  FormatContext,
  ValueFormatter,
  ChartFormat,
} from "./types";

// The minimal default formatter.
export { defaultFormatter, EM_DASH } from "./default";

// The member-aware binder every family consumes.
export { makeChartFormat } from "./chart-format";

// Internal date/category helpers (still used by the families until they migrate to
// ChartFormat) + the back-compat `makeFormatter` shim built on the default.
export { makeFormatter } from "./default";
export {
  makeDateFormatter,
  formatCategory,
  formatDateValue,
  datePattern,
  toDate,
  looksLikeIsoDate,
  GRANULARITY_PATTERN,
} from "./dates";
export type { FormatCategoryOptions } from "./dates";
