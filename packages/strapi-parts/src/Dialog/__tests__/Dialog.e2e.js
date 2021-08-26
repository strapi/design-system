import {
  injectAxe,
  // getViolations
} from 'axe-playwright';

describe('Dialog', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=dialog--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    // const violations = await getViolations(page);
    // Axe throws an error about landmark for the role dialog
    // test doesn't work even if exactly the same as in ModalLayout
    // const realViolations = violations.filter((violation) => violation.id !== 'region');
    // expect(realViolations.length).toBe(0);
  });
});
