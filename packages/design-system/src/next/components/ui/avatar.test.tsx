import * as React from 'react';

import { render, screen, waitFor } from '@test/utils';

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from './avatar';

/**
 * The Base UI image only mounts the `<img>` once its loader reports `loaded`. jsdom never loads an image, so this
 * stub fires `load` right away
 */
const mockImageLoading = () => {
  const OriginalImage = window.Image;

  window.Image = class extends OriginalImage {
    constructor() {
      super();
      setTimeout(() => {
        this.dispatchEvent(new Event('load'));
      }, 0);
    }
  };

  return () => {
    window.Image = OriginalImage;
  };
};

describe('Avatar', () => {
  it('renders the fallback while the image is not loaded', async () => {
    render(<Avatar src="http://example.com/avatar.png" alt="an avatar" fallback="AV" delay={0} />);

    expect(await screen.findByText('AV')).toBeInTheDocument();
  });

  it('renders the image and forwards crossOrigin once it loads', async () => {
    const restore = mockImageLoading();
    const onLoadingStatusChange = jest.fn();

    try {
      render(
        <Avatar
          src="http://example.com/avatar.png"
          alt="an avatar"
          crossOrigin="anonymous"
          fallback="AV"
          onLoadingStatusChange={onLoadingStatusChange}
        />,
      );

      const img = await screen.findByRole('img', { name: 'an avatar' });

      expect(img).toHaveAttribute('crossorigin', 'anonymous');
      expect(onLoadingStatusChange).toHaveBeenCalledWith('loaded');
    } finally {
      restore();
    }
  });

  it('renders its compound parts', async () => {
    render(
      <Avatar>
        <AvatarImage alt="no source" />
        <AvatarFallback delay={0}>KS</AvatarFallback>
      </Avatar>,
    );

    expect(await screen.findByText('KS')).toBeInTheDocument();
  });

  it('shows a larger preview on hover when `preview` is set', async () => {
    const restore = mockImageLoading();

    try {
      const { user } = render(
        <Avatar src="http://example.com/avatar.png" alt="an avatar" crossOrigin="anonymous" fallback="AV" preview />,
      );

      const img = await screen.findByRole('img', { name: 'an avatar' });

      await user.hover(img);

      await waitFor(() => {
        expect(screen.getAllByRole('img', { name: 'an avatar' })).toHaveLength(2);
      });

      screen.getAllByRole('img').forEach((image) => expect(image).toHaveAttribute('crossorigin', 'anonymous'));
    } finally {
      restore();
    }
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(<Avatar ref={ref} fallback="AV" />);

    expect(ref.current).toHaveAttribute('data-slot', 'avatar');
  });
});

describe('AvatarGroup', () => {
  it('renders the avatars in a row', async () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <AvatarGroup ref={ref}>
        <Avatar fallback="AB" delay={0} />
        <Avatar fallback="CD" delay={0} />
      </AvatarGroup>,
    );

    expect(await screen.findByText('AB')).toBeInTheDocument();
    expect(screen.getByText('CD')).toBeInTheDocument();
    expect(ref.current).toHaveAttribute('data-slot', 'avatar-group');
  });
});
