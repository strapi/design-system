import * as React from 'react';

import { render } from '@testing-library/react';

import { Button } from '../../Button';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
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
      .c21 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #ffffff;
      }

      .c1 {
        padding-right: 40px;
        padding-left: 40px;
        position: fixed;
        z-index: 4;
      }

      .c4 {
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 2px 15px rgba(33,33,52,0.1);
      }

      .c6 {
        background: #f6f6f9;
        padding-top: 16px;
        padding-right: 20px;
        padding-bottom: 16px;
        padding-left: 20px;
      }

      .c9 {
        padding: 8px;
        border-radius: 4px;
        border-color: #dcdce4;
        border: 1px solid #dcdce4;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
      }

      .c12 {
        padding: 32px;
      }

      .c17 {
        background: #4945ff;
        padding: 8px;
        padding-right: 16px;
        padding-left: 16px;
        border-radius: 4px;
        border-color: #4945ff;
        border: 1px solid #4945ff;
        cursor: pointer;
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
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
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
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .c15 {
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

      .c18 {
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
        gap: 8px;
      }

      .c10 {
        position: relative;
        outline: none;
      }

      .c10 > svg {
        height: 12px;
        width: 12px;
      }

      .c10 > svg > g,
      .c10 > svg path {
        fill: #ffffff;
      }

      .c10[aria-disabled='true'] {
        pointer-events: none;
      }

      .c10:after {
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

      .c10:focus-visible {
        outline: none;
      }

      .c10:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c19 {
        height: 2rem;
        border: 1px solid #dcdce4;
        background: #ffffff;
      }

      .c19[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c19[aria-disabled='true'] .c20 {
        color: #666687;
      }

      .c19[aria-disabled='true'] svg > g,
      .c19[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c19[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c19[aria-disabled='true']:active .c20 {
        color: #666687;
      }

      .c19[aria-disabled='true']:active svg > g,
      .c19[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c19:hover {
        background-color: #f6f6f9;
      }

      .c19:active {
        background-color: #eaeaef;
      }

      .c19 .c20 {
        color: #32324d;
      }

      .c19 svg > g,
      .c19 svg path {
        fill: #32324d;
      }

      .c22 {
        height: 2rem;
        border: 1px solid #d9d8ff;
        background: #f0f0ff;
      }

      .c22[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c22[aria-disabled='true'] .c20 {
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

      .c22[aria-disabled='true']:active .c20 {
        color: #666687;
      }

      .c22[aria-disabled='true']:active svg > g,
      .c22[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c22:hover {
        background-color: #ffffff;
      }

      .c22:active {
        background-color: #ffffff;
        border: 1px solid #4945ff;
      }

      .c22:active .c20 {
        color: #4945ff;
      }

      .c22:active svg > g,
      .c22:active svg path {
        fill: #4945ff;
      }

      .c22 .c20 {
        color: #271fe0;
      }

      .c22 svg > g,
      .c22 svg path {
        fill: #271fe0;
      }

      .c23 {
        height: 2rem;
      }

      .c23[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c23[aria-disabled='true'] .c20 {
        color: #666687;
      }

      .c23[aria-disabled='true'] svg > g,
      .c23[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c23[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c23[aria-disabled='true']:active .c20 {
        color: #666687;
      }

      .c23[aria-disabled='true']:active svg > g,
      .c23[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c23:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c23:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c23 svg > g,
      .c23 svg path {
        fill: #ffffff;
      }

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

      .c3 {
        inset: 0;
        background: #32324d1F;
      }

      .c5 {
        width: 51.875rem;
      }

      .c11 svg > g,
      .c11 svg path {
        fill: #8e8ea9;
      }

      .c11:hover svg > g,
      .c11:hover svg path {
        fill: #666687;
      }

      .c11:active svg > g,
      .c11:active svg path {
        fill: #a5a5ba;
      }

      .c11[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c7 {
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid #eaeaef;
      }

      .c14 {
        border-radius: 0 0 4px 4px;
        border-top: 1px solid #eaeaef;
      }

      .c16 > * + * {
        margin-left: 8px;
      }

      .c13 {
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
            class="c1 c2 c3"
          >
            <div>
              <div>
                <div
                  aria-labelledby="title"
                  aria-modal="true"
                  class="c4 c5"
                  role="dialog"
                >
                  <div
                    class="c6 c7"
                  >
                    <div
                      class="c8"
                    >
                      Modal Title
                      <button
                        aria-disabled="false"
                        class="c9 c2 c10 c11"
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
                          height="1rem"
                          viewBox="0 0 24 24"
                          width="1rem"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24 2.417 21.583 0 12 9.583 2.417 0 0 2.417 9.583 12 0 21.583 2.417 24 12 14.417 21.583 24 24 21.583 14.417 12 24 2.417Z"
                            fill="#212134"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    class="c12 c13"
                  >
                    Hello World
                  </div>
                  <div
                    class="c6 c14"
                  >
                    <div
                      class="c8"
                    >
                      <div
                        class="c15 c16"
                      >
                        <button
                          aria-disabled="false"
                          class="c17 c18 c10 c19"
                          type="button"
                        >
                          <span
                            class="c20 c21"
                          >
                            Cancel
                          </span>
                        </button>
                      </div>
                      <div
                        class="c15 c16"
                      >
                        <button
                          aria-disabled="false"
                          class="c17 c18 c10 c22"
                          type="button"
                        >
                          <span
                            class="c20 c21"
                          >
                            Add new stuff
                          </span>
                        </button>
                        <button
                          aria-disabled="false"
                          class="c17 c18 c10 c23"
                          type="button"
                        >
                          <span
                            class="c20 c21"
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
