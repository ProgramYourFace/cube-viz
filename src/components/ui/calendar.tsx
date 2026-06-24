import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import {
  DayPicker,
  useDayPicker,
  type ChevronProps,
  type MonthCaptionProps,
} from "react-day-picker";

import { cn } from "@/components/ui/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * shadcn Calendar wrapping react-day-picker v9 ({@link DayPicker}).
 *
 * The month header is a CUSTOM `MonthCaption` (a simple flex row: prev · label ·
 * next) driven by react-day-picker's own `useDayPicker()` navigation — NOT the
 * default absolute-positioned `nav`. The default relied on `absolute inset-x-0
 * justify-between`, which a consumer's Tailwind build can purge, leaving the nav
 * mispositioned + hard/impossible to click. This layout uses only sturdy
 * utilities so month navigation works in any host. Day/range styling carries
 * explicit `text-foreground`/token colors so it stays legible in dark mode.
 */

/** Prev · "Month YYYY" · Next, using react-day-picker's navigation context. */
function MonthCaption({ calendarMonth }: MonthCaptionProps): React.ReactElement {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const navBtn = cn(buttonVariants({ variant: "outline" }), "size-7 shrink-0 p-0");
  return (
    <div className="mb-1 flex items-center justify-between gap-1">
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

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps): React.ReactElement {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // Default nav is replaced by the custom MonthCaption below.
      hideNavigation
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-3",
        month_caption: "",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-1",
        day: cn(
          "relative size-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
          // Range band fill on the day CELL (sturdy: direct token utilities).
          "[&:has(.range_middle)]:bg-accent",
          "[&:has(.range_start)]:rounded-l-md [&:has(.range_start)]:bg-accent",
          "[&:has(.range_end)]:rounded-r-md [&:has(.range_end)]:bg-accent",
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 rounded-md p-0 font-normal text-foreground",
        ),
        // Single selection + range endpoints: solid primary chip, always legible.
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        range_start:
          "range_start rounded-md bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        range_end:
          "range_end rounded-md bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        // Interior days: accent band; hover keeps the accent (no contrast loss).
        range_middle:
          "range_middle !bg-transparent text-accent-foreground hover:!bg-accent/70 hover:text-accent-foreground",
        today: "rounded-md border border-primary text-foreground",
        outside: "outside text-muted-foreground/60",
        disabled: "text-muted-foreground opacity-40",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        MonthCaption,
        Chevron: ({ orientation, className: chevronClassName, ...chevronProps }: ChevronProps) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className={cn("size-4", chevronClassName)} {...chevronProps} />;
        },
      }}
      {...props}
    />
  );
}
