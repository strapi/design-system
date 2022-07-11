import React from 'react';
import styled from 'styled-components';
import ChevronRight from '@strapi/icons/ChevronRight';

import { Box } from '../../Box';

const Wrapper = styled(Box)`
  svg {
    height: ${10 / 16}rem;
    width: ${10 / 16}rem;

    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;

export const Divider = () => {
  return (
    <Wrapper aria-hidden paddingLeft={2} paddingRight={2}>
      <ChevronRight />
    </Wrapper>
  );
};

Divider.displayName = 'Divider';
