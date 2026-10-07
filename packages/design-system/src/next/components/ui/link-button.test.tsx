import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { LinkButton } from './link-button';

const Icon = (props: React.ComponentProps<'svg'>) => <svg data-testid="icon" {...props} />;

describe('LinkButton', () => {
  it('renders a link that looks like a Button', () => {
    render(<LinkButton href="/create">Create</LinkButton>);

    const link = screen.getByRole('link', { name: 'Create' });

    expect(link).toHaveAttribute('href', '/create');
    expect(link).toHaveAttribute('data-slot', 'link-button');
    expect(link).toHaveClass('bg-button-primary-600', 'h-10');
    expect(link).not.toHaveClass('visited:text-inherit');
  });

  it('takes the Button variants and sizes', () => {
    render(
      <LinkButton href="/" variant="tertiary" size="L" fullWidth>
        Back
      </LinkButton>,
    );

    expect(screen.getByRole('link', { name: 'Back' })).toHaveClass('bg-neutral-0', 'h-12', 'w-full');
  });

  it('renders the icons out of the accessible name', () => {
    render(
      <LinkButton href="/" startIcon={<Icon />}>
        Back
      </LinkButton>,
    );

    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('is out of the tab order when disabled', () => {
    render(
      <LinkButton href="/" disabled>
        Back
      </LinkButton>,
    );

    const link = screen.getByRole('link', { name: 'Back' });

    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(link).toHaveClass('pointer-events-none');
  });

  it('is disabled while loading', () => {
    render(
      <LinkButton href="/" loading>
        Back
      </LinkButton>,
    );

    const link = screen.getByRole('link', { name: 'Back' });

    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link.querySelector('[data-slot="button-loader"]')).toBeInTheDocument();
  });

  it('opens an external link in a new tab', () => {
    render(
      <LinkButton href="https://strapi.io" isExternal>
        Docs
      </LinkButton>,
    );

    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('target', '_blank');
  });

  it('composes with a router link through `render`', () => {
    const RouterLink = React.forwardRef<HTMLAnchorElement, { to: string } & React.ComponentProps<'a'>>(
      ({ to, ...props }, ref) => <a ref={ref} href={to} {...props} />,
    );

    render(<LinkButton render={<RouterLink to="/settings" />}>Settings</LinkButton>);

    const link = screen.getByRole('link', { name: 'Settings' });

    expect(link).toHaveAttribute('href', '/settings');
    expect(link).toHaveClass('bg-button-primary-600');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLAnchorElement>();

    render(
      <LinkButton ref={ref} href="/">
        Back
      </LinkButton>,
    );

    expect(ref.current).toBe(screen.getByRole('link'));
  });
});
