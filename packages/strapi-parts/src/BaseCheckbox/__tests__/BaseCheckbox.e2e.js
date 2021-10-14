const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('BaseCheckbox', () => {
  test.describe('base', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-basecheckbox--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('disabled', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-basecheckbox--disabled&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('intermediate', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-basecheckbox--indeterminate&viewMode=story');
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
});
