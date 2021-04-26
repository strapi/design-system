import { injectAxe, checkA11y } from 'axe-playwright';

describe('BaseRadio', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=baseradio--default-story&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it.each(['ArrowDown', 'ArrowRight'])('moves to the next element when pressing %s', async (keyPressed) => {
    await page.focus('text="Pizza"');
    await page.keyboard.press(keyPressed);

    const secondBox = await page.$('#bagel');
    expect(await secondBox?.isChecked()).toBe(true);
  });

  it.each(['ArrowUp', 'ArrowLeft'])('moves to the previous element when pressing %s', async (keyPressed) => {
    await page.focus('text="Bagel"');
    await page.keyboard.press(keyPressed);

    const pizzaRadio = await page.$('#pizza');
    expect(await pizzaRadio?.isChecked()).toBe(true);
  });
});
