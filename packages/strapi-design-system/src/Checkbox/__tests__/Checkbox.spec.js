import * as React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { Checkbox } from '../Checkbox';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Checkbox', () => {
  it('snapshots when the value is undefined (should have name=default)', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <label htmlFor="default">Parent</label>
          <Checkbox name="default" onChange={() => undefined} value={undefined} />
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
          aria-checked="false"
          class="sc-bdfBwQ bkarNm"
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
          <Checkbox name="default-true" onChange={() => undefined} value={true} />
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
          aria-checked="true"
          checked=""
          class="sc-bdfBwQ bkarNm"
          name="default-true"
          type="checkbox"
        />
      </div>
    `);
  });
});
