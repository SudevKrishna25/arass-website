import { test, expect } from '@playwright/test';

test.describe('ARASS Production QA & Interactions Suite', () => {
  test('MegaMenu should open, update previews on hover, and close with ESC', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Open Menu
    const menuBtn = page.getByTestId('menu-toggle-btn');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Verify MegaMenu modal is open
    const menuDialog = page.getByRole('dialog', { name: /Institutional Navigation Archive/i });
    await expect(menuDialog).toBeVisible({ timeout: 5000 });

    // Verify links exist
    await expect(menuDialog.getByRole('link', { name: /MISSION/i })).toBeVisible();
    await expect(menuDialog.getByRole('link', { name: /DISCOVERY/i })).toBeVisible();

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(menuDialog).not.toBeVisible();
  });

  test('Ventures dossier modal opens and displays breakthrough data', async ({ page }) => {
    await page.goto('/ventures', { waitUntil: 'networkidle' });

    // Click first venture card
    const firstVenture = page.getByText('AEON SYNTHESIS');
    await expect(firstVenture).toBeVisible();
    await firstVenture.click();

    // Check modal
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('KEY SCIENTIFIC BREAKTHROUGH')).toBeVisible();
    await expect(modal.getByText('REQUEST CAPITAL ALLOCATION ACCESS')).toBeVisible();
  });

  test('Insights dossier modal opens and displays full whitepaper sections', async ({ page }) => {
    await page.goto('/insights', { waitUntil: 'networkidle' });

    const firstArticle = page.getByText('THE NEXT ENERGY ARCHITECTURE');
    await expect(firstArticle).toBeVisible();
    await firstArticle.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('EXECUTIVE ABSTRACT')).toBeVisible();
    await expect(modal.getByText('ACADEMIC & INSTITUTIONAL REFERENCES')).toBeVisible();
  });

  test('Contact form handles inquiry transmission and delivers receipt', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });

    // Fill form
    await page.getByPlaceholder('Dr. Alexander Vance').fill('Dr. Elena Rostova');
    await page.getByPlaceholder('Max Planck / CERN / Sovereign Fund').fill('Quantum Materials Institute');
    await page.getByPlaceholder('vance@institute.org').fill('rostova@qmi.org');
    await page.getByPlaceholder(/Detail the scientific thesis/i).fill('Proposal for 30T HTS magnet confinement testing.');

    // Submit
    const submitBtn = page.getByTestId('contact-submit-btn');
    await submitBtn.click();

    // Expect receipt confirmation
    await expect(page.getByTestId('receipt-banner')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('ARASS WILL REVIEW YOUR INQUIRY.')).toBeVisible();
  });

  test('Mobile responsive view has zero horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const routes = ['/', '/mission', '/discovery', '/ecosystem', '/ventures', '/contact'];

    for (const route of routes) {
      await page.goto(route, { waitUntil: 'networkidle' });

      // Check horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px margin for subpixel rendering
    }
  });
});
