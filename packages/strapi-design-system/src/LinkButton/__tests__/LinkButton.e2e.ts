import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('LinkButton', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--base');
        await checkA11y(page);
      });
    });

    test.describe('sizes', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--sizes');
        await checkA11y(page);
      });
    });

    test.describe('variants', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--variants');
        await checkA11y(page);
      });
    });

    test.describe('icons', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--icons');
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--disabled');
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--base', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('sizes', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--sizes', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('variants', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--variants', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('icons', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--icons', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-v2-linkbutton--disabled', { isDarkMode: true });
        await checkA11y(page);
      });
    });
  });
});
