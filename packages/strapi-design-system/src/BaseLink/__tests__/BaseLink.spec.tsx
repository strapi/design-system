import * as React from 'react';

import { render } from '@testing-library/react';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { BaseLink } from '../BaseLink';

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
        aria-disabled="false"
        class="c0"
        target="_self"
      />
    `);
  });
});
