import { injectAxe, getViolations } from 'axe-playwright';

import { test, expect } from '@playwright/test';

test.describe.parallel('Dialog', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('/iframe.html?id=design-system-components-dialog--base&args=&viewMode=story');
    await injectAxe(page);
  });

  test('triggers axe on the document', async ({ page }) => {
    const violations = await getViolations(page);

    // Axe throws an error about landmark for the role dialog
    const realViolations = violations.filter((violation) => violation.id !== 'region');

    expect(realViolations.length).toBe(0);
  });
});
