import { injectAxe, checkA11y } from 'axe-playwright';

describe('HeaderLayout', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
  });

  it('triggers axe on the not sticky header component', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=design-system-layouts-headerlayouts--base&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);
  });

  it('triggers axe on the sticky header component', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=design-system-layouts-headerlayouts--sticky&viewMode=story');
    await injectAxe(page);
    await checkA11y(page);
  });
});
