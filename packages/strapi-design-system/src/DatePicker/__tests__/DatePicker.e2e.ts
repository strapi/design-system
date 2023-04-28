import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe.parallel('DatePicker', () => {
  test('light mode accessibility', async ({ page }) => {
    await page.goto('/iframe.html?id=design-system-components-datepicker--base&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);

    await page.click('input');
    await checkA11y(page);

    await page.keyboard.press('Escape');

    await page.getByRole('button', { name: /error state/ }).click();
    await checkA11y(page);

    await page.getByRole('button', { name: /disabled state/ }).click();
    await checkA11y(page);

    await page.getByRole('button', { name: /error state/ }).click();
    await checkA11y(page);
  });

  test('dark mode accessibility', async ({ page }) => {
    await page.goto('/iframe.html?id=design-system-components-datepicker--base&viewMode=story&theme=dark');
    await injectAxe(page);
    await checkA11y(page);

    await page.click('input');
    await checkA11y(page);

    await page.keyboard.press('Escape');

    await page.getByRole('button', { name: /error state/ }).click();
    await checkA11y(page);

    await page.getByRole('button', { name: /disabled state/ }).click();
    await checkA11y(page);

    await page.getByRole('button', { name: /error state/ }).click();
    await checkA11y(page);
  });
});
