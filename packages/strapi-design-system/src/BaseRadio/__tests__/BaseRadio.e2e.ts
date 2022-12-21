import { injectAxe, checkA11y } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('BaseRadio', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-technical-components-baseradio--base&viewMode=story');
        await injectAxe(page);
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
          // This is the URL of the Storybook Iframe
          await page.goto('/iframe.html?id=design-system-technical-components-baseradio--disabled&viewMode=story');
          await injectAxe(page);
          await checkA11y(page);
        });
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-technical-components-baseradio--base&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto(
          '/iframe.html?id=design-system-technical-components-baseradio--disabled&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });
});
