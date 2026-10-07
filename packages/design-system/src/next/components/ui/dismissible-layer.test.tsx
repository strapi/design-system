import * as React from 'react';

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createPortal } from 'react-dom';

import { DismissibleLayer } from './dismissible-layer';

const flushTimers = () => act(() => jest.runOnlyPendingTimers());

describe('DismissibleLayer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('dismisses on Escape, unless onEscapeKeyDown prevents it', () => {
    const onDismiss = jest.fn();
    const { rerender } = render(<DismissibleLayer onDismiss={onDismiss}>Layer</DismissibleLayer>);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onDismiss).toHaveBeenCalledTimes(1);

    rerender(
      <DismissibleLayer onDismiss={onDismiss} onEscapeKeyDown={(event) => event.preventDefault()}>
        Layer
      </DismissibleLayer>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('only dismisses the highest layer on Escape', () => {
    const onDismissOuter = jest.fn();
    const onDismissInner = jest.fn();

    render(
      <DismissibleLayer onDismiss={onDismissOuter}>
        <DismissibleLayer onDismiss={onDismissInner}>Inner</DismissibleLayer>
      </DismissibleLayer>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onDismissInner).toHaveBeenCalledTimes(1);
    expect(onDismissOuter).not.toHaveBeenCalled();
  });

  it('dismisses on a pointer down outside, with the outside handlers first', () => {
    const calls: string[] = [];

    render(
      <>
        <button type="button">Outside</button>
        <DismissibleLayer
          onPointerDownOutside={(event) => {
            calls.push(`pointer:${(event.detail.originalEvent.target as HTMLElement).textContent}`);
          }}
          onInteractOutside={() => calls.push('interact')}
          onDismiss={() => calls.push('dismiss')}
        >
          <button type="button">Inside</button>
        </DismissibleLayer>
      </>,
    );

    flushTimers();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Inside' }));

    expect(calls).toEqual([]);

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));

    expect(calls).toEqual(['pointer:Outside', 'interact', 'dismiss']);
  });

  it('keeps the layer when onPointerDownOutside prevents the default', () => {
    const onDismiss = jest.fn();

    render(
      <>
        <button type="button">Outside</button>
        <DismissibleLayer onDismiss={onDismiss} onPointerDownOutside={(event) => event.preventDefault()}>
          Layer
        </DismissibleLayer>
      </>,
    );

    flushTimers();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('treats a portalled child as inside', () => {
    const onDismiss = jest.fn();

    render(
      <DismissibleLayer onDismiss={onDismiss}>
        {createPortal(<button type="button">Portalled</button>, document.body) as unknown as React.ReactNode}
      </DismissibleLayer>,
    );

    flushTimers();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Portalled' }));

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('dismisses when the focus moves outside', () => {
    const onFocusOutside = jest.fn();
    const onDismiss = jest.fn();

    render(
      <>
        <button type="button">Outside</button>
        <DismissibleLayer onDismiss={onDismiss} onFocusOutside={onFocusOutside}>
          <button type="button">Inside</button>
        </DismissibleLayer>
      </>,
    );

    act(() => screen.getByRole('button', { name: 'Inside' }).focus());

    expect(onDismiss).not.toHaveBeenCalled();

    act(() => screen.getByRole('button', { name: 'Outside' }).focus());

    expect(onFocusOutside).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('disables the pointer events outside the layer while mounted', () => {
    const { unmount } = render(
      <DismissibleLayer disableOutsidePointerEvents data-testid="layer">
        Layer
      </DismissibleLayer>,
    );

    expect(document.body.style.pointerEvents).toBe('none');
    expect(screen.getByTestId('layer').style.pointerEvents).toBe('auto');

    unmount();

    expect(document.body.style.pointerEvents).toBe('');
  });

  it('forwards its ref, props and renders another element', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <DismissibleLayer ref={ref} render={<section />} aria-label="Panel" className="p-4">
        Layer
      </DismissibleLayer>,
    );

    const element = screen.getByRole('region', { name: 'Panel' });

    expect(ref.current).toBe(element);
    expect(element).toHaveClass('p-4');
  });
});
