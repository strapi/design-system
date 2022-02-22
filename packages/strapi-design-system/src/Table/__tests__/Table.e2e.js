const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('Table', () => {
  test.describe('base', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-table--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('with actions', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-table--with-th-actions&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
