import * as React from 'react';

import { Carousel, CarouselElement, CarouselProps } from './Carousel';
import { Field, FieldLabel, FieldHint, FieldError, FieldProps, FieldLabelProps } from '../Field';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';

export interface CarouselInputProps extends CarouselProps, Pick<FieldProps, 'hint' | 'error' | 'required'> {
  actions?: React.ReactNode;
  children: React.ReactNode;
  labelAction?: FieldLabelProps['action'];
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
      <Field hint={hint} error={error} id={generatedId} required={required}>
        <Flex direction="column" alignItems="stretch" gap={1}>
          {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}
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
          <FieldHint />
          <FieldError />
        </Flex>
      </Field>
    );
  },
);
