import * as React from 'react';
import { render } from '@testing-library/react';
import { Tree } from '../Tree';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Tree', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Tree />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot();
  });
});
