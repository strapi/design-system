const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('NumberInput', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-numberinput--base&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });

  test('fills the input when typing valid numberic numbers', async ({ page }) => {
    await page.fill('input', '123.123');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('123.123');
  });

  test('fills the input when typing a valid numberic and a trailing comma', async ({ page }) => {
    await page.fill('input', '123456,');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('123,456');
  });

  test('erases the value in the input when pressing backspace', async ({ page }) => {
    await page.fill('input', '-1');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('');
  });

  test('puts the step value in the input when pressing ArrowUp and that the input is empty', async ({ page }) => {
    await page.focus('input');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('1');
  });

  test('puts the step value in the input when pressing ArrowDown and that the input contains only the minus sign', async ({
    page,
  }) => {
    await page.fill('input', '-');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('-1');
  });

  test('puts the step value in the input when pressing ArrowDown and that the input is empty', async ({ page }) => {
    await page.focus('input');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('-1');
  });

  test('puts the step value in the input when pressing ArrowUp and that the input contains only the minus sign', async ({
    page,
  }) => {
    await page.fill('input', '-');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('1');
  });

  test('increments the value when entering and bluring the field, and then pressing ArrowUp', async ({ page }) => {
    await page.click('input');
    await page.click('button');
    await page.focus('input');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('1');
  });
});
