import * as React from 'react';

import { act, render, screen } from '@testing-library/react';

import { LiveRegionIds, LiveRegions, useNotifyAT } from './live-regions';

type Notifier = ReturnType<typeof useNotifyAT>;

const Notifier = ({ onReady }: { onReady: (notifier: Notifier) => void }) => {
  const notifier = useNotifyAT();

  React.useEffect(() => {
    onReady(notifier);
  }, [notifier, onReady]);

  return null;
};

const setup = () => {
  let notifier: Notifier | undefined;

  const utils = render(
    <>
      <LiveRegions />
      <Notifier onReady={(value) => (notifier = value)} />
    </>,
  );

  return { ...utils, notifier: notifier! };
};

describe('LiveRegions', () => {
  it('renders three visually hidden live regions with the legacy roles and ids', () => {
    render(<LiveRegions />);

    const log = screen.getByRole('log');
    const status = screen.getByRole('status');
    const alert = screen.getByRole('alert');

    expect(log).toHaveAttribute('id', LiveRegionIds.Log);
    expect(log).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('id', 'live-region-status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(alert).toHaveAttribute('id', 'live-region-alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
    expect(log.parentElement).toHaveClass('sr-only');
  });

  it.each([
    ['notifyLog', 'log'],
    ['notifyStatus', 'status'],
    ['notifyAlert', 'alert'],
  ] as const)('%s writes to the %s region', (method, role) => {
    const { notifier } = setup();

    act(() => notifier[method]('A message'));

    expect(screen.getByRole(role)).toHaveTextContent('A message');
  });

  it('empties the regions when the component that uses the hook unmounts', () => {
    let notifier: Notifier | undefined;

    const { rerender } = render(
      <>
        <LiveRegions />
        <Notifier onReady={(value) => (notifier = value)} />
      </>,
    );

    act(() => notifier!.notifyAlert('An alert'));

    expect(screen.getByRole('alert')).toHaveTextContent('An alert');

    rerender(<LiveRegions />);

    expect(screen.getByRole('alert')).toHaveTextContent('');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(<LiveRegions ref={ref} />);

    expect(ref.current).toHaveAttribute('data-slot', 'live-regions');
  });
});
