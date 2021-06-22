import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Row } from '../Row';

export const TreeBubbleWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary200};
  height: ${24 / 16}rem;
  width: ${24 / 16}rem;
  border: none;

  // Moving to the left by
  // the size of the bubble element (24)
  // minus half the size of the space between the line and the bubble
  // minus 2 (half the line width)
  margin-left: calc(-${24 / 16}rem - ${32 / 16 / 2}rem - 2px);

  svg {
    height: ${10 / 16}rem;
    width: ${10 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

export const TreeBubble = ({ children, icon, ...props }) => {
  return (
    <Row>
      <TreeBubbleWrapper aria-hidden={true} {...props}>
        {icon}
      </TreeBubbleWrapper>
      <Box paddingLeft={6}>{children}</Box>
    </Row>
  );
};

TreeBubble.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
};
