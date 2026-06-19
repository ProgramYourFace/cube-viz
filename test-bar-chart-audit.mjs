import { chromium } from "playwright";

async function auditBarChart() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen for console messages
  const logs = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      logs.push({ type: msg.type(), text: msg.text() });
    }
  });

  try {
    console.log("Navigating to http://localhost:5180...");
    await page.goto("http://localhost:5180", { waitUntil: "networkidle" });
    
    // Click "Edit dashboard"
    console.log("Clicking 'Edit dashboard'...");
    await page.click('button:has-text("Edit dashboard")');
    await page.waitForTimeout(500);
    
    // Click the add chart button or dialog
    console.log("Adding a bar chart...");
    // Look for the add button
    const addButtons = await page.$$('button:has-text("Add")');
    if (addButtons.length > 0) {
      await addButtons[0].click();
      await page.waitForTimeout(500);
    }
    
    // Pick the bar chart type (if a chart picker is shown)
    console.log("Selecting bar chart family...");
    const barButtons = await page.$$('button:has-text("Bar")');
    for (const btn of barButtons) {
      const text = await btn.textContent();
      if (text && text.includes("Bar")) {
        await btn.click();
        await page.waitForTimeout(300);
        break;
      }
    }
    
    // Add a Y-axis field (first "Add" in the Y axis well)
    console.log("Adding a field to Y axis...");
    const wellGroups = await page.$$('[data-slot="well-group"]');
    if (wellGroups.length > 0) {
      const yWellAddBtns = await wellGroups[0].$$('button:has-text("Add")');
      if (yWellAddBtns.length > 0) {
        await yWellAddBtns[0].click();
        await page.waitForTimeout(500);
        // Pick a measure
        const measures = await page.$$('[role="option"]');
        if (measures.length > 0) {
          // Click first measure
          await measures[0].click();
          await page.waitForTimeout(300);
        }
      }
    }
    
    // Add an X-axis field
    console.log("Adding a field to X axis...");
    const xWellAddBtns = await wellGroups[1]?.$$('button:has-text("Add")');
    if (xWellAddBtns && xWellAddBtns.length > 0) {
      await xWellAddBtns[0].click();
      await page.waitForTimeout(500);
      const categories = await page.$$('[role="option"]');
      if (categories.length > 1) {
        await categories[1].click();
        await page.waitForTimeout(300);
      }
    }
    
    // Try toggling "Horizontal" in CustomizeSection
    console.log("Testing horizontal toggle...");
    const horizontalSwitch = await page.$('text:has-text("Horizontal")');
    if (horizontalSwitch) {
      const parent = await horizontalSwitch.evaluateHandle((el) => el.closest("[role='switch']"));
      if (parent) {
        await parent.click();
        await page.waitForTimeout(500);
      }
    }
    
    // Try toggling stacking
    console.log("Testing stack mode...");
    const stackButtons = await page.$$('button:has-text("Stacked")');
    if (stackButtons.length > 0) {
      await stackButtons[0].click();
      await page.waitForTimeout(500);
    }
    
    // Open a pill's popover to test label/color/granularity
    console.log("Opening field pill popover...");
    const pills = await page.$$('[data-slot="field-pill"]');
    if (pills.length > 0) {
      const btn = await pills[0].$("button");
      if (btn) {
        await btn.click();
        await page.waitForTimeout(300);
      }
    }
    
    // Capture any console errors
    if (logs.length > 0) {
      console.log("\n=== CONSOLE ERRORS/WARNINGS ===");
      logs.forEach((l) => console.log(`[${l.type}] ${l.text}`));
    }
    
    console.log("\n=== AUDIT COMPLETE ===");
    console.log("Bar chart edit flow ran without fatal errors.");
    
  } catch (err) {
    console.error("ERROR during audit:", err.message);
  } finally {
    await browser.close();
  }
}

auditBarChart();
