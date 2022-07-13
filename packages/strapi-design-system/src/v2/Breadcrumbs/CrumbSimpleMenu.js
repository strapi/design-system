import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from '../../Flex';
import { Box } from '../../Box';
import ChevronRight from '@strapi/icons/ChevronRight';

const CrumbWrapper = styled(Flex)`
  div[aria-hidden='true'] {
    svg {
      height: ${10 / 16}rem;
      width: ${10 / 16}rem;
      path {
        fill: ${({ theme }) => theme.colors.neutral500};
      }
    }
  }
`;

export const CrumbSimpleMenu = ({ children }) => {
  return (
    <CrumbWrapper>
      {children}
      <Box aria-hidden paddingLeft={3} paddingRight={3}>
        <ChevronRight />
      </Box>
    </CrumbWrapper>
  );
};

CrumbSimpleMenu.displayName = 'CrumbSimpleMenu';
CrumbSimpleMenu.propTypes = {
  children: PropTypes.string.isRequired,
};
