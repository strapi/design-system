import * as React from 'react';

import { render, screen } from '@test/utils';

import { Empty, EmptyContent, EmptyMedia, EmptyTitle } from './empty';

describe('Empty', () => {
  it('renders the message, a hidden illustration and the action', () => {
    const { container } = render(
      <Empty>
        <EmptyMedia>
          <svg data-testid="illustration" />
        </EmptyMedia>
        <EmptyTitle>You don't have any content yet</EmptyTitle>
        <EmptyContent>
          <button type="button">Create an entry</button>
        </EmptyContent>
      </Empty>,
    );

    expect(screen.getByText("You don't have any content yet").tagName).toBe('P');
    expect(screen.getByRole('button', { name: 'Create an entry' })).toBeInTheDocument();
    expect(container.querySelector('[data-slot="empty-media"]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('has the legacy card look and takes a className', () => {
    const { container } = render(<Empty className="rounded-none">content</Empty>);

    const root = container.querySelector('[data-slot="empty"]');

    expect(root).toHaveClass('bg-neutral-0', 'p-14', 'shadow-table', 'rounded-none');
    expect(root).not.toHaveClass('rounded-md');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Empty ref={ref}>content</Empty>);

    expect(ref.current).toHaveTextContent('content');
  });
});
