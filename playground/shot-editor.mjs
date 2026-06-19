import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:5181";
const chart = process.env.CHART || "Total Distance Over Time";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1480, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.getByRole("button", { name: "Edit dashboard" }).click();
await page.waitForTimeout(1000);

// Open a CHART widget's editor.
await page.locator(`[aria-label="Edit ${chart}"]`).click();
await page.waitForSelector('[data-slot="chart-edit-overlay"]', { timeout: 10000 });
await page.waitForSelector(".recharts-surface", { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(2500);
await page.screenshot({ path: "/tmp/cubeviz-editor-1.png" });

const swatches = async () =>
  page.evaluate(() => {
    const overlay = document.querySelector('[data-slot="chart-edit-overlay"]');
    const strip = overlay?.querySelector(".w-40");
    const sw = [...(strip?.querySelectorAll('[data-slot="field-pill"] span[aria-hidden]') ?? [])].map(
      (s) => getComputedStyle(s).backgroundColor,
    );
    const surf = overlay?.querySelector(".recharts-surface");
    const lines = [...new Set([...(surf?.querySelectorAll(".recharts-line-curve") ?? [])].map((l) => getComputedStyle(l).stroke))];
    const bars = [...new Set([...(surf?.querySelectorAll(".recharts-bar-rectangle path") ?? [])].map((b) => getComputedStyle(b).fill))];
    const pills = [...(overlay?.querySelectorAll('[data-slot="field-pill"]') ?? [])].map((p) => p.textContent?.trim().slice(0, 22));
    return { swatches: sw, lineColors: lines, barColors: bars.slice(0, 6), pills };
  });

console.log("=== STATE 1 (as opened) ===");
console.log(JSON.stringify(await swatches(), null, 2));

// Add a 2nd Y measure: click the left-strip add slot, pick the first enabled number.
const addBtn = page.locator('[data-slot="chart-edit-overlay"] .w-40 button', { hasText: /Add|Y axis|Value/ }).first();
if (await addBtn.count()) {
  await addBtn.click();
  await page.waitForTimeout(600);
  // Pick a second measure (first enabled row in the Numbers group).
  const row = page.locator('[role="dialog"] button, .z-50 button').filter({ hasNotText: /Search|source/ });
  // The picker content: click the first selectable member button.
  const pick = page.locator('div[data-radix-popper-content-wrapper] button').filter({ hasNot: page.locator("svg") }).first();
  await pick.click().catch(() => {});
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "/tmp/cubeviz-editor-2.png" });
  console.log("=== STATE 2 (after add 2nd Y) ===");
  console.log(JSON.stringify(await swatches(), null, 2));
}

console.log("=== console errors ===");
console.log(errors.slice(0, 10).join("\n") || "(none)");
await browser.close();
