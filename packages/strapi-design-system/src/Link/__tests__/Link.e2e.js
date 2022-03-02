const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('Link', () => {
  test.describe('light mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-link--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-link--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
