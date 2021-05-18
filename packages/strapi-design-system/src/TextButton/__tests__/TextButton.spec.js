import * as React from 'react';
import { render } from '@testing-library/react';
import { TextButton } from '../TextButton';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('TextButton', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TextButton rightIcon={<span>Right icon</span>} leftIcon={<span>Left icon</span>}>
          Click on me
        </TextButton>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        padding-right: 8px;
      }

      .c4 {
        padding-left: 8px;
      }

      .c3 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #4945ff;
      }

      .c0 {
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

      .c1 {
        background: transparent;
        border: none;
      }

      .c1 svg {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        font-size: 0.625rem;
      }

      .c1 svg path {
        fill: #4945ff;
      }

      <button
        aria-disabled="false"
        class="c0 c1"
      >
        <span
          aria-hidden="true"
          class="c2"
        >
          <span>
            Left icon
          </span>
        </span>
        <span
          class="c3"
        >
          Click on me
        </span>
        <span
          aria-hidden="true"
          class="c4"
        >
          <span>
            Right icon
          </span>
        </span>
      </button>
    `);
  });

  it('snapshots the component when disabled', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TextButton rightIcon={<span>Right icon</span>} leftIcon={<span>Left icon</span>} disabled>
          Click on me
        </TextButton>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        padding-right: 8px;
      }

      .c4 {
        padding-left: 8px;
      }

      .c3 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c0 {
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

      .c1 {
        background: transparent;
        border: none;
      }

      .c1 svg {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        font-size: 0.625rem;
      }

      .c1 svg path {
        fill: #4945ff;
      }

      <button
        aria-disabled="true"
        class="c0 c1"
      >
        <span
          aria-hidden="true"
          class="c2"
        >
          <span>
            Left icon
          </span>
        </span>
        <span
          class="c3"
        >
          Click on me
        </span>
        <span
          aria-hidden="true"
          class="c4"
        >
          <span>
            Right icon
          </span>
        </span>
      </button>
    `);
  });
});
