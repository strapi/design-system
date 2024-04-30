import * as React from 'react';

import { Clock } from '@strapi/icons';
import { styled } from 'styled-components';

import { useDesignSystem } from '../../DesignSystemProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { useDateFormatter } from '../../hooks/useDateFormatter';
import { Combobox, ComboboxProps, ComboboxInputElement, Option } from '../Combobox/Combobox';

const isNotAlphabeticalCharacter = (str: string): boolean => {
  return Boolean(str.match(/^[^a-zA-Z]*$/));
};

/* -------------------------------------------------------------------------------------------------
 * TimePicker
 * -----------------------------------------------------------------------------------------------*/

export interface TimePickerProps
  extends Omit<
    ComboboxProps,
    | 'children'
    | 'autocomplete'
    | 'startIcon'
    | 'placeholder'
    | 'allowCustomValue'
    | 'onFilterValueChange'
    | 'filterValue'
    | 'value'
    | 'defaultValue'
    | 'defaultTextValue'
    | 'textValue'
    | 'onTextValueChange'
  > {
  /**
   * @default 15
   */
  step?: number;
  value?: string;
  defaultValue?: string;
}

export const TimePicker = React.forwardRef<ComboboxInputElement, TimePickerProps>(
  ({ step = 15, value: valueProp, defaultValue, onChange, ...restProps }, forwardedRef) => {
    const context = useDesignSystem('TimePicker');

    const [textValue, setTextValue] = React.useState<string | undefined>('');

    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange,
    });

    const formatter = useDateFormatter(context.locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const separator = React.useMemo(() => {
      const parts = formatter.formatToParts(new Date());
      const { value: separator } = parts.find((part) => part.type === 'literal')!;

      return separator;
    }, [formatter]);

    const timeOptions = React.useMemo(() => {
      const stepCount = 60 / step;

      return [...Array(24).keys()].flatMap((hour) =>
        [...Array(stepCount).keys()].map((minuteStep) => formatter.format(new Date(0, 0, 0, hour, minuteStep * step))),
      );
    }, [step, formatter]);

    const handleTextValueChange = (string?: string) => {
      if (!string || isNotAlphabeticalCharacter(string)) {
        setTextValue(string);
      }
    };

    const createNewTimeValue = (value: string) => {
      const [hours, minutes] = value.split(separator);

      if (!hours && !minutes) return undefined;

      const hoursAsNumber = Number(hours ?? '0');
      const minutesAsNumber = Number(minutes ?? '0');

      if (hoursAsNumber > 23 || minutesAsNumber > 59) return undefined;

      return formatter.format(new Date(0, 0, 0, hoursAsNumber, minutesAsNumber));
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      const newValue = createNewTimeValue(event.target.value);

      if (newValue) {
        setTextValue(newValue);
        setValue(newValue);
      } else {
        setTextValue(value);
      }
    };

    const handleChange = (changedValue?: string) => {
      if (typeof changedValue !== 'undefined') {
        const newValue = createNewTimeValue(changedValue);

        setValue(newValue);
      } else {
        setValue(changedValue);
      }
    };

    /**
     * Because we allow values that aren't necessarily in the list & we control the text value, we need to
     * update the text value when the value changes to keep the two in sync.
     */
    React.useEffect(() => {
      const actualValue = typeof valueProp === 'undefined' ? '' : valueProp;

      if (isNotAlphabeticalCharacter(actualValue)) {
        setTextValue(actualValue);
      }
    }, [valueProp, setTextValue]);

    return (
      <Combobox
        {...restProps}
        ref={forwardedRef}
        value={value}
        onChange={handleChange}
        isPrintableCharacter={isNotAlphabeticalCharacter}
        allowCustomValue
        placeholder={`--${separator}--`}
        autocomplete="none"
        startIcon={<StyledClock />}
        inputMode="numeric"
        pattern={`\\d{2}\\${separator}\\d{2}`}
        textValue={textValue}
        onTextValueChange={handleTextValueChange}
        onBlur={handleBlur}
      >
        {timeOptions.map((time) => (
          <Option key={time} value={time}>
            {time}
          </Option>
        ))}
      </Combobox>
    );
  },
);

const StyledClock = styled(Clock)`
  height: 1rem;
  width: 1rem;

  & > path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;
