import { injectAxe, checkA11y } from 'axe-playwright';

import { test } from '@playwright/test';

test.describe.parallel('Accordion', () => {
  test.describe('light theme', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-accordion--base&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('triggers axe on the document when the accordion is expanded', async ({ page }) => {
      await page.click('[aria-labelledby="accordion-label-acc-1"]');

      await checkA11y(page);
    });
  });

  test.describe('dark theme', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-accordion--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
