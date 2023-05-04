import { test, expect } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { getViolations } from 'axe-playwright';

test.describe.parallel('ModalLayout', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, 'design-system-components-modallayout--base');
  });

  test('triggers axe on the document', async ({ page }) => {
    const violations = await getViolations(page);

    // Axe throws an error about landmark for the role dialog
    const realViolations = violations.filter((violation) => violation.id !== 'region');

    expect(realViolations.length).toBe(0);
  });
});
