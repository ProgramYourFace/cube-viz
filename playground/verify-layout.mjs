import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:5180";
const CHART = process.env.CHART || "Total Distance Over Time";
const OUT = process.env.OUT || "/tmp";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1480, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.getByRole("button", { name: "Edit dashboard" }).click();
await page.waitForTimeout(800);
// The drag-handle overlay intercepts the Edit button: select the widget first, then
// force-click Edit.
await page.locator(`[aria-label="Select ${CHART}"]`).click({ force: true }).catch(() => {});
await page.waitForTimeout(300);
await page.locator(`[aria-label="Edit ${CHART}"]`).click({ force: true });
await page.waitForSelector('[data-slot="chart-edit-overlay"]', { timeout: 10000 });
await page.waitForSelector(".recharts-surface", { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(2000);

// Ensure a 2nd value measure so combo/scatter (2 measures) and dual-axis are exercised.
async function ensureTwoValues() {
  const yCount = await page.evaluate(() => {
    const strip = document.querySelector('[data-slot="chart-edit-overlay"] .w-40');
    return strip ? strip.querySelectorAll('[data-slot="field-pill"]').length : 0;
  });
  if (yCount >= 2) return;
  const addBtn = page.locator('[data-slot="chart-edit-overlay"] .w-40 button').filter({ hasText: /Add|Values|Left|Right/ }).first();
  if (!(await addBtn.count())) return;
  await addBtn.click();
  await page.waitForTimeout(500);
  const pick = page.locator('div[data-radix-popper-content-wrapper] button').filter({ hasNot: page.locator("svg") }).first();
  await pick.click().catch(() => {});
  await page.waitForTimeout(2000);
}
await ensureTwoValues();

// A structured report of the new in-context chrome layout.
const report = () =>
  page.evaluate(() => {
    const overlay = document.querySelector('[data-slot="chart-edit-overlay"]');
    if (!overlay) return { error: "no overlay" };

    // An AxisChrome box = a bordered div with a "Title" span + an input + an eye button.
    const axisBox = (root) =>
      [...root.querySelectorAll("div")].some(
        (d) => d.querySelector("input") && /^title$/i.test(d.querySelector("span")?.textContent?.trim() ?? ""),
      );

    const groupInfo = (g) => {
      const header = g.querySelector("div span")?.textContent?.trim() ?? "";
      const pills = [...g.querySelectorAll('[data-slot="field-pill"]')].map((p) => p.textContent?.trim().slice(0, 18));
      return { header, pills, hasTitleBox: axisBox(g) };
    };

    const strip = overlay.querySelector(".w-40");
    const leftGroups = strip ? [...strip.querySelectorAll('[data-slot="well-group"]')].map(groupInfo) : [];

    // The bottom row = the flex-wrap row that follows the chart area and holds the
    // category/split well groups + (in line) the legend control.
    const rows = [...overlay.querySelectorAll(":scope > div > div")];
    let bottom = null;
    for (const r of rows) {
      if (r.querySelector('[data-slot="well-group"]') && !r.classList.contains("w-40") && !r.closest(".w-40")) {
        // pick the row that is NOT the left strip
        const groups = [...r.querySelectorAll('[data-slot="well-group"]')];
        if (groups.length && !strip?.contains(groups[0])) {
          bottom = r;
          break;
        }
      }
    }
    const bottomGroups = bottom ? [...bottom.querySelectorAll('[data-slot="well-group"]')].map(groupInfo) : [];
    const legendInBottom = bottom ? /show legend/i.test(bottom.textContent ?? "") : false;
    const legendAnywhere = /show legend/i.test(overlay.textContent ?? "");

    // All axis-title placeholders currently shown (auto labels).
    const titlePlaceholders = [...overlay.querySelectorAll("input")]
      .filter((i) => {
        const box = i.closest("div");
        return /^title$/i.test(box?.querySelector("span")?.textContent?.trim() ?? "");
      })
      .map((i) => i.getAttribute("placeholder"));

    const allHeaders = [...overlay.querySelectorAll('[data-slot="well-group"]')].map(
      (g) => g.querySelector("div span")?.textContent?.trim(),
    );

    return {
      typePill: overlay.querySelector('button[title="Change chart type"]')?.textContent?.trim(),
      leftGroups,
      bottomGroups,
      legendInBottom,
      legendAnywhere,
      titlePlaceholders,
      splitByPresent: allHeaders.includes("Split by"),
      headers: allHeaders,
    };
  });

async function switchFamily(name) {
  await page.keyboard.press("Escape").catch(() => {}); // clear any popover left open
  await page.waitForTimeout(250);
  await page.locator('button[title="Change chart type"]').click();
  await page.waitForSelector("div[data-radix-popper-content-wrapper]", { timeout: 6000 });
  await page.waitForTimeout(300);
  await page
    .locator("div[data-radix-popper-content-wrapper] button", { hasText: new RegExp(`^${name}$`) })
    .first()
    .click();
  await page.waitForTimeout(2200);
}

// Toggle the bar "Horizontal" switch in the type-picker Options (validates the value<->
// category zone swap: value title box should move to the bottom, category to the left).
async function toggleHorizontal() {
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(250);
  await page.locator('button[title="Change chart type"]').click();
  await page.waitForSelector("div[data-radix-popper-content-wrapper]", { timeout: 6000 });
  await page.waitForTimeout(300);
  const sw = page.locator('div[data-radix-popper-content-wrapper] [role="switch"]').first();
  await sw.click().catch(() => {});
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(2000);
}

const families = ["line", "bar", "area", "combo", "pie", "scatter", "kpi", "table"];
const out = {};
// Capture the as-opened (line) state first.
out["line(opened)"] = await report();
await page.locator('[data-slot="chart-edit-overlay"]').screenshot({ path: `${OUT}/cv-layout-line.png` }).catch(() => {});

for (const fam of families) {
  try {
    await switchFamily(fam[0].toUpperCase() + fam.slice(1));
    out[fam] = await report();
    await page.locator('[data-slot="chart-edit-overlay"]').screenshot({ path: `${OUT}/cv-layout-${fam}.png` }).catch(() => {});
    if (fam === "bar") {
      await toggleHorizontal();
      out["bar-horizontal"] = await report();
      await page.locator('[data-slot="chart-edit-overlay"]').screenshot({ path: `${OUT}/cv-layout-bar-horizontal.png` }).catch(() => {});
      await toggleHorizontal(); // restore vertical for subsequent switches
    }
  } catch (e) {
    out[fam] = { error: String(e).slice(0, 120) };
  }
}

console.log(JSON.stringify(out, null, 2));
console.log("\n=== console errors ===");
console.log(errors.slice(0, 15).join("\n") || "(none)");
await browser.close();
