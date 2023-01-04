import { test, expect } from '@playwright/test';
// import { injectAxe, checkA11y } from 'axe-playwright';

test.describe.parallel('JsonComponent', () => {
  test.describe('base', () => {
    test('verifies if disabled json loaded', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-inputjson--base&viewMode=story');

      const readonlyJsonInput = await page.waitForSelector('div[contenteditable="false"]');
      expect(readonlyJsonInput).toBeDefined();
    });

    // TODO: Skipping tests for now as its throwing violations for inner codemirror component, 'aria-input-field-name',  'color-contrast'.

    /*
    test.describe('light mode', () => {
      test.skip('verifies A11y on base story', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-inputjson--base&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('dark mode', () => {
      test.skip('verifies A11y on base story', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-inputjson--base&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    }); */
  });

  test.describe('editor', () => {
    test('verifies if editable json loaded with label', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-inputjson--editable&viewMode=story');

      const editableJsonInput = await page.waitForSelector('div[contenteditable="true"]');
      expect(editableJsonInput).toBeDefined();

      const label = page.getByText('json');
      expect(label).toBeDefined();
    });

    test('On wrong input json highlight the wrong json schema', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-inputjson--editable&viewMode=story');

      await page.getByRole('textbox').fill('Peter');
      const errorElement = await page.waitForSelector('div[contenteditable="true"] div span');
      const errorStyle = await errorElement.getAttribute('style');

      expect(errorStyle).toBe('background-color: yellow; color: black');
    });
  });

  test.describe('with error', () => {
    test('verifies if error is displayed', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-inputjson--with-error&viewMode=story');

      const errorMessage = page.getByText('This does not match the JSON format');
      expect(errorMessage).toBeDefined();
    });
  });
});
