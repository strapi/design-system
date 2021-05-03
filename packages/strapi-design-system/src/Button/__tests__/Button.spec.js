import * as React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../Button';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Button', () => {
  it('matches snapshot', () => {
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

      .c0:disabled {
        cursor: unset;
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0:disabled .c1 {
        color: #8e8ea9;
      }

      .c0:disabled svg > g,
      .c0:disabled svg path {
        fill: #8e8ea9;
      }

      .c0:disabled:hover {
        cursor: unset;
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c0:disabled:hover .c1 {
        color: #8e8ea9;
      }

      .c0:disabled:hover svg > g,
      .c0:disabled:hover svg path {
        fill: #8e8ea9;
      }

      .c0:hover {
        background: #7b79ff;
      }

      .c0:active {
        background: #4945ff;
      }

      <button
        class="c0"
      >
        <p
          class="c1 c2"
        >
          Hello world
        </p>
      </button>
    `);
  });
});
