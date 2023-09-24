import * as React from 'react';

import { CalendarDateTime, parseAbsoluteToLocal, toCalendarDateTime, getLocalTimeZone } from '@internationalized/date';
import styled from 'styled-components';

import { DatePickerInput, DatePickerInputProps, DatePickerElement } from '../DatePicker/DatePicker';
import { useDesignSystem } from '../DesignSystemProvider';
import { Field, FieldHint, FieldLabel, FieldError, FieldProps, FieldLabelProps } from '../Field';
import { Flex } from '../Flex';
import { once } from '../helpers/deprecations';
import { useComposedRefs } from '../hooks/useComposeRefs';
import { useControllableState } from '../hooks/useControllableState';
import { useDateFormatter } from '../hooks/useDateFormatter';
import { useId } from '../hooks/useId';
import { TimePickerInput, TimePickerProps } from '../TimePicker';
import { VisuallyHidden } from '../VisuallyHidden';

export interface DateTimePickerProps
  extends Omit<DatePickerInputProps, 'step' | 'onChange' | 'error' | 'selectedDate'>,
    Pick<TimePickerProps, 'step' | 'selectButtonTitle'>,
    Pick<FieldProps, 'name' | 'hint' | 'error'> {
  /**
   * Label for the DatePicker field
   * @default "Date"
   */
  dateLabel?: string;
  /**
   * Label for the TimePicker field
   * @default "Time"
   */
  timeLabel?: string;
  /**
   * Label used to describe the DateTimePicker fieldset
   */
  label: string;
  /**
   * Label Action
   */
  labelAction?: FieldLabelProps['action'];
  onChange?: (date: Date | undefined) => void;
  /**
   * Value. The Date passed as value
   */
  value?: Date | null;
}

export const DateTimePicker = React.forwardRef<DatePickerElement, DateTimePickerProps>(
  (
    {
      /**
       * @preserve
       * @deprecated This is no longer used.
       */
      ariaLabel: _ariaLabel,
      clearLabel = 'clear',
      dateLabel = 'Choose date',
      timeLabel = 'Choose time',
      disabled = false,
      error,
      hint,
      id,
      label,
      labelAction,
      onChange,
      onClear,
      name,
      required = false,
      /**
       * @preserve
       * @deprecated This is no longer used.
       */
      selectButtonTitle: _selectButtonTitle,
      size = 'M',
      step,
      value,
      initialDate,
      ...props
    },
    forwardedRef,
  ) => {
    const DatePickerElement = React.useRef<HTMLInputElement>(null!);

    const [dateValue, setDateValue] = useControllableState<CalendarDateTime | undefined>({
      defaultProp: initialDate ? convertUTCDateToCalendarDateTime(initialDate, false) : undefined,
      prop: value ? convertUTCDateToCalendarDateTime(value, false) : value ?? undefined,
      onChange(date) {
        if (onChange) {
          onChange(date?.toDate(getLocalTimeZone()));
        }
      },
    });

    const context = useDesignSystem('DateTimePicker');

    const timeFormatter = useDateFormatter(context.locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const timeValue = dateValue ? timeFormatter.format(dateValue.toDate(getLocalTimeZone())) : '';

    // React.useEffect(() => {
    //   setTimeTextValue((s) => (s === timeValue ? s : timeValue));
    // }, [timeValue]);

    const handleDateChange = (date: Date | undefined) => {
      let newDate = date ? convertUTCDateToCalendarDateTime(date) : undefined;

      /**
       * If the date hasn't changed, don't do anything.
       */
      if (newDate && dateValue && newDate.compare(dateValue) === 0) {
        return;
      }

      if (timeValue && newDate) {
        const [hours, minutes] = timeValue.split(':');
        newDate = newDate.set({ hour: parseInt(hours, 10), minute: parseInt(minutes, 10) });
      }

      setDateValue(newDate);
    };

    const handleTimeChange = (time?: string) => {
      if (!time) {
        return;
      }

      const [hours, minutes] = time.split(':');
      const dateToSet = dateValue
        ? dateValue.set({ hour: parseInt(hours, 10), minute: parseInt(minutes, 10) })
        : convertUTCDateToCalendarDateTime(new Date()).set({
            hour: parseInt(hours, 10),
            minute: parseInt(minutes, 10),
          });

      setDateValue(dateToSet);
    };

    const handleDateClear: DatePickerInputProps['onClear'] = (e) => {
      setDateValue(undefined);
      // setTimeTextValue('');

      if (onClear) {
        onClear(e);
      }
    };

    const handleTimeClear = () => {
      const newDate = dateValue ? dateValue.set({ hour: 0, minute: 0 }) : convertUTCDateToCalendarDateTime(new Date());

      setDateValue(newDate);
      // setTimeTextValue('');
    };

    const generatedId = useId(id);

    const timeId = useId();
    const dateId = useId();

    const composedRefs = useComposedRefs(DatePickerElement, forwardedRef);

    return (
      <Field
        name={name}
        as="fieldset"
        id={generatedId}
        aria-labelledby={generatedId}
        hint={hint}
        error={error}
        required={required}
      >
        <Flex as="span" direction="column" alignItems="stretch" gap={1}>
          <FieldLabel
            onClick={() => {
              /**
               * We're using fieldsets and legends and because they're not directly associated with the input
               * we want to manually focus the input because the labels for these inputs are visually hidden.
               */
              DatePickerElement.current.focus();
            }}
            as="legend"
            id={generatedId}
            action={labelAction}
          >
            {label}
          </FieldLabel>
          <Flex flex="1" gap={1}>
            <VisuallyHidden as="label" htmlFor={dateId}>
              {dateLabel}
            </VisuallyHidden>
            <DatePicker
              {...props}
              selectedDate={dateValue ? dateValue.toDate('UTC') : undefined}
              onChange={handleDateChange}
              error={typeof error === 'string'}
              required={required}
              size={size}
              onClear={onClear ? handleDateClear : undefined}
              clearLabel={`${clearLabel} date`}
              disabled={disabled}
              id={dateId}
              ref={composedRefs}
              aria-describedby={`${generatedId}-hint ${generatedId}-error`}
            />
            <VisuallyHidden as="label" htmlFor={timeId}>
              {timeLabel}
            </VisuallyHidden>
            <TimePicker
              size={size}
              error={typeof error === 'string'}
              value={timeValue}
              onChange={handleTimeChange}
              onClear={onClear && timeValue !== undefined && timeValue !== '00:00' ? handleTimeClear : undefined}
              clearLabel={`${clearLabel} time`}
              required={required}
              disabled={disabled}
              step={step}
              id={timeId}
              aria-describedby={`${generatedId}-hint ${generatedId}-error`}
            />
          </Flex>
          <FieldHint />
          <FieldError />
        </Flex>
      </Field>
    );
  },
);

const warnOnce = once(console.warn);

export const convertUTCDateToCalendarDateTime = (date: Date | string, resetTime = true): CalendarDateTime => {
  /**
   * TODO: remove this in V2, it's a deprecated API
   */
  if (typeof date === 'string') {
    warnOnce(
      "It looks like you're passing a string as representation of a Date to the DatePicker. This is deprecated, look to passing a Date instead.",
    );
    const timestamp = Date.parse(date);

    if (!Number.isNaN(timestamp)) {
      date = new Date(timestamp);
    } else {
      date = new Date();
    }
  }

  const utcDateString = date.toISOString();
  let zonedDateTime = parseAbsoluteToLocal(utcDateString);

  if (resetTime) {
    zonedDateTime = zonedDateTime.set({ hour: 0, minute: 0 });
  }

  /**
   * ZonedDateTime can't have weeks added,
   * see – https://github.com/adobe/react-spectrum/issues/3667
   */
  return toCalendarDateTime(zonedDateTime);
};

const DatePicker = styled(DatePickerInput)`
  flex: 1 1 70%;
  min-width: 120px;
`;

const TimePicker = styled(TimePickerInput)`
  flex: 1 1 30%;
  min-width: 120px;
`;
