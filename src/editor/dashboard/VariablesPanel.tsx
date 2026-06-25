import * as React from "react";
import { Plus, Trash2 } from "lucide-react";

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

  return (
    <Section
      title="Variables"
      summary={variables.length > 0 ? `${variables.length}` : undefined}
      actions={
        <Button variant="ghost" size="sm" onClick={add}>
          <Plus /> Add
        </Button>
      }
    >
      {variables.length === 0 ? (
        <p className="cv:py-1 cv:text-xs cv:text-muted-foreground">
          No variables. Variables bind input controls and `{"{var}"}` query tokens.
        </p>
      ) : (
        <div className="cv:flex cv:flex-col cv:gap-3">
          {variables.map((v, i) => (
            <VariableRow
              key={i}
              decl={v}
              duplicate={variables.some((o, j) => j !== i && o.name === v.name && v.name !== "")}
              onChange={(patch) => update(i, patch)}
              onRemove={() => remove(i)}
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
  duplicate,
  onChange,
  onRemove,
}: {
  decl: VariableDecl;
  duplicate: boolean;
  onChange: (patch: Partial<VariableDecl>) => void;
  onRemove: () => void;
}): React.ReactElement {
  const nameError = decl.name === "" ? "Name required" : duplicate ? "Duplicate name" : undefined;
  return (
    <div
      data-slot="variable-row"
      className="cv:rounded-md cv:border cv:border-border cv:bg-card/40 cv:p-2.5"
    >
      <div className="cv:mb-1 cv:flex cv:items-start cv:justify-between cv:gap-2">
        <div className="cv:min-w-0 cv:flex-1">
          <FieldRow label="Name" error={nameError} className="cv:py-0">
            <Input
              value={decl.name}
              placeholder="variable_name"
              aria-invalid={nameError ? true : undefined}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </FieldRow>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="cv:mt-6 cv:size-8 cv:shrink-0 cv:text-muted-foreground"
          aria-label="Remove variable"
          onClick={onRemove}
        >
          <Trash2 />
        </Button>
      </div>

      <FieldRow label="Type" className="cv:py-1">
        <Select
          value={decl.type}
          onValueChange={(t) => onChange({ type: t as VariableType })}
        >
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
