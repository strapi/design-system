import { injectAxe, checkA11y } from 'axe-playwright';
import { test, expect } from '@playwright/test';

test.describe.parallel('Accordion Keyboard Navigable', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-accordion--keyboard-navigable&viewMode=story');
    await injectAxe(page);
  });

  test('triggers axe on the document', async ({ page }) => {
    await checkA11y(page);
  });

  test('triggers axe on the document when the accordion is expanded', async ({ page }) => {
    await page.click('[aria-labelledby="accordion-label-acc-1"]');

    await checkA11y(page);
  });

  test.describe('Keyboard interactions', () => {
    test('focuses the next node when pressing arrow down until reaching the end of the group where it focuses the first accordion', async ({
      page,
    }) => {
      await page.focus('[aria-labelledby="accordion-label-acc-1"]');

      await page.keyboard.press('ArrowDown');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-2"]')).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-3"]')).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-4"]')).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-1"]')).toBeFocused();
    });

    test('focuses the previous node when pressing arrow up and reaches the latest accordion when being on the first one', async ({
      page,
    }) => {
      await page.focus('[aria-labelledby="accordion-label-acc-1"]');

      await page.keyboard.press('ArrowUp');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-4"]')).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-3"]')).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-2"]')).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-1"]')).toBeFocused();
    });

    test('focuses the last element when pressing end', async ({ page }) => {
      await page.focus('[aria-labelledby="accordion-label-acc-1"]');

      await page.keyboard.press('End');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-4"]')).toBeFocused();
    });

    test('focuses the first element when pressing home', async ({ page }) => {
      await page.focus('[aria-labelledby="accordion-label-acc-1"]');

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Home');
      await expect(page.locator('[aria-labelledby="accordion-label-acc-1"]')).toBeFocused();
    });
  });
});
