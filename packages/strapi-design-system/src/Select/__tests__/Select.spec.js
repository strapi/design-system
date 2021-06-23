import * as React from 'react';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { Select } from '../Select';
import { Option } from '../Option';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Select', () => {
  beforeEach(() => {
    window.IntersectionObserver = () => ({
      observe: () => {},
      disconnect: () => {},
    });
  });

  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Select
          label="Choose your meal"
          id={1}
          onChange={() => {}}
          clearLabel="Clear the selection"
          placeholder="Placeholder"
        >
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
                >
                  Placeholder
                </span>
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
          startIcon={<span>An icon</span>}
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
      .c5 {
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

      .c5:focus {
        outline: none;
      }

      .c1 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c6 {
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

      .c7 {
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
                <div
                  aria-hidden="true"
                  class="c4"
                >
                  <span>
                    An icon
                  </span>
                </div>
                <button
                  aria-describedby="field-hint-select1"
                  aria-disabled="false"
                  aria-expanded="true"
                  aria-haspopup="listbox"
                  aria-labelledby="label-select1 content-select1"
                  class="c5"
                  id="select1"
                >
                  <span
                    aria-hidden="true"
                    class="c6"
                    id="content-select1"
                  >
                    Pizza
                  </span>
                </button>
                <div
                  class="c7"
                >
                  <button
                    aria-hidden="true"
                    class="c4 c8 c9"
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
                aria-multiselectable="false"
                class="c0"
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
                  <div
                    class="c7"
                  >
                    <span
                      class="c16"
                    >
                      Pizza
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="hamburger"
                  id="option-select1-hamburger"
                  role="option"
                >
                  <div
                    class="c7"
                  >
                    <span
                      class="c6"
                    >
                      Hamburger
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c14 c15"
                  data-strapi-value="bagel"
                  id="option-select1-bagel"
                  role="option"
                >
                  <div
                    class="c7"
                  >
                    <span
                      class="c6"
                    >
                      Bagel
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

  it('opens a multi listbox when clicking on the input', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Select
          id="select1"
          label="Choose your meal"
          placeholder="Your example"
          hint="Description line"
          clearLabel="Clear the meal"
          value={['pizza', 'hamburger']}
          onChange={() => {}}
          disabled={false}
          multi
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
      <body>
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

      .c11 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
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

      .c7 {
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

      .c6 {
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
                  aria-describedby="field-hint-select1"
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
                    Hamburger
                    <span
                      class="c6"
                    >
                      pizza, hamburger
                    </span>
                  </span>
                </button>
                <div
                  class="c7"
                >
                  <button
                    aria-hidden="true"
                    class="c8 c9 c10"
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
              id="field-hint-select1"
            >
              Description line
            </p>
          </div>
        </div>
        .c11 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c9 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
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

      .c0 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c4 {
        background: #ffffff;
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 16px;
        border-radius: 4px;
      }

      .c7 {
        padding-right: 8px;
      }

      .c1 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        position: absolute;
        border: 1px solid #eaeaef;
        background: #ffffff;
        margin-top: 4px;
      }

      .c2 {
        max-height: 15rem;
        overflow-y: scroll;
      }

      .c2::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c2::-webkit-scrollbar-thumb {
        background: #eaeaef;
        border-radius: 4px;
        margin-right: 10px;
      }

      .c3 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c3 > * + * {
        margin-top: 4px;
      }

      .c8 {
        border: 1px solid #4945ff;
        border-radius: 4px;
        height: 18px;
        width: 18px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        background-color: #4945ff;
      }

      .c8::after {
        content: '';
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .c10 {
        border: 1px solid #c0c0cf;
        border-radius: 4px;
        height: 18px;
        width: 18px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        background-color: #ffffff;
      }

      .c10::after {
        content: '';
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .c5 {
        width: 100%;
        border: none;
        text-align: left;
        outline-offset: -3px;
      }

      .c5.is-focused {
        background: #f0f0ff;
      }

      .c5:hover {
        background: #f0f0ff;
      }

      <div
          data-react-portal="true"
        >
          <div
            class="c0 c1"
            style="left: 0px; top: 0px;"
          >
            <div
              class="c2"
            >
              <ul
                aria-activedescendant="option-select1-pizza"
                aria-labelledby="label-select1"
                aria-multiselectable="true"
                class="c3"
                role="listbox"
                tabindex="-1"
              >
                <li
                  aria-selected="true"
                  class="c4 c5 is-focused"
                  data-strapi-value="pizza"
                  id="option-select1-pizza"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <div
                      aria-hidden="true"
                      class="c7"
                    >
                      <div
                        class="c8"
                      />
                    </div>
                    <span
                      class="c9"
                    >
                      Pizza
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="true"
                  class="c4 c5"
                  data-strapi-value="hamburger"
                  id="option-select1-hamburger"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <div
                      aria-hidden="true"
                      class="c7"
                    >
                      <div
                        class="c8"
                      />
                    </div>
                    <span
                      class="c9"
                    >
                      Hamburger
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c4 c5"
                  data-strapi-value="bagel"
                  id="option-select1-bagel"
                  role="option"
                >
                  <div
                    class="c6"
                  >
                    <div
                      aria-hidden="true"
                      class="c7"
                    >
                      <div
                        class="c10"
                      />
                    </div>
                    <span
                      class="c11"
                    >
                      Bagel
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
