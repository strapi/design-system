import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Radio', () => {
  test.describe('light mode', () => {
    test.beforeEach(async ({ page }) => {
      await navigateToStory(page, 'design-system-components-radio--base');
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('moves to the next element when pressing ArrowDown', async ({ page }) => {
      await page.focus('[value="pizza"]');
      await page.keyboard.press('ArrowDown');

      const secondBox = await page.$('[value="bagel"]');

      if (secondBox) {
        expect(await secondBox.isChecked()).toBe(true);
      }
    });

    test('moves to the next element when pressing ArrowRight', async ({ page }) => {
      await page.focus('[value="pizza"]');
      await page.keyboard.press('ArrowRight');

      const secondBox = await page.$('[value="bagel"]');

      if (secondBox) {
        expect(await secondBox.isChecked()).toBe(true);
      }
    });

    test('moves to the previous element when pressing ArrowUp', async ({ page }) => {
      await page.focus('[value="bagel"]');
      await page.keyboard.press('ArrowUp');

      const pizzaRadio = await page.$('[value="pizza"]');

      if (pizzaRadio) {
        expect(await pizzaRadio.isChecked()).toBe(true);
      }
    });

    test('moves to the previous element when pressing ArrowLeft', async ({ page }) => {
      await page.focus('[value="bagel"]');
      await page.keyboard.press('ArrowLeft');

      const pizzaRadio = await page.$('[value="pizza"]');

      if (pizzaRadio) {
        expect(await pizzaRadio.isChecked()).toBe(true);
      }
    });
  });

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-radio--base', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
