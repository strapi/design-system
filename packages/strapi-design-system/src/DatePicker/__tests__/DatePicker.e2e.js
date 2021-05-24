import { injectAxe, checkA11y } from 'axe-playwright';

describe('DatePicker', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=datepicker--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('triggers axe on the document with the dropdown open', async () => {
    await page.click('input');
    await checkA11y(page);
  });
});
