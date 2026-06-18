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
 * Pick a data source — a cube OR a view — from `useCubeMeta()`. Cubes and views
 * are grouped and tagged (view/cube) so authors know whether `prefix:true`
 * member names apply. Names are read verbatim and emitted unchanged.
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

  const cubes = options.filter((o) => o.type === "cube");
  const views = options.filter((o) => o.type === "view");
  const selected = options.find((o) => o.name === value);

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
            <SelectLabel>Views</SelectLabel>
            {views.map((o) => (
              <SelectItem key={o.name} value={o.name}>
                <CubeLabel option={o} />
              </SelectItem>
            ))}
          </SelectGroup>
        ) : null}
        {cubes.length > 0 ? (
          <SelectGroup>
            <SelectLabel>Cubes</SelectLabel>
            {cubes.map((o) => (
              <SelectItem key={o.name} value={o.name}>
                <CubeLabel option={o} />
              </SelectItem>
            ))}
          </SelectGroup>
        ) : null}
      </SelectContent>
    </Select>
  );
}

function CubeLabel({ option }: { option: CubeOption }): React.ReactElement {
  const Icon = option.type === "view" ? Layers : Box;
  return (
    <span className="flex min-w-0 items-center gap-2">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <span className="truncate">{option.title}</span>
      <Badge variant="secondary" className="ml-auto shrink-0 px-1.5 py-0 text-[10px]">
        {option.type}
      </Badge>
    </span>
  );
}
