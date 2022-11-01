import { injectAxe, checkA11y } from 'axe-playwright';

import { test } from '@playwright/test';

test.describe.parallel('TimePicker', () => {
  test.describe('light mode', () => {
    test('base A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-timepicker--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-timepicker--disabled&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-timepicker--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-timepicker--disabled&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
