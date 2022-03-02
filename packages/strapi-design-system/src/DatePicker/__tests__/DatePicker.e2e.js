const { injectAxe, checkA11y } = require('axe-playwright');

const { test, expect } = require('@playwright/test');

test.describe.parallel('DatePicker', () => {
  test.describe('light mode', () => {
    test.describe('disabled', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-datepicker--disabled&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      // TODO : Can't fire page.click on disabled element. To fix
      // it('does not open the dialog when clicking the input', async () => {
      //   await page.click('input');

      //   expect(await page.$('[role="dialog"]')).toBeFalsy();
      // });
    });

    test.describe.parallel('base', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-datepicker--base&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('triggers axe on the document with the dropdown open', async ({ page }) => {
        await page.click('input');
        await checkA11y(page);
      });

      test('selects a value and closes the dialog', async ({ page }) => {
        await page.click('input');
        expect(await page.$('[role="dialog"]')).toBeTruthy();

        await page.click(':nth-match(button[aria-haspopup], 1)');
        await page.click('text="January"');

        await page.click(':nth-match(button[aria-haspopup], 2)');
        await page.click('text="2021"');

        await page.click('text="14"');

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('1/14/2021');
        expect(await page.$('[role="dialog"]')).toBeFalsy();
      });

      test('clears the input and sends the focus back to the calendar button when pressing the clear button', async ({
        page,
      }) => {
        await page.click('input');
        expect(await page.$('[role="dialog"]')).toBeTruthy();

        await page.click(':nth-match(button[aria-haspopup], 1)');
        await page.click('text="January"');
        await page.click(':nth-match(button[aria-haspopup], 2)');
        await page.click('text="2021"');
        await page.click('text="14"');

        await page.click('[aria-label="Clear the datepicker"]');
        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('');
        await expect(page.locator('[aria-label="Date picker"]')).toBeFocused();
      });
    });
  });

  // TO FIX DARK MODE - contrast issues serious
  // test.describe('dark mode', () => {
  //   test('base A11y', async ({ page }) => {
  //     // This is the URL of the Storybook Iframe
  //     await page.goto('/iframe.html?id=design-system-components-datepicker--base&viewMode=story&theme=dark');
  //     await injectAxe(page);
  //     await checkA11y(page);
  //   });

  //   test('disabled A11y', async ({ page }) => {
  //     // This is the URL of the Storybook Iframe
  //     await page.goto('/iframe.html?id=design-system-components-datepicker--disabled&viewMode=story&theme=dark');
  //     await injectAxe(page);
  //     await checkA11y(page);
  //   });
  // });
});
