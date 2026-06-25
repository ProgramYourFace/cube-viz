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
  granularity: "Granularity",
  string: "String",
  number: "Number",
  boolean: "Boolean",
  dimension: "Dimension",
  measure: "Measure",
  dimensionOrMeasure: "Dimension or measure",
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
        <div className="cv:rounded-md cv:border cv:border-dashed cv:border-border cv:p-4 cv:text-center">
          <p className="cv:text-sm cv:font-medium">No variables yet</p>
          <p className="cv:mt-0.5 cv:text-xs cv:text-muted-foreground">
            Variables bind input controls and resolve {"{var}"} tokens in queries.
          </p>
          <Button variant="outline" size="sm" className="cv:mt-3" onClick={add}>
            <Plus /> Add variable
          </Button>
        </div>
      ) : (
        <div className="cv:flex cv:flex-col cv:gap-2">
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

  return (
    <div
      data-slot="variable-row"
      className="cv:overflow-hidden cv:rounded-md cv:border cv:border-border cv:bg-card/40"
    >
      {/* Header: collapse toggle · name · type badge · reorder · remove. */}
      <div className="cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:py-1.5">
        <button
          type="button"
          aria-label={open ? "Collapse variable" : "Expand variable"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="cv:flex cv:size-6 cv:shrink-0 cv:items-center cv:justify-center cv:rounded cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
        >
          {open ? <ChevronDown /> : <ChevronRight />}
        </button>
        <Input
          value={decl.name}
          placeholder="variable_name"
          aria-label="Variable name"
          aria-invalid={nameError ? true : undefined}
          onChange={(e) => onChange({ name: e.target.value })}
          className="cv:h-7 cv:min-w-0 cv:flex-1 cv:font-mono cv:text-xs"
        />
        <span className="cv:hidden cv:shrink-0 cv:rounded cv:bg-muted cv:px-1.5 cv:py-0.5 cv:text-[10px] cv:font-medium cv:text-muted-foreground cv:sm:inline">
          {TYPE_LABELS[decl.type]}
        </span>
        <div className="cv:flex cv:shrink-0 cv:items-center">
          <Button
            variant="ghost"
            size="icon"
            className="cv:size-7 cv:text-muted-foreground"
            aria-label="Move variable up"
            disabled={index === 0}
            onClick={() => onMove(-1)}
          >
            <ArrowUp />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cv:size-7 cv:text-muted-foreground"
            aria-label="Move variable down"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
          >
            <ArrowDown />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cv:size-7 cv:text-muted-foreground cv:hover:text-destructive"
            aria-label="Remove variable"
            onClick={onRemove}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      {nameError ? (
        <p className="cv:px-2 cv:pb-1.5 cv:text-[11px] cv:text-destructive">{nameError}</p>
      ) : null}

      {/* Body: the variable's full configuration (collapsible to manage long lists). */}
      {open ? (
        <div className="cv:flex cv:flex-col cv:gap-1 cv:border-t cv:border-border/60 cv:p-2.5">
          <FieldRow label="Type" className="cv:py-1">
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

          <FieldRow label="Label" hint="Optional human label for controls." className="cv:py-1">
            <Input
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
      <FieldRow label="Default" className="cv:py-1">
        <Input
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
    <FieldRow label="Default" hint={hint} className="cv:py-1">
      <Input
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
