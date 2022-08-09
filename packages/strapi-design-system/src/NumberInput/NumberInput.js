import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarretDown from '@strapi/icons/CarretDown';
import { NumberFormatter, NumberParser } from '@internationalized/number';
import styled from 'styled-components';
import { sizes } from '../themes/sizes';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput } from '../Field';
import { Stack } from '../Stack';
import { Icon } from '../Icon';
import { useId } from '../helpers/useId';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { getDefaultLocale } from '../helpers/getDefaultLocale';

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

const INITIAL_VALUE = '';

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
    const [inputValue, setInputValue] = useState();
    const numberParserRef = useRef(new NumberParser(getDefaultLocale()));
    const numberFormaterRef = useRef(new NumberFormatter(getDefaultLocale(), { maximumSignificantDigits: 21 }));
    const generatedId = useId('numberinput', id);

    const getValueWithDefaults = (originalValue) =>
      originalValue === undefined || !numberParserRef.current.isValidPartialNumber(String(originalValue))
        ? INITIAL_VALUE
        : String(originalValue);

    useEffect(() => {
      setInputValue(getValueWithDefaults(value));
    }, [value]);

    const handleChange = (e) => {
      const nextValue = e.target.value;

      if (numberParserRef.current.isValidPartialNumber(nextValue)) {
        const parsedValue = nextValue === '' ? undefined : numberParserRef.current.parse(nextValue);

        // checking NaN case when only typing a "-" (minus) sign inside the field
        if (parsedValue === undefined || isNaN(parsedValue)) {
          onValueChange(undefined);
        } else {
          onValueChange(parsedValue);
        }

        setInputValue(e.target.value);
      }
    };

    const changeValue = (fromKeyBoard, currentStep) => {
      if (inputValue === INITIAL_VALUE) {
        onValueChange(currentStep);
        setInputValue(String(currentStep));
        return;
      }

      if (isNaN(inputValue)) {
        const parsedValue = numberParserRef.current.parse(inputValue);

        // Probably in the minus case
        const safeValue = isNaN(parsedValue) ? 0 : parsedValue;

        const nextValue = safeValue + currentStep;
        const formattedValue = numberFormaterRef.current.format(nextValue);

        onValueChange(nextValue);
        setInputValue(fromKeyBoard ? String(nextValue) : formattedValue);

        return;
      }

      onValueChange(value + currentStep);
      setInputValue(String(value + currentStep));
    };

    const increment = (fromKeyBoard) => changeValue(fromKeyBoard, step);
    const decrement = (fromKeyBoard) => changeValue(fromKeyBoard, -step);

    const handleKeyDown = (e) => {
      if (disabled) return;

      switch (e.key) {
        case KeyboardKeys.DOWN: {
          e.preventDefault();
          decrement(true);
          break;
        }

        case KeyboardKeys.UP: {
          e.preventDefault();
          increment(true);
          break;
        }

        default:
          break;
      }
    };

    const handleBlur = () => {
      if (value !== undefined) {
        setInputValue(numberFormaterRef.current.format(value));
      }
    };

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
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
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
