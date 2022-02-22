const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('Accordion', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-components-accordion--base&viewMode=story');
    await injectAxe(page);
  });

  test('triggers axe on the document', async ({ page }) => {
    await checkA11y(page);
  });

  test('triggers axe on the document when the accordion is expanded', async ({ page }) => {
    await page.click('[aria-labelledby="accordion-label-acc-1"]');

    await checkA11y(page);
  });
});
