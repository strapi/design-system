/* eslint-disable react/display-name */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Alert } from '../Alert';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Alert', () => {
  it('snapshots the component with a "danger" variant', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Alert title="Danger variant" variant="danger" onClose={() => {}} closeLabel="Close notification">
          Alert with title and longer description, lorem ipsum dolor sit amet constrectum adipisicng lorem ipsum dolor
          sit amet consrectumis adipisingus.
        </Alert>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        padding-top: 20px;
        padding-right: 24px;
        padding-left: 20px;
        border-radius: 4px;
      }

      .c3 {
        padding-right: 12px;
      }

      .c6 {
        padding-right: 4px;
        padding-bottom: 8px;
      }

      .c8 {
        padding-right: 8px;
        padding-bottom: 20px;
      }

      .c7 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c9 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: flex-start;
        -webkit-box-align: flex-start;
        -ms-flex-align: flex-start;
        align-items: flex-start;
      }

      .c5 {
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c1 {
        border: 1px solid #f5c0b8;
        background: #fcecea;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c10 {
        border: none;
        background: transparent;
        font-size: 0.75rem;
        margin-top: 4px;
      }

      .c10 svg path {
        fill: #4a4a6a;
      }

      .c4 {
        font-size: 1.25rem;
      }

      .c4 svg path {
        fill: #b72b1a;
      }

      <div
        class="c0 c1"
      >
        <div
          class="c2"
        >
          <div
            class="c3 c4"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="1em"
              viewBox="0 0 24 24"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm1.154 18.456h-2.308V16.15h2.308v2.307zm-.23-3.687h-1.847l-.346-9.23h2.538l-.346 9.23z"
                fill="#212134"
              />
            </svg>
          </div>
          <div
            class="c5"
            role="alert"
          >
            <div
              class="c6"
            >
              <p
                class="c7"
              >
                Danger variant
              </p>
            </div>
            <div
              class="c8"
            >
              <p
                class="c9"
              >
                Alert with title and longer description, lorem ipsum dolor sit amet constrectum adipisicng lorem ipsum dolor sit amet consrectumis adipisingus.
              </p>
            </div>
          </div>
          <button
            aria-label="Close notification"
            class="c10"
          >
            <svg
              aria-hidden="true"
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
        </div>
      </div>
    `);
  });

  it('snapshots the component with a "success" variant', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Alert title="Danger variant" variant="success" onClose={() => {}} closeLabel="Close notification">
          Alert with title and longer description, lorem ipsum dolor sit amet constrectum adipisicng lorem ipsum dolor
          sit amet consrectumis adipisingus.
        </Alert>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        padding-top: 20px;
        padding-right: 24px;
        padding-left: 20px;
        border-radius: 4px;
      }

      .c3 {
        padding-right: 12px;
      }

      .c6 {
        padding-right: 4px;
        padding-bottom: 8px;
      }

      .c8 {
        padding-right: 8px;
        padding-bottom: 20px;
      }

      .c7 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c9 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: flex-start;
        -webkit-box-align: flex-start;
        -ms-flex-align: flex-start;
        align-items: flex-start;
      }

      .c5 {
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c1 {
        border: 1px solid #c6f0c2;
        background: #eafbe7;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c10 {
        border: none;
        background: transparent;
        font-size: 0.75rem;
        margin-top: 4px;
      }

      .c10 svg path {
        fill: #4a4a6a;
      }

      .c4 {
        font-size: 1.25rem;
      }

      .c4 svg path {
        fill: #2f6846;
      }

      <div
        class="c0 c1"
      >
        <div
          class="c2"
        >
          <div
            class="c3 c4"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="1em"
              viewBox="0 0 24 24"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-1.438-11.066L16.158 7.5 18 9.245l-7.438 7.18-4.462-4.1 1.84-1.745 2.622 2.354z"
                fill="#212134"
                fill-rule="evenodd"
              />
            </svg>
          </div>
          <div
            class="c5"
            role="status"
          >
            <div
              class="c6"
            >
              <p
                class="c7"
              >
                Danger variant
              </p>
            </div>
            <div
              class="c8"
            >
              <p
                class="c9"
              >
                Alert with title and longer description, lorem ipsum dolor sit amet constrectum adipisicng lorem ipsum dolor sit amet consrectumis adipisingus.
              </p>
            </div>
          </div>
          <button
            aria-label="Close notification"
            class="c10"
          >
            <svg
              aria-hidden="true"
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
        </div>
      </div>
    `);
  });

  it('snapshots the component with a "default" variant', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Alert title="Danger variant" onClose={() => {}} closeLabel="Close notification">
          Alert with title and longer description, lorem ipsum dolor sit amet constrectum adipisicng lorem ipsum dolor
          sit amet consrectumis adipisingus.
        </Alert>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        padding-top: 20px;
        padding-right: 24px;
        padding-left: 20px;
        border-radius: 4px;
      }

      .c3 {
        padding-right: 12px;
      }

      .c6 {
        padding-right: 4px;
        padding-bottom: 8px;
      }

      .c8 {
        padding-right: 8px;
        padding-bottom: 20px;
      }

      .c7 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c9 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: flex-start;
        -webkit-box-align: flex-start;
        -ms-flex-align: flex-start;
        align-items: flex-start;
      }

      .c5 {
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c1 {
        border: 1px solid #d9d8ff;
        background: #f0f0ff;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c10 {
        border: none;
        background: transparent;
        font-size: 0.75rem;
        margin-top: 4px;
      }

      .c10 svg path {
        fill: #4a4a6a;
      }

      .c4 {
        font-size: 1.25rem;
      }

      .c4 svg path {
        fill: #271fe0;
      }

      <div
        class="c0 c1"
      >
        <div
          class="c2"
        >
          <div
            class="c3 c4"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="1em"
              viewBox="0 0 24 24"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 4.92a1.56 1.56 0 110 3.12 1.56 1.56 0 010-3.12zm3.84 13.56h-7.2v-1.92h2.64v-5.28H9.36V9.36h3.84v7.2h2.64v1.92z"
                fill="#212134"
              />
            </svg>
          </div>
          <div
            class="c5"
            role="status"
          >
            <div
              class="c6"
            >
              <p
                class="c7"
              >
                Danger variant
              </p>
            </div>
            <div
              class="c8"
            >
              <p
                class="c9"
              >
                Alert with title and longer description, lorem ipsum dolor sit amet constrectum adipisicng lorem ipsum dolor sit amet consrectumis adipisingus.
              </p>
            </div>
          </div>
          <button
            aria-label="Close notification"
            class="c10"
          >
            <svg
              aria-hidden="true"
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
        </div>
      </div>
    `);
  });
});
