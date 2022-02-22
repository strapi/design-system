const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('GridLayout', () => {
  test('triggers axe on the document', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=design-system-components-gridlayout--base&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);
  });
});
