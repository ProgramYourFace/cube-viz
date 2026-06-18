import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:5180";
const out = process.env.OUT || "/tmp/cubeviz-shot.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1480, height: 2400 }, deviceScaleFactor: 1 });

const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector(".recharts-surface", { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(2000);
await page.screenshot({ path: out, fullPage: true });

// Per-chart DOM metrics, labeled by the nearest panel title.
const info = await page.evaluate(() => {
  return [...document.querySelectorAll(".recharts-surface")].map((s) => {
    const panel = s.closest(".rounded-xl, [class*='rounded']");
    const title = panel?.querySelector("div")?.textContent?.slice(0, 28) ?? "?";
    const r = s.getBoundingClientRect();
    return {
      title,
      w: Math.round(r.width),
      h: Math.round(r.height),
      bars: s.querySelectorAll(".recharts-bar-rectangle").length,
      lines: s.querySelectorAll(".recharts-line-curve").length,
      areas: s.querySelectorAll(".recharts-area-area").length,
      sectors: s.querySelectorAll(".recharts-pie-sector, .recharts-sector").length,
      dots: s.querySelectorAll(".recharts-scatter-symbol").length,
    };
  });
});
console.log("=== chart surfaces ===");
console.log(JSON.stringify(info, null, 2));
console.log("=== first paint console errors ===");
console.log(errors.slice(0, 8).join("\n") || "(none)");

await browser.close();
