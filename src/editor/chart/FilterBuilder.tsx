import * as React from "react";
import { Check, ChevronDown, Plus, Trash2 } from "lucide-react";

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

import { MemberPicker, MemberUnitChip } from "../primitives/MemberPicker";
import { SegmentedControl } from "../primitives/SegmentedControl";
import {
  findMember,
  OPERATOR_LABELS,
  operatorsForType,
  VALUELESS_OPERATORS,
  type MemberOption,
} from "../primitives/meta-helpers";
import { FieldPickerPopover } from "./onchart/FieldPickerPopover";
import type { JoinScope } from "./onchart/join-scope";
import type { WellDef } from "./builder/wells";
import { DateRangeValueEditor } from "./binding/DateRangeValueEditor";
import { ValueBinding } from "./binding/ValueBinding";
import type { BindKind } from "./binding/variable-binding";

/**
 * A virtual "well" so the filter Field selector can reuse the rich {@link
 * FieldPickerPopover} (grouped Numbers / Categories / Dates, search, join-scope) —
 * the same picker the axis wells use. Any field kind is filterable, time included.
 */
const FILTER_WELL: WellDef = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"],
};

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
  /**
   * The chart's cross-table join scope. When provided, the Field selector uses the
   * rich {@link FieldPickerPopover} (matching the axis wells); without it, falls back
   * to the plain {@link MemberPicker} (standalone/host use).
   */
  scope?: JoinScope;
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
  scope,
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

  // Match mode: "any" iff the query is a single `{ or: [...leaves] }` group; otherwise
  // "all" (a flat AND of leaves), with any OTHER nested group preserved verbatim.
  const orGroup =
    filters.length === 1 &&
    !isLeaf(filters[0]) &&
    "or" in filters[0] &&
    Array.isArray((filters[0] as { or?: QueryFilter[] }).or) &&
    (filters[0] as { or: QueryFilter[] }).or.every(isLeaf)
      ? (filters[0] as { or: LeafFilter[] })
      : undefined;
  const matchMode: "all" | "any" = orGroup ? "any" : "all";

  // Editable leaves + any preserved (non-leaf) groups (all-mode only).
  const flat: LeafFilter[] = [];
  const groups: QueryFilter[] = [];
  if (!orGroup) filters.forEach((f) => (isLeaf(f) ? flat.push(f) : groups.push(f)));
  const committed: LeafFilter[] = orGroup ? orGroup.or : flat;
  // The All/Any toggle only shows when there are no OTHER preserved groups to reason about.
  const showMatchToggle = groups.length === 0 && (committed.length >= 2 || matchMode === "any");

  const wrap = (leaves: LeafFilter[]): QueryFilter[] =>
    matchMode === "any" ? (leaves.length ? [{ or: leaves }] : []) : [...leaves, ...groups];

  const emit = (nextLeaves: LeafFilter[]): void => {
    const clean = nextLeaves.filter((l) => l.member.length > 0);
    const next = wrap(clean);
    onChange(next.length > 0 ? next : undefined);
  };

  const setMatchMode = (mode: "all" | "any"): void => {
    const next: QueryFilter[] =
      mode === "any" ? (committed.length ? [{ or: committed }] : []) : [...committed];
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
    <div data-slot="filter-builder" className={cn("cv-filter-builder", className)}>
      {committed.length === 0 && !draft ? (
        <p className="cv-filter-empty">No filters — the chart shows all rows.</p>
      ) : null}

      {showMatchToggle ? (
        <div className="cv-filter-match">
          <span>Match</span>
          <SegmentedControl<"all" | "any">
            aria-label="Match filters"
            size="sm"
            options={[
              { value: "all", label: "All" },
              { value: "any", label: "Any" },
            ]}
            value={matchMode}
            onChange={setMatchMode}
          />
          <span>of these</span>
        </div>
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
            scope={scope}
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
          scope={scope}
          disabled={disabled}
          onChange={updateDraft}
          onRemove={() => setDraft(null)}
        />
      ) : null}

      {groups.length > 0 ? (
        <p className="cv-filter-groups-note">
          {groups.length} grouped filter{groups.length === 1 ? "" : "s"} preserved (edit as JSON).
        </p>
      ) : null}

      <Button
        variant="outline"
        size="sm"
        className="cv-filter-add"
        disabled={disabled || !!draft}
        onClick={() => {
          setEditingIndex(null);
          setDraft({ member: "", operator: "equals", values: [] });
        }}
      >
        <Plus className="cv-ec-icon--lg" />
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
    <div className="cv-filter-summary">
      <button
        type="button"
        onClick={onEdit}
        className="cv-filter-summary-text"
        title="Edit filter"
      >
        {text}
      </button>
      <Button
        variant="ghost"
        size="icon"
        className="cv-ec-remove cv-ec-remove--8"
        disabled={disabled}
        onClick={onRemove}
        aria-label="Remove filter"
      >
        <Trash2 className="cv-ec-icon--lg" />
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
  scope,
  disabled,
  onChange,
  onDone,
  onRemove,
}: {
  leaf: LeafFilter;
  member: MemberOption | undefined;
  cube?: string;
  cubes?: string[];
  scope?: JoinScope;
  disabled?: boolean;
  onChange: (patch: Partial<LeafFilter>) => void;
  onDone?: () => void;
  onRemove: () => void;
}): React.ReactElement {
  const { meta } = useCubeMeta();
  const operators = operatorsForType(member?.type);
  const operator = operators.includes(leaf.operator) ? leaf.operator : operators[0];
  const needsValue = !VALUELESS_OPERATORS.has(operator);
  // Each caption names its control: the Field / Condition triggers are BUTTONS (a
  // `<label htmlFor>` cannot target one), so they take `aria-labelledby` on the
  // caption's id; the Value editor's own field gets a real label association.
  const fieldLabelId = React.useId();
  const fieldTriggerId = React.useId();
  const conditionLabelId = React.useId();
  const conditionTriggerId = React.useId();
  const valueLabelId = React.useId();
  const valueFieldId = React.useId();

  // Persist the type-derived fallback rather than merely displaying it. This repairs
  // older time filters that looked like `inDateRange` but still stored `equals`.
  React.useEffect(() => {
    if (operator !== leaf.operator) onChange({ operator });
  }, [leaf.operator, onChange, operator]);

  const selectMember = (name: string): void => {
    const next = findMember(meta, name);
    onChange({ member: name, operator: operatorsForType(next?.type)[0], values: [] });
  };

  return (
    <div className="cv-filter-edit">
      <div className="cv-filter-edit-header">
        <span className="cv-filter-edit-title">Filter</span>
        <div className="cv-filter-edit-actions">
          {onDone && leaf.member ? (
            <Button variant="ghost" size="sm" className="cv-filter-done" onClick={onDone}>
              <Check className="cv-ec-icon" /> Done
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            className="cv-ec-remove cv-ec-remove--7"
            disabled={disabled}
            onClick={onRemove}
            aria-label="Remove filter"
          >
            <Trash2 className="cv-ec-icon" />
          </Button>
        </div>
      </div>

      <div className="cv-ec-field">
        <span id={fieldLabelId} className="cv-ec-label">Field</span>
        {scope ? (
          // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
          // search, join-scope. Including Dates makes time dimensions filterable.
          <FieldPickerPopover
            well={FILTER_WELL}
            placed={[]}
            scope={scope}
            blockReason={() => undefined}
            onSelect={selectMember}
            side="bottom"
            align="start"
          >
            <button
              type="button"
              id={fieldTriggerId}
              disabled={disabled}
              // Caption FIRST, then the trigger's own text, so the name reads
              // "Field · Region" rather than replacing the value with the caption.
              aria-labelledby={`${fieldLabelId} ${fieldTriggerId}`}
              className="cv-filter-field-trigger"
            >
              {member ? (
                <span className="cv-filter-field-value">
                  <MemberUnitChip option={member} />
                  <span className="cv-ec-truncate">{member.label}</span>
                </span>
              ) : (
                <span className="cv-filter-field-placeholder">Choose a field…</span>
              )}
              <ChevronDown className="cv-ec-icon--lg cv-ec-icon--muted" />
            </button>
          </FieldPickerPopover>
        ) : (
          <MemberPicker
            cube={cube}
            cubes={cubes}
            kind="dimensionOrMeasure"
            value={leaf.member || undefined}
            onChange={selectMember}
            placeholder="Choose a field…"
            disabled={disabled}
          />
        )}
      </div>

      <div className="cv-ec-field">
        <span id={conditionLabelId} className="cv-ec-label">Condition</span>
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
          <SelectTrigger
            id={conditionTriggerId}
            aria-labelledby={`${conditionLabelId} ${conditionTriggerId}`}
            className="cv-ec-full"
          >
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
      </div>

      {needsValue ? (
        <div className="cv-ec-field">
          <label id={valueLabelId} htmlFor={valueFieldId} className="cv-ec-label">
            Value
          </label>
          <FilterValueField
            fieldId={valueFieldId}
            labelId={valueLabelId}
            values={leaf.values}
            memberType={member?.type}
            onChange={(values) => onChange({ values })}
          />
        </div>
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
  /** Id for the free-text field, so the row's "Value" label can point at it. */
  fieldId?: string;
  /** Id of the "Value" label — names the Value | Variable group for assistive tech. */
  labelId?: string;
}

/**
 * A filter's value — a FIXED literal (date range for time members, else comma-separated
 * scalars) OR a `{var}` binding — through the shared {@link ValueBinding}. A bound filter
 * is `values: [{var}]`; the resolver spreads multi-select variables + drops empties.
 */
function FilterValueField({
  values,
  memberType,
  onChange,
  fieldId,
  labelId,
}: FilterValueFieldProps): React.ReactElement {
  const list = values ?? [];
  const bound = list.length === 1 && isVarRef(list[0]);

  if (memberType === "time") {
    const current: DateRange | VarRef | undefined = bound ? (list[0] as VarRef) : toDateRange(list);
    return (
      <ValueBinding
        labelId={labelId}
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
      labelId={labelId}
      kind={bindKind}
      value={current}
      onChange={(next) =>
        onChange(next === undefined ? [] : isVarRef(next) ? [next] : (next as Scalar[]))
      }
      renderFixed={(arr, set) => (
        <Input
          id={fieldId}
          value={(arr ?? []).map(String).join(", ")}
          onChange={(e) => set(splitValues(e.target.value))}
          placeholder="value, value…"
          className="cv-ec-h8"
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
