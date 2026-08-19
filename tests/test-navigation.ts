import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3001');
  await page.waitForTimeout(1500);

  const navLinks = [
    'LABS',
    'TECHNOLOGIES',
    'VENTURES',
    'FRONTIER',
    'INSIGHTS',
    'OPEN CALL',
    'MISSION',
    'DISCOVERY'
  ];

  console.log('=== NAVIGATION VALIDATION TEST ===');

  for (const label of navLinks) {
    const selector = `nav a:has-text("${label}"), header button:has-text("${label}"), header a:has-text("${label}")`;
    const el = page.locator(selector).first();
    
    if (await el.count() > 0) {
      await el.click();
      await page.waitForTimeout(1000);
      
      const scrollY = await page.evaluate(() => window.scrollY);
      const textSample = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h2, h3'));
        const visible = headings.filter(h => {
          const rect = h.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight;
        });
        return visible.map(h => h.textContent?.trim()).join(' | ');
      });

      console.log(`[PASS] Clicked "${label}" -> scrollY: ${scrollY}px | Active Content: "${textSample.slice(0, 30)}"`);

      // If open call modal opened, close it via ESC so other links can be clicked
      if (label === 'OPEN CALL') {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(400);
      }
    } else {
      console.log(`[FAIL] Selector not found for ${label}`);
    }
  }

  await browser.close();
  console.log('=== NAVIGATION TEST COMPLETE ===');
})();
