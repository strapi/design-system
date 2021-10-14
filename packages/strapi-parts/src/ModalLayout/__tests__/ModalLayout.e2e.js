const { test } = require('@playwright/test');
const { injectAxe, configureAxe, checkA11y } = require('axe-playwright');

test.describe('ModalLayout', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-modallayout--base&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    // Axe throws an error about landmark for the role dialog
    await configureAxe(page, { rules: [{ id: 'region', enabled: false }] });
    await checkA11y(page);
  });
});
