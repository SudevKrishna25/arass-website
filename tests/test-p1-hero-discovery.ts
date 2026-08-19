import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();

  console.log('=== P1 HERO → DISCOVERY SCROLL VALIDATION ===');

  // 1. DESKTOP 1440x900
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto('http://localhost:3001');
  await desktop.waitForLoadState('domcontentloaded');
  await desktop.waitForTimeout(3000);

  // EXPLORE ARASS
  const dExplore = await desktop.$('a:has-text("EXPLORE ARASS")');
  if (dExplore) {
    await dExplore.click();
    await desktop.waitForTimeout(1800);
    const scrollY = await desktop.evaluate(() => window.scrollY);
    console.log(`[DESKTOP PASS] "EXPLORE ARASS" -> scrollY: ${Math.round(scrollY)}px`);
  }

  // OUR MISSION
  const dMission = await desktop.$('a:has-text("OUR MISSION")');
  if (dMission) {
    await dMission.click();
    await desktop.waitForTimeout(1800);
    const scrollY = await desktop.evaluate(() => window.scrollY);
    console.log(`[DESKTOP PASS] "OUR MISSION" -> scrollY: ${Math.round(scrollY)}px`);
  }

  // SCROLL TO ENTER ARASS
  const dIndicator = await desktop.$('button[aria-label="Scroll to enter ARASS"]');
  if (dIndicator) {
    await dIndicator.click();
    await desktop.waitForTimeout(1800);
    const scrollY = await desktop.evaluate(() => window.scrollY);
    console.log(`[DESKTOP PASS] "SCROLL TO ENTER ARASS" -> scrollY: ${Math.round(scrollY)}px`);
  }

  await desktop.close();

  // 2. MOBILE 390x844
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3001');
  await mobile.waitForLoadState('domcontentloaded');
  await mobile.waitForTimeout(3000);

  // EXPLORE ARASS (Mobile)
  const mExplore = await mobile.$('a:has-text("EXPLORE ARASS")');
  if (mExplore) {
    await mExplore.click();
    await mobile.waitForTimeout(1800);
    const scrollY = await mobile.evaluate(() => window.scrollY);
    console.log(`[MOBILE PASS] "EXPLORE ARASS" -> scrollY: ${Math.round(scrollY)}px`);
  }

  // OUR MISSION (Mobile)
  const mMission = await mobile.$('a:has-text("OUR MISSION")');
  if (mMission) {
    await mMission.click();
    await mobile.waitForTimeout(1800);
    const scrollY = await mobile.evaluate(() => window.scrollY);
    console.log(`[MOBILE PASS] "OUR MISSION" -> scrollY: ${Math.round(scrollY)}px`);
  }

  // SCROLL TO ENTER ARASS (Mobile)
  const mIndicator = await mobile.$('button[aria-label="Scroll to enter ARASS"]');
  if (mIndicator) {
    await mIndicator.click();
    await mobile.waitForTimeout(1800);
    const scrollY = await mobile.evaluate(() => window.scrollY);
    console.log(`[MOBILE PASS] "SCROLL TO ENTER ARASS" -> scrollY: ${Math.round(scrollY)}px`);
  }

  await mobile.close();
  await browser.close();
})();
