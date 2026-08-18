import * as React from "react";
import { Box, Layers } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

import { listCubes, type CubeOption } from "./meta-helpers";

export interface CubePickerProps {
  /** Selected cube/view name (verbatim). */
  value?: string;
  onChange: (cube: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Pick a data source — a table (cube) OR a saved dataset (view) — from
 * `useCubeMeta()`. Tables are grouped under their model-authored `meta.category`
 * headings (Vehicle activity / Maintenance / …, uncategorized last) so a long flat
 * list reads as a few subject areas; saved datasets keep their own group on top.
 * Names are read verbatim and emitted unchanged.
 */
export function CubePicker({
  value,
  onChange,
  placeholder = "Select data source…",
  disabled,
  id,
  className,
}: CubePickerProps): React.ReactElement {
  const { meta, isLoading } = useCubeMeta();
  const options = React.useMemo(() => listCubes(meta), [meta]);

  const views = options.filter((o) => o.type === "view");
  const selected = options.find((o) => o.name === value);

  // Tables grouped by category, categories alphabetical, uncategorized last. With no
  // categories in the model at all this degrades to one "Tables" group — the old list.
  const tableGroups = React.useMemo(() => {
    const cubes = options.filter((o) => o.type === "cube");
    const anyCategory = cubes.some((c) => c.category);
    const order: string[] = [];
    const byLabel = new Map<string, CubeOption[]>();
    for (const c of cubes) {
      const label = c.category ?? (anyCategory ? "More tables" : "Tables");
      if (!byLabel.has(label)) {
        byLabel.set(label, []);
        order.push(label);
      }
      byLabel.get(label)!.push(c);
    }
    order.sort((a, b) => {
      if (a === "More tables") return 1;
      if (b === "More tables") return -1;
      return a.localeCompare(b);
    });
    return order.map((label) => ({ label, items: byLabel.get(label)! }));
  }, [options]);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled || isLoading}>
      <SelectTrigger id={id} className={className}>
        <SelectValue placeholder={isLoading ? "Loading…" : placeholder}>
          {selected ? <CubeLabel option={selected} /> : undefined}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {views.length > 0 ? (
          <SelectGroup>
            <SelectLabel>Saved datasets</SelectLabel>
            {views.map((o) => (
              <SelectItem key={o.name} value={o.name}>
                <CubeLabel option={o} />
              </SelectItem>
            ))}
          </SelectGroup>
        ) : null}
        {tableGroups.map((g) => (
          <SelectGroup key={g.label}>
            <SelectLabel>{g.label}</SelectLabel>
            {g.items.map((o) => (
              <SelectItem key={o.name} value={o.name}>
                <CubeLabel option={o} />
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

function CubeLabel({ option }: { option: CubeOption }): React.ReactElement {
  const Icon = option.type === "view" ? Layers : Box;
  return (
    <span className="cv-member-option">
      <Icon className="cv-cube-icon" />
      <span className="cv-ed-truncate">{option.title}</span>
      <Badge variant="secondary" className="cv-cube-badge">
        {option.type === "view" ? "dataset" : "table"}
      </Badge>
    </span>
  );
}
