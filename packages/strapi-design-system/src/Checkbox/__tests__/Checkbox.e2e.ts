import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Checkbox', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('verifies A11y on base story', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-checkbox--base');
        await checkA11y(page);
      });
    });

    test.describe('intermediate', () => {
      test.beforeEach(async ({ page }) => {
        await navigateToStory(page, 'design-system-components-checkbox--indeterminate');
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

    test.describe('hint', () => {
      test('verifies A11y errors on the hint page', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-checkbox--hint');
        await checkA11y(page);
      });
    });

    test.describe('error', () => {
      test('verifies A11y errors on the error page', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-checkbox--error');
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-checkbox--base', { isDarkMode: true });
      await checkA11y(page);
    });

    test('intermediate A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-checkbox--indeterminate', { isDarkMode: true });
      await checkA11y(page);
    });

    test('hint A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-checkbox--hint', { isDarkMode: true });
      await checkA11y(page);
    });

    test('error A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-checkbox--error', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
