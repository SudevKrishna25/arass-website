import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    const hero = document.getElementById('hero');
    const discovery = document.getElementById('discovery');
    const ecosystem = document.getElementById('ecosystem');

    return {
      bodyHeight: document.body.scrollHeight,
      heroTop: hero ? hero.getBoundingClientRect().top + window.scrollY : null,
      heroHeight: hero ? hero.offsetHeight : null,
      discTop: discovery ? discovery.getBoundingClientRect().top + window.scrollY : null,
      discHeight: discovery ? discovery.offsetHeight : null,
      ecoTop: ecosystem ? ecosystem.getBoundingClientRect().top + window.scrollY : null,
      ecoHeight: ecosystem ? ecosystem.offsetHeight : null,
    };
  });

  console.log('Scroll Info:', JSON.stringify(info, null, 2));

  // Sample scroll positions across bodyHeight
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const y = (info.bodyHeight - 900) * (i / steps);
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await page.waitForTimeout(500);

    const state = await page.evaluate(() => {
      const eco = document.getElementById('ecosystem');
      const ecoRect = eco ? eco.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        ecoRectTop: ecoRect ? ecoRect.top : null,
        ecoRectBottom: ecoRect ? ecoRect.bottom : null,
      };
    });
    console.log(`Step ${i} (y=${Math.round(y)}):`, state);
  }

  await page.close();
  await browser.close();
})();
