import * as React from 'react';

import { Button } from '@strapi/design-system/next';
import { render, screen } from '@testing-library/react';

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
});
