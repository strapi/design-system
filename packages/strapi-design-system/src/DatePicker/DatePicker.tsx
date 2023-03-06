import React, { useRef, useState } from 'react';

import { Calendar as CalendarIcon, Cross } from '@strapi/icons';

import { DatePickerButton, DatePickerWrapper, IconBox } from './components';
import { DatePickerCalendar } from './DatePickerCalendar';
import { formatDate } from './utils/formatDate';
import { getDefaultLocale } from '../helpers/getDefaultLocale';
import { TextInput, TextInputProps } from '../TextInput';

export interface DatePickerProps extends Omit<TextInputProps, 'onChange'> {
  ariaLabel?: string;
  clearLabel?: string;
  initialDate?: Date;
  locale?: string;
  maxDate?: Date;
  minDate?: Date;
  onChange: (date: Date) => void;
  onClear?: () => void;
  placeholder?: string;
  selectedDate?: Date;
  selectedDateLabel: (date: string) => string;
}

export const DatePicker = ({
  ariaLabel,
  initialDate = new Date(),
  selectedDate,
  onChange,
  label,
  locale: defaultLocale,
  selectedDateLabel,
  onClear,
  clearLabel,
  disabled = false,
  id,
  minDate,
  maxDate,
  size,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<{ inputWrapperRef: React.MutableRefObject<HTMLDivElement> }>(null!);
  const datePickerButtonRef = useRef<HTMLButtonElement>(null!);
  const locale = defaultLocale || getDefaultLocale();
  const formattedDate = selectedDate ? formatDate(selectedDate, locale) : '';

  const toggleVisibility = () => {
    if (disabled) return;
    setVisible((prevVisible) => !prevVisible);
  };

  const handleClear = () => {
    if (disabled) return;

    onClear();
    datePickerButtonRef.current.focus();
  };

  const handleChange = (date) => {
    onChange(date);
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
        startAction={
          <DatePickerButton
            ref={datePickerButtonRef}
            onClick={toggleVisibility}
            aria-label={selectedDate ? selectedDateLabel(formatDate(selectedDate, locale)) : label || ariaLabel}
            type="button"
            aria-disabled={disabled}
          >
            <CalendarIcon aria-hidden />
          </DatePickerButton>
        }
        endAction={
          onClear && formattedDate ? (
            <IconBox as="button" onClick={handleClear} aria-label={clearLabel} aria-disabled={disabled}>
              <Cross />
            </IconBox>
          ) : undefined
        }
        aria-autocomplete="none"
        label={label}
        aria-label={ariaLabel}
        disabled={disabled}
        id={id}
        size={size}
        {...props}
      />

      {inputRef.current && inputRef.current.inputWrapperRef && visible && (
        <DatePickerCalendar
          selectedDate={selectedDate}
          initialDate={initialDate}
          onChange={handleChange}
          onEscape={handleEscape}
          popoverSource={inputRef.current.inputWrapperRef}
          label={label || ariaLabel}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </DatePickerWrapper>
  );
};
