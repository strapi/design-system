import { render as renderRTL } from '@test/utils';

import { SimpleMenu, MenuItem, SimpleMenuProps } from '../SimpleMenu';

const Component = ({ onClick = () => {}, ...restProps }: SimpleMenuProps) => (
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
);

const render = (props: Partial<SimpleMenuProps> = {}) => renderRTL(<Component {...props} />);

describe('SimpleMenu', () => {
  it('should render only the trigger initially', () => {
    const { getByRole, queryByRole } = render();

    expect(getByRole('button', { name: 'Menu' })).toBeInTheDocument();
    expect(queryByRole('menu')).not.toBeInTheDocument();
    expect(getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('should open the menu when the trigger is clicked', async () => {
    const { getByRole, user } = render();

    await user.click(getByRole('button', { name: 'Menu' }));

    expect(getByRole('menu', { name: 'Menu' })).toBeInTheDocument();
    expect(getByRole('button', { name: '', hidden: true })).toHaveAttribute('aria-expanded', 'true');
    expect(getByRole('button', { name: '', hidden: true })).toHaveAttribute('aria-controls', expect.any(String));
    expect(getByRole('button', { name: '', hidden: true })).toHaveAttribute('aria-hidden', 'true');
    expect(getByRole('menuitem', { name: 'February' })).toBeInTheDocument();
  });

  it('should close the menu when the escape key is pressed after its opened', async () => {
    const { getByRole, queryByRole, user } = render();

    await user.click(getByRole('button', { name: 'Menu' }));
    await user.keyboard('{Escape}');

    expect(getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should call onOpen when the menu is opened', async () => {
    const onOpen = jest.fn();

    const { getByRole, user } = render({ onOpen });

    await user.click(getByRole('button', { name: 'Menu' }));

    expect(onOpen).toBeCalled();
  });

  it('should call onClose when the menu is closed', async () => {
    const onClose = jest.fn();

    const { getByRole, user } = render({ onClose });

    await user.click(getByRole('button', { name: 'Menu' }));
    await user.keyboard('[Escape]');

    expect(onClose).toBeCalled();
  });

  it.todo('should fire onReachEnd');

  it.todo('should handle the popoverPlacement prop');
});
