import * as React from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { TextButton } from './text-button';

const Icon = (props: React.ComponentProps<'svg'>) => <svg data-testid="icon" {...props} />;

describe('TextButton', () => {
  it('renders a primary text button', () => {
    render(<TextButton>Add an entry</TextButton>);

    const button = screen.getByRole('button', { name: 'Add an entry' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-slot', 'text-button');
    expect(button).toHaveClass('text-primary-600', 'bg-transparent');
    expect(screen.getByText('Add an entry')).toHaveClass('text-xs');
  });

  it('calls onClick', async () => {
    const onClick = jest.fn();

    render(<TextButton onClick={onClick}>Add</TextButton>);

    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders the start and end icons', () => {
    render(
      <TextButton startIcon={<Icon />} endIcon={<Icon />}>
        Add
      </TextButton>,
    );

    expect(screen.getAllByTestId('icon')).toHaveLength(2);
  });

  it('is disabled', async () => {
    const onClick = jest.fn();

    render(
      <TextButton disabled onClick={onClick}>
        Add
      </TextButton>,
    );

    const button = screen.getByRole('button', { name: 'Add' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('replaces the start icon with a loader and disables itself when loading', () => {
    render(
      <TextButton loading startIcon={<Icon />}>
        Add
      </TextButton>,
    );

    const button = screen.getByRole('button', { name: 'Add' });

    expect(button).toBeDisabled();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(button.querySelector('[data-slot="text-button-loader"]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLElement>();

    render(<TextButton ref={ref}>Add</TextButton>);

    expect(ref.current).toBe(screen.getByRole('button'));
  });
});
