import * as React from 'react';
import { render } from '@testing-library/react';
import { Tag } from '../Tag';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

const HelpIcon = (props) => <span {...props} />;

describe('Tag', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Tag icon={<HelpIcon aria-hidden={true} />}>Hello world</Tag>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c0 {
        background: #f0f0ff;
        color: #4945ff;
        padding-right: 12px;
        padding-left: 12px;
      }

      .c5 {
        padding-left: 8px;
      }

      .c2 {
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
        border: 1px solid #d9d8ff;
        border-radius: 4px;
        height: 2rem;
      }

      .c1 svg {
        height: 0.5rem;
        width: 0.5rem;
      }

      .c1 svg path {
        fill: #4945ff;
      }

      .c4 {
        border-right: 1px solid #d9d8ff;
        padding-right: 8px;
      }

      <button
        class="c0 c1"
      >
        <div
          class="c2"
        >
          <span
            class="c3 c4"
          >
            Hello world
          </span>
          <div
            class="c5"
          >
            <div
              class="c2"
            >
              <span
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </button>
    `);
  });
});
