import { injectAxe, checkA11y } from 'axe-playwright';

const getListDescendant = async () =>
  page.$eval('[role="listbox"]', (node) => node.getAttribute('aria-activedescendant'));

describe('Select', () => {
  describe('simple', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=select--base&viewMode=story');
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });

    it('triggers axe on the document when the popover is opened', async () => {
      await page.click('text="Choose your meal"');
      await checkA11y(page);
    });

    it('triggers axe on the document when the button is disabled', async () => {
      await page.click('text=Show the disabled state');
      await checkA11y(page);
    });

    describe('Keyboard interactions', () => {
      it.each(['Enter', 'ArrowDown', 'Space'])(
        'opens the listbox and highlights the first item when pressing %s',
        async (key) => {
          await page.focus('#select1');
          await page.keyboard.press(key);
          await expect(page).toHaveSelector('[role="listbox"]');

          const ariaDescendant = await getListDescendant();
          await expect(ariaDescendant).toBe('option-select1-pizza');
        },
      );

      it('opens the listbox and highlights the last item when pressing ArrowUp', async () => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');
        await expect(page).toHaveSelector('[role="listbox"]');

        const ariaDescendant = await getListDescendant();
        await expect(ariaDescendant).toBe('option-select1-bagel');
      });

      it('opens the listbox and highlights the different items when pressing ArrowDown', async () => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowDown');
        await expect(page).toHaveSelector('[role="listbox"]');

        const ariaDescendant1 = await getListDescendant();
        await expect(ariaDescendant1).toBe('option-select1-pizza');

        await page.keyboard.press('ArrowDown');
        const ariaDescendant2 = await getListDescendant();
        await expect(ariaDescendant2).toBe('option-select1-hamburger');

        await page.keyboard.press('ArrowDown');
        const ariaDescendant3 = await getListDescendant();
        await expect(ariaDescendant3).toBe('option-select1-bagel');

        await page.keyboard.press('ArrowDown');
        const ariaDescendant4 = await getListDescendant();
        await expect(ariaDescendant4).toBe('option-select1-pizza');
      });

      it('opens the listbox and highlights the different items when pressing ArrowUp', async () => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');
        await expect(page).toHaveSelector('[role="listbox"]');

        const ariaDescendant1 = await getListDescendant();
        await expect(ariaDescendant1).toBe('option-select1-bagel');

        await page.keyboard.press('ArrowUp');
        const ariaDescendant2 = await getListDescendant();
        await expect(ariaDescendant2).toBe('option-select1-hamburger');

        await page.keyboard.press('ArrowUp');
        const ariaDescendant3 = await getListDescendant();
        await expect(ariaDescendant3).toBe('option-select1-pizza');

        await page.keyboard.press('ArrowUp');
        const ariaDescendant4 = await getListDescendant();
        await expect(ariaDescendant4).toBe('option-select1-bagel');
      });

      it('sends back the focus to the select button when pressing escape when the popover is visible', async () => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');
        await expect(page).toHaveSelector('[role="listbox"]');

        await page.keyboard.press('Escape');

        await expect(page).not.toHaveSelector('[role="listbox"]', { timeout: 1000 });

        await expect(page).toHaveFocus('#select1');
      });

      it('changes the button content and the select value when pressing Enter on an item', async () => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');
        await expect(page).toHaveSelector('[role="listbox"]');

        await page.keyboard.press('Enter');

        await expect(await page.$('text=Current value is bagel')).toBeTruthy();
        await expect(page).toHaveText('#select1', 'Bagel');
      });

      it('focuses the previously selected item when one is selected and the user reopens the popover', async () => {
        await page.focus('#select1');
        await page.keyboard.press('ArrowUp');
        await expect(page).toHaveSelector('[role="listbox"]');

        await page.keyboard.press('Enter');
        await expect(page).not.toHaveSelector('[role="listbox"]', { timeout: 1000 });

        await page.keyboard.press('Enter');
        const ariaDescendant = await getListDescendant();
        await expect(ariaDescendant).toBe('option-select1-bagel');
      });

      it.each(['Enter', 'Space'])(
        'should not do anything when pressing %s when the element is disabled',
        async (key) => {
          await page.click('text=Show the disabled state');
          await page.focus('#select1');
          await page.keyboard.press(key);

          await expect(page).not.toHaveSelector('[role="listbox"]', { timeout: 1000 });
        },
      );
    });
  });
});
