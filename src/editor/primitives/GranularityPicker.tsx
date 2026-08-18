import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AUTO_GRANULARITY, GranularitySchema, type Granularity, type GranularityChoice } from "@/spec";
import { bindingSummary } from "../chart/binding/variable-binding";

const ALL_GRANULARITIES = GranularitySchema.options;

const GRANULARITY_LABELS: Record<Granularity, string> = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year",
};

/**
 * How a granularity slot reads when COLLAPSED (a popover trigger's summary).
 * The value may be a literal granularity, `"auto"`, or a `{var}` binding, so it goes
 * through {@link bindingSummary} — which is what keeps a bound value from reaching JSX
 * as a raw object and crashing the editor. Literals get their proper display name.
 */
export function granularitySummary(value: unknown, none = "None"): string {
  const summary = bindingSummary(value, none);
  if (summary === AUTO_GRANULARITY) return "Auto";
  return GRANULARITY_LABELS[summary as Granularity] ?? summary;
}

export interface GranularityPickerProps {
  value?: GranularityChoice;
  /**
   * `undefined` is only ever emitted when {@link GranularityPickerProps.allowNone} is
   * set — the "no bucket" choice, which is how a caller whose feature IS the bucket
   * (the KPI trend) turns the feature off without a second control.
   */
  onChange: (granularity: GranularityChoice | undefined) => void;
  /** Restrict the offered granularities (e.g. a time dimension's own list). */
  options?: Granularity[];
  /**
   * Offer "Auto" as the FIRST entry — the bucket follows the date range instead of
   * being pinned. What Auto currently resolves to may be named via {@link autoHint}.
   * Callers that write straight to a Cube query without passing the variable resolver
   * must leave this off (Cube itself does not understand "auto").
   */
  allowAuto?: boolean;
  /** The concrete bucket Auto resolves to right now (labels the entry "Auto (Day)"). */
  autoHint?: Granularity;
  /** Offer an explicit "none" entry, so clearing the bucket is a first-class choice. */
  allowNone?: boolean;
  /** What to call the "none" entry (defaults to "None"). */
  noneLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/** Sentinel: Radix Select forbids an empty-string item value, so "none" needs a token. */
const NONE = "__none__";

/**
 * Standard time-bucket granularity dropdown (`second…year`, optionally led by
 * "Auto"). The option list can be narrowed to a dimension's declared granularities;
 * otherwise all eight show.
 */
export function GranularityPicker({
  value,
  onChange,
  options,
  allowAuto,
  autoHint,
  allowNone,
  noneLabel = "None",
  placeholder = "Group dates by…",
  disabled,
  id,
  className,
}: GranularityPickerProps): React.ReactElement {
  const narrowed = options && options.length > 0 ? options : ALL_GRANULARITIES;
  // The CURRENT value always appears, even when it falls outside the narrowed set —
  // a stored spec may hold a bucket set before the range shrank, and dropping it from
  // the list would leave the trigger showing a placeholder over a value that is really
  // there. Narrowing steers the next choice; it does not hide the present one.
  const list =
    value && value !== AUTO_GRANULARITY && !narrowed.includes(value)
      ? [...narrowed, value].sort(
          (a, b) => ALL_GRANULARITIES.indexOf(a) - ALL_GRANULARITIES.indexOf(b),
        )
      : narrowed;
  const autoLabel = autoHint ? `Auto (${GRANULARITY_LABELS[autoHint]})` : "Auto";
  return (
    <Select
      // Always a string: `undefined` would make Radix treat the select as
      // UNCONTROLLED until a value arrives, and React warns the moment it flips
      // ("changing from uncontrolled to controlled"). "" is Radix's own
      // show-the-placeholder value (only ITEM values may not be empty).
      value={value ?? (allowNone ? NONE : "")}
      onValueChange={(v) => onChange(v === NONE ? undefined : (v as GranularityChoice))}
      disabled={disabled}
    >
      <SelectTrigger id={id} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allowNone ? <SelectItem value={NONE}>{noneLabel}</SelectItem> : null}
        {allowAuto ? <SelectItem value={AUTO_GRANULARITY}>{autoLabel}</SelectItem> : null}
        {list.map((g) => (
          <SelectItem key={g} value={g}>
            {GRANULARITY_LABELS[g]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
