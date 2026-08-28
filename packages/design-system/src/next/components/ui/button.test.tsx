import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('renders and forwards its props', () => {
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
    const ref = React.createRef<HTMLButtonElement>();

    render(<Button ref={ref}>Save</Button>);

    expect(ref.current).toBe(screen.getByRole('button'));
  });
});
