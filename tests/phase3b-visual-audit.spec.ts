import { test, expect } from '@playwright/test';

test('Capture comprehensive Phase 3B visual audit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Home - Skip Intro by clicking the button if present or press Escape
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_phase3b_home_hero.png' });

  // 2. Home - Scroll to Services Stage
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.4, behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_phase3b_home_services.png' });

  // 3. Home - Scroll to Selected Work Stage
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.3, behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_phase3b_home_work.png' });

  // 4. Home - Scroll to Engage Terminal
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.4, behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_phase3b_home_engage.png' });

  // 5. Mobile Viewport Check (390x844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_phase3b_mobile_home.png' });
});
