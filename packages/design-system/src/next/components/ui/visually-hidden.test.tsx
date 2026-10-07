import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { VisuallyHidden } from './visually-hidden';

describe('VisuallyHidden', () => {
  it('renders a span that hides its content visually but keeps it readable', () => {
    render(<VisuallyHidden>Hidden label</VisuallyHidden>);

    const element = screen.getByText('Hidden label');

    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('sr-only');
    expect(element).toHaveAttribute('data-slot', 'visually-hidden');
  });

  it('forwards its props, className and ref', () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <VisuallyHidden ref={ref} id="description" aria-live="polite" className="custom">
        Text
      </VisuallyHidden>,
    );

    const element = screen.getByText('Text');

    expect(ref.current).toBe(element);
    expect(element).toHaveAttribute('id', 'description');
    expect(element).toHaveAttribute('aria-live', 'polite');
    expect(element).toHaveClass('sr-only', 'custom');
  });

  it('renders another element through the render prop', () => {
    render(
      <figure>
        <VisuallyHidden render={<figcaption />}>Caption</VisuallyHidden>
      </figure>,
    );

    const element = screen.getByText('Caption');

    expect(element.tagName).toBe('FIGCAPTION');
    expect(element).toHaveClass('sr-only');
  });
});
