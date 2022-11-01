import { injectAxe, checkA11y } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('Card', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-card--base&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('without asset action', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-card--without-asset-action&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('without asset action nor timer', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-card--without-asset-action-nor-timer&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('without asset', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-card--without-asset&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('keyboard navigable', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-card--keyboard-navigable&viewMode=story');
        await injectAxe(page);
      });

      test('check a11y', async ({ page }) => {
        await checkA11y(page);
      });

      test('moves to the next element when pressing ArrowDown', async ({ page }) => {
        await page.focus('#first');

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#fourth')).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#first')).toBeFocused();
      });

      test('moves to the next element when pressing ArrowRight', async ({ page }) => {
        await page.focus('#first');

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#fourth')).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#first')).toBeFocused();
      });

      test('moves to the previous element when pressing ArrowUp', async ({ page }) => {
        await page.focus('#fourth');

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('#first')).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('#fourth')).toBeFocused();
      });

      test('moves to the previous element when pressing ArrowLeft', async ({ page }) => {
        await page.focus('#fourth');

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#first')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#fourth')).toBeFocused();
      });

      test('moves to the last element when pressing End', async ({ page }) => {
        await page.focus('#first');
        await page.keyboard.press('End');
        await expect(page.locator('#fourth')).toBeFocused();
      });

      test('moves to the first element when pressing Home', async ({ page }) => {
        await page.focus('#fourth');
        await page.keyboard.press('Home');
        await expect(page.locator('#first')).toBeFocused();
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-card--base&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('without asset action', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-card--without-asset-action&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('without asset action nor timer', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-card--without-asset-action-nor-timer&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('without asset', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-card--without-asset&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });
});
