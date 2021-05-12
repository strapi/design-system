import * as React from 'react';
import { render } from '@testing-library/react';
import { Switch } from '../Switch';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Switch', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Switch />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(``);
  });
});
