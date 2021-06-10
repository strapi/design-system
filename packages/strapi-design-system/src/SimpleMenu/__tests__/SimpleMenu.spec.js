import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SimpleMenu, MenuItem } from '../SimpleMenu';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('uuid', () => ({
  v4: () => 1,
}));

describe('SimpleMenu', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <SimpleMenu label="January">
          <MenuItem onClick={() => {}}>January</MenuItem>
          <MenuItem onClick={() => {}}>February</MenuItem>
          <MenuItem href="https://strapi.io">Strapi website</MenuItem>
        </SimpleMenu>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c3 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c1 {
        padding-right: 4px;
      }

      .c0 {
        border: none;
        background: transparent;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 0.75rem;
      }

      .c0 svg {
        height: 0.25rem;
      }

      .c0 svg path {
        fill: #8e8ea9;
      }

      <div>
        <button
          aria-controls="simpleMenu-1"
          aria-expanded="false"
          aria-haspopup="true"
          class="c0"
        >
          <div
            class="c1"
          >
            <span
              class="c2 c3"
            >
              January
            </span>
          </div>
          <svg
            aria-hidden="true"
            fill="none"
            height="1em"
            viewBox="0 0 14 8"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
              fill="#32324D"
              fill-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    `);
  });

  it('display the menu on click on the menu button', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <SimpleMenu label="January">
          <MenuItem onClick={() => {}}>January</MenuItem>
          <MenuItem onClick={() => {}}>February</MenuItem>
          <MenuItem href="https://strapi.io">Strapi website</MenuItem>
        </SimpleMenu>
      </ThemeProvider>,
    );

    const button = await waitFor(() => screen.getByText('January'));
    fireEvent.mouseDown(button);

    await waitFor(() => {
      expect(screen.getByText('February')).toBeInTheDocument();
    });
  });

  it('display the menu and click on a menu item', async () => {
    const onClickSpy = jest.fn();

    render(
      <ThemeProvider theme={lightTheme}>
        <SimpleMenu label="January">
          <MenuItem onClick={onClickSpy}>January</MenuItem>
          <MenuItem onClick={onClickSpy}>February</MenuItem>
          <MenuItem href="https://strapi.io">Strapi website</MenuItem>
        </SimpleMenu>
      </ThemeProvider>,
    );

    const button = await waitFor(() => screen.getByText('January'));
    fireEvent.mouseDown(button);

    const menuItemButton = await waitFor(() => screen.getByText('February'));
    fireEvent.mouseDown(menuItemButton);

    expect(onClickSpy).toBeCalled();
  });
});
