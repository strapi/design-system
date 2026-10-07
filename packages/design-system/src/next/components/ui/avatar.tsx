'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface AvatarImageData {
  src?: string;
  alt?: string;
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
}

interface AvatarContextValue {
  setImage: (image: AvatarImageData) => void;
  setLoadingStatus: (status: ImageLoadingStatus) => void;
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/* -------------------------------------------------------------------------------------------------
 * AvatarImage
 * -----------------------------------------------------------------------------------------------*/

type AvatarImageProps = AvatarPrimitive.Image.Props;

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, crossOrigin, onLoadingStatusChange, ...props }, ref) => {
    const context = React.useContext(AvatarContext);
    const setImage = context?.setImage;

    // The preview of the Avatar shows the same image
    useIsomorphicLayoutEffect(() => {
      setImage?.({ src, alt, crossOrigin });
    }, [setImage, src, alt, crossOrigin]);

    return (
      <AvatarPrimitive.Image
        ref={ref}
        data-slot="avatar-image"
        src={src}
        alt={alt}
        crossOrigin={crossOrigin}
        onLoadingStatusChange={(status) => {
          context?.setLoadingStatus(status);
          onLoadingStatusChange?.(status);
        }}
        className={cn('size-full rounded-[inherit] object-cover', className)}
        {...props}
      />
    );
  },
);

AvatarImage.displayName = 'AvatarImage';

/* -------------------------------------------------------------------------------------------------
 * AvatarFallback
 * -----------------------------------------------------------------------------------------------*/

type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;

/**
 * Shows while the image loads or when it fails. It waits 600ms before it shows, so a fast connection never sees it
 */
const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, delay = 600, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      delay={delay}
      className={cn(
        // The legacy `omega` text style, semibold and uppercase
        'text-base font-semibold uppercase medium:text-sm',
        className,
      )}
      {...props}
    />
  ),
);

AvatarFallback.displayName = 'AvatarFallback';

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/

interface AvatarProps extends AvatarPrimitive.Root.Props {
  /**
   * The image. With no children, the Avatar renders an `AvatarImage` with `src`, `alt` and `crossOrigin`
   */
  src?: string;
  alt?: string;
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
  /**
   * With no children, the content of the `AvatarFallback`, usually initials
   */
  fallback?: React.ReactNode;
  /**
   * With no children, how long the fallback waits before it shows, in ms
   * @default 600
   */
  delay?: number;
  /**
   * Shows a larger copy of the image in a tooltip on hover, once the image has loaded
   * @default false
   */
  preview?: boolean;
  /**
   * Called when the loading status of the image changes
   */
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

const AVATAR =
  'relative z-0 inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-600 align-middle text-neutral-0 select-none';

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { className, children, src, alt, crossOrigin, fallback, delay, preview = false, onLoadingStatusChange, ...props },
    ref,
  ) => {
    const [image, setImage] = React.useState<AvatarImageData>({});
    const [loadingStatus, setLoadingStatusState] = React.useState<ImageLoadingStatus>('idle');
    const [open, setOpen] = React.useState(false);

    const onLoadingStatusChangeRef = React.useRef(onLoadingStatusChange);
    onLoadingStatusChangeRef.current = onLoadingStatusChange;

    const setLoadingStatus = React.useCallback((status: ImageLoadingStatus) => {
      setLoadingStatusState(status);
      onLoadingStatusChangeRef.current?.(status);
    }, []);

    const context = React.useMemo(() => ({ setImage, setLoadingStatus }), [setLoadingStatus]);

    const content = children ?? (
      <>
        {src !== undefined ? <AvatarImage src={src} alt={alt} crossOrigin={crossOrigin} /> : null}
        {fallback !== undefined ? <AvatarFallback delay={delay}>{fallback}</AvatarFallback> : null}
      </>
    );

    const hasPreview = preview && loadingStatus === 'loaded';

    if (!preview) {
      return (
        <AvatarContext.Provider value={context}>
          <AvatarPrimitive.Root ref={ref} data-slot="avatar" className={cn(AVATAR, className)} {...props}>
            {content}
          </AvatarPrimitive.Root>
        </AvatarContext.Provider>
      );
    }

    return (
      <AvatarContext.Provider value={context}>
        <TooltipPrimitive.Root open={hasPreview && open} onOpenChange={setOpen} disabled={!hasPreview}>
          <TooltipPrimitive.Trigger
            // The trigger renders the Avatar root, a `<span>`, not its default `<button>`
            ref={ref as unknown as React.Ref<HTMLButtonElement>}
            render={(triggerProps) => (
              <AvatarPrimitive.Root
                {...props}
                {...(triggerProps as AvatarPrimitive.Root.Props)}
                data-slot="avatar"
                className={cn(AVATAR, className)}
              >
                {hasPreview ? (
                  <span
                    aria-hidden
                    data-slot="avatar-overlay"
                    className={cn(
                      'absolute inset-0 z-1 bg-neutral-0 opacity-0 motion-safe:transition-opacity motion-safe:duration-200',
                      open && 'opacity-40',
                    )}
                  />
                ) : null}
                {content}
              </AvatarPrimitive.Root>
            )}
          />
          {hasPreview ? (
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Positioner side="top" sideOffset={4} className="z-50">
                <TooltipPrimitive.Popup
                  data-slot="avatar-preview"
                  className="inline-flex size-16 items-center justify-center overflow-hidden rounded-full select-none motion-safe:transition-opacity motion-safe:duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    crossOrigin={image.crossOrigin}
                    className="size-full rounded-[inherit] object-cover"
                  />
                </TooltipPrimitive.Popup>
              </TooltipPrimitive.Positioner>
            </TooltipPrimitive.Portal>
          ) : null}
        </TooltipPrimitive.Root>
      </AvatarContext.Provider>
    );
  },
);

Avatar.displayName = 'Avatar';

/* -------------------------------------------------------------------------------------------------
 * AvatarGroup
 * -----------------------------------------------------------------------------------------------*/

/**
 * A row of Avatars that overlap by half their width
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="avatar-group"
      className={cn('flex items-center [&>[data-slot=avatar]+[data-slot=avatar]]:-ml-4', className)}
      {...props}
    />
  ),
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps, ImageLoadingStatus };
