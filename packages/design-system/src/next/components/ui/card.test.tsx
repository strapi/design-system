import * as React from 'react';

import { render, screen } from '@test/utils';

import {
  Card,
  CardAction,
  CardAsset,
  CardBadge,
  CardBody,
  CardCheckbox,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTimer,
  CardTitle,
} from './card';

const renderCard = (props: React.ComponentProps<typeof Card> = {}) =>
  render(
    <Card {...props}>
      <CardHeader>
        <CardCheckbox />
        <CardAction position="end">
          <button type="button">Edit the thing</button>
        </CardAction>
        <CardAsset src="/first.jpg" />
        <CardTimer>05:39</CardTimer>
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>File name</CardTitle>
          <CardSubtitle>PNG - 400✕400</CardSubtitle>
        </CardContent>
        <CardBadge>Doc</CardBadge>
      </CardBody>
    </Card>,
  );

describe('Card', () => {
  it('renders a focusable article named by its title', () => {
    renderCard();

    const card = screen.getByRole('article', { name: 'File name' });

    expect(card).toHaveAttribute('tabindex', '0');
    expect(screen.getByText('PNG - 400✕400')).toBeInTheDocument();
    expect(screen.getByText('Doc')).toHaveAttribute('data-slot', 'badge');
    expect(screen.getByText('05:39').tagName).toBe('TIME');
  });

  it('uses the given id for the title and keeps it on the article', () => {
    renderCard({ id: 'first' });

    expect(screen.getByRole('article', { name: 'File name' })).toHaveAttribute('id', 'first');
    expect(screen.getByText('File name')).toHaveAttribute('id', 'first-title');
  });

  it('names the checkbox with the title', () => {
    renderCard();

    expect(screen.getByRole('checkbox', { name: 'File name' })).toBeInTheDocument();
  });

  it('places the actions in the corners', () => {
    renderCard();

    // eslint-disable-next-line testing-library/no-node-access
    const action = screen.getByRole('button', { name: 'Edit the thing' }).parentElement;

    expect(action).toHaveAttribute('data-position', 'end');
  });

  it('renders the asset image hidden from assistive technology, or its children', () => {
    const { container } = renderCard();

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('img')).toHaveAttribute('aria-hidden', 'true');

    render(
      <CardAsset size="sm">
        <span>video</span>
      </CardAsset>,
    );

    expect(screen.getByText('video').parentElement).toHaveAttribute('data-size', 'sm');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Card ref={ref}>
        <CardTitle>Title</CardTitle>
      </Card>,
    );

    expect(ref.current).toBe(screen.getByRole('article', { name: 'Title' }));
  });
});
