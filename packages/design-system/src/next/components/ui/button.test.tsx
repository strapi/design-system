import * as React from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Button, buttonVariants } from './button';

const Icon = (props: React.ComponentProps<'svg'>) => <svg data-testid="icon" {...props} />;

describe('Button', () => {
  it('renders a native button of type "button" by default', () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-slot', 'button');
  });

  it('forwards its props', () => {
    render(
      <Button type="submit" aria-describedby="hint">
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-describedby', 'hint');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLElement>();

    render(<Button ref={ref}>Save</Button>);

    expect(ref.current).toBe(screen.getByRole('button'));
  });

  it('calls onClick', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Save</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled and ignores clicks when disabled', async () => {
    const onClick = jest.fn();

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows a loader in place of the start icon and disables the button when loading', () => {
    render(
      <Button loading startIcon={<Icon />}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toBeDisabled();
    expect(button.querySelector('[data-slot="button-loader"]')).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('renders the start and end icons out of the accessible name', () => {
    render(
      <Button startIcon={<Icon />} endIcon={<Icon />}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    const [start, end] = screen.getAllByTestId('icon');

    expect(start.parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(start.parentElement).toHaveAttribute('data-slot', 'button-start-icon');
    expect(end.parentElement).toHaveAttribute('data-slot', 'button-end-icon');
    expect(button).toContainElement(start);
  });

  it('applies the variant, size and fullWidth classes', () => {
    render(
      <Button variant="danger-light" size="S" fullWidth>
        Delete
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Delete' });

    expect(button).toHaveClass('bg-danger-100', 'text-danger-700', 'border-danger-200', 'h-10', 'medium:h-8', 'w-full');
    // `S` uses the `pi` text
    expect(screen.getByText('Delete')).toHaveClass('text-xs', 'font-semibold');
  });

  it('defaults to the `default` variant and the `S` size, like the legacy Button', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-button-primary-600', 'h-10', 'medium:h-8');
  });

  it('merges a custom className', () => {
    render(<Button className="h-20">Save</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('h-20');
    expect(button).not.toHaveClass('h-11');
  });

  it('renders another element through `render`', () => {
    render(
      <Button nativeButton={false} render={<a href="/home" />}>
        Home
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute('href', '/home');
  });

  it('exposes every legacy variant', () => {
    const variants = [
      'default',
      'secondary',
      'tertiary',
      'success',
      'success-light',
      'danger',
      'danger-light',
      'ghost',
    ] as const;

    variants.forEach((variant) => {
      expect(buttonVariants({ variant })).toEqual(expect.any(String));
    });
  });
});
