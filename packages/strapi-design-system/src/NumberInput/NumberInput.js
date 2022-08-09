import React from 'react';
import PropTypes from 'prop-types';
import CarretDown from '@strapi/icons/CarretDown';
import styled from 'styled-components';
import { sizes } from '../themes/sizes';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput } from '../Field';
import { Stack } from '../Stack';
import { Icon } from '../Icon';
import { useId } from '../helpers/useId';
import { useNumberValue } from './hooks/useNumberValue';

const ArrowButton = styled.button`
  display: flex;
  height: 1rem;
  align-items: ${({ reverse }) => (reverse ? 'flex-end' : 'flex-start')};
  transform: translateY(${({ reverse }) => (reverse ? `-2px` : `2px`)});
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  svg {
    display: block;
    height: ${4 / 16}rem;
    transform: ${({ reverse }) => (reverse ? 'rotateX(180deg)' : undefined)};
  }
`;

export const NumberInput = React.forwardRef(
  (
    {
      size,
      startAction,
      name,
      hint,
      error,
      label,
      labelAction,
      id,
      onValueChange,
      value,
      step,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { inputValue, increment, decrement, handlers } = useNumberValue(value, step, onValueChange);
    const generatedId = useId('numberinput', id);

    return (
      <Field name={name} hint={hint} error={error} id={generatedId}>
        <Stack spacing={1}>
          {label && (
            <FieldLabel required={required} action={labelAction}>
              {label}
            </FieldLabel>
          )}
          <FieldInput
            ref={ref}
            startAction={startAction}
            disabled={disabled}
            type="text"
            inputmode="decimal"
            onChange={handlers.handleChange}
            onKeyDown={handlers.handleKeyDown}
            onBlur={handlers.handleBlur}
            onFocus={handlers.handleFocus}
            value={inputValue ?? ''}
            size={size}
            endAction={
              <>
                <ArrowButton
                  disabled={disabled}
                  aria-hidden
                  reverse
                  onClick={() => {
                    // increment needs an argument, so we can't remove the parenthesis
                    increment();
                  }}
                  tabIndex={-1}
                  type="button"
                  data-testid="ArrowUp"
                >
                  <Icon as={CarretDown} color="neutral500" />
                </ArrowButton>
                <ArrowButton
                  disabled={disabled}
                  aria-hidden
                  onClick={() => {
                    // decrement needs an argument, so we can't remove the parenthesis
                    decrement();
                  }}
                  tabIndex={-1}
                  type="button"
                  data-testid="ArrowDown"
                >
                  <Icon as={CarretDown} color="neutral500" />
                </ArrowButton>
              </>
            }
            {...props}
          />
          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
    );
  },
);

NumberInput.displayName = 'NumberInput';

NumberInput.defaultProps = {
  'aria-label': undefined,
  disabled: false,
  error: undefined,
  hint: undefined,
  id: undefined,
  label: undefined,
  labelAction: undefined,
  required: false,
  size: 'M',
  startAction: undefined,
  step: 1,
  value: undefined,
};

NumberInput.propTypes = {
  'aria-label': PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  startAction: PropTypes.element,
  step: PropTypes.number,
  value: PropTypes.number,
};
