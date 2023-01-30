import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';
import { Option } from '../Option';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Select', () => {
  it('opens the listbox when clicking on the input', async () => {
    const user = userEvent.setup();

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

    const button = screen.getByRole('combobox');

    await user.click(button);

    await waitFor(() => screen.getByRole('listbox'));

    expect(container).toMatchInlineSnapshot(`
      .c16 {
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

      .c8 {
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

      .c7 {
        font-size: 0.875rem;
        line-height: 1.43;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #32324d;
      }

      .c10 {
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c15 {
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

      .c11 {
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

      .c9 > svg {
        width: 0.375rem;
      }

      .c9 > svg > path {
        fill: #666687;
      }

      .c12 {
        background: #ffffff;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        border: 1px solid #eaeaef;
        border-radius: 4px;
        width: var(--radix-select-trigger-width);
        max-height: 15rem;
      }

      .c13 {
        padding: 4px;
      }

      .c14 {
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

      .c14:focus-visible {
        outline: none;
        background-color: #f0f0ff;
      }

      .c14:hover {
        background-color: #f0f0ff;
      }

      .c14[data-state='checked'] .c2 {
        font-weight: bold;
        color: #4945ff;
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
              for="1"
            >
              <div
                class="c4"
              >
                Choose your meal
              </div>
            </label>
            <button
              aria-autocomplete="none"
              aria-controls="radix-0"
              aria-disabled="false"
              aria-expanded="true"
              aria-labelledby="1-hint 1-error"
              aria-required="false"
              class="c5"
              data-state="open"
              dir="ltr"
              id="1"
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
                  <span>
                    An icon
                  </span>
                </span>
                <span
                  class="c2 c7"
                >
                  <span
                    aria-label="pizza"
                    style="pointer-events: none;"
                  >
                    pizza
                  </span>
                </span>
              </span>
              <span
                class="c8"
              >
                <span
                  aria-hidden="true"
                  class="c9"
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
              class="c2 c10"
              id="1-hint"
            >
              Description line
            </p>
          </div>
        </div>
        <div
          class="c11"
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
            class="c12"
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
              class="c13"
              data-radix-select-viewport=""
              role="presentation"
              style="position: relative; flex: 1; overflow: auto;"
            >
              <div
                aria-labelledby="radix-4"
                aria-selected="true"
                class="c14"
                data-highlighted=""
                data-radix-collection-item=""
                data-state="checked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c15"
                >
                  <span
                    id="radix-4"
                  >
                    Pizza
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-5"
                aria-selected="false"
                class="c14"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c15"
                >
                  <span
                    id="radix-5"
                  >
                    Hamburger
                  </span>
                </span>
              </div>
              <div
                aria-labelledby="radix-6"
                aria-selected="false"
                class="c14"
                data-radix-collection-item=""
                data-state="unchecked"
                role="option"
                tabindex="-1"
              >
                <span
                  class="c2 c15"
                >
                  <span
                    id="radix-6"
                  >
                    Bagel
                  </span>
                </span>
              </div>
              <div
                class="c16"
                height="1px"
                id="intersection-1"
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
          <Option multi value="pizza">
            Pizza
          </Option>
          <Option multi value="hamburger">
            Hamburger
          </Option>
          <Option multi value="bagel">
            Bagel
          </Option>
        </Select>
      </ThemeProvider>,
      { container: document.body },
    );

    fireEvent.mouseDown(screen.getByRole('button', { name: /hamburger/i }));

    await waitFor(() => expect(container.querySelector('[role="listbox"]')).toBeInTheDocument());

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
        padding-right: 16px;
        padding-left: 16px;
      }

      .c11 {
        padding-left: 12px;
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

      .c20 {
        padding-right: 8px;
      }

      .c21 {
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

      .c14 {
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c23 {
        font-size: 0.875rem;
        line-height: 1.43;
        font-weight: 600;
        color: #4945ff;
      }

      .c25 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c16 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
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

      .c10 {
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
        width: 100%;
      }

      .c22 {
        border: 1px solid #4945ff;
        height: 18px;
        width: 18px;
        background-color: #4945ff;
      }

      .c22::after {
        content: '';
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .c24 {
        border: 1px solid #c0c0cf;
        height: 18px;
        width: 18px;
        background-color: #ffffff;
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

      <body
        style=""
      >
        <div>
          <div
            class="c0 c1"
          >
            <label
              class="c2"
              for="3"
            >
              <div
                class="c3"
              >
                Choose your meal
              </div>
            </label>
            <div
              class="c3 c4"
            >
              <button
                aria-describedby="3-hint"
                aria-disabled="false"
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="3 3-label 3-content"
                class="c5"
                id="3"
                type="button"
              />
              <div
                class="c6 c7"
              >
                <div
                  class="c3"
                >
                  <div
                    class="c8"
                  >
                    <span
                      class="c9"
                      id="3-content"
                    >
                      Hamburger
                      <span
                        class="c10"
                      >
                        pizza, hamburger
                      </span>
                    </span>
                  </div>
                </div>
                <div
                  class="c3"
                >
                  <button
                    aria-hidden="true"
                    class="c11 c12 c13"
                    tabindex="-1"
                    title="Carret Down Button"
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
              id="3-hint"
            >
              Description line
            </p>
          </div>
        </div>
        <div
          class="c10"
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
            style="position: fixed; left: 0px; top: 4px;"
          >
            <div
              class="c17"
            >
              <ul
                aria-labelledby="3-label"
                aria-multiselectable="true"
                class="c0 c1"
                role="listbox"
                tabindex="-1"
              >
                <li
                  aria-selected="true"
                  class="c18 c19"
                  data-strapi-value="pizza"
                  id="3-option-pizza"
                  role="option"
                >
                  <div
                    class="c3"
                  >
                    <div
                      aria-hidden="true"
                      class="c20"
                    >
                      <div
                        class="c21 c22"
                        overflow="hidden"
                      />
                    </div>
                    <span
                      class="c23"
                    >
                      Pizza
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="true"
                  class="c18 c19"
                  data-strapi-value="hamburger"
                  id="3-option-hamburger"
                  role="option"
                >
                  <div
                    class="c3"
                  >
                    <div
                      aria-hidden="true"
                      class="c20"
                    >
                      <div
                        class="c21 c22"
                        overflow="hidden"
                      />
                    </div>
                    <span
                      class="c23"
                    >
                      Hamburger
                    </span>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  class="c18 c19"
                  data-strapi-value="bagel"
                  id="3-option-bagel"
                  role="option"
                >
                  <div
                    class="c3"
                  >
                    <div
                      aria-hidden="true"
                      class="c20"
                    >
                      <div
                        class="c21 c24"
                        overflow="hidden"
                      />
                    </div>
                    <span
                      class="c25"
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
