const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('ProgressBar', () => {
  test.describe('size M', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-progressbar--m&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('size S', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-progressbar--s&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
