import { injectAxe, checkA11y } from 'axe-playwright';

describe('Combobox', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto(
      'http://localhost:6006/iframe.html?id=design-system-components-combobox--base&globals=&viewMode=story',
    );
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('Focus and select a value then close the combobox', async () => {
    await page.click('input');
    await expect(page).toHaveSelector('[role="listbox"]', { timeout: 300 });

    await page.click('text="Tartuffo"');

    const selectedValue = await page.textContent('#combobox-1-selected-value');
    await expect(selectedValue).toBe('Tartuffo');
    await expect(page).not.toHaveSelector('[role="listbox"]', { timeout: 300 });
  });

  it('Select a value', async () => {
    await page.click('input');
    await expect(page).toHaveSelector('[role="listbox"]', { timeout: 300 });

    await page.click('text="Tartuffo"');

    const selectedValue = await page.textContent('#combobox-1-selected-value');
    await expect(selectedValue).toBe('Tartuffo');
    await expect(page).not.toHaveSelector('[role="listbox"]', { timeout: 300 });
  });

  it('Displays no results', async () => {
    await page.fill('input', 'Apple Pie');
    const content = await page.textContent('text="No results found"');
    await expect(content).toBe('No results found');
  });

  it('Type a value', async () => {
    await page.fill('input', 'Hamburger');
    let options = await page.$$('[role="option"]');
    expect(options.length).toEqual(1);

    await page.fill('input', '');
    options = await page.$$('[role="option"]');
    expect(options.length).toEqual(4);
  });

  it('Select with keyboard', async () => {
    await page.focus('input');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    const ariaDescendantValue = await page.getAttribute('input', 'aria-activedescendant');
    expect(ariaDescendantValue).toBe('combobox-1-2');

    await page.keyboard.press('Enter');

    const selectedValue = await page.textContent('#combobox-1-selected-value');
    await expect(selectedValue).toBe('Tartuffo');
  });
});

describe('Combobox - initial data', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto(
      'http://localhost:6006/iframe.html?id=design-system-components-combobox--initial-data&args=&viewMode=story',
    );
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('initialize the value', async () => {
    const selectedValue = await page.textContent('#combobox-1-selected-value');
    await expect(selectedValue).toBe('Tartuffo');
  });
});

describe('Combobox - creatable', () => {
  beforeEach(async () => {
    // This is the URL of the Storybook Iframe
    await page.goto(
      'http://localhost:6006/iframe.html?id=design-system-components-combobox--creatable&globals=&viewMode=story',
    );
    await injectAxe(page);
  });

  it('triggers axe on the document', async () => {
    await checkA11y(page);
  });

  it('Create a new item', async () => {
    await page.fill('input', 'Apple Pie');
    const content = await page.textContent('[role="option"]');
    await expect(content).toBe('Create "Apple Pie"');

    await page.click('[role="option"]');

    const selectedValue = await page.textContent('#combobox-1-selected-value');
    await expect(selectedValue).toBe('Apple Pie');
  });
});
