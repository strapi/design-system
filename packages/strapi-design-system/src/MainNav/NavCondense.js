import React from 'react';

import { ChevronRight, ChevronLeft } from '@strapi/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';

const NavCondenseWrapper = styled(Flex)`
  svg {
    width: ${6 / 16}rem;
    height: ${9 / 16}rem;
  }
`;

export const NavCondense = ({ children, ...props }) => {
  const condensed = useMainNav();

  return (
    <NavCondenseWrapper
      alignItems="center"
      as="button"
      background="neutral0"
      borderColor="neutral150"
      bottom={`${(9 + 4) / 16}rem`} // 9 is the height of the svg and 4 is the padding below
      hasRadius
      height={`${25 / 16}rem`}
      justifyContent="center"
      position="absolute"
      right={condensed ? 0 : 5}
      transform={condensed ? 'translateX(50%)' : undefined}
      width={`${18 / 16}rem`}
      zIndex={2}
      {...props}
    >
      <Icon as={condensed ? ChevronRight : ChevronLeft} aria-hidden color="neutral600" />
      <VisuallyHidden>{children}</VisuallyHidden>
    </NavCondenseWrapper>
  );
};

NavCondense.propTypes = {
  children: PropTypes.string.isRequired,
};
