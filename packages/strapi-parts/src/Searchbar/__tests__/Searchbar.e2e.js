const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Searchbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=design-system-components-searchbar--base&viewMode=story');
  });

  test.describe('base', () => {
    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    test('brings back the focus to the input when clearing it', async ({ page }) => {
      await page.fill('input', 'Hello world');
      expect(await page.$eval('input', (el) => el.value)).toBe('Hello world');

      await page.click('[aria-label="Clearing the plugin search"]');
      expect(await page.$eval('input', (el) => el.value)).toBe('');
    });
  });

  test.describe('disabled', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-searchbar--disabled&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
