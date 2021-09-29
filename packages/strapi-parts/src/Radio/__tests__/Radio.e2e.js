import { injectAxe, checkA11y } from 'axe-playwright';

describe('Radio', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-components-radio--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it.each(['ArrowDown', 'ArrowRight'])('moves to the next element when pressing %s', async (keyPressed) => {
    await page.focus('[value="pizza"]');
    await page.keyboard.press(keyPressed);

    const secondBox = await page.$('[value="bagel"]');
    expect(await secondBox?.isChecked()).toBe(true);
  });

  it.each(['ArrowUp', 'ArrowLeft'])('moves to the previous element when pressing %s', async (keyPressed) => {
    await page.focus('[value="bagel"]');
    await page.keyboard.press(keyPressed);

    const pizzaRadio = await page.$('[value="pizza"]');
    expect(await pizzaRadio?.isChecked()).toBe(true);
  });
});
