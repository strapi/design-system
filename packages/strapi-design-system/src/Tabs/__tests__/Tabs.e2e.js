import { injectAxe, checkA11y } from 'axe-playwright';

describe('Tabs', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=tabs--base&viewMode=story');
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
      await page.waitForSelector('#tab-tabs-0');

      await page.focus('#tab-tabs-0');
      await page.keyboard.press('ArrowRight');
      await expect(page).toHaveFocus('#tab-tabs-1');

      await page.keyboard.press('ArrowRight');
      await expect(page).toHaveFocus('#tab-tabs-2');

      await page.keyboard.press('ArrowRight');
      await expect(page).toHaveFocus('#tab-tabs-0');
    });

    it('moves to the previous tab when pressing ArrowLeft', async () => {
      await page.waitForSelector('#tab-tabs-0');

      await page.focus('#tab-tabs-0');
      await page.keyboard.press('ArrowLeft');
      await expect(page).toHaveFocus('#tab-tabs-2');

      await page.keyboard.press('ArrowLeft');
      await expect(page).toHaveFocus('#tab-tabs-1');

      await page.keyboard.press('ArrowLeft');
      await expect(page).toHaveFocus('#tab-tabs-0');
    });

    it('moves to the first tab when pressing Home', async () => {
      await page.waitForSelector('#tab-tabs-0');

      await page.focus('#tab-tabs-0');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Home');

      await expect(page).toHaveFocus('#tab-tabs-0');
    });

    it('moves to the last tab when pressing End', async () => {
      await page.waitForSelector('#tab-tabs-0');

      await page.focus('#tab-tabs-0');
      await page.keyboard.press('End');

      await expect(page).toHaveFocus('#tab-tabs-2');
    });
  });
});
