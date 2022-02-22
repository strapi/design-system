const { injectAxe, checkA11y } = require('axe-playwright');

const { test, expect } = require('@playwright/test');

test.describe.parallel('Popover', () => {
  test.describe('base', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-popover--base&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });
  });

  test.describe('onReachEnd', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-popover--on-reach-end&viewMode=story');
    });

    test('adds item when reaching the end', async ({ page }) => {
      await page.focus('#popover1');
      await page.keyboard.press('Enter');
      const lis = await page.$$('#on-reach-end li');
      expect(lis.length).toBe(10);

      await page.focus('#list');
      await page.keyboard.press('PageDown', { delay: 1000 });

      const lis2 = await page.$$('#on-reach-end li');
      expect(lis2.length).toBe(15);
    });
  });
});
