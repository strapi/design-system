const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('IconButton', () => {
  test.describe('light mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-technical-components-icon&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-technical-components-icon&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
