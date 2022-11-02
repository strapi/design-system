import { injectAxe, checkA11y } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('RawTable', () => {
  test.describe('light mode', () => {
    test.describe('Default story', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-technical-components-rawtable--base&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test.describe('Keyboard interactions', () => {
        test.beforeEach(async ({ page }) => {
          await page.keyboard.press('Tab');
          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('focus the next element in the row when pressing ArrowDown', async ({ page }) => {
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowDown');

          await expect(page.locator('[aria-rowindex="4"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('focus the previous element in the row when pressing ArrowUp', async ({ page }) => {
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowUp');
          await page.keyboard.press('ArrowUp');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('focus the next element in the col when pressing ArrowRight', async ({ page }) => {
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="4"]')).toBeFocused();
        });

        test('focus the previous element in the col when pressing ArrowLeft', async ({ page }) => {
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowLeft');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="2"]')).toBeFocused();
        });

        test('focus the last element on the row when pressing End', async ({ page }) => {
          await page.keyboard.press('End');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="5"]')).toBeFocused();
        });

        test('focus the last element on the last row when pressing End AND ctrl', async ({ page }) => {
          await page.keyboard.press('Control+End');

          await expect(page.locator('[aria-rowindex="30"] > [aria-colindex="5"]')).toBeFocused();
        });

        test('focus the first element on the row when pressing Home', async ({ page }) => {
          await page.keyboard.press('End');
          await page.keyboard.press('Home');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('focus the first element on the first row when pressing Home AND ctrl', async ({ page }) => {
          await page.keyboard.press('Control+End');
          await page.keyboard.press('Control+Home');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('focus the first element on the first row when pressing Page', async ({ page }) => {
          await page.keyboard.press('End');
          await page.keyboard.press('Home');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('keeps focusing the most left positioned cell when pressing ArrowLeft on it', async ({ page }) => {
          await page.keyboard.press('ArrowLeft');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('keeps focusing the most top positioned cell when pressing ArrowTop on it', async ({ page }) => {
          await page.keyboard.press('ArrowUp');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('keeps focusing the most right positioned cell when pressing ArrowRight on it', async ({ page }) => {
          await page.keyboard.press('End');
          await page.keyboard.press('ArrowRight');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="5"]')).toBeFocused();
        });

        test('keeps focusing the most bottom positioned cell when pressing ArrowDown on it', async ({ page }) => {
          await page.keyboard.press('Control+End');
          await page.keyboard.press('ArrowDown');

          await expect(page.locator('[aria-rowindex="30"] > [aria-colindex="5"]')).toBeFocused();
        });

        test('focus the cell 3 rows below when pressing PageDown', async ({ page }) => {
          await page.keyboard.press('PageDown');

          await expect(page.locator('[aria-rowindex="4"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('focus the cell 2 rows below when pressing PageDown and that there s only space for jumping 2 rows', async ({
          page,
        }) => {
          await page.keyboard.press('Control+End');
          await page.keyboard.press('ArrowUp');
          await page.keyboard.press('PageDown');

          await expect(page.locator('[aria-rowindex="30"] > [aria-colindex="5"]')).toBeFocused();
        });

        test('focus the cell 3 rows above when pressing PageUp', async ({ page }) => {
          await page.keyboard.press('Control+End');
          await page.keyboard.press('PageUp');

          await expect(page.locator('[aria-rowindex="27"] > [aria-colindex="5"]')).toBeFocused();
        });

        test('focus the cell 2 rows above when pressing PageUp and that there s only space for jumping 2 rows', async ({
          page,
        }) => {
          await page.keyboard.press('ArrowUp');
          await page.keyboard.press('ArrowUp');
          await page.keyboard.press('PageUp');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();
        });
      });
    });

    test.describe('Simple story', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-technical-components-rawtable--simple&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test.describe('Keyboard interactions', () => {
        test.beforeEach(async ({ page }) => {
          await page.keyboard.press('Tab');
          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();
        });

        test('focus the next element in the row when pressing ArrowDown', async ({ page }) => {
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowRight');

          const tabIndexTd = await page.$eval('[aria-rowindex="3"] > [aria-colindex="2"]', (node) =>
            node.getAttribute('tabindex'),
          );

          expect(tabIndexTd).toBe(null);

          const tabIndexA = await page.$eval('[aria-rowindex="3"] > [aria-colindex="2"] > a', (node) =>
            node.getAttribute('tabindex'),
          );

          expect(tabIndexA).toBe('0');

          await expect(page.locator('[aria-rowindex="3"] > [aria-colindex="2"]')).not.toBeFocused();
          await expect(page.locator('[aria-rowindex="3"] > [aria-colindex="2"] > a')).toBeFocused();
        });
      });
    });

    test.describe('Aria story', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-technical-components-rawtable--aria&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test.describe('Keyboard Interaction with inputs in tables', () => {
        test(`should focus the cell when there's an input within & skip over input when pressing an ArrowKey`, async ({
          page,
        }) => {
          /**
           * Navigate to Column 4 row 1
           */
          await page.keyboard.press('Tab');
          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="4"]')).toBeFocused();

          await page.keyboard.press('ArrowRight');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="5"] button').nth(0)).toBeFocused();
        });

        test('should ignore the inputs inside the table when tabbing through the page', async ({ page }) => {
          await page.keyboard.press('Tab');
          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();

          await page.keyboard.press('Tab');
          /**
           * This is the first input element in the table
           */
          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="4"] input')).not.toBeFocused();
        });

        test('should access the cells input with Enter, allow arrow keys to be used and allow esaping the cell with Escape', async ({
          page,
        }) => {
          /**
           * Navigate to Column 4 row 1
           */
          await page.keyboard.press('Tab');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="4"]')).toBeFocused();

          await page.keyboard.press('Enter');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="4"] input')).toBeFocused();

          await page.keyboard.insertText('Hello');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="4"] input')).toHaveValue('Hello');

          await page.keyboard.press('ArrowLeft');
          await page.keyboard.press('ArrowLeft');
          await page.keyboard.press('Backspace');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="4"] input')).toHaveValue('Helo');

          await page.keyboard.press('Escape');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="4"]')).toBeFocused();
        });

        test('clicking on an input and then pressing Escape should focus the cell containing the input and then allow navigation from that cell', async ({
          page,
        }) => {
          await page.locator('[aria-rowindex="2"] > [aria-colindex="4"] input').click();

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="4"] input')).toBeFocused();

          await page.keyboard.press('Escape');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="4"]')).toBeFocused();

          await page.keyboard.press('ArrowLeft');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="3"]')).toBeFocused();
        });

        test('trying to access a cell with no focussable children should do nothing', async ({ page }) => {
          await page.keyboard.press('Tab');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();

          await page.keyboard.press('Enter');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();

          await page.keyboard.press('ArrowRight');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="2"]')).toBeFocused();
        });

        test('mutliple buttons should not require their cell to be activated', async ({ page }) => {
          await page.keyboard.press('Tab');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="1"]')).toBeFocused();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="5"] button').nth(0)).toBeFocused();

          await page.keyboard.press('ArrowRight');

          await expect(page.locator('[aria-rowindex="2"] > [aria-colindex="5"] button').nth(1)).toBeFocused();

          await page.keyboard.press('ArrowDown');

          await expect(page.locator('[aria-rowindex="3"] > [aria-colindex="5"] button').nth(0)).toBeFocused();

          await page.keyboard.press('ArrowLeft');

          await expect(page.locator('[aria-rowindex="3"] > [aria-colindex="4"]')).toBeFocused();

          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowUp');
          await page.keyboard.press('ArrowUp');

          await expect(page.locator('[aria-rowindex="1"] > [aria-colindex="5"]')).toBeFocused();
        });
      });
    });
  });

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-rawtable--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
