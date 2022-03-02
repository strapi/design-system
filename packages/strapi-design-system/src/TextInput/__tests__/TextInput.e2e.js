const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('TextInput', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-textinput--base&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('password', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-textinput--password&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-textinput--disabled&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('with error', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-textinput--with-error&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-textinput--base&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('password', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-textinput--password&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-textinput--disabled&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('with error', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-textinput--with-error&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });
});
