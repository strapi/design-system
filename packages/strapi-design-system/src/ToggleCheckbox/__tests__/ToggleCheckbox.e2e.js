const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('ToggleCheckbox', () => {
  test.describe('activated', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-togglecheckbox--activated&viewMode=storyy',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('not activated', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-togglecheckbox--not-activated&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
