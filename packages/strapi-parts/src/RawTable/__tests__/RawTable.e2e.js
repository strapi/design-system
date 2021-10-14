const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('RawTable', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-technical-components-rawtable--base&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
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
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
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
});
