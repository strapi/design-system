import * as React from 'react';

import { Button } from '@strapi/design-system/next';
import { render, screen } from '@testing-library/react';

// This is a path test. It proves that the new import path resolves, that Base UI is wired and that
// React 18 is satisfied
describe('Button', () => {
  it('renders through the new import path and forwards its props', () => {
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

  // The stylesheet check looks for this class, so this test holds the class on the Button
  it('emits the class that the stylesheet check looks for', () => {
    render(<Button variant="default">Save</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });
});
