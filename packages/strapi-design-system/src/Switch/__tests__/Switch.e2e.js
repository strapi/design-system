import { injectAxe, checkA11y } from 'axe-playwright';

describe('Switch', () => {
  it('triggers axe on the document for the activated switch', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=design-system-components-switch--activated&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);
  });

  it('triggers axe on the document for the not-activated switch', async () => {
    await page.goto(
      'http://localhost:6006/iframe.html?id=design-system-components-switch--not-activated&viewMode=story',
    );
    await injectAxe(page);
    await checkA11y(page);
  });
});
