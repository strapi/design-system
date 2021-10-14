const { test } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('EmptyStateLayout', () => {
  test.describe('base', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-emptystatelayout--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('without action', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-emptystatelayout--without-action&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
