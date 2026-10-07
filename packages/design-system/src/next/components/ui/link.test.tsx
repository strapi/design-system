import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Link } from './link';

const Icon = (props: React.ComponentProps<'svg'>) => <svg data-testid="icon" {...props} />;

describe('Link', () => {
  it('renders a primary link', () => {
    render(<Link href="/home">Home</Link>);

    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveAttribute('data-slot', 'link');
    expect(link).toHaveClass('text-primary-600', 'inline-flex');
  });

  it('adds the external icon and opens a new tab when external', () => {
    render(
      <Link href="https://strapi.io" isExternal>
        Strapi
      </Link>,
    );

    const link = screen.getByRole('link', { name: 'Strapi' });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
    expect(link.querySelector('[data-slot="link-external-icon"]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('replaces the external icon with the end icon', () => {
    render(
      <Link href="https://strapi.io" isExternal endIcon={<Icon />}>
        Strapi
      </Link>,
    );

    const link = screen.getByRole('link', { name: 'Strapi' });

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(link.querySelector('[data-slot="link-external-icon"]')).not.toBeInTheDocument();
  });

  it('renders the start icon', () => {
    render(
      <Link href="/" startIcon={<Icon />}>
        Home
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toContainElement(screen.getByTestId('icon'));
  });

  it('takes a legacy colour token', () => {
    render(
      <Link href="/" color="danger600">
        Home
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('text-danger-600');
  });

  it('is greyed out and out of the tab order when disabled', () => {
    render(
      <Link href="/" disabled>
        Home
      </Link>,
    );

    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(link).toHaveClass('text-neutral-600', 'pointer-events-none');
    expect(link).not.toHaveClass('text-primary-600');
  });

  it('composes with a router link through `render`', () => {
    const RouterLink = React.forwardRef<HTMLAnchorElement, { to: string } & React.ComponentProps<'a'>>(
      ({ to, ...props }, ref) => <a ref={ref} href={to} {...props} />,
    );

    render(<Link render={<RouterLink to="/settings" />}>Settings</Link>);

    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('href', '/settings');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLAnchorElement>();

    render(
      <Link ref={ref} href="/">
        Home
      </Link>,
    );

    expect(ref.current).toBe(screen.getByRole('link'));
  });
});
