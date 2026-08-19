import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'Mobile-Small (320x568)', width: 320, height: 568 },
  { name: 'Mobile-Standard (375x812)', width: 375, height: 812 },
  { name: 'Mobile-Pro (390x844)', width: 390, height: 844 },
  { name: 'Tablet (768x1024)', width: 768, height: 1024 },
  { name: 'Desktop (1440x900)', width: 1440, height: 900 },
];

const KEY_ROUTES = ['/', '/mission', '/discovery', '/ecosystem', '/ventures', '/labs', '/frontier', '/contact'];

test.describe('Phase 3 // Multi-Viewport Responsive & Zero Overflow Verification', () => {
  for (const vp of VIEWPORTS) {
    test(`Zero horizontal overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const route of KEY_ROUTES) {
        await page.goto(route, { waitUntil: 'networkidle' });

        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px margin for subpixel rendering
      }
    });
  }
});
