import * as React from 'react';
import { render } from '@testing-library/react';
import { BaseLink } from '../BaseLink';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('BaseLink', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <BaseLink />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        cursor: pointer;
      }

      <a
        class="c0"
        target="_self"
      />
    `);
  });
});
