import * as React from 'react';
import { render } from '@testing-library/react';
import { IconButton } from '../IconButton';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('IconButton', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <IconButton />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(``);
  });
});
