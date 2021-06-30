import * as React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from '../Avatar';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Avatar', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Avatar src="https://avatars.githubusercontent.com/u/3874873?v=4" alt="marvin frachet" />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        border-radius: 50%;
        display: block;
        height: 26px;
        width: 26px;
      }

      <img
        alt="marvin frachet"
        class="c0"
        height="26px"
        src="https://avatars.githubusercontent.com/u/3874873?v=4"
        width="26px"
      />
    `);
  });
});
