import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Searchbar', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test.beforeEach(async ({ page }) => {
        await navigateToStory(page, 'design-system-components-searchbar--base');
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('brings back the focus to the input when clearing it', async ({ page }) => {
        await page.fill('input', 'Hello world');
        expect(await page.locator('input').evaluate<string, HTMLInputElement>((el) => el.value)).toBe('Hello world');

        await page.getByRole('button', { name: 'Clearing the plugin search' }).click();

        expect(await page.locator('input').evaluate<string, HTMLInputElement>((el) => el.value)).toBe('');
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-searchbar--disabled');
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-searchbar--base', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-searchbar--disabled', { isDarkMode: true });
        await checkA11y(page);
      });
    });
  });
});
