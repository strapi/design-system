import { test, expect } from '@playwright/test';

test.describe.parallel('CarouselImage', () => {
  test('a tooltip should appear with the alt text if the src fails to load', async ({ page }) => {
    await page.goto('/iframe.html?id=design-system-components-carouselinput--broken-asset&viewMode=story');

    const imageElement = page.locator('img');

    expect(imageElement).toBeTruthy();

    await imageElement.hover().then(() => {
      expect(page.locator('my image')).toBeTruthy();
    });
  });
});
