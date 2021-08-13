import { injectAxe, checkA11y } from 'axe-playwright';

describe('Table', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-organisms-table--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('with actions', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-organisms-table--with-th-actions&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
