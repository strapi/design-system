const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('HeaderLayout', () => {
  test.describe('base', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-headerlayout--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('base without nav action', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=design-system-components-headerlayout--base-without-nav-action&args=&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('sticky', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-headerlayout--sticky&args=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('combined w/ scroll', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-headerlayout--combined-w-scroll&args=&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    test('displays the sticky header when scrolling down', async ({ page }) => {
      const headerLocator = page.locator('[data-strapi-header]');
      await expect(headerLocator).toBeVisible();

      await page.evaluate(() => window.scrollTo(0, 400));

      await expect(page.locator('[data-strapi-header-sticky]')).toBeVisible();

      await expect(headerLocator).not.toBeVisible();
    });

    test('displays the sticky header when scrolling back up', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, 400));

      const stickyHeaderLocator = page.locator('[data-strapi-header-sticky]');
      await expect(stickyHeaderLocator).toBeVisible();

      await page.evaluate(() => window.scrollTo(0, 0));

      await expect(page.locator('[data-strapi-header]')).toBeVisible();
      await expect(stickyHeaderLocator).not.toBeVisible();
    });
  });
});
