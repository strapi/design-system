const { injectAxe } = require('axe-playwright');

const { test, expect } = require('@playwright/test');

test.describe.parallel('DateTimePicker', () => {
  test.describe('without initial data', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datetimepicker--base&viewMode=story');
      await injectAxe(page);
    });
    test('change the date and see if also the time will be changed when both are empty', async ({
      page,
      browserName,
    }) => {
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
    test('change the time and see if also the date will be changed when both are empty', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      await page.focus('[aria-labelledby="datetime-label"] > div > div:nth-child(2) > div');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter'); // to select the time
      // check if the date is selected with the current date
      const today = new Date().toLocaleDateString('en-US');
      const timePickerValue = page.locator('[name="datetimepicker"]');
      expect(await timePickerValue.inputValue()).toBe(today);
    });
  });
  test.describe('with initial data', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datetimepicker--initial-data&viewMode=story');
      await injectAxe(page);
    });
    test('change the date and see if also the time will be changed when are both already initialized', async ({
      page,
      browserName,
    }) => {
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
      // check if the time is selected with 12:00
      const timePickerValue = page.locator('span:has-text("12:00")');
      expect(await timePickerValue.innerText()).toBe('12:00');
    });
    test('change the time and see if also the date will be changed when are both already initialized', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      await page.focus('[aria-labelledby="datetime-label"] > div > div:nth-child(2) > div');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter'); // to select the time
      const timePickerValue = page.locator('[name="datetimepicker"]');
      expect(await timePickerValue.inputValue()).toBe('10/13/2021');
    });
  });
});