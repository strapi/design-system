const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('Switch', () => {
  test('triggers axe on the document for the activated switch', async ({ page }) => {
    await page.goto('/iframe.html?id=design-system-components-switch--activated&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('triggers axe on the document for the not-activated switch', async ({ page }) => {
    await page.goto('/iframe.html?id=design-system-components-switch--not-activated&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);
  });
});
