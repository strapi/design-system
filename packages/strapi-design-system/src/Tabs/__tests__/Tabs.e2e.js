import { injectAxe, checkA11y } from 'axe-playwright';

describe('Tabs', () => {
  describe('default variant', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-tabs--base&viewMode=story');
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });

    it('verifies that only the first panel is visible at the beginning', async () => {
      const isFirstPanelVisible = await page.isVisible('text="First panel"');
      expect(isFirstPanelVisible).toBeTruthy();

      const isSecondPanelVisible = await page.isVisible('text="Second panel"');
      expect(isSecondPanelVisible).toBeFalsy();

      const isThirdPanelVisible = await page.isVisible('text="Third panel"');
      expect(isThirdPanelVisible).toBeFalsy();
    });

    describe('Click interactions', () => {
      it('shows only the first panel when clicking on it', async () => {
        await page.click('text="Second"');
        await page.click('text="First"');

        const isFirstPanelVisible = await page.isVisible('text="First panel"');
        expect(isFirstPanelVisible).toBeTruthy();

        const isSecondPanelVisible = await page.isVisible('text="Second panel"');
        expect(isSecondPanelVisible).toBeFalsy();

        const isThirdPanelVisible = await page.isVisible('text="Third panel"');
        expect(isThirdPanelVisible).toBeFalsy();
      });

      it('shows only the second panel when clicking on it', async () => {
        await page.click('text="Second"');

        const isFirstPanelVisible = await page.isVisible('text="First panel"');
        expect(isFirstPanelVisible).toBeFalsy();

        const isSecondPanelVisible = await page.isVisible('text="Second panel"');
        expect(isSecondPanelVisible).toBeTruthy();

        const isThirdPanelVisible = await page.isVisible('text="Third panel"');
        expect(isThirdPanelVisible).toBeFalsy();
      });

      it('shows only the third panel when clicking on it', async () => {
        await page.click('text="Third"');

        const isFirstPanelVisible = await page.isVisible('text="First panel"');
        expect(isFirstPanelVisible).toBeFalsy();

        const isSecondPanelVisible = await page.isVisible('text="Second panel"');
        expect(isSecondPanelVisible).toBeFalsy();

        const isThirdPanelVisible = await page.isVisible('text="Third panel"');
        expect(isThirdPanelVisible).toBeTruthy();
      });
    });

    describe('Keyboard interactions', () => {
      it('moves to the next tab when pressing ArrowRight', async () => {
        await page.waitForSelector('#tabs-0-tab');

        await page.focus('#tabs-0-tab');
        await page.keyboard.press('ArrowRight');
        await expect(page).toHaveFocus('#tabs-1-tab');

        await page.keyboard.press('ArrowRight');
        await expect(page).toHaveFocus('#tabs-2-tab');

        await page.keyboard.press('ArrowRight');
        await expect(page).toHaveFocus('#tabs-0-tab');
      });

      it('moves to the previous tab when pressing ArrowLeft', async () => {
        await page.waitForSelector('#tabs-0-tab');

        await page.focus('#tabs-0-tab');
        await page.keyboard.press('ArrowLeft');
        await expect(page).toHaveFocus('#tabs-2-tab');

        await page.keyboard.press('ArrowLeft');
        await expect(page).toHaveFocus('#tabs-1-tab');

        await page.keyboard.press('ArrowLeft');
        await expect(page).toHaveFocus('#tabs-0-tab');
      });

      it('moves to the first tab when pressing Home', async () => {
        await page.waitForSelector('#tabs-0-tab');

        await page.focus('#tabs-0-tab');
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Home');

        await expect(page).toHaveFocus('#tabs-0-tab');
      });

      it('moves to the last tab when pressing End', async () => {
        await page.waitForSelector('#tabs-0-tab');

        await page.focus('#tabs-0-tab');
        await page.keyboard.press('End');

        await expect(page).toHaveFocus('#tabs-2-tab');
      });
    });
  });

  describe('simple variant', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-tabs--simple&viewMode=story');
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });
  });

  describe('Disabled tabs', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-tabs--disabled&viewMode=story');
      await injectAxe(page);
    });

    it('verifies that only the first not visible panel is visible at the beginning', async () => {
      const isFirstPanelVisible = await page.isVisible('text="First panel"');
      expect(isFirstPanelVisible).toBeFalsy();

      const isSecondPanelVisible = await page.isVisible('text="Second panel"');
      expect(isSecondPanelVisible).toBeTruthy();

      const isThirdPanelVisible = await page.isVisible('text="Third panel"');
      expect(isThirdPanelVisible).toBeFalsy();

      const isFourthPanelVisible = await page.isVisible('text="Fourth panel"');
      expect(isFourthPanelVisible).toBeFalsy();

      const isFifthPanelVisible = await page.isVisible('text="Fifth panel"');
      expect(isFifthPanelVisible).toBeFalsy();
    });

    describe('Keyboard interactions', () => {
      it('moves to the next tab when pressing ArrowRight', async () => {
        await page.waitForSelector('#tabs-1-tab');

        await page.focus('#tabs-1-tab');
        await page.keyboard.press('ArrowRight');
        await expect(page).toHaveFocus('#tabs-3-tab');

        await page.keyboard.press('ArrowRight');
        await expect(page).toHaveFocus('#tabs-5-tab');

        await page.keyboard.press('ArrowRight');
        await expect(page).toHaveFocus('#tabs-1-tab');
      });

      it('moves to the previous tab when pressing ArrowLeft', async () => {
        await page.waitForSelector('#tabs-1-tab');

        await page.focus('#tabs-1-tab');
        await page.keyboard.press('ArrowLeft');
        await expect(page).toHaveFocus('#tabs-5-tab');

        await page.keyboard.press('ArrowLeft');
        await expect(page).toHaveFocus('#tabs-3-tab');

        await page.keyboard.press('ArrowLeft');
        await expect(page).toHaveFocus('#tabs-1-tab');
      });

      it('moves to the first tab when pressing Home', async () => {
        await page.waitForSelector('#tabs-1-tab');

        await page.focus('#tabs-1-tab');
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Home');

        await expect(page).toHaveFocus('#tabs-1-tab');
      });

      it('moves to the last tab when pressing End', async () => {
        await page.waitForSelector('#tabs-1-tab');

        await page.focus('#tabs-1-tab');
        await page.keyboard.press('End');

        await expect(page).toHaveFocus('#tabs-5-tab');
      });
    });
  });
});
