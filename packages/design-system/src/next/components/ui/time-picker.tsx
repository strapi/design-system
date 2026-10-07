import * as React from 'react';

import { cn } from '@/lib/utils';

import { Combobox, ComboboxOption, type ComboboxProps } from './combobox';
import { ClockIcon, useControllable } from './picker-internals';
import { useLocale } from './locale-provider';

const isNotAlphabeticalCharacter = (string: string) => /^[^a-zA-Z]*$/.test(string);

// Escapes anything that is special in a regular expression
const escapeForRegex = (string = '') => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* -------------------------------------------------------------------------------------------------
 * TimePicker
 * -----------------------------------------------------------------------------------------------*/

interface TimePickerProps
  extends Omit<
    ComboboxProps,
    | 'allowCustomValue'
    | 'autocomplete'
    | 'children'
    | 'defaultFilterValue'
    | 'defaultTextValue'
    | 'defaultValue'
    | 'filterValue'
    | 'onFilterValueChange'
    | 'onTextValueChange'
    | 'onValueChange'
    | 'placeholder'
    | 'startIcon'
    | 'textValue'
    | 'value'
  > {
  defaultValue?: string;
  /**
   * A BCP 47 locale, for the separator of the hours and the minutes
   * @default navigator.language
   */
  locale?: string;
  /** Called with the time as `HH:mm` (with the separator of the locale), or `undefined` when cleared */
  onValueChange?: (value: string | undefined) => void;
  /**
   * The minutes between two options
   * @default 15
   */
  step?: number;
  /** The time as `HH:mm`, with the separator of the locale */
  value?: string;
}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (
    { className, defaultValue, locale: localeProp, onBlur, onValueChange, step = 15, value: valueProp, ...props },
    forwardedRef,
  ) => {
    const locale = useLocale(localeProp);

    const [value, setValue] = useControllable<string | undefined>(valueProp, defaultValue, onValueChange);
    const [textValue, setTextValue] = React.useState<string>(value ?? '');

    const formatter = React.useMemo(
      () => new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }),
      [locale],
    );

    const separator = React.useMemo(
      () => formatter.formatToParts(new Date()).find((part) => part.type === 'literal')?.value ?? ':',
      [formatter],
    );

    const timeOptions = React.useMemo(() => {
      const stepCount = Math.max(1, Math.floor(60 / step));

      return [...Array(24).keys()].flatMap((hour) =>
        [...Array(stepCount).keys()].map((minuteStep) => formatter.format(new Date(0, 0, 0, hour, minuteStep * step))),
      );
    }, [formatter, step]);

    /*
     * The text is controlled here because a time that is not in the list is still a value. So the
     * text follows the value when it changes
     */
    React.useEffect(() => {
      const actualValue = valueProp ?? '';

      if (isNotAlphabeticalCharacter(actualValue)) {
        setTextValue(actualValue);
      }
    }, [valueProp]);

    const createNewTimeValue = (text: string) => {
      const [hours, minutes] = text.split(separator);

      if (!hours && !minutes) {
        return undefined;
      }

      const hoursAsNumber = Number(hours ?? '0');
      const minutesAsNumber = Number(minutes ?? '0');

      if (Number.isNaN(hoursAsNumber) || Number.isNaN(minutesAsNumber) || hoursAsNumber > 23 || minutesAsNumber > 59) {
        return undefined;
      }

      return formatter.format(new Date(0, 0, 0, hoursAsNumber, minutesAsNumber));
    };

    const handleTextValueChange = (text: string) => {
      // Letters cannot be typed
      if (!text || isNotAlphabeticalCharacter(text)) {
        setTextValue(text);
      }
    };

    const handleValueChange = (changedValue: string | undefined) => {
      setValue(changedValue === undefined ? undefined : createNewTimeValue(changedValue));
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      onBlur?.(event);

      // The time picker reads the typed time itself, so the combobox does not
      event.preventDefault();

      const newValue = createNewTimeValue(event.target.value);

      if (newValue) {
        setTextValue(newValue);
        setValue(newValue);
      } else {
        setTextValue(value ?? '');
      }
    };

    const pattern = `\\d{2}${escapeForRegex(separator)}\\d{2}`;

    return (
      <Combobox
        {...props}
        ref={forwardedRef}
        className={cn(props.onClear ? 'min-w-40' : 'min-w-33', className)}
        value={value ?? null}
        onValueChange={handleValueChange}
        textValue={textValue}
        onTextValueChange={handleTextValueChange}
        isPrintableCharacter={isNotAlphabeticalCharacter}
        allowCustomValue
        autocomplete="none"
        placeholder={`--${separator}--`}
        startIcon={<ClockIcon className="text-neutral-500" />}
        inputMode="numeric"
        pattern={pattern}
        onBlur={handleBlur}
      >
        {timeOptions.map((time) => (
          <ComboboxOption key={time} value={time}>
            {time}
          </ComboboxOption>
        ))}
      </Combobox>
    );
  },
);
TimePicker.displayName = 'TimePicker';

export { TimePicker };
export type { TimePickerProps };
