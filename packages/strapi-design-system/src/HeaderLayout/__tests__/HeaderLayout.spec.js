import * as React from 'react';
import { render } from '@testing-library/react';
import { HeaderLayout } from '../HeaderLayout';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('HeaderLayout', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <HeaderLayout />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot();
  });
});
