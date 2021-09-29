import { injectAxe, checkA11y } from 'axe-playwright';

describe('FocusTrap', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto(
      'http://localhost:6006/iframe.html?id=design-system-technical-components-focustrap--base&viewMode=story',
    );
    await injectAxe(page);
  });

  beforeEach(async () => {
    await page.focus('#trigger');
    await page.keyboard.press('Space');
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('focuses the first focusable element when opening the focus trap', async () => {
    await expect(page).toHaveFocus('[aria-label="Close"]');
  });

  it('restores focus when pressing Escape', async () => {
    await page.waitForSelector('[aria-label="Close"]');
    await page.keyboard.press('Escape');

    await expect(page).toHaveFocus('#trigger');
  });

  describe('Pressing Tab in the trap', () => {
    it.jestPlaywrightSkip(
      { browsers: ['webkit'] },
      'traps the focus when pressing Tab for Firefox and Chrome',
      async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveFocus('#second');

        await page.keyboard.press('Tab');
        await expect(page).toHaveFocus('#last');

        await page.keyboard.press('Tab');
        await expect(page).toHaveFocus('[aria-label="Close"]');
      },
    );

    it.jestPlaywrightSkip(
      { browsers: ['firefox', 'chromium'] },
      'traps the focus when pressing Tab for Webkit',
      async () => {
        await page.waitForSelector('[aria-label="Close"]');
        await page.keyboard.press('Alt+Tab');
        await expect(page).toHaveFocus('#second');

        await page.keyboard.press('Alt+Tab');
        await expect(page).toHaveFocus('#last');

        await page.keyboard.press('Alt+Tab');
        await expect(page).toHaveFocus('[aria-label="Close"]');
      },
    );

    it.jestPlaywrightSkip(
      { browsers: ['webkit'] },
      'traps the focus when dynamically adding an element in the focus tree and pressing Tab for Firefox and Chrome',
      async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveFocus('#second');

        await page.keyboard.press('Tab');
        await expect(page).toHaveFocus('#last');
        await page.click('#last');

        await page.keyboard.press('Tab');
        await expect(page).toHaveFocus('#real-last');
      },
    );

    it.jestPlaywrightSkip(
      { browsers: ['firefox', 'chromium'] },
      'traps the focus when pressing Tab for Webkit',
      async () => {
        await page.waitForSelector('[aria-label="Close"]');
        await page.keyboard.press('Alt+Tab');
        await expect(page).toHaveFocus('#second');

        await page.keyboard.press('Alt+Tab');
        await expect(page).toHaveFocus('#last');
        await page.click('#last');

        await page.keyboard.press('Alt+Tab');
        await expect(page).toHaveFocus('#real-last');
      },
    );
  });

  describe('Pressing Shift+Tab in the trap', () => {
    it.jestPlaywrightSkip(
      { browsers: ['webkit'] },
      'traps the focus when pressing Tab for Firefox and Chrome',
      async () => {
        await page.keyboard.press('Shift+Tab');
        await expect(page).toHaveFocus('#last');

        await page.keyboard.press('Shift+Tab');
        await expect(page).toHaveFocus('#second');

        await page.keyboard.press('Shift+Tab');
        await expect(page).toHaveFocus('[aria-label="Close"]');
      },
    );

    it.jestPlaywrightSkip(
      { browsers: ['firefox', 'chromium'] },
      'traps the focus when pressing Tab for Webkit',
      async () => {
        await page.waitForSelector('[aria-label="Close"]');
        await page.keyboard.press('Alt+Shift+Tab');
        await expect(page).toHaveFocus('#last');

        await page.keyboard.press('Alt+Shift+Tab');
        await expect(page).toHaveFocus('#second');

        await page.keyboard.press('Alt+Shift+Tab');
        await expect(page).toHaveFocus('[aria-label="Close"]');
      },
    );
  });
});
