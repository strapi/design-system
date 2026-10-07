import * as React from 'react';

import { Cross } from '@strapi/icons';
import { render, screen } from '@test/utils';

import { Tag } from './tag';

describe('Tag', () => {
  it('renders the children and a button with the icon', () => {
    render(<Tag icon={<Cross data-testid="icon" />}>hello</Tag>);

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('icon'));
  });

  it('renders a cross by default', () => {
    render(<Tag label="Remove hello">hello</Tag>);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('button', { name: 'Remove hello' }).querySelector('svg')).toBeInTheDocument();
  });

  it('fires the onClick callback', async () => {
    const onClick = jest.fn();

    const { user } = render(
      <Tag label="Clear" onClick={onClick}>
        hello
      </Tag>,
    );

    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('handles the disabled prop', async () => {
    const onClick = jest.fn();

    const { user } = render(
      <Tag label="Clear" onClick={onClick} disabled>
        hello
      </Tag>,
    );

    const button = screen.getByRole('button', { name: 'Clear' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards its ref to the root', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Tag ref={ref} label="Clear">
        hello
      </Tag>,
    );

    expect(ref.current).toHaveAttribute('data-slot', 'tag');
  });
});
