const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Card', () => {
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
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    ['ArrowDown', 'ArrowRight'].forEach((key) => {
      test(`moves to the next element when pressing ${key}`, async ({ page }) => {
        await page.focus('#first');

        await page.keyboard.press(key);
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press(key);
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press(key);
        await expect(page.locator('#fourth')).toBeFocused();

        await page.keyboard.press(key);
        await expect(page.locator('#first')).toBeFocused();
      });
    });

    ['ArrowUp', 'ArrowLeft'].forEach((key) => {
      test(`moves to the previous element when pressing ${key}`, async ({ page }) => {
        await page.focus('#fourth');

        await page.keyboard.press(key);
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press(key);
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press(key);
        await expect(page.locator('#first')).toBeFocused();

        await page.keyboard.press(key);
        await expect(page.locator('#fourth')).toBeFocused();
      });
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
