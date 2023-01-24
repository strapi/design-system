import { render } from '@testing-library/react';

import { Typography, TypographyProps } from '../Typography';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

const setup = (props: TypographyProps) =>
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
