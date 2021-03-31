import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from '../Box';
import { lightTheme } from '../../themes';
import { ThemeProvider } from 'styled-components';

describe('Box', () => {
  it.each(['color', 'background'])('retrieves the theme value corresponding to the %s props', (colorProp) => {
    const props = { [colorProp]: 'primary500' };

    render(
      <ThemeProvider theme={lightTheme}>
        <Box {...props}>Hello world</Box>
      </ThemeProvider>,
    );

    const el = screen.getByText('Hello world');
    expect(el).toHaveStyle(`${colorProp}: #7b79ff`);
  });

  it.each(['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'])(
    'retrieves the theme value corresponding to the %s props',
    (spacingProp) => {
      const props = { [spacingProp]: 4 };

      render(
        <ThemeProvider theme={lightTheme}>
          <Box {...props}>Hello world</Box>
        </ThemeProvider>,
      );

      const el = screen.getByText('Hello world');

      expect(el).toHaveStyle(`${spacingProp}: 16px`);
    },
  );

  it('matches snapshots', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Box
          padding={4}
          background="primary700"
          color="neutral0"
          marginLeft={2}
          marginRight={2}
          marginTop={5}
          marginBottom={5}
        >
          Hello world
        </Box>
      </ThemeProvider>,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="sc-bdfBwQ fTckHT"
        >
          Hello world
        </div>
      </div>
    `);
  });
});
