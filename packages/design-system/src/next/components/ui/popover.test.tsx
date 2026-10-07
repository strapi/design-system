import * as React from 'react';

import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Popover, PopoverContent, PopoverScrollArea, PopoverTitle, PopoverTrigger } from './popover';

// The scroll area measures itself in a frame after it mounts
const settle = () => act(() => new Promise((resolve) => setTimeout(resolve, 20)));

describe('Popover', () => {
  beforeAll(() => {
    // jsdom has no Web Animations API, which the scroll area calls
    if (!Element.prototype.getAnimations) {
      Element.prototype.getAnimations = () => [];
    }
  });

  it('opens and closes from its trigger', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Filters</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Filter entries</PopoverTitle>
          <button type="button">Apply</button>
        </PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole('button', { name: 'Filters' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByRole('dialog', { name: 'Filter entries' })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('places the content below the trigger, aligned to its start, by default', () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent data-testid="content">Content</PopoverContent>
      </Popover>,
    );

    expect(screen.getByTestId('content')).toHaveAttribute('data-side', 'bottom');
    expect(screen.getByTestId('content')).toHaveAttribute('data-align', 'start');
  });

  it('accepts a side and an alignment', () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent data-testid="content" side="top" align="end">
          Content
        </PopoverContent>
      </Popover>,
    );

    expect(screen.getByTestId('content')).toHaveAttribute('data-side', 'top');
    expect(screen.getByTestId('content')).toHaveAttribute('data-align', 'end');
  });

  it('forwards the refs of the trigger and the content', () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();

    render(
      <Popover defaultOpen>
        <PopoverTrigger ref={triggerRef}>Open</PopoverTrigger>
        <PopoverContent ref={contentRef} data-testid="content">
          Content
        </PopoverContent>
      </Popover>,
    );

    expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Open' }));
    expect(contentRef.current).toBe(screen.getByTestId('content'));
  });

  describe('ScrollArea', () => {
    const observe = jest.fn();
    const disconnect = jest.fn();
    let trigger: IntersectionObserverCallback = () => {};

    beforeEach(() => {
      observe.mockClear();
      disconnect.mockClear();
      window.IntersectionObserver = jest.fn((callback: IntersectionObserverCallback) => {
        trigger = callback;

        return { observe, disconnect, unobserve: jest.fn(), takeRecords: jest.fn() };
      }) as unknown as typeof IntersectionObserver;
    });

    afterEach(() => {
      // @ts-expect-error jsdom has none, the test restores that
      delete window.IntersectionObserver;
    });

    it('calls onReachEnd when the end of an overflowing list comes into view', async () => {
      const onReachEnd = jest.fn();

      render(
        <Popover defaultOpen>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            <PopoverScrollArea onReachEnd={onReachEnd} data-testid="scroll">
              <p>Item</p>
            </PopoverScrollArea>
          </PopoverContent>
        </Popover>,
      );
      await settle();

      expect(observe).toHaveBeenCalledTimes(1);

      const viewport = screen.getByTestId('scroll').querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]')!;
      Object.defineProperty(viewport, 'scrollHeight', { configurable: true, value: 400 });
      Object.defineProperty(viewport, 'clientHeight', { configurable: true, value: 200 });

      const entry = { isIntersecting: true } as IntersectionObserverEntry;
      act(() => trigger([entry], {} as IntersectionObserver));

      expect(onReachEnd).toHaveBeenCalledWith(entry);
    });

    it('does not call onReachEnd when the list does not overflow', async () => {
      const onReachEnd = jest.fn();

      render(
        <Popover defaultOpen>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            <PopoverScrollArea onReachEnd={onReachEnd}>
              <p>Item</p>
            </PopoverScrollArea>
          </PopoverContent>
        </Popover>,
      );
      await settle();

      act(() => trigger([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));

      expect(onReachEnd).not.toHaveBeenCalled();
    });

    it('does not observe without onReachEnd', async () => {
      render(
        <PopoverScrollArea>
          <p>Item</p>
        </PopoverScrollArea>,
      );
      await settle();

      expect(observe).not.toHaveBeenCalled();
    });
  });
});
