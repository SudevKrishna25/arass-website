import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'final-full-audit');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];

  // DESKTOP AUDIT (1440x900)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[1440x900] ${msg.text()}`);
  });
  page.on('pageerror', (err) => pageErrors.push(`[1440x900] ${err.message}`));
  page.on('requestfailed', (req) => failedRequests.push(`[1440x900] ${req.url()} - ${req.failure()?.errorText}`));

  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  // WebGL Canvas Count Check
  const canvasCount = await page.evaluate(() => document.querySelectorAll('canvas').length);

  // Measure Section Tops
  const layoutInfo = await page.evaluate(() => {
    const ids = ['hero', 'discovery', 'ecosystem', 'frontier', 'horizon', 'directive'];
    const res: Record<string, number> = {};
    ids.forEach((id) => {
      const el = document.getElementById(id);
      const spacer = el?.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
      res[id] = spacer ? spacer.getBoundingClientRect().top + window.scrollY : 0;
    });
    return {
      sections: res,
      bodyHeight: document.body.scrollHeight,
    };
  });

  const s = layoutInfo.sections;

  // NAVIGATION AUDIT
  console.log('\n--- TESTING NAVIGATION TARGETS ---');
  const navTargets = [
    'MISSION',
    'DISCOVERY',
    'VENTURES',
    'LABS',
    'TECHNOLOGIES',
    'FRONTIER',
    'INSIGHTS',
    'OPEN CALL',
  ];

  const navResults: Record<string, { clicked: boolean; finalY: number }> = {};

  for (const label of navTargets) {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);

    const navItem = page.locator(`header a:has-text("${label}")`).first();
    if (await navItem.isVisible()) {
      await navItem.click();
      await page.waitForTimeout(1500);
      const scrollY = await page.evaluate(() => window.scrollY);
      navResults[label] = { clicked: true, finalY: scrollY };
    } else {
      navResults[label] = { clicked: false, finalY: -1 };
    }
  }

  // OTHER ACTION BUTTONS AUDIT
  console.log('\n--- TESTING ACTION BUTTONS ---');
  const actionButtons = [
    { text: 'EXPLORE ARASS', selector: 'button:has-text("EXPLORE ARASS")' },
    { text: 'OUR MISSION', selector: 'button:has-text("OUR MISSION")' },
    { text: 'BUILD WITH ARASS', selector: 'button:has-text("BUILD WITH ARASS")' },
    { text: 'ENTER THE NETWORK', selector: 'button:has-text("ENTER THE NETWORK")' },
  ];

  const actionResults: Record<string, { visible: boolean; finalY: number }> = {};

  for (const btn of actionButtons) {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);

    if (btn.text === 'BUILD WITH ARASS' || btn.text === 'ENTER THE NETWORK') {
      await page.evaluate(() => window.scrollTo(0, 37800));
      await page.waitForTimeout(1500);
    }

    const item = page.locator(btn.selector).first();
    if (await item.isVisible()) {
      await item.click();
      await page.waitForTimeout(1500);
      const scrollY = await page.evaluate(() => window.scrollY);
      actionResults[btn.text] = { visible: true, finalY: scrollY };
    } else {
      actionResults[btn.text] = { visible: false, finalY: -1 };
    }
  }

  await page.close();
  await browser.close();

  console.log('\n=== ARASS FINAL AUDIT DATA REPORT ===');
  console.log(`Canvas Count: ${canvasCount}`);
  console.log('Layout Info:', layoutInfo);
  console.log('Console Errors:', consoleErrors);
  console.log('Page Errors:', pageErrors);
  console.log('Failed Requests:', failedRequests);
  console.log('Nav Results:', navResults);
  console.log('Action Results:', actionResults);
})();
