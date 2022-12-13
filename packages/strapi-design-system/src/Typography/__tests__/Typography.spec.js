import * as React from 'react';
import { render } from '@testing-library/react';
import { Typography } from '../Typography';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

const setup = (props) =>
  render(
    <ThemeProvider theme={lightTheme}>
      <Typography {...props} />
    </ThemeProvider>,
  );

describe('Typography', () => {
  test('textAlign', async () => {
    const { container } = setup({
      children: 'Test',
      textAlign: 'center',
    });

    expect(container).toMatchSnapshot();
  });

  test('textTransform', () => {
    const { container } = setup({
      children: 'Test',
      textTransform: 'uppercase',
    });

    expect(container).toMatchSnapshot();
  });
});
