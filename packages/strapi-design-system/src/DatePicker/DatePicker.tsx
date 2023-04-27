import { useRef, useState } from 'react';

import { Calendar as CalendarIcon, Cross } from '@strapi/icons';
import styled, { css } from 'styled-components';

import { DatePickerCalendar, DatePickerCalendarProps } from './DatePickerCalendar';
import { FieldAction, InputWrapper } from '../Field';
import { getDefaultLocale } from '../helpers/getDefaultLocale';
import { TextInput, TextInputProps } from '../TextInput';

/**
 * TODO: this can be refactored into two pieces – DatePickerInput and DatePicker.
 * The former is litterally just the input and would play nicer with the props of
 * DateTimePicker which doesn't want it to render it's own label (understandable).
 */
export interface DatePickerProps
  extends Omit<TextInputProps, 'onChange'>,
    Pick<DatePickerCalendarProps, 'onChange' | 'maxDate' | 'minDate' | 'selectedDate' | 'initialDate' | 'locale'> {
  ariaLabel?: string;
  clearLabel?: string;
  onClear?: () => void;
  /**
   * @preserve
   * @deprecated This is no longer used.
   */
  selectedDateLabel?: (date: string) => string;
}

export const DatePicker = ({
  /**
   * DatePicker props
   */
  ariaLabel,
  onClear,
  clearLabel = 'Clear',
  /**
   * DatePickerCalendar props
   */
  initialDate,
  locale: defaultLocale,
  maxDate,
  minDate,
  onChange,
  selectedDate,
  /**
   * TextInput props
   */
  disabled = false,
  ...props
}: DatePickerProps) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<{ inputWrapperRef: React.MutableRefObject<HTMLDivElement> }>(null!);
  const locale = defaultLocale || getDefaultLocale();
  const formattedDate = selectedDate ? formatDate(selectedDate, locale) : '';

  const toggleVisibility = () => {
    if (disabled) return;
    setVisible((prevVisible) => !prevVisible);
  };

  const handleClear = () => {
    if (disabled) return;

    if (onClear) {
      onClear();
      /**
       * TODO: refactor this so we can just target the input...?
       */
      inputRef.current.inputWrapperRef.current.focus();
    }
  };

  const handleChange = (date: Date) => {
    if (onChange) {
      onChange(date);
    }
    setVisible(false);
  };

  const handleEscape = () => {
    setVisible(false);
  };

  return (
    <DatePickerWrapper bold={visible}>
      <TextInput
        ref={inputRef}
        onClick={toggleVisibility}
        // Prevent input from changing for now
        onChange={() => {}}
        value={formattedDate}
        startAction={<StyledCalendarIcon aria-hidden />}
        endAction={
          onClear && formattedDate ? (
            <FieldAction label={clearLabel} onClick={handleClear} aria-disabled={disabled || undefined}>
              <StyledCross />
            </FieldAction>
          ) : undefined
        }
        aria-autocomplete="none"
        aria-label={ariaLabel}
        disabled={disabled}
        type="text"
        placeholder="--/--/--"
        {...props}
      />

      {inputRef.current && inputRef.current.inputWrapperRef && visible && (
        <DatePickerCalendar
          selectedDate={selectedDate}
          initialDate={initialDate}
          onChange={handleChange}
          onDismiss={handleEscape}
          locale={locale}
          popoverSource={inputRef.current.inputWrapperRef}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </DatePickerWrapper>
  );
};

const formatDate = (date: number | Date, locale?: string): string => {
  const langFormatter = new Intl.DateTimeFormat(locale);

  return langFormatter.format(date);
};

const DatePickerWrapper = styled.div<{ bold?: boolean }>`
  ${({ bold, theme }) =>
    bold
      ? css`
          & ${InputWrapper} {
            border: 1px solid ${theme.colors.primary600};
          }
        `
      : ''}
`;

const StyledCross = styled(Cross)`
  height: ${11 / 16}rem;
  width: ${11 / 16}rem;

  path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  & > path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;
