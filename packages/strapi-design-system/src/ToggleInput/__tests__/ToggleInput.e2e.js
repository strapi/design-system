const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('ToggleInput', () => {
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
