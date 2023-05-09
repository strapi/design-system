import * as React from 'react';

import { render, screen, fireEvent, waitFor } from '@test/utils';

import { SimpleMenu, MenuItem } from '../SimpleMenu';

describe('SimpleMenu', () => {
  it('display the menu on click on the menu button', async () => {
    render(
      <SimpleMenu label="Menu">
        <MenuItem onClick={() => {}}>January</MenuItem>
        <MenuItem onClick={() => {}}>February</MenuItem>
        <MenuItem href="https://strapi.io" isExternal>
          Strapi website
        </MenuItem>
      </SimpleMenu>,
    );

    const button = await waitFor(() => screen.getByText('Menu'));
    fireEvent.mouseDown(button);

    await waitFor(() => {
      expect(screen.getByText('February')).toBeInTheDocument();
    });
  });

  it('display the menu and click on a menu item', async () => {
    const onClickSpy = jest.fn();

    render(
      <SimpleMenu label="Menu">
        <MenuItem onClick={onClickSpy}>January</MenuItem>
        <MenuItem onClick={onClickSpy}>February</MenuItem>
        <MenuItem href="https://strapi.io" isExternal>
          Strapi website
        </MenuItem>
      </SimpleMenu>,
    );

    const button = await waitFor(() => screen.getByText('Menu'));
    fireEvent.mouseDown(button);

    const menuItemButton = await waitFor(() => screen.getByText('February'));
    fireEvent.mouseDown(menuItemButton);

    expect(onClickSpy).toBeCalled();
  });

  it('display the menu on click on the external link menu button', async () => {
    render(
      <SimpleMenu label="Menu">
        <MenuItem onClick={() => {}}>January</MenuItem>
        <MenuItem onClick={() => {}}>February</MenuItem>
        <MenuItem href="https://strapi.io" isExternal>
          Strapi website
        </MenuItem>
      </SimpleMenu>,
    );

    const button = await waitFor(() => screen.getByText('Menu'));
    fireEvent.mouseDown(button);

    await waitFor(() => {
      expect(screen.getByText('Strapi website').closest('a')).toHaveAttribute('href', 'https://strapi.io');
    });
  });
});
