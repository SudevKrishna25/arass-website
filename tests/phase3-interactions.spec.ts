import { test, expect } from '@playwright/test';

test.describe('Phase 3 // Core Interactive Systems', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('arass_intro_seen', 'true');
    });
  });

  test('Exhibition MegaMenu opens, displays clean navigation chapters, and closes with ESC', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);

    // Open Menu
    const menuBtn = page.getByTestId('menu-toggle-btn');
    await expect(menuBtn).toBeVisible({ timeout: 5000 });
    await menuBtn.click();

    // Verify MegaMenu modal
    const menuDialog = page.getByRole('dialog', { name: /Institutional Navigation Archive/i });
    await expect(menuDialog).toBeVisible({ timeout: 5000 });

    // Check primary chapters exist
    await expect(menuDialog.getByRole('link', { name: /01 WORK/i })).toBeVisible();
    await expect(menuDialog.getByRole('link', { name: /02 SOLUTIONS/i })).toBeVisible();
    await expect(menuDialog.getByRole('link', { name: /03 PRODUCTS/i })).toBeVisible();
    await expect(menuDialog.getByRole('link', { name: /04 LAB/i })).toBeVisible();
    await expect(menuDialog.getByRole('link', { name: /05 COMPANY/i })).toBeVisible();
    await expect(menuDialog.getByRole('link', { name: /06 INSIGHTS/i })).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await expect(menuDialog).not.toBeVisible();
  });

  test('Work Flagship Case Studies expand into technical specifications dossier', async ({ page }) => {
    await page.goto('/work', { waitUntil: 'domcontentloaded' });

    const firstProject = page.getByText('SYNAPSE NEURAL ENGINE').first();
    await expect(firstProject).toBeVisible({ timeout: 5000 });
    await firstProject.click();

    // Verify Technical Specs Dossier Modal
    const modalHeader = page.getByText(/SYSTEM OVERVIEW & ARCHITECTURE/i);
    await expect(modalHeader).toBeVisible({ timeout: 4000 });

    // Close Modal
    const closeBtn = page.locator('button:has(svg.lucide-x)');
    await closeBtn.click();
    await expect(modalHeader).not.toBeVisible();
  });

  test('Services page renders four core disciplines and key capabilities', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('AI SYSTEMS').first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('WEB & SOFTWARE').first()).toBeVisible();
    await expect(page.getByText('AUTOMATION').first()).toBeVisible();
    await expect(page.getByText('DIGITAL EXPERIENCES').first()).toBeVisible();
  });

  test('About page renders mandate, 3 core principles, and global hubs', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('THE ARASS MANDATE')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('PERMANENT AMBITION')).toBeVisible();
    await expect(page.getByText('GENEVA')).toBeVisible();
  });

  test('Contact form handles inquiry transmission and returns receipt confirmation', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });

    // Fill form
    await page.locator('input[type="text"]').first().fill('Dr. Evelyn Vance');
    await page.locator('input[type="email"]').fill('evelyn.vance@sovereign-tech.org');
    await page.locator('textarea').fill('Inquiry regarding quantum neural inference cluster partnership and deployment.');

    // Submit
    const submitBtn = page.getByTestId('contact-submit-btn');
    await expect(submitBtn).toBeVisible({ timeout: 5000 });
    await submitBtn.click();

    // Verify Transmission Confirmation
    const receiptBanner = page.getByTestId('receipt-banner');
    await expect(receiptBanner).toBeVisible({ timeout: 5000 });
  });
});
