import { test, expect } from '@playwright/test';

test.describe.parallel('DateTimePicker', () => {
  test.describe('without initial data', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datetimepicker--base&viewMode=story');
    });

    test('when a date is entered the time picker is automatically filled in with 00:00 assuming it is empty', async ({
      page,
    }) => {
      await page.getByLabel('Date time picker').click();
      await page.getByRole('button', { name: '1/18/2023' }).click();

      // check if the time is selected with 00:00
      const timePickerValue = await page.getByRole('combobox').allTextContents();

      expect(timePickerValue).toContain('00:00');
    });

    test('when a time is entered the date picker is automatically filled in with todays date assuming it is empty', async ({
      page,
    }) => {
      await page.getByRole('combobox').click();
      await page.getByRole('option', { name: '00:03' }).click();
      // check if the date is selected with the current date
      const today = new Date().toLocaleDateString('en-US');

      const datePickerValue = await page.getByLabel('Date time picker').inputValue();

      expect(datePickerValue).toBe(today);
    });
  });

  test.describe('with initial data', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-datetimepicker--initial-data&viewMode=story');
    });

    test('when the date is changed the time picker does not change assuming it has a value', async ({ page }) => {
      const [originalTimePickerValue] = await page.getByRole('combobox').allTextContents();

      await page.getByLabel('Date time picker').click();
      await page.getByRole('button', { name: '10/31/2021' }).click();

      const [newTimePickerValue] = await page.getByRole('combobox').allTextContents();
      expect(originalTimePickerValue).toBe(newTimePickerValue);
    });

    test('when the time is changed the data picker does not change assuming it has a value', async ({ page }) => {
      const originalDatePickerValue = await page.getByLabel('Date time picker').inputValue();

      await page.getByRole('combobox').click();
      await page.getByRole('option', { name: '00:03' }).click();

      const newDatePickerValue = await page.getByLabel('Date time picker').inputValue();

      expect(originalDatePickerValue).toBe(newDatePickerValue);
    });

    test('when the date is cleared, the time picker should also be cleared', async ({ page }) => {
      await page.getByRole('button', { name: 'Clear' }).first().click();

      const datePickerValue = await page.getByLabel('Date time picker').inputValue();

      expect(datePickerValue).toBe('');

      const [timePickerValue] = await page.getByRole('combobox').allTextContents();

      expect(timePickerValue).toBe('--:--');
    });

    test('clear the time and see if the date remains the same when are both already initialized', async ({ page }) => {
      const originalDatePickerValue = await page.getByLabel('Date time picker').inputValue();

      await page.getByRole('button', { name: 'Clear' }).nth(1).click();

      const newDatePickerValue = await page.getByLabel('Date time picker').inputValue();

      expect(originalDatePickerValue).toBe(newDatePickerValue);

      const [timePickerValue] = await page.getByRole('combobox').allTextContents();

      expect(timePickerValue).toBe('00:00');
    });
  });
});
