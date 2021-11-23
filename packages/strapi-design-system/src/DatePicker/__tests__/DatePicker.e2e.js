import { injectAxe, checkA11y } from 'axe-playwright';

describe('DatePicker', () => {
  describe('disabled', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-datepicker--disabled&viewMode=story',
      );
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });

    it('does not open the dialog when clicking the input', async () => {
      await page.click('input');

      expect(await page.$('[role="dialog"]')).toBeFalsy();
    });
  });

  describe('base', () => {
    beforeEach(async () => {
      // This is the URL of the Storybook Iframe
      await page.goto('http://localhost:6006/iframe.html?id=design-system-components-datepicker--base&viewMode=story');
      await injectAxe(page);
    });

    it('triggers axe on the document', async () => {
      await checkA11y(page);
    });

    it('triggers axe on the document with the dropdown open', async () => {
      await page.click('input');
      await checkA11y(page);
    });

    it('selects a value and closes the dialog', async () => {
      await page.click('input');
      expect(await page.$('[role="dialog"]')).toBeTruthy();

      await page.click(':nth-match(button[aria-haspopup], 1)');
      await page.click('text="January"');

      await page.click(':nth-match(button[aria-haspopup], 2)');
      await page.click('text="2021"');

      await page.click('text="14"');

      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('1/14/2021');
      expect(await page.$('[role="dialog"]')).toBeFalsy();
    });

    it('clears the input and sends the focus back to the calendar button when pressing the clear button', async () => {
      await page.click('input');
      expect(await page.$('[role="dialog"]')).toBeTruthy();

      await page.click(':nth-match(button[aria-haspopup], 1)');
      await page.click('text="January"');
      await page.click(':nth-match(button[aria-haspopup], 2)');
      await page.click('text="2021"');
      await page.click('text="14"');

      await page.click('[aria-label="Clear the datepicker"]');
      const value = await page.$eval('input', (el) => el.value);
      expect(value).toBe('');
      await expect(page).toHaveFocus('[aria-label="Date picker"]');
    });
  });
});
