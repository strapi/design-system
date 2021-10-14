const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Radio', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-radio--base&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });

  ['ArrowDown', 'ArrowRight'].forEach((key) => {
    test(`moves to the next element when pressing ${key}`, async ({ page }) => {
      await page.focus('[value="pizza"]');
      await page.keyboard.press(key);

      await expect(page.locator('[value="bagel"]')).toBeChecked();
    });
  });

  ['ArrowUp', 'ArrowLeft'].forEach((key) => {
    test(`moves to the previous element when pressing ${key}`, async ({ page }) => {
      await page.focus('[value="bagel"]');
      await page.keyboard.press(key);

      await expect(page.locator('[value="pizza"]')).toBeChecked();
    });
  });
});
