import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe.parallel('Combobox', () => {
  test.describe('light mode', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--base&globals=&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });
  });

  test.describe.parallel('Combobox - creatable', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--creatable&globals=&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--disabled&globals=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('error A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--error&globals=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--required&globals=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--base&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--disabled&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('error A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--error&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--required&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
