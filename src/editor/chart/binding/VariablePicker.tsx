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
        <Button variant="outline" size="sm" className={cn("h-8 w-full justify-start gap-1.5", className)}>
          <VariableIcon className="size-3.5 text-muted-foreground" />
          <span className={cn("min-w-0 flex-1 truncate text-left", !selected && "text-muted-foreground")}>
            {selected ? (selected.label ?? selected.name) : value || "Choose variable…"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-1">
        {options.length > 0 ? (
          options.map((d) => (
            <button
              key={d.name}
              type="button"
              onClick={() => pick(d.name)}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
            >
              <span className="min-w-0 flex-1 truncate">{d.label ?? d.name}</span>
              <span className="shrink-0 text-[10px] text-muted-foreground">{d.type}</span>
              {d.name === value ? <Check className="size-3.5 shrink-0" /> : null}
            </button>
          ))
        ) : (
          <p className="px-2 py-1.5 text-xs text-muted-foreground">No matching variables yet.</p>
        )}

        {createVariable ? (
          <div className="mt-1 border-t border-border pt-1">
            {creating ? (
              <div className="flex items-center gap-1 p-1">
                <Input
                  autoFocus
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") create();
                    if (e.key === "Escape") setCreating(false);
                  }}
                  placeholder="Variable label…"
                  className="h-7 text-sm"
                />
                <Button size="sm" className="h-7 shrink-0" onClick={create}>
                  Add
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCreating(true)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Plus className="size-3.5" />
                New variable
              </button>
            )}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
