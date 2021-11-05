import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '../Typography';
import { Box } from '../Box';

const EmptyStateWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const EmptyStateImageWrapper = styled(Box)`
  svg {
    height: ${88 / 16}rem;
  }
`;

export const EmptyStateLayout = ({ icon, content, action, hasRadius, shadow }) => {
  return (
    <EmptyStateWrapper padding={11} background="neutral0" hasRadius={hasRadius} shadow={shadow}>
      <EmptyStateImageWrapper paddingBottom={6} aria-hidden>
        {icon}
      </EmptyStateImageWrapper>
      <Box paddingBottom={4}>
        <Typography variant="delta" as="p" textColor="neutral600">
          {content}
        </Typography>
      </Box>
      {action}
    </EmptyStateWrapper>
  );
};

EmptyStateLayout.defaultProps = {
  action: undefined,
  hasRadius: true,
  shadow: 'tableShadow',
};

EmptyStateLayout.propTypes = {
  action: PropTypes.node,
  content: PropTypes.string.isRequired,
  hasRadius: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  shadow: PropTypes.string,
};
