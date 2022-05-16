import React from 'react';
import PropTypes from 'prop-types';
import { TEXT_VARIANTS, OMEGA } from './constants';

export const TypographyProps = (props) => <div {...props} />;

export const typographyDefaultProps = {
  fontWeight: undefined,
  fontSize: undefined,
  lineHeight: undefined,
  textColor: undefined,
  textTransform: undefined,
  variant: OMEGA,
};
export const typographyPropTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontWeight: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  textColor: PropTypes.string,
  textTransform: PropTypes.string,
  variant: PropTypes.oneOf(TEXT_VARIANTS),
};

TypographyProps.defaultProps = typographyDefaultProps;
TypographyProps.propTypes = typographyPropTypes;
