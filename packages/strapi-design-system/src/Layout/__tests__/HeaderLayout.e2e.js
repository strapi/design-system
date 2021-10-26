import { injectAxe, checkA11y } from 'axe-playwright';

describe('HeaderLayout', () => {
  describe('base', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-headerlayout--base&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('base without nav action', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-headerlayout--base-without-nav-action&args=&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('sticky', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-headerlayout--sticky&args=&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });
  });

  describe('combined w/ scroll', () => {
    it('triggers axe on the document', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-headerlayout--combined-w-scroll&args=&viewMode=story',
      );
      await injectAxe(page);
      await checkA11y(page);
    });

    it('displays the sticky header when scrolling down', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-headerlayout--combined-w-scroll&args=&viewMode=story',
      );

      await expect(page).toHaveSelector('[data-strapi-header]');

      await page.evaluate(() => window.scrollTo(0, 400));

      await expect(page).toHaveSelector('[data-strapi-header-sticky]');

      const headerLayout = await page.$$('[data-strapi-header]');
      expect(headerLayout.length).toBe(0);
    });

    it('displays the sticky header when scrolling back up', async () => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=design-system-components-headerlayout--combined-w-scroll&args=&viewMode=story',
      );
      await page.evaluate(() => window.scrollTo(0, 400));
      await expect(page).toHaveSelector('[data-strapi-header-sticky]');

      await page.evaluate(() => window.scrollTo(0, 0));

      await expect(page).toHaveSelector('[data-strapi-header]');

      const headerLayout = await page.$$('[data-strapi-header-sticky]');
      expect(headerLayout.length).toBe(0);
    });
  });
});
