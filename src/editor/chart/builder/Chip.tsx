import * as React from "react";
import { ArrowDown, ArrowUp, Check, Palette, Pencil, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import type { ChartColorToken, Granularity } from "@/spec";

import { memberTypeIcon } from "../../primitives/MemberPicker";
import { ColorTokenPicker } from "../../primitives/ColorTokenPicker";
import { GranularityPicker } from "../../primitives/GranularityPicker";
import type { MemberOption } from "../../primitives/meta-helpers";
import type { FieldKind } from "./wells";

export type ComboRender = "bar" | "line" | "area";

export interface ChipProps {
  member: string;
  kind: FieldKind;
  /** Resolved member metadata for a humanized label + icon. */
  option?: MemberOption;
  /** A rename override (mapping.series.meta label / column label / combo label). */
  label?: string;
  /** Current series color token (number/series chips only). */
  colorToken?: ChartColorToken;
  /** When set, this chip is a date X chip and shows a granularity ▾. */
  granularity?: Granularity;
  /** When set, this chip is a combo Y chip and shows a render ▾. */
  render?: ComboRender;
  /** Reorder affordance (many-cardinality wells). */
  reorder?: { canUp: boolean; canDown: boolean; onUp: () => void; onDown: () => void };

  onRename?: (label: string | undefined) => void;
  onRecolor?: (token: ChartColorToken | null) => void;
  onGranularity?: (g: Granularity) => void;
  onRender?: (r: ComboRender) => void;
  onRemove: () => void;
}

const RENDER_LABELS: Record<ComboRender, string> = { bar: "Bar", line: "Line", area: "Area" };

/**
 * A placed-field token (docs/05 §3.3): humanized label with inline rename, optional
 * recolor / granularity / render menus, reorder, and remove. The minimal per-field
 * control surface that replaces the heavyweight SeriesMetaEditor + FormatOptionsEditor.
 */
export function Chip({
  member,
  kind,
  option,
  label,
  colorToken,
  granularity,
  render,
  reorder,
  onRename,
  onRecolor,
  onGranularity,
  onRender,
  onRemove,
}: ChipProps): React.ReactElement {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const defaultLabel = option?.label ?? member;
  const display = label || defaultLabel;
  const canColor = onRecolor !== undefined && (kind === "number");
  const isDateX = onGranularity !== undefined && granularity !== undefined;
  const isComboY = onRender !== undefined && render !== undefined;

  const startRename = (): void => {
    setDraft(label ?? "");
    setEditing(true);
  };
  const commitRename = (): void => {
    setEditing(false);
    const trimmed = draft.trim();
    onRename?.(trimmed.length > 0 ? trimmed : undefined);
  };

  return (
    <div
      data-slot="chip"
      className="flex items-center gap-1 rounded-md border border-border bg-background py-1 pl-2 pr-1 text-sm"
    >
      {canColor ? (
        <span
          className="size-3 shrink-0 rounded-full border border-black/10"
          style={{ backgroundColor: `var(--${colorToken ?? "chart-1"})` }}
          aria-hidden
        />
      ) : option ? (
        memberTypeIcon(option.type)
      ) : null}

      {editing ? (
        <Input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitRename();
            if (e.key === "Escape") setEditing(false);
          }}
          placeholder={defaultLabel}
          className="h-6 min-w-0 flex-1 px-1.5 py-0 text-sm"
        />
      ) : (
        <span className="min-w-0 flex-1 truncate" title={member}>
          {display}
        </span>
      )}

      <div className="flex shrink-0 items-center gap-0.5">
        {isDateX ? (
          <GranularityPicker
            value={granularity}
            onChange={(g) => onGranularity?.(g)}
            className="h-6 w-auto gap-1 border-none px-1.5 text-[11px] shadow-none"
          />
        ) : null}

        {isComboY ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 gap-1 px-1.5 text-[11px]">
                {RENDER_LABELS[render]}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-32 p-1">
              {(Object.keys(RENDER_LABELS) as ComboRender[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onRender?.(r)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                    render === r && "bg-accent/50",
                  )}
                >
                  {RENDER_LABELS[r]}
                  {render === r ? <Check className="size-3.5" /> : null}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        ) : null}

        {onRename ? (
          <Button
            variant="ghost"
            size="icon"
            className="size-6 text-muted-foreground"
            onClick={startRename}
            aria-label={`Rename ${display}`}
          >
            <Pencil className="size-3.5" />
          </Button>
        ) : null}

        {canColor ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 text-muted-foreground"
                aria-label={`Color ${display}`}
              >
                <Palette className="size-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-2">
              <ColorTokenPicker value={colorToken} onChange={(t) => onRecolor?.(t)} />
            </PopoverContent>
          </Popover>
        ) : null}

        {reorder ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 text-muted-foreground"
              disabled={!reorder.canUp}
              onClick={reorder.onUp}
              aria-label={`Move ${display} up`}
            >
              <ArrowUp className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 text-muted-foreground"
              disabled={!reorder.canDown}
              onClick={reorder.onDown}
              aria-label={`Move ${display} down`}
            >
              <ArrowDown className="size-3.5" />
            </Button>
          </>
        ) : null}

        <Button
          variant="ghost"
          size="icon"
          className="size-6 text-muted-foreground hover:text-destructive"
          onClick={onRemove}
          aria-label={`Remove ${display}`}
        >
          <X className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
