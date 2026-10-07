'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from '@strapi/icons';

/* -------------------------------------------------------------------------------------------------
 * Carousel
 * -----------------------------------------------------------------------------------------------*/

interface CarouselProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Elements laid over the slides, usually a `CarouselActions`.
   */
  actions?: React.ReactNode;
  /**
   * The `CarouselSlide`s. The carousel tells each one whether it is the selected one.
   */
  children: React.ReactNode;
  /**
   * The accessible name of the carousel.
   */
  label: string;
  /**
   * The accessible name of the next button.
   */
  nextLabel: string;
  onNext?: () => void;
  onPrevious?: () => void;
  /**
   * The accessible name of the previous button.
   */
  previousLabel: string;
  /**
   * A line under the slides, e.g. the file name. It is truncated and its full text shows on hover.
   */
  secondaryLabel?: string;
  /**
   * The index of the slide to show.
   */
  selectedSlide: number;
}

const carouselButton =
  'flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-neutral-600 hover:text-neutral-900 focus:text-neutral-900 [&_svg]:size-4';

/**
 * A carousel of slides with previous and next buttons. The left and right arrow keys move to the previous and
 * the next slide.
 */
const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      actions,
      children,
      className,
      label,
      nextLabel,
      onKeyDown,
      onNext,
      onPrevious,
      previousLabel,
      secondaryLabel,
      selectedSlide,
      ...props
    },
    ref,
  ) => {
    const prevActionRef = React.useRef<HTMLButtonElement>(null);
    const nextActionRef = React.useRef<HTMLButtonElement>(null);

    const slides = React.Children.map(children, (node, index) =>
      React.isValidElement<CarouselSlideProps>(node)
        ? React.cloneElement(node, { selected: index === selectedSlide })
        : node,
    );

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      onKeyDown?.(event);

      switch (event.key) {
        case 'ArrowRight': {
          event.preventDefault();
          nextActionRef.current?.focus();
          onNext?.();
          break;
        }

        case 'ArrowLeft': {
          event.preventDefault();
          prevActionRef.current?.focus();
          onPrevious?.();
          break;
        }

        default:
          break;
      }
    };

    return (
      <div ref={ref} data-slot="carousel" className={className} onKeyDown={handleKeyDown} {...props}>
        <div className="rounded-md border border-neutral-200 bg-neutral-100 p-2">
          <section
            aria-roledescription="carousel"
            aria-label={label}
            className="relative grid grid-cols-[auto_1fr_auto]"
          >
            {slides && slides.length > 1 ? (
              <>
                <button
                  ref={prevActionRef}
                  type="button"
                  onClick={onPrevious}
                  data-slot="carousel-previous"
                  className={cn(carouselButton, 'col-start-1 row-start-1')}
                >
                  <ChevronLeft aria-hidden focusable={false} />
                  <span className="sr-only">{previousLabel}</span>
                </button>
                <button
                  ref={nextActionRef}
                  type="button"
                  onClick={onNext}
                  data-slot="carousel-next"
                  className={cn(carouselButton, 'col-start-3 row-start-1')}
                >
                  <ChevronRight aria-hidden focusable={false} />
                  <span className="sr-only">{nextLabel}</span>
                </button>
              </>
            ) : null}

            <div aria-live="polite" className="col-start-2 row-start-1 flex w-full items-center overflow-hidden px-2">
              {slides}
            </div>
            {actions}
          </section>

          {secondaryLabel ? (
            <div className="px-4 pt-2">
              <div className="flex items-center justify-center">
                <p title={secondaryLabel} className="m-0 block truncate text-xs text-neutral-600">
                  {secondaryLabel}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';

/* -------------------------------------------------------------------------------------------------
 * CarouselSlide
 * -----------------------------------------------------------------------------------------------*/

interface CarouselSlideProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The accessible name of the slide, e.g. "1 of 3".
   */
  label: string;
  /**
   * Set by the `Carousel`. Only the selected slide shows.
   */
  selected?: boolean;
}

const CarouselSlide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ className, label, selected = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="carousel-slide"
        data-selected={selected ? '' : undefined}
        role="group"
        aria-roledescription="slide"
        aria-label={label}
        hidden={!selected}
        className={cn('h-31 w-full items-center justify-center', selected ? 'flex' : 'hidden', className)}
        {...props}
      />
    );
  },
);

CarouselSlide.displayName = 'CarouselSlide';

/* -------------------------------------------------------------------------------------------------
 * CarouselImage
 * -----------------------------------------------------------------------------------------------*/

interface CarouselImageProps extends React.ComponentPropsWithoutRef<'img'> {
  alt: string;
  src: string;
}

/**
 * An image that fills the height of the slide. When it fails to load, its `alt` shows on hover.
 */
const CarouselImage = React.forwardRef<HTMLImageElement, CarouselImageProps>(
  ({ alt, className, onError, ...props }, ref) => {
    const [isError, setIsError] = React.useState(false);

    return (
      <img
        ref={ref}
        data-slot="carousel-image"
        alt={alt}
        title={isError ? alt : undefined}
        onError={(event) => {
          setIsError(true);
          onError?.(event);
        }}
        className={cn('block h-full max-w-full truncate', className)}
        {...props}
      />
    );
  },
);

CarouselImage.displayName = 'CarouselImage';

/* -------------------------------------------------------------------------------------------------
 * CarouselActions
 * -----------------------------------------------------------------------------------------------*/

interface CarouselActionsProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Lays the actions out in a row.
   * @default true
   */
  horizontal?: boolean;
}

/**
 * Buttons laid over the bottom of the slides.
 */
const CarouselActions = React.forwardRef<HTMLDivElement, CarouselActionsProps>(
  ({ className, horizontal = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="carousel-actions"
        className={cn(
          'absolute bottom-1 flex w-full justify-center gap-1',
          horizontal ? 'flex-row items-center' : 'flex-col items-stretch',
          className,
        )}
        {...props}
      />
    );
  },
);

CarouselActions.displayName = 'CarouselActions';

/* -------------------------------------------------------------------------------------------------
 * CarouselInput
 * -----------------------------------------------------------------------------------------------*/

interface CarouselInputProps extends CarouselProps {
  /**
   * The error message. It replaces the hint.
   */
  error?: string | boolean;
  /**
   * A help text under the carousel.
   */
  hint?: React.ReactNode;
  /**
   * An element after the label, e.g. a tooltip icon.
   */
  labelAction?: React.ReactNode;
  /**
   * Adds a red asterisk to the label.
   * @default false
   */
  required?: boolean;
}

/**
 * A `Carousel` in a form field: a label, a hint and an error, like the other inputs.
 */
const CarouselInput = React.forwardRef<HTMLDivElement, CarouselInputProps>(
  ({ className, error, hint, id, label, labelAction, required = false, ...props }, ref) => {
    const generatedId = React.useId();
    const fieldId = id ?? generatedId;
    const errorMessage = typeof error === 'string' && error ? error : undefined;
    const showHint = Boolean(hint) && !error;

    return (
      <div data-slot="carousel-input" className={cn('flex flex-col items-stretch gap-1', className)}>
        {label ? (
          <div className="flex items-center">
            <label
              id={`${fieldId}-label`}
              htmlFor={fieldId}
              className="block truncate text-xs font-semibold text-neutral-800"
            >
              {label}
              {required ? (
                <span aria-hidden className="leading-none text-danger-600">
                  *
                </span>
              ) : null}
            </label>
            {labelAction ? <div className="ml-1 flex leading-0 text-neutral-500">{labelAction}</div> : null}
          </div>
        ) : null}
        <Carousel
          ref={ref}
          id={fieldId}
          label={label}
          aria-describedby={errorMessage ? `${fieldId}-error` : showHint ? `${fieldId}-hint` : undefined}
          {...props}
        />
        {showHint ? (
          <p id={`${fieldId}-hint`} className="m-0 text-xs text-neutral-600">
            {hint}
          </p>
        ) : null}
        {errorMessage ? (
          <p id={`${fieldId}-error`} data-strapi-field-error className="m-0 text-xs text-danger-600">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  },
);

CarouselInput.displayName = 'CarouselInput';

export { Carousel, CarouselSlide, CarouselImage, CarouselActions, CarouselInput };
export type { CarouselProps, CarouselSlideProps, CarouselImageProps, CarouselActionsProps, CarouselInputProps };
