const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe('Breadcrumbs', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-breadcrumbs--base&viewMode=story');
    await injectAxe(page);
  });

  test('triggers axe on the document', async ({ page }) => {
    await checkA11y(page);
  });
});
