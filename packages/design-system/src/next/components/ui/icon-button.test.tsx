import * as React from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { IconButton, IconButtonGroup } from './icon-button';

const Icon = (props: React.ComponentProps<'svg'>) => <svg data-testid="icon" {...props} />;

describe('IconButton', () => {
  it('is named by its label and hides the icon', () => {
    render(
      <IconButton label="More actions">
        <Icon />
      </IconButton>,
    );

    const button = screen.getByRole('button', { name: 'More actions' });
    const icon = screen.getByTestId('icon');

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-slot', 'icon-button');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('focusable', 'false');
  });

  it('defaults to the tertiary variant and the S size', () => {
    render(
      <IconButton label="More" withTooltip={false}>
        <Icon />
      </IconButton>,
    );

    expect(screen.getByRole('button', { name: 'More' })).toHaveClass(
      'bg-neutral-0',
      'text-neutral-500',
      'size-10',
      'medium:size-8',
    );
  });

  it('applies the variant and size classes', () => {
    render(
      <IconButton label="Delete" variant="danger" size="L" withTooltip={false}>
        <Icon />
      </IconButton>,
    );

    const button = screen.getByRole('button', { name: 'Delete' });

    expect(button).toHaveClass('bg-danger-600', 'size-12');
    expect(button).not.toHaveClass('text-neutral-500');
  });

  it('calls onClick', async () => {
    const onClick = jest.fn();

    render(
      <IconButton label="More" onClick={onClick}>
        <Icon />
      </IconButton>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'More' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('stays focusable but ignores clicks when disabled', async () => {
    const onClick = jest.fn();

    render(
      <IconButton label="More" disabled onClick={onClick} withTooltip={false}>
        <Icon />
      </IconButton>,
    );

    const button = screen.getByRole('button', { name: 'More' });

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).not.toHaveAttribute('disabled');

    await userEvent.tab();

    expect(button).toHaveFocus();

    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows the label in a tooltip on focus', async () => {
    render(
      <IconButton label="More actions">
        <Icon />
      </IconButton>,
    );

    await userEvent.tab();

    // The visually hidden label, then the tooltip
    expect(await screen.findAllByText('More actions')).toHaveLength(2);
  });

  it('forwards its ref with and without the tooltip', () => {
    const ref = React.createRef<HTMLElement>();
    const { rerender } = render(
      <IconButton ref={ref} label="More">
        <Icon />
      </IconButton>,
    );

    expect(ref.current).toBe(screen.getByRole('button'));

    rerender(
      <IconButton ref={ref} label="More" withTooltip={false}>
        <Icon />
      </IconButton>,
    );

    expect(ref.current).toBe(screen.getByRole('button'));
  });
});

describe('IconButtonGroup', () => {
  it('renders its IconButtons side by side', () => {
    render(
      <IconButtonGroup data-testid="group">
        <IconButton label="Edit">
          <Icon />
        </IconButton>
        <IconButton label="Delete" variant="danger">
          <Icon />
        </IconButton>
      </IconButtonGroup>,
    );

    const group = screen.getByTestId('group');

    expect(group).toHaveAttribute('data-slot', 'icon-button-group');
    expect(group).toHaveClass('flex');
    expect(group).toContainElement(screen.getByRole('button', { name: 'Edit' }));
    expect(group).toContainElement(screen.getByRole('button', { name: 'Delete' }));
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<IconButtonGroup ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
