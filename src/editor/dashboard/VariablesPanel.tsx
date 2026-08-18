import * as React from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";

import {
  VariableTypeSchema,
  type VariableDecl,
  type VariableType,
  type VariableValue,
} from "@/spec";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FieldRow } from "../primitives/FieldRow";
import { SwitchRow } from "../primitives/SwitchRow";
import { Section } from "../primitives/Section";
import { defaultForType, newVariable } from "./factories";

/**
 * Declare / edit / remove the dashboard's {@link VariableDecl}[] (docs/03 §A3.2
 * "Variables"). Each variable carries a name, type, optional label, `array` flag,
 * and a default. Date-range/time defaults PREFER relative strings ("This month")
 * over absolute pairs, so the dashboard opens with a sensible live range and never
 * bakes in stale absolute dates.
 *
 * Variable names are validated inline (non-empty, unique). The panel emits the full
 * `VariableDecl[]` on every edit; the editor owns merging it into the spec.
 */

export interface VariablesPanelProps {
  variables: VariableDecl[];
  onChange: (variables: VariableDecl[]) => void;
  /** Mint a unique fallback variable name when adding. */
  newName?: () => string;
}

const TYPE_LABELS: Record<VariableType, string> = {
  dateRange: "Date range",
  time: "Time",
  granularity: "Group dates by",
  string: "Text",
  number: "Number",
  boolean: "Yes/no",
  dimension: "Category field",
  measure: "Number field",
  dimensionOrMeasure: "Any field",
};

export function VariablesPanel({
  variables,
  onChange,
  newName,
}: VariablesPanelProps): React.ReactElement {
  const counterRef = React.useRef(0);
  const mintName = (): string => {
    if (newName) return newName();
    let candidate: string;
    do {
      candidate = `var_${++counterRef.current}`;
    } while (variables.some((v) => v.name === candidate));
    return candidate;
  };

  const update = (idx: number, patch: Partial<VariableDecl>): void => {
    onChange(variables.map((v, i) => (i === idx ? mergeDecl(v, patch) : v)));
  };
  const remove = (idx: number): void => onChange(variables.filter((_, i) => i !== idx));
  const add = (): void => onChange([...variables, newVariable(mintName())]);
  // Reorder a variable up (-1) / down (+1) — declaration order drives the order
  // controls render in.
  const move = (idx: number, dir: -1 | 1): void => {
    const j = idx + dir;
    if (j < 0 || j >= variables.length) return;
    const next = variables.slice();
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  return (
    <Section
      title="Variables"
      summary={variables.length > 0 ? `${variables.length}` : undefined}
      actions={
        <Button variant="outline" size="sm" onClick={add}>
          <Plus /> Add variable
        </Button>
      }
    >
      {variables.length === 0 ? (
        <div className="cv-variables-empty">
          <p className="cv-variables-empty-title">No variables yet</p>
          <p className="cv-variables-empty-hint">
            Variables bind input controls and resolve {"{var}"} tokens in queries.
          </p>
          <Button variant="outline" size="sm" className="cv-variables-empty-add" onClick={add}>
            <Plus /> Add variable
          </Button>
        </div>
      ) : (
        <div className="cv-variables-list">
          {variables.map((v, i) => (
            <VariableRow
              key={i}
              decl={v}
              index={i}
              total={variables.length}
              duplicate={variables.some((o, j) => j !== i && o.name === v.name && v.name !== "")}
              onChange={(patch) => update(i, patch)}
              onRemove={() => remove(i)}
              onMove={(dir) => move(i, dir)}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

/** Apply a patch, resetting the default to the type's preferred default on type change. */
function mergeDecl(decl: VariableDecl, patch: Partial<VariableDecl>): VariableDecl {
  const next: VariableDecl = { ...decl, ...patch };
  if (patch.type !== undefined && patch.type !== decl.type) {
    next.default = defaultForType(patch.type);
  }
  // Drop empty optional fields so the emitted spec stays clean.
  if (next.label === "") delete next.label;
  if (next.array === false) delete next.array;
  return next;
}

function VariableRow({
  decl,
  index,
  total,
  duplicate,
  onChange,
  onRemove,
  onMove,
}: {
  decl: VariableDecl;
  index: number;
  total: number;
  duplicate: boolean;
  onChange: (patch: Partial<VariableDecl>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}): React.ReactElement {
  const [open, setOpen] = React.useState(true);
  const nameError = decl.name === "" ? "Name required" : duplicate ? "Duplicate name" : undefined;
  // FieldRow renders its caption as a `<label htmlFor>`, so the text field below is
  // NAMED by the caption the user reads (a caption with no `for` names nothing).
  const labelId = React.useId();

  return (
    <div
      data-slot="variable-row"
      className="cv-variable-row"
    >
      {/* Header: collapse toggle · name · type badge · reorder · remove. */}
      <div className="cv-variable-row-header">
        <button
          type="button"
          aria-label={open ? "Collapse variable" : "Expand variable"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="cv-variable-row-toggle"
        >
          {open ? <ChevronDown /> : <ChevronRight />}
        </button>
        <Input
          value={decl.name}
          placeholder="variable_name"
          aria-label="Variable name"
          aria-invalid={nameError ? true : undefined}
          onChange={(e) => onChange({ name: e.target.value })}
          className="cv-variable-row-name"
        />
        <span className="cv-variable-row-type">
          {TYPE_LABELS[decl.type]}
        </span>
        <div className="cv-variable-row-actions">
          <Button
            variant="ghost"
            size="icon"
            className={cn("cv-ed-btn-7", "cv-ed-muted")}
            aria-label="Move variable up"
            disabled={index === 0}
            onClick={() => onMove(-1)}
          >
            <ArrowUp />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("cv-ed-btn-7", "cv-ed-muted")}
            aria-label="Move variable down"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
          >
            <ArrowDown />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger")}
            aria-label="Remove variable"
            onClick={onRemove}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      {nameError ? (
        <p className="cv-variable-row-error">{nameError}</p>
      ) : null}

      {/* Body: the variable's full configuration (collapsible to manage long lists). */}
      {open ? (
        <div className="cv-variable-row-body">
          <FieldRow label="Type" className="cv-ed-row-tight">
            <Select value={decl.type} onValueChange={(t) => onChange({ type: t as VariableType })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VariableTypeSchema.options.map((t) => (
                  <SelectItem key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldRow>

          <FieldRow
            label="Label"
            htmlFor={labelId}
            hint="Optional human label for controls."
            className="cv-ed-row-tight"
          >
            <Input
              id={labelId}
              value={decl.label ?? ""}
              placeholder={decl.name}
              onChange={(e) => onChange({ label: e.target.value })}
            />
          </FieldRow>

          <SwitchRow
            label="Array"
            hint="Holds multiple values (multi-select)."
            checked={decl.array ?? false}
            onChange={(array) => onChange({ array })}
          />

          <DefaultField decl={decl} onChange={(def) => onChange({ default: def })} />
        </div>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────── default editor ─────────────────────────── */

function DefaultField({
  decl,
  onChange,
}: {
  decl: VariableDecl;
  onChange: (value: VariableValue | undefined) => void;
}): React.ReactElement {
  // One id for whichever editor this type renders, paired with the FieldRow caption.
  const defaultId = React.useId();
  // Boolean default → a switch. Everything else → a text/number input. Date-range
  // and time accept relative strings ("This month", "today"), so they're text too.
  if (decl.type === "boolean") {
    return (
      <SwitchRow
        label="Default"
        checked={decl.default === true}
        onChange={(b) => onChange(b)}
      />
    );
  }

  if (decl.type === "number" && !decl.array) {
    return (
      <FieldRow label="Default" htmlFor={defaultId} className="cv-ed-row-tight">
        <Input
          id={defaultId}
          type="number"
          value={typeof decl.default === "number" ? decl.default : ""}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? undefined : Number(v));
          }}
        />
      </FieldRow>
    );
  }

  const hint =
    decl.type === "dateRange" || decl.type === "time"
      ? "Relative is preferred, e.g. This month, last 30 days."
      : decl.array
        ? "Comma-separated values."
        : undefined;

  const display =
    Array.isArray(decl.default) ? decl.default.join(", ") : stringifyScalar(decl.default);

  return (
    <FieldRow label="Default" htmlFor={defaultId} hint={hint} className="cv-ed-row-tight">
      <Input
        id={defaultId}
        value={display}
        placeholder={defaultPlaceholder(decl.type)}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") {
            onChange(undefined);
            return;
          }
          if (decl.array) {
            const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
            onChange(list);
            return;
          }
          onChange(raw);
        }}
      />
    </FieldRow>
  );
}

function stringifyScalar(v: VariableValue | undefined): string {
  if (v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

function defaultPlaceholder(type: VariableType): string {
  switch (type) {
    case "dateRange":
      return "last 30 days";
    case "time":
      return "today";
    case "granularity":
      return "day";
    default:
      return "";
  }
}
