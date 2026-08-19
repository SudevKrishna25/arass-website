import { test, expect } from '@playwright/test';

test.describe('ARASS EVENTS // Phase 3: Organizer & Admin Operating System', () => {
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

  test('1. Organizer Dashboard: Metrics, Action Center & Event Links', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/dashboard`);
    await expect(page.locator('h1')).toContainText('Command Center');

    // Verify key metrics
    await expect(page.locator('text=Active Competitions')).toBeVisible();
    await expect(page.locator('text=Total Registrations')).toBeVisible();
    await expect(page.locator('text=Action Center')).toBeVisible();
  });

  test('2. Events Management: Table, Filter & Publish Actions', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events`);
    await expect(page.locator('h1')).toContainText('Operations Center');

    // Verify event rows
    await expect(page.locator('text=ARASS IDEATHON 2026').first()).toBeVisible();

    // Filter by Registration Open
    await page.click('button:has-text("REGISTRATION OPEN")');
    await page.waitForTimeout(300);
    await expect(page.locator('text=ARASS IDEATHON 2026').first()).toBeVisible();
  });

  test('3. Event Creation Studio Wizard', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/new`);
    await expect(page.locator('h1')).toContainText('Create New Competition');

    // Stage 1: Basic Details
    const uniqueSlug = `test-hack-${Date.now()}`;
    await page.fill('input[placeholder*="National Frontier"]', 'Autonomous Agentic Cup 2026');
    await page.fill('input[placeholder*="national-frontier"]', uniqueSlug);
    await page.fill('input[placeholder*="48-hour continuous"]', 'Frontier engineering challenge for agentic software.');
    await page.fill('textarea[placeholder*="Detail the technical"]', 'Full technical problem statement directive.');
    await page.click('button:has-text("Next: Format & Timeline")');

    // Stage 2: Sizing & Timeline
    await expect(page.locator('text=Delivery Mode')).toBeVisible();
    await page.click('button:has-text("Review & Publish")');

    // Stage 3: Review & Submit
    await expect(page.locator('text=Competition Summary')).toBeVisible();
    await page.click('button:has-text("CREATE & INITIALIZE EVENT")');

    // Should redirect to participant management
    await page.waitForURL(`**/organizer/events/${uniqueSlug}/participants`);
  });

  test('4. Participant Management: Table & Shortlist Action', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/participants`);
    await expect(page.locator('h1')).toContainText('ARASS IDEATHON 2026');

    // Verify participant rows
    await expect(page.locator('text=reg-synapse-1').first()).toBeVisible();
  });

  test('5. Round Management & Stage Timeline', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/rounds`);
    await expect(page.locator('h2')).toContainText('Stage Timeline');
    await expect(page.locator('text=Round 1: Idea Pitch').first()).toBeVisible();
  });

  test('6. Deliverables & Jury Submissions Review', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/submissions`);
    await expect(page.locator('h2')).toContainText('Deliverables & Jury Submissions');
    await expect(page.locator('text=Autonomous Multi-Agent Neural Consensus Architecture').first()).toBeVisible();
  });

  test('7. Certificate Studio & Verification Linkage', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/certificates`);
    await expect(page.locator('h2')).toContainText('Cryptographic Certificate Studio');
    await expect(page.locator('text=ARASS-IDEA-2026-000001').first()).toBeVisible();
  });

  test('8. Judge Scoring Console', async ({ page }) => {
    await page.goto(`${BASE_URL}/judge/dashboard`);
    await expect(page.locator('h1')).toContainText('Evaluator Scoring Console');
    await page.click('button:has-text("SUBMIT & LOCK EVALUATION")');
    await expect(page.locator('text=Evaluation submitted and cryptographically locked')).toBeVisible();
  });

  test('9. Communications & Broadcasts Suite', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizer/communications`);
    await expect(page.locator('h1')).toContainText('Broadcast & Announcements');

    await page.fill('input[placeholder*="URGENT"]', '[NOTICE] Platform Maintenance Window');
    await page.fill('textarea[placeholder*="Enter official"]', 'Official communique regarding maintenance window.');
    await page.click('button:has-text("DISPATCH BROADCAST")');
    await expect(page.locator('text=Broadcast successfully delivered')).toBeVisible();
  });

  test('10. Founder Admin Governance & Immutable Audit Logs', async ({ page }) => {
    // Admin Dashboard
    await page.goto(`${BASE_URL}/admin`);
    await expect(page.locator('h1')).toContainText('Platform Governance');

    // Audit Log Ledger
    await page.goto(`${BASE_URL}/admin/audit`);
    await expect(page.locator('h1')).toContainText('Immutable System Logs');
    await expect(page.locator('text=EVENT_CREATED').first()).toBeVisible();
  });

  const viewports = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '390x844', width: 390, height: 844 },
    { name: '320x568', width: 320, height: 568 },
  ];

  for (const vp of viewports) {
    test(`11. Responsive Zero Overflow Audit on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/organizer/dashboard`);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
