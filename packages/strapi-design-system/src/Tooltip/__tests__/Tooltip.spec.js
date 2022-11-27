import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Tooltip } from '../Tooltip';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('../../helpers/genId', () => ({
  genId: () => 123,
}));

describe('Tooltip', () => {
  it('snapshots document.body when the tooltip is not visible but exists in the DOM', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Tooltip description="Content of the tooltip fefe">
          <button type="button">Show tooltip</button>
        </Tooltip>
      </ThemeProvider>,
    );

    expect(document.body).toMatchInlineSnapshot(`
      .c1 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c3 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c0 {
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

      .c2 {
        position: absolute;
        z-index: 4;
        display: none;
      }

      <body>
        <div>
          <span>
            <button
              aria-describedby="tooltip-123"
              tabindex="0"
              type="button"
            >
              Show tooltip
            </button>
          </span>
          <div
            class="c0"
          >
            <p
              aria-live="polite"
              aria-relevant="all"
              id="live-region-log"
              role="log"
            />
            <p
              aria-live="polite"
              aria-relevant="all"
              id="live-region-status"
              role="status"
            />
            <p
              aria-live="assertive"
              aria-relevant="all"
              id="live-region-alert"
              role="alert"
            />
          </div>
        </div>
        <div
          data-react-portal="true"
        >
          <div
            class="c1 c2"
            id="tooltip-123"
            role="tooltip"
          >
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

  it('snapshots document.body when the button is focused (aria-describedby exists)', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Tooltip description="Content of the tooltip fefe">
          <button type="button">Show tooltip</button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.focus(screen.getByText('Show tooltip'));

    expect(document.body).toMatchInlineSnapshot(`
      .c1 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c3 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c0 {
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

      .c2 {
        position: absolute;
        z-index: 4;
        display: revert;
      }

      <body>
        <div>
          <span>
            <button
              aria-describedby="tooltip-123"
              tabindex="0"
              type="button"
            >
              Show tooltip
            </button>
          </span>
          <div
            class="c0"
          >
            <p
              aria-live="polite"
              aria-relevant="all"
              id="live-region-log"
              role="log"
            />
            <p
              aria-live="polite"
              aria-relevant="all"
              id="live-region-status"
              role="status"
            />
            <p
              aria-live="assertive"
              aria-relevant="all"
              id="live-region-alert"
              role="alert"
            />
          </div>
        </div>
        <div
          data-react-portal="true"
        >
          <div
            class="c1 c2"
            id="tooltip-123"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <div
              class="c0"
              id="description-123"
            >
              Content of the tooltip fefe
            </div>
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
          <button type="button">+</button>
        </Tooltip>
      </ThemeProvider>,
    );

    fireEvent.focus(screen.getByText('+'));

    expect(document.body).toMatchInlineSnapshot(`
      .c1 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c3 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c0 {
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

      .c2 {
        position: absolute;
        z-index: 4;
        display: revert;
      }

      <body>
        <div>
          <span>
            <button
              aria-labelledby="tooltip-123"
              tabindex="0"
              type="button"
            >
              +
            </button>
          </span>
          <div
            class="c0"
          >
            <p
              aria-live="polite"
              aria-relevant="all"
              id="live-region-log"
              role="log"
            />
            <p
              aria-live="polite"
              aria-relevant="all"
              id="live-region-status"
              role="status"
            />
            <p
              aria-live="assertive"
              aria-relevant="all"
              id="live-region-alert"
              role="alert"
            />
          </div>
        </div>
        <div
          data-react-portal="true"
        >
          <div
            class="c1 c2"
            id="tooltip-123"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <div
              class="c0"
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
});
