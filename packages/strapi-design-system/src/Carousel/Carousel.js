import React from 'react';
import PropTypes from 'prop-types';
import { CarouselInput } from './CarouselInput';
import { Field, FieldLabel, FieldHint, FieldError } from '../Field';
import { useId } from '../helpers/useId';

export const Carousel = ({
  actions,
  children,
  error,
  hint,
  label,
  nextLabel,
  onNext,
  onPrevious,
  previousLabel,
  required,
  secondaryLabel,
  selectedSlide,
  id,
  ...props
}) => {
  const generatedId = useId('carouselinput', id);

  return (
    <Field hint={hint} error={error} id={generatedId}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <CarouselInput
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
      </CarouselInput>
      <FieldHint />
      <FieldError />
    </Field>
  );
};

Carousel.defaultProps = {
  actions: undefined,
  error: undefined,
  hint: undefined,
  id: undefined,
  required: false,
  secondaryLabel: undefined,
};

Carousel.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  previousLabel: PropTypes.string.isRequired,
  required: PropTypes.bool,
  secondaryLabel: PropTypes.string,
  selectedSlide: PropTypes.number.isRequired,
};
