const { test } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('TextButton', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-textbutton--base&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });
});
