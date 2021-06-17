import * as React from 'react';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { Select } from '../Select';
import { Option } from '../Option';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Select', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Select label="Choose your meal" id={1} onChange={() => {}} clearLabel="Clear the selection">
          <Option value={'pizza'}>Pizza</Option>
          <Option value={'hamburger'}>Hamburger</Option>
          <Option value={'bagel'}>Bagel</Option>
        </Select>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
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
        color: #666687;
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

      .c7 {
        padding-left: 12px;
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

      .c8 {
        background: transparent;
        border: none;
      }

      .c8 svg {
        height: 0.6875rem;
        width: 0.6875rem;
      }

      .c8 svg path {
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

      <div>
        <div
          class="c0"
        >
          <span
            class="c1"
            for="field-1"
            id="label-1"
          >
            Choose your meal
          </span>
          <div
            class="c2"
          >
            <span
              class="c3"
            >
              <button
                aria-disabled="false"
                aria-expanded="false"
                aria-haspopup="listbox"
                aria-labelledby="label-1"
                class="c4"
                id="1"
              >
                <span
                  aria-hidden="true"
                  class="c5"
                  id="content-1"
                />
              </button>
              <div
                class="c6"
              >
                <button
                  aria-hidden="true"
                  class="c7 c8 c9"
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
        </div>
      </div>
    `);
  });

  it('opens the listbox when clicking on the input', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Select
          id="select1"
          label="Choose your meal"
          placeholder="Your example"
          hint="Description line"
          clearLabel="Clear the meal"
          value={'pizza'}
          onChange={() => {}}
          disabled={false}
        >
          <Option value={'pizza'}>Pizza</Option>
          <Option value={'hamburger'}>Hamburger</Option>
          <Option value={'bagel'}>Bagel</Option>
        </Select>
      </ThemeProvider>,
      { container: document.body },
    );

    fireEvent.mouseDown(screen.getByLabelText('Choose your meal'));

    await waitFor(() => container.querySelector('[role="listbox"]'));

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
              for="field-select1"
              id="label-select1"
            >
              Choose your meal
            </span>
            <div
              class="c2"
            >
              <span
                class="c3"
              >
                <button
                  aria-disabled="false"
                  aria-expanded="true"
                  aria-haspopup="listbox"
                  aria-labelledby="label-select1 content-select1"
                  class="c4"
                  id="select1"
                >
                  <span
                    aria-hidden="true"
                    class="c5"
                    id="content-select1"
                  >
                    Pizza
                  </span>
                </button>
                <div
                  class="c6"
                >
                  <button
                    aria-disabled="false"
                    aria-label="Clear the meal"
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
              id="field-hint-select1"
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
                aria-activedescendant="option-select1-pizza"
                aria-labelledby="label-select1"
                role="listbox"
                tabindex="-1"
              >
                <li
                  aria-selected="true"
                  class="c14 c15 is-focused"
                  data-strapi-value="pizza"
                  id="option-select1-pizza"
                  role="option"
                >
                  <span
                    class="c16"
                  >
                    Pizza
                  </span>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="hamburger"
                  id="option-select1-hamburger"
                  role="option"
                >
                  <span
                    class="c5"
                  >
                    Hamburger
                  </span>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="bagel"
                  id="option-select1-bagel"
                  role="option"
                >
                  <span
                    class="c5"
                  >
                    Bagel
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </body>
    `);
  });
});
