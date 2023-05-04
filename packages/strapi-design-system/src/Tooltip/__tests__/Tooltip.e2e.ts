import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Tooltip', () => {
  test.describe('light mode', () => {
    test.beforeEach(async ({ page }) => {
      await navigateToStory(page, 'design-system-components-tooltip--base');
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('shows the tooltip when focusing the text content', async ({ page }) => {
      await page.focus('text="Show tooltip"');
      const isVisible = await page.isVisible('text="Content of the tooltip"');

      expect(isVisible).toBe(true);
    });
  });

  test.describe('dark mode', () => {
    test('triggers axe on the document', async ({ page }) => {
      await navigateToStory(page, 'design-system-components-tooltip--base', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
