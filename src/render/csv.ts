/**
 * Tiny CSV export helpers for the widget actions menu. Operates on the resolved
 * `tablePivot()` rows (member-keyed), so the export matches what the chart fetched.
 */

/** Build a CSV string from row objects (columns = the first row's keys, in order). */
export function rowsToCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown): string => {
    let s = v === null || v === undefined ? "" : String(v);
    // CSV formula injection: a spreadsheet treats a cell beginning with =, +, -, @, or a
    // leading tab/CR as a FORMULA, so a tenant-controlled value like `=HYPERLINK(...)` or
    // `@SUM(...)` would execute on open. Neutralize by prefixing a single quote — EXCEPT
    // for values that are genuinely numeric (a real measure like -12.5), which are inert
    // and must not be corrupted. Applied before the quote/escape rule below.
    if (/^[=+\-@\t\r]/.test(s) && !Number.isFinite(Number(s))) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const head = cols.map(esc).join(",");
  const body = rows.map((r) => cols.map((c) => esc(r[c])).join(",")).join("\n");
  return `${head}\n${body}`;
}

/** Trigger a browser download of `content` as `filename`. */
export function downloadFile(
  content: string,
  filename: string,
  mime = "text/csv;charset=utf-8",
): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  // A DETACHED anchor + SYNCHRONOUS revoke silently fails to download in WKWebView (the
  // iOS Expo DOM component) and Firefox — the click's async fetch of the blob URL races
  // the revoke. Attach to the DOM, click, remove, and defer revocation a tick so the
  // download has committed. (Matches imageExport's triggerDownload.)
  a.style.display = "none";
  (document.body ?? document.documentElement).appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
