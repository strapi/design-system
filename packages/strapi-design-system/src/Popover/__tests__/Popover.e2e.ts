import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Popover', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test.beforeEach(async ({ page }) => {
        await navigateToStory(page, 'design-system-components-popover--centered');
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });
    });

    test.describe('onReachEnd', () => {
      test.beforeEach(async ({ page }) => {
        await navigateToStory(page, 'design-system-components-popover--on-reach-end');
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

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-popover--centered', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
