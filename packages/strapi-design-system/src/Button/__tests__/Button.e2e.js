const { injectAxe, checkA11y } = require('axe-playwright');

const { test } = require('@playwright/test');

test.describe.parallel('Button', () => {
  test.describe('light mode', () => {
    test.describe('base', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-button--base&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('sizes', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-button--sizes&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('variants', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-button--variants&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('icons', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-button--icons&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });

    test.describe('disabled', () => {
      test('triggers axe on the document', async ({ page }) => {
        await page.goto('/iframe.html?id=design-system-components-button--disabled&viewMode=story');
        await injectAxe(page);
        await checkA11y(page);
      });
    });
  });

  // TO FIX DARK MODE - contrast issues for all Button stories
  // test.describe('dark mode', () => {
  //   test.describe('base', () => {
  //     test('triggers axe on the document', async ({ page }) => {
  //       await page.goto('/iframe.html?id=design-system-components-button--base&viewMode=story&theme=dark');
  //       await injectAxe(page);
  //       await checkA11y(page);
  //     });
  //   });

  //   test.describe('sizes', () => {
  //     test('triggers axe on the document', async ({ page }) => {
  //       await page.goto('/iframe.html?id=design-system-components-button--sizes&viewMode=story&theme=dark');
  //       await injectAxe(page);
  //       await checkA11y(page);
  //     });
  //   });

  //   test.describe('variants', () => {
  //     test('triggers axe on the document', async ({ page }) => {
  //       await page.goto('/iframe.html?id=design-system-components-button--variants&viewMode=story&theme=dark');
  //       await injectAxe(page);
  //       await checkA11y(page);
  //     });
  //   });

  //   test.describe('icons', () => {
  //     test('triggers axe on the document', async ({ page }) => {
  //       await page.goto('/iframe.html?id=design-system-components-button--icons&viewMode=story&theme=dark');
  //       await injectAxe(page);
  //       await checkA11y(page);
  //     });
  //   });

  //   test.describe('disabled', () => {
  //     test('triggers axe on the document', async ({ page }) => {
  //       await page.goto('/iframe.html?id=design-system-components-button--disabled&viewMode=story&theme=dark');
  //       await injectAxe(page);
  //       await checkA11y(page);
  //     });
  //   });
  // });
});
