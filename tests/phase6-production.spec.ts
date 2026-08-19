import { test, expect } from '@playwright/test';

test.describe('ARASS EVENTS // Phase 6: Production Polish & Scale Readiness', () => {
  const BASE_URL = 'http://localhost:3000';

  test.beforeAll(async ({ request }) => {
    await request.post(`${BASE_URL}/api/events/reset`);
  });

  test.beforeEach(async ({ page }) => {
    // Authenticate as Super Admin
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button:has-text("SIGN IN")');
    await page.waitForURL('**/organizer/dashboard');
  });

  test('1. Participant Dashboard with Next Action & Workspaces', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`);
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(page.locator('text=NEXT ACTION REQUIRED')).toBeVisible();
    await expect(page.locator('text=ARASS IDEATHON 2026').first()).toBeVisible();
  });

  test('2. Live Event Workspace & Server Synchronized Clock', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await expect(page.locator('h1')).toContainText('ARASS IDEATHON 2026');
    await expect(page.locator('text=SERVER SYNCED')).toBeVisible();
    await expect(page.locator('text=LIVE COMPETITION COMMAND CENTER')).toBeVisible();
  });

  test('3. Multi-Format Submission Workflow with Draft & Validate', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);

    // Fill form
    await page.fill('input[placeholder*="Autonomous Multi-Agent"]', 'Autonomous Neural Consensus Protocol');
    await page.fill('input[placeholder*="https://github.com"]', 'https://github.com/arass-research/agent-neural-consensus');
    await page.fill('input[placeholder*="https://demo.project.org"]', 'https://demo.consensus.arass.technology');

    // Test Save Draft
    await page.click('button:has-text("SAVE DRAFT")');
    await expect(page.locator('text=Draft saved locally in workspace state')).toBeVisible();

    // Transmit
    await page.click('button:has-text("TRANSMIT DELIVERABLE")');
    await expect(page.locator('text=Deliverable submitted successfully')).toBeVisible();
  });

  test('4. Version History Chain (v1 -> v2)', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await expect(page.locator('text=Submission History & Version Chain')).toBeVisible();
    await expect(page.locator('text=v1').first()).toBeVisible();
  });

  test('5. Organizer Live Control Room Execution', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/live`);
    await expect(page.locator('h2')).toContainText('Live Event Control Room');

    // Stage control actions
    await page.click('button:has-text("PAUSE")');
    await expect(page.locator('text=Live stage command executed: PAUSE_EVENT')).toBeVisible();

    await page.click('button:has-text("START")');
    await expect(page.locator('text=Live stage command executed: START_EVENT')).toBeVisible();
  });

  test('6. Event Deadline Extension Workflow', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/live`);

    await page.click('button:has-text("EXTEND DEADLINE")');
    await expect(page.locator('text=Extend Competition Deadline')).toBeVisible();

    await page.fill('textarea[placeholder*="regional infrastructure maintenance"]', 'Extended 48h for all participants.');
    await page.click('button:has-text("CONFIRM EXTENSION")');
    await expect(page.locator('text=Deadline extended successfully')).toBeVisible();
  });

  test('7. Operational Incidents Help Desk', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/incidents`);
    await expect(page.locator('h2')).toContainText('Incident Management & Help Desk');
    await expect(page.locator('text=Operational Incident Ledger')).toBeVisible();

    // Log incident
    await page.click('button:has-text("LOG INCIDENT")');
    await expect(page.locator('text=Log Operational Incident')).toBeVisible();
    await page.fill('textarea[placeholder*="Describe the operational issue"]', 'Simulated cluster bandwidth test complete.');
    await page.click('button:has-text("CONFIRM & LOG")');
    await expect(page.locator('text=Operational incident logged successfully')).toBeVisible();
  });

  test('8. Notifications Center & Mark Read Actions', async ({ page }) => {
    // Log in as Alex Chen to view participant notifications
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'alex.chen@sovereign-tech.org');
    await page.fill('input[type="password"]', 'Participant@2026!');
    await page.click('button:has-text("SIGN IN")');
    await page.waitForURL('**/dashboard');

    await page.goto(`${BASE_URL}/notifications`);
    await expect(page.locator('h1')).toContainText('Notifications & Dispatches');
    await expect(page.locator('text=Stage 01 Submissions Window is Live').first()).toBeVisible();

    // Mark All Read
    await page.click('button:has-text("MARK ALL READ")');
    await expect(page.locator('text=UNREAD (0)')).toBeVisible();
  });

  test('9. Certificate Studio 3.0 & Bulk Batch Pipeline', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/certificates`);
    await expect(page.locator('h1')).toContainText('Certificate Studio');
    await expect(page.locator('text=Bulk Certificate Pipeline')).toBeVisible();

    // Trigger Bulk Batch
    await page.click('button:has-text("TRIGGER BULK ISSUANCE JOB")');
    await expect(page.locator('text=Bulk generation job started')).toBeVisible();
  });

  test('10. Public QR Credential Verification', async ({ page }) => {
    await page.goto(`${BASE_URL}/verify/certificate/ARASS-IDEA-2026-000001`);
    await expect(page.locator('text=OFFICIALLY VERIFIED & VALID CREDENTIAL')).toBeVisible();
    await expect(page.locator('text=Alex Chen')).toBeVisible();
  });

  test('11. Global Event Discovery & Instant Category Filters', async ({ page }) => {
    await page.goto(`${BASE_URL}/events`);
    await expect(page.locator('h1')).toContainText('BUILD. COMPETE.');
    await expect(page.locator('text=IDEATHONS').first()).toBeVisible();

    // Search query
    await page.fill('input[placeholder*="Search hackathons"]', 'Ideathon');
    await expect(page.locator('text=ARASS IDEATHON 2026').first()).toBeVisible();
  });

  test('12. Leaderboard & Results Showcase', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/leaderboard`);
    await expect(page.locator('h1')).toContainText('Live Competition Leaderboard');
    await expect(page.locator('text=Synapse Labs').first()).toBeVisible();

    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/results`);
    await expect(page.locator('h1')).toContainText('Championship Honors & Awards');
    await expect(page.locator('text=GRAND CHAMPION')).toBeVisible();
  });

  test('13. Judge Scoring Calibration & Outlier Detection', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/calibration`);
    await expect(page.locator('h2')).toContainText('Judge Scoring Variance & Calibration');
    await expect(page.locator('text=Juror Scoring Variance Matrix')).toBeVisible();
    await expect(page.locator('text=Dr. Evelyn Vance').first()).toBeVisible();
  });

  test('14. Organizer Task Board & Lifecycle Checklist', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/tasks`);
    await expect(page.locator('h1')).toContainText('Organizer Task Board');
    await expect(page.locator('text=EVENT HEALTH').first()).toBeVisible();
    await expect(page.locator('text=Review Stage 01 Submissions Roster')).toBeVisible();

    // Toggle checklist item
    await page.click('button:has-text("LIFECYCLE CHECKLIST")');
    await expect(page.locator('text=BEFORE EVENT OPERATIONS')).toBeVisible();
  });

  test('15. Security & RBAC Guard on Protected Endpoints', async ({ request }) => {
    // Unauthenticated call to batch certs
    const unauthRes = await request.post(`${BASE_URL}/api/events/evt-arass-ideathon-2026/certificates/batch`, {
      data: { type: 'WINNER' },
    });
    expect(unauthRes.status()).toBe(401);

    // Unauthenticated call to extend deadline
    const unauthExt = await request.post(`${BASE_URL}/api/events/evt-arass-ideathon-2026/extend`, {
      data: { targetType: 'ROUND', newDeadline: new Date().toISOString(), reason: 'Test' },
    });
    expect(unauthExt.status()).toBe(401);
  });

  const viewports = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '390x844', width: 390, height: 844 },
    { name: '320x568', width: 320, height: 568 },
  ];

  for (const vp of viewports) {
    test(`16. Responsive Zero Horizontal Overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/dashboard`);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
