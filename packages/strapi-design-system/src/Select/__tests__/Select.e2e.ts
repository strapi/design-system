import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Select', () => {
  test.describe('light mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-select--basic');
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-select--basic', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
