import { injectAxe, checkA11y } from 'axe-playwright';

describe('ToggleInput', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-molecules-toggleinput--base&args=&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('input error', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-molecules-toggleinput--error&args=&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
