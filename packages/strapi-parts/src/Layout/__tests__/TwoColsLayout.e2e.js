const { test } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('TwoColsLayout', () => {
  test('triggers axe on the document', async ({ page }) => {
    await page.goto('/iframe.html?id=design-system-components-twocolslayout--base&viewMode=story');

    await injectAxe(page);
    await checkA11y(page);
  });
});
