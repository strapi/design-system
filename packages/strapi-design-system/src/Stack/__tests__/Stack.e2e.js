import { injectAxe, checkA11y } from 'axe-playwright';

describe('Stack', () => {
  describe('vertical', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-technical-components-stack--base&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('horizontal', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-technical-components-stack--horizontal&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
