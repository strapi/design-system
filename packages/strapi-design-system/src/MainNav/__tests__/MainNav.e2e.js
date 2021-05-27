import { injectAxe, checkA11y } from 'axe-playwright';

describe('MainNav', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('localhost:6006/iframe.html?id=mainnav--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });
});
