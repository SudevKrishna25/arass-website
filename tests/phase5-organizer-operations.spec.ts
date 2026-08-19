import { test, expect } from '@playwright/test';

test.describe('ARASS EVENTS // Phase 5: Organizer Operations & Event OS', () => {
  const BASE_URL = 'http://localhost:3000';

  test.beforeAll(async ({ request }) => {
    await request.post(`${BASE_URL}/api/events/reset`);
  });

  test.beforeEach(async ({ page }) => {
    // Sign in as Super Admin
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button:has-text("SIGN IN")');
    await page.waitForURL('**/organizer/dashboard');
  });

  test('1. Organizer Command Center KPIs & Action Center', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/dashboard`);
    await expect(page.locator('h1')).toContainText('Organizer Command Center');

    // Verify KPIs
    await expect(page.locator('text=Active Competitions')).toBeVisible();
    await expect(page.locator('text=Total Registrations')).toBeVisible();
    await expect(page.locator('text=Action Center // Operations Requiring Immediate Attention')).toBeVisible();
  });

  test('2. Operations Table & Event Duplication Action', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events`);
    await expect(page.locator('h1')).toContainText('Event Operations Center');
    await expect(page.locator('text=ARASS IDEATHON 2026').first()).toBeVisible();

    // Duplicate Event
    const duplicateButtons = page.locator('button[title*="Duplicate Event"]');
    if (await duplicateButtons.count() > 0) {
      await duplicateButtons.first().click();
      await expect(page.locator('text=Event structure duplicated successfully')).toBeVisible();
    }
  });

  test('3. Team Operations & Roster Supervision', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/teams`);
    await expect(page.locator('h2')).toContainText('Team Management');
    await expect(page.locator('text=Synapse Labs').first()).toBeVisible();
  });

  test('4. Jury Operations & Conflict of Interest Registration', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/judges`);
    await expect(page.locator('h2')).toContainText('Jury Operations');
    await expect(page.locator('text=Dr. Evelyn Vance').first()).toBeVisible();

    // Declare Conflict
    await page.click('button:has-text("Declare Conflict")');
    await expect(page.locator('text=Register Conflict of Interest')).toBeVisible();
    await page.click('button:has-text("CONFIRM CONFLICT")');
    await expect(page.locator('text=Conflict of interest registered')).toBeVisible();
  });

  test('5. Check-In & Venue QR Access Operations', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/check-in`);
    await expect(page.locator('h2')).toContainText('Event Access & Check-In Operations');
    await expect(page.locator('text=Participant Badge QR Scanner')).toBeVisible();

    // Simulate QR Scan
    await page.click('button:has-text("SIMULATE QR BADGE SCAN")');
    await expect(page.locator('text=QR Code Badge Scanned & Verified')).toBeVisible();
  });

  test('6. Event Messages & Multi-Channel Broadcast Suite', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/messages`);
    await expect(page.locator('h2')).toContainText('Communications & Broadcast Suite');

    // Apply Deadline Template & Send
    await page.click('button:has-text("Deadline Alert")');
    await page.click('button:has-text("DISPATCH MULTI-CHANNEL BROADCAST")');
    await expect(page.locator('text=Broadcast dispatched successfully')).toBeVisible();
  });

  test('7. Event Schedule & Hybrid Session Agenda', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/schedule`);
    await expect(page.locator('h2')).toContainText('Event Schedule & Hybrid Sessions');
    await expect(page.locator('text=Opening Keynote')).toBeVisible();

    // Add Session
    await page.fill('input[placeholder*="Distributed Consensus"]', 'Zero-Knowledge Cryptography Deep Dive');
    await page.click('button:has-text("PUBLISH SESSION")');
    await expect(page.locator('text=added to competition schedule')).toBeVisible();
  });

  test('8. Certificate Studio & Dynamic Token Designer', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/certificates`);
    await expect(page.locator('h1')).toContainText('Certificate Studio');
    await expect(page.locator('text=Live Diploma Preview')).toBeVisible();
    await expect(page.locator('text=ARASS-IDEA-2026-000001')).toBeVisible();

    // Save Template
    await page.click('button:has-text("SAVE TEMPLATE")');
    await expect(page.locator('text=Certificate template configuration saved')).toBeVisible();
  });

  test('9. Operational Audit Trail & Action Filters', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/audit`);
    await expect(page.locator('h1')).toContainText('Operational Audit Trail');
    await expect(page.locator('text=EVENT_CREATED').first()).toBeVisible();
  });

  const viewports = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '390x844', width: 390, height: 844 },
    { name: '320x568', width: 320, height: 568 },
  ];

  for (const vp of viewports) {
    test(`10. Responsive Zero Horizontal Overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/organizer/dashboard`);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
