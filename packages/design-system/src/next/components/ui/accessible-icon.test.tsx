import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { AccessibleIcon } from './accessible-icon';

// The @strapi/icons components read the styled-components theme, so the test uses a plain SVG
const Cross = React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<'svg'>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 32 32" {...props}>
    <path d="M26 24 18 16l8-8-2-2-8 8-8-8-2 2 8 8-8 8 2 2 8-8 8 8z" />
  </svg>
));

describe('AccessibleIcon', () => {
  it('adds a visually hidden label', () => {
    render(
      <button type="button">
        <AccessibleIcon label="Close">
          <Cross data-testid="icon" />
        </AccessibleIcon>
      </button>,
    );

    expect(screen.getByText('Close')).toHaveClass('sr-only');
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('hides the icon from assistive technology and from the focus order', () => {
    render(
      <AccessibleIcon label="Close">
        <Cross data-testid="icon" />
      </AccessibleIcon>,
    );

    const svg = screen.getByTestId('icon');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
  });

  it('keeps the ref of the child', () => {
    const ref = React.createRef<SVGSVGElement>();

    render(
      <AccessibleIcon label="Close">
        <Cross ref={ref} data-testid="icon" />
      </AccessibleIcon>,
    );

    expect(ref.current).toBe(screen.getByTestId('icon'));
  });

  it('throws without a single child', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<AccessibleIcon label="Close" />)).toThrow(
      'React.Children.only expected to receive a single React element child.',
    );

    spy.mockRestore();
  });
});
