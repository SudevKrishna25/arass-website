import { test } from '@playwright/test';

test('Capture Phase 6 Visual Critique Set at 1440x900', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  // 01 Hero
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.setItem('arass_intro_seen', 'true'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_01_hero.png' });

  // 02 Hero after scroll
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_02_hero_scroll.png' });

  // 03 What We Build
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.3, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_03_what_we_build.png' });

  // 04 AI Systems
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.0, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_04_ai_systems.png' });

  // 05 Digital Products
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.8, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_05_digital_products.png' });

  // 06 Automation
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.6, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_06_automation.png' });

  // 07 Digital Experiences
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 4.4, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_07_digital_experiences.png' });

  // 08 Work
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 5.1, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_08_work.png' });

  // 09 Products
  await page.goto('http://localhost:3000/work', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_09_products.png' });

  // 10 Lab
  await page.goto('http://localhost:3000/labs', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_10_lab.png' });

  // 11 Company
  await page.goto('http://localhost:3000/about', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_11_company.png' });

  // 12 Insights
  await page.goto('http://localhost:3000/insights', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_12_insights.png' });

  // 13 Final CTA
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 5.8, behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_13_final_cta.png' });

  // 14 Mega Menu
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(400);
  const menuBtn = page.getByTestId('menu-toggle-btn');
  await menuBtn.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/critique_14_mega_menu.png' });
});
