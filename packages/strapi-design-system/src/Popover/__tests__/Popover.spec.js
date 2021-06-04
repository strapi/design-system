import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Popover } from '../Popover';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Popover', () => {
  it('snapshots the component', async () => {
    const source = document.createElement('div');
    source.innerText = 'Hello source';
    document.body.appendChild(source);

    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Popover source={{ current: source }}>
          <div>Hello world</div>
        </Popover>
      </ThemeProvider>,
      { container: document.body },
    );

    await waitFor(() => {
      expect(getByText('Hello world')).toBeInTheDocument();
    });

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c1 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        position: absolute;
        border: 1px solid #eaeaef;
        background: #ffffff;
      }

      .c2 {
        max-height: 15rem;
        overflow-y: scroll;
      }

      .c2::-webkit-scrollbar {
        position: absolute;
        width: 4px;
      }

      .c2::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c2::-webkit-scrollbar-thumb {
        background: #eaeaef;
        border-radius: 4px;
        margin-right: 10px;
      }

      <div
        data-react-portal="true"
      >
        <div
          class="c0 c1"
          style="left: 0px; top: 0px;"
        >
          <div
            class="c2"
          >
            <div>
              Hello world
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
