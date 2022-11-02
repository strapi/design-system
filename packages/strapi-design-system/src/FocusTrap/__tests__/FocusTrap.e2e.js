import { injectAxe, checkA11y } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('FocusTrap', () => {
  test.describe('light mode', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-focustrap--base&viewMode=story');
      await injectAxe(page);
    });

    test.beforeEach(async ({ page }) => {
      await page.focus('#trigger');
      await page.keyboard.press('Space');
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('focuses the first focusable element when opening the focus trap', async ({ page }) => {
      await expect(page.locator('[aria-label="Close"]')).toBeFocused();
    });

    test('restores focus when pressing Escape', async ({ page }) => {
      await page.waitForSelector('[aria-label="Close"]');
      await page.keyboard.press('Escape');

      await expect(page.locator('#trigger')).toBeFocused();
    });

    test.describe('Pressing Tab in the trap', () => {
      test('traps the focus when pressing Tab for Firefox and Chrome', async ({ page, browserName }) => {
        test.skip(browserName === 'webkit', 'Still working on it');
        await page.keyboard.press('Tab');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(page.locator('#last')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(page.locator('[aria-label="Close"]')).toBeFocused();
      });

      test('traps the focus when pressing Tab for Webkit', async ({ page, browserName }) => {
        test.skip(['firefox', 'chromium'].includes(browserName), 'Still working on it');
        await page.waitForSelector('[aria-label="Close"]');
        await page.keyboard.press('Alt+Tab');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('Alt+Tab');
        await expect(page.locator('#last')).toBeFocused();

        await page.keyboard.press('Alt+Tab');
        await expect(page.locator('[aria-label="Close"]')).toBeFocused();
      });

      test('traps the focus when dynamically adding an element in the focus tree and pressing Tab for Firefox and Chrome', async ({
        page,
        browserName,
      }) => {
        test.skip(browserName === 'webkit', 'Still working on it');
        await page.keyboard.press('Tab');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(page.locator('#last')).toBeFocused();
        await page.click('#last');

        await page.keyboard.press('Tab');
        await expect(page.locator('#real-last')).toBeFocused();
      });

      test('traps the focus when pressing Tab with click for Webkit', async ({ page, browserName }) => {
        test.skip(['firefox', 'chromium'].includes(browserName), 'Still working on it');
        await page.waitForSelector('[aria-label="Close"]');
        await page.keyboard.press('Alt+Tab');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('Alt+Tab');
        await expect(page.locator('#last')).toBeFocused();
        await page.click('#last');

        await page.keyboard.press('Alt+Tab');
        await expect(page.locator('#real-last')).toBeFocused();
      });
    });

    test.describe('Pressing Shift+Tab in the trap', () => {
      test('traps the focus when pressing Tab for Firefox and Chrome', async ({ page, browserName }) => {
        test.skip(browserName === 'webkit', 'Still working on it');
        await page.keyboard.press('Shift+Tab');
        await expect(page.locator('#last')).toBeFocused();

        await page.keyboard.press('Shift+Tab');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('Shift+Tab');
        await expect(page.locator('[aria-label="Close"]')).toBeFocused();
      });

      test('traps the focus when pressing Tab for Webkit', async ({ page, browserName }) => {
        test.skip(['firefox', 'chromium'].includes(browserName), 'Still working on it');
        await page.waitForSelector('[aria-label="Close"]');
        await page.keyboard.press('Alt+Shift+Tab');
        await expect(page.locator('#last')).toBeFocused();

        await page.keyboard.press('Alt+Shift+Tab');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('Alt+Shift+Tab');
        await expect(page.locator('[aria-label="Close"]')).toBeFocused();
      });
    });
  });

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-focustrap--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
