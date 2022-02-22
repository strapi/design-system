const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('Alert', () => {
  test.describe('base', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-alert--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('variants', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-alert--variants&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('with action', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-alert--with-action&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
