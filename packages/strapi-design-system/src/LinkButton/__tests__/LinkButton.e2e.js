const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('LinkButton', () => {
  test.describe('base', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-linkbutton--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('sizes', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-linkbutton--sizes&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('variants', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-linkbutton--variants&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('icons', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-linkbutton--icons&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('disabled', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-linkbutton--disabled&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
