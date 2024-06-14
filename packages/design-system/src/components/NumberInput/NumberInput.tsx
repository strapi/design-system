/* eslint-disable no-restricted-globals */
import * as React from 'react';

import { NumberFormatter, NumberParser } from '@internationalized/number';
import { CaretDown } from '@strapi/icons';
import { useCallbackRef } from '@strapi/ui-primitives';
import { styled } from 'styled-components';

import { KeyboardKeys } from '../../helpers/keyboardKeys';
import { _internaluseUncontrolledState } from '../../hooks/useControllableState';
import { useDesignSystem } from '../../utilities/DesignSystemProvider';
import { Field } from '../Field';
import { Flex } from '../Flex';

interface NumberInputProps extends Omit<Field.InputProps, 'onChange' | 'value'> {
  onValueChange: (value: number | undefined) => void;
  locale?: string;
  value?: number;
  step?: number;
}

const INITIAL_VALUE = '';

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ startAction, locale: defaultLocale, onValueChange, value, step = 1, disabled = false, ...props }, ref) => {
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
      <Field.Input
        ref={ref}
        startAction={startAction}
        disabled={disabled}
        type="text"
        inputMode="decimal"
        onChange={handelInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        value={inputValue}
        endAction={
          <Flex direction="column">
            <ArrowButton
              disabled={disabled}
              aria-hidden
              $reverse
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
          </Flex>
        }
        {...props}
      />
    );
  },
);

const ArrowButton = styled.button<{ $reverse?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(${({ $reverse }) => ($reverse ? `-2px` : `2px`)});
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  height: 1.1rem;

  svg {
    width: 1.2rem;
    transform: ${({ $reverse }) => ($reverse ? 'rotateX(180deg)' : undefined)};
  }
`;

interface UseControllableStateParams<TProp> {
  prop?: TProp | undefined | ((state?: TProp | undefined) => TProp | undefined);
  defaultProp?: TProp | undefined;
  onChange?: (state?: TProp) => void;
}

type SetStateFn<TState> = (prevState: TState) => TState;

function useControllableState<TProp>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<TProp>): [
  TProp | undefined,
  (nextState: TProp | undefined | SetStateFn<TProp | undefined>) => void,
] {
  const [uncontrolledProp, setUncontrolledProp] = _internaluseUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const propValue: TProp | undefined = prop instanceof Function ? prop(uncontrolledProp) : prop;
  const value = isControlled ? propValue : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);

  const setValue = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue;
        const value = typeof nextValue === 'function' ? setter(propValue) : nextValue;

        if (value !== propValue) {
          handleChange(value);
          setUncontrolledProp(nextValue);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, propValue, setUncontrolledProp, handleChange],
  );

  return [value, setValue];
}

export { NumberInput };
export type { NumberInputProps };
