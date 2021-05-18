import * as React from 'react';
import { render } from '@testing-library/react';
import { Switch } from '../Switch';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Switch', () => {
  it('snapshots the switch component when it s checked', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Switch label="Activate the microphone" selected={true} onChange={() => {}} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
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

      .c3 {
        background: #ee5e52;
        border: none;
        border-radius: 16px;
        position: relative;
        height: 1.5rem;
        width: 2.5rem;
      }

      .c3 span {
        font-size: 0;
      }

      .c3:before {
        content: '';
        background: #ffffff;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: absolute;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        left: 4px;
        top: 4px;
      }

      .c0 {
        background: transparent;
        padding: 0;
        border: none;
      }

      .c0[aria-checked='true'] .c2 {
        background: #5cb176;
      }

      .c0[aria-checked='true'] .c2:before {
        -webkit-transform: translateX(1rem);
        -ms-transform: translateX(1rem);
        transform: translateX(1rem);
      }

      @media (prefers-reduced-motion:reduce) {
        .c3:before {
          -webkit-transition: none;
          transition: none;
        }
      }

      <button
        aria-checked="true"
        aria-label="Activate the microphone"
        class="c0"
        role="switch"
      >
        <div
          class="c1"
        >
          <div
            class="c2 c3"
          >
            <span>
              On
            </span>
            <span>
              Off
            </span>
          </div>
        </div>
      </button>
    `);
  });

  it('snapshots the switch component when it s not checked', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Switch label="Activate the microphone" selected={false} onChange={() => {}} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
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

      .c3 {
        background: #ee5e52;
        border: none;
        border-radius: 16px;
        position: relative;
        height: 1.5rem;
        width: 2.5rem;
      }

      .c3 span {
        font-size: 0;
      }

      .c3:before {
        content: '';
        background: #ffffff;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: absolute;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        left: 4px;
        top: 4px;
      }

      .c0 {
        background: transparent;
        padding: 0;
        border: none;
      }

      .c0[aria-checked='true'] .c2 {
        background: #5cb176;
      }

      .c0[aria-checked='true'] .c2:before {
        -webkit-transform: translateX(1rem);
        -ms-transform: translateX(1rem);
        transform: translateX(1rem);
      }

      @media (prefers-reduced-motion:reduce) {
        .c3:before {
          -webkit-transition: none;
          transition: none;
        }
      }

      <button
        aria-checked="false"
        aria-label="Activate the microphone"
        class="c0"
        role="switch"
      >
        <div
          class="c1"
        >
          <div
            class="c2 c3"
          >
            <span>
              On
            </span>
            <span>
              Off
            </span>
          </div>
        </div>
      </button>
    `);
  });

  it('snapshots the switch component when it s not checked with visible labels', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Switch label="Activate the microphone" selected={false} onChange={() => {}} visibleLabels />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
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
        color: #d02b20;
        padding-left: 8px;
      }

      .c3 {
        background: #ee5e52;
        border: none;
        border-radius: 16px;
        position: relative;
        height: 1.5rem;
        width: 2.5rem;
      }

      .c3 span {
        font-size: 0;
      }

      .c3:before {
        content: '';
        background: #ffffff;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: absolute;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        left: 4px;
        top: 4px;
      }

      .c0 {
        background: transparent;
        padding: 0;
        border: none;
      }

      .c0[aria-checked='true'] .c2 {
        background: #5cb176;
      }

      .c0[aria-checked='true'] .c2:before {
        -webkit-transform: translateX(1rem);
        -ms-transform: translateX(1rem);
        transform: translateX(1rem);
      }

      @media (prefers-reduced-motion:reduce) {
        .c3:before {
          -webkit-transition: none;
          transition: none;
        }
      }

      <button
        aria-checked="false"
        aria-label="Activate the microphone"
        class="c0"
        role="switch"
      >
        <div
          class="c1"
        >
          <div
            class="c2 c3"
          >
            <span>
              On
            </span>
            <span>
              Off
            </span>
          </div>
          <span
            aria-hidden="true"
            class="c4"
          >
            Off
          </span>
        </div>
      </button>
    `);
  });
});
