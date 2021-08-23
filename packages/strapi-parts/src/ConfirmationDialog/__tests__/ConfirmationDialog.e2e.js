import { injectAxe, checkA11y } from 'axe-playwright';

describe('ConfirmationDialog', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=confirmationdialog--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });
});
