import * as React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../Button';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Button', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Button>Hello world</Button>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <button
        class="sc-bdfBwQ bwpTOf"
      >
        Hello world
      </button>
    `);
  });
});
