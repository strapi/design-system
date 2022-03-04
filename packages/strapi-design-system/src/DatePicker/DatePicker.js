import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CalendarIcon from '@strapi/icons/Calendar';
import Cross from '@strapi/icons/Cross';
import { sizes } from '../themes/sizes';
import { TextInput } from '../TextInput';
import { DatePickerButton, DatePickerWrapper, IconBox } from './components';
import { DatePickerCalendar } from './DatePickerCalendar';
import { formatDate } from './utils/formatDate';
import { useId } from '../helpers/useId';

export const DatePicker = ({
  ariaLabel,
  initialDate,
  selectedDate,
  size,
  onChange,
  label,
  selectedDateLabel,
  onClear,
  clearLabel,
  disabled,
  minDate,
  maxDate,
  placeholder,
  id,
  ...props
}) => {
  const generatedId = useId('datepicker', id);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);
  const datePickerButtonRef = useRef(null);
  const formattedDate = selectedDate ? formatDate(selectedDate) : '';

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
        placeholder={placeholder || formatDate(new Date(1970, 0, 1))}
        size={size}
        startAction={
          <DatePickerButton
            ref={datePickerButtonRef}
            onClick={toggleVisibility}
            aria-label={selectedDate ? selectedDateLabel(formatDate(selectedDate)) : label}
            type="button"
            aria-disabled={disabled}
          >
            <CalendarIcon aria-hidden={true} />
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
        id={generatedId}
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

DatePicker.defaultProps = {
  ariaLabel: undefined,
  clearLabel: undefined,
  disabled: false,
  id: undefined,
  label: undefined,
  initialDate: new Date(),
  onClear: undefined,
  placeholder: undefined,
  selectedDate: undefined,
  size: 'M',
};

DatePicker.propTypes = {
  ariaLabel: PropTypes.string,
  clearLabel: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  initialDate: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  selectedDate: PropTypes.instanceOf(Date),
  selectedDateLabel: PropTypes.func.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
};
