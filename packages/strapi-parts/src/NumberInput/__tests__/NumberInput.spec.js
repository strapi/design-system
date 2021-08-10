import * as React from 'react';
import { render } from '@testing-library/react';
import { NumberInput } from '../NumberInput';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('NumberInput', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <NumberInput
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          error={undefined}
          onChange={() => {}}
          value={undefined}
          labelAction={<span>Hello world</span>}
          onValueChange={() => {}}
        />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c10 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c1 {
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

      .c3 {
        padding-left: 4px;
      }

      .c7 {
        padding-right: 12px;
        padding-left: 8px;
      }

      .c6 {
        border: none;
        padding-left: 16px;
        padding-right: 0;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
        height: 2.5rem;
      }

      .c6::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c6::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c6:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c6::placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c6:disabled {
        background: inherit;
        color: inherit;
      }

      .c6:focus {
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

      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 4px;
      }

      .c8 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 1rem;
        -webkit-align-items: flex-end;
        -webkit-box-align: flex-end;
        -ms-flex-align: flex-end;
        align-items: flex-end;
        margin-bottom: 4px;
      }

      .c8 svg {
        display: block;
        height: 0.25rem;
        -webkit-transform: rotateX(180deg);
        -ms-transform: rotateX(180deg);
        transform: rotateX(180deg);
      }

      .c9 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 1rem;
        -webkit-align-items: flex-start;
        -webkit-box-align: flex-start;
        -ms-flex-align: flex-start;
        align-items: flex-start;
        margin-bottom: 0;
      }

      .c9 svg {
        display: block;
        height: 0.25rem;
      }

      <div>
        <div>
          <div
            class="c0"
          >
            <div
              class="c1"
            >
              <label
                class="c2"
                for="numberinput-1"
              >
                Content
              </label>
              <div
                class="c3"
              >
                <span>
                  Hello world
                </span>
              </div>
            </div>
            <div
              class="c4 c5"
            >
              <input
                aria-describedby="numberinput-1-hint"
                aria-invalid="false"
                class="c6"
                id="numberinput-1"
                name="content"
                placeholder="This is a content placeholder"
                type="text"
                value=""
              />
              <div
                class="c7"
              >
                <button
                  aria-hidden="true"
                  class="c8"
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
                <button
                  aria-hidden="true"
                  class="c9"
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
            </div>
            <p
              class="c10"
              id="numberinput-1-hint"
            >
              Description line
            </p>
          </div>
        </div>
      </div>
    `);
  });
});
