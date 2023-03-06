import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe.parallel('DatePicker', () => {
  test.describe('light mode', () => {
    test.describe('disabled', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-datepicker--disabled&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });
    });

    test.describe.parallel('base', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-datepicker--base&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('triggers axe on the document with the dropdown open', async ({ page }) => {
        await page.click('input');
        await checkA11y(page);
      });
    });

    test('error A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datepicker--error&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datepicker--required&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datepicker--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datepicker--disabled&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('error A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datepicker--error&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datepicker--required&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
