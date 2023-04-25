import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe.parallel('Combobox', () => {
  test.describe.parallel('light mode', () => {
    test('triggers axe on the basic document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-combobox--basic&globals=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
    test('triggers axe on the loading document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-combobox--loading&globals=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
    test('triggers axe on the creatable document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-combobox--creatable&globals=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe.parallel('dark mode', () => {
    test('base A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--basic&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
    test('triggers axe on the loading document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-combobox--loading&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
    test('triggers axe on the creatable document', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=design-system-components-combobox--creatable&globals=&viewMode=story&theme=dark',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
