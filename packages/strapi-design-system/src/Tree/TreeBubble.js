import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Row } from '../Row';

export const TreeBubbleWrapper = styled.div`
  position: relative;
  margin-left: calc(-${({ theme }) => theme.spaces[8]} - ${24 / 16 / 2}rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary200};
  height: ${24 / 16}rem;
  width: ${24 / 16}rem;
  padding: 5px;
  border: none;

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
