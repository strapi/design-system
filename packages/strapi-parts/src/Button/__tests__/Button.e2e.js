import { injectAxe, checkA11y } from 'axe-playwright';

describe('Button', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-button--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('sizes', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-button--sizes&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('variants', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-button--variants&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('icons', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-button--icons&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('disabled', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-button--disabled&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
