import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('ProgressBar', () => {
  test.describe('light mode', () => {
    test.describe('size M', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-progressbar--m');
        await checkA11y(page);
      });
    });

    test.describe('size S', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-progressbar--s');
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('size M', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-progressbar--m', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('size S', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-progressbar--s', { isDarkMode: true });
        await checkA11y(page);
      });
    });
  });
});
