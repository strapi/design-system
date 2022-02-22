const { injectAxe, checkA11y } = require('axe-playwright');

const { test, expect } = require('@playwright/test');

test.describe.parallel('Radio', () => {
  test.beforeEach(async ({ page }) => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-components-radio--base&viewMode=story');
    await injectAxe(page);
  });

  test('triggers axe on the document', async ({ page }) => {
    await checkA11y(page);
  });

  test('moves to the next element when pressing ArrowDown', async ({ page }) => {
    await page.focus('[value="pizza"]');
    await page.keyboard.press('ArrowDown');

    const secondBox = await page.$('[value="bagel"]');
    if (secondBox) {
      expect(await secondBox.isChecked()).toBe(true);
    }
  });

  test('moves to the next element when pressing ArrowRight', async ({ page }) => {
    await page.focus('[value="pizza"]');
    await page.keyboard.press('ArrowRight');

    const secondBox = await page.$('[value="bagel"]');
    if (secondBox) {
      expect(await secondBox.isChecked()).toBe(true);
    }
  });

  test('moves to the previous element when pressing ArrowUp', async ({ page }) => {
    await page.focus('[value="bagel"]');
    await page.keyboard.press('ArrowUp');

    const pizzaRadio = await page.$('[value="pizza"]');
    if (pizzaRadio) {
      expect(await pizzaRadio.isChecked()).toBe(true);
    }
  });

  test('moves to the previous element when pressing ArrowLeft', async ({ page }) => {
    await page.focus('[value="bagel"]');
    await page.keyboard.press('ArrowLeft');

    const pizzaRadio = await page.$('[value="pizza"]');
    if (pizzaRadio) {
      expect(await pizzaRadio.isChecked()).toBe(true);
    }
  });
});
