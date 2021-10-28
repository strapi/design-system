import { injectAxe, checkA11y } from 'axe-playwright';

describe('Card', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-card--base&viewMode=story');
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('without asset action', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-card--without-asset-action&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('without asset action nor timer', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-card--without-asset-action-nor-timer&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('without asset', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-card--without-asset&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('keyboard navigable', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-card--keyboard-navigable&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });

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
