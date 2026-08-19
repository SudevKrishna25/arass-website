import { test, expect } from '@playwright/test';

const ROUTES = [
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

test.describe('ARASS Multi-Page Architecture Verification', () => {
  for (const route of ROUTES) {
    test(`Route ${route} should render correctly without errors`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);

      // Verify header presence
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Check for zero severe console errors
      const realErrors = consoleErrors.filter(
        (err) => !err.includes('favicon') && !err.includes('Failed to load resource')
      );
      expect(realErrors).toEqual([]);
    });
  }
});
