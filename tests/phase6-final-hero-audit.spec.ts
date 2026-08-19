import { test } from '@playwright/test';

test.describe('ARASS // Phase 6 Final Hero Multi-Viewport Audit', () => {
  const viewports = [
    { name: '1920x1080', width: 1920, height: 1080 },
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1024x768', width: 1024, height: 768 },
    { name: '390x844', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    test(`Capture Final Hero at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => sessionStorage.setItem('arass_intro_seen', 'true'));
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/final_hero_${vp.name}.png`,
      });
    });
  }
});
