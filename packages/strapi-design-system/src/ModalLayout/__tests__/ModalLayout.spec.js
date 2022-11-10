import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { Button } from '../../Button';
import { ModalLayout, ModalHeader, ModalBody, ModalFooter } from '../index';

describe('ModalLayout', () => {
  it('should render component and match snapshot', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <ModalLayout onClose={() => jest.fn()} labelledBy="title">
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>Hello World</ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={() => jest.fn} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button variant="secondary">Add new stuff</Button>
                <Button onClick={() => jest.fn()}>Finish</Button>
              </>
            }
          />
        </ModalLayout>
      </ThemeProvider>,
    );

    expect(document.body).toMatchInlineSnapshot(`
      .c0 {
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

      .c17 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        line-height: 1.14;
        color: #32324d;
      }

      .c3 {
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 2px 15px rgba(33,33,52,0.1);
      }

      .c5 {
        background: #f6f6f9;
        padding-top: 16px;
        padding-right: 20px;
        padding-bottom: 16px;
        padding-left: 20px;
      }

      .c10 {
        padding: 32px;
      }

      .c8 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #dcdce4;
        position: relative;
        outline: none;
      }

      .c8 svg {
        height: 12px;
        width: 12px;
      }

      .c8 svg > g,
      .c8 svg path {
        fill: #ffffff;
      }

      .c8[aria-disabled='true'] {
        pointer-events: none;
      }

      .c8:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c8:focus-visible {
        outline: none;
      }

      .c8:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c15 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #4945ff;
        border: 1px solid #4945ff;
        height: 2rem;
        padding-left: 16px;
        padding-right: 16px;
        border: 1px solid #dcdce4;
        background: #ffffff;
      }

      .c15 .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c15 .c16 {
        color: #ffffff;
      }

      .c15[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c15[aria-disabled='true'] .c16 {
        color: #666687;
      }

      .c15[aria-disabled='true'] svg > g,.c15[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c15[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c15[aria-disabled='true']:active .c16 {
        color: #666687;
      }

      .c15[aria-disabled='true']:active svg > g,.c15[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c15:hover {
        background-color: #f6f6f9;
      }

      .c15:active {
        background-color: #eaeaef;
      }

      .c15 .c16 {
        color: #32324d;
      }

      .c15 svg > g,
      .c15 svg path {
        fill: #32324d;
      }

      .c18 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #4945ff;
        border: 1px solid #4945ff;
        height: 2rem;
        padding-left: 16px;
        padding-right: 16px;
        border: 1px solid #d9d8ff;
        background: #f0f0ff;
      }

      .c18 .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c18 .c16 {
        color: #ffffff;
      }

      .c18[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c18[aria-disabled='true'] .c16 {
        color: #666687;
      }

      .c18[aria-disabled='true'] svg > g,.c18[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c18[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c18[aria-disabled='true']:active .c16 {
        color: #666687;
      }

      .c18[aria-disabled='true']:active svg > g,.c18[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c18:hover {
        background-color: #ffffff;
      }

      .c18:active {
        background-color: #ffffff;
        border: 1px solid #4945ff;
      }

      .c18:active .c16 {
        color: #4945ff;
      }

      .c18:active svg > g,
      .c18:active svg path {
        fill: #4945ff;
      }

      .c18 .c16 {
        color: #271fe0;
      }

      .c18 svg > g,
      .c18 svg path {
        fill: #271fe0;
      }

      .c19 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #4945ff;
        border: 1px solid #4945ff;
        height: 2rem;
        padding-left: 16px;
        padding-right: 16px;
      }

      .c19 .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c19 .c16 {
        color: #ffffff;
      }

      .c19[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c19[aria-disabled='true'] .c16 {
        color: #666687;
      }

      .c19[aria-disabled='true'] svg > g,.c19[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c19[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c19[aria-disabled='true']:active .c16 {
        color: #666687;
      }

      .c19[aria-disabled='true']:active svg > g,.c19[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c19:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c19:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c19 svg > g,
      .c19 svg path {
        fill: #ffffff;
      }

      .c1 {
        position: fixed;
        z-index: 4;
        inset: 0;
        background: #32324d1F;
        padding: 0 40px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c4 {
        width: 51.875rem;
      }

      .c7 {
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

      .c13 {
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

      .c9 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: 2rem;
        width: 2rem;
      }

      .c9 svg > g,
      .c9 svg path {
        fill: #8e8ea9;
      }

      .c9:hover svg > g,
      .c9:hover svg path {
        fill: #666687;
      }

      .c9:active svg > g,
      .c9:active svg path {
        fill: #a5a5ba;
      }

      .c9[aria-disabled='true'] {
        background-color: #eaeaef;
      }

      .c9[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c6 {
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid #eaeaef;
      }

      .c12 {
        border-radius: 0 0 4px 4px;
        border-top: 1px solid #eaeaef;
      }

      .c14 > * + * {
        margin-left: 8px;
      }

      .c11 {
        overflow: auto;
        max-height: 60vh;
      }

      <body
        class="lock-body-scroll"
      >
        <div>
          <div
            class="c0"
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
        </div>
        <div
          data-react-portal="true"
        >
          <div
            class="c1"
          >
            <div>
              <div>
                <div
                  aria-labelledby="title"
                  aria-modal="true"
                  class="c2 c3 c4"
                  role="dialog"
                >
                  <div
                    class="c2 c5 c6"
                  >
                    <div
                      class="c2 c7"
                    >
                      Modal Title
                      <button
                        aria-disabled="false"
                        class="c8 c9"
                        type="button"
                      >
                        <span
                          class="c0"
                        >
                          Close the modal
                        </span>
                        <svg
                          aria-hidden="true"
                          fill="none"
                          focusable="false"
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
                    </div>
                  </div>
                  <div
                    class="c2 c10 c11"
                  >
                    Hello World
                  </div>
                  <div
                    class="c2 c5 c12"
                  >
                    <div
                      class="c2 c7"
                    >
                      <div
                        class="c2 c13 c14"
                      >
                        <button
                          aria-disabled="false"
                          class="c8 c15"
                          type="button"
                        >
                          <span
                            class="c16 c17"
                          >
                            Cancel
                          </span>
                        </button>
                      </div>
                      <div
                        class="c2 c13 c14"
                      >
                        <button
                          aria-disabled="false"
                          class="c8 c18"
                          type="button"
                        >
                          <span
                            class="c16 c17"
                          >
                            Add new stuff
                          </span>
                        </button>
                        <button
                          aria-disabled="false"
                          class="c8 c19"
                          type="button"
                        >
                          <span
                            class="c16 c17"
                          >
                            Finish
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    `);
  });
});
