const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('ToggleInput', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--base&args=&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('input error', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--error&args=&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('null value', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--null-value&args=&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--base&args=&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('input error', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--error&args=&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('null value', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-toggleinput--null-value&args=&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });
});
