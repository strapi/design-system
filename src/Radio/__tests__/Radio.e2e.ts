import { injectAxe, checkA11y } from 'axe-playwright';

describe('Radio', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=radio--default&viewMode=story');
    await injectAxe(page);
  });

  it('snapshots the AxTree', async () => {
    const radio = await page.$('#second');
    await radio?.press('Space');

    const axTreeSnapshot = await page.accessibility.snapshot({ root: radio });
    expect(axTreeSnapshot).toMatchInlineSnapshot(`
      Object {
        "checked": true,
        "children": undefined,
        "focused": true,
        "name": "Luigi",
        "pressed": undefined,
        "role": "radio",
        "value": undefined,
      }
    `);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('focuses the first element when pressing tab on the document', async () => {
    await page.keyboard.press('Tab');

    const radio = await page.$('#first');
    const axTreeSnapshot = await page.accessibility.snapshot({ root: radio });

    expect(axTreeSnapshot?.focused).toBe(true);
  });

  it('focuses the lastly focused radio when blurring the group and entering it again', async () => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    const title = await page.$('#trophy-champions');
    await title?.click();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');

    const radio = await page.$('#first');
    const isChecked = await radio?.isChecked();

    expect(isChecked).toBe(true);
  });
});
