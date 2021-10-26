import { injectAxe, checkA11y } from 'axe-playwright';

describe('TwoColsLayout', () => {
  it('triggers axe on the document', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=design-system-components-twocolslayout--base&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);
  });
});
