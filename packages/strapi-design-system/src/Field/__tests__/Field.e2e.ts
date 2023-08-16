import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Field', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-field--base');
        await checkA11y(page);
      });
    });

    test.describe('with description', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-field--with-description');
        await checkA11y(page);
      });
    });

    test.describe('with error', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-field--with-error');
        await checkA11y(page);
      });
    });

    test.describe('adding actions', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-field--adding-actions');
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test('complex input A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-field--adding-actions', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
