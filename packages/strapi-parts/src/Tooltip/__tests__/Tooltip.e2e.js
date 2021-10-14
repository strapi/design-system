const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Tooltip', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-tooltip--base&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });

  test('shows the tooltip when focusing the text content', async ({ page }) => {
    await page.focus('text="Show tooltip"');
    const isVisible = await page.isVisible('text="Content of the tooltip"');

    expect(isVisible).toBe(true);
  });
});
