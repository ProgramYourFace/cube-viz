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
  onChange: (granularity: Granularity) => void;
  /** Restrict the offered granularities (e.g. a time dimension's own list). */
  options?: Granularity[];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Standard time-bucket granularity dropdown (`second…year`). The option list can
 * be narrowed to a dimension's declared granularities; otherwise all eight show.
 */
export function GranularityPicker({
  value,
  onChange,
  options,
  placeholder = "Granularity…",
  disabled,
  id,
  className,
}: GranularityPickerProps): React.ReactElement {
  const list = options && options.length > 0 ? options : ALL_GRANULARITIES;
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as Granularity)}
      disabled={disabled}
    >
      <SelectTrigger id={id} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {list.map((g) => (
          <SelectItem key={g} value={g}>
            {GRANULARITY_LABELS[g]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
