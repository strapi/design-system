import { injectAxe, checkA11y } from 'axe-playwright';

describe('ProgressBar', () => {
  describe('size M', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-progressbar--m&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('size S', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-progressbar--s&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
