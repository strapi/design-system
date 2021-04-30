import * as React from 'react';
import { render } from '@testing-library/react';
import { Divider } from '../Divider';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Divider', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Divider />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        background: #eaeaef;
      }

      .c1 {
        height: 1px;
      }

      <div
        class="c0 c1"
      />
    `);
  });
});
