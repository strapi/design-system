import * as React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BaseCheckbox } from '../BaseCheckbox';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('BaseCheckbox', () => {
  it('snapshots when the value is undefined (should have name=default)', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <label htmlFor="default">Parent</label>
          <BaseCheckbox name="default" onValueChange={() => undefined} value={undefined} />
        </div>
      </ThemeProvider>,
    );

    await waitFor(() => expect(screen.getByRole('checkbox').getAttribute('name')).toBe('default'));

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <label
          for="default"
        >
          Parent
        </label>
        <input
          class="sc-bdvvaa eGASmy"
          name="default"
          type="checkbox"
        />
      </div>
    `);
  });

  it('snapshots when the checkbox is checked', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <label htmlFor="default-true">Parent</label>
          <BaseCheckbox name="default-true" onValueChange={() => undefined} value={true} />
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <label
          for="default-true"
        >
          Parent
        </label>
        <input
          checked=""
          class="sc-bdvvaa eGASmy"
          name="default-true"
          type="checkbox"
        />
      </div>
    `);
  });
});
