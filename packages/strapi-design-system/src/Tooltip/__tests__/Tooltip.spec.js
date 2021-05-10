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
        <Tooltip description="Content of the tooltip fefe">
          <button>Show tooltip</button>
        </Tooltip>
      </ThemeProvider>,
    );

    expect(document.body).toMatchInlineSnapshot(`
      .c0 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c2 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #ffffff;
      }

      .c1 {
        position: absolute;
        display: none;
      }

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
            class="c0 c1"
            id="tooltip-123"
            role="tooltip"
          >
            <p
              class="c2"
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
        <Tooltip description="Content of the tooltip fefe">
          <button>Show tooltip</button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.focus(screen.getByText('Show tooltip'));

    expect(document.body).toMatchInlineSnapshot(`
      <body>
        <div>
          <button
            aria-describedby="description-123"
            tabindex="0"
          >
            Show tooltip
          </button>
        </div>
        .c0 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c3 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #ffffff;
      }

      .c2 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .c1 {
        position: absolute;
        display: revert;
      }

      <div
          data-react-portal="true"
        >
          <div
            class="c0 c1"
            id="tooltip-123"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <div
              class="c2"
              id="description-123"
            />
            <p
              class="c3"
            >
              Content of the tooltip fefe
            </p>
          </div>
        </div>
      </body>
    `);
  });

  it('snapshots document.body with a label', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Tooltip label="Content of the tooltip fefe">
          <button>+</button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.focus(screen.getByText('+'));

    expect(document.body).toMatchInlineSnapshot(`
      <body>
        <div>
          <button
            aria-labelledby="tooltip-123"
            tabindex="0"
          >
            +
          </button>
        </div>
        .c0 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c2 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #ffffff;
      }

      .c1 {
        position: absolute;
        display: revert;
      }

      <div
          data-react-portal="true"
        >
          <div
            class="c0 c1"
            id="tooltip-123"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <p
              class="c2"
            >
              Content of the tooltip fefe
            </p>
          </div>
        </div>
      </body>
    `);
  });
});
