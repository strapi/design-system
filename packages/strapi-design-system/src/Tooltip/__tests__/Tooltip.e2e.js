import { injectAxe, checkA11y } from 'axe-playwright';

describe('Tooltip', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=tooltip--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('shows the tooltip when focusing the text content', async () => {
    await page.focus('text="Show tooltip"');
    const isVisible = await page.isVisible('text="Content of the tooltip fefe"');

    expect(isVisible).toBe(true);
  });
});
