import { useMemo, useState, type ReactElement } from "react";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import type {
  Granularity,
  InputControl,
  VariableDecl,
  VariableValue,
} from "@/spec";
import { useDashboard } from "@/hooks";
import { useCubeMeta } from "@/hooks";
import {
  useCubeVizContext,
  type InputControlComponent,
  type InputControlProps,
} from "@/provider";
import { cn } from "@/components/ui/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Render an {@link InputControl} bound to a dashboard variable (Leg 1 write / Leg 3
 * read-back of the binding model — docs/01-spec-schema.md §5,
 * docs/03-override-theme-preview.md A2.4). The control is a pure value editor: it
 * reads `resolveValue(variable)` and writes `setVar(variable, …)`, and it can ONLY
 * write its own declared variable — so a control can never widen tenant scope.
 *
 * Each `control.kind` resolves through the registry (`registry.controls[kind]`) with
 * the built-in as fallback. The built-ins are shadcn/ui primitives (Select, Popover,
 * Calendar) that render through a Radix portal, so they work inside a mobile WebView.
 */

export interface InputWidgetViewProps {
  /** The input control (variable name + kind-specific config). */
  control: InputControl;
}

/* ───────────────────────────── shared field styling ─────────────────────── */

const fieldClass = cn(
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm",
  "shadow-sm transition-colors placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";

/** ISO date pattern used to parse/serialize absolute date-range bounds. */
const ISO_DATE = "yyyy-MM-dd";

/* ───────────────────────────── built-in controls ────────────────────────── */

/** Default date-range presets when the spec carries none. */
const DEFAULT_PRESETS = ["This month", "last 7 days", "last 30 days", "last quarter"];

/** Read an absolute `[from, to]` pair out of a VariableValue, else `["", ""]`. */
function asPair(value: VariableValue | undefined): [string, string] {
  if (Array.isArray(value) && value.length === 2 && typeof value[0] === "string") {
    return [value[0], value[1] as string];
  }
  return ["", ""];
}

/** Parse an ISO `yyyy-MM-dd` string to a local Date, or `undefined` if blank/invalid. */
function parseIso(s: string): Date | undefined {
  if (!s) return undefined;
  const d = parse(s, ISO_DATE, new Date());
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function DateRangeControl({
  value,
  onChange,
  control,
}: InputControlProps): ReactElement {
  const cfg = control as Extract<InputControl["control"], { kind: "dateRange" }>;
  const presets = cfg.presets ?? DEFAULT_PRESETS;
  const [open, setOpen] = useState(false);

  // The value union: `string` (relative preset) OR `[from, to]` (absolute ISO).
  const isRelative = typeof value === "string";
  const [fromStr, toStr] = asPair(value);
  const fromDate = parseIso(fromStr);
  const toDate = parseIso(toStr);
  const selectedRange: DateRange | undefined = fromDate
    ? { from: fromDate, to: toDate }
    : undefined;

  // The trigger label: preset name, formatted absolute range, or a prompt.
  let triggerLabel: string;
  if (isRelative) {
    triggerLabel = value as string;
  } else if (fromDate && toDate) {
    triggerLabel = `${format(fromDate, "MMM d, yyyy")} – ${format(toDate, "MMM d, yyyy")}`;
  } else if (fromDate) {
    triggerLabel = format(fromDate, "MMM d, yyyy");
  } else {
    triggerLabel = "Pick a date range";
  }

  const disabledDays = cfg.allowFuture === false ? { after: new Date() } : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            triggerLabel === "Pick a date range" && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {triggerLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto gap-2 p-2" align="start">
        <div className="flex flex-col gap-1 border-r pr-2">
          {presets.map((p) => (
            <Button
              key={p}
              variant="ghost"
              size="sm"
              className="justify-start font-normal"
              onClick={() => {
                onChange(p);
                setOpen(false);
              }}
            >
              {p}
            </Button>
          ))}
        </div>
        <Calendar
          mode="range"
          selected={selectedRange}
          defaultMonth={fromDate}
          disabled={disabledDays}
          onSelect={(range) => {
            if (range?.from && range.to) {
              onChange([format(range.from, ISO_DATE), format(range.to, ISO_DATE)]);
            } else if (range?.from) {
              // Partial selection: keep both bounds equal until a second click.
              onChange([format(range.from, ISO_DATE), format(range.from, ISO_DATE)]);
            } else {
              onChange(["", ""]);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

const ALL_GRANULARITIES: Granularity[] = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year",
];

function GranularityControl({
  value,
  onChange,
  control,
}: InputControlProps): ReactElement {
  const cfg = control as Extract<InputControl["control"], { kind: "granularity" }>;
  const options = cfg.options ?? ALL_GRANULARITIES;
  const current = typeof value === "string" ? value : "";
  return (
    <Select
      value={current}
      onValueChange={(v) => onChange(v as Granularity)}
    >
      <SelectTrigger className={fieldClass}>
        <SelectValue placeholder="—" />
      </SelectTrigger>
      <SelectContent>
        {options.map((g) => (
          <SelectItem key={g} value={g}>
            {g[0].toUpperCase() + g.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function SelectControl({ value, onChange, control }: InputControlProps): ReactElement {
  const cfg = control as Extract<InputControl["control"], { kind: "select" }>;

  if (cfg.multiple) {
    const selected = new Set(
      (Array.isArray(value) ? value : []).map((v) => String(v)),
    );
    return (
      <select
        multiple
        className={cn(fieldClass, "h-auto min-h-[6rem]")}
        value={[...selected]}
        onChange={(e) => {
          const picked = Array.from(e.target.selectedOptions, (o) => o.value);
          // Map back to the declared value type (string[] vs number[]).
          const allNumeric = cfg.options.every((o) => typeof o.value === "number");
          onChange(allNumeric ? picked.map((p) => Number(p)) : picked);
        }}
      >
        {cfg.options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }

  const current = value === undefined ? "" : String(value);
  return (
    <Select
      value={current}
      onValueChange={(picked) => {
        const opt = cfg.options.find((o) => String(o.value) === picked);
        onChange(opt ? opt.value : undefined);
      }}
    >
      <SelectTrigger className={fieldClass}>
        <SelectValue placeholder="—" />
      </SelectTrigger>
      <SelectContent>
        {cfg.options.map((o) => (
          <SelectItem key={String(o.value)} value={String(o.value)}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MemberSelectControl({
  value,
  onChange,
  control,
}: InputControlProps): ReactElement {
  const cfg = control as Extract<InputControl["control"], { kind: "memberSelect" }>;
  const { meta, isLoading } = useCubeMeta();

  // Collect the eligible members (dimension / measure / both) across all cubes,
  // optionally scoped to a single cube. Member names are read VERBATIM from /meta.
  const members = useMemo<{ name: string; label: string }[]>(() => {
    if (!meta) return [];
    const out: { name: string; label: string }[] = [];
    for (const cube of meta.cubes) {
      if (cfg.cube && cube.name !== cfg.cube) continue;
      if (cfg.from === "measure" || cfg.from === "dimensionOrMeasure") {
        for (const m of cube.measures) out.push({ name: m.name, label: m.shortTitle ?? m.title ?? m.name });
      }
      if (cfg.from === "dimension" || cfg.from === "dimensionOrMeasure") {
        for (const d of cube.dimensions) out.push({ name: d.name, label: d.shortTitle ?? d.title ?? d.name });
      }
    }
    return out;
  }, [meta, cfg.cube, cfg.from]);

  return (
    <select
      className={fieldClass}
      value={typeof value === "string" ? value : ""}
      disabled={isLoading}
      onChange={(e) => onChange(e.target.value || undefined)}
    >
      <option value="">{isLoading ? "Loading…" : "—"}</option>
      {members.map((m) => (
        <option key={m.name} value={m.name}>
          {m.label}
        </option>
      ))}
    </select>
  );
}

function TextControl({ value, onChange, control }: InputControlProps): ReactElement {
  const cfg = control as Extract<InputControl["control"], { kind: "text" }>;
  return (
    <input
      type="text"
      className={fieldClass}
      placeholder={cfg.placeholder}
      value={typeof value === "string" ? value : ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function NumberControl({ value, onChange, control }: InputControlProps): ReactElement {
  const cfg = control as Extract<InputControl["control"], { kind: "number" }>;
  return (
    <input
      type="number"
      className={fieldClass}
      min={cfg.min}
      max={cfg.max}
      step={cfg.step}
      value={typeof value === "number" ? value : ""}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v === "" ? undefined : Number(v));
      }}
    />
  );
}

function ToggleControl({ value, onChange, decl }: InputControlProps): ReactElement {
  const checked = value === true;
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        className="size-4 rounded border-input text-primary accent-primary focus-visible:ring-1 focus-visible:ring-ring"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm text-foreground">{decl.label ?? decl.name}</span>
    </label>
  );
}

/** The built-in control for each {@link InputControl} kind. */
const BUILTIN_CONTROLS: Record<InputControl["control"]["kind"], InputControlComponent> = {
  dateRange: DateRangeControl,
  granularity: GranularityControl,
  select: SelectControl,
  memberSelect: MemberSelectControl,
  text: TextControl,
  number: NumberControl,
  toggle: ToggleControl,
};

/* ───────────────────────────── the bound view ───────────────────────────── */

export function InputWidgetView({ control }: InputWidgetViewProps): ReactElement {
  const { registry } = useCubeVizContext();
  const { decls, resolveValue, setVar } = useDashboard();

  const decl = useMemo<VariableDecl | undefined>(
    () => decls.find((d) => d.name === control.variable),
    [decls, control.variable],
  );

  if (!decl) {
    return (
      <div className="text-sm text-muted-foreground">
        Unknown variable “{control.variable}”
      </div>
    );
  }

  const kind = control.control.kind;
  const Control = registry.controls?.[kind] ?? BUILTIN_CONTROLS[kind];

  const value = resolveValue(control.variable);
  const onChange = (next: VariableValue | undefined): void =>
    setVar(control.variable, next);

  // Toggle renders its own inline label; the others get a stacked field label.
  if (kind === "toggle") {
    return <Control value={value} onChange={onChange} decl={decl} control={control.control} />;
  }

  return (
    <div>
      <label className={labelClass}>{decl.label ?? decl.name}</label>
      <Control value={value} onChange={onChange} decl={decl} control={control.control} />
    </div>
  );
}
