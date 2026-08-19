import { test, expect } from '@playwright/test';

test.describe('ARASS EVENTS // Phase 4: Live Competition Engine & Real-Time Experience', () => {
  const BASE_URL = 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    // Sign in as Super Admin
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button:has-text("SIGN IN")');
    await page.waitForURL('**/organizer/dashboard');
  });

  test('1. Participant Live Competition Room & Clock Sync', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await expect(page.locator('h1')).toContainText('ARASS IDEATHON 2026');

    // Verify Server-Authoritative Clock
    await expect(page.locator('text=SERVER SYNCED')).toBeVisible();
    await expect(page.locator('text=STAGE DEADLINE COUNTDOWN')).toBeVisible();

    // Verify Live Announcements Feed
    await expect(page.locator('text=Live Event Announcements')).toBeVisible();
    await expect(page.locator('text=Stage 01 Submissions Window is Live').first()).toBeVisible();
  });

  test('2. Deliverable Submission & Versioning (v1 -> v2)', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);

    // Submit project deliverable
    await page.fill('input[placeholder*="Autonomous Multi-Agent"]', 'Autonomous Agent Neural Consensus Protocol');
    await page.fill('input[placeholder*="https://github.com"]', 'https://github.com/arass-research/agent-neural-consensus');
    await page.fill('textarea[placeholder*="Provide an overview"]', 'Detailed consensus formulation with sub-second finality.');
    await page.click('button:has-text("TRANSMIT DELIVERABLE")');

    // Confirm submission success
    await expect(page.locator('text=Deliverable submitted successfully')).toBeVisible();
    await expect(page.locator('text=Autonomous Agent Neural Consensus Protocol').first()).toBeVisible();
  });

  test('3. Timed Technical Assessment & Quiz Room with Proctored Navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/assessment/assess-ideathon-1`);
    await expect(page.locator('h1')).toContainText('Distributed Systems & Algorithmic Architecture Challenge');

    // Verify Timer and Question Navigator
    await expect(page.locator('text=REMAINING')).toBeVisible();
    await expect(page.locator('text=Question Navigator')).toBeVisible();
    await expect(page.locator('text=QUESTION 1 OF')).toBeVisible();

    // Select Option A for Q1
    await page.click('button:has-text("The entry must be stored on a majority of cluster nodes.")');
    await page.click('button:has-text("NEXT QUESTION")');

    // Verify Q2 is active
    await expect(page.locator('text=QUESTION 2 OF')).toBeVisible();

    // Select Option for Q2
    await page.click('button:has-text("3f + 1")');

    // Finish & Submit Assessment
    await page.click('button:has-text("FINISH & SUBMIT")');

    // Verify Evaluated Results
    await expect(page.locator('text=Assessment Complete & Evaluated')).toBeVisible();
    await expect(page.locator('text=PASSING CRITERIA MET')).toBeVisible();
  });

  test('4. Live Leaderboard with Standings & Real-Time Ranks', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/leaderboard`);
    await expect(page.locator('h1')).toContainText('Live Competition Leaderboard');

    // Verify Leaderboard rows and top ranking team
    await expect(page.locator('text=Synapse Labs').first()).toBeVisible();
    await expect(page.locator('text=Weighted Score')).toBeVisible();
  });

  test('5. Organizer Live Stage Control Room & Instant Broadcasting', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/live`);
    await expect(page.locator('h2')).toContainText('Live Event Control Room');

    // Test Live Control Actions
    await page.click('button:has-text("PAUSE")');
    await expect(page.locator('text=Live stage command executed: PAUSE_EVENT')).toBeVisible();

    await page.click('button:has-text("START")');
    await expect(page.locator('text=Live stage command executed: START_EVENT')).toBeVisible();

    // Broadcast Instant Announcement
    await page.fill('textarea[placeholder*="1 hour remaining"]', '30 minutes remaining until Stage 01 deliverable closure.');
    await page.click('button:has-text("BROADCAST TO LIVE AUDIENCE")');
    await expect(page.locator('text=Communique broadcasted to all connected live participants')).toBeVisible();
  });

  test('6. Anti-Cheat & Integrity Telemetry Dashboard', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/integrity`);
    await expect(page.locator('h2')).toContainText('Competition Integrity & Anti-Cheat Monitor');

    // Verify Telemetry counters
    await expect(page.locator('text=Total Monitored Events')).toBeVisible();
    await expect(page.locator('text=Flagged Participants')).toBeVisible();
    await expect(page.locator('text=TAB_SWITCH').first()).toBeVisible();
  });

  test('7. Official Published Championship Results Showcase', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/results`);
    await expect(page.locator('h1')).toContainText('Championship Honors & Awards');

    // Verify Grand Champion card and Verification Link
    await expect(page.locator('text=FIRST PLACE // GRAND CHAMPION')).toBeVisible();
    await expect(page.locator('text=VERIFY OFFICIAL CREDENTIAL')).toBeVisible();
  });

  const viewports = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '390x844', width: 390, height: 844 },
    { name: '320x568', width: 320, height: 568 },
  ];

  for (const vp of viewports) {
    test(`8. Responsive Zero Overflow Audit on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
