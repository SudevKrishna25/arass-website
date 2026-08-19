import { test } from '@playwright/test';

test('Capture mission and mobile screens', async ({ page }) => {
  // Desktop Mission
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/mission', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/mission_aligned_desktop.png' });

  // Mobile Mission
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/mission', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/mission_aligned_mobile.png' });
});
