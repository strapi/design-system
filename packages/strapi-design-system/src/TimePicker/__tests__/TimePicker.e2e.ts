import { test } from '@playwright/test';
import { navigateToStory } from '@test/e2e';
import { checkA11y } from 'axe-playwright';

test.describe.parallel('TimePicker', () => {
  test('light mode A11y', async ({ page }) => {
    await navigateToStory(page, 'design-system-components-timepicker--base');
    await checkA11y(page);

    await navigateToStory(page, 'design-system-components-timepicker--steps');
    await checkA11y(page);

    await navigateToStory(page, 'design-system-components-timepicker--sizing');
    await checkA11y(page);
  });

  test('dark mode A11y', async ({ page }) => {
    await navigateToStory(page, 'design-system-components-timepicker--base', { isDarkMode: true });
    await checkA11y(page);

    await navigateToStory(page, 'design-system-components-timepicker--steps', { isDarkMode: true });
    await checkA11y(page);

    await navigateToStory(page, 'design-system-components-timepicker--sizing', { isDarkMode: true });
    await checkA11y(page);
  });
});
