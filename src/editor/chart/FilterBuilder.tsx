import * as React from "react";
import { Check, Plus, Trash2 } from "lucide-react";

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
import { useCubeMeta, useOptionalDashboard } from "@/hooks";
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
  type MemberOption,
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
  const decls = useOptionalDashboard()?.decls ?? [];
  // Only one filter is expanded for editing at a time; the rest show a readable summary.
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  // The in-progress NEW filter — held locally until it has a field, so we never write
  // an incomplete (field-less) leaf to the spec (which would flash "invalid chart spec").
  const [draft, setDraft] = React.useState<LeafFilter | null>(null);
  const filters = value ?? [];

  // Split leaves (editable) from group nodes (preserved verbatim, re-appended on emit).
  const leaves: { filter: LeafFilter; index: number }[] = [];
  const groups: QueryFilter[] = [];
  filters.forEach((f, index) => {
    if (isLeaf(f)) leaves.push({ filter: f, index });
    else groups.push(f);
  });

  // Only committed (field-bearing) leaves live in the spec.
  const committed = leaves.map((l) => l.filter);

  const emit = (nextLeaves: LeafFilter[]): void => {
    const clean = nextLeaves.filter((l) => l.member.length > 0);
    const next: QueryFilter[] = [...clean, ...groups];
    onChange(next.length > 0 ? next : undefined);
  };

  const updateLeaf = (i: number, patch: Partial<LeafFilter>): void =>
    emit(committed.map((f, idx) => (idx === i ? ({ ...f, ...patch } as LeafFilter) : f)));
  const removeLeaf = (i: number): void => emit(committed.filter((_, idx) => idx !== i));

  // The draft promotes to a real filter the moment it gets a field (keeps spec valid).
  const updateDraft = (patch: Partial<LeafFilter>): void => {
    const base = draft ?? { member: "", operator: "equals", values: [] };
    const next = { ...base, ...patch } as LeafFilter;
    if (next.member) {
      setDraft(null);
      setEditingIndex(committed.length);
      emit([...committed, next]);
    } else {
      setDraft(next);
    }
  };

  return (
    <div data-slot="filter-builder" className={cn("flex flex-col gap-2", className)}>
      {committed.length === 0 && !draft ? (
        <p className="px-1 py-1 text-xs text-muted-foreground">No filters — the chart shows all rows.</p>
      ) : null}

      {committed.map((leaf, i) => {
        const member = findMember(meta, leaf.member);
        return editingIndex === i ? (
          <FilterEditRow
            key={i}
            leaf={leaf}
            member={member}
            cube={cube}
            cubes={cubes}
            disabled={disabled}
            onChange={(patch) => updateLeaf(i, patch)}
            onDone={() => setEditingIndex(null)}
            onRemove={() => removeLeaf(i)}
          />
        ) : (
          <FilterSummaryRow
            key={i}
            text={summarize(leaf, member?.label, decls)}
            disabled={disabled}
            onEdit={() => setEditingIndex(i)}
            onRemove={() => removeLeaf(i)}
          />
        );
      })}

      {draft ? (
        <FilterEditRow
          leaf={draft}
          member={findMember(meta, draft.member)}
          cube={cube}
          cubes={cubes}
          disabled={disabled}
          onChange={updateDraft}
          onRemove={() => setDraft(null)}
        />
      ) : null}

      {groups.length > 0 ? (
        <p className="text-xs text-muted-foreground">
          {groups.length} grouped filter{groups.length === 1 ? "" : "s"} preserved (edit as JSON).
        </p>
      ) : null}

      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start"
        disabled={disabled || !!draft}
        onClick={() => {
          setEditingIndex(null);
          setDraft({ member: "", operator: "equals", values: [] });
        }}
      >
        <Plus className="size-4" />
        Add filter
      </Button>
    </div>
  );
}

/* ─────────────────────────────── filter rows ─────────────────────────────── */

/** A collapsed filter: a plain-English sentence that opens to edit on click. */
function FilterSummaryRow({
  text,
  disabled,
  onEdit,
  onRemove,
}: {
  text: string;
  disabled?: boolean;
  onEdit: () => void;
  onRemove: () => void;
}): React.ReactElement {
  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-background">
      <button
        type="button"
        onClick={onEdit}
        className="min-w-0 flex-1 truncate px-3 py-2 text-left text-sm hover:text-foreground"
        title="Edit filter"
      >
        {text}
      </button>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
        disabled={disabled}
        onClick={onRemove}
        aria-label="Remove filter"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

/** An expanded filter editor: Field → Condition → Value, each full-width. */
function FilterEditRow({
  leaf,
  member,
  cube,
  cubes,
  disabled,
  onChange,
  onDone,
  onRemove,
}: {
  leaf: LeafFilter;
  member: MemberOption | undefined;
  cube?: string;
  cubes?: string[];
  disabled?: boolean;
  onChange: (patch: Partial<LeafFilter>) => void;
  onDone?: () => void;
  onRemove: () => void;
}): React.ReactElement {
  const operators = operatorsForType(member?.type);
  const operator = operators.includes(leaf.operator) ? leaf.operator : operators[0];
  const needsValue = !VALUELESS_OPERATORS.has(operator);

  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-ring/50 bg-muted/30 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Filter</span>
        <div className="flex items-center gap-0.5">
          {onDone && leaf.member ? (
            <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs" onClick={onDone}>
              <Check className="size-3.5" /> Done
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
            disabled={disabled}
            onClick={onRemove}
            aria-label="Remove filter"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-[11px] font-medium text-muted-foreground">Field</span>
        <MemberPicker
          cube={cube}
          cubes={cubes}
          kind="dimensionOrMeasure"
          value={leaf.member || undefined}
          onChange={(m) => onChange({ member: m })}
          placeholder="Choose a field…"
          disabled={disabled}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-[11px] font-medium text-muted-foreground">Condition</span>
        <Select
          value={operator}
          onValueChange={(v) =>
            onChange({
              operator: v as FilterOperator,
              values: VALUELESS_OPERATORS.has(v as FilterOperator) ? [] : leaf.values,
            })
          }
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
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
      </label>

      {needsValue ? (
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium text-muted-foreground">Value</span>
          <FilterValueField
            values={leaf.values}
            memberType={member?.type}
            onChange={(values) => onChange({ values })}
          />
        </label>
      ) : null}
    </div>
  );
}

/** A plain-English summary of a leaf filter for the collapsed row. */
function summarize(
  leaf: LeafFilter,
  fieldLabel: string | undefined,
  decls: { name: string; label?: string }[],
): string {
  const field = fieldLabel ?? leaf.member;
  if (!field) return "New filter";
  const op = OPERATOR_LABELS[leaf.operator] ?? leaf.operator;
  if (VALUELESS_OPERATORS.has(leaf.operator)) return `${field} ${op}`;
  const parts = (leaf.values ?? []).map((v) => {
    if (isVarRef(v)) {
      const d = decls.find((x) => x.name === v.var);
      // Strip braces from the label so they can't break the {…} wrapper.
      return `{${(d?.label ?? v.var).replace(/[{}]/g, "")}}`;
    }
    return String(v);
  });
  return parts.length > 0 ? `${field} ${op} ${parts.join(", ")}` : `${field} ${op} …`;
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
