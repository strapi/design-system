import { injectAxe, checkA11y } from 'axe-playwright';

describe('Searchbar', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-searchbar--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('brings back the focus to the input when clearing it', async () => {
    await page.fill('input', 'Hello world');
    expect(await page.$eval('input', (el) => el.value)).toBe('Hello world');

    await page.click('[aria-label="Clearing the plugin search"]');
    expect(await page.$eval('input', (el) => el.value)).toBe('');
  });
});
