import { injectAxe, checkA11y } from 'axe-playwright';

describe('Accordion', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-accordion--group&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('triggers axe on the document when the accordion is expanded', async () => {
    await page.click('[aria-labelledby="accordion-label-acc-1"]');

    await checkA11y(page);
  });

  describe('Keyboard interactions', () => {
    it('focuses the next node when pressing arrow down until reaching the end of the group where it focuses the first accordion', async () => {
      await page.focus('[aria-labelledby="accordion-label-acc-1"]');

      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-2"]');

      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-3"]');

      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-4"]');

      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-1"]');
    });

    it('focuses the previous node when pressing arrow up and reaches the latest accordion when being on the first one', async () => {
      await page.focus('[aria-labelledby="accordion-label-acc-1"]');

      await page.keyboard.press('ArrowUp');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-4"]');

      await page.keyboard.press('ArrowUp');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-3"]');

      await page.keyboard.press('ArrowUp');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-2"]');

      await page.keyboard.press('ArrowUp');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-1"]');
    });

    it('focuses the last element when pressing end', async () => {
      await page.focus('[aria-labelledby="accordion-label-acc-1"]');

      await page.keyboard.press('End');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-4"]');
    });

    it('focuses the first element when pressing home', async () => {
      await page.focus('[aria-labelledby="accordion-label-acc-1"]');

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Home');
      await expect(page).toHaveFocus('[aria-labelledby="accordion-label-acc-1"]');
    });
  });
});
