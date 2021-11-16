import React from 'react';
import PropTypes from 'prop-types';

export const TypographyProps = (props) => <div {...props} />;

TypographyProps.defaultProps = {
  fontWeight: undefined,
  fontSize: undefined,
  lineHeight: undefined,
  textColor: undefined,
  textTransform: undefined,
  variant: 'omega',
};

TypographyProps.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontWeight: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  textColor: PropTypes.string,
  textTransform: PropTypes.string,
  variant: PropTypes.oneOf(['alpha', 'beta', 'delta', 'epsilon', 'omega', 'pi', 'sigma']),
};
