import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Portal } from './portal';

describe('Portal', () => {
  it('renders its children into the body by default', () => {
    const { container } = render(
      <Portal data-testid="portal">
        <p>Portaled</p>
      </Portal>,
    );

    const portal = screen.getByTestId('portal');

    expect(container).not.toContainElement(portal);
    expect(portal.parentElement).toBe(document.body);
    expect(portal).toContainElement(screen.getByText('Portaled'));
  });

  it('renders into a given container', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    render(
      <Portal container={target} data-testid="portal" className="fixed">
        Portaled
      </Portal>,
    );

    expect(screen.getByTestId('portal').parentElement).toBe(target);
    expect(screen.getByTestId('portal')).toHaveClass('fixed');

    target.remove();
  });

  it('renders nothing when the container is null', () => {
    render(
      <Portal container={null} data-testid="portal">
        Portaled
      </Portal>,
    );

    expect(screen.queryByTestId('portal')).not.toBeInTheDocument();
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Portal ref={ref} data-testid="portal" />);

    expect(ref.current).toBe(screen.getByTestId('portal'));
  });
});
