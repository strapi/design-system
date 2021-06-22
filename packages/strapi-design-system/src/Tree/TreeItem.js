import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TreeLeaf } from './TreeLeaf';
import { Box } from '../Box';

const TreeItemWrapper = styled.li`
  margin-left: ${({ theme }) => theme.spaces[4]};
  padding-top: ${({ theme }) => theme.spaces[6]};
  padding-bottom: ${({ theme }) => theme.spaces[6]};
`;

const TreeItemLeafWrapper = styled(Box)`
  position: absolute;
  margin-left: calc(-${32 / 16}rem - 1rem);
  transform: translateY(-50%);
`;

export const TreeItem = ({ children, removeLeaf, ...props }) => {
  return (
    <TreeItemWrapper role="treeitem" tabIndex={-1} {...props}>
      {removeLeaf ? null : (
        <TreeItemLeafWrapper>
          <TreeLeaf />
        </TreeItemLeafWrapper>
      )}
      {children}
    </TreeItemWrapper>
  );
};

TreeItem.defaultProps = {
  removeLeaf: false,
};

TreeItem.propTypes = {
  children: PropTypes.node.isRequired,
  removeLeaf: PropTypes.bool,
};
