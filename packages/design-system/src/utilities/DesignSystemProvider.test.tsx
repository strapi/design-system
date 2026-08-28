import { render } from '@testing-library/react';
import { DefaultTheme } from 'styled-components';

import { darkTheme, extendTheme, lightTheme } from '../themes';

import { DesignSystemProvider } from './DesignSystemProvider';

describe('DesignSystemProvider', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('adds the dark class to the root element for the dark theme', () => {
    render(<DesignSystemProvider theme={darkTheme} />);

    expect(document.documentElement).toHaveClass('dark');
  });

  it('removes the dark class from the root element for the light theme', () => {
    document.documentElement.classList.add('dark');

    render(<DesignSystemProvider theme={lightTheme} />);

    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('adds the dark class for a customised dark theme', () => {
    // extendTheme accepts a nullable theme, so it widens the return type to include `{}`
    const customTheme = extendTheme(darkTheme, { colors: { primary600: 'rebeccapurple' } }) as DefaultTheme;

    render(<DesignSystemProvider theme={customTheme} />);

    expect(document.documentElement).toHaveClass('dark');
  });
});
