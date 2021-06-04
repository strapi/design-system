import { injectAxe, checkA11y } from 'axe-playwright';

describe('SimpleMenu', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-atoms-simplemenu--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('select the second value of the menu', async () => {
    await page.click('text="January"');
    await page.click('text="February"');

    const label = await page.textContent('#label p');
    expect(label).toBe('February');
  });
});
