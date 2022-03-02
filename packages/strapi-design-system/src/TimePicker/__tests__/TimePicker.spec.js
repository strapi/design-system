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

    await waitFor(() => screen.getByText('00:00'));

    expect(container).toMatchInlineSnapshot(`
      .c4 {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        background: transparent;
        border: none;
      }

      .c4:focus {
        outline: none;
      }

      .c4[aria-disabled='true'] {
        cursor: not-allowed;
      }

      .c7 {
        padding-left: 12px;
      }

      .c9 {
        padding-right: 16px;
        padding-left: 16px;
      }

      .c15 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c18 {
        background: #ffffff;
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 16px;
        border-radius: 4px;
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

      .c5 {
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

      .c1 {
        font-weight: 600;
        color: #32324d;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c10 {
        color: #32324d;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c13 {
        color: #666687;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c20 {
        color: #32324d;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c21 {
        font-weight: 600;
        color: #4945ff;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c16 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        position: absolute;
        z-index: 4;
        border: 1px solid #eaeaef;
        background: #ffffff;
      }

      .c17 {
        max-height: 15rem;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .c17::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 4px;
      }

      .c17::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c17::-webkit-scrollbar-thumb {
        background: #eaeaef;
        border-radius: 4px;
        margin-right: 10px;
      }

      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 4px;
      }

      .c3 {
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

      .c3:focus-within {
        border: 1px solid #4945ff;
        box-shadow: #4945ff 0px 0px 0px 2px;
      }

      .c11 {
        background: transparent;
        border: none;
        position: relative;
        z-index: 1;
      }

      .c11 svg {
        height: 0.6875rem;
        width: 0.6875rem;
      }

      .c11 svg path {
        fill: #666687;
      }

      .c12 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        background: none;
        border: none;
      }

      .c12 svg {
        width: 0.375rem;
      }

      .c14 {
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

      .c6 {
        width: 100%;
      }

      .c19 {
        width: 100%;
        border: none;
        text-align: left;
        outline-offset: -3px;
      }

      .c19.is-focused {
        background: #f0f0ff;
      }

      .c19:hover {
        background: #f0f0ff;
      }

      .c8 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c8 svg {
        height: 1rem;
        width: 1rem;
      }

      .c8 svg path {
        fill: #8e8ea9;
      }

      <body>
        <div>
          <div
            class="c0"
            spacing="1"
          >
            <span
              class="c1"
              for="timepicker-1"
              id="timepicker-1-label"
            >
              <div
                class="c2"
              >
                Choose a time
              </div>
            </span>
            <div
              class="c2 c3"
            >
              <button
                aria-describedby="timepicker-1-hint"
                aria-disabled="false"
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="timepicker-1-label timepicker-1-content"
                class="c4"
                id="timepicker-1"
                type="button"
              />
              <div
                class="c5 c6"
              >
                <div
                  class="c2"
                >
                  <div
                    aria-hidden="true"
                    class="c7"
                  >
                    <div
                      class="c8"
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
                    class="c9"
                  >
                    <span
                      class="c10"
                      id="timepicker-1-content"
                    >
                      11:30
                    </span>
                  </div>
                </div>
                <div
                  class="c2"
                >
                  <button
                    aria-disabled="false"
                    aria-label="Clear the selected time picker value"
                    class="c11"
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
                    class="c7 c11 c12"
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
              class="c13"
              id="timepicker-1-hint"
            >
              Description line
            </p>
          </div>
        </div>
        <div
          class="c14"
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
            class="c15 c16"
            style="left: 0px; top: 4px;"
          >
            <div
              class="c17"
            >
              <ul
                aria-labelledby="timepicker-1-label"
                aria-multiselectable="false"
                class="c0"
                role="listbox"
                spacing="1"
                tabindex="-1"
              >
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="00:00"
                  id="timepicker-1-option-00-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      00:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="00:15"
                  id="timepicker-1-option-00-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      00:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="00:30"
                  id="timepicker-1-option-00-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      00:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="00:45"
                  id="timepicker-1-option-00-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      00:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="01:00"
                  id="timepicker-1-option-01-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      01:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="01:15"
                  id="timepicker-1-option-01-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      01:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="01:30"
                  id="timepicker-1-option-01-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      01:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="01:45"
                  id="timepicker-1-option-01-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      01:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="02:00"
                  id="timepicker-1-option-02-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      02:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="02:15"
                  id="timepicker-1-option-02-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      02:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="02:30"
                  id="timepicker-1-option-02-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      02:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="02:45"
                  id="timepicker-1-option-02-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      02:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="03:00"
                  id="timepicker-1-option-03-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      03:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="03:15"
                  id="timepicker-1-option-03-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      03:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="03:30"
                  id="timepicker-1-option-03-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      03:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="03:45"
                  id="timepicker-1-option-03-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      03:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="04:00"
                  id="timepicker-1-option-04-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      04:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="04:15"
                  id="timepicker-1-option-04-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      04:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="04:30"
                  id="timepicker-1-option-04-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      04:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="04:45"
                  id="timepicker-1-option-04-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      04:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="05:00"
                  id="timepicker-1-option-05-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      05:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="05:15"
                  id="timepicker-1-option-05-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      05:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="05:30"
                  id="timepicker-1-option-05-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      05:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="05:45"
                  id="timepicker-1-option-05-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      05:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="06:00"
                  id="timepicker-1-option-06-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      06:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="06:15"
                  id="timepicker-1-option-06-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      06:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="06:30"
                  id="timepicker-1-option-06-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      06:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="06:45"
                  id="timepicker-1-option-06-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      06:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="07:00"
                  id="timepicker-1-option-07-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      07:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="07:15"
                  id="timepicker-1-option-07-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      07:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="07:30"
                  id="timepicker-1-option-07-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      07:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="07:45"
                  id="timepicker-1-option-07-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      07:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="08:00"
                  id="timepicker-1-option-08-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      08:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="08:15"
                  id="timepicker-1-option-08-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      08:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="08:30"
                  id="timepicker-1-option-08-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      08:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="08:45"
                  id="timepicker-1-option-08-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      08:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="09:00"
                  id="timepicker-1-option-09-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      09:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="09:15"
                  id="timepicker-1-option-09-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      09:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="09:30"
                  id="timepicker-1-option-09-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      09:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="09:45"
                  id="timepicker-1-option-09-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      09:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="10:00"
                  id="timepicker-1-option-10-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      10:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="10:15"
                  id="timepicker-1-option-10-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      10:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="10:30"
                  id="timepicker-1-option-10-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      10:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="10:45"
                  id="timepicker-1-option-10-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      10:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="11:00"
                  id="timepicker-1-option-11-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      11:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="11:15"
                  id="timepicker-1-option-11-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      11:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="true"
                  class="c18 c19"
                  data-strapi-value="11:30"
                  id="timepicker-1-option-11-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c21"
                    >
                      11:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="11:45"
                  id="timepicker-1-option-11-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      11:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="12:00"
                  id="timepicker-1-option-12-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      12:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="12:15"
                  id="timepicker-1-option-12-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      12:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="12:30"
                  id="timepicker-1-option-12-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      12:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="12:45"
                  id="timepicker-1-option-12-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      12:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="13:00"
                  id="timepicker-1-option-13-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      13:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="13:15"
                  id="timepicker-1-option-13-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      13:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="13:30"
                  id="timepicker-1-option-13-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      13:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="13:45"
                  id="timepicker-1-option-13-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      13:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="14:00"
                  id="timepicker-1-option-14-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      14:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="14:15"
                  id="timepicker-1-option-14-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      14:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="14:30"
                  id="timepicker-1-option-14-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      14:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="14:45"
                  id="timepicker-1-option-14-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      14:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="15:00"
                  id="timepicker-1-option-15-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      15:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="15:15"
                  id="timepicker-1-option-15-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      15:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="15:30"
                  id="timepicker-1-option-15-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      15:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="15:45"
                  id="timepicker-1-option-15-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      15:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="16:00"
                  id="timepicker-1-option-16-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      16:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="16:15"
                  id="timepicker-1-option-16-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      16:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="16:30"
                  id="timepicker-1-option-16-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      16:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="16:45"
                  id="timepicker-1-option-16-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      16:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="17:00"
                  id="timepicker-1-option-17-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      17:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="17:15"
                  id="timepicker-1-option-17-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      17:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="17:30"
                  id="timepicker-1-option-17-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      17:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="17:45"
                  id="timepicker-1-option-17-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      17:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="18:00"
                  id="timepicker-1-option-18-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      18:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="18:15"
                  id="timepicker-1-option-18-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      18:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="18:30"
                  id="timepicker-1-option-18-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      18:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="18:45"
                  id="timepicker-1-option-18-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      18:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="19:00"
                  id="timepicker-1-option-19-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      19:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="19:15"
                  id="timepicker-1-option-19-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      19:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="19:30"
                  id="timepicker-1-option-19-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      19:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="19:45"
                  id="timepicker-1-option-19-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      19:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="20:00"
                  id="timepicker-1-option-20-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      20:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="20:15"
                  id="timepicker-1-option-20-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      20:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="20:30"
                  id="timepicker-1-option-20-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      20:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="20:45"
                  id="timepicker-1-option-20-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      20:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="21:00"
                  id="timepicker-1-option-21-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      21:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="21:15"
                  id="timepicker-1-option-21-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      21:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="21:30"
                  id="timepicker-1-option-21-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      21:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="21:45"
                  id="timepicker-1-option-21-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      21:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="22:00"
                  id="timepicker-1-option-22-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      22:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="22:15"
                  id="timepicker-1-option-22-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      22:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="22:30"
                  id="timepicker-1-option-22-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      22:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="22:45"
                  id="timepicker-1-option-22-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      22:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="23:00"
                  id="timepicker-1-option-23-00"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      23:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="23:15"
                  id="timepicker-1-option-23-15"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      23:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="23:30"
                  id="timepicker-1-option-23-30"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      23:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="23:45"
                  id="timepicker-1-option-23-45"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      23:45
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </body>
    `);
  });
});
