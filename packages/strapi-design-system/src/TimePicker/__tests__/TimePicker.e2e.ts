import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe.parallel('TimePicker', () => {
  test('light mode A11y', async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-timepicker--base&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);

    await page.goto('/iframe.html?id=design-system-components-timepicker--steps&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);

    await page.goto('/iframe.html?id=design-system-components-timepicker--sizing&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('dark mode A11y', async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-timepicker--base&viewMode=story&theme=dark');
    await injectAxe(page);
    await checkA11y(page);

    await page.goto('/iframe.html?id=design-system-components-timepicker--steps&viewMode=story&theme=dark');
    await injectAxe(page);
    await checkA11y(page);

    await page.goto('/iframe.html?id=design-system-components-timepicker--sizing&viewMode=story&theme=dark');
    await injectAxe(page);
    await checkA11y(page);
  });
});
