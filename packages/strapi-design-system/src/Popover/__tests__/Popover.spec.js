import * as React from 'react';
import { render } from '@testing-library/react';
import { Popover } from '../Popover';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Popover', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Popover />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(``);
  });
});
