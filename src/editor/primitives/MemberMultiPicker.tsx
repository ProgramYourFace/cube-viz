import * as React from "react";
import { ArrowDown, ArrowUp, GripVertical, Plus, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useCubeMeta } from "@/hooks";

import { memberTypeIcon } from "./MemberPicker";
import { listMembers, type MemberKind, type MemberOption } from "./meta-helpers";

export interface MemberMultiPickerProps {
  cube?: string;
  kind: MemberKind;
  /** Ordered selected member names (verbatim). Order is meaningful (e.g. series order). */
  value: string[];
  onChange: (members: string[]) => void;
  /** Hard cap on selections. */
  max?: number;
  addLabel?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Multi-member picker with an ORDERED, reorderable selected list (order matters —
 * it drives e.g. series order). Add via a searchable popover checklist; reorder
 * via drag handle (HTML5 DnD) or the up/down buttons (keyboard-accessible, and
 * the reliable path inside a mobile WebView where native DnD is flaky). All
 * member names are read verbatim from `/v1/meta`.
 */
export function MemberMultiPicker({
  cube,
  kind,
  value,
  onChange,
  max,
  addLabel = "Add member",
  disabled,
  className,
}: MemberMultiPickerProps): React.ReactElement {
  const { meta, isLoading } = useCubeMeta();
  const members = React.useMemo(() => listMembers(meta, kind, cube), [meta, kind, cube]);
  const byName = React.useMemo(() => {
    const m = new Map<string, MemberOption>();
    for (const opt of members) m.set(opt.name, opt);
    return m;
  }, [members]);

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);

  const atMax = max !== undefined && value.length >= max;

  const toggle = (name: string) => {
    if (value.includes(name)) {
      onChange(value.filter((n) => n !== name));
    } else if (!atMax) {
      onChange([...value, name]);
    }
  };

  const remove = (name: string) => onChange(value.filter((n) => n !== name));

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length || from === to) return;
    const next = value.slice();
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) => m.label.toLowerCase().includes(q) || m.name.toLowerCase().includes(q),
    );
  }, [members, search]);

  return (
    <div data-slot="member-multi-picker" className={cn("flex flex-col gap-2", className)}>
      {/* Selected, ordered list */}
      {value.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {value.map((name, i) => {
            const opt = byName.get(name);
            return (
              <li
                key={name}
                draggable={!disabled}
                onDragStart={() => setDragIndex(i)}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragIndex !== null && dragIndex !== i) {
                    move(dragIndex, i);
                    setDragIndex(i);
                  }
                }}
                onDragEnd={() => setDragIndex(null)}
                className={cn(
                  "flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 text-sm",
                  dragIndex === i && "opacity-60",
                )}
              >
                <GripVertical
                  className="size-4 shrink-0 cursor-grab text-muted-foreground"
                  aria-hidden
                />
                {opt ? memberTypeIcon(opt.type) : null}
                <span className="min-w-0 flex-1 truncate" title={name}>
                  {opt?.label ?? name}
                </span>
                <div className="flex shrink-0 items-center gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    disabled={disabled || i === 0}
                    onClick={() => move(i, i - 1)}
                    aria-label={`Move ${opt?.label ?? name} up`}
                  >
                    <ArrowUp className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    disabled={disabled || i === value.length - 1}
                    onClick={() => move(i, i + 1)}
                    aria-label={`Move ${opt?.label ?? name} down`}
                  >
                    <ArrowDown className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-muted-foreground hover:text-destructive"
                    disabled={disabled}
                    onClick={() => remove(name)}
                    aria-label={`Remove ${opt?.label ?? name}`}
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}

      {/* Add popover (searchable checklist) */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            disabled={disabled || isLoading || atMax}
          >
            <Plus className="size-4" />
            {isLoading ? "Loading…" : atMax ? `Max ${max} reached` : addLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 p-0">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-64 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                No members found
              </p>
            ) : (
              filtered.map((m) => {
                const checked = value.includes(m.name);
                const disabledItem = !checked && atMax;
                return (
                  <button
                    key={m.name}
                    type="button"
                    disabled={disabledItem}
                    onClick={() => toggle(m.name)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
                      checked && "bg-accent/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-sm border",
                        checked ? "border-primary bg-primary text-primary-foreground" : "border-input",
                      )}
                    >
                      {checked ? <Check /> : null}
                    </span>
                    {memberTypeIcon(m.type)}
                    <span className="min-w-0 flex-1 truncate" title={m.name}>
                      {m.label}
                    </span>
                  </button>
                );
              })
            )}
          </div>
          {value.length > 0 ? (
            <div className="flex items-center justify-between border-t border-border px-3 py-1.5">
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                {value.length}
                {max ? ` / ${max}` : ""} selected
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => onChange([])}
              >
                Clear
              </Button>
            </div>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
}

/** Local Check glyph (lucide) — kept tiny + inline to avoid a wide import surface. */
function Check(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
