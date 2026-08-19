import { test, expect } from '@playwright/test';

const CORE_ROUTES = [
  '/',
  '/mission',
  '/discovery',
  '/ecosystem',
  '/frontier',
  '/horizon',
  '/directive',
  '/ventures',
  '/labs',
  '/technologies',
  '/insights',
  '/contact',
];

test.describe('Phase 3 // Core Route Multi-Page Navigation', () => {
  for (const route of CORE_ROUTES) {
    test(`Route ${route} should load with 200 OK and zero console errors`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);

      // Verify header and navigation are present
      await expect(page.locator('header')).toBeVisible();

      // Verify no runtime console errors
      expect(consoleErrors).toEqual([]);
    });
  }
});
