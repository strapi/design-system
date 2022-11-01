import { injectAxe, checkA11y } from 'axe-playwright';

import { test } from '@playwright/test';

test.describe.parallel('ProgressBar', () => {
  test.describe('light mode', () => {
    test.describe('size M', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-progressbar--m&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('size S', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-progressbar--s&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('size M', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-progressbar--m&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('size S', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-progressbar--s&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });
});
