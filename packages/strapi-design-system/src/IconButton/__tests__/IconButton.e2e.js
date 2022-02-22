const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe('IconButton', () => {
  test.describe('base', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-iconbutton--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('disabled', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-iconbutton--disabled&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('group', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-iconbutton--group&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
