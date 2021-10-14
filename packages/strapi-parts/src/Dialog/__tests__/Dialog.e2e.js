const { test } = require('@playwright/test');
const { injectAxe, checkA11y } = require('axe-playwright');

test.describe('Dialog', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-dialog--base&args=&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });
});
