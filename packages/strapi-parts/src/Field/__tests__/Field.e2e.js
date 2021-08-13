import { injectAxe, checkA11y } from 'axe-playwright';

describe('Field', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-field--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('with description', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-molecules-field--with-description&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('with error', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-field--with-error&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('disabled', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-field--disabled&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('most complex input', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-molecules-field--most-complex-input&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
