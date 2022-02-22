const { injectAxe, checkA11y } = require('axe-playwright');

const { test, expect } = require('@playwright/test');

test.describe.parallel('Tooltip', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-components-tooltip--base&viewMode=story');
    await injectAxe(page);
  });

  test('triggers axe on the document', async ({ page }) => {
    await checkA11y(page);
  });

  test('shows the tooltip when focusing the text content', async ({ page }) => {
    await page.focus('text="Show tooltip"');
    const isVisible = await page.isVisible('text="Content of the tooltip"');

    expect(isVisible).toBe(true);
  });
});
