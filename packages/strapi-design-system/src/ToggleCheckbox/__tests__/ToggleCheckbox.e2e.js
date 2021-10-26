import { injectAxe, checkA11y } from 'axe-playwright';

describe('ToggleCheckbox', () => {
  describe('activated', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-togglecheckbox--activated&viewMode=storyy',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('not activated', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-togglecheckbox--not-activated&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
