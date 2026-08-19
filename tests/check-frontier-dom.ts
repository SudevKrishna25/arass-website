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
    const frontier = document.getElementById('frontier');

    const heroSpacer = hero?.parentElement?.classList.contains('pin-spacer') ? hero.parentElement : hero;
    const discSpacer = discovery?.parentElement?.classList.contains('pin-spacer') ? discovery.parentElement : discovery;
    const ecoSpacer = ecosystem?.parentElement?.classList.contains('pin-spacer') ? ecosystem.parentElement : ecosystem;
    const frontSpacer = frontier?.parentElement?.classList.contains('pin-spacer') ? frontier.parentElement : frontier;

    return {
      heroTop: heroSpacer ? heroSpacer.getBoundingClientRect().top + window.scrollY : 0,
      discTop: discSpacer ? discSpacer.getBoundingClientRect().top + window.scrollY : 0,
      ecoTop: ecoSpacer ? ecoSpacer.getBoundingClientRect().top + window.scrollY : 0,
      frontierTop: frontSpacer ? frontSpacer.getBoundingClientRect().top + window.scrollY : 0,
      bodyHeight: document.body.scrollHeight,
    };
  });

  console.log('Layout Info:', info);

  await page.close();
  await browser.close();
})();
