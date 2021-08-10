import { injectAxe, checkA11y } from 'axe-playwright';

describe('NumberInput', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-molecules-numberinput--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('fills the input when typing valid numberic numbers', async () => {
    await page.fill('input', '123.123');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('123.123');
  });

  it('fills the input when typing a valid numberic and a trailing comma', async () => {
    await page.fill('input', '123456,');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('123,456');
  });

  it('erases the value in the input when pressing backspace', async () => {
    await page.fill('input', '-1');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('');
  });

  it('puts the step value in the input when pressing ArrowUp and that the input is empty', async () => {
    await page.focus('input');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('1');
  });

  it('puts the step value in the input when pressing ArrowDown and that the input contains only the minus sign', async () => {
    await page.fill('input', '-');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('-1');
  });

  it('puts the step value in the input when pressing ArrowDown and that the input is empty', async () => {
    await page.focus('input');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('-1');
  });

  it('puts the step value in the input when pressing ArrowUp and that the input contains only the minus sign', async () => {
    await page.fill('input', '-');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('1');
  });
});
