import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe.parallel('Select', () => {
  test.describe('light mode', () => {
    test.describe('simple', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-select--base&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('triggers axe on the document when the popover is opened', async ({ page }) => {
        await page.click('text="Choose your meal"');
        await checkA11y(page);
      });

      test('triggers axe on the document when the button is disabled', async ({ page }) => {
        await page.click('text=Show the disabled state');
        await checkA11y(page);
      });
    });

    test.describe('multi', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-select--multi&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('triggers axe on the document when the popover is opened', async ({ page }) => {
        await page.click('text="Choose your meal"');
        await checkA11y(page);
      });

      test('selects one value after the other when using the mouse and clears the selected values', async ({
        page,
      }) => {
        await page.click('#select1');

        // FIXME: The timeout is quite buggy.
        //     await expect(page.locator('[role="listbox"]')).toBeVisible({ timeout: 1000 });

        await page.click('text="Hamburger"');
        await page.click('text="Pizza"');

        await expect(page.locator('#select1-content')).toHaveText('2 currently selectedhamburger, pizza');
        await expect(page.locator('h2')).toHaveText('Current value is hamburger, pizza');

        await page.click('[aria-label="Clear the meal"]');
        await expect(page.locator('#select1-content')).toHaveText('0 currently selected');
      });
    });
  });

  test.describe('dark mode', () => {
    test('base A11y', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-select--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
