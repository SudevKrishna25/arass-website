import { test } from '@playwright/test';

test('Capture Home continuous scroll plates', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Pinned container scrub points
  const pinTrackHeight = await page.evaluate(() => {
    const el = document.querySelector('[class*="h-[650vh]"]');
    return el ? (el as HTMLElement).offsetHeight - window.innerHeight : 5000;
  });

  const intervals = [0, 0.25, 0.5, 0.75, 1.0];
  for (const t of intervals) {
    const scrollY = pinTrackHeight * t;
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(400);

    const pct = Math.round(t * 100);
    await page.screenshot({
      path: `public/screenshots/home_scrub_${pct}.png`,
    });
  }
});
