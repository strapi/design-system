import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H3 } from '../Text';
import { Box } from '../Box';

const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyStateImageWrapper = styled(Box)`
  svg {
    height: ${88 / 16}rem;
  }
`;

export const EmptyStateLayout = ({ icon, content, action }) => {
  return (
    <EmptyStateWrapper>
      <EmptyStateImageWrapper paddingBottom={6} aria-hidden>
        {icon}
      </EmptyStateImageWrapper>
      <Box paddingBottom={4}>
        <H3 as="p" textColor="neutral600">
          {content}
        </H3>
      </Box>
      {action}
    </EmptyStateWrapper>
  );
};

EmptyStateLayout.defaultProps = {
  action: undefined,
};

EmptyStateLayout.propTypes = {
  action: PropTypes.node,
  content: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
