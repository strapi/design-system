import { injectAxe, checkA11y } from 'axe-playwright';

describe('TextInput', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-textinput--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('password', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-textinput--password&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('disabled', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-textinput--disabled&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('with error', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-textinput--with-error&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
