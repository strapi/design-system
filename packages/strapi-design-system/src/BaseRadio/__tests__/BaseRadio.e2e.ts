import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('BaseRadio', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test.beforeEach(async ({ page }) => {
        await navigateToStory(page, 'design-system-technical-components-baseradio--base');
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('moves to the next element when pressing ArrowDown', async ({ page }) => {
        await page.focus('text="Pizza"');
        await page.keyboard.press('ArrowDown');

        const secondBox = await page.$('#bagel');

        if (secondBox) {
          expect(await secondBox.isChecked()).toBe(true);
        }
      });

      test('moves to the next element when pressing ArrowRight', async ({ page }) => {
        await page.focus('text="Pizza"');
        await page.keyboard.press('ArrowRight');

        const secondBox = await page.$('#bagel');

        if (secondBox) {
          expect(await secondBox.isChecked()).toBe(true);
        }
      });

      test('moves to the previous element when pressing ArrowUp', async ({ page }) => {
        await page.focus('text="Bagel"');
        await page.keyboard.press('ArrowUp');

        const pizzaRadio = await page.$('#pizza');

        if (pizzaRadio) {
          expect(await pizzaRadio.isChecked()).toBe(true);
        }
      });

      test('moves to the previous element when pressing ArrowLeft', async ({ page }) => {
        await page.focus('text="Bagel"');
        await page.keyboard.press('ArrowLeft');

        const pizzaRadio = await page.$('#pizza');

        if (pizzaRadio) {
          expect(await pizzaRadio.isChecked()).toBe(true);
        }
      });

      test.describe('disabled', () => {
        test('triggers axe on the document', async ({ page }) => {
          await navigateToStory(page, 'design-system-technical-components-baseradio--disabled');
          await checkA11y(page);
        });
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-technical-components-baseradio--base', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-technical-components-baseradio--disabled', { isDarkMode: true });
        await checkA11y(page);
      });
    });
  });
});
