import * as React from 'react';
import { render } from '@testing-library/react';
import { Row } from '../Row';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Row', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Row>
          <div>Hello</div>
          <div>World</div>
        </Row>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-bdfBwQ klfjbK"
      >
        <div>
          Hello
        </div>
        <div>
          World
        </div>
      </div>
    `);
  });
});
