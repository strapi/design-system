const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Tabs', () => {
  test.describe('default variant', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-tabs--base&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    test('verifies that only the first panel is visible at the beginning', async ({ page }) => {
      const isFirstPanelVisible = await page.isVisible('text="First panel"');
      expect(isFirstPanelVisible).toBeTruthy();

      const isSecondPanelVisible = await page.isVisible('text="Second panel"');
      expect(isSecondPanelVisible).toBeFalsy();

      const isThirdPanelVisible = await page.isVisible('text="Third panel"');
      expect(isThirdPanelVisible).toBeFalsy();
    });

    test.describe('Click interactions', () => {
      test('shows only the first panel when clicking on it', async ({ page }) => {
        await page.click('text="Second"');
        await page.click('text="First"');

        const isFirstPanelVisible = await page.isVisible('text="First panel"');
        expect(isFirstPanelVisible).toBeTruthy();

        const isSecondPanelVisible = await page.isVisible('text="Second panel"');
        expect(isSecondPanelVisible).toBeFalsy();

        const isThirdPanelVisible = await page.isVisible('text="Third panel"');
        expect(isThirdPanelVisible).toBeFalsy();
      });

      test('shows only the second panel when clicking on it', async ({ page }) => {
        await page.click('text="Second"');

        const isFirstPanelVisible = await page.isVisible('text="First panel"');
        expect(isFirstPanelVisible).toBeFalsy();

        const isSecondPanelVisible = await page.isVisible('text="Second panel"');
        expect(isSecondPanelVisible).toBeTruthy();

        const isThirdPanelVisible = await page.isVisible('text="Third panel"');
        expect(isThirdPanelVisible).toBeFalsy();
      });

      test('shows only the third panel when clicking on it', async ({ page }) => {
        await page.click('text="Third"');

        const isFirstPanelVisible = await page.isVisible('text="First panel"');
        expect(isFirstPanelVisible).toBeFalsy();

        const isSecondPanelVisible = await page.isVisible('text="Second panel"');
        expect(isSecondPanelVisible).toBeFalsy();

        const isThirdPanelVisible = await page.isVisible('text="Third panel"');
        expect(isThirdPanelVisible).toBeTruthy();
      });
    });

    test.describe('Keyboard interactions', () => {
      test('moves to the next tab when pressing ArrowRight', async ({ page }) => {
        await page.waitForSelector('#tabs-0-tab');

        await page.focus('#tabs-0-tab');
        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#tabs-1-tab')).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#tabs-2-tab')).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#tabs-0-tab')).toBeFocused();
      });

      test('moves to the previous tab when pressing ArrowLeft', async ({ page }) => {
        await page.waitForSelector('#tabs-0-tab');

        await page.focus('#tabs-0-tab');
        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#tabs-2-tab')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#tabs-1-tab')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#tabs-0-tab')).toBeFocused();
      });

      test('moves to the first tab when pressing Home', async ({ page }) => {
        await page.waitForSelector('#tabs-0-tab');

        await page.focus('#tabs-0-tab');
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Home');

        await expect(page.locator('#tabs-0-tab')).toBeFocused();
      });

      test('moves to the last tab when pressing End', async ({ page }) => {
        await page.waitForSelector('#tabs-0-tab');

        await page.focus('#tabs-0-tab');
        await page.keyboard.press('End');

        await expect(page.locator('#tabs-2-tab')).toBeFocused();
      });
    });
  });

  test.describe('simple variant', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-tabs--simple&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
