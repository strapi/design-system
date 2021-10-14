const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Checkbox', () => {
  test.describe('base', () => {
    test('verifies A11y errors on the base page', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-checkbox--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('intermediate', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-checkbox--indeterminate&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    test('moves to the next element when pressing tab and select when pressing the spacebar', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit');

      await page.focus('text="Child 1"');
      await page.keyboard.press('Tab');
      await page.keyboard.press(' ');
      await expect(page.locator('#child2')).toBeChecked();
    });

    test('select the parent element when all child are selected', async ({ page, browserName }) => {
      test.skip(browserName === 'webkit');

      await page.focus('text="Child 1"');
      await page.keyboard.press('Tab');
      await page.keyboard.press(' ');
      await expect(page.locator('#parent')).toBeChecked();
    });
  });

  test.describe('hint', () => {
    test('verifies A11y errors on the hint page', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-checkbox--hint&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('error', () => {
    test('verifies A11y errors on the error page', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-checkbox--error&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
