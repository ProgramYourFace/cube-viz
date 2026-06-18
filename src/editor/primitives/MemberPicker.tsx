import * as React from "react";
import { Calendar, Hash, Type } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCubeMeta } from "@/hooks";

import { listMembers, type MemberKind, type MemberOption } from "./meta-helpers";

export interface MemberPickerProps {
  /** Restrict to a single cube/view; omit to allow any visible member. */
  cube?: string;
  kind: MemberKind;
  /** Selected member name (verbatim). */
  value?: string;
  onChange: (member: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/** Type → icon used across the member pickers + filter builder. */
export function memberTypeIcon(type: MemberOption["type"]): React.ReactElement {
  switch (type) {
    case "time":
      return <Calendar className="size-3.5 shrink-0 text-muted-foreground" />;
    case "number":
      return <Hash className="size-3.5 shrink-0 text-muted-foreground" />;
    default:
      return <Type className="size-3.5 shrink-0 text-muted-foreground" />;
  }
}

/**
 * Single-member picker driven by `/v1/meta`. Members are grouped by owning
 * cube/view, labelled by `shortTitle`, and emitted by their verbatim `name`
 * (handles `prefix:true` view members). Built on shadcn Select.
 */
export function MemberPicker({
  cube,
  kind,
  value,
  onChange,
  placeholder = "Select member…",
  disabled,
  id,
  className,
}: MemberPickerProps): React.ReactElement {
  const { meta, isLoading } = useCubeMeta();
  const members = React.useMemo(() => listMembers(meta, kind, cube), [meta, kind, cube]);
  const grouped = React.useMemo(() => groupByCube(members), [members]);
  const selected = members.find((m) => m.name === value);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled || isLoading}>
      <SelectTrigger id={id} className={className}>
        <SelectValue placeholder={isLoading ? "Loading…" : placeholder}>
          {selected ? (
            <span className="flex min-w-0 items-center gap-2">
              {memberTypeIcon(selected.type)}
              <span className="truncate">{selected.label}</span>
            </span>
          ) : undefined}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {grouped.map(([cubeName, items]) => (
          <SelectGroup key={cubeName}>
            {grouped.length > 1 ? <SelectLabel>{cubeName}</SelectLabel> : null}
            {items.map((m) => (
              <SelectItem key={m.name} value={m.name}>
                <span className="flex min-w-0 items-center gap-2">
                  {memberTypeIcon(m.type)}
                  <span className="truncate">{m.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Stable group order: cubes in meta order, members in meta order. */
export function groupByCube(members: MemberOption[]): [string, MemberOption[]][] {
  const map = new Map<string, MemberOption[]>();
  for (const m of members) {
    const arr = map.get(m.cube);
    if (arr) arr.push(m);
    else map.set(m.cube, [m]);
  }
  return [...map.entries()];
}
