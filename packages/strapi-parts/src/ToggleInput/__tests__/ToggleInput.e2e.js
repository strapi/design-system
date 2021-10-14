const { test } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('ToggleInput', () => {
  test.describe('base', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-toggleinput--base&args=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('input error', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-toggleinput--error&args=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
