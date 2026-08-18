import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCubeMeta, useDisplayUnit } from "@/hooks";

import { fieldBadge, groupMembersByMeta, listMembers, type MemberKind, type MemberOption } from "./meta-helpers";

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

/**
 * The type/unit chip shown beside a member across the pickers + filter builder —
 * what the field HOLDS, in words ("km", "#", "text", "date", "yes/no"), converted to
 * the viewer's unit system. Replaced the old glyph-per-type icons (`#`/`T`), which
 * named the storage type instead of anything a chart reader recognizes.
 */
export function MemberUnitChip({ option }: { option: Pick<MemberOption, "type" | "unit"> }): React.ReactElement {
  const displayUnit = useDisplayUnit();
  return <span className="cv-field-unit">{fieldBadge(option, displayUnit)}</span>;
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
            <span className="cv-member-option">
              <MemberUnitChip option={selected} />
              <span className="cv-ed-truncate">{selected.label}</span>
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
                <span className="cv-member-option">
                  <MemberUnitChip option={m} />
                  <span className="cv-ed-truncate">{m.label}</span>
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
