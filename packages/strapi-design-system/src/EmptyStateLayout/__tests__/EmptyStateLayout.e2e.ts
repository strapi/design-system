import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('EmptyStateLayout', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-emptystatelayout--base');
        await checkA11y(page);
      });
    });

    test.describe('without action', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-emptystatelayout--without-action');
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-emptystatelayout--base', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
