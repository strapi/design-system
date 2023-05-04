import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Textarea', () => {
  test.describe('light mode', () => {
    test('base A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-textarea--base');
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-textarea--disabled');
      await checkA11y(page);
    });

    test('error A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-textarea--error');
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-textarea--required');
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-textarea--base', { isDarkMode: true });
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-textarea--disabled', { isDarkMode: true });
      await checkA11y(page);
    });

    test('error A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-textarea--error', { isDarkMode: true });
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-textarea--required', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
