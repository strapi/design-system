import { injectAxe, checkA11y } from 'axe-playwright';

import { test } from '@playwright/test';

test.describe.parallel('IconButton', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-iconbutton--base&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-iconbutton--disabled&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('group', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-iconbutton--group&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-iconbutton--base&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-iconbutton--disabled&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('group', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-iconbutton--group&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });
});
