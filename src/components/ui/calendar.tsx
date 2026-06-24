import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import {
  DayButton as RdpDayButton,
  DayPicker,
  useDayPicker,
  type ChevronProps,
  type MonthCaptionProps,
} from "react-day-picker";

import { cn } from "@/components/ui/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
type DayButtonProps = React.ComponentProps<typeof RdpDayButton>;

/**
 * shadcn-style Calendar wrapping react-day-picker v9.
 *
 * Two things are deliberately NOT done the shadcn-classNames way, because a host
 * app's Tailwind build (which is what styles cube-viz inside the WebView) purges
 * arbitrary classes (`absolute inset-x-0`, `[&:has(...)]`, width utils) and the
 * order of conflicting `text-*` classes is unreliable — both broke the calendar:
 *   1. NAVIGATION + month label: a custom {@link MonthCaption} (prev · label ·
 *      next) driven by react-day-picker's own `useDayPicker()` nav. No absolute
 *      positioning, so it always renders + clicks.
 *   2. DAY rendering: a custom {@link DayButton} that sets its colors via INLINE
 *      CSS variables (`var(--foreground)` / `var(--primary-foreground)` …) — these
 *      can't be purged and always win, so selected/range days stay legible in both
 *      light and dark mode. Backgrounds use the sturdy `bg-primary`/`bg-accent`
 *      utilities. The grid stays a native <table>, so weekday <th> and day <td>
 *      columns always align (the old `flex` overrides were what misaligned them).
 */

/** Prev · "Month YYYY" · Next, using react-day-picker's navigation context. */
function MonthCaption({ calendarMonth }: MonthCaptionProps): React.ReactElement {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const navBtn = cn(buttonVariants({ variant: "outline" }), "size-7 shrink-0 p-0");
  return (
    <div className="mb-2 flex items-center justify-between gap-1">
      <button
        type="button"
        aria-label="Go to previous month"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className={cn(navBtn, !previousMonth && "opacity-40")}
      >
        <ChevronLeft className="size-4" />
      </button>
      <span className="text-sm font-medium text-foreground">
        {format(calendarMonth.date, "MMMM yyyy")}
      </span>
      <button
        type="button"
        aria-label="Go to next month"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className={cn(navBtn, !nextMonth && "opacity-40")}
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

/** A day cell whose colors are inline CSS vars (purge-proof, always legible). */
function DayButton({ day: _day, modifiers, className, style, ...props }: DayButtonProps): React.ReactElement {
  const selected = !!modifiers.selected && !modifiers.outside && !modifiers.disabled;
  const muted = !!modifiers.outside || !!modifiers.disabled;
  const color = selected
    ? "var(--primary-foreground)"
    : muted
      ? "var(--muted-foreground)"
      : "var(--foreground)";
  return (
    <button
      {...props}
      style={{ ...style, color }}
      className={cn(
        "flex size-9 items-center justify-center rounded-md text-sm font-normal transition-colors",
        // size-9 cells touch edge-to-edge, so a contiguous range reads as one band.
        selected ? "bg-primary hover:bg-primary" : "hover:bg-accent",
        modifiers.today && !selected && "border border-primary",
        modifiers.disabled && "opacity-40",
        className,
      )}
    />
  );
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps): React.ReactElement {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      hideNavigation
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-2",
        month_caption: "",
        // Native table: <th> weekdays + <td> days share columns -> always aligned.
        month_grid: "border-collapse",
        weekdays: "",
        weekday: "size-9 p-0 text-xs font-normal text-muted-foreground",
        week: "",
        day: "p-0 text-center align-middle",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        MonthCaption,
        DayButton,
        Chevron: ({ orientation, className: chevronClassName, ...chevronProps }: ChevronProps) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className={cn("size-4", chevronClassName)} {...chevronProps} />;
        },
      }}
      {...props}
    />
  );
}
