import * as React from 'react';
import { render } from '@testing-library/react';
import { Portal } from '../Portal';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Portal', () => {
  it('snapshots the component', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Portal>Hello world</Portal>
      </ThemeProvider>,
    );

    expect(document.body).toMatchInlineSnapshot(`
      <body>
        <div />
        <div
          data-react-portal="true"
        >
          Hello world
        </div>
      </body>
    `);
  });
});
