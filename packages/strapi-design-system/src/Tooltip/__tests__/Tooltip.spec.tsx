import { render, fireEvent, screen } from '@test/utils';

import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('snapshots document.body when the tooltip is not visible but exists in the DOM', () => {
    render(
      <Tooltip description="Content of the tooltip fefe">
        <button type="button">Show tooltip</button>
      </Tooltip>,
    );

    expect(document.body).toMatchInlineSnapshot(`
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

      .c1 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
        position: absolute;
      }

      .c3 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c2 {
        z-index: 4;
        display: none;
      }

      <body>
        <div>
          <span>
            <button
              aria-describedby=":r0:"
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
          class=""
        >
          <div
            class="c1 c2"
            id=":r0:"
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
      <Tooltip description="Content of the tooltip fefe">
        <button type="button">Show tooltip</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByText('Show tooltip'));

    expect(document.body).toMatchInlineSnapshot(`
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

      .c1 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
        position: absolute;
      }

      .c3 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c2 {
        z-index: 4;
        display: revert;
      }

      <body>
        <div>
          <span>
            <button
              aria-describedby=":r2:"
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
          class=""
        >
          <div
            class="c1 c2"
            id=":r2:"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <div
              class="c0"
              id=":r3:"
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
      <Tooltip label="Content of the tooltip fefe">
        <button type="button">+</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByText('+'));

    expect(document.body).toMatchInlineSnapshot(`
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

      .c1 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
        position: absolute;
      }

      .c3 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c2 {
        z-index: 4;
        display: revert;
      }

      <body>
        <div>
          <span>
            <button
              aria-labelledby=":r4:"
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
          class=""
        >
          <div
            class="c1 c2"
            id=":r4:"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <div
              class="c0"
              id=":r5:"
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
