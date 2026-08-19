import { test } from '@playwright/test';

test('Full site interaction walkthrough', async ({ page }) => {
  // 1. Visit Home
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.35, behavior: 'smooth' }));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.75, behavior: 'smooth' }));
  await page.waitForTimeout(500);

  // 2. Open MegaMenu
  const menuBtn = page.getByTestId('menu-toggle-btn');
  await menuBtn.click();
  await page.waitForTimeout(400);
  await page.keyboard.press('Escape');

  // 3. Visit Mission
  await page.goto('http://localhost:3000/mission', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  // 4. Visit Discovery (Horizontal)
  await page.goto('http://localhost:3000/discovery', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  // 5. Visit Ventures
  await page.goto('http://localhost:3000/ventures', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  // 6. Visit Contact
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
});
