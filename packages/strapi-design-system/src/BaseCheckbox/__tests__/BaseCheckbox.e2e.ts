import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('BaseCheckbox', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-technical-components-basecheckbox--base');

        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-technical-components-basecheckbox--disabled');
        await checkA11y(page);
      });
    });

    test.describe('intermediate', () => {
      test.beforeEach(async ({ page }) => {
        await navigateToStory(page, 'design-system-technical-components-basecheckbox--indeterminate');
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('moves to the next element when pressing tab and select when pressing the spacebar', async ({
        page,
        browserName,
      }) => {
        test.skip(browserName === 'webkit', 'Still working on it');
        await page.focus('text="Child 1"');
        await page.keyboard.press('Tab');
        await page.keyboard.press(' ');

        const secondBox = await page.$('#child2');

        if (secondBox) {
          expect(await secondBox.isChecked()).toBe(true);
        }
      });

      test('select the parent element when all child are selected', async ({ page, browserName }) => {
        test.skip(browserName === 'webkit', 'Still working on it');
        await page.focus('text="Child 1"');
        await page.keyboard.press('Tab');
        await page.keyboard.press(' ');

        const secondBox = await page.$('#parent');

        if (secondBox) {
          expect(await secondBox.isChecked()).toBe(true);
        }
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-technical-components-basecheckbox--base', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-technical-components-basecheckbox--disabled', { isDarkMode: true });
        await checkA11y(page);
      });
    });
  });
});
