import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Typography } from './typography';

describe('Typography', () => {
  it('renders a span with the omega variant by default', () => {
    render(<Typography>Hello</Typography>);

    const text = screen.getByText('Hello');

    expect(text.tagName).toBe('SPAN');
    expect(text).toHaveAttribute('data-slot', 'typography');
    expect(text).toHaveClass('text-base', 'medium:text-sm', 'text-current');
  });

  it.each([
    ['alpha', ['text-3xl', 'font-semibold']],
    ['beta', ['text-xl', 'font-semibold', 'medium:text-lg']],
    ['delta', ['text-lg', 'font-medium', 'medium:leading-tight']],
    ['epsilon', ['text-lg', 'medium:text-base']],
    ['omega', ['text-base', 'medium:text-sm']],
    ['pi', ['text-xs']],
    ['sigma', ['text-2xs', 'uppercase', 'font-semibold']],
  ] as const)('renders the %s variant', (variant, classes) => {
    render(<Typography variant={variant}>Hello</Typography>);

    expect(screen.getByText('Hello')).toHaveClass(...classes);
  });

  it('maps a legacy colour token to a text colour class', () => {
    render(<Typography textColor="neutral600">Hello</Typography>);

    const text = screen.getByText('Hello');

    expect(text).toHaveClass('text-neutral-600');
    expect(text).not.toHaveClass('text-current');
  });

  it('lets fontWeight override the weight of the variant', () => {
    render(
      <Typography variant="alpha" fontWeight="regular">
        Hello
      </Typography>,
    );

    const text = screen.getByText('Hello');

    expect(text).toHaveClass('font-normal');
    expect(text).not.toHaveClass('font-semibold');
  });

  it('cuts the text with an ellipsis', () => {
    render(<Typography ellipsis>Hello</Typography>);

    expect(screen.getByText('Hello')).toHaveClass('block', 'truncate');
  });

  it('renders another tag and its attributes', () => {
    render(
      <Typography tag="a" href="https://strapi.io">
        Strapi
      </Typography>,
    );

    expect(screen.getByRole('link', { name: 'Strapi' })).toHaveAttribute('href', 'https://strapi.io');
  });

  it('renders a heading with `tag`', () => {
    render(
      <Typography tag="h1" variant="alpha">
        Title
      </Typography>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
  });

  it('composes with a component through `render`', () => {
    const MyLink = React.forwardRef<HTMLAnchorElement, { to: string } & React.ComponentProps<'a'>>(
      ({ to, ...props }, ref) => <a ref={ref} href={to} {...props} />,
    );

    render(<Typography render={<MyLink to="/home" />}>Home</Typography>);

    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveClass('text-base');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLElement>();

    render(<Typography ref={ref}>Hello</Typography>);

    expect(ref.current).toBe(screen.getByText('Hello'));
  });

  it('applies a line height from className at every breakpoint, like the legacy lineHeight prop', () => {
    render(
      <Typography variant="delta" className="leading-8">
        Releases
      </Typography>,
    );

    const element = screen.getByText('Releases');

    expect(element).toHaveClass('leading-8');
    expect(element).not.toHaveClass('medium:leading-tight');
  });

  it('keeps the responsive line height of the variant without an override', () => {
    render(<Typography variant="delta">Releases</Typography>);

    expect(screen.getByText('Releases')).toHaveClass('medium:leading-tight');
  });
});
