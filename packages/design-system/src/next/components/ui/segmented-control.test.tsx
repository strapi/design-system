import * as React from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { SegmentedControl, SegmentedControlItem } from './segmented-control';

const Example = ({ onValueChange }: { onValueChange?: (value: string) => void }) => {
  const [value, setValue] = React.useState('publish');
  return (
    <SegmentedControl
      value={value}
      onValueChange={(next) => {
        setValue(next as string);
        onValueChange?.(next as string);
      }}
    >
      <SegmentedControlItem value="publish">Publish</SegmentedControlItem>
      <SegmentedControlItem value="unpublish">Unpublish</SegmentedControlItem>
    </SegmentedControl>
  );
};

describe('SegmentedControl', () => {
  it('selects another item and marks it checked', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(<Example onValueChange={onValueChange} />);

    const publish = screen.getByRole('radio', { name: 'Publish' });
    const unpublish = screen.getByRole('radio', { name: 'Unpublish' });

    expect(publish).toBeChecked();
    expect(unpublish).not.toBeChecked();

    await user.click(unpublish);

    expect(onValueChange).toHaveBeenLastCalledWith('unpublish');
    expect(unpublish).toBeChecked();
    expect(publish).not.toBeChecked();
  });

  it('keeps a selection — clicking the selected item does not clear it', async () => {
    const user = userEvent.setup();

    render(<Example />);

    const publish = screen.getByRole('radio', { name: 'Publish' });
    await user.click(publish);

    expect(publish).toBeChecked();
  });
});
