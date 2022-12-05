/* eslint-disable no-restricted-globals */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CarretDown from '@strapi/icons/CarretDown';
import { NumberFormatter, NumberParser } from '@internationalized/number';

import { Field, FieldLabel, FieldHint, FieldError, FieldInput } from '../Field';
import { Stack } from '../Stack';
import { Icon } from '../Icon';

import { sizes } from '../themes/sizes';

import { useId } from '../helpers/useId';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { getDefaultLocale } from '../helpers/getDefaultLocale';

import { useControllableState } from '../hooks/useControllableState';

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
      locale: defaultLocale,
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
    const generatedId = useId('numberinput', id);

    const locale = defaultLocale || getDefaultLocale();
    const numberParserRef = useRef(new NumberParser(locale, { style: 'decimal' }));
    const numberFormaterRef = useRef(new NumberFormatter(locale, { maximumFractionDigits: 20 }));

    const [inputValue, setInputValue] = useControllableState({
      prop(currentInputValue) {
        const stringifiedValue = String(value);

        /**
         * This basically accounts for when someone wants to:
         * 1. clear the input
         * 2. use a minus value
         * 3. use a decimal value
         *
         * And always give it a string
         */
        return isNaN(stringifiedValue) || (stringifiedValue !== currentInputValue && currentInputValue !== '')
          ? currentInputValue
          : stringifiedValue;
      },
      defaultProp: INITIAL_VALUE,
      onChange(value) {
        /**
         * always return a
         */
        const parsedValue = numberParserRef.current.parse(value);
        onValueChange(isNaN(parsedValue) ? undefined : parsedValue);
      },
    });

    /**
     * Value will either be a number or a string,
     * if the former then it'll be converted to a string.
     */
    const formatNumberAndSetInput = (value) => {
      setInputValue(String(value));
    };

    /**
     * @type {React.ChangeEventHandler<HTMLInputElement>}
     */
    const handelInputChange = ({ target: { value } }) => {
      if (numberParserRef.current.isValidPartialNumber(value)) {
        formatNumberAndSetInput(value);
      }
    };

    const increment = () => {
      if (!inputValue) {
        formatNumberAndSetInput(step);

        return;
      }

      const parsedValue = numberParserRef.current.parse(inputValue);

      const newValue = isNaN(parsedValue) ? step : parsedValue + step;

      formatNumberAndSetInput(numberFormaterRef.current.format(newValue));
    };

    const decrement = () => {
      if (!inputValue) {
        formatNumberAndSetInput(-step);

        return;
      }

      const parsedValue = numberParserRef.current.parse(inputValue);

      const newValue = isNaN(parsedValue) ? -step : parsedValue - step;

      formatNumberAndSetInput(numberFormaterRef.current.format(newValue));
    };

    const handleKeyDown = (e) => {
      if (disabled) return;

      switch (e.key) {
        case KeyboardKeys.DOWN: {
          e.preventDefault();
          decrement();
          break;
        }

        case KeyboardKeys.UP: {
          e.preventDefault();
          increment();
          break;
        }

        default:
          break;
      }
    };

    /**
     * Only format on blur as vanity because otherwise it breaks when a user
     * wants to include a minus or decimal value.
     */
    const handleBlur = () => {
      if (inputValue) {
        const parsedValue = numberParserRef.current.parse(inputValue);
        const formattedValue = isNaN(parsedValue) ? '' : numberFormaterRef.current.format(parsedValue);
        formatNumberAndSetInput(formattedValue);
      }
    };

    return (
      <Field name={name} hint={hint} error={error} id={generatedId} required={required}>
        <Stack spacing={1}>
          {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}
          <FieldInput
            ref={ref}
            startAction={startAction}
            disabled={disabled}
            type="text"
            inputmode="decimal"
            onChange={handelInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            value={inputValue}
            size={size}
            endAction={
              <>
                <ArrowButton
                  disabled={disabled}
                  aria-hidden
                  reverse
                  onClick={increment}
                  tabIndex={-1}
                  type="button"
                  data-testid="ArrowUp"
                >
                  <Icon as={CarretDown} color="neutral500" />
                </ArrowButton>
                <ArrowButton
                  disabled={disabled}
                  aria-hidden
                  onClick={decrement}
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
  locale: undefined,
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
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  locale: PropTypes.string,
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  startAction: PropTypes.element,
  step: PropTypes.number,
  value: PropTypes.number,
};
