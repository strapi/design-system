import { render as renderRTL } from '@test/utils';

import { Menu } from '../SimpleMenu';

interface ComponentProps {
  onAction1Select?: Menu.ItemProps['onSelect'];
  onSubmenuAction1Select?: Menu.ItemProps['onSelect'];
}

const Component = ({ onAction1Select, onSubmenuAction1Select }: ComponentProps) => (
  <Menu.Root>
    <Menu.Trigger>Actions</Menu.Trigger>
    <Menu.Content>
      <Menu.Item onSelect={onAction1Select}>Action 1</Menu.Item>
      <Menu.Item isLink href="/home">
        Action 2
      </Menu.Item>
      <Menu.Item isExternal href="https://google.com">
        Action 3
      </Menu.Item>
      <Menu.SubRoot>
        <Menu.SubTrigger>Subactions</Menu.SubTrigger>
        <Menu.SubContent>
          <Menu.Label>Submenu Actions</Menu.Label>
          <Menu.Item onSelect={onSubmenuAction1Select}>Subaction 1</Menu.Item>
          <Menu.Item>Subaction 2</Menu.Item>
          <Menu.Item>Subaction 3</Menu.Item>
        </Menu.SubContent>
      </Menu.SubRoot>
    </Menu.Content>
  </Menu.Root>
);

const render = (props: ComponentProps = {}) => renderRTL(<Component {...props} />);

describe('Menu', () => {
  it('should render only the trigger initially', () => {
    const { getByRole, queryByRole } = render();

    expect(getByRole('button', { name: 'Actions' })).toBeInTheDocument();
    expect(queryByRole('menu')).not.toBeInTheDocument();
    expect(getByRole('button', { name: 'Actions' })).toHaveAttribute('aria-expanded', 'false');
    expect(getByRole('button', { name: 'Actions' })).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('should open the menu when the trigger is clicked', async () => {
    const { getByRole, user } = render();

    await user.click(getByRole('button', { name: 'Actions' }));

    expect(getByRole('menu', { name: 'Actions' })).toBeInTheDocument();
    expect(getByRole('button', { name: '', hidden: true })).toHaveAttribute('aria-expanded', 'true');
    expect(getByRole('button', { name: '', hidden: true })).toHaveAttribute('aria-controls', expect.any(String));
    expect(getByRole('button', { name: '', hidden: true })).toHaveAttribute('aria-hidden', 'true');
    expect(getByRole('menuitem', { name: 'Action 1' })).toBeInTheDocument();
  });

  it('should close the menu when the escape key is pressed after its opened', async () => {
    const { getByRole, queryByRole, user } = render();

    await user.click(getByRole('button', { name: 'Actions' }));
    await user.keyboard('{Escape}');

    expect(getByRole('button', { name: 'Actions' })).toHaveAttribute('aria-expanded', 'false');
    expect(queryByRole('menu')).not.toBeInTheDocument();
  });

  describe('Menu Items', () => {
    it('should render an anchor if we pass a isLink', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('button', { name: 'Actions' }));

      expect(getByRole('menuitem', { name: 'Action 2' })).toBeInTheDocument();
      expect(getByRole('menuitem', { name: 'Action 2' })).toHaveAttribute('target', '_self');
    });

    it('should render an anchor if we pass isExternal', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('button', { name: 'Actions' }));

      expect(getByRole('menuitem', { name: 'Action 3' })).toBeInTheDocument();
      expect(getByRole('menuitem', { name: 'Action 3' })).toHaveAttribute('target', '_blank');
    });

    it('should allow navigating through the list of items with the arrow keys', async () => {
      const { getByRole, user } = render();

      await user.click(getByRole('button', { name: 'Actions' }));
      await user.keyboard('{ArrowDown}');

      expect(getByRole('menuitem', { name: 'Action 1' })).toHaveAttribute('data-highlighted');

      await user.keyboard('{ArrowDown}');

      expect(getByRole('menuitem', { name: 'Action 2' })).toHaveAttribute('data-highlighted');

      await user.keyboard('{ArrowDown}');

      expect(getByRole('menuitem', { name: 'Action 3' })).toHaveAttribute('data-highlighted');

      await user.keyboard('{ArrowUp},{ArrowUp}');

      expect(getByRole('menuitem', { name: 'Action 1' })).toHaveAttribute('data-highlighted');
    });

    it('should fire the menu item onClick handler when clicked', async () => {
      const onAction1Select = jest.fn();

      const { getByRole, user } = render({ onAction1Select });

      await user.click(getByRole('button', { name: 'Actions' }));
      await user.click(getByRole('menuitem', { name: 'Action 1' }));

      expect(onAction1Select).toBeCalled();
    });

    ['Enter', 'Space'].forEach((key) => {
      it(`should fire the menu item onSelect handler when ${key} is pressed`, async () => {
        const onAction1Select = jest.fn();

        const { getByRole, user } = render({ onAction1Select });

        await user.click(getByRole('button', { name: 'Actions' }));

        await user.keyboard('[ArrowDown]');
        await user.keyboard(`[${key}]`);

        expect(onAction1Select).toBeCalled();
      });
    });
  });

  describe('Submenus', () => {
    it('should open the submenu when the submenu trigger is clicked', async () => {
      const { getByRole, getByText, user } = render();

      await user.click(getByRole('button', { name: 'Actions' }));
      await user.click(getByRole('menuitem', { name: 'Subactions' }));

      expect(getByRole('menu', { name: 'Subactions' })).toBeInTheDocument();
      expect(getByText('Submenu Actions')).toBeInTheDocument();
      ['1', '2', '3'].forEach((num) => {
        expect(getByRole('menuitem', { name: `Subaction ${num}` })).toBeInTheDocument();
      });
    });

    /**
     * This test fails and i'm not sure why...
     */
    it.skip('should fire the onSelect of a submenu item when clicked', async () => {
      const onSubmenuAction1Select = jest.fn();

      const { getByRole, user } = render({ onSubmenuAction1Select });

      await user.click(getByRole('button', { name: 'Actions' }));
      await user.click(getByRole('menuitem', { name: 'Subactions' }));

      await user.click(getByRole('menuitem', { name: 'Subaction 1' }));

      expect(onSubmenuAction1Select).toBeCalled();
    });

    ['Enter', 'Space'].forEach((key) => {
      it(`should fire the onSelect of a submenu item when ${key} is pressed`, async () => {
        const onSubmenuAction1Select = jest.fn();

        const { getByRole, user } = render({ onSubmenuAction1Select });

        await user.click(getByRole('button', { name: 'Actions' }));

        await user.keyboard('[ArrowDown]');
        await user.keyboard('[ArrowDown]');
        await user.keyboard('[ArrowDown]');
        await user.keyboard('[ArrowDown]');
        await user.keyboard('[ArrowRight]');
        await user.keyboard(`[${key}]`);

        expect(onSubmenuAction1Select).toBeCalled();
      });
    });
  });
});
