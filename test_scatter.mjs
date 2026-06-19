import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    await page.goto('http://localhost:5180', { waitUntil: 'networkidle' });
    console.log('✓ Page loaded');

    // Click "Edit dashboard"
    const editDashboard = await page.$('text=Edit dashboard');
    if (editDashboard) {
      await editDashboard.click();
      await new Promise(r => setTimeout(r, 500));
      console.log('✓ Edit dashboard clicked');
    }

    // Wait for the chart builder to load
    await page.waitForSelector('[data-slot="chart-edit-overlay"]', { timeout: 5000 });
    console.log('✓ Chart edit overlay loaded');

    // Choose scatter chart by clicking the type picker
    const typePicker = await page.$('button:has-text("Choose a chart type")');
    if (typePicker) {
      await typePicker.click();
      await new Promise(r => setTimeout(r, 500));
    }

    // Look for Scatter button in the type grid
    const scatterBtn = await page.$('button[aria-pressed]:has-text("Scatter")');
    if (scatterBtn) {
      await scatterBtn.click();
      await new Promise(r => setTimeout(r, 500));
      console.log('✓ Scatter chart selected');
    }

    // Log page content for debugging
    const content = await page.content();
    if (content.includes('well-group')) {
      console.log('✓ Well groups found in DOM');
    }

    console.log('\n✓ Basic interaction test completed');
  } catch (error) {
    console.error('✗ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
