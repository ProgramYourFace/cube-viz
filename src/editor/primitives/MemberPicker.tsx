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

import { groupMembersByMeta, listMembers, type MemberKind, type MemberOption } from "./meta-helpers";

export interface MemberPickerProps {
  /** Restrict to a single cube/view; omit to allow any visible member. */
  cube?: string;
  /** Restrict to a SET of joinable cubes/views (cross-table scope); overrides `cube`. */
  cubes?: string[];
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
      return <Calendar className="cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" />;
    case "number":
      return <Hash className="cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" />;
    default:
      return <Type className="cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" />;
  }
}

/**
 * Single-member picker driven by `/v1/meta`. Members are grouped by owning
 * cube/view, labelled by `shortTitle`, and emitted by their verbatim `name`
 * (handles `prefix:true` view members). Built on shadcn Select.
 */
export function MemberPicker({
  cube,
  cubes,
  kind,
  value,
  onChange,
  placeholder = "Select member…",
  disabled,
  id,
  className,
}: MemberPickerProps): React.ReactElement {
  const { meta, isLoading } = useCubeMeta();
  const members = React.useMemo(() => {
    // A cross-table scope (`cubes`) lists members across all joinable tables; a single
    // `cube` restricts to one; omitting both offers every visible member.
    if (cubes) {
      const allow = new Set(cubes);
      return listMembers(meta, kind).filter((m) => allow.has(m.cube));
    }
    return listMembers(meta, kind, cube);
  }, [meta, kind, cube, cubes]);
  // Sections = one per (cube, semantic meta.group), so a long member list splits into
  // intuitive groups (Fuel / Safety / …) authored on the Cube model. Members without a
  // `meta.group` bucket under "Other". The label combines cube (when >1 cube) and group.
  const sections = React.useMemo(() => {
    const byCube = groupByCube(members);
    const multiCube = byCube.length > 1;
    const out: { key: string; label?: string; items: MemberOption[] }[] = [];
    for (const [cubeName, items] of byCube) {
      for (const [groupLabel, groupItems] of groupMembersByMeta(items, () => "Other")) {
        const label = multiCube
          ? groupLabel === "Other"
            ? cubeName
            : `${cubeName} · ${groupLabel}`
          : groupLabel;
        out.push({ key: `${cubeName}:${groupLabel}`, label, items: groupItems });
      }
    }
    return out;
  }, [members]);
  const showLabels = sections.length > 1;
  const selected = members.find((m) => m.name === value);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled || isLoading}>
      <SelectTrigger id={id} className={className}>
        <SelectValue placeholder={isLoading ? "Loading…" : placeholder}>
          {selected ? (
            <span className="cv:flex cv:min-w-0 cv:items-center cv:gap-2">
              {memberTypeIcon(selected.type)}
              <span className="cv:truncate">{selected.label}</span>
            </span>
          ) : undefined}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {sections.map((section) => (
          <SelectGroup key={section.key}>
            {showLabels && section.label ? <SelectLabel>{section.label}</SelectLabel> : null}
            {section.items.map((m) => (
              <SelectItem key={m.name} value={m.name}>
                <span className="cv:flex cv:min-w-0 cv:items-center cv:gap-2">
                  {memberTypeIcon(m.type)}
                  <span className="cv:truncate">{m.label}</span>
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
