import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GranularitySchema, type Granularity } from "@/spec";

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

export interface GranularityPickerProps {
  value?: Granularity;
  /**
   * `undefined` is only ever emitted when {@link GranularityPickerProps.allowNone} is
   * set — the "no bucket" choice, which is how a caller whose feature IS the bucket
   * (the KPI trend) turns the feature off without a second control.
   */
  onChange: (granularity: Granularity | undefined) => void;
  /** Restrict the offered granularities (e.g. a time dimension's own list). */
  options?: Granularity[];
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
 * Standard time-bucket granularity dropdown (`second…year`). The option list can
 * be narrowed to a dimension's declared granularities; otherwise all eight show.
 */
export function GranularityPicker({
  value,
  onChange,
  options,
  allowNone,
  noneLabel = "None",
  placeholder = "Granularity…",
  disabled,
  id,
  className,
}: GranularityPickerProps): React.ReactElement {
  const list = options && options.length > 0 ? options : ALL_GRANULARITIES;
  return (
    <Select
      value={value ?? (allowNone ? NONE : undefined)}
      onValueChange={(v) => onChange(v === NONE ? undefined : (v as Granularity))}
      disabled={disabled}
    >
      <SelectTrigger id={id} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allowNone ? <SelectItem value={NONE}>{noneLabel}</SelectItem> : null}
        {list.map((g) => (
          <SelectItem key={g} value={g}>
            {GRANULARITY_LABELS[g]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
