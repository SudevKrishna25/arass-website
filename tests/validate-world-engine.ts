import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'world-engine-validation');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  console.log('=== VALIDATING ARASS WORLD ENGINE (PHASE 1 FOUNDATION) ===');

  // 1. DESKTOP TEST (1440x900)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Desktop 1440] ${msg.text()}`);
  });

  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  // Check canvas count
  const canvasCount = await page.locator('canvas').count();
  console.log(`[Desktop] WebGL Canvas Count: ${canvasCount} (Expected: 1)`);

  // Initial Hero screenshot
  await page.screenshot({ path: path.join(outputDir, '01-desktop-hero.png') });

  // Scroll through each section to test continuous globalProgress & camera spline
  const scrollTargets = [
    { label: 'DISCOVERY', y: 1980 },
    { label: 'ECOSYSTEM', y: 11000 },
    { label: 'FRONTIER', y: 20000 },
    { label: 'HORIZON', y: 27200 },
    { label: 'DIRECTIVE', y: 34400 },
  ];

  for (const target of scrollTargets) {
    console.log(`Scrolling to ${target.label} (y = ${target.y}px)...`);
    await page.evaluate((y) => window.scrollTo(0, y), target.y);
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(outputDir, `02-desktop-${target.label.toLowerCase()}.png`),
    });
  }

  // Test Inquiry Modal at Section 06
  const buildBtn = page.locator('button:has-text("BUILD WITH ARASS")').first();
  if (await buildBtn.isVisible()) {
    await buildBtn.dispatchEvent('click');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outputDir, '03-desktop-modal-open.png') });

    // Close via ESC
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  await page.close();

  // 2. DESKTOP TEST (1280x800)
  const page1280 = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page1280.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Desktop 1280] ${msg.text()}`);
  });
  await page1280.goto('http://localhost:3001');
  await page1280.waitForLoadState('domcontentloaded');
  await page1280.waitForTimeout(2000);
  const overflow1280 = await page1280.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Desktop 1280x800] Horizontal Overflow: ${overflow1280}`);
  await page1280.close();

  // 3. MOBILE TEST (390x844)
  console.log('\n--- TESTING MOBILE (390x844) ---');
  const mobile390 = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile390.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Mobile 390] ${msg.text()}`);
  });

  await mobile390.goto('http://localhost:3001');
  await mobile390.waitForLoadState('domcontentloaded');
  await mobile390.waitForTimeout(2000);

  const mCanvasCount390 = await mobile390.locator('canvas').count();
  const mOverflow390 = await mobile390.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Mobile 390x844] Canvas Count: ${mCanvasCount390} | Horizontal Overflow: ${mOverflow390}`);
  await mobile390.screenshot({ path: path.join(outputDir, '04-mobile-390-hero.png') });

  // Scroll to Frontier on Mobile
  await mobile390.evaluate(() => window.scrollTo(0, 19000));
  await mobile390.waitForTimeout(1500);
  await mobile390.screenshot({ path: path.join(outputDir, '05-mobile-390-frontier.png') });
  await mobile390.close();

  // 4. MOBILE TEST (375x812)
  console.log('\n--- TESTING MOBILE (375x812) ---');
  const mobile375 = await browser.newPage({ viewport: { width: 375, height: 812 } });
  mobile375.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Mobile 375] ${msg.text()}`);
  });
  await mobile375.goto('http://localhost:3001');
  await mobile375.waitForLoadState('domcontentloaded');
  await mobile375.waitForTimeout(2000);
  const mOverflow375 = await mobile375.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Mobile 375x812] Horizontal Overflow: ${mOverflow375}`);
  await mobile375.close();

  await browser.close();

  console.log('\n=== WORLD ENGINE VALIDATION SUMMARY ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log(`Desktop 1440 Canvas Count: ${canvasCount}`);
  console.log(`Mobile 390 Canvas Count: ${mCanvasCount390}`);
  console.log(`Mobile 390 Overflow: ${mOverflow390}`);
  console.log(`Mobile 375 Overflow: ${mOverflow375}`);
  console.log('Screenshots saved in screenshots/world-engine-validation');
})();
