import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('CarouselInput', () => {
  test.describe('light mode', () => {
    test.beforeEach(async ({ page }) => {
      await navigateToStory(page, 'design-system-components-carouselinput--base');
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
      await navigateToStory(page, 'design-system-components-carouselinput--base', { isDarkMode: true });

      await checkA11y(page);
    });
  });
});
