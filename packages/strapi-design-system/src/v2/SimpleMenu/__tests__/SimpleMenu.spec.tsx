import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../../ThemeProvider';
import { lightTheme } from '../../../themes';
import { SimpleMenu, MenuItem } from '../SimpleMenu';

const Component = ({ onClick = () => {}, ...restProps }) => (
  <ThemeProvider theme={lightTheme}>
    <SimpleMenu label="Menu" {...restProps}>
      <MenuItem onClick={onClick}>January</MenuItem>
      <MenuItem onClick={onClick}>February</MenuItem>
      <MenuItem href="https://strapi.io" isExternal>
        Strapi website
      </MenuItem>
      <MenuItem href="/" isLink>
        Home
      </MenuItem>
    </SimpleMenu>
  </ThemeProvider>
);

const render = (props = {}) => renderRTL(<Component {...props} />);

describe('SimpleMenu', () => {
  it('should render only the trigger initially', () => {
    const { getByRole, queryByRole } = render();

    expect(getByRole('button', { name: 'Menu' })).toBeInTheDocument();
    expect(queryByRole('menu')).not.toBeInTheDocument();
    expect(getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-controls', expect.any(String));
    expect(getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-haspopup', 'true');
  });

  it('should open the menu when the trigger is clicked', async () => {
    const user = userEvent.setup();

    const { getByRole } = render();

    await user.click(getByRole('button', { name: 'Menu' }));

    expect(getByRole('menu')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(getByRole('button', { name: 'February' })).toBeInTheDocument();
  });

  it('should close the menu when the escape key is pressed after its opened', async () => {
    const user = userEvent.setup();

    const { getByRole, queryByRole } = render();

    await user.click(getByRole('button', { name: 'Menu' }));
    await user.keyboard('{Escape}');

    expect(getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should call onOpen when the menu is opened', async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();

    const { getByRole } = render({ onOpen });

    await user.click(getByRole('button', { name: 'Menu' }));

    expect(onOpen).toBeCalled();
  });

  it('should call onClose when the menu is closed', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    const { getByRole } = render({ onClose });

    await user.click(getByRole('button', { name: 'Menu' }));
    await user.click(getByRole('button', { name: 'Menu' }));

    expect(onClose).toBeCalled();
  });

  describe('Menu Items', () => {
    it('should render an anchor if we pass a isLink', async () => {
      const user = userEvent.setup();

      const { getByRole } = render();

      await user.click(getByRole('button', { name: 'Menu' }));

      expect(getByRole('link', { name: 'Home' })).toBeInTheDocument();
    });

    it('should render an anchor if we pass isExternal', async () => {
      const user = userEvent.setup();

      const { getByRole } = render();

      await user.click(getByRole('button', { name: 'Menu' }));

      expect(getByRole('link', { name: 'Strapi website' })).toBeInTheDocument();
    });

    it('should focus the first item in the menu after opening the menu', async () => {
      const user = userEvent.setup();

      const { getByRole } = render();

      await user.click(getByRole('button', { name: 'Menu' }));

      expect(getByRole('button', { name: 'January' })).toHaveFocus();
    });

    it('should allow navigating through the list of items with the arrow keys', async () => {
      const user = userEvent.setup();

      const { getByRole } = render();

      await user.click(getByRole('button', { name: 'Menu' }));
      await user.keyboard('{ArrowDown}');

      expect(getByRole('button', { name: 'February' })).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(getByRole('link', { name: 'Strapi website' })).toHaveFocus();

      await user.keyboard('{ArrowUp},{ArrowUp}');

      expect(getByRole('button', { name: 'January' })).toHaveFocus();
    });

    it('should fire the menu item onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      const { getByRole } = render({ onClick });

      await user.click(getByRole('button', { name: 'Menu' }));
      await user.click(getByRole('button', { name: 'February' }));

      expect(onClick).toBeCalled();
    });
  });
});
