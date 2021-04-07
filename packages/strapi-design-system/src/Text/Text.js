import React from 'react';
import PropTypes from 'prop-types';
import {
  Header1,
  Header2,
  Header3,
  Subtitle,
  Body,
  BodyHighlight,
  ButtonText,
  SmallButtonText,
  SmallText,
  TableLabel,
} from './components';

const variants = {
  'header-1': Header1,
  'header-2': Header2,
  'header-3': Header3,
  subtitle: Subtitle,
  body: Body,
  'body-highlight': BodyHighlight,
  'button-text': ButtonText,
  'button-text-s': SmallButtonText,
  'text-s': SmallText,
  'table-label': TableLabel,
};

export const Text = React.forwardRef(({ variant, ...props }, ref) => {
  const Component = variants[variant];

  return <Component ref={ref} {...props} />;
});

Text.displayName = 'Text';

Text.defaultProps = {
  variant: 'body',
  color: 'neutral900',
};

Text.propTypes = {
  variant: PropTypes.oneOf(Object.keys(variants)),
  color: PropTypes.string,
};
