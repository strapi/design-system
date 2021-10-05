import { injectAxe, checkA11y } from 'axe-playwright';

describe('Accordion', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-components-accordion--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('triggers axe on the document when the accordion is expanded', async () => {
    await page.click('[aria-labelledby="accordion-label-acc-1"]');

    await checkA11y(page);
  });
});
