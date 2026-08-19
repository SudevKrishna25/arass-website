import { test } from '@playwright/test';

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

for (const route of ROUTES) {
  const slug = route === '/' ? 'home' : route.replace('/', '');
  test(`Audit plate for ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `public/screenshots/audit_${slug}.png` });
  });
}
