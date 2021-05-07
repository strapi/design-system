import * as React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../Button';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Button', () => {
  it('matches snapshot of the default variant', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Button>Hello world</Button>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 4px;
        background: #4945ff;
        border: none;
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c0 .sc-iCfLBT {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 1px;
      }

      .c0 .c1 {
        color: #ffffff;
      }

      .c0 svg {
        height: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true'] .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true'] svg > g,
      .c0[aria-disabled='true'] svg path {
        fill: #8e8ea9;
      }

      .c0[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true']:active .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true']:active svg > g,
      .c0[aria-disabled='true']:active svg path {
        fill: #8e8ea9;
      }

      .c0:hover {
        background: #7b79ff;
      }

      .c0:active {
        background: #4945ff;
      }

      <button
        aria-disabled="false"
        class="c0"
      >
        <span
          class="c1 c2"
        >
          Hello world
        </span>
      </button>
    `);
  });

  it('matches snapshot of the secondary variant', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Button variant="secondary">Submit</Button>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 4px;
        background: #4945ff;
        border: none;
        border: 1px solid #d9d8ff;
        background: #f0f0ff;
      }

      .c0 .sc-iCfLBT {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 1px;
      }

      .c0 .c1 {
        color: #ffffff;
      }

      .c0 svg {
        height: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true'] .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true'] svg > g,
      .c0[aria-disabled='true'] svg path {
        fill: #8e8ea9;
      }

      .c0[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true']:active .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true']:active svg > g,
      .c0[aria-disabled='true']:active svg path {
        fill: #8e8ea9;
      }

      .c0:hover {
        background-color: #ffffff;
      }

      .c0:active {
        background-color: #ffffff;
        border: 1px solid #4945ff;
      }

      .c0:active .c1 {
        color: #4945ff;
      }

      .c0:active svg > g,
      .c0:active svg path {
        fill: #4945ff;
      }

      .c0 .c1 {
        color: #271fe0;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #271fe0;
      }

      <button
        aria-disabled="false"
        class="c0"
      >
        <span
          class="c1 c2"
        >
          Submit
        </span>
      </button>
    `);
  });

  it('matches snapshot of the success variant', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Button variant="success">Success</Button>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 4px;
        background: #4945ff;
        border: none;
        border: 1px solid #338648;
        background: #338648;
      }

      .c0 .sc-iCfLBT {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 1px;
      }

      .c0 .c1 {
        color: #ffffff;
      }

      .c0 svg {
        height: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true'] .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true'] svg > g,
      .c0[aria-disabled='true'] svg path {
        fill: #8e8ea9;
      }

      .c0[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true']:active .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true']:active svg > g,
      .c0[aria-disabled='true']:active svg path {
        fill: #8e8ea9;
      }

      .c0:hover {
        background: #5cb176;
      }

      .c0:active {
        background: #338648;
      }

      <button
        aria-disabled="false"
        class="c0"
      >
        <span
          class="c1 c2"
        >
          Success
        </span>
      </button>
    `);
  });

  it('matches snapshot of the danger-light variant', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Button variant="danger-light">Remove</Button>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 4px;
        background: #4945ff;
        border: none;
        border: 1px solid #f5c0b8;
        background: #fcecea;
      }

      .c0 .sc-iCfLBT {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 1px;
      }

      .c0 .c1 {
        color: #ffffff;
      }

      .c0 svg {
        height: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true'] .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true'] svg > g,
      .c0[aria-disabled='true'] svg path {
        fill: #8e8ea9;
      }

      .c0[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true']:active .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true']:active svg > g,
      .c0[aria-disabled='true']:active svg path {
        fill: #8e8ea9;
      }

      .c0:hover {
        background-color: #ffffff;
      }

      .c0:active {
        background-color: #ffffff;
        border: 1px solid #dd2b23;
      }

      .c0:active .c1 {
        color: #dd2b23;
      }

      .c0:active svg > g,
      .c0:active svg path {
        fill: #dd2b23;
      }

      .c0 .c1 {
        color: #b72b1a;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #b72b1a;
      }

      <button
        aria-disabled="false"
        class="c0"
      >
        <span
          class="c1 c2"
        >
          Remove
        </span>
      </button>
    `);
  });

  it('matches snapshot of the L size button', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Button size="L">Button</Button>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 4px;
        background: #4945ff;
        border: none;
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c0 .sc-iCfLBT {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 3px;
      }

      .c0 .c1 {
        color: #ffffff;
      }

      .c0 svg {
        height: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true'] .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true'] svg > g,
      .c0[aria-disabled='true'] svg path {
        fill: #8e8ea9;
      }

      .c0[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0[aria-disabled='true']:active .c1 {
        color: #8e8ea9;
      }

      .c0[aria-disabled='true']:active svg > g,
      .c0[aria-disabled='true']:active svg path {
        fill: #8e8ea9;
      }

      .c0:hover {
        background: #7b79ff;
      }

      .c0:active {
        background: #4945ff;
      }

      <button
        aria-disabled="false"
        class="c0"
      >
        <span
          class="c1 c2"
        >
          Button
        </span>
      </button>
    `);
  });
});
