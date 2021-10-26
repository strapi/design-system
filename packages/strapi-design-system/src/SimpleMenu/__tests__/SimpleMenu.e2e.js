import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

describe('SimpleMenu', () => {
  describe('base', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-simplemenu--base&viewMode=story');
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });

    it('triggers axe on the document when the menu is opened', async () => {
      await page.click('button');

      await expect(page).toHaveSelector('[role="menu"]');

      const violations = await getViolations(page);

      // Axe throws an error because the portal is not wrapped by a region.
      const realViolations = violations
        .filter((violation) => violation.id !== 'region')
        .filter((violation) => violation.id !== 'aria-required-parent');

      console.log('realViolations', realViolations);

      expect(realViolations.length).toBe(0);
    });

    it.each(['Enter', 'Space'])('select the second value of the menu', async (keyPressed) => {
      await page.focus('button');
      await page.keyboard.press(keyPressed);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press(keyPressed);

      const label = await page.textContent('button');
      expect(label).toBe('February');
    });
  });

  describe('with links', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-simplemenu--with-links&viewMode=story',
      );
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });

    it('triggers axe on the document when the menu is opened', async () => {
      await page.click('button');

      await expect(page).toHaveSelector('[role="menu"]');

      const violations = await getViolations(page);

      // Axe throws an error because the portal is not wrapped by a region.
      const realViolations = violations
        .filter((violation) => violation.id !== 'region')
        .filter((violation) => violation.id !== 'aria-required-parent');

      console.log('realViolations', realViolations);

      expect(realViolations.length).toBe(0);
    });
  });
});
