import * as React from "react";

import { cn } from "@/components/ui/utils";
import { isVarRef, type VarRef } from "@/spec";

import { VariablePicker } from "./VariablePicker";
import type { BindKind } from "./variable-binding";

export interface ValueBindingProps<T> {
  /** The value slot (decides the fixed editor + which variables can bind). */
  kind: BindKind;
  /** Current value: a fixed literal, a `{var}` binding, or unset. */
  value: T | VarRef | undefined;
  onChange: (next: T | VarRef | undefined) => void;
  /** Render the FIXED-value editor (a calendar, granularity select, text input…). */
  renderFixed: (value: T | undefined, set: (v: T | undefined) => void) => React.ReactNode;
}

/**
 * The one control for any value that can be a FIXED literal OR bound to a dashboard
 * variable: a Value | Variable toggle over a {@link VariablePicker} and a caller-
 * supplied fixed editor. Switching to "Variable" keeps the current literal live until
 * a variable is picked (so the preview never blanks mid-bind).
 */
export function ValueBinding<T>({ kind, value, onChange, renderFixed }: ValueBindingProps<T>): React.ReactElement {
  const bound = isVarRef(value);
  const [mode, setMode] = React.useState<"fixed" | "var">(bound ? "var" : "fixed");

  // Reflect an external switch into a bound value (e.g. spec re-seed).
  React.useEffect(() => {
    if (bound) setMode("var");
  }, [bound]);

  const seg = (active: boolean): string =>
    cn(
      "flex-1 rounded-sm px-2 py-1 text-center transition-colors",
      active ? "bg-background font-medium shadow-sm" : "text-muted-foreground hover:text-foreground",
    );

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex rounded-md bg-muted p-0.5 text-[11px]">
        <button
          type="button"
          className={seg(mode === "fixed")}
          onClick={() => {
            setMode("fixed");
            if (isVarRef(value)) onChange(undefined);
          }}
        >
          Value
        </button>
        <button type="button" className={seg(mode === "var")} onClick={() => setMode("var")}>
          Variable
        </button>
      </div>

      {mode === "var" ? (
        <VariablePicker
          kind={kind}
          value={isVarRef(value) ? value.var : undefined}
          onChange={(name) => onChange({ var: name })}
        />
      ) : (
        renderFixed(isVarRef(value) ? undefined : (value as T | undefined), (v) => onChange(v))
      )}
    </div>
  );
}
