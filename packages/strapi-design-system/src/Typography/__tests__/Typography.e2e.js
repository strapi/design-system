const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('Typography', () => {
  test.describe('light mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-typography--variants&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto(
        '/iframe.html?id=design-system-technical-components-typography--variants&viewMode=story&theme=dark',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
