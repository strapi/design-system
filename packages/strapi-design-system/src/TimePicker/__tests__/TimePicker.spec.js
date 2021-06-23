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
          id={'tp-1'}
          onClear={() => {}}
          onChange={() => {}}
          value={'11:00'}
          clearLabel={'Clear the selected time picker value'}
        />
      </ThemeProvider>,
      { container: document.body },
    );

    fireEvent.mouseDown(screen.getByText('11:00'));

    await waitFor(() => screen.getByText('00:00'));

    expect(container).toMatchInlineSnapshot(`
      .c6 {
        font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans', 'Helvetica Neue',sans-serif;
        text-align: left;
        border: none;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
        display: block;
        width: 100%;
        background: transparent;
      }

      .c6:focus {
        outline: none;
      }

      .c1 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c7 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c11 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c17 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c3 {
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

      .c8 {
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
        padding-left: 12px;
      }

      .c12 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c15 {
        background: #ffffff;
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 16px;
        border-radius: 4px;
      }

      .c13 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        position: absolute;
        border: 1px solid #eaeaef;
        background: #ffffff;
        margin-top: 4px;
      }

      .c14 {
        max-height: 15rem;
        overflow-y: scroll;
      }

      .c14::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c14::-webkit-scrollbar-thumb {
        background: #eaeaef;
        border-radius: 4px;
        margin-right: 10px;
      }

      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 4px;
      }

      .c2 {
        border: 1px solid #dcdce4;
        padding-right: 12px;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
      }

      .c2:focus-within {
        border: 1px solid #4945ff;
      }

      .c9 {
        background: transparent;
        border: none;
      }

      .c9 svg {
        height: 0.6875rem;
        width: 0.6875rem;
      }

      .c9 svg path {
        fill: #666687;
      }

      .c10 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        background: none;
        border: none;
      }

      .c10 svg {
        width: 0.375rem;
      }

      .c16 {
        width: 100%;
        border: none;
        text-align: left;
        outline-offset: -3px;
      }

      .c16.is-focused {
        background: #f0f0ff;
      }

      .c16:hover {
        background: #f0f0ff;
      }

      .c5 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c5 svg {
        height: 1rem;
        width: 1rem;
      }

      .c5 svg path {
        fill: #8e8ea9;
      }

      <body>
        <div>
          <div
            class="c0"
          >
            <span
              class="c1"
              for="field-tp-1"
              id="label-tp-1"
            >
              Choose a time
            </span>
            <div
              class="c2"
            >
              <span
                class="c3"
              >
                <div
                  aria-hidden="true"
                  class="c4"
                >
                  <div
                    class="c5"
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
                        fill="#32324D"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <button
                  aria-describedby="field-hint-tp-1"
                  aria-disabled="false"
                  aria-expanded="true"
                  aria-haspopup="listbox"
                  aria-labelledby="label-tp-1 content-tp-1"
                  class="c6"
                  id="tp-1"
                >
                  <span
                    aria-hidden="true"
                    class="c7"
                    id="content-tp-1"
                  >
                    11:00
                  </span>
                </button>
                <div
                  class="c8"
                >
                  <button
                    aria-disabled="false"
                    aria-label="Clear the selected time picker value"
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
                        d="M24 2.417L21.583 0 12 9.583 2.417 0 0 2.417 9.583 12 0 21.583 2.417 24 12 14.417 21.583 24 24 21.583 14.417 12 24 2.417z"
                        fill="#212134"
                      />
                    </svg>
                  </button>
                  <button
                    aria-hidden="true"
                    class="c4 c9 c10"
                    tabindex="-1"
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
              </span>
            </div>
            <p
              class="c11"
              id="field-hint-tp-1"
            >
              Description line
            </p>
          </div>
        </div>
        <div
          data-react-portal="true"
        >
          <div
            class="c12 c13"
            style="left: 0px; top: 0px;"
          >
            <div
              class="c14"
            >
              <ul
                aria-activedescendant="option-tp-1-11-00"
                aria-labelledby="label-tp-1"
                aria-multiselectable="false"
                class="c0"
                role="listbox"
                tabindex="-1"
              >
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="00:00"
                  id="option-tp-1-00-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      00:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="00:15"
                  id="option-tp-1-00-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      00:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="00:30"
                  id="option-tp-1-00-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      00:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="00:45"
                  id="option-tp-1-00-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      00:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="01:00"
                  id="option-tp-1-01-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      01:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="01:15"
                  id="option-tp-1-01-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      01:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="01:30"
                  id="option-tp-1-01-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      01:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="01:45"
                  id="option-tp-1-01-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      01:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="02:00"
                  id="option-tp-1-02-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      02:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="02:15"
                  id="option-tp-1-02-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      02:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="02:30"
                  id="option-tp-1-02-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      02:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="02:45"
                  id="option-tp-1-02-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      02:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="03:00"
                  id="option-tp-1-03-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      03:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="03:15"
                  id="option-tp-1-03-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      03:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="03:30"
                  id="option-tp-1-03-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      03:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="03:45"
                  id="option-tp-1-03-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      03:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="04:00"
                  id="option-tp-1-04-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      04:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="04:15"
                  id="option-tp-1-04-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      04:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="04:30"
                  id="option-tp-1-04-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      04:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="04:45"
                  id="option-tp-1-04-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      04:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="05:00"
                  id="option-tp-1-05-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      05:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="05:15"
                  id="option-tp-1-05-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      05:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="05:30"
                  id="option-tp-1-05-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      05:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="05:45"
                  id="option-tp-1-05-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      05:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="06:00"
                  id="option-tp-1-06-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      06:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="06:15"
                  id="option-tp-1-06-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      06:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="06:30"
                  id="option-tp-1-06-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      06:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="06:45"
                  id="option-tp-1-06-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      06:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="07:00"
                  id="option-tp-1-07-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      07:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="07:15"
                  id="option-tp-1-07-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      07:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="07:30"
                  id="option-tp-1-07-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      07:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="07:45"
                  id="option-tp-1-07-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      07:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="08:00"
                  id="option-tp-1-08-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      08:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="08:15"
                  id="option-tp-1-08-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      08:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="08:30"
                  id="option-tp-1-08-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      08:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="08:45"
                  id="option-tp-1-08-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      08:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="09:00"
                  id="option-tp-1-09-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      09:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="09:15"
                  id="option-tp-1-09-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      09:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="09:30"
                  id="option-tp-1-09-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      09:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="09:45"
                  id="option-tp-1-09-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      09:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="10:00"
                  id="option-tp-1-10-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      10:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="10:15"
                  id="option-tp-1-10-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      10:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="10:30"
                  id="option-tp-1-10-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      10:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="10:45"
                  id="option-tp-1-10-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      10:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="true"
                  class="c15 c16 is-focused"
                  data-strapi-value="11:00"
                  id="option-tp-1-11-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c17"
                    >
                      11:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="11:15"
                  id="option-tp-1-11-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      11:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="11:30"
                  id="option-tp-1-11-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      11:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="11:45"
                  id="option-tp-1-11-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      11:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="12:00"
                  id="option-tp-1-12-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      12:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="12:15"
                  id="option-tp-1-12-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      12:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="12:30"
                  id="option-tp-1-12-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      12:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="12:45"
                  id="option-tp-1-12-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      12:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="13:00"
                  id="option-tp-1-13-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      13:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="13:15"
                  id="option-tp-1-13-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      13:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="13:30"
                  id="option-tp-1-13-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      13:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="13:45"
                  id="option-tp-1-13-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      13:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="14:00"
                  id="option-tp-1-14-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      14:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="14:15"
                  id="option-tp-1-14-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      14:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="14:30"
                  id="option-tp-1-14-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      14:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="14:45"
                  id="option-tp-1-14-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      14:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="15:00"
                  id="option-tp-1-15-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      15:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="15:15"
                  id="option-tp-1-15-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      15:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="15:30"
                  id="option-tp-1-15-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      15:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="15:45"
                  id="option-tp-1-15-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      15:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="16:00"
                  id="option-tp-1-16-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      16:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="16:15"
                  id="option-tp-1-16-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      16:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="16:30"
                  id="option-tp-1-16-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      16:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="16:45"
                  id="option-tp-1-16-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      16:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="17:00"
                  id="option-tp-1-17-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      17:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="17:15"
                  id="option-tp-1-17-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      17:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="17:30"
                  id="option-tp-1-17-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      17:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="17:45"
                  id="option-tp-1-17-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      17:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="18:00"
                  id="option-tp-1-18-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      18:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="18:15"
                  id="option-tp-1-18-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      18:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="18:30"
                  id="option-tp-1-18-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      18:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="18:45"
                  id="option-tp-1-18-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      18:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="19:00"
                  id="option-tp-1-19-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      19:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="19:15"
                  id="option-tp-1-19-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      19:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="19:30"
                  id="option-tp-1-19-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      19:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="19:45"
                  id="option-tp-1-19-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      19:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="20:00"
                  id="option-tp-1-20-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      20:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="20:15"
                  id="option-tp-1-20-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      20:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="20:30"
                  id="option-tp-1-20-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      20:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="20:45"
                  id="option-tp-1-20-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      20:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="21:00"
                  id="option-tp-1-21-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      21:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="21:15"
                  id="option-tp-1-21-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      21:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="21:30"
                  id="option-tp-1-21-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      21:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="21:45"
                  id="option-tp-1-21-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      21:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="22:00"
                  id="option-tp-1-22-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      22:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="22:15"
                  id="option-tp-1-22-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      22:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="22:30"
                  id="option-tp-1-22-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      22:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="22:45"
                  id="option-tp-1-22-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      22:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="23:00"
                  id="option-tp-1-23-00"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      23:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="23:15"
                  id="option-tp-1-23-15"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      23:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="23:30"
                  id="option-tp-1-23-30"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
                    >
                      23:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c15 c16"
                  data-strapi-value="23:45"
                  id="option-tp-1-23-45"
                  role="option"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c7"
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
