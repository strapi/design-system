import * as React from 'react';

import { cn } from '@/lib/utils';
import { NumberFormatter, NumberParser } from '@internationalized/number';
import { CaretDown } from '@strapi/icons';

import { Input, type InputProps } from './input';
import { useLocale } from './locale-provider';

/**
 * The number of decimals of the step, so `0.1 + 0.2` rounds to `0.3`.
 */
const getDecimalPlaces = (step: number): number => {
  const [, decimals] = step.toString().split('.');

  return decimals ? decimals.length : 0;
};

interface NumberInputProps extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue' | 'type' | 'endAction'> {
  /**
   * Called with the parsed number, or `undefined` when the text is empty or not a number yet (e.g. `-`).
   */
  onValueChange?: (value: number | undefined) => void;
  /**
   * The locale that parses and formats the number.
   * @default navigator.language
   */
  locale?: string;
  value?: number;
  /**
   * The amount that the arrow buttons and the arrow keys add or remove.
   * @default 1
   */
  step?: number;
}

/**
 * A text input for a number, formatted for the locale. The up and down arrows (buttons or keys) change the
 * value by `step`.
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ locale: localeProp, onValueChange, value, step = 1, disabled = false, onKeyDown, onBlur, ...props }, ref) => {
    const locale = useLocale(localeProp);
    const parser = React.useMemo(() => new NumberParser(locale, { style: 'decimal' }), [locale]);
    const formatter = React.useMemo(() => new NumberFormatter(locale, { maximumFractionDigits: 20 }), [locale]);

    const parse = (text: string): number | undefined => {
      const parsed = parser.parse(text);

      return Number.isNaN(parsed) ? undefined : parsed;
    };

    const [inputValue, setInputValue] = React.useState(() =>
      value === undefined || Number.isNaN(value) ? '' : formatter.format(value),
    );

    /**
     * Follow a `value` that the parent changed. The text stays as typed while it parses to the same number, so a
     * trailing decimal separator or a lone minus sign survives.
     */
    const [previousValue, setPreviousValue] = React.useState(value);

    if (!Object.is(previousValue, value)) {
      setPreviousValue(value);

      const current = parse(inputValue);

      if (value === undefined || Number.isNaN(value)) {
        if (current !== undefined) {
          setInputValue('');
        }
      } else if (current !== value) {
        setInputValue(formatter.format(value));
      }
    }

    const updateValue = (nextInputValue: string) => {
      if (nextInputValue === inputValue) {
        return;
      }

      setInputValue(nextInputValue);
      onValueChange?.(parse(nextInputValue));
    };

    const decimalPlaces = getDecimalPlaces(step);

    const stepBy = (direction: 1 | -1) => {
      const current = inputValue ? parse(inputValue) : undefined;
      const next = current === undefined ? direction * step : current + direction * step;

      updateValue(formatter.format(parseFloat(next.toFixed(decimalPlaces))));
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      if (parser.isValidPartialNumber(event.target.value)) {
        updateValue(event.target.value);
      }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      onKeyDown?.(event);

      if (disabled || event.defaultPrevented) {
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        stepBy(1);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        stepBy(-1);
      }
    };

    // Format on blur only, so a user can type a minus sign or a decimal separator
    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      onBlur?.(event);

      if (inputValue) {
        const parsed = parse(inputValue);

        updateValue(parsed === undefined ? '' : formatter.format(parsed));
      }
    };

    const arrowClassName =
      'flex h-3 cursor-pointer items-center justify-center border-none bg-transparent p-0 text-neutral-500 disabled:cursor-not-allowed [&_svg]:w-3';

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="decimal"
        disabled={disabled}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        endAction={
          <div data-slot="number-input-arrows" className="flex flex-col">
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              disabled={disabled}
              data-testid="ArrowUp"
              onClick={() => stepBy(1)}
              className={cn(arrowClassName, '-translate-y-0.5 [&_svg]:-scale-y-100')}
            >
              <CaretDown />
            </button>
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              disabled={disabled}
              data-testid="ArrowDown"
              onClick={() => stepBy(-1)}
              className={cn(arrowClassName, 'translate-y-0.5')}
            >
              <CaretDown />
            </button>
          </div>
        }
        {...props}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };
export type { NumberInputProps };
