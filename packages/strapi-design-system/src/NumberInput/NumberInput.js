import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CarretDown from '@strapi/icons/CarretDown';
import styled from 'styled-components';
import { sizes } from '../themes/sizes';
import { NumberFormatter, NumberParser } from '@internationalized/number';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput } from '../Field';
import { Stack } from '../Stack';
import { Flex } from '../Flex';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { useId } from '../helpers/useId';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { getDefaultLocale } from '../helpers/getDefaultLocale';

const ArrowButton = styled.button`
  display: flex;
  height: 1rem;
  align-items: ${({ reverse }) => (reverse ? 'flex-end' : 'flex-start')};
  transform: translateY(${({ reverse }) => (reverse ? `-2px` : `2px`)});

  svg {
    display: block;
    height: ${4 / 16}rem;
    transform: ${({ reverse }) => (reverse ? 'rotateX(180deg)' : undefined)};
  }
`;

const INITIAL_VALUE = '';

export const NumberInput = React.forwardRef(
  ({ size, startAction, name, hint, error, label, labelAction, id, onValueChange, value, step, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value || INITIAL_VALUE);
    const generatedId = useId('numberinput', id);
    const numberParserRef = useRef(new NumberParser(getDefaultLocale()));
    const numberFormaterRef = useRef(new NumberFormatter(getDefaultLocale()));

    if (!label && !props['aria-label']) {
      throw new Error('The NumberInput component needs a "label" or an "aria-label" props');
    }

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(numberFormaterRef.current.format(value));
      }
    }, [value]);

    const handleChange = (e) => {
      if (numberParserRef.current.isValidPartialNumber(e.target.value)) {
        setInputValue(e.target.value);
      }
    };

    const increment = () => {
      const parsedValue = numberParserRef.current.parse(inputValue);

      if (isNaN(parsedValue)) {
        setInputValue(numberFormaterRef.current.format(step));
      } else {
        setInputValue(numberFormaterRef.current.format(parsedValue + step));
      }
    };

    const decrement = () => {
      const parsedValue = numberParserRef.current.parse(inputValue);

      if (isNaN(parsedValue)) {
        setInputValue(numberFormaterRef.current.format(-step));
      } else {
        setInputValue(numberFormaterRef.current.format(parsedValue - step));
      }
    };

    const handleKeyDown = (e) => {
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

    const handleBlur = () => {
      const parsedValue = numberParserRef.current.parse(inputValue);

      if (isNaN(parsedValue)) {
        onValueChange(undefined);
        setInputValue(INITIAL_VALUE);
      } else {
        onValueChange(numberParserRef.current.parse(inputValue));
      }
    };

    return (
      <Field name={name} hint={hint} error={error} id={generatedId}>
        <Stack size={1}>
          {label && (
            <Flex cols="auto auto 1fr" gap={1}>
              <FieldLabel>{label}</FieldLabel>
              {labelAction && <Box paddingLeft={1}>{labelAction}</Box>}
            </Flex>
          )}
          <FieldInput
            ref={ref}
            startAction={startAction}
            type="text"
            inputmode="decimal"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            value={inputValue || ''}
            size={size}
            endAction={
              <>
                <ArrowButton aria-hidden reverse onClick={increment} tabIndex={-1} type="button">
                  <Icon as={CarretDown} color="neutral500" />
                </ArrowButton>
                <ArrowButton aria-hidden onClick={decrement} tabIndex={-1} type="button">
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
  label: undefined,
  labelAction: undefined,
  error: undefined,
  hint: undefined,
  id: undefined,
  startAction: undefined,
  value: undefined,
  size: 'M',
  step: 1,
};

NumberInput.propTypes = {
  'aria-label': PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  startAction: PropTypes.element,
  step: PropTypes.number,
  value: PropTypes.number,
};
