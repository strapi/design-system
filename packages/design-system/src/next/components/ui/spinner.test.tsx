import * as React from 'react';

import { render, screen, within } from '@test/utils';

import { Loader, Spinner } from './spinner';

describe('Loader', () => {
  it('announces its visually hidden label in an assertive live region', () => {
    render(
      <div data-testid="wrapper">
        <Loader>Loading content...</Loader>
      </div>,
    );

    // The DesignSystemProvider of the test renders its own live regions, so the query looks inside the wrapper
    const region = within(screen.getByTestId('wrapper')).getByRole('alert');

    expect(region).toHaveAttribute('aria-live', 'assertive');
    expect(region).toHaveTextContent('Loading content...');
    expect(screen.getByText('Loading content...')).toHaveClass('sr-only');
  });

  it('renders the small size', () => {
    const { container } = render(<Loader size="sm">Loading</Loader>);

    expect(container.querySelector('[data-slot="loader-icon"]')).toHaveClass('size-6');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Loader ref={ref}>Loading</Loader>);

    expect(ref.current).toBe(screen.getByText('Loading').parentElement);
  });
});

describe('Spinner', () => {
  it('renders a status icon named Loading', () => {
    render(<Spinner />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });
});
