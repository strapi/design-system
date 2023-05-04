import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Tag', () => {
  test.describe('light mode', () => {
    test('base A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-tag--base');
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-tag--disabled');
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-tag--base', { isDarkMode: true });
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-tag--disabled', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
