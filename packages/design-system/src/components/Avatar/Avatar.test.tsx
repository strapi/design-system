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

  it('should not paint the primary background behind a loaded image (transparent images)', async () => {
    const restore = mockImageLoading();

    try {
      const { container } = render();

      const img = await waitFor(() => {
        const el = container.querySelector('img');
        expect(el).toBeInTheDocument();
        return el!;
      });

      const root = img.parentElement!;
      const background = window.getComputedStyle(root).backgroundColor;

      // primary600 is #4945ff => rgb(73, 69, 255); it must not show through transparent images
      expect(background).not.toBe('rgb(73, 69, 255)');
    } finally {
      restore();
    }
  });

  it('should forward crossOrigin to the avatar image', async () => {
    const restore = mockImageLoading();

    try {
      const { container } = render({ crossOrigin: 'anonymous' });

      await waitFor(() => {
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
