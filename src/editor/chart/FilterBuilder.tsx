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
import {
  isVarRef,
  type DateRange,
  type FilterOperator,
  type LeafFilter,
  type QueryFilter,
  type Scalar,
  type VarRef,
} from "@/spec";

import { MemberPicker } from "../primitives/MemberPicker";
import {
  findMember,
  OPERATOR_LABELS,
  operatorsForType,
  VALUELESS_OPERATORS,
} from "../primitives/meta-helpers";
import { DateRangeValueEditor } from "./binding/DateRangeValueEditor";
import { ValueBinding } from "./binding/ValueBinding";
import type { BindKind } from "./binding/variable-binding";

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
                <div className="min-w-0 flex-1">
                  <FilterValueField
                    values={l.filter.values}
                    memberType={member?.type}
                    onChange={(values) => updateLeaf(i, { values })}
                  />
                </div>
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

interface FilterValueFieldProps {
  values: LeafFilter["values"];
  /** The member's primitive type (drives the editor + which variables can bind). */
  memberType: string | undefined;
  onChange: (values: (Scalar | VarRef)[]) => void;
}

/**
 * A filter's value — a FIXED literal (date range for time members, else comma-separated
 * scalars) OR a `{var}` binding — through the shared {@link ValueBinding}. A bound filter
 * is `values: [{var}]`; the resolver spreads multi-select variables + drops empties.
 */
function FilterValueField({ values, memberType, onChange }: FilterValueFieldProps): React.ReactElement {
  const list = values ?? [];
  const bound = list.length === 1 && isVarRef(list[0]);

  if (memberType === "time") {
    const current: DateRange | VarRef | undefined = bound ? (list[0] as VarRef) : toDateRange(list);
    return (
      <ValueBinding
        kind="dateRange"
        value={current}
        onChange={(next) =>
          onChange(next === undefined ? [] : isVarRef(next) ? [next] : dateRangeToValues(next))
        }
        renderFixed={(r, set) => <DateRangeValueEditor value={r} onChange={set} />}
      />
    );
  }

  const bindKind: BindKind =
    memberType === "number" ? "number" : memberType === "boolean" ? "boolean" : "string";
  const current: Scalar[] | VarRef | undefined = bound
    ? (list[0] as VarRef)
    : (list.filter((v) => !isVarRef(v)) as Scalar[]);
  return (
    <ValueBinding
      kind={bindKind}
      value={current}
      onChange={(next) =>
        onChange(next === undefined ? [] : isVarRef(next) ? [next] : (next as Scalar[]))
      }
      renderFixed={(arr, set) => (
        <Input
          value={(arr ?? []).map(String).join(", ")}
          onChange={(e) => set(splitValues(e.target.value))}
          placeholder="value, value…"
          className="h-8"
        />
      )}
    />
  );
}

/** Derive a {@link DateRange} from a leaf's literal values (relative string or [from,to]). */
function toDateRange(values: (Scalar | VarRef)[]): DateRange | undefined {
  const scalars = values.filter((v) => !isVarRef(v)).map(String);
  if (scalars.length >= 2) return [scalars[0], scalars[1]];
  if (scalars.length === 1) return scalars[0];
  return undefined;
}

/** A {@link DateRange} as a leaf's `values` array (relative → 1 entry, absolute → 2). */
function dateRangeToValues(dr: DateRange): (Scalar | VarRef)[] {
  return typeof dr === "string" ? [dr] : [dr[0], dr[1]];
}

/** Split a comma-separated value string into trimmed, non-empty string values. */
function splitValues(text: string): string[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
