import * as React from 'react';
import { render } from '@testing-library/react';
import { Loader } from '../Loader';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Loader', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Loader />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        aria-live="assertive"
        role="alert"
      >
        <div
          class="sc-bdfBwQ eDhJsz"
        />
        <img
          aria-hidden="true"
          class="sc-gsTCUz eusWxo"
          src="test-file-stub"
        />
      </div>
    `);
  });
});
