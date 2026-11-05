import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

describe('Popover', () => {
  it('opens from its trigger and shows its content', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Scheduling options</PopoverContent>
      </Popover>,
    );

    expect(screen.queryByText('Scheduling options')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(await screen.findByText('Scheduling options')).toBeInTheDocument();
  });

  it('closes when the user presses Escape', async () => {
    const user = userEvent.setup();

    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Scheduling options</PopoverContent>
      </Popover>,
    );

    expect(screen.getByText('Scheduling options')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByText('Scheduling options')).not.toBeInTheDocument());
  });
});
