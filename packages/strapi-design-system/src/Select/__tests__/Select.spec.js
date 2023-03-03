import * as React from 'react';

import { fireEvent, screen, render, waitFor } from '@testing-library/react';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { Option } from '../Option';
import { Select } from '../Select';

describe('Select', () => {
  it('opens the listbox when clicking on the input', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Select
          label="Choose your meal"
          placeholder="Your example"
          hint="Description line"
          clearLabel="Clear the meal"
          value="pizza"
          onChange={() => {}}
          disabled={false}
          startIcon={<span>An icon</span>}
          selectButtonTitle="Carret Down Button"
        >
          <Option value="pizza">Pizza</Option>
          <Option value="hamburger">Hamburger</Option>
          <Option value="bagel">Bagel</Option>
        </Select>
      </ThemeProvider>,
      { container: document.body },
    );

    fireEvent.mouseDown(screen.getByRole('button', { name: /pizza/i }));

    await waitFor(() => container.querySelector('[role="listbox"]'));

    expect(container).toMatchInlineSnapshot(`
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
        gap: 4px;
      }

      .c2 {
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

      .c5 {
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

      .c1 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #32324d;
      }

      .c9 {
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

      .c19 {
        font-size: 0.875rem;
        line-height: 1.43;
        font-weight: 600;
        color: #4945ff;
      }

      .c20 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
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

      .c15 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
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

      .c6 {
        width: 100%;
      }

      <body>
        <div>
          <div
            class="c0"
          >
            <label
              class="c1"
              for="1"
            >
              <div
                class="c2"
              >
                Choose your meal
              </div>
            </label>
            <div
              class="c2 c3"
            >
              <button
                aria-describedby="1-hint"
                aria-disabled="false"
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="1 1-label 1-content"
                class="c4"
                id="1"
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
                      id="1-content"
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
                    title="Carret Down Button"
                    type="button"
                  >
                    <svg
                      fill="none"
                      height="1rem"
                      viewBox="0 0 14 8"
                      width="1rem"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M14 .889a.86.86 0 0 1-.26.625L7.615 7.736A.834.834 0 0 1 7 8a.834.834 0 0 1-.615-.264L.26 1.514A.861.861 0 0 1 0 .889c0-.24.087-.45.26-.625A.834.834 0 0 1 .875 0h12.25c.237 0 .442.088.615.264a.86.86 0 0 1 .26.625Z"
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
              id="1-hint"
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
            style="position: fixed; left: 0px; top: 4px;"
          >
            <div
              class="c16"
            >
              <ul
                aria-labelledby="1-label"
                aria-multiselectable="false"
                class="c0"
                role="listbox"
                tabindex="-1"
              >
                <li
                  aria-selected="true"
                  class="c17 c18"
                  data-strapi-value="pizza"
                  id="1-option-pizza"
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
                  id="1-option-hamburger"
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
                  id="1-option-bagel"
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
          selectButtonTitle="Carret Down Button"
          multi
        >
          <Option value="pizza">Pizza</Option>
          <Option value="hamburger">Hamburger</Option>
          <Option value="bagel">Bagel</Option>
        </Select>
      </ThemeProvider>,
      { container: document.body },
    );

    fireEvent.mouseDown(screen.getByRole('button', { name: /hamburger/i }));

    await waitFor(() => expect(container.querySelector('[role="listbox"]')).toBeInTheDocument());

    expect(container).toMatchInlineSnapshot(`
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

      .c20 {
        border-radius: 4px;
        position: relative;
        z-index: 1;
        overflow: hidden;
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
        gap: 4px;
      }

      .c2 {
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

      .c5 {
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

      .c1 {
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

      .c13 {
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c22 {
        font-size: 0.875rem;
        line-height: 1.43;
        font-weight: 600;
        color: #4945ff;
      }

      .c24 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c21 {
        border: 1px solid #4945ff;
        height: 18px;
        width: 18px;
        background-color: #4945ff;
      }

      .c21::after {
        content: '';
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .c23 {
        border: 1px solid #c0c0cf;
        height: 18px;
        width: 18px;
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

      .c15 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
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

      .c6 {
        width: 100%;
      }

      <body>
        <div>
          <div
            class="c0"
          >
            <label
              class="c1"
              for="3"
            >
              <div
                class="c2"
              >
                Choose your meal
              </div>
            </label>
            <div
              class="c2 c3"
            >
              <button
                aria-describedby="3-hint"
                aria-disabled="false"
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="3 3-label 3-content"
                class="c4"
                id="3"
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
                      id="3-content"
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
                    title="Carret Down Button"
                    type="button"
                  >
                    <svg
                      fill="none"
                      height="1rem"
                      viewBox="0 0 14 8"
                      width="1rem"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M14 .889a.86.86 0 0 1-.26.625L7.615 7.736A.834.834 0 0 1 7 8a.834.834 0 0 1-.615-.264L.26 1.514A.861.861 0 0 1 0 .889c0-.24.087-.45.26-.625A.834.834 0 0 1 .875 0h12.25c.237 0 .442.088.615.264a.86.86 0 0 1 .26.625Z"
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
              id="3-hint"
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
            style="position: fixed; left: 0px; top: 4px;"
          >
            <div
              class="c16"
            >
              <ul
                aria-labelledby="3-label"
                aria-multiselectable="true"
                class="c0"
                role="listbox"
                tabindex="-1"
              >
                <li
                  aria-selected="true"
                  class="c17 c18"
                  data-strapi-value="pizza"
                  id="3-option-pizza"
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
                        class="c20 c21"
                        overflow="hidden"
                      />
                    </div>
                    <span
                      class="c22"
                    >
                      Pizza
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="true"
                  class="c17 c18"
                  data-strapi-value="hamburger"
                  id="3-option-hamburger"
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
                        class="c20 c21"
                        overflow="hidden"
                      />
                    </div>
                    <span
                      class="c22"
                    >
                      Hamburger
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c17 c18"
                  data-strapi-value="bagel"
                  id="3-option-bagel"
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
                        class="c20 c23"
                        overflow="hidden"
                      />
                    </div>
                    <span
                      class="c24"
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
              selectButtonTitle="Carret Down Button"
            >
              <Option value="pizza">Pizza</Option>
              <Option value="hamburger">Hamburger</Option>
              <Option value="bagel">Bagel</Option>
            </Select>
          </ThemeProvider>,
        ),
      ).toThrow(new Error('The "withTags" props can only be used when the "multi" prop is present'));
    });
  });
});
