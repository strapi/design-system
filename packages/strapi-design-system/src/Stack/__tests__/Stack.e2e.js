const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('Stack', () => {
  test.describe('vertical', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-technical-components-stack--base&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('horizontal', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-technical-components-stack--horizontal&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
