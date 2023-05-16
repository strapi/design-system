import React from 'react';

import PropTypes from 'prop-types';

import { Flex } from '../Flex';

export const CarouselSlide = ({ label, children, selected, ...props }) => (
  <Flex
    display={selected ? 'flex' : 'none'}
    selected={selected}
    role="group"
    aria-roledescription="slide"
    aria-label={label}
    justifyContent="center"
    height="124px"
    {...props}
  >
    {children}
  </Flex>
);

CarouselSlide.defaultProps = {
  selected: false,
};

CarouselSlide.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};
