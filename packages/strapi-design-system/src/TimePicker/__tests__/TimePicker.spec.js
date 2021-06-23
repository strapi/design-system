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
      .c4 {
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

      .c4:focus {
        outline: none;
      }

      .c1 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c5 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c10 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c16 {
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

      .c6 {
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

      .c8 {
        padding-left: 12px;
      }

      .c11 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c14 {
        background: #ffffff;
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 16px;
        border-radius: 4px;
      }

      .c12 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        position: absolute;
        border: 1px solid #eaeaef;
        background: #ffffff;
        margin-top: 4px;
      }

      .c13 {
        max-height: 15rem;
        overflow-y: scroll;
      }

      .c13::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c13::-webkit-scrollbar-thumb {
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

      .c7 {
        background: transparent;
        border: none;
      }

      .c7 svg {
        height: 0.6875rem;
        width: 0.6875rem;
      }

      .c7 svg path {
        fill: #666687;
      }

      .c9 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        background: none;
        border: none;
      }

      .c9 svg {
        width: 0.375rem;
      }

      .c15 {
        width: 100%;
        border: none;
        text-align: left;
        outline-offset: -3px;
      }

      .c15.is-focused {
        background: #f0f0ff;
      }

      .c15:hover {
        background: #f0f0ff;
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
                <button
                  aria-describedby="field-hint-tp-1"
                  aria-disabled="false"
                  aria-expanded="true"
                  aria-haspopup="listbox"
                  aria-labelledby="label-tp-1 content-tp-1"
                  class="c4"
                  id="tp-1"
                >
                  <span
                    aria-hidden="true"
                    class="c5"
                    id="content-tp-1"
                  >
                    11:00
                  </span>
                </button>
                <div
                  class="c6"
                >
                  <button
                    aria-disabled="false"
                    aria-label="Clear the selected time picker value"
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
                        d="M24 2.417L21.583 0 12 9.583 2.417 0 0 2.417 9.583 12 0 21.583 2.417 24 12 14.417 21.583 24 24 21.583 14.417 12 24 2.417z"
                        fill="#212134"
                      />
                    </svg>
                  </button>
                  <button
                    aria-hidden="true"
                    class="c8 c7 c9"
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
              class="c10"
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
            class="c11 c12"
            style="left: 0px; top: 0px;"
          >
            <div
              class="c13"
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
                  class="c14 c15"
                  data-strapi-value="00:00"
                  id="option-tp-1-00-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      00:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="00:15"
                  id="option-tp-1-00-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      00:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="00:30"
                  id="option-tp-1-00-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      00:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="00:45"
                  id="option-tp-1-00-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      00:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="01:00"
                  id="option-tp-1-01-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      01:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="01:15"
                  id="option-tp-1-01-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      01:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="01:30"
                  id="option-tp-1-01-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      01:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="01:45"
                  id="option-tp-1-01-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      01:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="02:00"
                  id="option-tp-1-02-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      02:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="02:15"
                  id="option-tp-1-02-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      02:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="02:30"
                  id="option-tp-1-02-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      02:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="02:45"
                  id="option-tp-1-02-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      02:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="03:00"
                  id="option-tp-1-03-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      03:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="03:15"
                  id="option-tp-1-03-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      03:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="03:30"
                  id="option-tp-1-03-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      03:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="03:45"
                  id="option-tp-1-03-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      03:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="04:00"
                  id="option-tp-1-04-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      04:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="04:15"
                  id="option-tp-1-04-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      04:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="04:30"
                  id="option-tp-1-04-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      04:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="04:45"
                  id="option-tp-1-04-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      04:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="05:00"
                  id="option-tp-1-05-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      05:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="05:15"
                  id="option-tp-1-05-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      05:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="05:30"
                  id="option-tp-1-05-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      05:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="05:45"
                  id="option-tp-1-05-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      05:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="06:00"
                  id="option-tp-1-06-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      06:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="06:15"
                  id="option-tp-1-06-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      06:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="06:30"
                  id="option-tp-1-06-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      06:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="06:45"
                  id="option-tp-1-06-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      06:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="07:00"
                  id="option-tp-1-07-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      07:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="07:15"
                  id="option-tp-1-07-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      07:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="07:30"
                  id="option-tp-1-07-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      07:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="07:45"
                  id="option-tp-1-07-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      07:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="08:00"
                  id="option-tp-1-08-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      08:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="08:15"
                  id="option-tp-1-08-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      08:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="08:30"
                  id="option-tp-1-08-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      08:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="08:45"
                  id="option-tp-1-08-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      08:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="09:00"
                  id="option-tp-1-09-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      09:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="09:15"
                  id="option-tp-1-09-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      09:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="09:30"
                  id="option-tp-1-09-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      09:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="09:45"
                  id="option-tp-1-09-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      09:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="10:00"
                  id="option-tp-1-10-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      10:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="10:15"
                  id="option-tp-1-10-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      10:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="10:30"
                  id="option-tp-1-10-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      10:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="10:45"
                  id="option-tp-1-10-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      10:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="true"
                  class="c14 c15 is-focused"
                  data-strapi-value="11:00"
                  id="option-tp-1-11-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c16"
                    >
                      11:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="11:15"
                  id="option-tp-1-11-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      11:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="11:30"
                  id="option-tp-1-11-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      11:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="11:45"
                  id="option-tp-1-11-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      11:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="12:00"
                  id="option-tp-1-12-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      12:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="12:15"
                  id="option-tp-1-12-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      12:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="12:30"
                  id="option-tp-1-12-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      12:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="12:45"
                  id="option-tp-1-12-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      12:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="13:00"
                  id="option-tp-1-13-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      13:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="13:15"
                  id="option-tp-1-13-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      13:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="13:30"
                  id="option-tp-1-13-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      13:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="13:45"
                  id="option-tp-1-13-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      13:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="14:00"
                  id="option-tp-1-14-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      14:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="14:15"
                  id="option-tp-1-14-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      14:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="14:30"
                  id="option-tp-1-14-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      14:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="14:45"
                  id="option-tp-1-14-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      14:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="15:00"
                  id="option-tp-1-15-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      15:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="15:15"
                  id="option-tp-1-15-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      15:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="15:30"
                  id="option-tp-1-15-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      15:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="15:45"
                  id="option-tp-1-15-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      15:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="16:00"
                  id="option-tp-1-16-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      16:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="16:15"
                  id="option-tp-1-16-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      16:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="16:30"
                  id="option-tp-1-16-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      16:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="16:45"
                  id="option-tp-1-16-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      16:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="17:00"
                  id="option-tp-1-17-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      17:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="17:15"
                  id="option-tp-1-17-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      17:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="17:30"
                  id="option-tp-1-17-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      17:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="17:45"
                  id="option-tp-1-17-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      17:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="18:00"
                  id="option-tp-1-18-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      18:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="18:15"
                  id="option-tp-1-18-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      18:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="18:30"
                  id="option-tp-1-18-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      18:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="18:45"
                  id="option-tp-1-18-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      18:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="19:00"
                  id="option-tp-1-19-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      19:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="19:15"
                  id="option-tp-1-19-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      19:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="19:30"
                  id="option-tp-1-19-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      19:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="19:45"
                  id="option-tp-1-19-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      19:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="20:00"
                  id="option-tp-1-20-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      20:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="20:15"
                  id="option-tp-1-20-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      20:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="20:30"
                  id="option-tp-1-20-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      20:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="20:45"
                  id="option-tp-1-20-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      20:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="21:00"
                  id="option-tp-1-21-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      21:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="21:15"
                  id="option-tp-1-21-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      21:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="21:30"
                  id="option-tp-1-21-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      21:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="21:45"
                  id="option-tp-1-21-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      21:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="22:00"
                  id="option-tp-1-22-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      22:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="22:15"
                  id="option-tp-1-22-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      22:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="22:30"
                  id="option-tp-1-22-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      22:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="22:45"
                  id="option-tp-1-22-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      22:45
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="23:00"
                  id="option-tp-1-23-00"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      23:00
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="23:15"
                  id="option-tp-1-23-15"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      23:15
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="23:30"
                  id="option-tp-1-23-30"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
                    >
                      23:30
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="23:45"
                  id="option-tp-1-23-45"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <span
                      class="c5"
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
