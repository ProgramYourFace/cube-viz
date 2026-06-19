import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/components/ui/utils";
import { FormatKindSchema, type FormatKind, type FormatOptions } from "@/spec";

import { FieldRow } from "../primitives/FieldRow";

/**
 * Editor for a {@link FormatOptions} override (docs/03 §A3.1 step 7): kind, decimals,
 * prefix, suffix, and (for `date`) a date format pattern. Unit system is HOST-level
 * (the provider's `locale.unitSystem`), never edited here. Emits a sparse object —
 * empty/blank fields are omitted, and an all-empty result emits `undefined` so the
 * spec stays minimal (defaults live in the chart family layer).
 */

const KIND_LABELS: Record<FormatKind, string> = {
  auto: "Auto",
  number: "Number",
  percent: "Percent",
  currency: "Currency",
  duration: "Duration",
  date: "Date",
};

export interface FormatOptionsEditorProps {
  value?: FormatOptions;
  onChange: (next: FormatOptions | undefined) => void;
  /** Hide the `kind` selector (e.g. when the parent forces a kind). */
  hideKind?: boolean;
  /** Prefix for generated control ids so labels focus the right control. */
  idPrefix?: string;
  disabled?: boolean;
  className?: string;
}

export function FormatOptionsEditor({
  value,
  onChange,
  hideKind,
  idPrefix = "fmt",
  disabled,
  className,
}: FormatOptionsEditorProps): React.ReactElement {
  const fmt = value ?? {};

  const patch = (next: Partial<FormatOptions>): void => {
    const merged: FormatOptions = { ...fmt, ...next };
    // Drop keys set back to undefined/empty so the emitted object stays sparse.
    const cleaned: FormatOptions = {};
    if (merged.kind !== undefined) cleaned.kind = merged.kind;
    if (merged.decimals !== undefined) cleaned.decimals = merged.decimals;
    if (merged.abbreviate !== undefined) cleaned.abbreviate = merged.abbreviate;
    if (merged.prefix) cleaned.prefix = merged.prefix;
    if (merged.suffix) cleaned.suffix = merged.suffix;
    if (merged.unitSystem !== undefined) cleaned.unitSystem = merged.unitSystem;
    if (merged.dateFormat) cleaned.dateFormat = merged.dateFormat;
    onChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  const decimalsId = `${idPrefix}-decimals`;
  const prefixId = `${idPrefix}-prefix`;
  const suffixId = `${idPrefix}-suffix`;
  const dateId = `${idPrefix}-dateFormat`;

  return (
    <div data-slot="format-options-editor" className={cn("flex flex-col", className)}>
      {!hideKind ? (
        <FieldRow label="Kind">
          <Select
            value={fmt.kind ?? "auto"}
            onValueChange={(v) =>
              patch({ kind: v === "auto" ? undefined : (v as FormatKind) })
            }
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FormatKindSchema.options.map((k) => (
                <SelectItem key={k} value={k}>
                  {KIND_LABELS[k]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldRow>
      ) : null}

      <FieldRow label="Decimals" htmlFor={decimalsId}>
        <Input
          id={decimalsId}
          type="number"
          min={0}
          max={10}
          value={fmt.decimals ?? ""}
          onChange={(e) =>
            patch({ decimals: e.target.value === "" ? undefined : Number(e.target.value) })
          }
          placeholder="auto"
          disabled={disabled}
        />
      </FieldRow>

      <div className="grid grid-cols-2 gap-2">
        <FieldRow label="Prefix" htmlFor={prefixId}>
          <Input
            id={prefixId}
            value={fmt.prefix ?? ""}
            onChange={(e) => patch({ prefix: e.target.value })}
            placeholder="$"
            disabled={disabled}
          />
        </FieldRow>
        <FieldRow label="Suffix" htmlFor={suffixId}>
          <Input
            id={suffixId}
            value={fmt.suffix ?? ""}
            onChange={(e) => patch({ suffix: e.target.value })}
            placeholder="%"
            disabled={disabled}
          />
        </FieldRow>
      </div>

      {fmt.kind === "date" ? (
        <FieldRow label="Date format" htmlFor={dateId} hint="e.g. MMM d, yyyy">
          <Input
            id={dateId}
            value={fmt.dateFormat ?? ""}
            onChange={(e) => patch({ dateFormat: e.target.value })}
            placeholder="MMM d, yyyy"
            disabled={disabled}
          />
        </FieldRow>
      ) : null}
    </div>
  );
}
