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

  it.each([
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
  ])('retrieves the theme value corresponding to the %s props', (spacingProp) => {
    const props = { [spacingProp]: 4 };

    render(
      <ThemeProvider theme={lightTheme}>
        <Box {...props}>Hello world</Box>
      </ThemeProvider>,
    );

    const el = screen.getByText('Hello world');
    expect(el).toHaveStyle(`${spacingProp}: 16px`);
  });
});
