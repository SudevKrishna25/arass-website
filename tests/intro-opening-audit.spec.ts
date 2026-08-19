import { test, expect } from '@playwright/test';

test('Audit ARASS Opening Experience and Hero Transition', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  // Clear session storage to force intro
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });

  // Capture Boot Phase
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/opening_01_boot.png' });

  // Capture Assembled Logo Phase
  await page.waitForTimeout(1100);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/opening_02_assembled_logo.png' });

  // Wait for warp transition into Homepage Hero
  await page.waitForTimeout(2200);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/opening_03_hero_arrival.png' });

  // Verify Exact Signature Tagline is present
  const heroText = await page.textContent('body');
  expect(heroText).toContain("WE DON'T FOLLOW");
  expect(heroText).toContain("THE FUTURE.");
  expect(heroText).toContain("WE BUILD IT.");
});
