const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('BaseRadio', () => {
  test.describe('base', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-baseradio--base&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    ['ArrowDown', 'ArrowRight'].forEach((key) => {
      test(`moves to the next element when pressing ${key}`, async ({ page }) => {
        await page.focus('text="Pizza"');
        await page.keyboard.press(key);

        await expect(page.locator('#bagel')).toBeChecked();
      });
    });

    ['ArrowUp', 'ArrowLeft'].forEach((key) => {
      test(`moves to the previous element when pressing ${key}`, async ({ page }) => {
        await page.focus('text="Bagel"');
        await page.keyboard.press(key);

        await expect(page.locator('#pizza')).toBeChecked();
      });
    });
  });

  test.describe('disabled', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-baseradio--disabled&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
