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
   * Aria Label
   */
  ariaLabel: PropTypes.string,
  /**
   * Clear Label
   */
  clearLabel: PropTypes.string,
  /**
   * Disabled attribute
   */
  disabled: PropTypes.bool,
  /**
   * Error message or boolean
   */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * Hint text
   */
  hint: PropTypes.string,
  /**
   * Label
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
   * onChange function
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
   * Step value
   */
  step: PropTypes.number,
  /**
   * Value wich is a Date value
   */
  value: PropTypes.instanceOf(Date),
};

DateTimePickerProps.defaultProps = dateTimePickerDefaultProps;
DateTimePickerProps.propTypes = dateTimePickerPropTypes;
