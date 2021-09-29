import { injectAxe, checkA11y } from 'axe-playwright';

describe('LinkButton', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-linkbutton--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('sizes', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-linkbutton--sizes&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('variants', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-linkbutton--variants&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('icons', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-linkbutton--icons&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('disabled', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-linkbutton--disabled&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
