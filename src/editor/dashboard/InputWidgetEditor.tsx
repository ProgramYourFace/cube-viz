import * as React from "react";
import { Check, ChevronDown, Plus, Trash2 } from "lucide-react";

import {
  GranularitySchema,
  InputControlKindSchema,
  type Granularity,
  type InputControl,
  type InputControlKind,
  type InputWidget,
  type VariableDecl,
} from "@/spec";
import { DATE_RANGE_PRESETS } from "@/render/dateRangePresets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/components/ui/utils";

import { FieldRow } from "../primitives/FieldRow";
import { SwitchRow } from "../primitives/SwitchRow";
import { CubePicker } from "../primitives/CubePicker";

/**
 * Config editor for an {@link InputWidget} (docs/03 §A3.2 "Add" → input). An input
 * widget binds a declared dashboard variable to a control kind; this panel picks the
 * variable, the kind, and the kind-specific options, always emitting a schema-valid
 * `InputControl`. It only LISTS the dashboard's declared variables — declaring new
 * ones happens in the Variables panel.
 */

export interface InputWidgetEditorProps {
  widget: InputWidget;
  /** The dashboard's declared variables (to bind the control to). */
  variables: VariableDecl[];
  onChange: (widget: InputWidget) => void;
}

const KIND_LABELS: Record<InputControlKind, string> = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch",
};

type Control = InputControl["control"];
type ControlOf<K extends InputControlKind> = Extract<Control, { kind: K }>;

/** A valid, minimal control for each kind (used when the kind changes). */
function blankControl(kind: InputControlKind): Control {
  switch (kind) {
    case "dateRange":
      return { kind: "dateRange" };
    case "granularity":
      return { kind: "granularity" };
    case "select":
      return { kind: "select", options: [] };
    case "memberSelect":
      return { kind: "memberSelect", from: "dimension" };
    case "text":
      return { kind: "text" };
    case "number":
      return { kind: "number" };
    case "toggle":
      return { kind: "toggle" };
  }
}

export function InputWidgetEditor({
  widget,
  variables,
  onChange,
}: InputWidgetEditorProps): React.ReactElement {
  const { control } = widget.control;

  const setControl = (next: Control): void =>
    onChange({ ...widget, control: { ...widget.control, control: next } });

  const setVariable = (variable: string): void =>
    onChange({ ...widget, control: { ...widget.control, variable } });

  const setKind = (kind: InputControlKind): void => {
    if (kind === control.kind) return;
    setControl(blankControl(kind));
  };

  return (
    <div className="cv-input-widget-editor">
      <FieldRow
        label="Variable"
        hint={
          variables.length === 0
            ? "No variables yet — declare one in the Variables panel."
            : "The dashboard variable this control writes."
        }
      >
        <Select
          value={widget.control.variable || undefined}
          onValueChange={setVariable}
          disabled={variables.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select variable…" />
          </SelectTrigger>
          <SelectContent>
            {variables.map((v) => (
              <SelectItem key={v.name} value={v.name}>
                {v.label ? `${v.label} (${v.name})` : v.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldRow>

      <FieldRow label="Control">
        <Select value={control.kind} onValueChange={(k) => setKind(k as InputControlKind)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {InputControlKindSchema.options.map((k) => (
              <SelectItem key={k} value={k}>
                {KIND_LABELS[k]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldRow>

      <KindOptions control={control} onChange={setControl} variables={variables} />
    </div>
  );
}

/* ───────────────────────── kind-specific option editors ─────────────────── */

function KindOptions({
  control,
  onChange,
  variables,
}: {
  control: Control;
  onChange: (next: Control) => void;
  variables: VariableDecl[];
}): React.ReactElement | null {
  switch (control.kind) {
    case "dateRange":
      return <DateRangeOptions control={control} onChange={onChange} />;
    case "granularity":
      return <GranularityOptions control={control} onChange={onChange} variables={variables} />;
    case "select":
      return <SelectOptions control={control} onChange={onChange} />;
    case "memberSelect":
      return <MemberSelectOptions control={control} onChange={onChange} />;
    case "text":
      return <TextOptions control={control} onChange={onChange} />;
    case "number":
      return <NumberOptions control={control} onChange={onChange} />;
    case "toggle":
      return null;
  }
}

function DateRangeOptions({
  control,
  onChange,
}: {
  control: ControlOf<"dateRange">;
  onChange: (next: Control) => void;
}): React.ReactElement {
  return (
    <>
      <FieldRow
        label="Presets"
        hint="Which quick ranges appear in the picker. None selected ⇒ a sensible default set."
      >
        <PresetMultiSelect
          selected={control.presets ?? []}
          onChange={(list) => onChange({ ...control, presets: list.length > 0 ? list : undefined })}
        />
      </FieldRow>
      <SwitchRow
        label="Allow future dates"
        checked={control.allowFuture ?? true}
        onChange={(allowFuture) => onChange({ ...control, allowFuture })}
      />
    </>
  );
}

/** Multiselect dropdown over the full date-range preset catalog. Stores the chosen
 *  `value`s in catalog order; empty = the dashboard's default set. */
function PresetMultiSelect({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (next: string[]) => void;
}): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const chosen = new Set(selected.map((s) => s.toLowerCase()));

  const toggle = (value: string): void => {
    const next = new Set(chosen);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    // Keep stored order = catalog order so the picker reads predictably.
    onChange(DATE_RANGE_PRESETS.filter((p) => next.has(p.value)).map((p) => p.value));
  };

  const summary =
    chosen.size === 0
      ? "Default set"
      : chosen.size === DATE_RANGE_PRESETS.length
        ? "All presets"
        : `${chosen.size} selected`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cv-preset-select-trigger">
          <span className="cv-ed-truncate">{summary}</span>
          <ChevronDown className="cv-preset-select-caret" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="cv-preset-select-popover" align="start">
        <div className="cv-preset-select-list">
          {DATE_RANGE_PRESETS.map((p) => {
            const on = chosen.has(p.value);
            return (
              <button
                key={p.value}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(p.value)}
                className="cv-preset-select-item"
              >
                <span
                  className={cn("cv-preset-select-check", on && "cv-preset-select-check--checked")}
                >
                  {on ? <Check className="cv-ed-icon-xs" /> : null}
                </span>
                {p.label}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function GranularityOptions({
  control,
  onChange,
  variables,
}: {
  control: ControlOf<"granularity">;
  onChange: (next: Control) => void;
  variables: VariableDecl[];
}): React.ReactElement {
  const selected = new Set(control.options ?? []);
  const toggle = (g: Granularity): void => {
    const next = new Set(selected);
    if (next.has(g)) next.delete(g);
    else next.add(g);
    const list = GranularitySchema.options.filter((o) => next.has(o));
    onChange({ ...control, options: list.length > 0 ? list : undefined });
  };
  const rangeVars = variables.filter((v) => v.type === "dateRange" || v.type === "time");
  const NONE = "__none__";
  return (
    <>
      <FieldRow
        label="Proportion to"
        hint="Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range)."
      >
        <Select
          value={control.rangeVariable ?? NONE}
          onValueChange={(v) => onChange({ ...control, rangeVariable: v === NONE ? undefined : v })}
          disabled={rangeVars.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder={rangeVars.length === 0 ? "No date-range variables" : "None"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE}>None</SelectItem>
            {rangeVars.map((v) => (
              <SelectItem key={v.name} value={v.name}>
                {v.label ? `${v.label} (${v.name})` : v.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldRow>
      <FieldRow label="Granularities" hint="Leave all off to offer every granularity (or the proportioned set).">
        <div className="cv-granularity-chips">
          {GranularitySchema.options.map((g) => {
            const on = selected.has(g);
            return (
              <button
                key={g}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(g)}
                className={cn("cv-granularity-chip", on && "cv-granularity-chip--on")}
              >
                {g}
              </button>
            );
          })}
        </div>
      </FieldRow>
    </>
  );
}

function SelectOptions({
  control,
  onChange,
}: {
  control: ControlOf<"select">;
  onChange: (next: Control) => void;
}): React.ReactElement {
  const setOption = (idx: number, patch: Partial<{ value: string; label: string }>): void => {
    const options = control.options.map((o, i) =>
      i === idx ? { value: patch.value ?? String(o.value), label: patch.label ?? o.label } : o,
    );
    onChange({ ...control, options });
  };
  const addOption = (): void =>
    onChange({ ...control, options: [...control.options, { value: "", label: "" }] });
  const removeOption = (idx: number): void =>
    onChange({ ...control, options: control.options.filter((_, i) => i !== idx) });

  return (
    <>
      <SwitchRow
        label="Multiple"
        hint="Allow selecting more than one option."
        checked={control.multiple ?? false}
        onChange={(multiple) => onChange({ ...control, multiple })}
      />
      <FieldRow
        label="Options"
        action={
          <Button variant="ghost" size="sm" onClick={addOption}>
            <Plus /> Add
          </Button>
        }
      >
        <div className="cv-select-options-list">
          {control.options.length === 0 ? (
            <p className="cv-ed-hint">No options yet.</p>
          ) : (
            control.options.map((opt, i) => (
              <div key={i} className="cv-select-option-row">
                <Input
                  className="cv-ed-grow"
                  // Repeated per option row, so the name is per-field (the visible
                  // cue is the placeholder) rather than a shared caption.
                  aria-label={`Option ${i + 1} label`}
                  placeholder="Label"
                  value={opt.label}
                  onChange={(e) => setOption(i, { label: e.target.value })}
                />
                <Input
                  className="cv-ed-grow"
                  aria-label={`Option ${i + 1} value`}
                  placeholder="Value"
                  value={String(opt.value)}
                  onChange={(e) => setOption(i, { value: e.target.value })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("cv-ed-btn-8", "cv-ed-muted")}
                  aria-label="Remove option"
                  onClick={() => removeOption(i)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))
          )}
        </div>
      </FieldRow>
    </>
  );
}

function MemberSelectOptions({
  control,
  onChange,
}: {
  control: ControlOf<"memberSelect">;
  onChange: (next: Control) => void;
}): React.ReactElement {
  return (
    <>
      <FieldRow label="From">
        <Select
          value={control.from}
          onValueChange={(from) =>
            onChange({ ...control, from: from as ControlOf<"memberSelect">["from"] })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dimension">Category fields</SelectItem>
            <SelectItem value="measure">Number fields</SelectItem>
            <SelectItem value="dimensionOrMeasure">All fields</SelectItem>
          </SelectContent>
        </Select>
      </FieldRow>
      <FieldRow
        label="Cube"
        hint="Optional — restrict to one cube/view."
        action={
          control.cube ? (
            <Button
              variant="ghost"
              size="sm"
              className="cv-ed-clear-btn"
              onClick={() => onChange({ ...control, cube: undefined })}
            >
              Clear
            </Button>
          ) : null
        }
      >
        <CubePicker
          value={control.cube}
          onChange={(cube) => onChange({ ...control, cube: cube || undefined })}
        />
      </FieldRow>
    </>
  );
}

function TextOptions({
  control,
  onChange,
}: {
  control: ControlOf<"text">;
  onChange: (next: Control) => void;
}): React.ReactElement {
  const id = React.useId();
  return (
    <FieldRow label="Placeholder" htmlFor={id}>
      <Input
        id={id}
        value={control.placeholder ?? ""}
        onChange={(e) => onChange({ ...control, placeholder: e.target.value || undefined })}
      />
    </FieldRow>
  );
}

function NumberOptions({
  control,
  onChange,
}: {
  control: ControlOf<"number">;
  onChange: (next: Control) => void;
}): React.ReactElement {
  // One base per editor; each of the three rows derives its own id from the key.
  const idBase = React.useId();
  const numField = (key: "min" | "max" | "step", label: string): React.ReactElement => (
    <FieldRow label={label} htmlFor={`${idBase}-${key}`}>
      <Input
        id={`${idBase}-${key}`}
        type="number"
        value={control[key] ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          onChange({ ...control, [key]: v === "" ? undefined : Number(v) });
        }}
      />
    </FieldRow>
  );
  return (
    <>
      {numField("min", "Min")}
      {numField("max", "Max")}
      {numField("step", "Step")}
    </>
  );
}
