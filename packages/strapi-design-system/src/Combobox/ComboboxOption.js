import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { OptionBox } from './components';

export const ComboboxOption = forwardRef(({ isSelected, children, ...props }, ref) => {
  return (
    <OptionBox
      hasRadius
      paddingLeft={4}
      paddingRight={4}
      paddingTop={2}
      paddingBottom={2}
      role="option"
      background="neutral0"
      isSelected={isSelected}
      ref={ref}
      {...props}
    >
      <Typography textColor={isSelected ? 'primary600' : 'neutral800'} fontWeight={isSelected ? 'bold' : null}>
        {children}
      </Typography>
    </OptionBox>
  );
});

ComboboxOption.defaultProps = {
  isSelected: false,
};

ComboboxOption.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isSelected: PropTypes.bool,
};

ComboboxOption.displayName = 'ComboboxOption';
