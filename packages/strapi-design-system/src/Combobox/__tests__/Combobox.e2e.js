import { injectAxe, checkA11y } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('Combobox', () => {
  test.describe('light mode', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--base&globals=&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('Focus and select a value then close the combobox', async ({ page }) => {
      await page.click('input');
      await expect(page.locator('[role="listbox"]')).toBeVisible({ timeout: 300 });

      await page.click('text="Tartuffo"');

      const selectedValue = await page.textContent('#combobox-1-selected-value');
      await expect(selectedValue).toBe('Tartuffo');
      await expect(page.locator('[role="listbox"]')).not.toBeVisible({ timeout: 300 });
    });

    test('Select a value', async ({ page }) => {
      await page.click('input');
      await expect(page.locator('[role="listbox"]')).toBeVisible({ timeout: 300 });

      await page.click('text="Tartuffo"');

      const selectedValue = await page.textContent('#combobox-1-selected-value');
      await expect(selectedValue).toBe('Tartuffo');
      await expect(page.locator('[role="listbox"]')).not.toBeVisible({ timeout: 300 });
    });

    test('Displays no results', async ({ page }) => {
      await page.fill('input', 'Apple Pie');
      const content = await page.textContent('text="No results found"');
      await expect(content).toBe('No results found');
    });

    test('Type a value', async ({ page }) => {
      await page.fill('input', 'Hamburger');
      let options = await page.$$('[role="option"]');
      expect(options.length).toEqual(1);

      await page.fill('input', '');
      options = await page.$$('[role="option"]');
      expect(options.length).toEqual(4);
    });

    test('Select with keyboard', async ({ page }) => {
      await page.focus('input');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      const ariaDescendantValue = await page.getAttribute('input', 'aria-activedescendant');
      expect(ariaDescendantValue).toBe('combobox-1-2');

      await page.keyboard.press('Enter');

      const selectedValue = await page.textContent('#combobox-1-selected-value');
      await expect(selectedValue).toBe('Tartuffo');
    });
  });

  test.describe.parallel('Combobox - initial data', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--initial-data&args=&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('initialize the value', async ({ page }) => {
      const selectedValue = await page.textContent('#combobox-1-selected-value');
      await expect(selectedValue).toBe('Tartuffo');
    });
  });

  test.describe.parallel('Combobox - creatable', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--creatable&globals=&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('Create a new item', async ({ page }) => {
      await page.fill('input', 'Apple Pie');
      const content = await page.textContent('[role="option"]');
      await expect(content).toBe('Create "Apple Pie"');

      await page.click('[role="option"]');

      const selectedValue = await page.textContent('#combobox-1-selected-value');
      await expect(selectedValue).toBe('Apple Pie');
    });

    test('disabled A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--disabled&globals=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('error A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--error&globals=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--required&globals=&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--base&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('disabled A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--disabled&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('error A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--error&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });

    test('required A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-combobox--required&globals=&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
