import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Button', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--base');
        await checkA11y(page);
      });
    });

    test.describe('sizes', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--sizes');

        await checkA11y(page);
      });
    });

    test.describe('variants', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--variants');

        await checkA11y(page);
      });
    });

    test.describe('icons', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--icons');

        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--disabled');
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--base', { isDarkMode: true });

        await checkA11y(page);
      });
    });

    test.describe('sizes', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--sizes', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('variants', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--variants', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('icons', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--icons', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-button--disabled', { isDarkMode: true });
        await checkA11y(page);
      });
    });
  });
});
