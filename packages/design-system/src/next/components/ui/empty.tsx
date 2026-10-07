import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * The legacy `EmptyStateLayout`: a `neutral0` card with the table shadow, an optional illustration,
 * a centred message and an optional action.
 *
 * ```tsx
 * <Empty>
 *   <EmptyMedia><EmptyDocuments width="16rem" /></EmptyMedia>
 *   <EmptyTitle>You don't have any content yet...</EmptyTitle>
 *   <EmptyContent><Button>Create your first content-type</Button></EmptyContent>
 * </Empty>
 * ```
 */
const Empty = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="empty"
        className={cn('flex flex-col items-center rounded-md bg-neutral-0 p-14 shadow-table', className)}
        {...props}
      />
    );
  },
);

Empty.displayName = 'Empty';

/**
 * Groups the media, the title and the description, when you need a wrapper around them.
 */
const EmptyHeader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} data-slot="empty-header" className={cn('flex flex-col items-center', className)} {...props} />
    );
  },
);

EmptyHeader.displayName = 'EmptyHeader';

/**
 * The illustration. It is decorative, so it is hidden from assistive technologies. An SVG in it is 8.8rem tall.
 */
const EmptyMedia = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="empty-media"
        aria-hidden
        className={cn('pb-6 [&_svg]:pointer-events-none [&_svg]:h-22', className)}
        {...props}
      />
    );
  },
);

EmptyMedia.displayName = 'EmptyMedia';

/**
 * The message (the legacy `content` prop), in the `delta` text style.
 */
const EmptyTitle = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<'p'>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="empty-title"
        className={cn(
          'pb-4 text-center text-lg leading-snug font-medium text-neutral-600 medium:text-base medium:leading-tight',
          className,
        )}
        {...props}
      />
    );
  },
);

EmptyTitle.displayName = 'EmptyTitle';

/**
 * Secondary text under the title. The legacy component had none.
 */
const EmptyDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<'p'>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="empty-description"
        className={cn(
          'pb-4 text-center text-base text-neutral-600 medium:text-sm [&>a]:text-primary-600 [&>a]:underline',
          className,
        )}
        {...props}
      />
    );
  },
);

EmptyDescription.displayName = 'EmptyDescription';

/**
 * The action (the legacy `action` prop), usually a Button.
 */
const EmptyContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="empty-content"
        className={cn('flex flex-col items-center gap-2', className)}
        {...props}
      />
    );
  },
);

EmptyContent.displayName = 'EmptyContent';

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
