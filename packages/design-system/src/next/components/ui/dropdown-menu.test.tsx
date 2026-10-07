import * as React from 'react';

import { act, screen, waitFor } from '@testing-library/react';
// The items render icons of @strapi/icons, which read the styled-components theme
import { render } from '@test/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  SimpleMenu,
} from './dropdown-menu';

const Bell = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="bell" {...props} />;

interface MenuProps {
  onAction1Click?: () => void;
  onSubaction1Click?: () => void;
  disabled?: boolean;
}

const Menu = ({ onAction1Click, onSubaction1Click, disabled }: MenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger disabled={disabled}>Actions</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem startIcon={<Bell />} endIcon={<Bell />} onClick={onAction1Click}>
        Action 1
      </DropdownMenuItem>
      <DropdownMenuLinkItem href="/home">Action 2</DropdownMenuLinkItem>
      <DropdownMenuLinkItem isExternal href="https://strapi.io">
        Action 3
      </DropdownMenuLinkItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Subactions</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuLabel>Submenu Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onSubaction1Click}>Subaction 1</DropdownMenuItem>
          <DropdownMenuItem>Subaction 2</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
);

describe('DropdownMenu', () => {
  it('renders only the trigger initially', () => {
    render(<Menu />);

    const trigger = screen.getByRole('button', { name: 'Actions' });

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('cannot open when disabled', async () => {
    const { user } = render(<Menu disabled />);

    const trigger = screen.getByRole('button', { name: 'Actions' });

    expect(trigger).toBeDisabled();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens a menu named by its trigger', async () => {
    const { user } = render(<Menu />);

    await user.click(screen.getByRole('button', { name: 'Actions' }));

    expect(await screen.findByRole('menu', { name: 'Actions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Actions', hidden: true })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: 'Action 1' })).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('closes on Escape and gives focus back to the trigger', async () => {
    const { user } = render(<Menu />);

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await screen.findByRole('menu');
    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus();
  });

  describe('Items', () => {
    it('renders links, and external links in a new tab', async () => {
      const { user } = render(<Menu />);

      await user.click(screen.getByRole('button', { name: 'Actions' }));

      const internal = await screen.findByRole('menuitem', { name: 'Action 2' });
      const external = screen.getByRole('menuitem', { name: 'Action 3' });

      expect(internal.tagName).toBe('A');
      expect(internal).toHaveAttribute('href', '/home');
      expect(internal).not.toHaveAttribute('target');
      expect(external).toHaveAttribute('target', '_blank');
      expect(external).toHaveAttribute('rel', 'noreferrer noopener');
    });

    it('hides the start and end icons from assistive technology', async () => {
      const { user } = render(<Menu />);

      await user.click(screen.getByRole('button', { name: 'Actions' }));

      const item = await screen.findByRole('menuitem', { name: 'Action 1' });

      expect(item.children[0]).toHaveAttribute('aria-hidden', 'true');
      expect(item.children[2]).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getAllByTestId('bell')).toHaveLength(2);
    });

    it('marks the danger variant', async () => {
      const { user } = render(<Menu />);

      await user.click(screen.getByRole('button', { name: 'Actions' }));

      expect(await screen.findByRole('menuitem', { name: 'Delete' })).toHaveAttribute('data-variant', 'danger');
    });

    it('moves the highlight with the arrow keys', async () => {
      const { user } = render(<Menu />);

      await user.click(screen.getByRole('button', { name: 'Actions' }));
      await screen.findByRole('menu');
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('menuitem', { name: 'Action 1' })).toHaveAttribute('data-highlighted');

      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('menuitem', { name: 'Action 2' })).toHaveAttribute('data-highlighted');

      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('menuitem', { name: 'Action 3' })).toHaveAttribute('data-highlighted');

      await user.keyboard('{ArrowUp}{ArrowUp}');

      expect(screen.getByRole('menuitem', { name: 'Action 1' })).toHaveAttribute('data-highlighted');
    });

    it('fires onClick when an item is clicked, and closes the menu', async () => {
      const onAction1Click = jest.fn();
      const { user } = render(<Menu onAction1Click={onAction1Click} />);

      await user.click(screen.getByRole('button', { name: 'Actions' }));
      await user.click(await screen.findByRole('menuitem', { name: 'Action 1' }));

      expect(onAction1Click).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    });

    it.each(['Enter', 'Space'])('fires onClick when %s is pressed on an item', async (key) => {
      const onAction1Click = jest.fn();
      const { user } = render(<Menu onAction1Click={onAction1Click} />);

      await user.click(screen.getByRole('button', { name: 'Actions' }));
      await screen.findByRole('menu');
      await user.keyboard('[ArrowDown]');
      await user.keyboard(`[${key}]`);

      expect(onAction1Click).toHaveBeenCalledTimes(1);
    });
  });

  describe('Submenus', () => {
    it('opens the submenu from its trigger', async () => {
      const { user } = render(<Menu />);

      await user.click(screen.getByRole('button', { name: 'Actions' }));
      await user.click(await screen.findByRole('menuitem', { name: 'Subactions' }));

      expect(await screen.findByRole('menu', { name: 'Subactions' })).toBeInTheDocument();
      expect(screen.getByText('Submenu Actions')).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Subaction 1' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Subaction 2' })).toBeInTheDocument();
    });

    it('opens the submenu with ArrowRight and fires a nested item with Enter', async () => {
      const onSubaction1Click = jest.fn();
      const { user } = render(<Menu onSubaction1Click={onSubaction1Click} />);

      await user.click(screen.getByRole('button', { name: 'Actions' }));
      await screen.findByRole('menu');
      await user.keyboard('{End}');

      expect(screen.getByRole('menuitem', { name: 'Subactions' })).toHaveAttribute('data-highlighted');

      await user.keyboard('{ArrowRight}');
      await screen.findByRole('menu', { name: 'Subactions' });
      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Subaction 1' })).toHaveAttribute('data-highlighted'),
      );
      await user.keyboard('{Enter}');

      expect(onSubaction1Click).toHaveBeenCalledTimes(1);
    });
  });

  it('forwards the refs of its parts', async () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();
    const itemRef = React.createRef<HTMLDivElement>();
    const linkRef = React.createRef<HTMLAnchorElement>();

    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger ref={triggerRef}>Actions</DropdownMenuTrigger>
        <DropdownMenuContent ref={contentRef}>
          <DropdownMenuItem ref={itemRef}>Item</DropdownMenuItem>
          <DropdownMenuLinkItem ref={linkRef} href="/">
            Link
          </DropdownMenuLinkItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(await screen.findByRole('menu')).toBe(contentRef.current);
    expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Actions', hidden: true }));
    expect(itemRef.current).toBe(screen.getByRole('menuitem', { name: 'Item' }));
    expect(linkRef.current).toBe(screen.getByRole('menuitem', { name: 'Link' }));
  });

  describe('onReachEnd', () => {
    let trigger: IntersectionObserverCallback = () => {};

    beforeEach(() => {
      window.IntersectionObserver = jest.fn((callback: IntersectionObserverCallback) => {
        trigger = callback;

        return { observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn(), takeRecords: jest.fn() };
      }) as unknown as typeof IntersectionObserver;
    });

    afterEach(() => {
      // @ts-expect-error jsdom has none, the test restores that
      delete window.IntersectionObserver;
    });

    it('fires when the end of an overflowing menu comes into view', async () => {
      const onReachEnd = jest.fn();

      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent onReachEnd={onReachEnd}>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      const menu = await screen.findByRole('menu');
      Object.defineProperty(menu, 'scrollHeight', { configurable: true, value: 300 });
      Object.defineProperty(menu, 'clientHeight', { configurable: true, value: 150 });

      const entry = { isIntersecting: true } as IntersectionObserverEntry;
      act(() => trigger([entry], {} as IntersectionObserver));

      expect(onReachEnd).toHaveBeenCalledWith(entry);
    });
  });
});

describe('SimpleMenu', () => {
  const Component = (props: Partial<React.ComponentProps<typeof SimpleMenu>>) => (
    <SimpleMenu label="Menu" {...props}>
      <DropdownMenuItem>January</DropdownMenuItem>
      <DropdownMenuItem>February</DropdownMenuItem>
    </SimpleMenu>
  );

  it('renders only the trigger initially', () => {
    render(<Component />);

    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-haspopup', 'menu');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens the menu and calls onOpen, then onClose on Escape', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { user } = render(<Component onOpen={onOpen} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Menu' }));

    expect(await screen.findByRole('menu', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'February' })).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(1);

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('names an icon-only trigger with its label', () => {
    render(<Component label="More actions" icon={<Bell />} />);

    expect(screen.getByRole('button', { name: 'More actions' })).toContainElement(screen.getByTestId('bell'));
  });

  it('forwards its ref to the trigger', () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <SimpleMenu ref={ref} label="Menu">
        <DropdownMenuItem>January</DropdownMenuItem>
      </SimpleMenu>,
    );

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Menu' }));
  });
});
