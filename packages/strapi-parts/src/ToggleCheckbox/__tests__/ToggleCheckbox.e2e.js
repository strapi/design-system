const { test } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('ToggleCheckbox', () => {
  test.describe('activated', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-togglecheckbox--activated&viewMode=storyy');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('not activated', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-togglecheckbox--not-activated&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
