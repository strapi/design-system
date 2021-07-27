import * as React from 'react';
import { render } from '@testing-library/react';
import { FocusTrap } from '../FocusTrap';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('FocusTrap', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <FocusTrap onEscape={() => undefined}>
          <div>Focus scoped</div>
        </FocusTrap>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <div>
          Focus scoped
        </div>
      </div>
    `);
  });
});
