import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SimpleMenu, MenuItem } from '..';
import { ThemeProvider } from '../../../ThemeProvider';
import { lightTheme } from '../../../themes';

describe('SimpleMenu', () => {
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
