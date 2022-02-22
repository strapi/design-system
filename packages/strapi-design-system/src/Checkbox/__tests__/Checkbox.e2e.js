const { injectAxe, checkA11y } = require('axe-playwright');

const { test, expect } = require('@playwright/test');

test.describe.parallel('Checkbox', () => {
  test.describe('hint', () => {
    test('verifies A11y on base story', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-checkbox--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('intermediate', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-checkbox--indeterminate&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('moves to the next element when pressing tab and select when pressing the spacebar', async ({
      page,
      browserName,
    }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      await page.focus('text="Child 1"');
      await page.keyboard.press('Tab');
      await page.keyboard.press(' ');

      const secondBox = await page.$('#child2');
      if (secondBox) {
        expect(await secondBox.isChecked()).toBe(true);
      }
    });

    test('select the parent element when all child are selected', async ({ page, browserName }) => {
      test.skip(browserName === 'webkit', 'Still working on it');
      await page.focus('text="Child 1"');
      await page.keyboard.press('Tab');
      await page.keyboard.press(' ');

      const secondBox = await page.$('#parent');
      if (secondBox) {
        expect(await secondBox.isChecked()).toBe(true);
      }
    });
  });

  test.describe('hint', () => {
    test('verifies A11y errors on the hint page', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-checkbox--hint&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('error', () => {
    test('verifies A11y errors on the error page', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-checkbox--error&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
