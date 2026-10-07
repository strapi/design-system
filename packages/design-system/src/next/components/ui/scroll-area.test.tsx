import * as React from 'react';

import { act, render, screen } from '@testing-library/react';

import { ScrollArea } from './scroll-area';

// The scroll area measures itself after the first render
const flushMeasures = () => act(async () => {});

describe('ScrollArea', () => {
  beforeAll(() => {
    // jsdom has no Web Animations API, and the Base UI viewport reads it in a timeout after a scroll check
    if (!Element.prototype.getAnimations) {
      Element.prototype.getAnimations = () => [];
    }
  });

  it('renders its children inside the viewport', async () => {
    render(
      <ScrollArea data-testid="root">
        <p>Content</p>
      </ScrollArea>,
    );
    await flushMeasures();

    const root = screen.getByTestId('root');
    const viewport = root.querySelector('[data-slot="scroll-area-viewport"]');

    expect(root).toHaveAttribute('data-slot', 'scroll-area');
    expect(viewport).toContainElement(screen.getByText('Content'));
  });

  it('forwards the ref to the root and viewportRef to the viewport', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const viewportRef = React.createRef<HTMLDivElement>();

    render(
      <ScrollArea ref={ref} viewportRef={viewportRef} data-testid="root" className="h-40" viewportClassName="p-2">
        <p>Content</p>
      </ScrollArea>,
    );
    await flushMeasures();

    const root = screen.getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root).toHaveClass('h-40');
    expect(viewportRef.current).toHaveAttribute('data-slot', 'scroll-area-viewport');
    expect(viewportRef.current).toHaveClass('p-2');
  });
});
