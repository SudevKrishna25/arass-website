import { test, expect } from '@playwright/test';

test('Capture mobile hero arrival', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.click('button:has-text("SKIP INTRO")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/audit_phase3b_mobile_hero.png' });
});
