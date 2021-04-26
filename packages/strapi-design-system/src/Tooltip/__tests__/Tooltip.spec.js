import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Tooltip } from '../Tooltip';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('../../helpers/genId', () => ({
  genId: () => 123,
}));

describe('Tooltip', () => {
  it('snapshots document.body when the tooltip is not shown (aria-describedby does not exist)', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Tooltip content="Content of the tooltip fefe">
          <button>Show tooltip</button>
        </Tooltip>
      </ThemeProvider>,
    );

    expect(document.body).toMatchInlineSnapshot(`
      <body>
        <div>
          <button
            tabindex="0"
          >
            Show tooltip
          </button>
        </div>
        <div
          data-react-portal="true"
        >
          <div
            class="sc-bdfBwQ sc-fubCfw bLVzZs bNBJAY"
            id="tooltip-123"
            role="tooltip"
          >
            <p
              class="sc-eCssSg cOhdbs"
            >
              Content of the tooltip fefe
            </p>
          </div>
        </div>
      </body>
    `);
  });

  it('snapshots document.body when the button is focused (aria-describedby exists)', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Tooltip content="Content of the tooltip fefe">
          <button>Show tooltip</button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.focus(screen.getByText('Show tooltip'));

    expect(document.body).toMatchInlineSnapshot(`
      <body>
        <div>
          <button
            aria-describedby="tooltip-123"
            tabindex="0"
          >
            Show tooltip
          </button>
        </div>
        <div
          data-react-portal="true"
        >
          <div
            class="sc-bdfBwQ sc-fubCfw bLVzZs dfOJIk"
            id="tooltip-123"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <p
              class="sc-eCssSg cOhdbs"
            >
              Content of the tooltip fefe
            </p>
          </div>
        </div>
      </body>
    `);
  });
});
