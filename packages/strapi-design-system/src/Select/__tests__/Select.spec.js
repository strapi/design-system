import * as React from 'react';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { Select } from '../Select';
import { Option } from '../Option';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Select', () => {
  it('opens the listbox when clicking on the input', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Select
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

      .c8 {
        padding-right: 16px;
        padding-left: 16px;
      }

      .c14 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c17 {
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

      .c9 {
        color: #32324d;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c12 {
        color: #666687;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c19 {
        font-weight: 600;
        color: #4945ff;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c20 {
        color: #32324d;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c15 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        position: absolute;
        z-index: 4;
        border: 1px solid #eaeaef;
        background: #ffffff;
      }

      .c16 {
        max-height: 15rem;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .c16::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 4px;
      }

      .c16::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c16::-webkit-scrollbar-thumb {
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

      .c11 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        background: none;
        border: none;
      }

      .c11 svg {
        width: 0.375rem;
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

      .c6 {
        width: 100%;
      }

      .c18 {
        width: 100%;
        border: none;
        text-align: left;
        outline-offset: -3px;
      }

      .c18.is-focused {
        background: #f0f0ff;
      }

      .c18:hover {
        background: #f0f0ff;
      }

      <body>
        <div>
          <div
            class="c0"
            spacing="1"
          >
            <span
              class="c1"
              for="select-1"
              id="select-1-label"
            >
              <div
                class="c2"
              >
                Choose your meal
              </div>
            </span>
            <div
              class="c2 c3"
            >
              <button
                aria-describedby="select-1-hint"
                aria-disabled="false"
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="select-1-label select-1-content"
                class="c4"
                id="select-1"
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
                    <span>
                      An icon
                    </span>
                  </div>
                  <div
                    class="c8"
                  >
                    <span
                      class="c9"
                      id="select-1-content"
                    >
                      Pizza
                    </span>
                  </div>
                </div>
                <div
                  class="c2"
                >
                  <button
                    aria-hidden="true"
                    class="c7 c10 c11"
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
              class="c12"
              id="select-1-hint"
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
          data-react-portal="true"
        >
          <div
            class="c14 c15"
            style="left: 0px; top: 4px;"
          >
            <div
              class="c16"
            >
              <ul
                aria-labelledby="select-1-label"
                aria-multiselectable="false"
                class="c0"
                role="listbox"
                spacing="1"
                tabindex="-1"
              >
                <li
                  aria-selected="true"
                  class="c17 c18"
                  data-strapi-value="pizza"
                  id="select-1-option-pizza"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c19"
                    >
                      Pizza
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c17 c18"
                  data-strapi-value="hamburger"
                  id="select-1-option-hamburger"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
                    >
                      Hamburger
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c17 c18"
                  data-strapi-value="bagel"
                  id="select-1-option-bagel"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <span
                      class="c20"
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
        padding-right: 16px;
        padding-left: 16px;
      }

      .c10 {
        padding-left: 12px;
      }

      .c14 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c17 {
        background: #ffffff;
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 16px;
        border-radius: 4px;
      }

      .c19 {
        padding-right: 8px;
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

      .c8 {
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

      .c21 {
        font-weight: 600;
        color: #4945ff;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c23 {
        color: #32324d;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c15 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        position: absolute;
        z-index: 4;
        border: 1px solid #eaeaef;
        background: #ffffff;
      }

      .c16 {
        max-height: 15rem;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .c16::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 4px;
      }

      .c16::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c16::-webkit-scrollbar-thumb {
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

      .c9 {
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

      .c20 {
        border: 1px solid #4945ff;
        border-radius: 4px;
        height: 18px;
        width: 18px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        background-color: #4945ff;
      }

      .c20::after {
        content: '';
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .c22 {
        border: 1px solid #c0c0cf;
        border-radius: 4px;
        height: 18px;
        width: 18px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        background-color: #ffffff;
      }

      .c18 {
        width: 100%;
        border: none;
        text-align: left;
        outline-offset: -3px;
      }

      .c18.is-focused {
        background: #f0f0ff;
      }

      .c18:hover {
        background: #f0f0ff;
      }

      <body>
        <div>
          <div
            class="c0"
            spacing="1"
          >
            <span
              class="c1"
              for="select-3"
              id="select-3-label"
            >
              <div
                class="c2"
              >
                Choose your meal
              </div>
            </span>
            <div
              class="c2 c3"
            >
              <button
                aria-describedby="select-3-hint"
                aria-disabled="false"
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="select-3-label select-3-content"
                class="c4"
                id="select-3"
                type="button"
              />
              <div
                class="c5 c6"
              >
                <div
                  class="c2"
                >
                  <div
                    class="c7"
                  >
                    <span
                      class="c8"
                      id="select-3-content"
                    >
                      Hamburger
                      <span
                        class="c9"
                      >
                        pizza, hamburger
                      </span>
                    </span>
                  </div>
                </div>
                <div
                  class="c2"
                >
                  <button
                    aria-hidden="true"
                    class="c10 c11 c12"
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
              id="select-3-hint"
            >
              Description line
            </p>
          </div>
        </div>
        <div
          class="c9"
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
            class="c14 c15"
            style="left: 0px; top: 4px;"
          >
            <div
              class="c16"
            >
              <ul
                aria-labelledby="select-3-label"
                aria-multiselectable="true"
                class="c0"
                role="listbox"
                spacing="1"
                tabindex="-1"
              >
                <li
                  aria-selected="true"
                  class="c17 c18"
                  data-strapi-value="pizza"
                  id="select-3-option-pizza"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <div
                      aria-hidden="true"
                      class="c19"
                    >
                      <div
                        class="c20"
                      />
                    </div>
                    <span
                      class="c21"
                    >
                      Pizza
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="true"
                  class="c17 c18"
                  data-strapi-value="hamburger"
                  id="select-3-option-hamburger"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <div
                      aria-hidden="true"
                      class="c19"
                    >
                      <div
                        class="c20"
                      />
                    </div>
                    <span
                      class="c21"
                    >
                      Hamburger
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c17 c18"
                  data-strapi-value="bagel"
                  id="select-3-option-bagel"
                  role="option"
                >
                  <div
                    class="c2"
                  >
                    <div
                      aria-hidden="true"
                      class="c19"
                    >
                      <div
                        class="c22"
                      />
                    </div>
                    <span
                      class="c23"
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

  describe('with tags', () => {
    let rawError;

    beforeEach(() => {
      rawError = console.error;
      console.error = () => undefined;
    });

    afterEach(() => {
      console.error = rawError;
    });

    it('throws an error when passing the withTags prop without the multi one', () => {
      expect(() =>
        render(
          <ThemeProvider theme={lightTheme}>
            <Select
              label="Choose your meal"
              placeholder="Your example"
              hint="Description line"
              clearLabel="Clear the meal"
              value={['pizza', 'hamburger']}
              onChange={() => {}}
              disabled={false}
              withTags
            >
              <Option value={'pizza'}>Pizza</Option>
              <Option value={'hamburger'}>Hamburger</Option>
              <Option value={'bagel'}>Bagel</Option>
            </Select>
          </ThemeProvider>,
        ),
      ).toThrow(new Error('The "withTags" props can only be used when the "multi" prop is present'));
    });
  });
});
