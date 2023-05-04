import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('Accordion', () => {
  test.describe('light theme', () => {
    test.beforeEach(async ({ page }) => {
      await navigateToStory(page, 'design-system-components-accordion--base');
    });

    test('triggers axe on the document', async ({ page }) => {
      await checkA11y(page);
    });

    test('triggers axe on the document when the accordion is expanded', async ({ page }) => {
      await page.click('[aria-labelledby="accordion-label-acc-1"]');

      await checkA11y(page);
    });
  });

  test.describe('dark theme', () => {
    test('triggers axe on the document', async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await navigateToStory(page, 'design-system-components-accordion--base', { isDarkMode: true });
      await checkA11y(page);
    });
  });
});
