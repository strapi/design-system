import * as React from 'react';

import { render, screen, within } from '@test/utils';

import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert';

describe('Alert', () => {
  it('renders the title and the message in a status region', () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Message</AlertDescription>
      </Alert>,
    );

    // The DesignSystemProvider of the test renders its own live regions, so the queries look inside the Alert
    const region = within(screen.getByTestId('alert')).getByRole('status');

    expect(region).toHaveTextContent('TitleMessage');
    expect(screen.getByText('Title').tagName).toBe('P');
  });

  it('uses an alert region for the danger variant', () => {
    render(
      <Alert variant="danger" data-testid="alert">
        <AlertDescription>Something broke</AlertDescription>
      </Alert>,
    );

    const alert = within(screen.getByTestId('alert'));

    expect(alert.getByRole('alert')).toHaveTextContent('Something broke');
    expect(alert.queryByRole('status')).not.toBeInTheDocument();
  });

  it.each(['default', 'success', 'warning', 'danger'] as const)('applies the %s variant', (variant) => {
    const { container } = render(
      <Alert variant={variant}>
        <AlertDescription>Message</AlertDescription>
      </Alert>,
    );

    expect(container.querySelector('[data-slot="alert"]')).toHaveAttribute('data-variant', variant);
    expect(container.querySelector('[data-slot="alert-icon"] svg')).toBeInTheDocument();
  });

  it('calls onClose from the close button, named by closeLabel', async () => {
    const onClose = jest.fn();
    const { user } = render(
      <Alert onClose={onClose} closeLabel="Close the alert">
        <AlertDescription>Message</AlertDescription>
      </Alert>,
    );

    await user.click(screen.getByRole('button', { name: 'Close the alert' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has no close button without onClose or closeLabel', () => {
    render(
      <Alert>
        <AlertDescription>Message</AlertDescription>
      </Alert>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the action and lets the title change its element', () => {
    render(
      <Alert icon={null}>
        <AlertTitle render={<h2 />}>Heading title</AlertTitle>
        <AlertDescription>Message</AlertDescription>
        <AlertAction>
          <a href="/docs">Learn more</a>
        </AlertAction>
      </Alert>,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Heading title' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', '/docs');
  });

  it('forwards the refs', () => {
    const ref = React.createRef<HTMLDivElement>();
    const titleRef = React.createRef<HTMLElement>();

    render(
      <Alert ref={ref}>
        <AlertTitle ref={titleRef}>Title</AlertTitle>
      </Alert>,
    );

    expect(ref.current).toHaveAttribute('data-slot', 'alert');
    expect(titleRef.current).toHaveTextContent('Title');
  });
});
