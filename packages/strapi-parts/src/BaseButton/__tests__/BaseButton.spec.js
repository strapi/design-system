import * as React from 'react';
import { render } from '@testing-library/react';
import { BaseButton } from '../BaseButton';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('BaseButton', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <BaseButton>Button</BaseButton>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
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

      <button
        aria-disabled="false"
        class="c0"
        type="button"
      >
        Button
      </button>
    `);
  });
});
