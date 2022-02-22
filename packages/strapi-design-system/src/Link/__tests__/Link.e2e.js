const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('Link', () => {
  test('triggers axe on the document', async ({ page }) => {
    await page.goto('/iframe.html?id=design-system-components-link--base&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);
  });
});
