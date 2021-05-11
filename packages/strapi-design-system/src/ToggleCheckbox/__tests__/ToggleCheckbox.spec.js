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
      .c7 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c10 {
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

      .c3 {
        background: #ffffff;
        border-radius: 4px;
      }

      .c5 {
        padding-top: 12px;
        padding-right: 32px;
        padding-bottom: 12px;
        padding-left: 32px;
      }

      .c8 {
        background: #f0f0ff;
        padding-top: 12px;
        padding-right: 32px;
        padding-bottom: 12px;
        padding-left: 32px;
      }

      .c0 {
        position: relative;
        display: inline-block;
      }

      .c0:active,
      .c0:focus-within {
        outline: 2px solid #4945ff;
        outline-offset: 2px;
      }

      .c4 {
        position: relative;
        z-index: 1;
        border: 1px solid #dcdce4;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        overflow: hidden;
      }

      .c9 {
        text-transform: uppercase;
      }

      .c6 {
        text-transform: uppercase;
        border-right: 1px solid #dcdce4;
      }

      .c2 {
        position: absolute;
        left: 4px;
        top: 4px;
      }

      <label
        class="c0"
      >
        <div
          class="c1"
        >
          The field is required?
        </div>
        <input
          checked=""
          class="c2"
          type="checkbox"
        />
        <div
          aria-hidden="true"
          class="c3 c4"
        >
          <div
            class="c5 c6"
          >
            <span
              class="c7"
            >
              Off
            </span>
          </div>
          <div
            class="c8 c9"
          >
            <span
              class="c10"
            >
              On
            </span>
          </div>
        </div>
      </label>
    `);
  });
});
