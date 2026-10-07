import * as React from 'react';

import { render, screen } from '@test/utils';

import { Separator } from './separator';

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    render(<Separator />);

    const separator = screen.getByRole('separator');

    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveClass('bg-neutral-150');
  });

  it('renders a vertical separator', () => {
    render(<Separator orientation="vertical" />);

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Separator ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('separator'));
  });
});
