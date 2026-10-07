'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { cva, type VariantProps } from 'class-variance-authority';

/* -------------------------------------------------------------------------------------------------
 * Track
 * -----------------------------------------------------------------------------------------------*/

const progressTrackVariants = cva(
  // `translate-z-0` fixes the overflow clipping in Safari, as the legacy ProgressBar does
  'relative block shrink-0 translate-z-0 overflow-hidden rounded-md bg-neutral-600',
  {
    variants: {
      size: {
        default: 'h-2 w-26',
        sm: 'h-1 w-20',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface ProgressTrackProps extends ProgressPrimitive.Track.Props, VariantProps<typeof progressTrackVariants> {}

const ProgressTrack = React.forwardRef<HTMLDivElement, ProgressTrackProps>(({ className, size, ...props }, ref) => {
  return (
    <ProgressPrimitive.Track
      ref={ref}
      data-slot="progress-track"
      className={cn(progressTrackVariants({ size }), className)}
      {...props}
    />
  );
});

ProgressTrack.displayName = 'ProgressTrack';

/* -------------------------------------------------------------------------------------------------
 * Indicator
 * -----------------------------------------------------------------------------------------------*/

const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressPrimitive.Indicator.Props>(
  ({ className, ...props }, ref) => {
    return (
      <ProgressPrimitive.Indicator
        ref={ref}
        data-slot="progress-indicator"
        className={cn(
          'block h-full rounded-md bg-neutral-0 motion-safe:transition-[width] motion-safe:duration-320 motion-safe:ease-in-out',
          className,
        )}
        {...props}
      />
    );
  },
);

ProgressIndicator.displayName = 'ProgressIndicator';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface ProgressProps
  extends Omit<ProgressPrimitive.Root.Props, 'value'>,
    VariantProps<typeof progressTrackVariants> {
  /**
   * The completion, between `min` (0) and `max` (100). `null` or `undefined` renders an indeterminate bar.
   */
  value?: number | null;
}

/**
 * The legacy `ProgressBar`: a `neutral600` track with a `neutral0` fill. Renders a `<div role="progressbar">`.
 * Put a `ProgressLabel` or a `ProgressValue` in `children` to show them next to the bar.
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, children, value = null, size, ...props }, ref) => {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={value}
        data-slot="progress"
        data-size={size ?? 'default'}
        className={cn('flex w-fit flex-wrap items-center gap-3', className)}
        {...props}
      >
        {children}
        <ProgressTrack size={size}>
          <ProgressIndicator />
        </ProgressTrack>
      </ProgressPrimitive.Root>
    );
  },
);

Progress.displayName = 'Progress';

/* -------------------------------------------------------------------------------------------------
 * Label & Value
 * -----------------------------------------------------------------------------------------------*/

const ProgressLabel = React.forwardRef<HTMLSpanElement, ProgressPrimitive.Label.Props>(
  ({ className, ...props }, ref) => {
    return (
      <ProgressPrimitive.Label
        ref={ref}
        data-slot="progress-label"
        className={cn('text-xs font-semibold text-neutral-800', className)}
        {...props}
      />
    );
  },
);

ProgressLabel.displayName = 'ProgressLabel';

const ProgressValue = React.forwardRef<HTMLSpanElement, ProgressPrimitive.Value.Props>(
  ({ className, ...props }, ref) => {
    return (
      <ProgressPrimitive.Value
        ref={ref}
        data-slot="progress-value"
        className={cn('text-xs text-neutral-600 tabular-nums', className)}
        {...props}
      />
    );
  },
);

ProgressValue.displayName = 'ProgressValue';

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue, progressTrackVariants };
export type { ProgressProps, ProgressTrackProps };
