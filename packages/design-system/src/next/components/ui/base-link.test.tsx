import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { BaseLink } from './base-link';

describe('BaseLink', () => {
  it('renders a link', () => {
    render(<BaseLink href="/home">Home</BaseLink>);

    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveAttribute('aria-disabled', 'false');
    expect(link).not.toHaveAttribute('target');
    expect(link).toHaveClass('cursor-pointer', 'no-underline');
  });

  it('opens an external link in a new tab', () => {
    render(
      <BaseLink href="https://strapi.io" isExternal>
        Strapi
      </BaseLink>,
    );

    const link = screen.getByRole('link', { name: 'Strapi' });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('takes a disabled link out of the tab order', () => {
    render(
      <BaseLink href="/home" disabled>
        Home
      </BaseLink>,
    );

    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(link).toHaveClass('pointer-events-none');
  });

  it('composes with a router link through `render`', () => {
    const RouterLink = React.forwardRef<HTMLAnchorElement, { to: string } & React.ComponentProps<'a'>>(
      ({ to, ...props }, ref) => <a ref={ref} href={to} data-router {...props} />,
    );

    render(<BaseLink render={<RouterLink to="/settings" />}>Settings</BaseLink>);

    const link = screen.getByRole('link', { name: 'Settings' });

    expect(link).toHaveAttribute('href', '/settings');
    expect(link).toHaveAttribute('data-router');
    expect(link).toHaveAttribute('data-slot', 'base-link');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLAnchorElement>();

    render(<BaseLink ref={ref} href="/home" />);

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
