/**
 * Catalog of built-in date-range presets — the single source of truth shared by
 * the picker ({@link InputWidgetView} DateRangeControl) and its editor
 * (InputWidgetEditor's multiselect). Each `value` is a Cube relative-dateRange
 * string (Cube resolves it); `label` is the human label shown in the UI. The
 * stored `InputControl.dateRange.presets` is a subset of these `value`s.
 *
 * "last week/month/quarter/year" are the PREVIOUS complete period.
 */
export interface DateRangePreset {
  value: string;
  label: string;
}

export const DATE_RANGE_PRESETS: DateRangePreset[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "this week", label: "This week" },
  { value: "this month", label: "This month" },
  { value: "this quarter", label: "This quarter" },
  { value: "this year", label: "This year" },
  { value: "last 7 days", label: "Last 7 days" },
  { value: "last 30 days", label: "Last 30 days" },
  { value: "last 90 days", label: "Last 90 days" },
  { value: "last week", label: "Last week (previous)" },
  { value: "last month", label: "Last month (previous)" },
  { value: "last quarter", label: "Last quarter (previous)" },
  { value: "last year", label: "Last year (previous)" },
  { value: "last 6 months", label: "Last 6 months" },
  { value: "last 12 months", label: "Last 12 months" },
];

/** Map of value → label for quick lookups. */
export const PRESET_LABELS: Record<string, string> = Object.fromEntries(
  DATE_RANGE_PRESETS.map((p) => [p.value, p.label]),
);

/** Friendly label for a relative-range value (falls back to the raw string). */
export function presetLabel(value: string): string {
  return PRESET_LABELS[value.trim().toLowerCase()] ?? value;
}

/** The default set offered when a dateRange control declares no `presets`. */
export const DEFAULT_PRESETS: string[] = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year",
];
