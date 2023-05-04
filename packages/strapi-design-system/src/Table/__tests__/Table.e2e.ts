import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Table', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-table--base');
        await checkA11y(page);
      });
    });

    test.describe('with actions', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-table--with-th-actions');
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-table--base', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('with actions', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-table--with-th-actions', { isDarkMode: true });
        await checkA11y(page);
      });
    });
  });
});
