import * as React from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/components/ui/utils";
import { useCubeMeta } from "@/hooks";
import type { FilterOperator, LeafFilter, QueryFilter } from "@/spec";

import { MemberPicker } from "../primitives/MemberPicker";
import {
  findMember,
  OPERATOR_LABELS,
  operatorsForType,
  VALUELESS_OPERATORS,
} from "../primitives/meta-helpers";

/**
 * Leaf-filter list builder (docs/03 §A3.1 step 5). Edits the flat list of leaf
 * predicates on a query — the editor's common case. The member's primitive `type`
 * (read from `/v1/meta`) drives the operator list; valueless operators (`set`/
 * `notSet`) hide the value input. Nested `and`/`or` groups in an existing query are
 * preserved verbatim (passed through untouched), so this never silently drops them.
 *
 * Values are edited as a comma-separated string and emitted as `string[]`. Cube
 * coerces by member type at query time, so we keep them as strings here (no guessing
 * numeric vs. string — the same discipline the rest of the editor follows).
 */

export interface FilterBuilderProps {
  /** Owning cube/view; restricts the member picker to that source. */
  cube?: string;
  /**
   * Joinable cross-table scope: when set, filters may target any field in the chart's
   * join graph (e.g. filter a `device_trips` chart by `devices.name`). Overrides `cube`.
   */
  cubes?: string[];
  /** The query's current `filters` (may be undefined). */
  value?: QueryFilter[];
  onChange: (filters: QueryFilter[] | undefined) => void;
  disabled?: boolean;
  className?: string;
}

/** Type guard: a flat leaf filter (vs. an `and`/`or` group). */
function isLeaf(f: QueryFilter): f is LeafFilter {
  return "member" in f && "operator" in f;
}

export function FilterBuilder({
  cube,
  cubes,
  value,
  onChange,
  disabled,
  className,
}: FilterBuilderProps): React.ReactElement {
  const { meta } = useCubeMeta();
  const filters = value ?? [];

  // Split leaves (editable) from group nodes (preserved verbatim, re-appended on emit).
  const leaves: { filter: LeafFilter; index: number }[] = [];
  const groups: QueryFilter[] = [];
  filters.forEach((f, index) => {
    if (isLeaf(f)) leaves.push({ filter: f, index });
    else groups.push(f);
  });

  const emit = (nextLeaves: LeafFilter[]): void => {
    const next: QueryFilter[] = [...nextLeaves, ...groups];
    onChange(next.length > 0 ? next : undefined);
  };

  const updateLeaf = (leafIndex: number, patch: Partial<LeafFilter>): void => {
    const nextLeaves = leaves.map((l, i) =>
      i === leafIndex ? ({ ...l.filter, ...patch } as LeafFilter) : l.filter,
    );
    emit(nextLeaves);
  };

  const addLeaf = (): void => {
    const blank: LeafFilter = { member: "", operator: "equals", values: [] };
    emit([...leaves.map((l) => l.filter), blank]);
  };

  const removeLeaf = (leafIndex: number): void => {
    emit(leaves.filter((_, i) => i !== leafIndex).map((l) => l.filter));
  };

  return (
    <div data-slot="filter-builder" className={cn("flex flex-col gap-2", className)}>
      {leaves.map((l, i) => {
        const member = findMember(meta, l.filter.member);
        const operators = operatorsForType(member?.type);
        // Keep the chosen operator valid even before a member resolves.
        const operator = operators.includes(l.filter.operator)
          ? l.filter.operator
          : operators[0];
        const needsValue = !VALUELESS_OPERATORS.has(operator);
        const valuesText = (l.filter.values ?? [])
          .map((v) => (typeof v === "object" ? `{${v.var}}` : String(v)))
          .join(", ");

        return (
          <div
            key={i}
            className="flex flex-col gap-1.5 rounded-md border border-border bg-background p-2"
          >
            <div className="flex items-start gap-1.5">
              <div className="min-w-0 flex-1">
                <MemberPicker
                  cube={cube}
                  cubes={cubes}
                  kind="dimensionOrMeasure"
                  value={l.filter.member || undefined}
                  onChange={(m) => updateLeaf(i, { member: m })}
                  placeholder="Field…"
                  disabled={disabled}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 shrink-0 text-muted-foreground hover:text-destructive"
                disabled={disabled}
                onClick={() => removeLeaf(i)}
                aria-label="Remove filter"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <div className="flex items-center gap-1.5">
              <Select
                value={operator}
                onValueChange={(v) =>
                  updateLeaf(i, {
                    operator: v as FilterOperator,
                    // Clear values when switching to a valueless operator.
                    values: VALUELESS_OPERATORS.has(v as FilterOperator) ? [] : l.filter.values,
                  })
                }
                disabled={disabled}
              >
                <SelectTrigger className="w-40 shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {operators.map((op) => (
                    <SelectItem key={op} value={op}>
                      {OPERATOR_LABELS[op]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {needsValue ? (
                <Input
                  value={valuesText}
                  onChange={(e) =>
                    updateLeaf(i, { values: splitValues(e.target.value) })
                  }
                  placeholder="value, value…"
                  disabled={disabled}
                  className="min-w-0 flex-1"
                />
              ) : (
                <span className="flex-1 text-xs text-muted-foreground">No value needed</span>
              )}
            </div>
          </div>
        );
      })}

      {groups.length > 0 ? (
        <p className="text-xs text-muted-foreground">
          {groups.length} grouped filter{groups.length === 1 ? "" : "s"} preserved (edit as JSON).
        </p>
      ) : null}

      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start"
        disabled={disabled}
        onClick={addLeaf}
      >
        <Plus className="size-4" />
        Add filter
      </Button>
    </div>
  );
}

/** Split a comma-separated value string into trimmed, non-empty string values. */
function splitValues(text: string): string[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
