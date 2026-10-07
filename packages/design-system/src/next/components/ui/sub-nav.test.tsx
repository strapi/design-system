import * as React from 'react';

import { render, screen } from '@test/utils';

import { SubNav, SubNavHeader, SubNavLink, SubNavLinkSection, SubNavSection, SubNavSections } from './sub-nav';

describe('SubNav', () => {
  it('renders a navigation landmark with sections and links', () => {
    render(
      <SubNav aria-label="Builder sub nav">
        <SubNavHeader label="Builder" />
        <SubNavSections>
          <SubNavSection label="Collection types" badgeLabel="2">
            <SubNavLink href="/address">Address</SubNavLink>
            <SubNavLink href="/category" className="active">
              Category
            </SubNavLink>
          </SubNavSection>
        </SubNavSections>
      </SubNav>,
    );

    expect(screen.getByRole('navigation', { name: 'Builder sub nav' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Builder' })).toBeInTheDocument();
    expect(screen.getByText('Collection types')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Address' })).toHaveAttribute('href', '/address');
    expect(screen.getByRole('link', { name: 'Category' })).toHaveClass('active');
  });

  it('collapses a collapsable section', async () => {
    const { user } = render(
      <SubNavSection label="Single types" collapsable>
        <SubNavLink href="/homepage">Homepage</SubNavLink>
      </SubNavSection>,
    );

    const toggle = screen.getByRole('button', { name: 'Single types' });

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Homepage' })).toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: 'Homepage' })).not.toBeInTheDocument();
  });

  it('collapses a link section', async () => {
    const { user } = render(
      <SubNavLinkSection label="Default">
        <SubNavLink href="/info" isSubSectionChild>
          Info
        </SubNavLink>
      </SubNavLinkSection>,
    );

    const toggle = screen.getByRole('button', { name: 'Default' });

    expect(toggle).toHaveAttribute('aria-controls', screen.getByRole('list').id);

    await user.click(toggle);

    expect(screen.queryByRole('link', { name: 'Info' })).not.toBeInTheDocument();
  });

  it('opens the search of a searchable header and closes it with Escape', async () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const { user } = render(
      <SubNavHeader
        label="Builder"
        searchable
        searchLabel="Search…"
        value="add"
        onChange={onChange}
        onClear={onClear}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Search…' }));

    const input = screen.getByRole('searchbox', { name: 'Search…' });

    expect(input).toHaveFocus();
    expect(screen.getByRole('search')).toBeInTheDocument();

    await user.type(input, 'r');

    expect(onChange).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onClear).toHaveBeenCalled();
    expect(input).toHaveFocus();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search…' })).toHaveFocus();
  });

  it('renders a link through another component, with an icon and an end bullet', () => {
    const RouterLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<'a'> & { to: string }>(
      ({ to, ...props }, ref) => <a ref={ref} href={to} {...props} />,
    );
    const ref = React.createRef<HTMLAnchorElement>();
    const { container } = render(
      <SubNavLink ref={ref} render={<RouterLink to="/roles" />} icon={<svg data-testid="icon" />} withBullet>
        Roles
      </SubNavLink>,
    );

    expect(screen.getByRole('link', { name: 'Roles' })).toHaveAttribute('href', '/roles');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="sub-nav-link-end-bullet"]')).toBeInTheDocument();
    expect(ref.current).toBe(screen.getByRole('link'));
  });

  it('lays sections out with the legacy spacing', () => {
    render(
      <SubNavSections spacing={4} horizontal>
        <span>One</span>
        <span>Two</span>
      </SubNavSections>,
    );

    const list = screen.getByRole('list');

    expect(list).toHaveStyle({ gap: '16px' });
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
