import React from 'react';
import PropTypes from 'prop-types';

export const DateTimePickerProps = (props) => <div {...props} />;

export const dateTimePickerDefaultProps = {
  ariaLabel: undefined,
  clearLabel: 'clear',
  disabled: false,
  error: undefined,
  hint: undefined,
  label: undefined,
  labelAction: undefined,
  onClear: undefined,
  required: false,
  size: 'M',
  step: 1,
  value: undefined,
};
export const dateTimePickerPropTypes = {
  /**
   * Aria Label used by the DatePicker and the TimePicker inside the DateTimePicker component
   */
  ariaLabel: PropTypes.string,
  /**
   * Clear Label used for the X button inside both, the TimePicker and the DatePicker
   */
  clearLabel: PropTypes.string,
  /**
   * Disabled attribute
   */
  disabled: PropTypes.bool,
  /**
   * Error message or boolean, if it is a boolean we will hide the error message for the DatePicker and the TimePicker and show just the one that we have defined in the DateTimePicker
   */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * Hint text used inside the Field wrapper component
   */
  hint: PropTypes.string,
  /**
   * Label used to describe the the DateTimePicker component
   */
  label: PropTypes.string,
  /**
   * Label Action
   */
  labelAction: PropTypes.element,
  /**
   * Name, required
   */
  name: PropTypes.string.isRequired,
  /**
   * onChange function, passed from a parent component, it takes the actual date value and it is used inside the different handlers related to the change event for the DatePicker and the TimePicker and also the clear event for the TimePicker
   */
  onChange: PropTypes.func.isRequired,
  /**
   * onClear function
   */
  onClear: PropTypes.func,
  /**
   * Required field boolean
   */
  required: PropTypes.bool,
  /**
   * Size of the Field (possible values S anf M)
   */
  size: PropTypes.oneOf(['S', 'M']),
  /**
   * Step value used inside the TimePicker to show the different options for it
   */
  step: PropTypes.number,
  /**
   * Value. The Date passed as value
   */
  value: PropTypes.instanceOf(Date),
};

DateTimePickerProps.defaultProps = dateTimePickerDefaultProps;
DateTimePickerProps.propTypes = dateTimePickerPropTypes;
