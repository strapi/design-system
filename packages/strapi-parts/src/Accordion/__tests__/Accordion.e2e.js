const { test } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Accordion', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-accordion--base&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });

  test('triggers axe on the document when the accordion is expanded', async ({ page }) => {
    await page.click('[aria-labelledby="accordion-label-acc-1"]');
    await injectAxe(page);
    await checkA11y(page);
  });
});
