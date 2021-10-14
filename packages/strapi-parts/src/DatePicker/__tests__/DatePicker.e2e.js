const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('DatePicker', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-datepicker--base&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });

  test('triggers axe on the document with the dropdown open', async ({ page }) => {
    await page.click('input');
    await injectAxe(page);
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
