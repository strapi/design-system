const { test } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Row', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-technical-components-row--base&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });
});
