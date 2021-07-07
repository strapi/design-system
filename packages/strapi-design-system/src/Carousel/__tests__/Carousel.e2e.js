import { injectAxe, checkA11y } from 'axe-playwright';

describe('Carousel', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-carousel--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  describe('keyboard interactions', () => {
    it('focuses the next button when pressing arrow right when the focus is inside the carousel', async () => {
      await page.focus('#edit');
      await page.keyboard.press('ArrowRight');

      expect(await page.$('text="Carousel of numbers (2/3)"')).toBeTruthy();
      await expect(page).toHaveFocus('[aria-label="Next slide"]');
    });

    it('focuses the previous button when pressing arrow right when the focus is inside the carousel', async () => {
      await page.focus('#edit');
      await page.keyboard.press('ArrowLeft');

      expect(await page.$('text="Carousel of numbers (3/3)"')).toBeTruthy();
      await expect(page).toHaveFocus('[aria-label="Previous slide"]');
    });
  });
});
