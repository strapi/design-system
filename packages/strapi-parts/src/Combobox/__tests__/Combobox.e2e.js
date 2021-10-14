const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Combobox', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-combobox--base&globals=&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });

  test('selects a value', async ({ page }) => {
    await page.click('input');
    await expect(page.locator('[role="listbox"]')).not.toHaveCount(0);

    await page.click('text="Tartuffo"');
    await expect(page.locator('input')).toHaveValue('Tartuffo');
    await expect(page.locator('[role="listbox"]')).toHaveCount(0);
  });

  test('displays no results', async ({ page }) => {
    await page.fill('input', 'Apple Pie');
    await expect(page.locator('text="No results found"')).not.toHaveCount(0);
  });

  test('updates according to the input value', async ({ page }) => {
    await page.fill('input', 'Hamburger');
    await expect(page.locator('[role="option"]')).toHaveCount(1);

    await page.fill('input', '');
    await expect(page.locator('[role="option"]')).toHaveCount(4);
  });

  test('selects with keyboard', async ({ page }) => {
    await page.focus('input');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    const ariaDescendantValue = await page.getAttribute('input', 'aria-activedescendant');
    expect(ariaDescendantValue).toBe('combobox-1-2');

    await page.keyboard.press('Enter');
    await expect(page.locator('input')).toHaveValue('Tartuffo');
  });
});

test.describe('Combobox - initial data', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto(
      'http://localhost:6006/iframe.html?id=design-system-components-combobox--initial-data&args=&viewMode=story',
    );
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });

  test('initialize the value and clear it', async ({ page }) => {
    const inputValue = await page.getAttribute('input', 'value');
    expect(inputValue).toBe('Tartuffo');
    await page.click('#combobox-1-clear');
    const newValue = await page.getAttribute('input', 'value');
    expect(newValue).toBe('');
  });
});

// describe('Combobox - creatable', () => {
//   beforeEach(async () => {
//     // This is the URL of the Storybook Iframe
//     await page.goto(
//       'http://localhost:6006/iframe.html?id=design-system-components-combobox--creatable&globals=&viewMode=story',
//     );
//     await injectAxe(page);
//   });

//   it('triggers axe on the document', async () => {
//     await checkA11y(page);
//   });

//   it('Create a new item', async () => {
//     await page.fill('input', 'Apple Pie');
//     const content = await page.textContent('[role="option"]');
//     await expect(content).toBe('Create "Apple Pie"');

//     await page.click('[role="option"]');

//     const inputValue = await page.getAttribute('input', 'value');
//     await expect(inputValue).toBe('Apple Pie');
//   });
// });
