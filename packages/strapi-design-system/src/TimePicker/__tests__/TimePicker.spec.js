import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimePicker } from '../TimePicker';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('TimePicker', () => {
  it('snapshots the component by default', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TimePicker
          label="Choose a time"
          disabled={false}
          error={undefined}
          hint="Description line"
          onClear={() => {}}
          onChange={() => {}}
          value="11:32:45"
          clearLabel="Clear the selected time picker value"
          selectButtonTitle="Select time button"
        />
      </ThemeProvider>,
      { container: document.body },
    );

    const button = screen.getByRole('combobox');

    await user.click(button);

    await waitFor(() => screen.getByText('00:00'));

    expect(container).toMatchInlineSnapshot(`
      .c18 {
        width: 100%;
        height: 1px;
      }

      .c0 {
        -webkit-align-items: stretch;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c4 {
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

      .c6 {
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
        gap: 16px;
      }

      .c9 {
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
        gap: 12px;
      }

      .c3 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #32324d;
      }

      .c8 {
        font-size: 0.875rem;
        line-height: 1.43;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #32324d;
      }

      .c12 {
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c17 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c1 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c1 > * + * {
        margin-top: 4px;
      }

      .c13 {
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

      .c5 {
        position: relative;
        border: 1px solid #dcdce4;
        padding-right: 12px;
        padding-left: 12px;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
        min-height: 2.5rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        gap: 16px;
        outline: none;
        box-shadow: 0;
        -webkit-transition-property: border-color,box-shadow,fill;
        transition-property: border-color,box-shadow,fill;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
      }

      .c5[aria-disabled='true'] {
        color: #666687;
        background: #eaeaef;
      }

      .c5:focus-visible {
        outline: none;
      }

      .c5:focus-visible {
        border: 1px solid #4945ff;
        box-shadow: #4945ff 0px 0px 0px 2px;
      }

      .c11 > svg {
        width: 0.375rem;
      }

      .c11 > svg > path {
        fill: #666687;
      }

      .c14 {
        background: #ffffff;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        border: 1px solid #eaeaef;
        border-radius: 4px;
        width: var(--radix-select-trigger-width);
        max-height: 15rem;
      }

      .c15 {
        padding: 4px;
      }

      .c10 {
        background: transparent;
        border: none;
        border-radius: 4px;
      }

      .c10 svg {
        height: 0.6875rem;
        width: 0.6875rem;
      }

      .c10 svg path {
        fill: #666687;
      }

      .c16 {
        width: 100%;
        border: none;
        text-align: left;
        outline-offset: -3px;
        border-radius: 4px;
        padding: 8px 16px;
        padding-left: 16px;
        background-color: #ffffff;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c16:focus-visible {
        outline: none;
        background-color: #f0f0ff;
      }

      .c16:hover {
        background-color: #f0f0ff;
      }

      .c16[data-state='checked'] .c2 {
        font-weight: bold;
        color: #4945ff;
      }

      .c7 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c7 svg {
        height: 1rem;
        width: 1rem;
      }

      .c7 svg path {
        fill: #8e8ea9;
      }

      <body
        style="pointer-events: none;"
      >
        <span
          aria-hidden="true"
          data-aria-hidden="true"
          data-radix-focus-guard=""
          style="outline: none; opacity: 0; position: fixed; pointer-events: none;"
          tabindex="0"
        />
        <div
          aria-hidden="true"
          data-aria-hidden="true"
        >
          <div
            class="c0 c1"
          >
            <label
              class="c2 c3"
              for="2"
            >
              <div
                class="c4"
              >
                Choose a time
              </div>
            </label>
            <button
              aria-autocomplete="none"
              aria-controls="radix-0"
              aria-disabled="false"
              aria-expanded="true"
              aria-labelledby="2-hint 2-error"
              aria-required="false"
              class="c5"
              data-state="open"
              dir="ltr"
              id="2"
              role="combobox"
              type="button"
            >
              <span
                class="c6"
              >
                <span
                  aria-hidden="true"
                  class=""
                >
                  <div
                    class="c7"
                  >
                    <svg
                      fill="none"
                      height="1em"
                      viewBox="0 0 24 24"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M0 12C0 5.37 5.364 0 11.994 0S24 5.37 24 12s-5.376 12-12.006 12S0 18.63 0 12zm2.4 0c0 5.304 4.296 9.6 9.6 9.6 5.304 0 9.6-4.296 9.6-9.6 0-5.304-4.296-9.6-9.6-9.6A9.597 9.597 0 002.4 12zm8.4-6h1.8v6.3l5.4 3.204-.906 1.476L10.8 13.2V6z"
                        fill="#212134"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                </span>
                <span
                  class="c2 c8"
                >
                  <span
                    aria-label="11:30"
                    style="pointer-events: none;"
                  >
                    11:30
                  </span>
                </span>
              </span>
              <span
                class="c9"
              >
                <div
                  aria-disabled="false"
                  aria-label="Clear the selected time picker value"
                  class="c10"
                  role="button"
                  tabindex="0"
                  title="Clear the selected time picker value"
                >
                  <svg
                    fill="none"
                    height="1em"
                    viewBox="0 0 24 24"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 2.417L21.583 0 12 9.583 2.417 0 0 2.417 9.583 12 0 21.583 2.417 24 12 14.417 21.583 24 24 21.583 14.417 12 24 2.417z"
                      fill="#212134"
                    />
                  </svg>
                </div>
                <span
                  aria-hidden="true"
                  class="c11"
                >
                  <svg
                    fill="none"
                    height="1em"
                    viewBox="0 0 14 8"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
                      fill="#32324D"
                      fill-rule="evenodd"
                    />
                  </svg>
                </span>
              </span>
            </button>
            <p
              class="c2 c12"
              id="2-hint"
            >
              Description line
            </p>
          </div>
        </div>
        <div
          class="c13"
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
        <div
          data-radix-popper-content-wrapper=""
          dir="ltr"
          style="position: fixed; left: 0px; top: 0px; transform: translate3d(0px, 4px, 0); min-width: max-content; --radix-popper-anchor-width: 0px; --radix-popper-anchor-height: 0px; --radix-popper-available-width: -10px; --radix-popper-available-height: -14px; --radix-popper-transform-origin: 0% 0px;"
        >
          <div
            class="c14"
            data-align="start"
            data-side="bottom"
            data-state="open"
            dir="ltr"
            id="radix-0"
            role="listbox"
            style="box-sizing: border-box; display: flex; flex-direction: column; outline: none; --radix-select-content-transform-origin: var(--radix-popper-transform-origin); --radix-select-content-available-width: var(--radix-popper-available-width); --radix-select-content-available-height: var(--radix-popper-available-height); --radix-select-trigger-width: var(--radix-popper-anchor-width); --radix-select-trigger-height: var(--radix-popper-anchor-height); pointer-events: auto;"
            tabindex="-1"
          >
            <style>
              [data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}
            </style>
            <div
              class="c15"
              data-radix-select-viewport=""
              role="presentation"
              style="position: relative; flex: 1; overflow: auto;"
            >
              <div
                aria-labelledby="radix-97"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-97"
                  >
                    00:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-98"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-98"
                  >
                    00:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-99"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-99"
                  >
                    00:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-100"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-100"
                  >
                    00:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-101"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-101"
                  >
                    01:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-102"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-102"
                  >
                    01:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-103"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-103"
                  >
                    01:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-104"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-104"
                  >
                    01:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-105"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-105"
                  >
                    02:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-106"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-106"
                  >
                    02:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-107"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-107"
                  >
                    02:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-108"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-108"
                  >
                    02:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-109"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-109"
                  >
                    03:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-110"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-110"
                  >
                    03:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-111"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-111"
                  >
                    03:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-112"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-112"
                  >
                    03:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-113"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-113"
                  >
                    04:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-114"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-114"
                  >
                    04:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-115"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-115"
                  >
                    04:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-116"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-116"
                  >
                    04:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-117"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-117"
                  >
                    05:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-118"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-118"
                  >
                    05:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-119"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-119"
                  >
                    05:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-120"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-120"
                  >
                    05:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-121"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-121"
                  >
                    06:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-122"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-122"
                  >
                    06:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-123"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-123"
                  >
                    06:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-124"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-124"
                  >
                    06:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-125"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-125"
                  >
                    07:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-126"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-126"
                  >
                    07:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-127"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-127"
                  >
                    07:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-128"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-128"
                  >
                    07:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-129"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-129"
                  >
                    08:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-130"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-130"
                  >
                    08:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-131"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-131"
                  >
                    08:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-132"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-132"
                  >
                    08:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-133"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-133"
                  >
                    09:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-134"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-134"
                  >
                    09:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-135"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-135"
                  >
                    09:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-136"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-136"
                  >
                    09:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-137"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-137"
                  >
                    10:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-138"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-138"
                  >
                    10:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-139"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-139"
                  >
                    10:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-140"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-140"
                  >
                    10:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-141"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-141"
                  >
                    11:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-142"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-142"
                  >
                    11:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-143"
                aria-selected="true"
                class="c16"
                data-highlighted=""
                data-radix-collection-item=""
                data-state="checked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-143"
                  >
                    11:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-144"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-144"
                  >
                    11:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-145"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-145"
                  >
                    12:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-146"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-146"
                  >
                    12:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-147"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-147"
                  >
                    12:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-148"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-148"
                  >
                    12:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-149"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-149"
                  >
                    13:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-150"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-150"
                  >
                    13:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-151"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-151"
                  >
                    13:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-152"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-152"
                  >
                    13:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-153"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-153"
                  >
                    14:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-154"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-154"
                  >
                    14:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-155"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-155"
                  >
                    14:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-156"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-156"
                  >
                    14:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-157"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-157"
                  >
                    15:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-158"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-158"
                  >
                    15:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-159"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-159"
                  >
                    15:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-160"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-160"
                  >
                    15:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-161"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-161"
                  >
                    16:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-162"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-162"
                  >
                    16:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-163"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-163"
                  >
                    16:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-164"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-164"
                  >
                    16:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-165"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-165"
                  >
                    17:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-166"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-166"
                  >
                    17:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-167"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-167"
                  >
                    17:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-168"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-168"
                  >
                    17:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-169"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-169"
                  >
                    18:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-170"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-170"
                  >
                    18:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-171"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-171"
                  >
                    18:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-172"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-172"
                  >
                    18:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-173"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-173"
                  >
                    19:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-174"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-174"
                  >
                    19:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-175"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-175"
                  >
                    19:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-176"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-176"
                  >
                    19:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-177"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-177"
                  >
                    20:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-178"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-178"
                  >
                    20:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-179"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-179"
                  >
                    20:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-180"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-180"
                  >
                    20:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-181"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-181"
                  >
                    21:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-182"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-182"
                  >
                    21:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-183"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-183"
                  >
                    21:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-184"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-184"
                  >
                    21:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-185"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-185"
                  >
                    22:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-186"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-186"
                  >
                    22:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-187"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-187"
                  >
                    22:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-188"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-188"
                  >
                    22:45
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-189"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-189"
                  >
                    23:00
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-190"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-190"
                  >
                    23:15
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-191"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-191"
                  >
                    23:30
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-192"
                aria-selected="false"
                class="c16"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    id="radix-192"
                  >
                    23:45
                  </span>
                </span>
              </div>
              <div
                class="c18"
                height="1px"
                id="intersection-2"
                width="100%"
              />
            </div>
          </div>
        </div>
        <span
          aria-hidden="true"
          data-aria-hidden="true"
          data-radix-focus-guard=""
          style="outline: none; opacity: 0; position: fixed; pointer-events: none;"
          tabindex="0"
        />
      </body>
    `);
  });
});
