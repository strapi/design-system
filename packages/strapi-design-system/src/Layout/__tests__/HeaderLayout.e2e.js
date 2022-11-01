import { injectAxe, checkA11y } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('HeaderLayout', () => {
  test.describe('light mode', () => {
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
      test('triggers axe on the document', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-headerlayout--combined-w-scroll&args=&viewMode=story',
        );
        await injectAxe(page);
        await checkA11y(page);
      });

      test('displays the sticky header when scrolling down', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-headerlayout--combined-w-scroll&args=&viewMode=story',
        );

        await expect(page.locator('[data-strapi-header]')).toBeVisible();

        await page.evaluate(() => window.scrollTo(0, 400));

        await expect(page.locator('[data-strapi-header-sticky]')).toBeVisible();

        const headerLayout = await page.$$('[data-strapi-header]');
        expect(headerLayout.length).toBe(0);
      });

      test('displays the sticky header when scrolling back up', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-headerlayout--combined-w-scroll&args=&viewMode=story',
        );
        await page.evaluate(() => window.scrollTo(0, 400));
        await expect(page.locator('[data-strapi-header-sticky]')).toBeVisible();

        await page.evaluate(() => window.scrollTo(0, 0));

        await expect(page.locator('[data-strapi-header]')).toBeVisible();

        const headerLayout = await page.$$('[data-strapi-header-sticky]');
        expect(headerLayout.length).toBe(0);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-headerlayout--base&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });
});
