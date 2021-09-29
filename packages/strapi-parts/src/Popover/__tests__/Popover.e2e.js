import { injectAxe, checkA11y } from 'axe-playwright';

describe('Popover', () => {
  describe('base', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-popover--base&viewMode=story');
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });
  });

  describe('onReachEnd', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-popover--on-reach-end&viewMode=story',
      );
    });

    it('adds item when reaching the end', async () => {
      const lis = await page.$$('#on-reach-end li');
      expect(lis.length).toBe(10);

      await page.focus('#list');
      await page.keyboard.press('PageDown', { delay: 1000 });

      const lis2 = await page.$$('#on-reach-end li');
      expect(lis2.length).toBe(15);
    });
  });
});
