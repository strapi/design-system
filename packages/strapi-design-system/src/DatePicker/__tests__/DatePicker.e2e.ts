import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('DatePicker', () => {
  test('light mode accessibility', async ({ page }) => {
    await navigateToStory(page, 'design-system-components-datepicker--base');
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
    await navigateToStory(page, 'design-system-components-datepicker--base', { isDarkMode: true });
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
