import { test, expect } from '@playwright/test';

test.describe.parallel('DateTimePicker', () => {
  test.describe('without initial data', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datetimepicker--base&viewMode=story');
    });
    test('change the date and see if also the time will be changed when both are empty', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      await page.click('[aria-labelledby^="datetime-label"] > div > div:nth-child(2) > div > div');
      await page.click('tr[aria-rowindex="4"] td[aria-colindex="4"]');
      // check if the time is selected with 00:00
      const timePickerValue = page.locator('button[data-testid="datetimepicker-time"] + div span');
      expect(await timePickerValue.innerText()).toBe('00:00');
    });
    test('change the time and see if also the date will be changed when both are empty', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      await page.click('button[data-testid="datetimepicker-time"]');
      await page.click('div[data-react-portal="true"] li[data-strapi-value="00:03"]');
      // check if the date is selected with the current date
      const today = new Date().toLocaleDateString('en-US');
      const datePickerValue = page.locator('[name="datetimepicker"]');
      expect(await datePickerValue.inputValue()).toBe(today);
    });
  });
  test.describe('with initial data', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datetimepicker--initial-data&viewMode=story');
    });
    test('change the date and see if also the time will be changed when are both already initialized', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      const timePickerInitialValue = await page
        .locator('button[data-testid="datetimepicker-time"] + div span')
        .innerText();
      await page.click('[aria-labelledby^="datetime-label"] > div > div:nth-child(2) > div > div');
      await page.click('tr[aria-rowindex="4"] td[aria-colindex="4"]');
      // check if the time is selected with 12:00
      const timePickerValue = page.locator('button[data-testid="datetimepicker-time"] + div span');
      expect(await timePickerValue.innerText()).toBe(timePickerInitialValue);
    });

    test('change the time and see if also the date will be changed when are both already initialized', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      await page.click('button[data-testid="datetimepicker-time"]');
      await page.click('div[data-react-portal="true"] li[data-strapi-value="08:03"]');
      const datePickerValue = page.locator('[name="datetimepicker"]');
      expect(await datePickerValue.inputValue()).toBe('10/13/2021');
    });

    test('clear the date and see if also the time will be cleared when are both already initialized', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      await page.focus('[aria-labelledby^="datetime-label"] > div > div:nth-child(2) > div');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const datePickerValue = page.locator('[name="datetimepicker"]');
      expect(await datePickerValue.inputValue()).toBe('');
      const timePickerValue = page.locator(
        '[aria-labelledby^="datetime-label"] > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) span',
      );
      expect(await timePickerValue.innerText()).toBe('--:--');
    });
    test('clear the time and see if the date remains the same when are both already initialized', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      await page.focus('[aria-labelledby^="datetime-label"] > div > div:nth-child(2) > div');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const datePickerValue = page.locator('[name="datetimepicker"]');
      expect(await datePickerValue.inputValue()).toBe('10/13/2021');
      const timePickerValue = page.locator(
        '[aria-labelledby^="datetime-label"] > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) span',
      );
      expect(await timePickerValue.innerText()).toBe('00:00');
    });
  });
});
