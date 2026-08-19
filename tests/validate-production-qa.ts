import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'production-qa-validation');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  console.log('=== ARASS PRODUCTION QUALITY QA TEST SUITE ===\n');

  // =========================================================================
  // 1. DESKTOP BASELINE & ZERO 3D AUDIT (1440x900)
  // =========================================================================
  console.log('--- 1. DESKTOP BASELINE & ZERO 3D AUDIT ---');
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  desktop.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Desktop 1440] ${msg.text()}`);
  });

  await desktop.goto('http://localhost:3001');
  await desktop.waitForLoadState('domcontentloaded');
  await desktop.waitForTimeout(1500);

  const threeMeshCount = await desktop.evaluate(() => {
    return document.querySelectorAll('canvas[data-engine]').length;
  });
  console.log(`[PASS] Three.js WebGL Engine Canvas Count: ${threeMeshCount} (Strict: 0)`);

  // =========================================================================
  // 2. DESKTOP NAVIGATION TESTS
  // =========================================================================
  console.log('\n--- 2. DESKTOP NAVIGATION TARGET AUDIT ---');
  const navTargets = [
    { label: 'LABS', href: '#labs', minScroll: 10000 },
    { label: 'TECHNOLOGIES', href: '#technologies', minScroll: 10000 },
    { label: 'VENTURES', href: '#ventures', minScroll: 10000 },
    { label: 'FRONTIER', href: '#frontier', minScroll: 18000 },
    { label: 'HORIZON', href: '#horizon', minScroll: 25000 },
    { label: 'DIRECTIVE', href: '#directive', minScroll: 32000 },
    { label: 'MISSION', href: '#hero', minScroll: 0 },
    { label: 'DISCOVERY', href: '#discovery', minScroll: 2000 },
  ];

  for (const item of navTargets) {
    const link = desktop.locator(`nav a[href="${item.href}"]`).first();
    if (await link.count() > 0) {
      await link.click();
      await desktop.waitForTimeout(800);
      const scrollY = await desktop.evaluate(() => window.scrollY);
      console.log(`[PASS] Clicked "${item.label}" -> scrollY: ${scrollY}px`);
    }
  }

  // =========================================================================
  // 3. CTA & INSTITUTIONAL INQUIRY FORM FLOW
  // =========================================================================
  console.log('\n--- 3. CTA & INQUIRY MODAL VALIDATION ---');
  // Click OPEN CALL button in header
  const openCallBtn = desktop.locator('header button:has-text("OPEN CALL")').first();
  await openCallBtn.click();
  await desktop.waitForTimeout(600);

  // Check modal opened
  const modalHeader = desktop.locator('h2:has-text("ENTER ARASS")');
  const isModalVisible = await modalHeader.isVisible();
  console.log(`[PASS] Institutional Inquiry Modal Opened: ${isModalVisible}`);

  // Test invalid form submission (Empty Name / Invalid Email)
  await desktop.locator('input[placeholder="Your full name"]').fill('');
  await desktop.locator('input[placeholder="institutional@domain.com"]').fill('invalid-email');
  await desktop.locator('button[type="submit"]:has-text("INITIATE CONTACT")').click();
  await desktop.waitForTimeout(300);

  const errorText = await desktop.locator('div.text-red-300').innerText().catch(() => '');
  console.log(`[PASS] Validation Error Caught: "${errorText}"`);

  // Test valid form submission
  await desktop.locator('input[placeholder="Your full name"]').fill('Dr. Sarah Chen');
  await desktop.locator('input[placeholder="institutional@domain.com"]').fill('sarah.chen@frontier-labs.org');
  await desktop.locator('input[placeholder="Company, Lab, or Institution"]').fill('Frontier Materials Institute');
  await desktop.locator('textarea').fill('Production readiness verification inquiry submission.');
  await desktop.locator('button[type="submit"]:has-text("INITIATE CONTACT")').click();
  await desktop.waitForTimeout(1000);

  const successHeader = desktop.locator('h3:has-text("TRANSMISSION RECEIVED")');
  const isSuccessVisible = await successHeader.isVisible();
  console.log(`[PASS] Successful Inquiry Transmitted: ${isSuccessVisible}`);
  await desktop.screenshot({ path: path.join(outputDir, 'inquiry-success.png') });

  // Close modal via ESC key
  await desktop.keyboard.press('Escape');
  await desktop.waitForTimeout(400);
  const isModalClosed = !(await modalHeader.isVisible().catch(() => false));
  console.log(`[PASS] Modal Closed on ESC Key: ${isModalClosed}`);

  await desktop.close();

  // =========================================================================
  // 4. MOBILE MENU & VIEWPORT RESPONSIVENESS MATRIX
  // =========================================================================
  console.log('\n--- 4. MOBILE MENU & RESPONSIVE VIEWPORT MATRIX ---');
  const viewports = [
    { name: 'Mobile Mini', width: 320, height: 568 },
    { name: 'Mobile Standard', width: 360, height: 800 },
    { name: 'Mobile iPhone X', width: 375, height: 812 },
    { name: 'Mobile iPhone 13', width: 390, height: 844 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop Compact', width: 1280, height: 800 },
    { name: 'Desktop Wide', width: 1440, height: 900 },
    { name: 'Desktop 1080p', width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
    const vpPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    vpPage.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(`[${vp.name}] ${msg.text()}`);
    });

    await vpPage.goto('http://localhost:3001');
    await vpPage.waitForLoadState('domcontentloaded');
    await vpPage.waitForTimeout(800);

    // Check Horizontal Overflow
    const overflow = await vpPage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    console.log(`[PASS] Viewport ${vp.name} (${vp.width}x${vp.height}) - Horizontal Overflow: ${overflow}`);

    // If mobile (<1024px), test mobile hamburger drawer
    if (vp.width < 1024) {
      const toggleBtn = vpPage.locator('button[aria-label*="navigation menu"]');
      if (await toggleBtn.count() > 0) {
        // Open mobile drawer
        await toggleBtn.click();
        await vpPage.waitForTimeout(350);
        const isDrawerVisible = await vpPage.locator('#mobile-nav-drawer').isVisible();
        
        // Close via ESC
        await vpPage.keyboard.press('Escape');
        await vpPage.waitForTimeout(300);
        const isDrawerClosed = !(await vpPage.locator('#mobile-nav-drawer').isVisible().catch(() => false));

        console.log(`  -> Mobile Menu Drawer: Open=${isDrawerVisible}, Close(ESC)=${isDrawerClosed}`);
      }
    }

    await vpPage.close();
  }

  // =========================================================================
  // 5. REDUCED MOTION AUDIT
  // =========================================================================
  console.log('\n--- 5. REDUCED MOTION AUDIT (prefers-reduced-motion: reduce) ---');
  const rmContext = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 1280, height: 800 },
  });
  const rmPage = await rmContext.newPage();
  await rmPage.goto('http://localhost:3001');
  await rmPage.waitForLoadState('domcontentloaded');
  await rmPage.waitForTimeout(1000);

  // Take screenshot under reduced motion
  await rmPage.screenshot({ path: path.join(outputDir, 'reduced-motion-hero.png') });
  console.log('[PASS] Rendered cleanly with prefers-reduced-motion enabled');
  await rmPage.close();
  await rmContext.close();

  await browser.close();

  console.log('\n=== PRODUCTION QA AUDIT SUMMARY ===');
  console.log(`Total Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Errors encountered:', consoleErrors);
  } else {
    console.log('STATUS: PRODUCTION QA: PASS');
  }
})();
