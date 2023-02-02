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

      .c20 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #32324d;
      }

      .c2 {
        padding-right: 40px;
        padding-left: 40px;
        position: fixed;
        z-index: 4;
      }

      .c5 {
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 2px 15px rgba(33,33,52,0.1);
      }

      .c7 {
        background: #f6f6f9;
        padding-top: 16px;
        padding-right: 20px;
        padding-bottom: 16px;
        padding-left: 20px;
      }

      .c10 {
        background: #ffffff;
        padding: 8px;
        border-radius: 4px;
        border-color: #dcdce4;
        border: 1px solid #dcdce4;
        cursor: pointer;
      }

      .c14 {
        padding: 32px;
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
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c9 {
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

      .c11 {
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

      .c12 {
        position: relative;
        outline: none;
      }

      .c12 svg {
        height: 12px;
        width: 12px;
      }

      .c12 svg > g,
      .c12 svg path {
        fill: #ffffff;
      }

      .c12[aria-disabled='true'] {
        pointer-events: none;
      }

      .c12:after {
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

      .c12:focus-visible {
        outline: none;
      }

      .c12:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
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
        border: 1px solid #dcdce4;
        background: #ffffff;
      }

      .c18 .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c18 .c19 {
        color: #ffffff;
      }

      .c18[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c18[aria-disabled='true'] .c19 {
        color: #666687;
      }

      .c18[aria-disabled='true'] svg > g,
      .c18[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c18[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c18[aria-disabled='true']:active .c19 {
        color: #666687;
      }

      .c18[aria-disabled='true']:active svg > g,
      .c18[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c18:hover {
        background-color: #f6f6f9;
      }

      .c18:active {
        background-color: #eaeaef;
      }

      .c18 .c19 {
        color: #32324d;
      }

      .c18 svg > g,
      .c18 svg path {
        fill: #32324d;
      }

      .c21 {
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

      .c21 .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c21 .c19 {
        color: #ffffff;
      }

      .c21[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c21[aria-disabled='true'] .c19 {
        color: #666687;
      }

      .c21[aria-disabled='true'] svg > g,
      .c21[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c21[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c21[aria-disabled='true']:active .c19 {
        color: #666687;
      }

      .c21[aria-disabled='true']:active svg > g,
      .c21[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c21:hover {
        background-color: #ffffff;
      }

      .c21:active {
        background-color: #ffffff;
        border: 1px solid #4945ff;
      }

      .c21:active .c19 {
        color: #4945ff;
      }

      .c21:active svg > g,
      .c21:active svg path {
        fill: #4945ff;
      }

      .c21 .c19 {
        color: #271fe0;
      }

      .c21 svg > g,
      .c21 svg path {
        fill: #271fe0;
      }

      .c22 {
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

      .c22 .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c22 .c19 {
        color: #ffffff;
      }

      .c22[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c22[aria-disabled='true'] .c19 {
        color: #666687;
      }

      .c22[aria-disabled='true'] svg > g,
      .c22[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c22[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c22[aria-disabled='true']:active .c19 {
        color: #666687;
      }

      .c22[aria-disabled='true']:active svg > g,
      .c22[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c22:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c22:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c22 svg > g,
      .c22 svg path {
        fill: #ffffff;
      }

      .c4 {
        inset: 0;
        background: #32324d1F;
      }

      .c6 {
        width: 51.875rem;
      }

      .c13 {
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

      .c13 svg > g,
      .c13 svg path {
        fill: #8e8ea9;
      }

      .c13:hover svg > g,
      .c13:hover svg path {
        fill: #666687;
      }

      .c13:active svg > g,
      .c13:active svg path {
        fill: #a5a5ba;
      }

      .c13[aria-disabled='true'] {
        background-color: #eaeaef;
      }

      .c13[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c8 {
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid #eaeaef;
      }

      .c16 {
        border-radius: 0 0 4px 4px;
        border-top: 1px solid #eaeaef;
      }

      .c17 > * + * {
        margin-left: 8px;
      }

      .c15 {
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
            class="c1 c2 c3 c4"
          >
            <div>
              <div>
                <div
                  aria-labelledby="title"
                  aria-modal="true"
                  class="c1 c5 c6"
                  role="dialog"
                >
                  <div
                    class="c1 c7 c8"
                  >
                    <div
                      class="c1 c9"
                    >
                      Modal Title
                      <button
                        aria-disabled="false"
                        class="c1 c10 c11 c12 c13"
                        cursor="pointer"
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
                    class="c1 c14 c15"
                  >
                    Hello World
                  </div>
                  <div
                    class="c1 c7 c16"
                  >
                    <div
                      class="c1 c9"
                    >
                      <div
                        class="c1 c11 c17"
                      >
                        <button
                          aria-disabled="false"
                          class="c1 c10 c11 c12 c18"
                          cursor="pointer"
                          type="button"
                        >
                          <span
                            class="c19 c20"
                          >
                            Cancel
                          </span>
                        </button>
                      </div>
                      <div
                        class="c1 c11 c17"
                      >
                        <button
                          aria-disabled="false"
                          class="c1 c10 c11 c12 c21"
                          cursor="pointer"
                          type="button"
                        >
                          <span
                            class="c19 c20"
                          >
                            Add new stuff
                          </span>
                        </button>
                        <button
                          aria-disabled="false"
                          class="c1 c10 c11 c12 c22"
                          cursor="pointer"
                          type="button"
                        >
                          <span
                            class="c19 c20"
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
