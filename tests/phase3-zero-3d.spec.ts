import { test, expect } from '@playwright/test';

const CORE_ROUTES = [
  '/',
  '/mission',
  '/discovery',
  '/ecosystem',
  '/frontier',
  '/horizon',
  '/directive',
  '/ventures',
  '/labs',
  '/technologies',
  '/insights',
  '/contact',
];

test.describe('Phase 3 // Strict Zero-3D Verification', () => {
  for (const route of CORE_ROUTES) {
    test(`Route ${route} must have ZERO 3D WebGL meshes and ZERO Three.js scenes`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });

      // Verify no Three.js or R3F global objects exist in window
      const hasThreeGlobal = await page.evaluate(() => {
        const win = window as any;
        return Boolean(win.THREE || win.__THREE__ || win.__r3f);
      });
      expect(hasThreeGlobal).toBe(false);

      // Verify no Three.js canvas or 3D data tags
      const threeElements = await page.locator('canvas[data-engine="three.js"], [data-3d="true"], [data-r3f="true"]').count();
      expect(threeElements).toBe(0);

      // Verify canvases are 2D only
      const canvases = await page.locator('canvas').all();
      for (const canvas of canvases) {
        const is3D = await canvas.evaluate((el: HTMLCanvasElement) => {
          return Boolean((el as any).__r3f || el.getAttribute('data-engine') === 'three.js');
        });
        expect(is3D).toBe(false);
      }
    });
  }
});
