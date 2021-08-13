import { injectAxe, checkA11y } from 'axe-playwright';

describe('HeaderLayout', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-layouts-gridlayout--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('base without nav action', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-layouts-headerlayouts--base-without-nav-action&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('sticky', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-layouts-headerlayouts--sticky&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
