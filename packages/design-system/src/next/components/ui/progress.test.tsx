import * as React from 'react';

import { render, screen } from '@test/utils';

import { Progress, ProgressLabel } from './progress';

describe('Progress', () => {
  it('renders a progressbar with its value', () => {
    render(<Progress value={40} aria-label="Upload" />);

    const progressbar = screen.getByRole('progressbar', { name: 'Upload' });

    expect(progressbar).toHaveAttribute('aria-valuenow', '40');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('is indeterminate without a value', () => {
    render(<Progress aria-label="Upload" />);

    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });

  it('applies the sizes to the track', () => {
    const { container, rerender } = render(<Progress value={10} />);

    expect(container.querySelector('[data-slot="progress-track"]')).toHaveClass('w-26', 'h-2');

    rerender(<Progress value={10} size="sm" />);

    expect(container.querySelector('[data-slot="progress-track"]')).toHaveClass('w-20', 'h-1');
  });

  it('is named by a ProgressLabel', () => {
    render(
      <Progress value={70}>
        <ProgressLabel>Uploading</ProgressLabel>
      </Progress>,
    );

    expect(screen.getByRole('progressbar', { name: 'Uploading' })).toBeInTheDocument();
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Progress ref={ref} value={1} />);

    expect(ref.current).toBe(screen.getByRole('progressbar'));
  });
});
