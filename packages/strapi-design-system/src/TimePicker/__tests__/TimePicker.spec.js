import * as React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { TimePicker } from '../TimePicker';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('TimePicker', () => {
  it('snapshots the component by default', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TimePicker
          label={'Choose a time'}
          disabled={false}
          error={undefined}
          hint={'Description line'}
          onClear={() => {}}
          onChange={() => {}}
          value={'11:32:45'}
          clearLabel={'Clear the selected time picker value'}
        />
      </ThemeProvider>,
      { container: document.body },
    );

    fireEvent.mouseDown(container.querySelector('#timepicker-1'));

    await waitFor(() => screen.getAllByText('00'));

    expect(container).toMatchInlineSnapshot(`
      .c5 {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        background: transparent;
        border: none;
      }

      .c5:focus {
        outline: none;
      }

      .c5[aria-disabled='true'] {
        cursor: not-allowed;
      }

      .c8 {
        padding-left: 12px;
      }

      .c10 {
        padding-right: 16px;
        padding-left: 16px;
      }

      .c16 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c21 {
        background: #ffffff;
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 16px;
        border-radius: 4px;
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

      .c3 {
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
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .c2 {
        font-weight: 600;
        color: #32324d;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c11 {
        color: #32324d;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c14 {
        color: #666687;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c23 {
        color: #32324d;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c24 {
        font-weight: 600;
        color: #4945ff;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c17 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        position: absolute;
        z-index: 4;
        border: 1px solid #eaeaef;
        background: #ffffff;
      }

      .c18 {
        max-height: 15rem;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .c18::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 4px;
      }

      .c18::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c18::-webkit-scrollbar-thumb {
        background: #eaeaef;
        border-radius: 4px;
        margin-right: 10px;
      }

      .c1 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c1 > * + * {
        margin-top: 4px;
      }

      .c4 {
        position: relative;
        border: 1px solid #dcdce4;
        padding-right: 12px;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
        min-height: 2.5rem;
        outline: none;
        box-shadow: 0;
        -webkit-transition-property: border-color,box-shadow,fill;
        transition-property: border-color,box-shadow,fill;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
      }

      .c4:focus-within {
        border: 1px solid #4945ff;
        box-shadow: #4945ff 0px 0px 0px 2px;
      }

      .c12 {
        background: transparent;
        border: none;
        position: relative;
        z-index: 1;
      }

      .c12 svg {
        height: 0.6875rem;
        width: 0.6875rem;
      }

      .c12 svg path {
        fill: #666687;
      }

      .c13 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        background: none;
        border: none;
      }

      .c13 svg {
        width: 0.375rem;
      }

      .c15 {
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

      .c19 {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 0px;
      }

      .c7 {
        width: 100%;
      }

      .c20 {
        min-height: 0;
      }

      .c20 > * {
        min-height: 0;
        overflow-y: auto;
      }

      .c20 > *:first-child {
        border-right: 1px solid #eaeaef;
      }

      .c22 {
        width: 100%;
        border: none;
        text-align: left;
        outline-offset: -3px;
      }

      .c22.is-focused {
        background: #f0f0ff;
      }

      .c22:hover {
        background: #f0f0ff;
      }

      .c9 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c9 svg {
        height: 1rem;
        width: 1rem;
      }

      .c9 svg path {
        fill: #8e8ea9;
      }

      <body>
        <div>
          <div
            class="c0 c1"
            spacing="1"
          >
            <span
              class="c2"
              for="timepicker-1"
              id="timepicker-1-label"
            >
              <div
                class="c3"
              >
                Choose a time
              </div>
            </span>
            <div
              class="c3 c4"
            >
              <button
                aria-describedby="timepicker-1-hint"
                aria-disabled="false"
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="timepicker-1-label timepicker-1-content"
                class="c5"
                id="timepicker-1"
                type="button"
              />
              <div
                class="c6 c7"
              >
                <div
                  class="c3"
                >
                  <div
                    aria-hidden="true"
                    class="c8"
                  >
                    <div
                      class="c9"
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
                  </div>
                  <div
                    class="c10"
                  >
                    <span
                      class="c11"
                      id="timepicker-1-content"
                    >
                      11:30
                    </span>
                  </div>
                </div>
                <div
                  class="c3"
                >
                  <button
                    aria-disabled="false"
                    aria-label="Clear the selected time picker value"
                    class="c12"
                    type="button"
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
                  <button
                    aria-hidden="true"
                    class="c8 c12 c13"
                    tabindex="-1"
                    type="button"
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
                  </button>
                </div>
              </div>
            </div>
            <p
              class="c14"
              id="timepicker-1-hint"
            >
              Description line
            </p>
          </div>
        </div>
        <div
          class="c15"
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
          data-react-portal="true"
        >
          <div
            class="c16 c17"
            style="left: 0px; top: 4px;"
          >
            <div
              class="c18"
              style="overflow-y: hidden; display: flex; flex-direction: column;"
            >
              <div
                class="c19 c20"
              >
                <ul
                  aria-labelledby="timepicker-1-label"
                  aria-multiselectable="false"
                  class="c0 c1"
                  role="listbox"
                  spacing="1"
                  tabindex="-1"
                >
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="00"
                    id="timepicker-1-option-00"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        00
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="01"
                    id="timepicker-1-option-01"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        01
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="02"
                    id="timepicker-1-option-02"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        02
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="03"
                    id="timepicker-1-option-03"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        03
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="04"
                    id="timepicker-1-option-04"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        04
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="05"
                    id="timepicker-1-option-05"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        05
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="06"
                    id="timepicker-1-option-06"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        06
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="07"
                    id="timepicker-1-option-07"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        07
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="08"
                    id="timepicker-1-option-08"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        08
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="09"
                    id="timepicker-1-option-09"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        09
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="10"
                    id="timepicker-1-option-10"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        10
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="true"
                    class="c21 c22"
                    data-strapi-value="11"
                    id="timepicker-1-option-11"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c24"
                      >
                        11
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="12"
                    id="timepicker-1-option-12"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        12
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="13"
                    id="timepicker-1-option-13"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        13
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="14"
                    id="timepicker-1-option-14"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        14
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="15"
                    id="timepicker-1-option-15"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        15
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="16"
                    id="timepicker-1-option-16"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        16
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="17"
                    id="timepicker-1-option-17"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        17
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="18"
                    id="timepicker-1-option-18"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        18
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="19"
                    id="timepicker-1-option-19"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        19
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="20"
                    id="timepicker-1-option-20"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        20
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="21"
                    id="timepicker-1-option-21"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        21
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="22"
                    id="timepicker-1-option-22"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        22
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="23"
                    id="timepicker-1-option-23"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        23
                      </span>
                    </div>
                  </li>
                </ul>
                <ul
                  aria-labelledby="timepicker-1-label"
                  aria-multiselectable="false"
                  class="c0 c1"
                  role="listbox"
                  spacing="1"
                  tabindex="-1"
                >
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="00"
                    id="timepicker-1-option-00"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        00
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="15"
                    id="timepicker-1-option-15"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        15
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="true"
                    class="c21 c22"
                    data-strapi-value="30"
                    id="timepicker-1-option-30"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c24"
                      >
                        30
                      </span>
                    </div>
                  </li>
                  <li
                    aria-selected="false"
                    class="c21 c22"
                    data-strapi-value="45"
                    id="timepicker-1-option-45"
                    role="option"
                  >
                    <div
                      class="c3"
                    >
                      <span
                        class="c23"
                      >
                        45
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </body>
    `);
  });
});
