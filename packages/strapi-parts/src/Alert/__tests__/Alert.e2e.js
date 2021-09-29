import { injectAxe, checkA11y } from 'axe-playwright';

describe('Alert', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-alert--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('variants', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-alert--variants&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('with action', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-alert--with-action&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
