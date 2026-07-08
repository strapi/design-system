import { render as renderRTL, waitFor } from '@test/utils';

import { Item, ItemProps } from './Avatar';

const render = (props: Partial<ItemProps> = {}) =>
  renderRTL(<Item src="http://example.com/avatar.png" alt="an avatar" fallback="AV" {...props} />);

/**
 * Radix's `Avatar.Image` only mounts the `<img>` element once its internal
 * image loader reports `loaded`. jsdom never fires `onload` on its own, so we
 * stub the `Image` constructor to resolve immediately.
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
  it('should render the fallback while the image is not loaded', async () => {
    const { findByText } = render({ delayMs: 0 });

    expect(await findByText('AV')).toBeInTheDocument();
  });

  it('should forward crossOrigin to the avatar image', async () => {
    const restore = mockImageLoading();

    try {
      const { container } = render({ crossOrigin: 'anonymous' });

      await waitFor(() => {
        // eslint-disable-next-line testing-library/no-container
        const img = container.querySelector('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('crossorigin', 'anonymous');
      });
    } finally {
      restore();
    }
  });

  it('should forward crossOrigin to the hover preview image', async () => {
    const restore = mockImageLoading();

    try {
      const { getAllByRole, user } = render({ crossOrigin: 'anonymous', preview: true });

      const trigger = await waitFor(() => {
        const img = getAllByRole('img').find((el) => el.getAttribute('crossorigin') === 'anonymous');
        expect(img).toBeInTheDocument();
        return img!;
      });

      await user.hover(trigger);

      // Both the thumbnail and the tooltip preview must carry the same crossorigin.
      await waitFor(() => {
        const imgs = getAllByRole('img');
        expect(imgs.length).toBeGreaterThan(1);
        imgs.forEach((img) => expect(img).toHaveAttribute('crossorigin', 'anonymous'));
      });
    } finally {
      restore();
    }
  });
});
