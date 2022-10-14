const { injectAxe, checkA11y } = require('axe-playwright');

const { test, expect } = require('@playwright/test');

test.describe.parallel('DateTimePicker', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-datetimepicker--base&viewMode=story');
    await injectAxe(page);
  });
  test.describe('light mode', () => {
    test('base A11y', async ({ page }) => {
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      await checkA11y(page);
    });
  });

  test('change the date and see if also the time will be changed', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Still working on it');
    await page.focus('[aria-labelledby="datetime-label"] > div > div:nth-child(2) > div > div');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // move to the Su column
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown'); // move to the third Sunday of the month
    await page.keyboard.press('Enter'); // to select the date
    // check if the time is selected with 00:00
    const timePickerValue = page.locator('span:has-text("00:00")');
    expect(await timePickerValue.innerText()).toBe('00:00');
  });
});
