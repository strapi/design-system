import * as React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { ModalLayout } from '../ModalLayout';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';

describe('ModalLayout', () => {
  it('snapshots the component', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <ModalLayout onClose={() => undefined}>
          <ModalHeader>
            <span>Title</span>
          </ModalHeader>
          <ModalBody>Hello world</ModalBody>
          <ModalFooter
            startActions={<button>Cancel</button>}
            endActions={
              <>
                <button>Add new stuff</button>
                <button>Finish</button>
              </>
            }
          />
        </ModalLayout>
      </ThemeProvider>,
      { container: document.body },
    );

    await waitFor(() => screen.getByRole('dialog'));

    expect(container).toMatchInlineSnapshot(`
      .c1 {
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 2px 15px rgba(33,33,52,0.1);
      }

      .c3 {
        background: #f6f6f9;
        padding-top: 16px;
        padding-right: 20px;
        padding-bottom: 16px;
        padding-left: 20px;
      }

      .c8 {
        padding-top: 24px;
        padding-right: 40px;
        padding-bottom: 24px;
        padding-left: 40px;
      }

      .c12 {
        background: #212134;
        padding: 8px;
        border-radius: 4px;
      }

      .c0 {
        position: absolute;
        inset: 0;
        background: rgb(220,220,228,0.8);
        padding: 0 40px;
      }

      .c2 {
        max-width: 51.875rem;
        margin: 0 auto;
        overflow: hidden;
        margin-top: 10%;
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

      .c10 {
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

      .c9 {
        border-top: 1px solid #eaeaef;
      }

      .c11 > * + * {
        margin-left: 8px;
      }

      .c15 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #ffffff;
      }

      .c14 {
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
        position: absolute;
        display: revert;
      }

      .c6 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #dcdce4;
      }

      .c6 svg {
        height: 12px;
        width: 12px;
      }

      .c6 svg > g,
      .c6 svg path {
        fill: #ffffff;
      }

      .c6[aria-disabled='true'] {
        pointer-events: none;
      }

      .c7 svg > g,
      .c7 svg path {
        fill: #8e8ea9;
      }

      .c7:hover svg > g,
      .c7:hover svg path {
        fill: #666687;
      }

      .c7:active svg > g,
      .c7:active svg path {
        fill: #a5a5ba;
      }

      .c4 {
        border-bottom: 1px solid #eaeaef;
      }

      <body>
        <div
          data-react-portal="true"
        >
          <div
            class="c0"
          >
            <div>
              <div
                aria-modal="true"
                class="c1 c2"
                role="dialog"
              >
                <div
                  class="c3 c4"
                >
                  <div
                    class="c5"
                  >
                    <span>
                      Title
                    </span>
                    <span>
                      <button
                        aria-disabled="false"
                        aria-labelledby="tooltip-1"
                        class="c6 c7"
                        tabindex="0"
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
                    </span>
                  </div>
                </div>
                <div
                  class="c8"
                >
                  Hello world
                </div>
                <div
                  class="c3 c9"
                >
                  <div
                    class="c5"
                  >
                    <div
                      class="c10 c11"
                    >
                      <button>
                        Cancel
                      </button>
                    </div>
                    <div
                      class="c10 c11"
                    >
                      <button>
                        Add new stuff
                      </button>
                      <button>
                        Finish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-react-portal="true"
        >
          <div
            class="c12 c13"
            id="tooltip-1"
            role="tooltip"
            style="left: 0px; top: -8px;"
          >
            <div
              class="c14"
              id="description-2"
            />
            <p
              class="c15"
            >
              Close the modal
            </p>
          </div>
        </div>
      </body>
    `);
  });
});
