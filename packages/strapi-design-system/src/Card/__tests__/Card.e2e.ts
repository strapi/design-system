import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Card', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-card--base');
        await checkA11y(page);
      });
    });

    test.describe('without asset action', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-card--without-asset-action');
        await checkA11y(page);
      });
    });

    test.describe('without asset action nor timer', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-card--without-asset-action-nor-timer');
        await checkA11y(page);
      });
    });

    test.describe('without asset', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-card--without-asset');
        await checkA11y(page);
      });
    });

    test.describe('keyboard navigable', () => {
      test.beforeEach(async ({ page }) => {
        await navigateToStory(page, 'design-system-components-card--keyboard');
      });

      test('check a11y', async ({ page }) => {
        await checkA11y(page);
      });

      test('moves to the next element when pressing ArrowDown', async ({ page }) => {
        await page.focus('#first');

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#fourth')).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#first')).toBeFocused();
      });

      test('moves to the next element when pressing ArrowRight', async ({ page }) => {
        await page.focus('#first');

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#fourth')).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await expect(page.locator('#first')).toBeFocused();
      });

      test('moves to the previous element when pressing ArrowUp', async ({ page }) => {
        await page.focus('#fourth');

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('#first')).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('#fourth')).toBeFocused();
      });

      test('moves to the previous element when pressing ArrowLeft', async ({ page }) => {
        await page.focus('#fourth');

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#third')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#second')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#first')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('#fourth')).toBeFocused();
      });

      test('moves to the last element when pressing End', async ({ page }) => {
        await page.focus('#first');
        await page.keyboard.press('End');
        await expect(page.locator('#fourth')).toBeFocused();
      });

      test('moves to the first element when pressing Home', async ({ page }) => {
        await page.focus('#fourth');
        await page.keyboard.press('Home');
        await expect(page.locator('#first')).toBeFocused();
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-card--base', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('without asset action', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-card--without-asset-action', { isDarkMode: true });
        await checkA11y(page);
      });
    });

    test.describe('without asset action nor timer', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-card--without-asset-action-nor-timer', {
          isDarkMode: true,
        });
        await checkA11y(page);
      });
    });

    test.describe('without asset', () => {
      test('triggers axe on the document', async ({ page }) => {
        await navigateToStory(page, 'design-system-components-card--without-asset', { isDarkMode: true });
        await checkA11y(page);
      });
    });
  });
});
