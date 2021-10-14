const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe, configureAxe } = require('axe-playwright');

test.describe('SimpleMenu', () => {
  test.describe('base', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-simplemenu--base&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    test('triggers axe on the document when the menu is opened', async ({ page }) => {
      await page.click('button');

      await expect(page.locator('[role="menu"]')).not.toHaveCount(0);

      await injectAxe(page);
      // Axe throws an error because the portal is not wrapped by a region.
      await configureAxe(page, {
        rules: [
          { id: 'region', enabled: false },
          { id: 'aria-required-parent', enabled: false },
        ],
      });
      await checkA11y(page);
    });

    ['Enter', 'Space'].forEach((key) => {
      test(`selects the second value of the menu when pressing ${key}`, async ({ page }) => {
        await page.focus('button');
        await page.keyboard.press(key);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press(key);

        await expect(page.locator('button')).toHaveText('February');
      });
    });
  });

  test.describe('with links', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-simplemenu--with-links&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    test('triggers axe on the document when the menu is opened', async ({ page }) => {
      await page.click('button');

      await expect(page.locator('[role="menu"]')).not.toHaveCount(0);

      await injectAxe(page);
      // Axe throws an error because the portal is not wrapped by a region.
      await configureAxe(page, {
        rules: [
          { id: 'region', enabled: false },
          { id: 'aria-required-parent', enabled: false },
        ],
      });
      await checkA11y(page);
    });
  });
});
