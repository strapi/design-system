import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Combobox', () => {
  test.describe.parallel('light mode', () => {
    test('triggers axe on the basic document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-combobox--basic');
      await checkA11y(page);
    });
    test('triggers axe on the loading document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-combobox--loading');
      await checkA11y(page);
    });
    test('triggers axe on the creatable document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-combobox--creatable');
      await checkA11y(page);
    });
  });

  test.describe.parallel('dark mode', () => {
    test('base A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-combobox--basic', { isDarkMode: true });
      await checkA11y(page);
    });
    test('triggers axe on the loading document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-combobox--loading', { isDarkMode: true });
      await checkA11y(page);
    });
    test('triggers axe on the creatable document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-combobox--creatable', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
