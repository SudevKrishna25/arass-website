import { test, expect } from '@playwright/test';

test.describe('ARASS EVENTS // Phase 2: Public Participant Platform', () => {
  const BASE_URL = 'http://localhost:3000';

  test.beforeAll(async ({ request }) => {
    await request.post(`${BASE_URL}/api/events/reset`);
  });

  test('1. Events Discovery: Rendering, Search & Multi-Faceted Filters', async ({ page }) => {
    await page.goto(`${BASE_URL}/events`);
    await expect(page.locator('h1')).toContainText('BUILD. COMPETE.');

    // Verify initial events rendered
    const eventCards = page.locator('h3');
    await expect(eventCards.first()).toBeVisible();

    // Perform Search Query
    const searchInput = page.locator('input[placeholder*="Search hackathons"]');
    await searchInput.fill('Ideathon');
    await page.waitForTimeout(300);

    // Verify filtered card contains Ideathon
    await expect(page.locator('text=ARASS IDEATHON 2026').first()).toBeVisible();

    // Clear search and filter by Event Type: Hackathons
    await searchInput.fill('');
    await page.click('button:has-text("Hackathons")');
    await page.waitForTimeout(300);
    await expect(page.locator('text=ARASS NEURAL HACKATHON 2026').first()).toBeVisible();
  });

  test('2. Dedicated Event Microsite: Hero, Sticky Tabs & Information Architecture', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026`);
    await expect(page.locator('h1')).toContainText('ARASS IDEATHON 2026');

    // Verify Prize Pool & Key Metrics
    await expect(page.locator('text=₹50,000').first()).toBeVisible();
    await expect(page.locator('text=/REGISTER NOW|ENTER COMPETITION|LIVE ROOM/').first()).toBeVisible();

    // Click Rounds Tab
    await page.click('button:has-text("Rounds")');
    await expect(page.locator('text=Multi-Stage Competition Roadmap')).toBeVisible();
    await expect(page.locator('text=Round 1: Idea Pitch').first()).toBeVisible();

    // Click Prizes Tab
    await page.click('button:has-text("Prizes & Perks")');
    await expect(page.locator('text=₹30,000').first()).toBeVisible();

    // Click FAQ Tab
    await page.click('button:has-text("FAQ")');
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
  });

  test('3. Interactive Registration Flow', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/register`);
    await expect(page.locator('h1')).toContainText('ARASS IDEATHON 2026');

    // Step 1: Login / Authenticate
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      await page.fill('input[type="text"][placeholder*="Alex"]', 'Auditor User');
      await emailInput.fill(`testuser-${Date.now()}@university.edu`);
      await page.fill('input[type="password"]', 'Participant@2026!');
      await page.fill('input[placeholder*="Stanford"]', 'Imperial College London');
      await page.click('button:has-text("AUTHENTICATE & PROCEED")');
    } else {
      const continueBtn = page.locator('button:has-text("CONTINUE AS")');
      if (await continueBtn.isVisible()) {
        await continueBtn.click();
      }
    }

    // Step 2: Team & Event Details
    await expect(page.locator('text=Participation Format')).toBeVisible();
    await page.click('button:has-text("Review & Confirm")');

    // Step 3: Review & Terms
    await expect(page.locator('text=Registration Summary')).toBeVisible();
    await page.check('input[type="checkbox"]');
    await page.click('button:has-text("CONFIRM & ENTER COMPETITION")');

    // Should redirect to Live Portal
    await page.waitForURL('**/events/arass-ideathon-2026/live');
    await expect(page.locator('h1')).toContainText('ARASS IDEATHON 2026');
  });

  test('4. Live Competition Command Center & Project Deliverable Submission', async ({ page }) => {
    // Authenticate user first
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'alex.chen@sovereign-tech.org');
    await page.fill('input[type="password"]', 'Participant@2026!');
    await page.click('button:has-text("SIGN IN")');
    await page.waitForURL('**/dashboard');

    // Navigate to Live Portal
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await expect(page.locator('text=LIVE COMPETITION COMMAND CENTER')).toBeVisible();

    // Fill Submission Form
    await page.fill('input[placeholder*="Autonomous Multi-Agent"]', 'Quantum Graph Routing Engine');
    await page.fill('textarea[placeholder*="consensus formulation"]', 'Scalable distributed consensus layer for autonomous agent routing.');
    await page.fill('input[placeholder*="https://github.com"]', 'https://github.com/arass/quantum-graph');

    // Submit Project
    await page.click('button:has-text("TRANSMIT DELIVERABLE")');
    await expect(page.locator('text=Deliverable submitted successfully')).toBeVisible();
  });

  test('5. Public Certificate Verification Engine', async ({ page }) => {
    // A. Valid Flagship Certificate
    await page.goto(`${BASE_URL}/verify/certificate/ARASS-IDEA-2026-000001`);
    await expect(page.locator('text=OFFICIALLY VERIFIED & VALID CREDENTIAL')).toBeVisible();
    await expect(page.locator('text=Alex Chen')).toBeVisible();
    await expect(page.locator('text=First Place // Grand Champion')).toBeVisible();

    // B. Invalid Certificate ID Error State
    await page.goto(`${BASE_URL}/verify/certificate/INVALID-NONEXISTENT-ID`);
    await expect(page.locator('text=Certificate Invalid or Not Found')).toBeVisible();
  });

  test('6. Participant Dashboard, My Events & Profile', async ({ page }) => {
    // Dashboard
    await page.goto(`${BASE_URL}/dashboard`);
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(page.locator('text=ARASS IDEATHON 2026').first()).toBeVisible();

    // My Events & Credentials
    await page.goto(`${BASE_URL}/my-events`);
    await expect(page.locator('h1')).toContainText('My Events & Credentials');
    await page.click('button:has-text("Verified Certificates")');
    await expect(page.locator('text=ARASS-IDEA-2026-000001')).toBeVisible();

    // Profile Portfolio
    await page.goto(`${BASE_URL}/profile`);
    await expect(page.locator('h1')).toContainText('Engineering Portfolio & Profile');
    await page.click('button:has-text("SAVE PROFILE")');
    await expect(page.locator('text=Profile changes updated successfully.')).toBeVisible();
  });

  const viewports = [
    { name: '1920x1080', width: 1920, height: 1080 },
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1024x768', width: 1024, height: 768 },
    { name: '768x1024', width: 768, height: 1024 },
    { name: '390x844', width: 390, height: 844 },
    { name: '320x568', width: 320, height: 568 },
  ];

  for (const vp of viewports) {
    test(`7. Responsive & Zero Overflow Audit on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/events`);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
