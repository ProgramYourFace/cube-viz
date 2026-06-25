import * as React from "react";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange as DayPickerRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import type { DateRange } from "@/spec";

export interface DateRangeValueEditorProps {
  /** A relative preset string, an absolute `[from,to]` ISO pair, or unset. */
  value: DateRange | undefined;
  onChange: (value: DateRange | undefined) => void;
}

const PRESETS = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"];
const ISO = "yyyy-MM-dd";

function asPair(v: DateRange | undefined): [string, string] {
  return Array.isArray(v) && typeof v[0] === "string" ? [v[0], v[1]] : ["", ""];
}
function parseIso(s: string): Date | undefined {
  if (!s) return undefined;
  const d = parse(s, ISO, new Date());
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/** A fixed date-range editor: relative presets OR an absolute calendar range. */
export function DateRangeValueEditor({ value, onChange }: DateRangeValueEditorProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const isRelative = typeof value === "string";
  const [fromStr, toStr] = asPair(value);
  const fromDate = parseIso(fromStr);
  const toDate = parseIso(toStr);
  const selected: DayPickerRange | undefined = fromDate ? { from: fromDate, to: toDate } : undefined;

  const triggerLabel = isRelative
    ? (value as string)
    : fromDate && toDate
      ? `${format(fromDate, "MMM d, yyyy")} – ${format(toDate, "MMM d, yyyy")}`
      : fromDate
        ? format(fromDate, "MMM d, yyyy")
        : "Any time";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={cn("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal")}>
          <CalendarIcon className="cv:size-3.5 cv:text-muted-foreground" />
          <span className={cn("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", triggerLabel === "Any time" && "cv:text-muted-foreground")}>
            {triggerLabel}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="cv:flex cv:w-auto cv:gap-2 cv:p-2">
        <div className="cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2">
          {PRESETS.map((preset) => (
            <Button
              key={preset}
              variant="ghost"
              size="sm"
              className={cn("cv:justify-start cv:font-normal", value === preset && "cv:bg-accent")}
              onClick={() => {
                onChange(preset);
                setOpen(false);
              }}
            >
              {preset}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="cv:justify-start cv:font-normal cv:text-muted-foreground"
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
          >
            Any time
          </Button>
        </div>
        <Calendar
          mode="range"
          selected={selected}
          defaultMonth={fromDate}
          onSelect={(range) => {
            if (range?.from && range.to) onChange([format(range.from, ISO), format(range.to, ISO)]);
            else if (range?.from) onChange([format(range.from, ISO), format(range.from, ISO)]);
            else onChange(undefined);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
