import { injectAxe, checkA11y } from 'axe-playwright';

describe('Searchbar', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-searchbar--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });

    it('brings back the focus to the input when clearing it', async () => {
      await page.fill('input', 'Hello world');
      expect(await page.$eval('input', (el) => el.value)).toBe('Hello world');

      await page.click('[aria-label="Clearing the plugin search"]');
      expect(await page.$eval('input', (el) => el.value)).toBe('');
    });
  });

  describe('disabled', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-searchbar--disabled&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });
});
