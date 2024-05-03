import * as React from 'react';

import { useId } from '../../hooks/useId';
import { Field } from '../Field';
import { Flex } from '../Flex';

import { Carousel, CarouselElement, CarouselProps } from './Carousel';

export interface CarouselInputProps extends CarouselProps, Pick<Field.Props, 'hint' | 'error' | 'required'> {
  actions?: React.ReactNode;
  children: React.ReactNode;
  labelAction?: Field.LabelProps['action'];
}

export const CarouselInput = React.forwardRef<CarouselElement, CarouselInputProps>(
  (
    {
      actions,
      children,
      error,
      hint,
      label,
      labelAction,
      nextLabel,
      onNext,
      onPrevious,
      previousLabel,
      required,
      secondaryLabel,
      selectedSlide,
      id,
      ...props
    },
    forwardedRef,
  ) => {
    const generatedId = useId(id);

    return (
      <Field.Root hint={hint} error={error} id={generatedId} required={required}>
        <Flex direction="column" alignItems="stretch" gap={1}>
          {label && <Field.Label action={labelAction}>{label}</Field.Label>}
          <Carousel
            ref={forwardedRef}
            actions={actions}
            label={label}
            nextLabel={nextLabel}
            onNext={onNext}
            onPrevious={onPrevious}
            previousLabel={previousLabel}
            secondaryLabel={secondaryLabel}
            selectedSlide={selectedSlide}
            id={generatedId}
            {...props}
          >
            {children}
          </Carousel>
          <Field.Hint />
          <Field.Error />
        </Flex>
      </Field.Root>
    );
  },
);
