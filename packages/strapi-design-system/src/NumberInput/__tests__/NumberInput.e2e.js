import { injectAxe, checkA11y } from 'axe-playwright';

describe('NumberInput', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto('http://localhost:6006/iframe.html?id=design-system-components-numberinput--base&viewMode=story');
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('fills the input when typing valid numeric numbers', async () => {
    await page.fill('input', '123.123');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('123.123');
    //TODO
    // expect(await page.$('text="The value is 123123"')).toBeTruthy();
  });

  it('fills the input when typing a valid numeric and a trailing comma', async () => {
    await page.fill('input', '123456,');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('123,456');
    expect(await page.$('text="The value is 123456"')).toBeTruthy();
  });

  it('erases the value in the input when pressing backspace', async () => {
    await page.fill('input', '-1');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('');
    expect(await page.$('text="The value is undefined"')).toBeTruthy();
  });

  it('puts the step value in the input when pressing ArrowUp and that the input is empty', async () => {
    await page.focus('input');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('1');
    expect(await page.$('text="The value is 1"')).toBeTruthy();
  });

  it('puts the step value in the input when pressing ArrowDown and that the input contains only the minus sign', async () => {
    await page.fill('input', '-');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('-1');
    expect(await page.$('text="The value is -1"')).toBeTruthy();
  });

  it('puts the step value in the input when pressing ArrowDown and that the input is empty', async () => {
    await page.focus('input');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('-1');
    expect(await page.$('text="The value is -1"')).toBeTruthy();
  });

  it('puts the step value in the input when pressing ArrowUp and that the input contains only the minus sign', async () => {
    await page.fill('input', '-');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Tab');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('1');
    expect(await page.$('text="The value is 1"')).toBeTruthy();
  });

  it('increments the value when clicking on ArrowUp without blur needed', async () => {
    await page.click('[data-testid="ArrowUp"]');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('1');
    expect(await page.$('text="The value is 1"')).toBeTruthy();
  });

  it('decrements the value when clicking on ArrowUp without blur needed', async () => {
    await page.click('[data-testid="ArrowDown"]');

    const value = await page.$eval('input', (el) => el.value);
    expect(value).toBe('-1');
    expect(await page.$('text="The value is -1"')).toBeTruthy();
  });
});
