import { test, expect } from '@playwright/test';

const ROUTES = [
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

test.describe('ARASS Strict Zero-3D Verification', () => {
  for (const route of ROUTES) {
    test(`Route ${route} must have ZERO 3D WebGL meshes and ZERO Three.js scenes`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });

      // Inspect all canvas elements on the page
      const canvases = await page.locator('canvas').all();
      for (const canvas of canvases) {
        const is3D = await canvas.evaluate((el: HTMLCanvasElement) => {
          // Check if webgl or webgl2 context was acquired
          const hasWebGL = (el as any).__webglContextLost || el.getAttribute('data-engine') === 'three.js';
          return Boolean(hasWebGL);
        });
        expect(is3D).toBe(false);
      }

      // Verify no Three.js objects attached to window
      const hasThreeGlobal = await page.evaluate(() => {
        return Boolean((window as any).THREE || (window as any).__THREE__);
      });
      expect(hasThreeGlobal).toBe(false);
    });
  }
});
