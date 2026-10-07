import * as React from 'react';

import { render, screen } from '@test/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbMenu,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';
import { DropdownMenuItem } from './dropdown-menu';

describe('Breadcrumb', () => {
  it('renders a named navigation landmark with one list item per crumb', () => {
    render(
      <Breadcrumb aria-label="Folder navigation">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    expect(screen.getByRole('navigation', { name: 'Folder navigation' })).toBeInTheDocument();
    // The separator is hidden from assistive technologies, so the list counts the crumbs only
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
  });

  it('renders a non current crumb without aria-current', () => {
    render(<BreadcrumbPage current={false}>Folder</BreadcrumbPage>);

    expect(screen.getByText('Folder')).not.toHaveAttribute('aria-current');
    expect(screen.getByText('Folder')).toHaveClass('font-normal');
  });

  it('renders a link through another component', () => {
    const RouterLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<'a'> & { to: string }>(
      ({ to, ...props }, ref) => <a ref={ref} href={to} data-router {...props} />,
    );

    render(<BreadcrumbLink render={<RouterLink to="/settings" />}>Settings</BreadcrumbLink>);

    const link = screen.getByRole('link', { name: 'Settings' });

    expect(link).toHaveAttribute('href', '/settings');
    expect(link).toHaveAttribute('data-router');
  });

  it('opens the menu of a BreadcrumbMenu', async () => {
    const onOpen = jest.fn();
    const onSelect = jest.fn();
    const { user } = render(
      <BreadcrumbMenu aria-label="See more folders" label="..." onOpen={onOpen}>
        <DropdownMenuItem onClick={onSelect}>Folder 1</DropdownMenuItem>
        <DropdownMenuItem>Folder 2</DropdownMenuItem>
      </BreadcrumbMenu>,
    );

    const trigger = screen.getByRole('button', { name: 'See more folders' });

    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');

    await user.click(trigger);

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalled();

    await user.click(screen.getByRole('menuitem', { name: 'Folder 1' }));

    expect(onSelect).toHaveBeenCalled();
  });

  it('forwards the refs', () => {
    const navRef = React.createRef<HTMLElement>();
    const linkRef = React.createRef<HTMLAnchorElement>();
    const menuRef = React.createRef<HTMLButtonElement>();

    render(
      <Breadcrumb ref={navRef}>
        <BreadcrumbLink ref={linkRef} href="/">
          Home
        </BreadcrumbLink>
        <BreadcrumbMenu ref={menuRef} aria-label="More" label="..." />
      </Breadcrumb>,
    );

    expect(navRef.current).toBe(screen.getByRole('navigation'));
    expect(linkRef.current).toBe(screen.getByRole('link'));
    expect(menuRef.current).toBe(screen.getByRole('button', { name: 'More' }));
  });
});
