import React from 'react';
import { Flex } from '../Flex';

export const SimpleNav = (props) => {
  return <Flex {...props} />;
};

SimpleNav.defaultProps = {
  ...Flex.defaultProps,
  as: 'nav',
  display: 'flex',
  direction: 'column',
  alignItems: 'stretch',
  position: 'sticky',
  top: 4,
  gap: 2,
};

SimpleNav.propTypes = {
  ...Flex.propTypes,
};
