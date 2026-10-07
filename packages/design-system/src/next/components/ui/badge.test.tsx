import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Badge } from './badge';

describe('Badge', () => {
  it('renders its children in a span', () => {
    render(<Badge>Draft</Badge>);

    const badge = screen.getByText('Draft');

    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveAttribute('data-slot', 'badge');
    expect(badge).toHaveClass('bg-neutral-150', 'text-neutral-600', 'uppercase');
  });

  it('applies the variant, size and active classes', () => {
    const { rerender } = render(
      <Badge variant="success" size="sm">
        Published
      </Badge>,
    );

    expect(screen.getByText('Published')).toHaveClass('bg-success-200', 'text-success-700', 'rounded-xs');

    rerender(
      <Badge variant="success" active>
        Published
      </Badge>,
    );

    const badge = screen.getByText('Published');

    expect(badge).toHaveClass('bg-primary-200', 'text-primary-600', 'rounded-md');
    expect(badge).not.toHaveClass('bg-success-200');
    expect(badge).toHaveAttribute('data-active');
  });

  it('renders another element and forwards its ref', () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <Badge ref={ref} render={<a href="/drafts" />}>
        Drafts
      </Badge>,
    );

    const link = screen.getByRole('link', { name: 'Drafts' });

    expect(link).toHaveAttribute('href', '/drafts');
    expect(ref.current).toBe(link);
  });
});
