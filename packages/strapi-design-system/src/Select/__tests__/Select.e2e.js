import { injectAxe, checkA11y } from 'axe-playwright';

import { test, expect } from '@playwright/test';

// FIXME
// const getListDescendant = async () =>
//   page.$eval('[role="listbox"]', (node) => node.getAttribute('aria-activedescendant'));

test.describe.parallel('Select', () => {
  test.describe('light mode', () => {
    test.describe('simple', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-select--base&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('triggers axe on the document when the popover is opened', async ({ page }) => {
        await page.click('text="Choose your meal"');
        await checkA11y(page);
      });

      test('triggers axe on the document when the button is disabled', async ({ page }) => {
        await page.click('text=Show the disabled state');
        await checkA11y(page);
      });

      test('clears the value when pressing the clear button', async ({ page }) => {
        await page.getByRole('combobox').click();
        await page.click('text="Hamburger"');

        await page.click('[aria-label="Clear the meal"]');

        await expect(page.getByRole('combobox')).toHaveText('Your example');
      });
    });

    test.describe('multi', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-select--multi&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('triggers axe on the document when the popover is opened', async ({ page }) => {
        await page.click('text="Choose your meal"');
        await checkA11y(page);
      });

      test('selects one value after the other when using the mouse and clears the selected values', async ({
        page,
      }) => {
        await page.click('#select1');

        // FIXME: The timeout is quite buggy.
        //     await expect(page.locator('[role="listbox"]')).toBeVisible({ timeout: 1000 });

        await page.click('text="Hamburger"');
        await page.click('text="Pizza"');

        await expect(page.locator('#select1-content')).toHaveText('2 currently selectedhamburger, pizza');
        await expect(page.locator('h2')).toHaveText('Current value is hamburger, pizza');

        await page.click('[aria-label="Clear the meal"]');
        await expect(page.locator('#select1-content')).toHaveText('0 currently selected');
      });

      // FIXME
      // describe('keyboard interactions', () => {
      //   it('selects multiple values', async () => {
      //     await page.focus('#select1');
      //     await page.keyboard.press('ArrowDown');
      //     await page.keyboard.press('Enter');
      //     await page.keyboard.press('ArrowDown');
      //     await page.keyboard.press('Enter');

      //     await expect(page.locator('h2')).toHaveText('Current value is pizza, hamburger');
      //     await expect(page.locator('#select1-content')).toHaveText('2 currently selected');
      //   });

      //   it('focuses the previously (first) selected item when one is selected and the user reopens the popover', async () => {
      //     await page.focus('#select1');
      //     await page.keyboard.press('ArrowDown');
      //     await page.keyboard.press('ArrowDown');
      //     await page.keyboard.press('Enter');
      //     await page.keyboard.press('ArrowDown');
      //     await page.keyboard.press('Enter');

      //     await page.keyboard.press('Escape');
      //     await page.keyboard.press('Enter');

      //     // FIXME: The timeout is quite buggy.
      //     await expect(page.locator('[role="listbox"]')).toBeVisible({ timeout: 1000 });

      //     const ariaDescendant = await getListDescendant();
      //     await expect(ariaDescendant).toBe('select1-option-hamburger');
      //   });
      // });
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-select--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
