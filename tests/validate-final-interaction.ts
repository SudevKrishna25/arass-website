import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'phase1-inquiry-validation');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Desktop] ${msg.text()}`);
  });

  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2500);

  // Click Directive in Navbar to scroll to Section 06
  console.log('--- TESTING REAL INQUIRY SUBMISSION ENDPOINT ---');
  const directiveLink = page.locator('header a:has-text("DIRECTIVE")').first();
  if (await directiveLink.isVisible()) {
    await directiveLink.click();
    await page.waitForTimeout(1500);
  }

  // Scroll to final stage of Section 06
  await page.evaluate(() => window.scrollTo(0, 38500));
  await page.waitForTimeout(1500);

  // Open modal via BUILD WITH ARASS or fallback to ENTER THE NETWORK
  let buildBtn = page.locator('button:has-text("BUILD WITH ARASS")').first();
  if (!(await buildBtn.isVisible())) {
    await page.evaluate(() => window.scrollTo(0, 38800));
    await page.waitForTimeout(1000);
    buildBtn = page.locator('button:has-text("BUILD WITH ARASS")').first();
  }

  if (await buildBtn.isVisible()) {
    await buildBtn.dispatchEvent('click');
    await page.waitForTimeout(800);

    // Test invalid email format validation
    await page.fill('input[placeholder="Your full name"]', 'Alex Mercer');
    await page.fill('input[placeholder="institutional@domain.com"]', 'invalid-email-format');
    await page.locator('button:has-text("INITIATE CONTACT")').first().dispatchEvent('click');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outputDir, '01-validation-error-state.png') });

    // Fix email to valid format and submit real transmission
    await page.fill('input[placeholder="institutional@domain.com"]', 'alex.mercer@deeptech-inst.org');
    await page.fill('input[placeholder="Company, Lab, or Institution"]', 'DeepTech Research Institute');
    await page.fill('textarea[placeholder*="Describe your initiative"]', 'Real inquiry test for institutional alignment.');
    await page.locator('button:has-text("INITIATE CONTACT")').first().dispatchEvent('click');

    // Wait for API response and UI state transition
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(outputDir, '02-real-transmission-success.png') });

    // Close confirmation modal
    const returnBtn = page.locator('button:has-text("RETURN TO SYSTEM")').first();
    if (await returnBtn.isVisible()) {
      await returnBtn.dispatchEvent('click');
      await page.waitForTimeout(800);
    }
  }

  await page.close();
  await browser.close();

  console.log('\n=== PHASE 1 REAL INQUIRY SUBMISSION REPORT ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log('Validation screenshots saved in screenshots/phase1-inquiry-validation');
})();
