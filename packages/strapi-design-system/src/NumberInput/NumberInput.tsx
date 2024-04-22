/* eslint-disable no-restricted-globals */
import * as React from 'react';

import { NumberFormatter, NumberParser } from '@internationalized/number';
import { CaretDown } from '@strapi/icons';
import styled from 'styled-components';

import { useDesignSystem } from '../DesignSystemProvider';
import { FieldInput, FieldInputProps, type FieldProps } from '../Field';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { useControllableState } from '../hooks/useControllableState';

const ArrowButton = styled.button<{ reverse?: boolean }>`
  display: flex;
  height: 1rem;
  align-items: ${({ reverse }) => (reverse ? 'flex-end' : 'flex-start')};
  transform: translateY(${({ reverse }) => (reverse ? `-2px` : `2px`)});
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  svg {
    display: block;
    height: 0.4rem;
    transform: ${({ reverse }) => (reverse ? 'rotateX(180deg)' : undefined)};
  }
`;

export interface NumberInputProps
  extends Omit<FieldInputProps, 'id' | 'name' | 'onChange' | 'value'>,
    Pick<FieldProps, 'id' | 'name'> {
  onValueChange: (value: number | undefined) => void;
  locale?: string;
  value?: number;
  step?: number;
}

const INITIAL_VALUE = '';

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { id, size = 'M', startAction, locale: defaultLocale, onValueChange, value, step = 1, disabled = false, ...props },
    ref,
  ) => {
    const designContext = useDesignSystem('NumberInput');
    const locale = defaultLocale || designContext.locale;
    const numberParserRef = React.useRef(new NumberParser(locale, { style: 'decimal' }));
    const numberFormaterRef = React.useRef(new NumberFormatter(locale, { maximumFractionDigits: 20 }));

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
        return isNaN(Number(stringifiedValue)) || (stringifiedValue !== currentInputValue && currentInputValue !== '')
          ? currentInputValue
          : numberFormaterRef.current.format(Number(value));
      },
      defaultProp: INITIAL_VALUE,
      onChange(value) {
        /**
         * always return a
         */
        const parsedValue = numberParserRef.current.parse(value ?? '');
        onValueChange(isNaN(parsedValue) ? undefined : parsedValue);
      },
    });

    /**
     * Value will either be a number or a string,
     * if the former then it'll be converted to a string.
     */
    const formatNumberAndSetInput = (value: string | number | undefined) => {
      setInputValue(String(value));
    };

    const handelInputChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
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
      <FieldInput
        ref={ref}
        startAction={startAction}
        disabled={disabled}
        type="text"
        inputMode="decimal"
        onChange={handelInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        value={inputValue}
        size={size}
        id={id}
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
              <CaretDown fill="neutral500" />
            </ArrowButton>
            <ArrowButton
              disabled={disabled}
              aria-hidden
              onClick={decrement}
              tabIndex={-1}
              type="button"
              data-testid="ArrowDown"
            >
              <CaretDown fill="neutral500" />
            </ArrowButton>
          </>
        }
        {...props}
      />
    );
  },
);
