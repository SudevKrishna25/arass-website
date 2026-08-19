import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'tablet-1024', width: 1024, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-375', width: 375, height: 812 },
];

const scrollPercentages = [0, 10, 25, 50, 75, 90, 100];

test.describe('Detailed Visual Director Audit', () => {
  for (const vp of viewports) {
    test(`Audit ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Wait for entrance animation

      const totalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

      for (const pct of scrollPercentages) {
        const targetY = totalHeight * (pct / 100);
        await page.evaluate((y) => window.scrollTo(0, y), targetY);
        await page.waitForTimeout(400);

        await page.screenshot({
          path: `tests/screenshots/audit-${vp.name}-${pct}pct.png`,
          fullPage: false,
        });
      }
    });
  }
});
