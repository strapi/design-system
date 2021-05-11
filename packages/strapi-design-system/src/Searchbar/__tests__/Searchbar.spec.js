/* eslint-disable react/display-name */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Searchbar } from '../Searchbar';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('uuid', () => ({
  v4: () => 1,
}));

jest.mock('@strapi/icons', () => ({
  SearchIcon: () => <span>SearchIcon</span>,
  CloseAlertIcon: () => <span>CloseAlertIcon</span>,
}));

describe('Searchbar', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Searchbar
          name="searchbar"
          onClear={() => {}}
          value={'value'}
          onChange={(e) => {}}
          clearLabel="Clearing the plugin search"
          placeholder="e.g: strapi-plugin-abcd"
        >
          Searching for a plugin
        </Searchbar>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
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

      .c6 {
        padding-right: 8px;
        padding-left: 12px;
      }

      .c11 {
        padding-right: 12px;
        padding-left: 8px;
      }

      .c10 {
        border: none;
        padding-left: 0;
        padding-right: 0;
        padding-top: 12px;
        padding-bottom: 12px;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
      }

      .c10::-webkit-input-placeholder {
        color: #8e8ea9;
      }

      .c10::-moz-placeholder {
        color: #8e8ea9;
      }

      .c10:-ms-input-placeholder {
        color: #8e8ea9;
      }

      .c10::placeholder {
        color: #8e8ea9;
      }

      .c10:disabled {
        background: inherit;
        color: inherit;
      }

      .c10:focus {
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

      .c12 {
        border: none;
        background: transparent;
        font-size: 1.6rem;
        width: auto;
        padding: 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c1 {
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

      .c13 {
        font-size: 0.5rem;
      }

      .c13 svg path {
        fill: #a5a5ba;
      }

      .c9 {
        font-size: 0.8rem;
      }

      .c9 svg path {
        fill: #32324d;
      }

      .c0 {
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c0:focus-within .c7 svg path {
        fill: #4945ff;
      }

      .c0 .c3 {
        border: 1px solid transparent;
      }

      .c0 .c3:focus-within {
        border: 1px solid #4945ff;
      }

      <div
        class="c0"
      >
        <div>
          <div
            class="c1"
          >
            <label
              class="c2"
              for="field-1"
            >
              Searching for a plugin
            </label>
          </div>
          <div
            class="c3 c4 c5"
          >
            <div
              class="c6"
            >
              <div
                class="c7 c8 c9"
              >
                <span>
                  SearchIcon
                </span>
              </div>
            </div>
            <input
              aria-invalid="false"
              class="c10"
              id="field-1"
              name="searchbar"
              placeholder="e.g: strapi-plugin-abcd"
              value="value"
            />
            <div
              class="c11"
            >
              <button
                aria-label="Clearing the plugin search"
                class="c12"
              >
                <div
                  aria-hidden="true"
                  class="c8 c13"
                >
                  <span>
                    CloseAlertIcon
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
