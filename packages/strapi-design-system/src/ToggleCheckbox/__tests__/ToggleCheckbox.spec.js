import * as React from 'react';
import { render } from '@testing-library/react';
import { ToggleCheckbox } from '../ToggleCheckbox';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('ToggleCheckbox', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <ToggleCheckbox onLabel={'On'} offLabel={'Off'} checked={true} onChange={() => {}}>
          The field is required?
        </ToggleCheckbox>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c6 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c9 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #271fe0;
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

      .c2 {
        background: #ffffff;
        border-radius: 4px;
      }

      .c4 {
        padding-top: 12px;
        padding-right: 32px;
        padding-bottom: 12px;
        padding-left: 32px;
      }

      .c7 {
        background: #f0f0ff;
        padding-top: 12px;
        padding-right: 32px;
        padding-bottom: 12px;
        padding-left: 32px;
      }

      .c3 {
        border: 1px solid #dcdce4;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        overflow: hidden;
      }

      .c0:active,
      .c0:focus-within {
        outline: 2px solid #4945ff;
        outline-offset: 2px;
      }

      .c8 {
        text-transform: uppercase;
      }

      .c5 {
        text-transform: uppercase;
        border-right: 1px solid #dcdce4;
      }

      <label
        class="c0"
      >
        <div
          class="c1"
        >
          The field is required?
          <input
            checked=""
            type="checkbox"
          />
        </div>
        <div
          aria-hidden="true"
          class="c2 c3"
        >
          <div
            class="c4 c5"
          >
            <span
              class="c6"
            >
              Off
            </span>
          </div>
          <div
            class="c7 c8"
          >
            <span
              class="c9"
            >
              On
            </span>
          </div>
        </div>
      </label>
    `);
  });
});
