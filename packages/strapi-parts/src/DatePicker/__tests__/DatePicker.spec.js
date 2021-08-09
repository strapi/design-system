import * as React from 'react';
import { render } from '@testing-library/react';
import { DatePicker } from '../DatePicker';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('DatePicker', () => {
  const defaultIntlFormat = window.Intl.DateTimeFormat;

  beforeEach(() => {
    window.Intl.DateTimeFormat = () => ({
      format: () => 1,
    });
  });

  afterEach(() => {
    window.Intl.DateTimeFormat = defaultIntlFormat;
  });

  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <DatePicker
          onChange={() => {}}
          selectedDate={new Date(1, 0, 2021)}
          label="Date picker"
          name="datepicker"
          clearLabel={'Clear the datepicker'}
          onClear={() => {}}
          selectedDateLabel={(formattedDate) => `Date picker, current is ${formattedDate}`}
        />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c4 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c6 {
        padding-right: 8px;
        padding-left: 12px;
      }

      .c9 {
        padding-right: 12px;
        padding-left: 8px;
      }

      .c8 {
        border: none;
        padding-left: 0;
        padding-right: 0;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
        height: 2.5rem;
      }

      .c8::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c8::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c8:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c8::placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c8:disabled {
        background: inherit;
        color: inherit;
      }

      .c8:focus {
        outline: none;
      }

      .c5 {
        border: 1px solid #dcdce4;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
      }

      .c5:focus-within {
        border: 1px solid #4945ff;
      }

      .c1 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c1 > * + * {
        margin-top: 4px;
      }

      .c0 textarea {
        height: 5rem;
      }

      .c7 {
        border: none;
        background: transparent;
        border-radius: 4px;
      }

      .c7 svg path {
        fill: #8e8ea9;
      }

      .c10 {
        background: transparent;
        border: none;
        position: relative;
        z-index: 1;
      }

      .c10 svg {
        height: 0.6875rem;
        width: 0.6875rem;
      }

      .c10 svg path {
        fill: #666687;
      }

      <div
        class=""
      >
        <div
          class="c0"
        >
          <div>
            <div
              class="c1"
            >
              <div
                class="c2"
              >
                <label
                  class="c3"
                  for="datepicker-1"
                >
                  Date picker
                </label>
              </div>
              <div
                class="c4 c5"
              >
                <div
                  class="c6"
                >
                  <button
                    aria-label="Date picker, current is 1"
                    class="c7"
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="1em"
                      viewBox="0 0 24 24"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M3.869 2.99V0h2.9v2.99h10.463V0h2.9v2.99h.629c2.768 0 3.203.498 3.239 2.926V21c0 2.124-.191 3-2.802 3H2.818C.208 24 0 23.363 0 20.785V6.21c.035-2.049.233-3.22 3.001-3.22h.868zM2.32 20.369c0 .811.245.865.776.865h17.905c.53 0 .68-.012.68-.825V8.233c-.015-.627-.219-.737-.631-.737H2.907c-.413 0-.592.09-.587.573v12.3z"
                        fill="#212134"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <input
                  aria-autocomplete="none"
                  aria-invalid="false"
                  class="c8"
                  id="datepicker-1"
                  name="datepicker"
                  placeholder="1"
                  value="1"
                />
                <div
                  class="c9"
                >
                  <button
                    aria-disabled="false"
                    aria-label="Clear the datepicker"
                    class="c10"
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
