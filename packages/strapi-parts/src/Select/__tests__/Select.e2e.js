const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

const getListDescendant = async (page) =>
  page.$eval('[role="listbox"]', (node) => node.getAttribute('aria-activedescendant'));

test.describe('Select', () => {
  test.describe('simple', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-select--base&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    test('triggers axe on the document when the popover is opened', async ({ page }) => {
      await page.click('text="Choose your meal"');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('triggers axe on the document when the button is disabled', async ({ page }) => {
      await page.click('text=Show the disabled state');
      await injectAxe(page);
      await checkA11y(page);
    });

    test.describe('Keyboard interactions', () => {
      ['Enter', 'ArrowDown', 'Space'].forEach((key) => {
        test(`opens the listbox and highlights the first item when pressing ${key}`, async ({ page }) => {
          await page.focus('#select1');
          await page.keyboard.press(key);

          const ariaDescendant = await getListDescendant(page);
          await expect(ariaDescendant).toBe('select1-option-pizza');
        });
      });

      test('opens the listbox and highlights the last item when pressing ArrowUp', async ({ page }) => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');

        const ariaDescendant = await getListDescendant(page);
        await expect(ariaDescendant).toBe('select1-option-bagel');
      });

      test('opens the listbox and highlights the different items when pressing ArrowDown', async ({ page }) => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowDown');

        const ariaDescendant1 = await getListDescendant(page);
        await expect(ariaDescendant1).toBe('select1-option-pizza');

        await page.keyboard.press('ArrowDown');
        const ariaDescendant2 = await getListDescendant(page);
        await expect(ariaDescendant2).toBe('select1-option-hamburger');

        await page.keyboard.press('ArrowDown');
        const ariaDescendant3 = await getListDescendant(page);
        await expect(ariaDescendant3).toBe('select1-option-bagel');

        await page.keyboard.press('ArrowDown');
        const ariaDescendant4 = await getListDescendant(page);
        await expect(ariaDescendant4).toBe('select1-option-pizza');
      });

      test('opens the listbox and highlights the different items when pressing ArrowUp', async ({ page }) => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');

        const ariaDescendant1 = await getListDescendant(page);
        await expect(ariaDescendant1).toBe('select1-option-bagel');

        await page.keyboard.press('ArrowUp');
        const ariaDescendant2 = await getListDescendant(page);
        await expect(ariaDescendant2).toBe('select1-option-hamburger');

        await page.keyboard.press('ArrowUp');
        const ariaDescendant3 = await getListDescendant(page);
        await expect(ariaDescendant3).toBe('select1-option-pizza');

        await page.keyboard.press('ArrowUp');
        const ariaDescendant4 = await getListDescendant(page);
        await expect(ariaDescendant4).toBe('select1-option-bagel');
      });

      test('sends back the focus to the select button when pressing escape when the popover is visible', async ({
        page,
      }) => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Escape');

        await expect(page.locator('[role="listbox"]')).toHaveCount(0);
        await expect(page.locator('#select1')).toBeFocused();
      });

      test('does NOT send back the focus to the select button when closing the select with a mouse', async ({
        page,
      }) => {
        await page.click('#select1');
        await expect(page.locator('[role="listbox"]')).not.toHaveCount(0);

        await page.click('body');
        await expect(page.locator('[role="listbox"]')).toHaveCount(0);
        await expect(page.locator('#select1')).not.toBeFocused();
      });

      test('changes the button content and the select value when pressing Enter on an item', async ({ page }) => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');

        await page.keyboard.press('Enter');

        await expect(await page.$('text=Current value is bagel')).toBeTruthy();
        await expect(page.locator('#select1-content')).toHaveText('Bagel');
      });

      test('focuses the previously selected item when one is selected and the user reopens the popover', async ({
        page,
      }) => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');

        await page.keyboard.press('Enter');
        await expect(page.locator('[role="listbox"]')).toHaveCount(0);

        await page.keyboard.press('Enter');
        const ariaDescendant = await getListDescendant(page);
        await expect(ariaDescendant).toBe('select1-option-bagel');
      });

      for (const key of ['Enter', 'Space']) {
        test(`should not do anything when pressing ${key} when the element is disabled`, async ({ page }) => {
          await page.click('text=Show the disabled state');
          await page.focus('#select1');
          await page.keyboard.press(key);

          await expect(page.locator('[role="listbox"]')).toHaveCount(0);
        });
      }
    });

    test('clears the value when pressing the clear button', async ({ page }) => {
      await page.click('#select1');
      await page.click('text="Hamburger"');

      await page.click('[aria-label="Clear the meal"]');
      await expect(page.locator('#select1-content')).toHaveText('Your example');
    });
  });

  test.describe('multi', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-select--multi&viewMode=story');
    });

    test('triggers axe on the document', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page);
    });

    test('triggers axe on the document when the popover is opened', async ({ page }) => {
      await page.click('text="Choose your meal"');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('selects one value after the other when using the mouse and clears the selected values', async ({ page }) => {
      await page.click('#select1');

      await expect(page.locator('[role="listbox"]')).not.toHaveCount(0);

      await page.click('text="Hamburger"');
      await page.click('text="Pizza"');

      await expect(page.locator('#select1-content')).toContainText('2 currently selected');
      await expect(page.locator('h2')).toHaveText('Current value is hamburger, pizza');

      await page.click('[aria-label="Clear the meal"]');
      await expect(page.locator('#select1-content')).toHaveText('0 currently selected');
    });

    test.describe('keyboard interactions', () => {
      test('selects multiple values', async ({ page }) => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        await expect(page.locator('h2')).toHaveText('Current value is pizza, hamburger');
        await expect(page.locator('#select1-content')).toContainText('2 currently selected');
      });

      test('focuses the previously (first) selected item when one is selected and the user reopens the popover', async ({
        page,
      }) => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        await page.keyboard.press('Escape');
        await page.keyboard.press('Enter');

        await expect(page.locator('[role="listbox"]')).not.toHaveCount(0);

        const ariaDescendant = await getListDescendant(page);
        await expect(ariaDescendant).toBe('select1-option-hamburger');
      });
    });
  });
});
