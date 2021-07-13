import { injectAxe, checkA11y } from 'axe-playwright';

describe('SimpleMenu', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-simplemenu--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
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
