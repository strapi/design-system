import { injectAxe, checkA11y } from 'axe-playwright';

import { test } from '@playwright/test';

test.describe.parallel('Table', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-table--base&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('with actions', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-table--with-th-actions&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-table--base&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('with actions', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-table--with-th-actions&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });
});
