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
      .c3 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c0 {
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

      .c0 svg {
        height: 12px;
        width: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
      }

      .c1 {
        padding: 8px 16px;
        background: #4945ff;
        border: none;
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c1 .sc-iCoGMd {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 2px;
      }

      .c1 .c2 {
        color: #ffffff;
      }

      .c1[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true'] .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true'] svg > g,
      .c1[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c1[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true']:active .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true']:active svg > g,
      .c1[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c1:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c1:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      <button
        aria-disabled="false"
        class="c0 c1"
        type="button"
      >
        <span
          class="c2 c3"
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
      .c3 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c0 {
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

      .c0 svg {
        height: 12px;
        width: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
      }

      .c1 {
        padding: 8px 16px;
        background: #4945ff;
        border: none;
        border: 1px solid #d9d8ff;
        background: #f0f0ff;
      }

      .c1 .sc-iCoGMd {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 2px;
      }

      .c1 .c2 {
        color: #ffffff;
      }

      .c1[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true'] .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true'] svg > g,
      .c1[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c1[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true']:active .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true']:active svg > g,
      .c1[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c1:hover {
        background-color: #ffffff;
      }

      .c1:active {
        background-color: #ffffff;
        border: 1px solid #4945ff;
      }

      .c1:active .c2 {
        color: #4945ff;
      }

      .c1:active svg > g,
      .c1:active svg path {
        fill: #4945ff;
      }

      .c1 .c2 {
        color: #271fe0;
      }

      .c1 svg > g,
      .c1 svg path {
        fill: #271fe0;
      }

      <button
        aria-disabled="false"
        class="c0 c1"
        type="button"
      >
        <span
          class="c2 c3"
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
      .c3 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c0 {
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

      .c0 svg {
        height: 12px;
        width: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
      }

      .c1 {
        padding: 8px 16px;
        background: #4945ff;
        border: none;
        border: 1px solid #328048;
        background: #328048;
      }

      .c1 .sc-iCoGMd {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 2px;
      }

      .c1 .c2 {
        color: #ffffff;
      }

      .c1[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true'] .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true'] svg > g,
      .c1[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c1[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true']:active .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true']:active svg > g,
      .c1[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c1:hover {
        border: 1px solid #5cb176;
        background: #5cb176;
      }

      .c1:active {
        border: 1px solid #328048;
        background: #328048;
      }

      <button
        aria-disabled="false"
        class="c0 c1"
        type="button"
      >
        <span
          class="c2 c3"
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
      .c3 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c0 {
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

      .c0 svg {
        height: 12px;
        width: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
      }

      .c1 {
        padding: 8px 16px;
        background: #4945ff;
        border: none;
        border: 1px solid #f5c0b8;
        background: #fcecea;
      }

      .c1 .sc-iCoGMd {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 2px;
      }

      .c1 .c2 {
        color: #ffffff;
      }

      .c1[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true'] .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true'] svg > g,
      .c1[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c1[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true']:active .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true']:active svg > g,
      .c1[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c1:hover {
        background-color: #ffffff;
      }

      .c1:active {
        background-color: #ffffff;
        border: 1px solid #d02b20;
      }

      .c1:active .c2 {
        color: #d02b20;
      }

      .c1:active svg > g,
      .c1:active svg path {
        fill: #d02b20;
      }

      .c1 .c2 {
        color: #b72b1a;
      }

      .c1 svg > g,
      .c1 svg path {
        fill: #b72b1a;
      }

      <button
        aria-disabled="false"
        class="c0 c1"
        type="button"
      >
        <span
          class="c2 c3"
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
      .c3 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c4 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c0 {
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

      .c0 svg {
        height: 12px;
        width: 12px;
      }

      .c0 svg > g,
      .c0 svg path {
        fill: #ffffff;
      }

      .c0[aria-disabled='true'] {
        pointer-events: none;
      }

      .c1 {
        padding: 10px 16px;
        background: #4945ff;
        border: none;
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c1 .sc-iCoGMd {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 2px;
      }

      .c1 .c2 {
        color: #ffffff;
      }

      .c1[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true'] .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true'] svg > g,
      .c1[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c1[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c1[aria-disabled='true']:active .c2 {
        color: #666687;
      }

      .c1[aria-disabled='true']:active svg > g,
      .c1[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c1:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c1:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      <button
        aria-disabled="false"
        class="c0 c1"
        type="button"
      >
        <span
          class="c2 c3 c4"
        >
          Button
        </span>
      </button>
    `);
  });
});
