import { injectAxe, checkA11y } from 'axe-playwright';

describe('EmptyStateLayout', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-layouts-emptystatelayout--base&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('without action', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-layouts-emptystatelayout--without-action&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
