import { injectAxe, checkA11y } from 'axe-playwright';

describe('Button', () => {
  beforeAll(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=button--primary&viewMode=story');
    await injectAxe(page);
  });

  it('snapshots the AxTree', async () => {
    const button = await page.waitForSelector('text="Hello world"');
    const axTreeSnapshot = await page.accessibility.snapshot({ root: button });

    expect(await button.textContent()).toContain('Hello world');
    expect(axTreeSnapshot).toMatchInlineSnapshot(`
            Object {
              "checked": undefined,
              "children": undefined,
              "name": "Hello world",
              "pressed": undefined,
              "role": "button",
              "value": undefined,
            }
        `);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });
});
