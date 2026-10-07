import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Status } from './status';

describe('Status', () => {
  it('displays its children with the primary variant by default', () => {
    render(<Status>My status</Status>);

    const status = screen.getByText('My status');

    expect(status).toHaveAttribute('data-variant', 'primary');
    expect(status).toHaveClass('bg-primary-100', 'border-primary-200', 'text-primary-600', 'px-5', 'py-4');
  });

  it('applies the variant and size', () => {
    render(
      <Status variant="success" size="xs">
        Published
      </Status>,
    );

    expect(screen.getByText('Published')).toHaveClass('bg-success-100', 'text-success-600', 'px-1.5');
  });

  it('forwards its ref and props', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Status ref={ref} role="status" variant="danger" size="sm">
        Error
      </Status>,
    );

    expect(ref.current).toBe(screen.getByRole('status'));
    expect(screen.getByRole('status')).toHaveClass('px-2', 'py-1');
  });
});
