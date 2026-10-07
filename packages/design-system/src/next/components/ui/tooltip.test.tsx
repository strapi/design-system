import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { SimpleTooltip, Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

describe('Tooltip', () => {
  it('opens on hover with a role of tooltip, and closes on unhover', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip>
        <TooltipTrigger delay={0}>Delete</TooltipTrigger>
        <TooltipContent>Delete the entry</TooltipContent>
      </Tooltip>,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    await user.hover(screen.getByRole('button', { name: 'Delete' }));

    expect(await screen.findByRole('tooltip', { name: 'Delete the entry' })).toBeInTheDocument();
    // As with the legacy Radix Tooltip, the open tooltip describes its trigger
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveAccessibleDescription('Delete the entry');

    await user.unhover(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Delete' })).not.toHaveAttribute('aria-describedby');
  });

  it('opens on keyboard focus', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip>
        <TooltipTrigger>Delete</TooltipTrigger>
        <TooltipContent>Delete the entry</TooltipContent>
      </Tooltip>,
    );

    await user.tab();

    expect(await screen.findByRole('tooltip', { name: 'Delete the entry' })).toBeInTheDocument();
  });

  it('shows above the trigger by default, and accepts a side', () => {
    const { unmount } = render(
      <Tooltip open>
        <TooltipTrigger>Delete</TooltipTrigger>
        <TooltipContent>Label</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByRole('tooltip')).toHaveAttribute('data-side', 'top');

    unmount();

    render(
      <Tooltip open>
        <TooltipTrigger>Delete</TooltipTrigger>
        <TooltipContent side="right">Label</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByRole('tooltip')).toHaveAttribute('data-side', 'right');
  });

  it('forwards the refs of the trigger and the content', () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();

    render(
      <Tooltip open>
        <TooltipTrigger ref={triggerRef}>Delete</TooltipTrigger>
        <TooltipContent ref={contentRef}>Label</TooltipContent>
      </Tooltip>,
    );

    expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Delete' }));
    expect(contentRef.current).toBe(screen.getByRole('tooltip'));
  });
});

describe('SimpleTooltip', () => {
  it('renders an accessible tooltip from its label', async () => {
    const user = userEvent.setup();

    render(
      <SimpleTooltip label="My tooltip">
        <button type="button">My button</button>
      </SimpleTooltip>,
    );

    await user.hover(screen.getByRole('button', { name: 'My button' }));

    expect(await screen.findByRole('tooltip', { name: 'My tooltip' })).toBeInTheDocument();
  });

  it('renders the label and not the description if both are provided', () => {
    render(
      <SimpleTooltip label="My tooltip label" description="My tooltip description" open>
        <button type="button">My button</button>
      </SimpleTooltip>,
    );

    expect(screen.getByRole('tooltip', { name: 'My tooltip label' })).toBeInTheDocument();
    expect(screen.queryByText('My tooltip description')).not.toBeInTheDocument();
  });

  it('falls back to the deprecated description', () => {
    render(
      <SimpleTooltip description="My tooltip description" open>
        <button type="button">My button</button>
      </SimpleTooltip>,
    );

    expect(screen.getByRole('tooltip', { name: 'My tooltip description' })).toBeInTheDocument();
  });

  it('renders only its children when the label is empty', async () => {
    const user = userEvent.setup();

    render(
      <SimpleTooltip label="">
        <button type="button">My button</button>
      </SimpleTooltip>,
    );

    await user.hover(screen.getByRole('button', { name: 'My button' }));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('keeps the props and the handlers of its child', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <SimpleTooltip label="Label">
        <button type="button" onClick={onClick} aria-describedby="hint">
          My button
        </button>
      </SimpleTooltip>,
    );

    await user.click(screen.getByRole('button', { name: 'My button' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'My button' })).toHaveAttribute('aria-describedby', 'hint');
  });
});
