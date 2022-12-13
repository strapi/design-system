import React from 'react';
import PropTypes from 'prop-types';

export const FlexProps = (props) => <div {...props} />;

export const flexDefaultProps = {
  alignItems: 'center',
  basis: undefined,
  direction: 'row',
  gap: undefined,
  inline: false,
  justifyContent: undefined,
  reverse: false,
  shrink: undefined,
  wrap: undefined,
};

export const flexPropTypes = {
  alignItems: PropTypes.string,
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.string,
  /**
   * Supports responsive values
   */
  gap: PropTypes.oneOfType([
    PropTypes.shape({
      desktop: PropTypes.number,
      mobile: PropTypes.number,
      tablet: PropTypes.number,
    }),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string,
  ]),
  inline: PropTypes.bool,
  justifyContent: PropTypes.string,
  reverse: PropTypes.bool,
  shrink: PropTypes.number,
  wrap: PropTypes.string,
};

FlexProps.defaultProps = flexDefaultProps;
FlexProps.propTypes = flexPropTypes;
