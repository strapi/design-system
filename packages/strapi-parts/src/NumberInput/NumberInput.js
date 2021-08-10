import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import FilterDropdownIcon from '@strapi/icons/FilterDropdownIcon';
import styled from 'styled-components';
import { NumberFormatter, NumberParser } from '@internationalized/number';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput } from '../Field';
import { Stack } from '../Stack';
import { Row } from '../Row';
import { Box } from '../Box';
import { useId } from '../helpers/useId';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { getDefaultLocale } from '../helpers/getDefaultLocale';

const ArrowButton = styled.button`
  display: flex;
  height: 1rem;
  align-items: ${({ reverse }) => (reverse ? 'flex-end' : 'flex-start')};
  margin-bottom: ${({ reverse, theme }) => (reverse ? theme.spaces[1] : 0)};

  svg {
    display: block;
    height: ${4 / 16}rem;
    transform: ${({ reverse }) => (reverse ? 'rotateX(180deg)' : undefined)};
  }
`;

const INITIAL_VALUE = '';

export const NumberInput = React.forwardRef(
  ({ startAction, name, hint, error, label, labelAction, id, onValueChange, value, step, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value || INITIAL_VALUE);
    const generatedId = useId('numberinput', id);
    const numberParserRef = useRef(new NumberParser(getDefaultLocale()));
    const numberFormaterRef = useRef(new NumberFormatter(getDefaultLocale()));

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
      <div>
        <Field name={name} hint={hint} error={error} id={generatedId}>
          <Stack size={1}>
            <Row cols="auto auto 1fr" gap={1}>
              <FieldLabel>{label}</FieldLabel>
              {labelAction && <Box paddingLeft={1}>{labelAction}</Box>}
            </Row>
            <FieldInput
              ref={ref}
              startAction={startAction}
              type="text"
              inputmode="decimal"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              value={inputValue || ''}
              endAction={
                <>
                  <ArrowButton aria-hidden reverse onClick={increment} tabIndex={-1}>
                    <FilterDropdownIcon />
                  </ArrowButton>
                  <ArrowButton aria-hidden onClick={decrement} tabIndex={-1}>
                    <FilterDropdownIcon />
                  </ArrowButton>
                </>
              }
              {...props}
            />
            <FieldHint />
            <FieldError />
          </Stack>
        </Field>
      </div>
    );
  },
);

NumberInput.displayName = 'NumberInput';

NumberInput.defaultProps = {
  labelAction: undefined,
  error: undefined,
  hint: undefined,
  id: undefined,
  startAction: undefined,
  value: undefined,
  step: 1,
};

NumberInput.propTypes = {
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  startAction: PropTypes.element,
  step: PropTypes.number,
  value: PropTypes.number,
};
