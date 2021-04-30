import * as React from 'react';
import { render } from '@testing-library/react';
import { Stack } from '../Stack';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Stack', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Stack size={4}>
          <div>First</div>
          <div>Second</div>
          <div>Third</div>
        </Stack>
      </ThemeProvider>,
    );

    expect(container).toMatchInlineSnapshot(`
      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 16px;
      }

      <div>
        <div
          class="c0"
        >
          <div>
            First
          </div>
          <div>
            Second
          </div>
          <div>
            Third
          </div>
        </div>
      </div>
    `);
  });
});
