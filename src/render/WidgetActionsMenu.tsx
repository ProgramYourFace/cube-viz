import * as React from "react";
import { Download, MoreVertical, RefreshCw } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";

import { downloadFile, rowsToCsv } from "./csv";

export interface WidgetActionsMenuProps {
  /** Widget title — used to name the exported file. */
  title?: string;
  /** Resolved rows behind the chart (for CSV export). */
  rows: Record<string, unknown>[];
  /** Force a re-fetch (Refresh). */
  refetch?: () => void;
}

/**
 * The chart chrome's actions menu (data export + refresh) — the embeddability seam
 * that lets a dashboard viewer get the data behind a chart out, and refresh stale
 * data, without leaving the view. Renders nothing when there's nothing to offer.
 */
export function WidgetActionsMenu({ title, rows, refetch }: WidgetActionsMenuProps): React.ReactElement | null {
  const canExport = rows.length > 0;
  if (!canExport && !refetch) return null;

  const exportCsv = (): void => {
    const name = (title ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    downloadFile(rowsToCsv(rows), `${name}.csv`);
  };

  // Stop pointer/mouse-down from starting an RGL drag (the menu lives in the drag handle).
  const stop = (e: React.SyntheticEvent): void => e.stopPropagation();

  return (
    <Popover>
      <PopoverTrigger
        onMouseDown={stop}
        onPointerDown={stop}
        onTouchStart={stop}
        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Chart actions"
        title="Actions"
      >
        <MoreVertical className="size-4" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-1" onMouseDown={stop} onPointerDown={stop} onTouchStart={stop}>
        {refetch ? (
          <button
            type="button"
            onClick={refetch}
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
          >
            <RefreshCw className="size-3.5 text-muted-foreground" />
            Refresh
          </button>
        ) : null}
        <button
          type="button"
          onClick={exportCsv}
          disabled={!canExport}
          className={cn(
            "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
            !canExport && "cursor-not-allowed opacity-50",
          )}
        >
          <Download className="size-3.5 text-muted-foreground" />
          Export CSV
        </button>
      </PopoverContent>
    </Popover>
  );
}
