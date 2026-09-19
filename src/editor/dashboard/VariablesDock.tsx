import * as React from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Plus, Trash2, X } from "lucide-react";

import {
  VariableTypeSchema,
  type DashboardSpec,
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
import { useParsedText } from "../primitives/useParsedText";
import { defaultForType, newVariable } from "./factories";
import {
  removeVariable,
  renameVariable,
  usageSummary,
  variableUsages,
  type VariableUsage,
} from "./variableUsage";

/**
 * Declare / edit / remove the dashboard's {@link VariableDecl}[] (docs/03 §A3.2
 * "Variables") in a DOCKED right-hand panel, beside a live canvas — it replaced a
 * full-screen overlay that unmounted the board, so you could not see the input widgets
 * you were declaring variables for.
 *
 * Every mutation goes through the pure rewrites in `variableUsage.ts` rather than
 * patching the declaration in place: a rename carries every `{var}` token and input
 * binding with it, and a delete unbinds instead of orphaning. Each row therefore also
 * states who depends on it ("2 inputs · 5 queries"), and deleting something in use
 * asks first.
 *
 * The dock emits pure spec TRANSFORMS (not a finished spec), so two edits in one tick
 * compose through the editor's single commit seam.
 */

export interface VariablesDockProps {
  spec: DashboardSpec;
  /** Apply a pure spec transform through the editor's commit seam. */
  onChange: (update: (prev: DashboardSpec) => DashboardSpec) => void;
  /** Close the dock (the toolbar's Variables toggle mirrors this). */
  onClose?: () => void;
  /** Mint a unique fallback variable name when adding. */
  newName?: () => string;
  className?: string;
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

export function VariablesDock({
  spec,
  onChange,
  onClose,
  newName,
  className,
}: VariablesDockProps): React.ReactElement {
  const variables = spec.variables;
  const usages = React.useMemo(() => variableUsages(spec), [spec]);
  // The row to focus after "Add variable" — a fresh row opens ready to be named.
  const [focusName, setFocusName] = React.useState<string | null>(null);

  const counterRef = React.useRef(0);
  const mintName = (): string => {
    if (newName) return newName();
    let candidate: string;
    do {
      candidate = `var_${++counterRef.current}`;
    } while (variables.some((v) => v.name === candidate));
    return candidate;
  };

  const patch = (name: string, values: Partial<VariableDecl>): void =>
    onChange((d) => ({
      ...d,
      variables: d.variables.map((v) => (v.name === name ? mergeDecl(v, values) : v)),
    }));

  const add = (): void => {
    const name = mintName();
    onChange((d) => ({ ...d, variables: [...d.variables, newVariable(name)] }));
    setFocusName(name);
  };

  // Reorder (declaration order = the order controls render in). Matched by NAME so a
  // stale index can never swap the wrong pair.
  const move = (name: string, dir: -1 | 1): void =>
    onChange((d) => {
      const idx = d.variables.findIndex((v) => v.name === name);
      const j = idx + dir;
      if (idx < 0 || j < 0 || j >= d.variables.length) return d;
      const next = d.variables.slice();
      [next[idx], next[j]] = [next[j], next[idx]];
      return { ...d, variables: next };
    });

  return (
    <aside
      data-slot="variables-dock"
      aria-label="Dashboard variables"
      className={cn("cv-variables-dock", className)}
    >
      <div className="cv-variables-dock-header">
        <span className="cv-variables-dock-title">
          Variables
          {variables.length > 0 ? (
            <span className="cv-variables-dock-count">{variables.length}</span>
          ) : null}
        </span>
        <div className="cv-variables-dock-header-actions">
          <Button variant="outline" size="sm" onClick={add}>
            <Plus /> Add variable
          </Button>
          {onClose ? (
            <Button
              variant="ghost"
              size="icon"
              className="cv-ed-btn-7"
              aria-label="Close variables"
              onClick={onClose}
            >
              <X />
            </Button>
          ) : null}
        </div>
      </div>

      <div className="cv-variables-dock-body">
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
                key={v.name || `unnamed-${i}`}
                decl={v}
                index={i}
                total={variables.length}
                usage={usages[v.name]}
                takenNames={variables.filter((_, j) => j !== i).map((o) => o.name)}
                autoFocusName={focusName === v.name}
                onNameCommitted={() => setFocusName(null)}
                onRename={(to) => onChange((d) => renameVariable(d, v.name, to))}
                onPatch={(values) => patch(v.name, values)}
                onRemove={() => onChange((d) => removeVariable(d, v.name))}
                onMove={(dir) => move(v.name, dir)}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
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
  usage,
  takenNames,
  autoFocusName,
  onNameCommitted,
  onRename,
  onPatch,
  onRemove,
  onMove,
}: {
  decl: VariableDecl;
  index: number;
  total: number;
  usage: VariableUsage | undefined;
  takenNames: string[];
  autoFocusName: boolean;
  onNameCommitted: () => void;
  onRename: (to: string) => void;
  onPatch: (patch: Partial<VariableDecl>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}): React.ReactElement {
  const [open, setOpen] = React.useState(true);
  const labelId = React.useId();

  // The name is EDITED locally and committed on blur/Enter — every keystroke can't go
  // through `renameVariable` (a half-typed name would rewrite every binding to garbage).
  const [draftName, setDraftName] = React.useState(decl.name);
  React.useEffect(() => setDraftName(decl.name), [decl.name]);
  const trimmed = draftName.trim();
  const nameError =
    trimmed === ""
      ? "Name required"
      : takenNames.includes(trimmed) && trimmed !== decl.name
        ? "Name already used"
        : undefined;

  const commitName = (): void => {
    if (nameError || trimmed === decl.name) {
      if (nameError) return; // keep the invalid text visible with its error
      onNameCommitted();
      return;
    }
    onRename(trimmed);
    onNameCommitted();
  };

  // Deleting something in use is a two-step: the button states the blast radius first.
  const uses = (usage?.inputs.length ?? 0) + (usage?.refs ?? 0);
  const [confirming, setConfirming] = React.useState(false);
  React.useEffect(() => {
    if (!confirming) return;
    const t = setTimeout(() => setConfirming(false), 5000);
    return () => clearTimeout(t);
  }, [confirming]);

  return (
    <div data-slot="variable-row" className="cv-variable-row">
      {/* Header: collapse toggle · name · type badge · reorder. */}
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
          value={draftName}
          placeholder="variable_name"
          aria-label="Variable name"
          aria-invalid={nameError ? true : undefined}
          autoFocus={autoFocusName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={commitName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitName();
            } else if (e.key === "Escape") {
              setDraftName(decl.name);
            }
          }}
          className="cv-variable-row-name"
        />
        <span className="cv-variable-row-type">{TYPE_LABELS[decl.type]}</span>
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
        </div>
      </div>
      {nameError ? <p className="cv-variable-row-error">{nameError}</p> : null}

      {/* Body: the variable's full configuration (collapsible to manage long lists). */}
      {open ? (
        <div className="cv-variable-row-body">
          <FieldRow label="Type" className="cv-ed-row-tight">
            <Select value={decl.type} onValueChange={(t) => onPatch({ type: t as VariableType })}>
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
              onChange={(e) => onPatch({ label: e.target.value })}
            />
          </FieldRow>

          <SwitchRow
            label="Array"
            hint="Holds multiple values (multi-select)."
            checked={decl.array ?? false}
            onChange={(array) => onPatch({ array })}
          />

          <DefaultField decl={decl} onChange={(def) => onPatch({ default: def })} />

          {/* Who depends on this variable — and the delete that unbinds them. */}
          <div className="cv-variable-row-usage">
            <span
              className={cn(
                "cv-variable-row-usage-text",
                uses === 0 && "cv-variable-row-usage-text--none",
              )}
            >
              {uses === 0 ? "Unused" : `Used by ${usageSummary(usage)}`}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className={cn("cv-ed-muted", "cv-ed-hover-danger", confirming && "cv-ed-danger")}
              onClick={() => {
                if (uses > 0 && !confirming) {
                  setConfirming(true);
                  return;
                }
                onRemove();
              }}
            >
              <Trash2 />
              {confirming ? `Remove (in use by ${uses})` : "Remove"}
            </Button>
          </div>
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
      <SwitchRow label="Default" checked={decl.default === true} onChange={(b) => onChange(b)} />
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

  if (decl.array) {
    return (
      <FieldRow label="Default" htmlFor={defaultId} hint={hint} className="cv-ed-row-tight">
        <ListDefaultInput
          id={defaultId}
          value={Array.isArray(decl.default) ? decl.default.map(String) : []}
          placeholder={defaultPlaceholder(decl.type)}
          onChange={onChange}
        />
      </FieldRow>
    );
  }

  return (
    <FieldRow label="Default" htmlFor={defaultId} hint={hint} className="cv-ed-row-tight">
      <Input
        id={defaultId}
        value={stringifyScalar(decl.default)}
        placeholder={defaultPlaceholder(decl.type)}
        onChange={(e) => {
          const raw = e.target.value;
          onChange(raw === "" ? undefined : raw);
        }}
      />
    </FieldRow>
  );
}

/** Comma-separated list → trimmed non-empty values (every intermediate string parses). */
function splitList(text: string): string[] {
  return text.split(",").map((s) => s.trim()).filter(Boolean);
}
function joinList(values: string[]): string {
  return values.join(", ");
}

/**
 * The comma-separated default of a multi-value variable. Buffered raw text
 * ({@link useParsedText}) so the comma being typed between two values survives —
 * derived from the parsed list, "a," re-rendered as "a" and the comma was lost.
 */
function ListDefaultInput({
  id,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  value: string[];
  placeholder: string;
  onChange: (value: VariableValue | undefined) => void;
}): React.ReactElement {
  const { text, onText, onBlur } = useParsedText<string[]>({
    value,
    parse: splitList,
    format: joinList,
    onChange: (list) => onChange(list.length === 0 ? undefined : list),
  });
  return (
    <Input
      id={id}
      value={text}
      placeholder={placeholder}
      onChange={(e) => onText(e.target.value)}
      onBlur={onBlur}
    />
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
