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
        <Button variant="outline" size="sm" className={cn("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", className)}>
          <VariableIcon className="cv:size-3.5 cv:text-muted-foreground" />
          <span className={cn("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !selected && "cv:text-muted-foreground")}>
            {selected ? (selected.label ?? selected.name) : value || "Choose variable…"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="cv:w-60 cv:p-1">
        {options.length > 0 ? (
          options.map((d) => (
            <button
              key={d.name}
              type="button"
              onClick={() => pick(d.name)}
              className="cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent"
            >
              <span className="cv:min-w-0 cv:flex-1 cv:truncate">{d.label ?? d.name}</span>
              <span className="cv:shrink-0 cv:text-[10px] cv:text-muted-foreground">{d.type}</span>
              {d.name === value ? <Check className="cv:size-3.5 cv:shrink-0" /> : null}
            </button>
          ))
        ) : (
          <p className="cv:px-2 cv:py-1.5 cv:text-xs cv:text-muted-foreground">No matching variables yet.</p>
        )}

        {createVariable ? (
          <div className="cv:mt-1 cv:border-t cv:border-border cv:pt-1">
            {creating ? (
              <div className="cv:flex cv:items-center cv:gap-1 cv:p-1">
                <Input
                  autoFocus
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") create();
                    if (e.key === "Escape") setCreating(false);
                  }}
                  placeholder="Variable label…"
                  className="cv:h-7 cv:text-sm"
                />
                <Button size="sm" className="cv:h-7 cv:shrink-0" onClick={create}>
                  Add
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCreating(true)}
                className="cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground"
              >
                <Plus className="cv:size-3.5" />
                New variable
              </button>
            )}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
