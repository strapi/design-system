import { injectAxe, checkA11y } from 'axe-playwright';

describe('Table', () => {
  describe('Default story', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=table--base&viewMode=story');
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });

    describe('Keyboard interactions', () => {
      beforeEach(async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="1"]');
      });

      it('focus the next element in the row when pressing ArrowDown', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await expect(page).toHaveFocus('[aria-rowindex="4"] > [aria-colindex="1"]');
      });

      it('focus the previous element in the row when pressing ArrowUp', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('ArrowUp');

        await expect(page).toHaveFocus('[aria-rowindex="2"] > [aria-colindex="1"]');
      });

      it('focus the next element in the col when pressing ArrowRight', async () => {
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="4"]');
      });

      it('focus the previous element in the col when pressing ArrowLeft', async () => {
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowLeft');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="2"]');
      });

      it('focus the last element on the row when pressing End', async () => {
        await page.keyboard.press('End');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="5"]');
      });

      it('focus the last element on the last row when pressing End AND ctrl', async () => {
        await page.keyboard.press('Control+End');

        await expect(page).toHaveFocus('[aria-rowindex="30"] > [aria-colindex="5"]');
      });

      it('focus the first element on the row when pressing Home', async () => {
        await page.keyboard.press('End');
        await page.keyboard.press('Home');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="1"]');
      });

      it('focus the first element on the first row when pressing Home AND ctrl', async () => {
        await page.keyboard.press('Control+End');
        await page.keyboard.press('Control+Home');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="1"]');
      });

      it('focus the first element on the first row when pressing Page', async () => {
        await page.keyboard.press('End');
        await page.keyboard.press('Home');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="1"]');
      });

      it('keeps focusing the most left positioned cell when pressing ArrowLeft on it', async () => {
        await page.keyboard.press('ArrowLeft');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="1"]');
      });

      it('keeps focusing the most top positioned cell when pressing ArrowTop on it', async () => {
        await page.keyboard.press('ArrowUp');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="1"]');
      });

      it('keeps focusing the most right positioned cell when pressing ArrowRight on it', async () => {
        await page.keyboard.press('End');
        await page.keyboard.press('ArrowRight');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="5"]');
      });

      it('keeps focusing the most bottom positioned cell when pressing ArrowDown on it', async () => {
        await page.keyboard.press('Control+End');
        await page.keyboard.press('ArrowDown');

        await expect(page).toHaveFocus('[aria-rowindex="30"] > [aria-colindex="5"]');
      });

      it('focus the cell 3 rows below when pressing PageDown', async () => {
        await page.keyboard.press('PageDown');

        await expect(page).toHaveFocus('[aria-rowindex="4"] > [aria-colindex="1"]');
      });

      it('focus the cell 2 rows below when pressing PageDown and that there s only space for jumping 2 rows', async () => {
        await page.keyboard.press('Control+End');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('PageDown');

        await expect(page).toHaveFocus('[aria-rowindex="30"] > [aria-colindex="5"]');
      });

      it('focus the cell 3 rows above when pressing PageUp', async () => {
        await page.keyboard.press('Control+End');
        await page.keyboard.press('PageUp');

        await expect(page).toHaveFocus('[aria-rowindex="27"] > [aria-colindex="5"]');
      });

      it('focus the cell 2 rows above when pressing PageUp and that there s only space for jumping 2 rows', async () => {
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('PageUp');

        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="1"]');
      });
    });
  });

  describe('Simple story', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=table--simple&viewMode=story');
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });

    describe('Keyboard interactions', () => {
      beforeEach(async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveFocus('[aria-rowindex="1"] > [aria-colindex="1"]');
      });

      it('focus the next element in the row when pressing ArrowDown', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowRight');

        const tabIndexTd = await page.$eval('[aria-rowindex="3"] > [aria-colindex="2"]', (node) =>
          node.getAttribute('tabindex'),
        );

        expect(tabIndexTd).toBe(null);

        const tabIndexA = await page.$eval('[aria-rowindex="3"] > [aria-colindex="2"] > a', (node) =>
          node.getAttribute('tabindex'),
        );

        expect(tabIndexA).toBe('0');

        await expect(page).not.toHaveFocus('[aria-rowindex="3"] > [aria-colindex="2"]');
        await expect(page).toHaveFocus('[aria-rowindex="3"] > [aria-colindex="2"] > a');
      });
    });
  });
});
