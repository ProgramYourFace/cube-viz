import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:5180";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1480, height: 1500 } });

// Capture every Cube /load and report the distance-line query's granularity+dateRange.
page.on("request", (req) => {
  const u = req.url();
  if (!u.includes("/__cube") || !u.includes("/load")) return;
  let q = null;
  try {
    const m = u.match(/[?&]query=([^&]+)/);
    if (m) q = JSON.parse(decodeURIComponent(m[1]));
    else if (req.postData()) q = JSON.parse(req.postData()).query;
  } catch {
    /* ignore */
  }
  if (!q?.measures) return; // OPTIONS preflights etc.
  const td = q.timeDimensions?.[0];
  const tag = q.measures.includes("device_trips.total_distance")
    ? "DISTANCE-LINE"
    : q.measures.includes("device_trips.count") && q.dimensions
      ? "TRIPS-BAR"
      : "other";
  console.log(
    `  → ${req.method()} ${tag}: granularity=${td?.granularity ?? "(none)"} dateRange=${JSON.stringify(td?.dateRange) ?? "(none)"}`,
  );
});

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector(".recharts-line-curve", { timeout: 20000 });
await page.waitForTimeout(1500);

// Count line vertices = path segments. Recharts monotone curves emit one "C" per
// segment (and "L" for straight ones), so points ≈ (C+L count) + 1 for the "M".
const linePoints = () =>
  page.evaluate(() => {
    const panel = [...document.querySelectorAll("div")].find(
      (d) => d.textContent?.includes("Total Distance Over Time") && d.querySelector(".recharts-line-curve"),
    );
    const d = panel?.querySelector(".recharts-line-curve")?.getAttribute("d") ?? "";
    if (!d) return 0;
    return (d.match(/[CL]/gi) || []).length + 1;
  });

async function step(label, action) {
  console.log(`\n[${label}]`);
  if (action) await action();
  await page.waitForTimeout(2500); // refetch + Continue-wait + re-render
  console.log(`  line vertices now = ${await linePoints()}`);
}

const dash = page.locator("div").filter({ hasText: "Fleet Utilization" }).last();

await step("initial (day / last 30 days)", null);
await dash.screenshot({ path: "/tmp/cubeviz-dash-day.png" }).catch(() => {});
await step("set granularity → month", () => page.selectOption('select:has(option[value="month"])', "month"));
await dash.screenshot({ path: "/tmp/cubeviz-dash-month.png" }).catch(() => {});
await step("set granularity → week", () => page.selectOption('select:has(option[value="week"])', "week"));
await step("set dateRange → last 7 days", () => page.selectOption('select:has(option[value="last 7 days"])', "last 7 days"));
await step("set granularity → day", () => page.selectOption('select:has(option[value="day"])', "day"));

await browser.close();
