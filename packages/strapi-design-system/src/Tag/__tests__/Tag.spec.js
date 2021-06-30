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
      .c2 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c4 {
        padding-left: 8px;
      }

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

      .c0 {
        font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans', 'Helvetica Neue',sans-serif;
        border: 1px solid #d9d8ff;
        border-radius: 4px;
        height: 2rem;
      }

      .c0 svg {
        height: 0.5rem;
        width: 0.5rem;
      }

      .c0 svg path {
        fill: #4945ff;
      }

      .c3 {
        border-right: 1px solid #d9d8ff;
        padding-right: 8px;
      }

      <button
        class="c0"
        color="primary600"
      >
        <div
          class="c1"
        >
          <span
            class="c2 c3"
          >
            Hello world
          </span>
          <div
            class="c4"
          >
            <div
              class="c1"
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
