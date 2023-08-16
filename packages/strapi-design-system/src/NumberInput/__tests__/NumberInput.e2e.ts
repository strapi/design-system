import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

/**
 * @note
 * There appears to be an issue with pressing `Tab` on webkit but
 * also pressing `Alt+Tab` on firefox. Basically it thinks it's
 * pressed the key, but it hasn't causing the input to not blur.
 *
 * Therefore because the "typical" behaviour would be to press
 * `Tab` we check if we're on Safari and use `Alt+Tab`.
 */

test.describe.parallel('NumberInput', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      let TAB_KEY = 'Tab';

      test.beforeEach(async ({ page, browserName }) => {
        if (browserName === 'webkit') {
          TAB_KEY = 'Alt+Tab';
        }

        await navigateToStory(page, 'design-system-components-numberinput--base');
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('fills the input when typing valid numeric numbers', async ({ page }) => {
        await page.fill('input', '123.123');
        await page.keyboard.press(TAB_KEY);

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('123.123');
      });

      test('fills the input when typing valid float numbers with more than 3 significant digits after the seperator', async ({
        page,
      }) => {
        await page.fill('input', '1.23456789');
        await page.keyboard.press(TAB_KEY);

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('1.23456789');
      });

      test('keeps a scientific number after blur / focus', async ({ page }) => {
        await page.fill('input', '0.00000001');

        await page.keyboard.press(TAB_KEY);
        await page.focus('input');

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('0.00000001');
      });

      test('fills the input when typing a valid numeric and a trailing comma', async ({ page }) => {
        await page.fill('input', '123456,');
        await page.keyboard.press(TAB_KEY);

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('123,456');
        expect(await page.$('text="The value is 123456"')).toBeTruthy();
      });

      test('erases the value in the input when pressing backspace', async ({ page }) => {
        await page.fill('input', '-1');
        await page.keyboard.press('Backspace');
        await page.keyboard.press(TAB_KEY);

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('');
        expect(await page.$('text="The value is undefined"')).toBeTruthy();
      });

      test('puts the step value in the input when pressing ArrowUp and that the input is empty', async ({ page }) => {
        await page.focus('input');
        await page.fill('input', '1,');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press(TAB_KEY);

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('2');
        expect(await page.$('text="The value is 2"')).toBeTruthy();
      });

      test('keeps zero/ a falsy value on blur/ focus', async ({ page }) => {
        await page.focus('input');
        await page.fill('input', '0,');
        await page.keyboard.press(TAB_KEY);
        await page.focus('input');

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('0');
      });

      test('puts the step value in the input when pressing ArrowDown and that the input contains only the minus sign', async ({
        page,
      }) => {
        await page.fill('input', '-');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press(TAB_KEY);

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('-1');
        expect(await page.$('text="The value is -1"')).toBeTruthy();
      });

      test('puts the step value in the input when pressing ArrowDown and that the input is empty', async ({ page }) => {
        await page.focus('input');
        await page.fill('input', '-');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press(TAB_KEY);

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('-1');
        expect(await page.$('text="The value is -1"')).toBeTruthy();
      });

      test('puts the step value in the input when pressing ArrowUp and that the input contains only the minus sign', async ({
        page,
      }) => {
        await page.fill('input', '-');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press(TAB_KEY);

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('1');
        expect(await page.$('text="The value is 1"')).toBeTruthy();
      });

      test('increments the value when clicking on ArrowUp without blur needed', async ({ page }) => {
        await page.fill('input', '0');
        await page.click('[data-testid="ArrowUp"]');

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('1');
        expect(await page.$('text="The value is 1"')).toBeTruthy();
      });

      test('decrements the value when clicking on ArrowUp without blur needed', async ({ page }) => {
        await page.fill('input', '0');
        await page.click('[data-testid="ArrowDown"]');

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('-1');
        expect(await page.$('text="The value is -1"')).toBeTruthy();
      });

      test('increments the value eventhough the field is empty', async ({ page }) => {
        await page.fill('input', '');
        await page.click('[data-testid="ArrowUp"]');

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('1');
      });

      test('decrements the value eventhough the field is empty', async ({ page }) => {
        await page.fill('input', '');
        await page.click('[data-testid="ArrowDown"]');

        const value = await page.$eval('input', (el) => el.value);
        expect(value).toBe('-1');
      });
    });

    test.describe('disabled', () => {
      test('disabled A11y', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-numberinput--disabled');
        await checkA11y(page);
      });
    });

    test('error A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-numberinput--error');
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-numberinput--required');
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-numberinput--base', { isDarkMode: true });
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-numberinput--disabled', { isDarkMode: true });
      await checkA11y(page);
    });

    test('error A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-numberinput--error', { isDarkMode: true });
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-numberinput--required', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
