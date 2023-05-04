import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('TextInput', () => {
  test.describe('light mode', () => {
    test.describe('base A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--base');
        await checkA11y(page);
      });
    });

    test.describe('password A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--password');
        await checkA11y(page);
      });
    });

    test.describe('disabled A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--disabled');
        await checkA11y(page);
      });
    });

    test.describe('error A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--with-error');
        await checkA11y(page);
      });
    });

    test.describe('required A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--required');
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--base', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('password A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--password', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('disabled A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--disabled', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('error A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--with-error', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('required A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-textinput--required', { isDarkMode: true });
        await checkA11y(page);
      });
    });
  });
});
