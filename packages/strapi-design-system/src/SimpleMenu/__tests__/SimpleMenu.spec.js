import * as React from 'react';
import { render } from '@testing-library/react';
import { SimpleMenu } from '../SimpleMenu';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('SimpleMenu', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <SimpleMenu />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot();
  });
});
