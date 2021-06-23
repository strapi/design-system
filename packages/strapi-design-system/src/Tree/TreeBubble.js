import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Row } from '../Row';
import { TreeItemContent } from './TreeItemContent';
import { TreeItem } from './TreeItem';

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

  margin-left: -${(32 + 12 + 6) / 16}rem;

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
    <TreeItem removeMarker>
      <TreeItemContent>
        <Row>
          <TreeBubbleWrapper aria-hidden={true} {...props}>
            {icon}
          </TreeBubbleWrapper>
          <Box paddingLeft={6}>{children}</Box>
        </Row>
      </TreeItemContent>
    </TreeItem>
  );
};

TreeBubble.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
};
