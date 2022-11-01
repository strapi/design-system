import { injectAxe, checkA11y } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('CarouselInput', () => {
  test.describe('light mode', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-carouselinput--base&viewMode=story');
      await injectAxe(page);
    });

    test('triggers axe on the document', async ({ page }) => {
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

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-carouselinput--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
