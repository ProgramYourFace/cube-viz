import * as React from "react";
import { Check, Plus, Variable as VariableIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useOptionalDashboard } from "@/hooks";

import { compatibleVars, newVariable, type BindKind } from "./variable-binding";
import { useVariableAdmin } from "./variable-admin";

export interface VariablePickerProps {
  /** Which value slot this binds (decides compatible variable types + new-var type). */
  kind: BindKind;
  /** Currently bound variable name, or undefined (unbound). */
  value?: string;
  onChange: (name: string) => void;
  className?: string;
}

/**
 * Pick a dashboard variable to bind a value to — listing only TYPE-COMPATIBLE
 * variables, with an inline "New variable" affordance (when a {@link useVariableAdmin}
 * provider is present) that mints a typed variable and binds it in one step.
 */
export function VariablePicker({ kind, value, onChange, className }: VariablePickerProps): React.ReactElement {
  const dashboard = useOptionalDashboard();
  const decls = dashboard?.decls ?? [];
  const { createVariable } = useVariableAdmin();

  const [open, setOpen] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const [label, setLabel] = React.useState("");

  const options = React.useMemo(() => compatibleVars(decls, kind), [decls, kind]);
  const selected = options.find((d) => d.name === value);

  const pick = (name: string): void => {
    onChange(name);
    setOpen(false);
    setCreating(false);
  };

  const create = (): void => {
    if (!createVariable) return;
    const decl = newVariable(kind, label || "Variable", decls);
    createVariable(decl);
    pick(decl.name);
    setLabel("");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setCreating(false);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={cn("cv-var-trigger", className)}>
          <VariableIcon className="cv-ec-icon cv-ec-icon--muted" />
          <span className={cn("cv-var-trigger-label", !selected && "cv-var-trigger-label--placeholder")}>
            {selected ? (selected.label ?? selected.name) : value || "Choose variable…"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="cv-var-popover">
        {options.length > 0 ? (
          options.map((d) => (
            <button
              key={d.name}
              type="button"
              onClick={() => pick(d.name)}
              className="cv-ec-menu-item"
            >
              <span className="cv-ec-menu-label">{d.label ?? d.name}</span>
              <span className="cv-var-type">{d.type}</span>
              {d.name === value ? <Check className="cv-ec-icon" /> : null}
            </button>
          ))
        ) : (
          <p className="cv-var-empty">No matching variables yet.</p>
        )}

        {createVariable ? (
          <div className="cv-var-new">
            {creating ? (
              <div className="cv-var-new-form">
                <Input
                  autoFocus
                  // The visible text is the placeholder, so the name lives in aria-label.
                  aria-label="New variable label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") create();
                    if (e.key === "Escape") setCreating(false);
                  }}
                  placeholder="Variable label…"
                  className="cv-var-new-input"
                />
                <Button size="sm" className="cv-var-new-add" onClick={create}>
                  Add
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCreating(true)}
                className="cv-ec-menu-item cv-var-new-trigger"
              >
                <Plus className="cv-ec-icon" />
                New variable
              </button>
            )}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
