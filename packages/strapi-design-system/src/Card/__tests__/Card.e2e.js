import { injectAxe, checkA11y } from 'axe-playwright';

describe('Card', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-card--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  describe('keyboard interactions', () => {
    it.each(['ArrowDown', 'ArrowRight'])('moves to the next element when pressing %s', async (keyPressed) => {
      await page.focus('#first');

      await page.keyboard.press(keyPressed);
      await expect(page).toHaveFocus('#second');

      await page.keyboard.press(keyPressed);
      await expect(page).toHaveFocus('#third');

      await page.keyboard.press(keyPressed);
      await expect(page).toHaveFocus('#fourth');

      await page.keyboard.press(keyPressed);
      await expect(page).toHaveFocus('#first');
    });

    it.each(['ArrowUp', 'ArrowLeft'])('moves to the previous element when pressing %s', async (keyPressed) => {
      await page.focus('#fourth');

      await page.keyboard.press(keyPressed);
      await expect(page).toHaveFocus('#third');

      await page.keyboard.press(keyPressed);
      await expect(page).toHaveFocus('#second');

      await page.keyboard.press(keyPressed);
      await expect(page).toHaveFocus('#first');

      await page.keyboard.press(keyPressed);
      await expect(page).toHaveFocus('#fourth');
    });

    it('moves to the last element when pressing End', async () => {
      await page.focus('#first');
      await page.keyboard.press('End');
      await expect(page).toHaveFocus('#fourth');
    });

    it('moves to the first element when pressing Home', async () => {
      await page.focus('#fourth');
      await page.keyboard.press('Home');
      await expect(page).toHaveFocus('#first');
    });
  });
});
