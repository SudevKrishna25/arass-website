import { test } from '@playwright/test';

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'mission', path: '/mission' },
  { name: 'discovery', path: '/discovery' },
  { name: 'ecosystem', path: '/ecosystem' },
  { name: 'frontier', path: '/frontier' },
  { name: 'horizon', path: '/horizon' },
  { name: 'directive', path: '/directive' },
  { name: 'ventures', path: '/ventures' },
  { name: 'labs', path: '/labs' },
  { name: 'technologies', path: '/technologies' },
  { name: 'insights', path: '/insights' },
  { name: 'contact', path: '/contact' },
];

test('Capture all pages for navbar clearance audit', async ({ page }) => {
  test.setTimeout(120000);
  for (const route of ROUTES) {
    await page.goto(route.path, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `public/screenshots/clearance_${route.name}.png`,
    });
  }
});
