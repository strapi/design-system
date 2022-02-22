const { injectAxe, checkA11y } = require('axe-playwright');

const { test, expect } = require('@playwright/test');

test.describe.parallel('NumberInput', () => {
  test.describe('base', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-numberinput--base&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('fills the input when typing valid numeric numbers', async ({ page }) => {
      await page.fill('input', '123.123');
      await page.keyboard.press('Tab');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('123.123');
      //TODO
      // expect(await page.$('text="The value is 123123"')).toBeTruthy();
    });

    test('fills the input when typing a valid numeric and a trailing comma', async ({ page }) => {
      await page.fill('input', '123456,');
      await page.keyboard.press('Tab');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('123,456');
      expect(await page.$('text="The value is 123456"')).toBeTruthy();
    });

    test('erases the value in the input when pressing backspace', async ({ page }) => {
      await page.fill('input', '-1');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Tab');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('');
      expect(await page.$('text="The value is undefined"')).toBeTruthy();
    });

    test('puts the step value in the input when pressing ArrowUp and that the input is empty', async ({ page }) => {
      await page.focus('input');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Tab');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('1');
      expect(await page.$('text="The value is 1"')).toBeTruthy();
    });

    test('puts the step value in the input when pressing ArrowDown and that the input contains only the minus sign', async ({
      page,
    }) => {
      await page.fill('input', '-');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Tab');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('-1');
      expect(await page.$('text="The value is -1"')).toBeTruthy();
    });

    test('puts the step value in the input when pressing ArrowDown and that the input is empty', async ({ page }) => {
      await page.focus('input');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Tab');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('-1');
      expect(await page.$('text="The value is -1"')).toBeTruthy();
    });

    test('puts the step value in the input when pressing ArrowUp and that the input contains only the minus sign', async ({
      page,
    }) => {
      await page.fill('input', '-');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Tab');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('1');
      expect(await page.$('text="The value is 1"')).toBeTruthy();
    });

    test('increments the value when clicking on ArrowUp without blur needed', async ({ page }) => {
      await page.click('[data-testid="ArrowUp"]');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('1');
      expect(await page.$('text="The value is 1"')).toBeTruthy();
    });

    test('decrements the value when clicking on ArrowUp without blur needed', async ({ page }) => {
      await page.click('[data-testid="ArrowDown"]');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('-1');
      expect(await page.$('text="The value is -1"')).toBeTruthy();
    });
  });

  test.describe('with initial value', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-numberinput--with-initial-0&viewMode=story',
      );
      await injectAxe(page);
    });

    test('shows an initial value of 0', async ({ page }) => {
      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('0');
    });
  });
});
