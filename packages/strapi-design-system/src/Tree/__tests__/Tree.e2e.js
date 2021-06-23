import { injectAxe, checkA11y } from 'axe-playwright';

describe('Tree', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-tree--base&viewMode=story');
    await injectAxe(page);
  });

  /**
   * Skipping because there's an error in Axe that does not understand the role group is
   * subtree: https://github.com/dequelabs/axe-core/issues/2897
   */
  it.skip('triggers axe on the document', async () => {
    await checkA11y(page);
  });
});
