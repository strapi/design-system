/* eslint-disable react/display-name */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Alert } from '../Alert';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('@strapi/icons', () => ({
  AlertInfoIcon: () => <span>AlertInfoIcon</span>,
  AlertSucessIcon: () => <span>AlertSucessIcon</span>,
  AlertWarningIcon: () => <span>AlertWarningIcon</span>,
  CloseAlertIcon: () => <span>CloseAlertIcon</span>,
  ExternalLink: () => <span>ExternalLink</span>,
}));

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
            <span>
              AlertWarningIcon
            </span>
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
            <span>
              CloseAlertIcon
            </span>
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
            <span>
              AlertSucessIcon
            </span>
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
            <span>
              CloseAlertIcon
            </span>
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
            <span>
              AlertInfoIcon
            </span>
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
            <span>
              CloseAlertIcon
            </span>
          </button>
        </div>
      </div>
    `);
  });
});
