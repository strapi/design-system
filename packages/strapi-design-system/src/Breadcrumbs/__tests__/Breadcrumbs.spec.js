import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Breadcrumbs', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Breadcrumbs />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(``);
  });
});
