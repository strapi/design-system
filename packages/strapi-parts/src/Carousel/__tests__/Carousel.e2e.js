const { test, expect } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('Carousel', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-carousel--base&viewMode=story');
  });

  test('triggers axe on the document', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });

  test.describe('keyboard interactions', () => {
    test('focuses the next button when pressing arrow right when the focus is inside the carousel', async ({
      page,
    }) => {
      await page.focus('#edit');
      await page.keyboard.press('ArrowRight');

      expect(await page.$('text="Carousel of numbers (2/3)"')).toBeTruthy();
      await expect(page.locator('[aria-label="Next slide"]')).toBeFocused();
    });

    test('focuses the previous button when pressing arrow right when the focus is inside the carousel', async ({
      page,
    }) => {
      await page.focus('#edit');
      await page.keyboard.press('ArrowLeft');

      expect(await page.$('text="Carousel of numbers (3/3)"')).toBeTruthy();
      await expect(page.locator('[aria-label="Previous slide"]')).toBeFocused();
    });
  });
});
