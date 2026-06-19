import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/utils";
import type { ChartColorToken, FormatOptions, SeriesMeta } from "@/spec";

import { ColorTokenPicker } from "../primitives/ColorTokenPicker";
import { FieldRow } from "../primitives/FieldRow";
import { FormatOptionsEditor } from "./FormatOptionsEditor";

/**
 * Per-measure sub-controls (docs/03 §A3.1 step 2): each selected measure gets a
 * label override, a series color token, and a {@link FormatOptions} override. Edits
 * a single measure's {@link SeriesMeta}; the parent stores the result back into
 * `mapping.series.meta[member]`. Emits a sparse `SeriesMeta` (empty → `undefined`).
 */

export interface SeriesMetaEditorProps {
  member: string;
  /** Best display label for the measure (from `/v1/meta`), shown as placeholder. */
  defaultLabel: string;
  value?: SeriesMeta;
  onChange: (next: SeriesMeta | undefined) => void;
  disabled?: boolean;
  className?: string;
}

export function SeriesMetaEditor({
  member,
  defaultLabel,
  value,
  onChange,
  disabled,
  className,
}: SeriesMetaEditorProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const meta = value ?? {};

  const patch = (next: Partial<SeriesMeta>): void => {
    const merged: SeriesMeta = { ...meta, ...next };
    const cleaned: SeriesMeta = {};
    if (merged.label) cleaned.label = merged.label;
    if (merged.colorToken !== undefined) cleaned.colorToken = merged.colorToken;
    if (merged.stackId) cleaned.stackId = merged.stackId;
    if (merged.axis !== undefined) cleaned.axis = merged.axis;
    if (merged.format !== undefined) cleaned.format = merged.format;
    onChange(Object.keys(cleaned).length > 0 ? cleaned : undefined);
  };

  const labelId = `series-label-${member}`;

  return (
    <div
      data-slot="series-meta-editor"
      className={cn("rounded-md border border-border bg-background", className)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 px-2 py-1.5 text-left text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-md"
      >
        {open ? (
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        )}
        <span
          className="size-3 shrink-0 rounded-full border border-black/10"
          style={{ backgroundColor: `var(--${meta.colorToken ?? "chart-1"})` }}
          aria-hidden
        />
        <span className="min-w-0 flex-1 truncate" title={member}>
          {meta.label || defaultLabel}
        </span>
      </button>
      {open ? (
        <div className="flex flex-col gap-1 border-t border-border px-2 pb-2 pt-1">
          <FieldRow label="Label" htmlFor={labelId}>
            <Input
              id={labelId}
              value={meta.label ?? ""}
              onChange={(e) => patch({ label: e.target.value })}
              placeholder={defaultLabel}
              disabled={disabled}
            />
          </FieldRow>
          <FieldRow label="Color">
            <ColorTokenPicker
              value={meta.colorToken}
              onChange={(token: ChartColorToken | null) =>
                patch({ colorToken: token ?? undefined })
              }
              disabled={disabled}
            />
          </FieldRow>
          <FieldRow label="Format">
            <FormatOptionsEditor
              value={meta.format}
              onChange={(format: FormatOptions | undefined) => patch({ format })}
              idPrefix={`series-fmt-${member}`}
              disabled={disabled}
            />
          </FieldRow>
        </div>
      ) : null}
    </div>
  );
}
