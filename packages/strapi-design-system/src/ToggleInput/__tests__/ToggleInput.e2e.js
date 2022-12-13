import { injectAxe, checkA11y } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('ToggleInput', () => {
  test.describe('light mode', () => {
    test.describe('base A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--base&args=&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('error A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--error&args=&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('required A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--required&args=&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('null value A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--null-value&args=&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });

  test.describe('dark mode', () => {
    test.describe('base A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--base&args=&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('error A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--error&args=&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('required A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-toggleinput--required&args=&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('null value A11y', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-toggleinput--null-value&args=&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('toggle behavior', () => {
      test('toggle value', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-toggleinput--base&args=&viewMode=story&theme=dark');
        await injectAxe(page);
        await checkA11y(page);

        expect(await page.isChecked('#toggleinput-1')).toBeTruthy();
        await page.click('label');
        expect(await page.isChecked('#toggleinput-1')).toBeFalsy();
        await page.click('label');
        expect(await page.isChecked('#toggleinput-1')).toBeTruthy();
      });

      test('change value from null', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-toggleinput--null-value&args=&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);

        expect(await page.isChecked('#toggleinput-1')).toBeFalsy();
        await page.click('label');
        expect(await page.isChecked('#toggleinput-1')).toBeTruthy();
      });

      test('change value to true after clearing truthy value', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-toggleinput--clear-value&args=&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);

        expect(await page.isChecked('#toggleinput-1')).toBeTruthy();
        await page.click('button >> text=clear');
        expect(await page.isChecked('#toggleinput-1')).toBeFalsy();
        await page.click('label');
        expect(await page.isChecked('#toggleinput-1')).toBeTruthy();
      });

      test('clear value is not present, if the field is disabled', async ({ page }) => {
        await page.goto(
          '/iframe.html?id=design-system-components-toggleinput--disabled&args=&viewMode=story&theme=dark',
        );
        await injectAxe(page);
        await checkA11y(page);

        expect(await page.$$('text=clear')).toHaveLength(0);
      });
    });
  });
});
