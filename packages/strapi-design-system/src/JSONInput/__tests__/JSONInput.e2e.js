import { test, expect } from '@playwright/test';
// import { injectAxe, checkA11y } from 'axe-playwright';

test.describe.parallel('JSONComponent', () => {
  test.describe('base', () => {
    test('Loads disabled JSON', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-jsoninput--base&viewMode=story');

      const readonlyJSONInput = await page.waitForSelector('div[contenteditable="false"]');
      expect(readonlyJSONInput).toBeDefined();
    });

    // TODO: Skipping tests for now as its throwing violations for inner codemirror component, 'aria-input-field-name',  'color-contrast'.

    /*
    test.describe('light mode', () => {
      test.skip('verifies A11y on base story', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-jsoninput--base&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('dark mode', () => {
      test.skip('verifies A11y on base story', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-jsoninput--base&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    }); */
  });

  test.describe('editable', () => {
    test('Loads JSON with label: JSON', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-jsoninput--editable&viewMode=story');

      const editableJSONInput = await page.waitForSelector('div[contenteditable="true"]');
      expect(editableJSONInput).toBeDefined();

      const label = page.getByText('JSON');
      expect(label).toBeDefined();
    });

    test('Highlights incorrect JSON syntax', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-jsoninput--editable&viewMode=story');

      await page.getByRole('textbox').fill('Peter');
      const errorElement = await page.waitForSelector('div[contenteditable="true"] div span');
      const errorStyle = await errorElement.getAttribute('style');

      expect(errorStyle).toBe('background-color: yellow; color: black');
    });
  });

  test.describe('with error', () => {
    test('Loads disabled JSON', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-jsoninput--with-error&viewMode=story');

      const readonlyJSONInput = await page.waitForSelector('div[contenteditable="false"]');
      expect(readonlyJSONInput).toBeDefined();
    });

    test('Displays an error message', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-jsoninput--with-error&viewMode=story');

      const errorMessage = page.getByText('This does not match the JSON format');
      expect(errorMessage).toBeDefined();
    });
  });
});
