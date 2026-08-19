import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'validation-8');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  const captures = [
    { name: '01-section03-beginning.png', y: 11183 },
    { name: '02-research.png', y: 12195 },
    { name: '03-technology.png', y: 12600 },
    { name: '04-ip.png', y: 13005 },
    { name: '05-ventures.png', y: 13410 },
    { name: '06-frontier.png', y: 13815 },
    { name: '07-impact.png', y: 14220 },
    { name: '08-institutional-scale.png', y: 14868 },
  ];

  for (const item of captures) {
    const currentY = await page.evaluate(() => window.scrollY);
    const steps = 15;
    for (let i = 1; i <= steps; i++) {
      const interpY = currentY + (item.y - currentY) * (i / steps);
      await page.evaluate((pos) => window.scrollTo(0, pos), interpY);
      await page.waitForTimeout(20);
    }
    
    // Wait for GSAP ScrollTrigger & Framer Motion transitions to complete
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outputDir, item.name) });
  }

  await page.close();
  await browser.close();
  console.log('Successfully captured all 8 validation screenshots in screenshots/validation-8 with exact target coordinates!');
})();
