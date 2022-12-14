import { injectAxe, checkA11y } from 'axe-playwright';
import { test } from '@playwright/test';

test.describe.parallel('JsonComponent', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test.skip('verifies A11y on base story', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-jsoninput--base&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test('verifies A11y on base story', async ({ page }) => {
      await page.goto('/iframe.html?id=design-system-components-jsoninput--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
