import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from '../../Flex';
import { Box } from '../../Box';
import { SimpleMenu } from '../SimpleMenu';
import ChevronRight from '@strapi/icons/ChevronRight';

const CrumbWrapper = styled(Flex)`
  div[aria-hidden='true'] {
    display: ${({ isLast }) => (isLast ? 'none' : '')};
    svg {
      height: ${10 / 16}rem;
      width: ${10 / 16}rem;
      path {
        fill: ${({ theme }) => theme.colors.neutral500};
      }
    }
  }
`;

export const CrumbSimpleMenu = ({ children, isLast }) => {
  return (
    <CrumbWrapper isLast={isLast}>
      {children}
      <Box aria-hidden paddingLeft={3} paddingRight={3}>
        <ChevronRight />
      </Box>
    </CrumbWrapper>
  );
};

CrumbSimpleMenu.displayName = 'CrumbSimpleMenu';
CrumbSimpleMenu.defaultProps = {
  isLast: false,
};
CrumbSimpleMenu.propTypes = {
  children: PropTypes.shape({ type: PropTypes.oneOf([SimpleMenu]) }),
  isLast: PropTypes.bool,
};
