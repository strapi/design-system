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
  selectButtonTitle: 'select',
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
   * Clear label used to define the `aria-label` of the clear buttons.
   */
  clearLabel: PropTypes.string,
  /**
   * Disabled attribute
   */
  disabled: PropTypes.bool,
  /**
   * Error is the message shown under the DateTimePicker when something goes wrong.
   */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * This text is used to describe the DateTimePicker component.
   */
  hint: PropTypes.string,
  /**
   * Label used to describe the DateTimePicker component
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
   * Text used to define the title of the button to open the select options (inside the TimePicker)
   */
  selectButtonTitle: PropTypes.string,
  /**
   * Size of the Field (possible values S and M)
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
