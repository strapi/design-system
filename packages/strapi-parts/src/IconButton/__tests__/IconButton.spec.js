import * as React from 'react';
import { render } from '@testing-library/react';
import { IconButton } from '../IconButton';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('../../helpers/genId', () => ({
  genId: () => 123,
}));

describe('IconButton', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <IconButton label="test" icon={<div>A</div>} />
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

      .c1 svg > g,
      .c1 svg path {
        fill: #8e8ea9;
      }

      .c1:hover svg > g,
      .c1:hover svg path {
        fill: #666687;
      }

      .c1:active svg > g,
      .c1:active svg path {
        fill: #a5a5ba;
      }

      <span>
        <button
          aria-disabled="false"
          aria-labelledby="tooltip-123"
          class="c0 c1"
          tabindex="0"
        >
          <div>
            A
          </div>
        </button>
      </span>
    `);
  });
});
