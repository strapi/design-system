import { injectAxe } from 'axe-playwright';

describe('Dialog', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=dialog--base&viewMode=story');
    await injectAxe(page);
  });
});
