/*
 * Verifies the measurement-kind pass end-to-end against the offline mock:
 *  1. picker family rows: derived defaults (flow→total, counter→"latest"), the
 *     each-trip divider, and the partition family collapsing to one row;
 *  2. the picker header's anchor line;
 *  3. the pill popover: kind hint, and the soloHint notice appearing only once
 *     the field is its cube's sole placed member.
 * Run from the repo root with the playground dev server on :5180.
 */
import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:5180/editor.html";
const SHOTS = process.env.SHOTS || "/tmp/kind-shots";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1480, height: 1100 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

let failures = 0;
const check = (label, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
};

// ── 1. The Distance pill popover: segments + kind hint, no solo notice yet ──
await page.click('[data-slot="field-pill"] .cv-field-pill-trigger');
await page.waitForSelector(".cv-field-pill-popover");
const segs = await page.$$eval(".cv-field-pill-popover .cv-picker-aggseg-opt", (els) =>
  els.map((e) => ({ label: e.textContent, on: e.className.includes("--on") })),
);
check(
  "pill segments read total | avg | each trip, total selected",
  JSON.stringify(segs) ===
    JSON.stringify([
      { label: "total", on: true },
      { label: "avg", on: false },
      { label: "each trip", on: false },
    ]),
  JSON.stringify(segs),
);
check(
  "each-trip divider present in pill popover",
  (await page.$$(".cv-field-pill-popover .cv-picker-aggseg-divider")).length === 1,
);
const hint = await page.$$eval(".cv-field-pill-popover .cv-ec-hint", (els) =>
  els.map((e) => e.textContent),
);
check(
  "kind hint teaches the flow rule",
  hint.some((h) => h?.includes("Adds up over time")),
  JSON.stringify(hint),
);
check(
  "no solo notice while other trips fields are placed",
  (await page.$$(".cv-field-pill-notice")).length === 0,
);
// In a measures-only well the each-trip variant is DISABLED and its tooltip is the
// block reason (which wins over the grain-switch hint); on a well that accepts it,
// the tooltip is the grain-switch explanation (unit-pinned in meta-helpers.test.ts).
const eachTrip = await page.$eval(
  '.cv-field-pill-popover .cv-picker-aggseg-opt:has-text("each trip")',
  (e) => ({ title: e.title, disabled: e.disabled }),
);
check(
  "each-trip segment tooltip: block reason while disabled, grain hint otherwise",
  eachTrip.disabled
    ? eachTrip.title.length > 0 && !eachTrip.title.includes("Plots each trip")
    : eachTrip.title.includes("Plots each trip as its own point"),
  JSON.stringify(eachTrip),
);
await page.screenshot({ path: `${SHOTS}/1-pill-popover.png` });

// ── 2. Swap picker: anchor line + family rows ──
await page.click(".cv-field-pill-swap");
await page.waitForSelector(".cv-picker");
const anchor = await page.$eval(".cv-picker-anchor", (e) => e.textContent).catch(() => null);
check(
  "picker states the anchor rule",
  anchor === "Reading from Trips (one row per trip) · joined tables included",
  String(anchor),
);

// Partition family: ONE row labeled "Time breakdown" with named-part segments.
await page.fill('input[aria-label="Search fields"]', "time breakdown");
await page.waitForTimeout(400);
const partRow = await page.$$eval(".cv-picker-rowwrap", (rows) =>
  rows.map((r) => ({
    label: r.querySelector(".cv-picker-row-label, .cv-ec-truncate")?.textContent,
    segs: [...r.querySelectorAll(".cv-picker-aggseg-opt")].map((s) => ({
      label: s.textContent,
      on: s.className.includes("--on"),
    })),
  })),
);
check(
  "partition collapses to one 'Time breakdown' row with moving|idle|stopped segments (moving default)",
  partRow.length === 1 &&
    partRow[0].label === "Time breakdown" &&
    JSON.stringify(partRow[0].segs) ===
      JSON.stringify([
        { label: "moving", on: true },
        { label: "idle", on: false },
        { label: "stopped", on: false },
      ]),
  JSON.stringify(partRow),
);
await page.screenshot({ path: `${SHOTS}/2-picker-partition.png` });

// Counter family: max derives BOTH the default and the "latest" label.
await page.fill('input[aria-label="Search fields"]', "odometer");
await page.waitForTimeout(400);
const counterRow = await page.$$eval(".cv-picker-rowwrap", (rows) =>
  rows.map((r) => ({
    label: r.querySelector(".cv-picker-row-label, .cv-ec-truncate")?.textContent,
    segs: [...r.querySelectorAll(".cv-picker-aggseg-opt")].map((s) => ({
      label: s.textContent,
      on: s.className.includes("--on"),
    })),
  })),
);
check(
  "counter family reads latest | avg with latest selected",
  counterRow.length === 1 &&
    counterRow[0].label === "Odometer" &&
    JSON.stringify(counterRow[0].segs) ===
      JSON.stringify([
        { label: "latest", on: true },
        { label: "avg", on: false },
      ]),
  JSON.stringify(counterRow),
);
await page.screenshot({ path: `${SHOTS}/3-picker-counter.png` });
await page.keyboard.press("Escape");
await page.keyboard.press("Escape");

// ── 3. Solo notice: strip the other trips fields, reopen the distance pill ──
// Remove every pill except the first (the distance measure).
for (let i = 0; i < 6; i++) {
  const removes = await page.$$('[data-slot="field-pill"] .cv-ec-remove');
  if (removes.length <= 1) break;
  await removes[removes.length - 1].click();
  await page.waitForTimeout(300);
}
const left = await page.$$eval('[data-slot="field-pill"] .cv-field-pill-name', (els) =>
  els.map((e) => e.textContent),
);
check("only the distance pill remains", left.length === 1, JSON.stringify(left));
await page.click('[data-slot="field-pill"] .cv-field-pill-trigger');
await page.waitForSelector(".cv-field-pill-popover");
const notice = await page
  .$eval(".cv-field-pill-notice", (e) => e.textContent)
  .catch(() => null);
check(
  "solo notice appears once the field is its cube's only placed member",
  notice === "Adds up detected trips only.",
  String(notice),
);
await page.screenshot({ path: `${SHOTS}/4-solo-notice.png` });

await browser.close();
if (failures > 0) {
  console.error(`\n${failures} check(s) FAILED`);
  process.exit(1);
}
console.log("\nAll checks passed");
