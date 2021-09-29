import { injectAxe, checkA11y } from 'axe-playwright';

describe('IconButton', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-iconbutton--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('disabled', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-iconbutton--disabled&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('group', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-iconbutton--group&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
