import { injectAxe, checkA11y } from 'axe-playwright';

import { test } from '@playwright/test';

test.describe.parallel('Breadcrumbs', () => {
  test.describe('with CrumbLink', () => {
    test.describe('light mode', () => {
      test('triggers axe on the document', async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-v2-breadcrumbs--base&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('dark mode', () => {
      test('triggers axe on the document', async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-v2-breadcrumbs--base&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });

  test.describe('with Crumb', () => {
    test.describe('light mode', () => {
      test('triggers axe on the document', async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-v2-breadcrumbs--without-nagivation&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('dark mode', () => {
      test('triggers axe on the document', async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto(
          '/iframe.html?id=design-system-components-v2-breadcrumbs--without-nagivation&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });
});
