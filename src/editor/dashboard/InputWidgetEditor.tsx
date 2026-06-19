import * as React from "react";
import { Plus, Trash2 } from "lucide-react";

import {
  GranularitySchema,
  InputControlKindSchema,
  type Granularity,
  type InputControl,
  type InputControlKind,
  type InputWidget,
  type VariableDecl,
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
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle",
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
    <div className="flex flex-col">
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

      <KindOptions control={control} onChange={setControl} />
    </div>
  );
}

/* ───────────────────────── kind-specific option editors ─────────────────── */

function KindOptions({
  control,
  onChange,
}: {
  control: Control;
  onChange: (next: Control) => void;
}): React.ReactElement | null {
  switch (control.kind) {
    case "dateRange":
      return <DateRangeOptions control={control} onChange={onChange} />;
    case "granularity":
      return <GranularityOptions control={control} onChange={onChange} />;
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
  const presets = (control.presets ?? []).join(", ");
  return (
    <>
      <FieldRow label="Presets" hint="Comma-separated relative ranges, e.g. This month, last 7 days.">
        <Input
          value={presets}
          placeholder="This month, last 7 days, last 30 days"
          onChange={(e) => {
            const list = e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            onChange({ ...control, presets: list.length > 0 ? list : undefined });
          }}
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

function GranularityOptions({
  control,
  onChange,
}: {
  control: ControlOf<"granularity">;
  onChange: (next: Control) => void;
}): React.ReactElement {
  const selected = new Set(control.options ?? []);
  const toggle = (g: Granularity): void => {
    const next = new Set(selected);
    if (next.has(g)) next.delete(g);
    else next.add(g);
    const list = GranularitySchema.options.filter((o) => next.has(o));
    onChange({ ...control, options: list.length > 0 ? list : undefined });
  };
  return (
    <FieldRow label="Granularities" hint="Leave all off to offer every granularity.">
      <div className="flex flex-wrap gap-1.5">
        {GranularitySchema.options.map((g) => {
          const on = selected.has(g);
          return (
            <button
              key={g}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(g)}
              className={
                "rounded-md border px-2 py-1 text-xs capitalize transition-colors " +
                (on
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground")
              }
            >
              {g}
            </button>
          );
        })}
      </div>
    </FieldRow>
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
        <div className="flex flex-col gap-1.5">
          {control.options.length === 0 ? (
            <p className="text-xs text-muted-foreground">No options yet.</p>
          ) : (
            control.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Input
                  className="flex-1"
                  placeholder="Label"
                  value={opt.label}
                  onChange={(e) => setOption(i, { label: e.target.value })}
                />
                <Input
                  className="flex-1"
                  placeholder="Value"
                  value={String(opt.value)}
                  onChange={(e) => setOption(i, { value: e.target.value })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0 text-muted-foreground"
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
            <SelectItem value="dimension">Dimensions</SelectItem>
            <SelectItem value="measure">Measures</SelectItem>
            <SelectItem value="dimensionOrMeasure">Dimensions &amp; measures</SelectItem>
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
              className="h-6 px-1.5 text-xs text-muted-foreground"
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
  return (
    <FieldRow label="Placeholder">
      <Input
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
  const numField = (key: "min" | "max" | "step", label: string): React.ReactElement => (
    <FieldRow label={label}>
      <Input
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
