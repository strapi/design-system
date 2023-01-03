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
      .c2 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c0 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c4 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c1 {
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

      .c3 {
        position: absolute;
        z-index: 4;
        display: none;
      }

      <body>
        <div>
          <div
            class="c0"
          >
            <button
              aria-describedby="tooltip-123"
              tabindex="0"
              type="button"
            >
              Show tooltip
            </button>
          </div>
          <div
            class="c1"
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
            class="c2 c3"
            id="tooltip-123"
            role="tooltip"
          >
            <p
              class="c4"
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
      .c2 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c0 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c4 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c1 {
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

      .c3 {
        position: absolute;
        z-index: 4;
        display: revert;
      }

      <body>
        <div>
          <div
            class="c0"
          >
            <button
              aria-describedby="tooltip-123"
              tabindex="0"
              type="button"
            >
              Show tooltip
            </button>
          </div>
          <div
            class="c1"
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
            class="c2 c3"
            id="tooltip-123"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <div
              class="c1"
              id="description-123"
            >
              Content of the tooltip fefe
            </div>
            <p
              class="c4"
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
      .c2 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c0 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c4 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c1 {
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

      .c3 {
        position: absolute;
        z-index: 4;
        display: revert;
      }

      <body>
        <div>
          <div
            class="c0"
          >
            <button
              aria-labelledby="tooltip-123"
              tabindex="0"
              type="button"
            >
              +
            </button>
          </div>
          <div
            class="c1"
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
            class="c2 c3"
            id="tooltip-123"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <div
              class="c1"
              id="description-123"
            />
            <p
              class="c4"
            >
              Content of the tooltip fefe
            </p>
          </div>
        </div>
      </body>
    `);
  });
});
