import { test } from '@playwright/test';

test('Verify Home bottom unpinned institutional showcase', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Scroll all the way to the bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  await page.screenshot({
    path: 'public/screenshots/home_bottom_showcase.png',
  });
});
