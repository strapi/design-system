import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('SimpleMenu', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-simplemenu--base&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('triggers axe on the document when the menu is opened', async ({ page }) => {
        await page.click('#root button');

        await expect(page.locator('[role="menu"]')).toBeVisible();

        const violations = await getViolations(page);

        // Axe throws an error because the portal is not wrapped by a region.
        const realViolations = violations
          .filter((violation) => violation.id !== 'region')
          .filter((violation) => violation.id !== 'aria-required-parent');

        expect(realViolations.length).toBe(0);
      });

      test('select the second value of the menu key=Enter', async ({ page }) => {
        await page.focus('#root button');
        await page.keyboard.press('Enter');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        const label = await page.textContent('#root button');
        expect(label).toBe('February');
      });

      test('select the second value of the menu key=Space', async ({ page }) => {
        await page.focus('#root button');
        await page.keyboard.press('Space');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Space');

        const label = await page.textContent('#root button');
        expect(label).toBe('February');
      });
    });

    test.describe('with links', () => {
      test.beforeEach(async ({ page }) => {
        // This is the URL of the Storybook Iframe
        await page.goto('/iframe.html?id=design-system-components-simplemenu--with-links&viewMode=story');
        await injectAxe(page);
      });

      test('triggers axe on the document', async ({ page }) => {
        await checkA11y(page);
      });

      test('triggers axe on the document when the menu is opened', async ({ page }) => {
        await page.click('#root button');

        await expect(page.locator('[role="menu"]')).toBeVisible();

        const violations = await getViolations(page);

        // Axe throws an error because the portal is not wrapped by a region.
        const realViolations = violations
          .filter((violation) => violation.id !== 'region')
          .filter((violation) => violation.id !== 'aria-required-parent');

        expect(realViolations.length).toBe(0);
      });
    });
  });

  test.describe('sizes', () => {
    test('triggers axe on the document', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-simplemenu--sizes&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  test.describe('with links', () => {
    test.beforeEach(async ({ page }) => {
      // This is the URL of the Storybook Iframe
      await page.goto('/iframe.html?id=design-system-components-simplemenu--base&viewMode=story&theme=dark');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
