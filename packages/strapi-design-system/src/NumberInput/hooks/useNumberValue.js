import { useRef, useEffect, useState } from 'react';
import { NumberFormatter, NumberParser } from '@internationalized/number';
import { KeyboardKeys } from '../../helpers/keyboardKeys';
import { getDefaultLocale } from '../../helpers/getDefaultLocale';

const INITIAL_VALUE = '';

export const useNumberValue = (value, step, onValueChange) => {
  // inputValue should ALWAYS be a string. value should ALWAYS stay a number
  const [inputValue, setInputValue] = useState();
  const numberParserRef = useRef(new NumberParser(getDefaultLocale()));
  const numberFormaterRef = useRef(new NumberFormatter(getDefaultLocale(), { maximumSignificantDigits: 21 }));

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
    if (inputValue === undefined) {
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

  const handleFocus = () => {
    if (value !== undefined) {
      setInputValue(String(numberParserRef.current.parse(inputValue)));
    }

    if (value !== undefined) {
      setInputValue(String(numberParserRef.current.parse(inputValue) ?? INITIAL_VALUE));
    }
  };

  const handleBlur = () => {
    if (value === undefined || value === null) {
      setInputValue(undefined);
    } else {
      setInputValue(numberFormaterRef.current.format(value));
    }
  };

  return { inputValue, increment, decrement, handlers: { handleKeyDown, handleFocus, handleBlur, handleChange } };
};
