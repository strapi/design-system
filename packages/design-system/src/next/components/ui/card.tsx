'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import { Badge, type BadgeProps } from './badge';
import { Checkbox } from './checkbox';

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

const CardContext = React.createContext({ id: '' });

const useCard = () => React.useContext(CardContext);

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/

type CardProps = React.ComponentPropsWithoutRef<'article'>;

/**
 * An `<article>` that the keyboard can focus. `CardTitle` names it through `aria-labelledby`
 */
const Card = React.forwardRef<HTMLElement, CardProps>(({ id, className, ...props }, ref) => {
  const generatedId = React.useId();
  const cardId = id ?? generatedId;

  const context = React.useMemo(() => ({ id: cardId }), [cardId]);

  return (
    <CardContext.Provider value={context}>
      <article
        ref={ref}
        id={id}
        tabIndex={0}
        aria-labelledby={`${cardId}-title`}
        data-slot="card"
        className={cn(
          'rounded-md border border-solid border-neutral-150 bg-neutral-0 shadow-table outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary-600',
          className,
        )}
        {...props}
      />
    </CardContext.Provider>
  );
});

Card.displayName = 'Card';

/* -------------------------------------------------------------------------------------------------
 * CardHeader
 * -----------------------------------------------------------------------------------------------*/

/**
 * The top of the Card, which holds the `CardAsset`, the `CardAction`s, the `CardCheckbox` and the `CardTimer`
 */
const CardHeader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        'relative flex items-center justify-center border-0 border-b border-solid border-neutral-150',
        className,
      )}
      {...props}
    />
  ),
);

CardHeader.displayName = 'CardHeader';

/* -------------------------------------------------------------------------------------------------
 * CardAsset
 * -----------------------------------------------------------------------------------------------*/

interface CardAssetProps extends React.ComponentPropsWithoutRef<'img'> {
  /**
   * The height of the asset area: 8.8rem for `sm`, 16.4rem for `default`
   * @default 'default'
   */
  size?: 'default' | 'sm';
  /**
   * Replaces the image, such as a video or a file icon
   */
  children?: React.ReactNode;
}

/**
 * The image of the Card, on a checkerboard so a transparent image stays visible
 */
const CardAsset = React.forwardRef<HTMLDivElement, CardAssetProps>(
  ({ size = 'default', children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-asset"
      data-size={size}
      className={cn(
        'flex h-41 w-full justify-center rounded-t-md data-[size=sm]:h-22',
        'bg-[repeating-conic-gradient(var(--neutral-100)_0%_25%,transparent_0%_50%)] bg-size-[20px_20px] bg-center',
        className,
      )}
    >
      {children ?? <img aria-hidden className="m-0 max-h-full max-w-full object-contain p-0" {...props} />}
    </div>
  ),
);

CardAsset.displayName = 'CardAsset';

/* -------------------------------------------------------------------------------------------------
 * CardAction
 * -----------------------------------------------------------------------------------------------*/

interface CardActionProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The corner of the header the action sits in
   */
  position: 'start' | 'end';
}

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(({ position, className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-action"
    data-position={position}
    className={cn(
      'absolute top-3 z-1 flex flex-row items-center gap-2 data-[position=end]:right-3 data-[position=start]:left-3',
      className,
    )}
    {...props}
  />
));

CardAction.displayName = 'CardAction';

/* -------------------------------------------------------------------------------------------------
 * CardCheckbox
 * -----------------------------------------------------------------------------------------------*/

type CardCheckboxProps = React.ComponentPropsWithoutRef<typeof Checkbox>;

/**
 * A Checkbox in the top start corner. The `CardTitle` names it, so it needs no label of its own
 */
const CardCheckbox = React.forwardRef<HTMLElement, CardCheckboxProps>((props, ref) => {
  const { id } = useCard();

  return (
    <CardAction position="start">
      <Checkbox aria-labelledby={`${id}-title`} {...props} ref={ref} />
    </CardAction>
  );
});

CardCheckbox.displayName = 'CardCheckbox';

/* -------------------------------------------------------------------------------------------------
 * CardTimer
 * -----------------------------------------------------------------------------------------------*/

/**
 * The duration of a video or audio asset, in the bottom end corner of the header
 */
const CardTimer = React.forwardRef<HTMLTimeElement, React.ComponentPropsWithoutRef<'time'>>(
  ({ className, ...props }, ref) => (
    <time
      ref={ref}
      data-slot="card-timer"
      className={cn('absolute right-1 bottom-1 rounded-md bg-neutral-800 p-1 text-xs text-neutral-0', className)}
      {...props}
    />
  ),
);

CardTimer.displayName = 'CardTimer';

/* -------------------------------------------------------------------------------------------------
 * CardBody / CardContent
 * -----------------------------------------------------------------------------------------------*/

/**
 * The bottom of the Card: a row of the `CardContent` and the `CardBadge`
 */
const CardBody = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-body" className={cn('flex items-start px-3 py-2', className)} {...props} />
  ),
);

CardBody.displayName = 'CardBody';

const CardContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-content" className={cn('break-all', className)} {...props} />
  ),
);

CardContent.displayName = 'CardContent';

/* -------------------------------------------------------------------------------------------------
 * CardTitle / CardSubtitle
 * -----------------------------------------------------------------------------------------------*/

/**
 * The name of the Card. Its id is `<card id>-title`, which the Card and the `CardCheckbox` point to
 */
const CardTitle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    const { id } = useCard();

    return (
      <div
        ref={ref}
        id={`${id}-title`}
        data-slot="card-title"
        className={cn('text-xs font-semibold text-neutral-800', className)}
        {...props}
      />
    );
  },
);

CardTitle.displayName = 'CardTitle';

const CardSubtitle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-subtitle" className={cn('text-xs text-neutral-600', className)} {...props} />
  ),
);

CardSubtitle.displayName = 'CardSubtitle';

/* -------------------------------------------------------------------------------------------------
 * CardBadge
 * -----------------------------------------------------------------------------------------------*/

type CardBadgeProps = BadgeProps;

/**
 * A Badge at the end of the `CardBody`, such as the file type
 */
const CardBadge = React.forwardRef<HTMLSpanElement, CardBadgeProps>(({ className, ...props }, ref) => (
  <div data-slot="card-badge" className="ml-auto shrink-0">
    <Badge ref={ref} className={cn('ml-1', className)} {...props} />
  </div>
));

CardBadge.displayName = 'CardBadge';

export {
  Card,
  CardHeader,
  CardAsset,
  CardAction,
  CardCheckbox,
  CardTimer,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardBadge,
  useCard,
};
export type { CardProps, CardAssetProps, CardActionProps, CardCheckboxProps, CardBadgeProps };
