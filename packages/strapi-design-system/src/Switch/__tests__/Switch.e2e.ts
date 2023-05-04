import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Switch', () => {
  test.describe('light mode', () => {
    test('triggers axe on the document for the activated switch', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-switch--activated');
      await checkA11y(page);
    });

    test('triggers axe on the document for the not-activated switch', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-switch--not-activated');
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('triggers axe on the document for the activated switch', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-switch--activated', { isDarkMode: true });
      await checkA11y(page);
    });

    test('triggers axe on the document for the not-activated switch', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-switch--not-activated', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
