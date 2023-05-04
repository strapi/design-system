import { expect, Page } from '@playwright/test';
import { injectAxe } from 'axe-playwright';

const navigateToStory = async (page: Page, id: string, { isDarkMode = false } = {}) => {
  await page.goto(`/iframe?id=${id}&viewMode=story${isDarkMode ? '&theme=dark' : ''}`);
  await injectAxe(page);

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Storybook story');
};

export { navigateToStory };
