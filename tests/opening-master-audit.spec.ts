import { test, expect } from '@playwright/test';

test('Capture complete ARASS sequence progression', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });

  // 1. Initial Boot
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_01_initial_boot.png' });

  // 2. Logo Assembly
  await page.waitForTimeout(1100);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_02_logo_assembly.png' });

  // 3. Letter Separation
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_03_letter_separation.png' });

  // 4. Hero Reveal
  await page.waitForTimeout(1400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_04_hero_reveal.png' });

  // 5. Scroll to Capabilities (30% scroll)
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.3, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_05_capabilities.png' });
});
