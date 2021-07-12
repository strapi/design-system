import * as React from 'react';
import { render } from '@testing-library/react';
import { Badge } from '../Badge';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Badge', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Badge>Doc</Badge>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        background: #f6f6f9;
        color: #666687;
        padding: 4px;
        border-radius: 4px;
      }

      .c2 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c3 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c4 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c1 {
        display: inline-block;
      }

      <div
        class="c0 c1"
      >
        <span
          class="c2 c3 c4"
        >
          Doc
        </span>
      </div>
    `);
  });
});
