import * as React from "react";
import { ArrowDown, ArrowUp, GripVertical, Plus, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <div data-slot="member-multi-picker" className={cn("cv:flex cv:flex-col cv:gap-2", className)}>
      {/* Selected, ordered list */}
      {value.length > 0 ? (
        <ul className="cv:flex cv:flex-col cv:gap-1">
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
                  "cv:flex cv:items-center cv:gap-2 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2 cv:py-1.5 cv:text-sm",
                  dragIndex === i && "cv:opacity-60",
                )}
              >
                <GripVertical
                  className="cv:size-4 cv:shrink-0 cv:cursor-grab cv:text-muted-foreground"
                  aria-hidden
                />
                {opt ? memberTypeIcon(opt.type) : null}
                <span className="cv:min-w-0 cv:flex-1 cv:truncate" title={name}>
                  {opt?.label ?? name}
                </span>
                <div className="cv:flex cv:shrink-0 cv:items-center cv:gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cv:size-6"
                    disabled={disabled || i === 0}
                    onClick={() => move(i, i - 1)}
                    aria-label={`Move ${opt?.label ?? name} up`}
                  >
                    <ArrowUp className="cv:size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cv:size-6"
                    disabled={disabled || i === value.length - 1}
                    onClick={() => move(i, i + 1)}
                    aria-label={`Move ${opt?.label ?? name} down`}
                  >
                    <ArrowDown className="cv:size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cv:size-6 cv:text-muted-foreground cv:hover:text-destructive"
                    disabled={disabled}
                    onClick={() => remove(name)}
                    aria-label={`Remove ${opt?.label ?? name}`}
                  >
                    <X className="cv:size-3.5" />
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
            className="cv:w-full cv:justify-start"
            disabled={disabled || isLoading || atMax}
          >
            <Plus className="cv:size-4" />
            {isLoading ? "Loading…" : atMax ? `Max ${max} reached` : addLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="cv:w-72 cv:p-0">
          <div className="cv:flex cv:items-center cv:gap-2 cv:border-b cv:border-border cv:px-3 cv:py-2">
            <Search className="cv:size-4 cv:shrink-0 cv:text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members…"
              className="cv:w-full cv:bg-transparent cv:text-sm cv:outline-none cv:placeholder:text-muted-foreground"
            />
          </div>
          <div className="cv:max-h-64 cv:overflow-y-auto cv:p-1">
            {filtered.length === 0 ? (
              <p className="cv:px-2 cv:py-6 cv:text-center cv:text-sm cv:text-muted-foreground">
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
                      "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:outline-none cv:hover:bg-accent cv:hover:text-accent-foreground cv:disabled:pointer-events-none cv:disabled:opacity-50",
                      checked && "cv:bg-accent/50",
                    )}
                  >
                    <span
                      className={cn(
                        "cv:flex cv:size-4 cv:shrink-0 cv:items-center cv:justify-center cv:rounded-sm cv:border",
                        checked ? "cv:border-primary cv:bg-primary cv:text-primary-foreground" : "cv:border-input",
                      )}
                    >
                      {checked ? <Check /> : null}
                    </span>
                    {memberTypeIcon(m.type)}
                    <span className="cv:min-w-0 cv:flex-1 cv:truncate" title={m.name}>
                      {m.label}
                    </span>
                  </button>
                );
              })
            )}
          </div>
          {value.length > 0 ? (
            <div className="cv:flex cv:items-center cv:justify-between cv:border-t cv:border-border cv:px-3 cv:py-1.5">
              <Badge variant="secondary" className="cv:px-1.5 cv:py-0 cv:text-[10px]">
                {value.length}
                {max ? ` / ${max}` : ""} selected
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="cv:h-6 cv:px-2 cv:text-xs"
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
      className="cv:size-3"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
